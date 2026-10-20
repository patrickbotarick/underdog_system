import { Route, Routes } from 'react-router';
import { AccessPage, ProtectedUnavailablePage } from '../modules/auth/AccessPage';
import { BookingPage, HomePage, ReservationPage } from '../modules/booking/PublicPages';
import { ProductsPage } from '../modules/shop/ProductsPage';
import { BarberOverview, BarberPage } from '../modules/barbers/BarberPages';
import { AdminOverview, AdminPage } from '../modules/admin/AdminPages';
import { ActionLink, PageHeading } from '../shared/components/Primitives';
import { RouteEffects } from '../shared/components/RouteEffects';
import { PwaStatus } from '../shared/pwa/PwaStatus';
import { PublicLayout, WorkspaceLayout } from './layouts';

function NotFoundPage() {
  return (
    <>
      <PageHeading
        eyebrow="404 / CAMINHO NÃO ENCONTRADO"
        title="Vamos voltar ao início."
        description="Essa página não faz parte da experiência disponível."
      />
      <ActionLink to="/">Voltar ao início</ActionLink>
    </>
  );
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <PwaStatus />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="agendamento" element={<BookingPage />} />
          <Route path="consulta" element={<ReservationPage />} />
          <Route path="produtos" element={<ProductsPage />} />
          <Route path="acesso" element={<AccessPage />} />
          <Route path="admin/*" element={<ProtectedUnavailablePage />} />
          <Route path="barbeiro/*" element={<ProtectedUnavailablePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="previa/barbeiro" element={<WorkspaceLayout profile="barber" />}>
          <Route index element={<BarberOverview />} />
          <Route path="agenda" element={<BarberPage section="agenda" />} />
          <Route path="escala" element={<BarberPage section="escala" />} />
          <Route path="atendimentos" element={<BarberPage section="atendimentos" />} />
          <Route path="comissoes" element={<BarberPage section="comissoes" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="previa/admin" element={<WorkspaceLayout profile="admin" />}>
          <Route index element={<AdminOverview />} />
          {(
            [
              'agendamentos',
              'equipe',
              'servicos',
              'clientes',
              'financeiro',
              'estoque',
              'configuracoes',
            ] as const
          ).map((section) => (
            <Route key={section} path={section} element={<AdminPage section={section} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <RouteEffects />
    </>
  );
}
