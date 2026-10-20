import { PageHeading, UnavailableState } from '../../shared/components/Primitives';

export function ProductsPage() {
  return (
    <>
      <PageHeading
        eyebrow="O CUIDADO CONTINUA"
        title="Produtos disponíveis"
        description="Sua rotina também merece a experiência Underdog."
      />
      <UnavailableState
        title="Nossa seleção está em preparação."
        description="O catálogo exibirá somente produtos cadastrados e disponibilidade confirmada pelo servidor. Nenhum produto ou preço está disponível nesta prévia."
        action="Reserva de produto indisponível"
      />
      <div className="info-grid">
        <article>
          <h2>Reserve online. Retire na barbearia.</h2>
          <p>
            O pagamento será presencial na retirada. O prazo de reserva será informado antes da
            confirmação.
          </p>
        </article>
        <article>
          <h2>Disponibilidade de verdade</h2>
          <p>
            A confirmação dependerá do estoque disponível, com controle seguro das quantidades
            reservadas.
          </p>
        </article>
      </div>
    </>
  );
}
