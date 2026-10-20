# REGRAS DE NEGÓCIO — UNDERDOG SYSTEM

## Regras aprovadas pelo proprietário — Fase 01

As regras identificadas abaixo foram aprovadas na solicitação da Fase 01. São requisitos para implementação futura; esta fase prepara interfaces e contratos, sem executar operações comerciais. Em caso de divergência com a proposta histórica ao final deste documento, prevalecem as regras aprovadas.

### UND-FIN-001 — Comissões
- Serviços: percentual fixo individual por barbeiro.
- Produtos e acessórios: percentual específico por combinação de barbeiro e produto.
- Calcular sobre os valores efetivos; regras de desconto e estorno ainda serão detalhadas.
- Preservar o percentual histórico aplicado em cada transação.

### UND-FIN-002 — Recebimentos
- Cada barbeiro recebe individualmente os pagamentos de seus clientes.
- Administrador acompanha os valores consolidados.
- Separar atendimento, pagamento e repasse.

### UND-FIN-003 — Repasses
- Fechamentos periódicos semanais ou mensais, configurados por profissional.
- Manter histórico de fechamentos, repasses, ajustes e pendências.

### UND-AGE-001 — Escalas individuais
- Cada barbeiro gerencia sua escala semanal, horários, intervalos, folgas e bloqueios.
- Administrador gerencia todas as agendas e configurações globais.
- Explicitar conflitos de alterações que afetem reservas existentes.

### UND-AGE-002 — Cancelamento e reagendamento
- Cliente pode solicitar cancelamento ou reagendamento; exigir confirmação explícita.
- Mudanças com menos de 24 horas de antecedência do atendimento original notificam o barbeiro.
- Registrar histórico e auditoria; impedir conflitos de disponibilidade.

### UND-AGE-003 — Não comparecimento
- Barbeiro pode marcar ausência após o início previsto; manter histórico do cliente.
- Não aplicar punição ou bloqueio automático.
- Ausência não gera receita nem comissão automaticamente.

### UND-AGE-004 — Agendamento manual
- Administração pode cadastrar agendamentos; barbeiro pode cadastrar na própria agenda.
- Registrar origem: aplicativo, presencial, telefone ou WhatsApp.
- Validar conflitos; exceções administrativas exigem autorização explícita e auditoria.

### UND-AGE-005 — Antecedência mínima
- Administrador configura antecedência mínima para agendamento público, validada no servidor.
- Permitir exceções administrativas auditadas.
- Preparar suporte futuro à antecedência máxima configurável.

### UND-AGE-006 — Seleção de profissional
- Cliente escolhe um barbeiro ou “Qualquer profissional disponível”.
- Modo geral apresenta horários de todos os habilitados; modo específico, somente daquele barbeiro.
- Registrar o profissional responsável na confirmação da reserva.

### UND-AGE-007 — Limite de agendamentos por cliente
- Administrador define um inteiro positivo máximo de agendamentos futuros ativos por cliente.
- Não contar reservas canceladas, concluídas ou não comparecidas.
- Reagendamento não consome nova vaga; redução do limite não cancela reservas confirmadas.
- Validar no servidor, com proteção contra simultaneidade e identidade verificada do cliente.
- Permitir exceções administrativas auditadas.

### UND-EST-001 — Produtos
- Cliente escolhe e reserva online; pagamento presencial na retirada.
- Separar estoque físico, reservado e disponível.
- Registrar vendedor responsável para cálculo da comissão.

### UND-EST-002 — Prazo de retirada
- Prazo configurável pelo administrador.
- Expiração automática libera quantidades reservadas com segurança.
- Prorrogações e cancelamentos administrativos auditados.

### UND-AUTH-001 — Identificação do cliente
- Agendamento simples com nome e telefone verificado; conta tradicional opcional.
- Vincular reservas anteriores à conta somente após comprovar identidade.
- Proteger verificação de telefone contra abuso.
- Provedor SMS/WhatsApp pendente de homologação.

## Decisões técnicas propostas

Contratos tipados, valores financeiros em centavos inteiros BRL, percentuais em pontos-base (1% = 100), instantes ISO 8601 com offset e fuso IANA da unidade. API validará entradas e permissões; PostgreSQL/RLS e transações protegerão concorrência. Estas são propostas técnicas, não regras comerciais adicionais. Ver [arquitetura](ARQUITETURA.md) e [contratos de dados](CONTRATOS_DE_DADOS.md).

## Questões ainda pendentes

Catálogo e preços reais; escalas iniciais; percentuais individuais; descontos, taxas, arredondamento e estornos; datas e responsáveis por fechamentos; meios de pagamento; tolerância e eventuais consequências comerciais de cancelamento; valores de antecedência e limite; produtos e prazo de retirada; provedor de verificação e notificação; base legal, retenção e migração autorizada do Booksy.

## Proposta histórica da Fase 00 (preservada)

O texto abaixo registra as hipóteses originais. Perguntas parcialmente respondidas pelas regras acima permanecem aqui para rastreabilidade e não reabrem decisões já aprovadas.

## Agendamento
Serviço possui duração, preço e profissionais habilitados. Reserva pode combinar serviços, segundo regra de preço/tempo configurável. Respeitar expediente, bloqueios, folgas, feriados e concorrência. Somente confirmação do servidor efetiva agendamento. Definir antecedência, tolerância, cancelamento, reagendamento e no-show.

## Operação
Agendado, confirmado, em atendimento, concluído, cancelado e faltou são estados distintos. Atendimento concluído **não** representa automaticamente recebimento.

## Financeiro
Cada pagamento referencia sua origem, meio, status e eventuais ajustes. Comissão pode variar por profissional/serviço; registrar a porcentagem vigente no momento da execução. Fechamentos preservam histórico e ajustes auditáveis. Separar receita bruta, recebida, contas pendentes, comissões e resultado operacional estimado.

## Estoque e loja
Registrar produto, entrada, saída, ajuste e reserva, com autor/motivo. Estoque disponível = físico menos reservado. Pedidos de retirada devem ter prazo e estado; proteger contra baixa em duplicidade e estoque negativo.

## Acesso
Cliente vê somente reservas e pedidos próprios. Barbeiro vê sua agenda, atendimentos e informações financeiras autorizadas. Admin gerencia serviços, agenda global, estoque, equipe e financeiro. Exceções com permissão explícita.

## Perguntas ao proprietário antes da implementação funcional
1. Serviços, preços, durações e combinações atuais?
2. Horários da loja e de cada barbeiro? Intervalos, folgas e encaixes?
3. Percentual de comissão por barbeiro e por serviço? Regras de desconto e taxa?
4. Dinheiro, Pix, cartão, recebimentos parcelados? Quem fecha o caixa?
5. Agendamento sem conta, por telefone verificado, ou com cadastro?
6. Regras de cancelamento, atraso, reagendamento e não comparecimento?
7. Quais produtos vendidos, estoque físico inicial, retirada e reservas?
8. Exportação autorizada de dados do Booksy e consentimento/base legal?
