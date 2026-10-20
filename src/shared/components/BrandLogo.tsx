/** Asset original fornecido pelo proprietário, sem redesenho, recorte ou filtros. */
export function BrandLogo({
  variant = 'header',
}: {
  variant?: 'header' | 'footer' | 'workspace' | 'hero';
}) {
  return (
    <img
      className={`brand-logo brand-logo--${variant}`}
      src="/brand/underdog-logo.png"
      alt="Underdog Barbearia"
      width={640}
      height={427}
      decoding="async"
    />
  );
}
