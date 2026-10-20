# UNDERDOG SYSTEM

Plataforma web/PWA de agendamento, operação e gestão da Underdog Barbearia.

**Status:** Fase 01 — fundação técnica navegável, em homologação. Telas são shells e estados indisponíveis; não há autenticação, agendamentos, vendas, comissões ou estoque operacionais.

## Escopo aprovado para v1.0.0

1. Agendamento público por serviço e barbeiro.
2. Agenda individual e disponibilidade.
3. Painel administrativo e gestão de equipe.
4. Financeiro, pagamentos e comissões.
5. Estoque, produtos e loja para retirada.
6. PWA para celular e desktop.
7. Backups, segurança e auditoria.

## Stack proposta

React + TypeScript + Vite; Tailwind; PostgreSQL/Supabase; API protegida; PWA; GitHub.
Hospedagem e configurações finais dependem de homologação.

## Executar no Windows

Requer Node.js 24 LTS e npm 11 (versões indicadas em `.node-version` e `package.json`). Nenhum `.env` ou chave é necessário. Nunca colocar segredos em variáveis `VITE_*`: elas são públicas no bundle.

```powershell
git fetch origin
git switch feat/phase-01-foundation
git pull --ff-only origin feat/phase-01-foundation
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente `http://127.0.0.1:5173`). Sincronize somente com árvore limpa. Para obter a branch pela primeira vez no segundo PC, use `git switch --track origin/feat/phase-01-foundation`.

```powershell
npm run validate
npx playwright install chromium
npm run test:e2e
npm run preview
```

`validate` executa typecheck, lint, formatação, testes unitários/componentes, build e revisão automatizada dos arquivos/links/exclusões. E2E usa o build em `http://127.0.0.1:4173`. `preview` serve esse build localmente. A PWA só registra o service worker no build de produção, em HTTPS ou localhost. Hospedagem futura precisa reescrever rotas de navegação para `index.html`, sem reescrever APIs, arquivos ausentes ou `/sw.js`; servir o worker e HTML com revalidação e assets com hash como imutáveis. Nenhum deploy foi realizado.

## Estrutura

```text
src/app/                 Rotas, navegação e layouts por contexto
src/modules/             auth, booking, barbers, clients, admin,
                         finance, inventory, shop, notifications
src/shared/              Componentes, tokens, primitivos e PWA
src/test/                Ambiente React Testing Library
public/brand/            Logo oficial original e registro de origem
public/icons/            Ícones técnicos provisórios da PWA
scripts/                 Build seguro da PWA e revisão do repositório
e2e/                     Playwright e axe (desktop, mobile e offline)
.github/workflows/       Validação automática em push e pull request
docs/                    Decisões, contratos, regras e homologação
```

## Telas disponíveis

| Contexto                 | Rotas                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Público                  | `/`, `/agendamento`, `/consulta`, `/produtos`, `/acesso`                                                                            |
| Prévia do barbeiro       | `/previa/barbeiro`, `/agenda`, `/escala`, `/atendimentos`, `/comissoes` sob esse prefixo                                            |
| Prévia administrativa    | `/previa/admin`, `/agendamentos`, `/equipe`, `/servicos`, `/clientes`, `/financeiro`, `/estoque`, `/configuracoes` sob esse prefixo |
| Acesso real indisponível | `/admin/*`, `/barbeiro/*`                                                                                                           |

As prévias são públicas, isoladas e identificadas como demonstração. Não constituem autorização de acesso. Não há seleção de papéis, login simulado ou armazenamento de credenciais. A logo oficial fornecida pelo proprietário está integrada sem alteração do arquivo original; a origem está registrada em `public/brand/README.md`. Os ícones técnicos de instalação continuam provisórios.

## Documentação

- [Roadmap](ROADMAP.md)
- [Mini brandbook](docs/IDENTIDADE_VISUAL.md)
- [Arquitetura](docs/ARQUITETURA.md)
- [Regras de negócio](docs/REGRAS_DE_NEGOCIO.md)
- [Workflow de desenvolvimento](docs/WORKFLOW_DESENVOLVIMENTO.md)
- [Contratos e garantias de dados](docs/CONTRATOS_DE_DADOS.md)
- [Validação e homologação da Fase 01](docs/VALIDACAO_FASE_01.md)
- [Changelog](CHANGELOG.md)

Repositório: https://github.com/patrickbotarick/underdog_system

**Privacidade:** não versionar segredos, dados reais de clientes, backups nem arquivos `.env`.
