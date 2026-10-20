import { ActionLink, PageHeading, UnavailableState } from '../../shared/components/Primitives';

export function AccessPage() {
  return (
    <>
      <PageHeading
        eyebrow="BEM-VINDO À UNDERDOG"
        title="Seu acesso"
        description="Uma experiência simples, com sua identidade protegida."
      />
      <UnavailableState
        title="Acesso seguro em preparação."
        description="Nome e telefone verificado serão a base do agendamento. Uma conta tradicional será opcional. Não coletamos dados pessoais nesta fase."
        action="Acesso indisponível"
      />
      <section className="preview-access">
        <p className="eyebrow">CONHEÇA OS ESPAÇOS DE TRABALHO</p>
        <h2>Prévias da interface</h2>
        <p>
          Explore a estrutura visual. Essas páginas são demonstrações públicas sem acesso a dados ou
          operações.
        </p>
        <div className="hero-actions">
          <ActionLink to="/previa/barbeiro" secondary>
            Prévia do barbeiro
          </ActionLink>
          <ActionLink to="/previa/admin" secondary>
            Prévia da administração
          </ActionLink>
        </div>
      </section>
    </>
  );
}

export function ProtectedUnavailablePage() {
  return (
    <>
      <PageHeading
        eyebrow="ÁREA RESTRITA"
        title="Acesso protegido indisponível"
        description="A validação de sessão e permissões dependerá do servidor."
      />
      <UnavailableState
        title="Autenticação ainda não integrada."
        description="Nenhuma sessão foi criada. Acesso administrativo ou de barbeiro não pode ser concedido pelo navegador."
      />
      <div className="hero-actions">
        <ActionLink to="/acesso" secondary>
          Entender o acesso
        </ActionLink>
      </div>
    </>
  );
}
