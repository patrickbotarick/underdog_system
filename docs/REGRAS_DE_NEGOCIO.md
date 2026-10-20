# REGRAS DE NEGÓCIO — PROPOSTA PARA HOMOLOGAÇÃO

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
