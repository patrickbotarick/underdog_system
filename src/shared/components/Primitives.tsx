import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Icon } from './Icon';

export function ActionLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? 'button-secondary' : ''}`} to={to}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1 tabIndex={-1}>{title}</h1>
      <p className="lede">{description}</p>
    </header>
  );
}

export function UnavailableState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <section className="empty-state" aria-label={title}>
      <span className="empty-icon">
        <Icon name="clock" />
      </span>
      <p className="eyebrow">Em preparação</p>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && (
        <button className="button button-secondary" disabled>
          {action}
        </button>
      )}
      <span className="status-caption">Nenhuma operação ou dado real disponível nesta fase.</span>
    </section>
  );
}

export function FoundationNote() {
  return (
    <p className="foundation-note">
      <span className="status-dot" />
      Fundação em desenvolvimento · Operações online ainda indisponíveis
    </p>
  );
}
