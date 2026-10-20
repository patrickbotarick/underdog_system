# ARQUITETURA — UNDERDOG SYSTEM

## Estratégia

Aplicação web responsiva instalável como PWA. Clientes precisam agendar publicamente, portanto haverá infraestrutura central acessível pela internet. O desenvolvimento pode ocorrer localmente e serviços offline ficam limitados a leitura/cache seguro; **não confirmar novas reservas offline**.

## Stack sugerida

React, TypeScript, Vite, Tailwind CSS e PWA no frontend. PostgreSQL/Supabase para banco e autenticação; lógica crítica em API/backend validado, nunca apenas no cliente. Cloudflare é candidata à hospedagem frontend; a escolha definitiva depende de custo e homologação técnica.

## Domínios

`auth`, `customers`, `barbers`, `services`, `scheduling`, `attendance`, `finance`, `inventory`, `shop`, `admin`, `audit`.

## Modelo de dados preliminar

`users`, `profiles`, `roles`, `barbers`, `services`, `barber_services`, `weekly_availability`, `schedule_exceptions`, `appointments`, `appointment_items`, `attendances`, `payments`, `commission_rules`, `commission_entries`, `commission_settlements`, `products`, `inventory_movements`, `product_reservations`, `audit_events`.

## Regras arquiteturais

- Reserva: validação e gravação atômicas no banco; conflito de horários e indisponibilidade protegidos no servidor.
- Financeiro: centavos inteiros ou decimal exato; comissão calculada com regra histórica registrada.
- Estoque: movimentações auditáveis, idempotência, reserva e baixa consistentes.
- Acesso: papéis Cliente/Barbeiro/Admin, privilégio mínimo, RLS e validação de sessão.
- Dados: segregação de ambientes, backups, restore testado, logs sem exposição de dados pessoais.
- Segredos: somente em variáveis protegidas no backend; `.env.example` pode conter apenas placeholders.
- Integração com Booksy: apenas por recursos e exportações autorizados.

## Segurança em repositório público

Proibir credenciais, chaves privadas, backup, dumps SQL reais, dados pessoais e `.env`. Dados de demonstração sempre fictícios.

## Decisões da fundação — Fase 01

- React com TypeScript strict e verificações de índices/opcionais. Vite constrói uma SPA; Tailwind via plugin Vite e tokens CSS centralizados evitam dependências de UI adicionais. Estilos de layout ficam em `src/shared/styles/theme.css`.
- React Router em modo declarativo: rotas aninhadas, layouts por contexto, URLs compartilháveis e página 404 sem exigir servidor de renderização. Modo framework/SSR não é necessário para estes shells. [Documentação oficial do Router](https://reactrouter.com/start/declarative/installation), [Tailwind no Vite](https://tailwindcss.com/docs/installation/using-vite) e [Vite](https://vite.dev/guide/).
- `app` compõe rotas e layouts. `modules` contém auth, booking, barbers, clients, admin, finance, inventory, shop e notifications. `shared` contém UI, tokens, erros, PWA e tipos comuns. Contratos não importam UI; não há componentes de negócio monolíticos nem biblioteca de estado global.
- Sem SDK Supabase ou chaves. `AuthGateway` define o ponto de integração; o adapter atual retorna indisponibilidade. Nenhum papel é obtido de URL, localStorage ou botão. Previews em `/previa/*` são públicas e sem dados; não reutilizar como áreas privadas sem revisão. `/admin/*` e `/barbeiro/*` não concedem acesso.
- Futuro backend: tokens verificados, PostgreSQL, RLS por identidade, autorização do servidor para cada operação e validação de payload em runtime. Tipos TS não garantem segurança. Garantias transacionais detalhadas em [contratos de dados](CONTRATOS_DE_DADOS.md).
- Error Boundary recupera erros de renderização com link ao início e não expõe detalhes técnicos. Rota inexistente tem estado próprio. Mudança de rota atualiza título/foco; navegação mantém semântica e link de salto.
- ESLint com regras de hooks, Prettier, Vitest/Testing Library e Playwright/axe. Acessibilidade é verificada no navegador; não depende de plugin ESLint incompatível com a versão suportada. CI usa Node 24, lockfile e instalação limpa.

## PWA e fronteira de cache

`scripts/build-pwa.mjs` gera `dist/sw.js` com hash do conteúdo e allowlist exata: `index.html` estático, manifest, logo oficial pública, ícones e assets do build. O worker não faz cache runtime de respostas de navegação ou APIs. Apenas rotas conhecidas de shells podem receber `index.html` precacheado como fallback offline. Qualquer query string, Authorization, método diferente de GET ou outra origem é ignorado pelo worker. Rotas privadas reais não têm fallback offline. Não há persistência de formulários, dados ou tokens.

Uma atualização fica aguardando até o usuário clicar em “Atualizar agora”; o worker então troca a versão, remove caches antigos do próprio namespace e recarrega a página. Outras aplicações/caches são preservados. Erro de registro tem mensagem de indisponibilidade. A primeira instalação exige acesso online; offline só apresenta a interface, sem ações comerciais. O desenvolvimento não registra worker para evitar cache antigo de código.

Instalação requer HTTPS (ou localhost) e suporte do navegador; Safari usa menu de compartilhamento. Manifest inclui ícones PNG any/maskable de 192/512, técnicos e neutros. Ícones e logo devem ser homologados antes de publicação. Não há push notifications, sincronização de operações offline ou cache de informações pessoais.

## Hospedagem futura

Configurar fallback SPA somente para navegação de páginas, com 404 real para assets inexistentes e sem interceptar APIs. `sw.js`, manifest e HTML com revalidação; assets versionados com cache imutável. Definir CSP e demais cabeçalhos na infraestrutura escolhida; usar HTTPS. Não publicar as prévias junto a futuras áreas autenticadas sem revisar exposição, retenção, RLS e estratégia do worker. Integração de backend exigirá repetir testes de privacidade/cache e logout.
