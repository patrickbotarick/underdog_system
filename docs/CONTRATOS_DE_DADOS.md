# Contratos de domínio — Fase 01

Contratos TypeScript estão em `src/modules/*/contracts.ts` e `src/shared/domain/types.ts`. São propostas técnicas para revisão, não esquema SQL, migrações ou validação de payload em runtime. Não há backend, banco ou SDK Supabase instalado. Não existem dados reais ou seeds. Nomes históricos `customers`/`scheduling` foram mapeados para `clients`/`booking`; serviços, escalas e exceções pertencem a `barbers`, atendimentos a `booking`, auditoria a `shared` nesta fundação.

## Entidades e limites

| Domínio       | Contratos                                                                            | Responsabilidade futura                                |
| ------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| auth          | User, Profile, VerifiedSession, AuthGateway, PhoneVerificationGateway                | Sessão, identidade, vínculo de reservas, rate limit    |
| clients       | ClientIdentity, ClientPolicy                                                         | Telefone verificado e políticas por identidade         |
| barbers       | Barber, Service, WeeklyAvailability, ScheduleException                               | Habilitação, duração, preço, escala e conflitos        |
| booking       | Booking, BookingItem, Attendance, BookingGateway                                     | Reserva, mudança confirmada, atendimento e ausência    |
| finance       | Payment, CommissionRule, CommissionEntry, Settlement, Transfer, SettlementAdjustment | Recebimento individual, snapshot, fechamento e repasse |
| inventory     | Product, StockBalance, InventoryMovement                                             | Físico, reservado, disponível e razão de movimento     |
| shop          | ProductReservation, ProductReservationGateway                                        | Retirada presencial, vendedor e expiração              |
| admin         | OperationSettings, ServerAuthorizationDecision                                       | Configuração e autorização de exceções                 |
| notifications | NotificationEvent                                                                    | Outbox de alterações tardias, sem provedor definido    |
| shared        | Money, AuditEvent, Result, IdempotentCommand                                         | Primitivos, falhas, rastreabilidade e idempotência     |

IDs e instantes são strings nesta etapa; não oferecem garantia de integridade. O backend deverá validar UUIDs/IDs, formatos, relações, tamanhos, enumerações e limites. Valores monetários usam inteiros seguros em centavos BRL; percentuais, inteiros em pontos-base entre 0 e 10000. PostgreSQL poderá usar inteiros/NUMERIC exatos, sem ponto flutuante em cálculo comercial. A política de arredondamento depende de homologação. O helper frontend somente formata valores, nunca calcula comissão ou repasse.

Instantes transacionais devem usar ISO 8601 com offset, persistidos como `timestamptz`; escalas locais guardam fuso IANA por unidade (proposta inicial: America/Sao_Paulo). O servidor interpreta intervalos, virada de dia e mudanças de fuso. `version` suporta concorrência otimista. Chaves de idempotência devem ser vinculadas a ator e operação, com payload e resultado persistidos.

## Garantias transacionais obrigatórias no backend futuro

1. **Reserva atômica:** selecionar profissional habilitado inclusive no modo geral; validar serviço, preço, duração, escala e antecedência na mesma transação. Impedir sobreposição para estados que ocupam agenda por constraint de exclusão/locks no PostgreSQL, inclusive contra atualizações simultâneas de escala.
2. **Limite por identidade:** contar reservas futuras ativas com lock por identidade verificada ou serialização equivalente. Duas requisições não podem ultrapassar o limite. Reagendar modifica a mesma reserva, sem criar nova vaga. Reduzir configuração não cancela reservas existentes. Definir formalmente quais estados ativos contam antes da implementação.
3. **Mudanças e ausência:** cancelamento/reagendamento exigem confirmação explícita e versão esperada. Validar nova disponibilidade antes de liberar o slot original. Registrar antes/depois e auditoria; alterações com diferença estritamente menor que 24 horas em relação ao início original geram outbox na mesma transação. A marcação de ausência só pode ocorrer após o início previsto, por barbeiro autorizado, sem punição, receita ou comissão automática.
4. **Exceções:** autorização explícita deve ser comprovada no servidor; IDs ou razões enviados pelo frontend não constituem permissão. Registrar autor, motivo, política, antes/depois e correlação. Barbeiro atua na própria agenda; administrador, conforme políticas autorizadas, no conjunto.
5. **Estoque:** `disponível = físico - reservado`, sempre não negativo. Reserva, retirada, cancelamento e expiração usam locks/updates condicionais e idempotência; workers concorrentes não liberam ou baixam a mesma quantidade duas vezes. Quantidades são inteiras positivas. Expiração e retirada disputam a mesma transação/versão, com relógio do servidor. Toda venda registra vendedor antes de gerar comissão.
6. **Financeiro:** atendimento, pagamento e repasse são registros separados. Recebedor é o barbeiro; consolidação administrativa não altera essa autoria. Serviços usam percentual individual do barbeiro; produtos usam combinação barbeiro/produto. Snapshot de base efetiva, percentual e regra torna histórico imutável. Ajustes/estornos são novos lançamentos auditados, sem reescrever fechamento. Conciliação e arredondamento serão homologados antes de calcular valores.
7. **Autorização:** Supabase Auth e identidade por telefone dependerão de tokens verificados no servidor, RLS por cliente/profissional/unidade e auditoria de operações privilegiadas. Conta é opcional para cliente; vincular histórico exige comprovação de identidade. Não confiar em papel, valor, preço, vendedor ou cliente vindo do navegador. Proteger desafios telefônicos contra enumeração, replay, força bruta e abuso, com limites e expiração.
8. **Notificações:** outbox persistida junto à mudança; envio assíncrono idempotente, retentativas e registro de falha. Nenhum SMS/WhatsApp é enviado nesta fase. Cancelamentos tardios não pressupõem taxas ou penalidades.

## Erros e indisponibilidade

`Result<T>` diferencia indisponibilidade, sessão ausente, proibição, validação, conflito, limite, falta de estoque e rate limit. Mapear futuramente para respostas HTTP sem dados pessoais nos logs ou erros. O único adapter atual, `unavailableAuthGateway`, sempre falha fechado: não emite tokens, não fabrica papéis e não usa storage. Rotas `/admin/*` e `/barbeiro/*` exibem indisponibilidade; `/previa/*` contém apenas shells públicos sem consultas de dados.

## Decisões pendentes

Schema SQL e migrations, fornecedor de identidade telefônica, RLS revisada/testada, regras de rounding/desconto/estorno, estados ativos e limites concretos, política de retenção LGPD e audit log, infraestrutura, tarefas de expiração, outbox, observabilidade e testes concorrentes. Estas garantias não estão implementadas nesta fase.
