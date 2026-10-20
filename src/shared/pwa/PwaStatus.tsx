import { useEffect, useState } from 'react';
import { registerWorker } from './register';

interface InstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [install, setInstall] = useState<InstallEvent | null>(null);
  const [workerError, setWorkerError] = useState(false);
  useEffect(() => {
    const connected = () => setOnline(true);
    const disconnected = () => setOnline(false);
    const installable = (event: Event) => {
      event.preventDefault();
      setInstall(event as InstallEvent);
    };
    const installed = () => setInstall(null);
    window.addEventListener('online', connected);
    window.addEventListener('offline', disconnected);
    window.addEventListener('beforeinstallprompt', installable);
    window.addEventListener('appinstalled', installed);
    let active = true;
    void registerWorker((worker) => {
      if (active) setWaiting(worker);
    }).catch(() => {
      if (active) setWorkerError(true);
    });
    return () => {
      active = false;
      window.removeEventListener('online', connected);
      window.removeEventListener('offline', disconnected);
      window.removeEventListener('beforeinstallprompt', installable);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);
  async function promptInstall() {
    if (!install) return;
    await install.prompt();
    await install.userChoice;
    setInstall(null);
  }
  function update() {
    if (!waiting) return;
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), {
      once: true,
    });
    waiting.postMessage({ type: 'SKIP_WAITING' });
  }
  return (
    <>
      {!online && (
        <div className="system-status" role="status">
          Você está offline. Apenas a estrutura da interface está disponível; nenhuma reserva,
          pagamento ou movimentação pode ser confirmada.
        </div>
      )}
      {workerError && (
        <div className="system-status" role="status">
          Modo de instalação indisponível neste navegador. A navegação online continua disponível.
        </div>
      )}
      {waiting && (
        <div className="system-status" role="status">
          Uma nova versão está disponível.<button onClick={update}>Atualizar agora</button>
        </div>
      )}
      {install && (
        <div className="system-status">
          <span>Tenha a interface Underdog na tela inicial.</span>
          <button onClick={() => void promptInstall()}>Instalar aplicativo</button>
          <button onClick={() => setInstall(null)}>Agora não</button>
        </div>
      )}
      <details className="install-help">
        <summary>Instalar no celular ou computador</summary>
        <p>
          Em um endereço HTTPS, use “Instalar aplicativo” no navegador. No Safari do iPhone, toque
          em Compartilhar e “Adicionar à Tela de Início”. A disponibilidade depende do navegador. O
          ícone atual é técnico e provisório; a logo oficial está pendente. A instalação não
          habilita operações comerciais.
        </p>
      </details>
    </>
  );
}
