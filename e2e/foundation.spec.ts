import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/agendamento',
  '/consulta',
  '/produtos',
  '/acesso',
  '/previa/barbeiro',
  '/previa/barbeiro/agenda',
  '/previa/barbeiro/escala',
  '/previa/barbeiro/atendimentos',
  '/previa/barbeiro/comissoes',
  '/previa/admin',
  '/previa/admin/agendamentos',
  '/previa/admin/equipe',
  '/previa/admin/servicos',
  '/previa/admin/clientes',
  '/previa/admin/financeiro',
  '/previa/admin/estoque',
  '/previa/admin/configuracoes',
  '/admin',
  '/barbeiro',
  '/pagina-inexistente',
];

test('todas as rotas: navegação, responsividade e acessibilidade inicial', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const path of pages) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, `Acessibilidade: ${path}`).toEqual([]);
    if (path === '/' || path === '/previa/admin') {
      await page.screenshot({
        path: `test-results/previews/${test.info().project.name}-${path === '/' ? 'home' : 'admin'}.png`,
        fullPage: true,
      });
    }
  }
  expect(errors).toEqual([]);
});

test('navega pelo site e pelas prévias com teclado', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Agendar', exact: true })
    .click();
  await expect(page).toHaveURL(/\/agendamento$/);
  await expect(page.getByRole('button', { name: 'Agendamento indisponível' })).toBeDisabled();
  await page.getByRole('link', { name: 'Prévia do barbeiro' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Minha agenda' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Minha agenda');
  await page.getByRole('link', { name: 'Voltar ao site' }).click();
  await expect(page).toHaveURL('/');
  await page.getByRole('link', { name: 'Pular para o conteúdo' }).focus();
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('PWA instala cache estático e mantém limites offline', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  const manifest = await (await page.request.get('/manifest.webmanifest')).json();
  expect(manifest.display).toBe('standalone');
  for (const icon of manifest.icons) expect((await page.request.get(icon.src)).ok()).toBe(true);
  await page.evaluate(async () => {
    await fetch('/api/private?client=never-cache', {
      headers: { Authorization: 'Bearer test-only-not-a-credential' },
    });
    await fetch('/consulta?token=never-cache');
  });
  const cachedPaths = await page.evaluate(async () => {
    const keys = await caches.keys();
    const requests = await Promise.all(keys.map(async (key) => (await caches.open(key)).keys()));
    return requests
      .flat()
      .map((request) => new URL(request.url).pathname + new URL(request.url).search);
  });
  expect(cachedPaths).toContain('/index.html');
  expect(cachedPaths).toContain('/brand/underdog-logo.png');
  expect(
    cachedPaths.every(
      (path) =>
        path === '/index.html' ||
        path === '/manifest.webmanifest' ||
        path === '/brand/underdog-logo.png' ||
        path.startsWith('/assets/') ||
        path.startsWith('/icons/'),
    ),
  ).toBe(true);
  await context.setOffline(true);
  await page.goto('/agendamento');
  const logo = page.getByRole('img', { name: 'Underdog Barbearia' }).first();
  await expect(logo).toBeVisible();
  expect(
    await logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 640),
  ).toBe(true);
  await expect(page.getByRole('status')).toContainText('Você está offline');
  await expect(page.getByRole('button', { name: 'Agendamento indisponível' })).toBeDisabled();
  await context.setOffline(false);
  await page.reload();
  await expect(page.getByText('Você está offline.', { exact: false })).toHaveCount(0);
});

test('largura mínima de 360px sem transbordamento', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  for (const path of ['/', '/agendamento', '/previa/admin', '/previa/barbeiro/escala']) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});
