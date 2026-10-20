# ROADMAP OFICIAL — UNDERDOG SYSTEM

## Princípios

As fases são sequenciais para homologação; módulos podem ser preparados previamente, mas não declarados prontos sem testes e aceite. Fechamento exige lint, typecheck, testes pertinentes, build, revisão de segurança, documentação e commit/push.

## Fase 00 — Planejamento e documentação

- [x] Escopo macro aprovado.
- [x] Direção visual preto/branco/dourado proposta.
- [x] Repositório remoto definido.
- [ ] Homologar regras comerciais com proprietário.
- [x] Receber logo oficial fornecida pelo proprietário para uso no projeto (20/10/2026).
- [ ] Validar arquitetura, política de dados e custos de operação.

## Fase 01 — Fundação do produto

- [x] React/TypeScript/Vite, Tailwind, rotas e layout responsivo.
- [x] Design tokens e componentes com verificação inicial de acessibilidade.
- [x] Domínios separados em módulos e contratos tipados; validação real de payloads depende do backend.
- [x] Configuração de lint, testes, build e CI.
- [x] Preparação PWA e cache restrito a recursos estáticos seguros.
- [ ] Autenticação e permissões base com backend/RLS.
- [x] Contratos de autenticação e indisponibilidade segura; prévias públicas isoladas.
- [ ] Homologação visual com logo oficial e dispositivos reais.
- [ ] Aceite da fundação, revisão do CI e integração aprovada à `main`.

As regras identificadas em `docs/REGRAS_DE_NEGOCIO.md` foram aprovadas na solicitação da Fase 01. Ainda faltam parâmetros comerciais e homologações indicados nesse documento. Nenhum item comercial das fases seguintes é concluído pelas interfaces desta fundação. O backend/RLS permanece pendente por escopo; não foi criado banco nem exigida credencial.

## Fase 02 — Agendamento público

- [ ] Catálogo de serviços/combos, duração e preços configuráveis.
- [ ] Seleção de profissional e disponibilidade.
- [ ] Reserva atômica com prevenção de concorrência e conflito.
- [ ] Consulta, cancelamento, reagendamento e confirmação.
- [ ] Testes de fuso horário, limites de agenda e múltiplos serviços.

## Fase 03 — Espaço do barbeiro

- [ ] Agenda diária/semanal individual.
- [ ] Horários, exceções, folgas, pausas e bloqueios.
- [ ] Fluxo de atendimento e histórico privado.
- [ ] Resumo de produtividade e comissões autorizadas.

## Fase 04 — Administração

- [ ] Gestão de barbeiros, clientes, serviços, horários e permissões.
- [ ] Painel operacional e relatórios de agendamento.
- [ ] Ajustes controlados e auditáveis.

## Fase 05 — Financeiro e comissões

- [ ] Registro separado de atendimento, cobrança e recebimento.
- [ ] Receita por período/profissional/serviço.
- [ ] Regras de comissão versionadas, snapshot e cálculos exatos.
- [ ] Fechamentos, pagamentos, estornos e auditoria.

## Fase 06 — Produtos e estoque

- [ ] Cadastro de produtos, fornecedor, custo e preço.
- [ ] Entradas, saídas, reservas e ajustes de inventário.
- [ ] Estoque mínimo e histórico.
- [ ] Vitrine, pedido e reserva para retirada na barbearia.
- [ ] Proteção contra venda acima do estoque disponível.

## Fase 07 — Segurança e homologação

- [ ] Revisão de autenticação, autorização, RLS, LGPD e retenção.
- [ ] Audit logs e rotinas de backup com teste de restauração.
- [ ] Testes de concorrência, pagamento, estoque, acessibilidade e dispositivos reais.
- [ ] Piloto com equipe e dados fictícios.

## Fase 08 — Publicação e operação

- [ ] Escolha de infraestrutura, domínio e ambiente de produção.
- [ ] Monitoramento, procedimento de suporte, incidentes e reversão.
- [ ] Migração autorizada do Booksy somente se suportada.
- [ ] Treinamento da equipe e aceite para release v1.0.0.

## Pós-v1.0

Pagamentos online integrados, WhatsApp automatizado, fidelidade, assinaturas avançadas e integrações externas.
