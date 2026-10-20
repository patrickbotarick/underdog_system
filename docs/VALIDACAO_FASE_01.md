# Validação e homologação — Fase 01

## Escopo

Fundação visual navegável e contratos, sem backend e sem operações comerciais. Nenhuma credencial ou infraestrutura de produção foi criada. Rotas de prévia são públicas e identificadas. A numeração de fases do roadmap foi mantida.

## Comandos reproduzíveis

```powershell
npm ci
npm run validate
npx playwright install chromium
npm run test:e2e
git diff --check
git fsck --full
```

`npm run validate` inclui typecheck strict, lint, Prettier, Vitest, build de produção/PWA e revisão do repositório. Playwright verifica todas as telas em desktop e mobile com axe, navegação, 360px, manifest, ícones, cache e offline. Testes usam somente identificadores locais sem dados pessoais.

## Resultados locais — 20/10/2026

- Instalação limpa `npm ci`: aprovada com Node 24.11.1 e npm 11.6.2.
- Typecheck strict, ESLint 10 e Prettier: aprovados.
- Vitest/Testing Library: 46 testes em seis arquivos, incluindo rotas, estados desabilitados, foco, menu, falhas, offline, ausência de sessão e precisão da apresentação monetária.
- Build Vite de produção e geração do worker: aprovados, sete arquivos estáticos no precache; sem backend ou segredo no build.
- Playwright: oito testes aprovados em Chromium, projetos desktop e iPhone 13 emulado. Cobertura das 18 telas, bloqueios de acesso real e 404; navegação por links/teclado, viewport de 360px, manifest/ícones e fallback offline.
- Axe: zero violações nas regras WCAG A/AA selecionadas em todas as rotas testadas nos dois viewports. Um nome acessível divergente do texto visível foi corrigido durante a validação.
- Capturas da home desktop/mobile e da prévia administrativa inspecionadas visualmente, sem cortes ou transbordamento nas telas avaliadas. Capturas e traces ficam ignorados em `test-results/`.
- Revisão automatizada: 11 links Markdown locais válidos e 19 casos de exclusão. Nenhum padrão conhecido de segredo encontrado nos arquivos versionáveis; template de ambiente somente com valores vazios.
- `npm audit --omit=dev`: zero vulnerabilidades reportadas nas dependências de produção nesta execução.

O resultado do Git e do push é informado no relatório de entrega. O status remoto do GitHub Actions deve ser confirmado para o commit final antes do aceite de merge.

## Rastreabilidade da entrega

Atualização da marca em 20/10/2026: logo original de 640 × 427 integrada e conferida por SHA-256, sem alteração do PNG. Typecheck, lint, formatação, 46 testes Vitest, build e oito testes Playwright novamente aprovados. Capturas desktop/mobile revisadas; logo também carregada offline. O precache agora contém oito arquivos estáticos, incluindo somente o PNG público adicional. Ícones oficiais de instalação e homologação visual continuam pendentes.

- Base documental: `56ba29cd67a037935da60574a8b47cc249fbd9c5`.
- Regras aprovadas: `658c949` — `docs: record approved business rules for phase 01`.
- Implementação validada: `32095c0` — `feat: build navigable phase 01 foundation`.
- Branch de entrega: `feat/phase-01-foundation`; fechamento documental registrado em commit posterior, consultável por `git log`.
- Normalização LF aplicada a todos os arquivos de texto para evitar diferenças de formatação entre clones Windows/Linux.
- Histórico e documentos oficiais preservados; nenhuma operação de merge em `main`, force-push ou tag estável faz parte desta entrega.

## Homologação pendente

- Logo oficial recebida e integrada; homologar sua aplicação e obter ícones oficiais de instalação.
- Aprovar layout, textos, tokens e navegação em aparelhos reais e leitor de tela.
- Homologar parâmetros comerciais pendentes e infraestrutura/custos.
- Revisar o workflow remoto e aprovar a integração da branch em `main`.
- Planejar backend, identidade telefônica, RLS e testes concorrentes antes de habilitar agendamento real na Fase 02.
- Revalidar estratégia de cache quando existir backend; nenhum dado de cliente pode entrar no precache ou nos relatórios públicos.

As garantias transacionais descritas nos contratos ainda precisam ser implementadas e testadas no servidor. Axe não substitui auditoria completa de acessibilidade. Emulação móvel não equivale a teste físico ou instalação no Safari/iOS.
