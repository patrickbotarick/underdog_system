import { Link } from 'react-router';
import { adminNavigation } from '../../app/navigation';
import { PageHeading, UnavailableState } from '../../shared/components/Primitives';

const descriptions = {
  agendamentos: [
    'Agendamentos',
    'Uma operação alinhada, do início ao fim.',
    'Criação manual, origem e conflitos serão validados pelo servidor. Exceções administrativas exigirão autorização explícita e auditoria.',
  ],
  equipe: [
    'Equipe',
    'Pessoas que constroem a experiência.',
    'Profissionais, permissões e escalas estarão disponíveis após integração segura.',
  ],
  servicos: [
    'Serviços',
    'O catálogo do seu cuidado.',
    'Serviços, durações, preços e profissionais habilitados ainda não foram cadastrados.',
  ],
  clientes: [
    'Clientes',
    'Relacionamentos com privacidade.',
    'Dados de clientes exigem identidade verificada, controle de acesso e política de retenção.',
  ],
  financeiro: [
    'Financeiro',
    'Clareza para acompanhar a operação.',
    'Recebimentos individuais, consolidação e repasses são domínios separados. Não há valores ou movimentações nesta prévia.',
  ],
  estoque: [
    'Produtos e estoque',
    'Cada movimento, no seu lugar.',
    'Estoque físico, reservado e disponível dependerão de transações auditáveis no servidor.',
  ],
  configuracoes: [
    'Configurações',
    'As regras da sua operação.',
    'Antecedência, limite de reservas, prazos de retirada e fechamentos terão configuração validada no servidor.',
  ],
} as const;

export function AdminOverview() {
  return (
    <>
      <PageHeading
        eyebrow="ADMINISTRAÇÃO / DEMONSTRAÇÃO"
        title="A operação por inteiro."
        description="Uma base para acompanhar a Underdog com clareza e responsabilidade."
      />
      <div className="workspace-intro">
        <div>
          <p className="eyebrow">VISÃO CONSOLIDADA</p>
          <h2>
            Decisões começam
            <br />
            com informação confiável.
          </h2>
        </div>
        <p>
          Receita, atendimentos e estoque serão apresentados após a integração. Nenhum indicador
          real está disponível.
        </p>
      </div>
      <div className="overview-cards">
        {adminNavigation.slice(1).map((item, index) => (
          <Link className="workspace-card" key={item.path} to={item.path}>
            <span className="eyebrow">0{index + 1} / EM PREPARAÇÃO</span>
            <h2>{item.label}</h2>
            <span>
              Explorar estrutura <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export function AdminPage({ section }: { section: keyof typeof descriptions }) {
  const [title, subtitle, description] = descriptions[section];
  return (
    <>
      <PageHeading eyebrow="ADMINISTRAÇÃO / DEMONSTRAÇÃO" title={title} description={subtitle} />
      <UnavailableState title="Gestão segura em preparação." description={description} />
    </>
  );
}
