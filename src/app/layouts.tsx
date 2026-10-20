import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { Icon } from '../shared/components/Icon';
import { BrandLogo } from '../shared/components/BrandLogo';
import { adminNavigation, barberNavigation, publicNavigation } from './navigation';

export function PublicLayout() {
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const { pathname } = useLocation();
  const open = menuPath === pathname;
  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <Link className="brand-link" to="/" title="Página inicial">
            <BrandLogo />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="public-nav"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuPath(open ? null : pathname)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
          <nav
            id="public-nav"
            className={`public-nav ${open ? 'is-open' : ''}`}
            aria-label="Principal"
          >
            {publicNavigation.map((item) => (
              <NavLink key={item.path} to={item.path} end onClick={() => setMenuPath(null)}>
                {item.label}
              </NavLink>
            ))}
            <NavLink className="access-link" to="/acesso" onClick={() => setMenuPath(null)}>
              <Icon name="user" />
              Acessar
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1} className="container public-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <BrandLogo variant="footer" />
            <p>Identidade. Atitude. Cuidado.</p>
          </div>
          <div>
            <p className="eyebrow">Explore a fundação</p>
            <Link to="/previa/barbeiro">
              Prévia do barbeiro <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/previa/admin">
              Prévia da administração <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="footer-caption">
            Fase 01 · Interfaces em preparação.
            <br />
            Nenhuma reserva ou venda é realizada aqui.
          </p>
        </div>
      </footer>
    </>
  );
}

export function WorkspaceLayout({ profile }: { profile: 'barber' | 'admin' }) {
  const navigation = profile === 'barber' ? barberNavigation : adminNavigation;
  const name = profile === 'barber' ? 'Barbeiro' : 'Administração';
  return (
    <div className="workspace">
      <aside className="workspace-sidebar">
        <Link className="brand-link" to="/" title="Página inicial">
          <BrandLogo variant="workspace" />
        </Link>
        <p className="eyebrow sidebar-label">{name}</p>
        <nav aria-label={`Prévia: ${name}`}>
          {navigation.map((item, index) => (
            <NavLink end key={item.path} to={item.path}>
              <span className="nav-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="back-link" to="/">
          ← Voltar ao site
        </Link>
      </aside>
      <div className="workspace-body">
        <header className="workspace-header">
          <span>{name} / Prévia da interface</span>
          <span className="demo-tag">DEMONSTRAÇÃO</span>
        </header>
        <div className="demo-notice" role="note">
          Prévia pública e isolada. Sem autenticação, permissões ou dados reais.
        </div>
        <main id="conteudo" tabIndex={-1} className="workspace-main">
          <Outlet />
        </main>
        <footer className="workspace-footer">
          UNDERDOG SYSTEM <span>Fundação técnica · Fase 01</span>
        </footer>
      </div>
    </div>
  );
}
