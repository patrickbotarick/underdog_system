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
