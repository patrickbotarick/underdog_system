import { Link } from 'react-router';
import { barberNavigation } from '../../app/navigation';
import { PageHeading, UnavailableState } from '../../shared/components/Primitives';

const details = {
  agenda: [
    'Minha agenda',
    'Seu dia, com clareza.',
    'Agendamentos e disponibilidade dependerão de uma sessão verificada e dados do servidor.',
  ],
  escala: [
    'Minha escala',
    'Seu ritmo de trabalho.',
    'Horários semanais, intervalos, folgas e bloqueios serão validados com as reservas existentes.',
  ],
  atendimentos: [
    'Atendimentos',
    'Cada atendimento tem sua história.',
    'Conclusão e ausência terão histórico e auditoria. Um atendimento não gera um pagamento automaticamente.',
  ],
  comissoes: [
    'Comissões',
    'Transparência em cada fechamento.',
    'Percentuais históricos, valores efetivos e repasses serão fornecidos pelo backend. Nenhum valor foi calculado nesta prévia.',
  ],
} as const;

export function BarberOverview() {
  return (
    <>
      <PageHeading
        eyebrow="ESPAÇO DO BARBEIRO / DEMONSTRAÇÃO"
        title="Seu trabalho. Seu ritmo."
        description="A estrutura para organizar o dia e acompanhar cada atendimento."
      />
      <div className="overview-cards">
        {barberNavigation.slice(1).map((item, index) => (
          <Link className="workspace-card" key={item.path} to={item.path}>
            <span className="eyebrow">0{index + 1} / EM PREPARAÇÃO</span>
            <h2>{item.label}</h2>
            <span>
              Explorar estrutura <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
      <UnavailableState
        title="Uma visão real começa com dados seguros."
        description="Nenhum profissional está autenticado e nenhuma agenda está conectada. Indicadores aparecerão após a integração autorizada."
      />
    </>
  );
}

export function BarberPage({ section }: { section: keyof typeof details }) {
  const [title, subtitle, description] = details[section];
  return (
    <>
      <PageHeading
        eyebrow="ESPAÇO DO BARBEIRO / DEMONSTRAÇÃO"
        title={title}
        description={subtitle}
      />
      <UnavailableState title="Seu espaço está em preparação." description={description} />
    </>
  );
}
