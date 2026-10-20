import {
  ActionLink,
  FoundationNote,
  PageHeading,
  UnavailableState,
} from '../../shared/components/Primitives';
import { Icon } from '../../shared/components/Icon';
import { BrandLogo } from '../../shared/components/BrandLogo';

export function HomePage() {
  return (
    <>
      <FoundationNote />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="gold-line" />
            UNDERDOG — DARK PREMIUM BARBERSHOP
          </p>
          <h1 tabIndex={-1}>
            SEU ESTILO.
            <br />
            SUAS REGRAS<span className="text-gold">.</span>
          </h1>
          <p className="hero-description">
            Mais do que um corte. Um espaço para cuidar de quem você é, no seu ritmo.
          </p>
          <div className="hero-actions">
            <ActionLink to="/agendamento">Conhecer o agendamento</ActionLink>
            <ActionLink to="/produtos" secondary>
              Explorar produtos
            </ActionLink>
          </div>
          <p className="micro-copy">A próxima experiência Underdog está sendo construída.</p>
        </div>
        <div className="hero-editorial" aria-label="Princípios da experiência">
          <div className="editorial-top">
            <span>EST. UNDERDOG</span>
            <span>01 / FUNDAÇÃO</span>
          </div>
          <div className="editorial-main">
            <BrandLogo variant="hero" />
            <p>
              ATITUDE NO ESTILO.
              <br />
              <span>PRECISÃO NO CUIDADO.</span>
            </p>
          </div>
          <div className="editorial-bottom">
            <span className="status-dot" />
            <p>
              O cuidado começa
              <br />
              antes de sentar na cadeira.
            </p>
            <Icon name="arrow" />
          </div>
        </div>
      </section>
      <section className="experience-section" aria-labelledby="experience-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SEU TEMPO TEM VALOR</p>
            <h2 id="experience-heading">Uma experiência do seu jeito.</h2>
          </div>
          <span className="section-caption">O QUE ESTAMOS PREPARANDO</span>
        </div>
        <div className="feature-grid">
          {[
            {
              icon: 'calendar' as const,
              n: '01',
              title: 'Escolha seu momento',
              text: 'Serviço, profissional e horário. A jornada de agendamento começa aqui.',
            },
            {
              icon: 'user' as const,
              n: '02',
              title: 'Encontre seu profissional',
              text: 'Seu barbeiro de confiança ou o próximo profissional disponível.',
            },
            {
              icon: 'bag' as const,
              n: '03',
              title: 'Leve o cuidado com você',
              text: 'Produtos para sua rotina, com retirada e pagamento na barbearia.',
            },
          ].map((item) => (
            <article className="feature" key={item.n}>
              <div className="feature-top">
                <Icon name={item.icon} />
                <span>{item.n}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="reservation-strip">
        <div>
          <p className="eyebrow">JÁ TEM UM HORÁRIO?</p>
          <h2>Sua próxima visita, mais perto.</h2>
          <p>A consulta de reservas fará parte desta experiência.</p>
        </div>
        <ActionLink to="/consulta" secondary>
          Consultar reserva
        </ActionLink>
      </section>
    </>
  );
}

export function BookingPage() {
  return (
    <>
      <PageHeading
        eyebrow="SEU PRÓXIMO MOMENTO"
        title="Agendamento"
        description="Um cuidado que respeita seu estilo e seu tempo."
      />
      <ol className="journey-steps" aria-label="Etapas previstas do agendamento">
        <li>
          <span>01</span> Serviço
        </li>
        <li>
          <span>02</span> Profissional e horário
        </li>
        <li>
          <span>03</span> Identificação e confirmação
        </li>
      </ol>
      <UnavailableState
        title="Sua cadeira está sendo preparada."
        description="A escolha de serviços e a disponibilidade dos profissionais estarão aqui quando o agendamento for integrado ao servidor."
        action="Agendamento indisponível"
      />
      <div className="info-grid">
        <article>
          <h2>Seu barbeiro ou qualquer profissional</h2>
          <p>
            Você poderá escolher alguém específico ou consultar todos os profissionais habilitados.
          </p>
        </article>
        <article>
          <h2>Confirmação com segurança</h2>
          <p>
            Reservas dependerão de telefone verificado, disponibilidade e confirmação do servidor.
          </p>
        </article>
      </div>
    </>
  );
}

export function ReservationPage() {
  return (
    <>
      <PageHeading
        eyebrow="SEU HORÁRIO, SEM COMPLICAÇÃO"
        title="Minha reserva"
        description="Consulte e acompanhe sua próxima visita à Underdog."
      />
      <UnavailableState
        title="A consulta estará aqui."
        description="Será necessário comprovar a identidade antes de acessar reservas. A verificação de telefone ainda não está disponível."
        action="Consulta indisponível"
      />
      <p className="content-note">
        Cancelamento e reagendamento exigirão confirmação explícita. Mudanças com menos de 24 horas
        de antecedência do atendimento original notificarão o barbeiro.
      </p>
    </>
  );
}
