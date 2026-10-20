import { Component, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-page">
          <p className="eyebrow">Underdog</p>
          <h1>Não foi possível abrir esta tela.</h1>
          <p>Recarregue a página para tentar novamente.</p>
          <a className="button" href="/">
            Voltar ao início
          </a>
        </main>
      );
    return this.props.children;
  }
}
