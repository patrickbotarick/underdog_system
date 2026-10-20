export interface NavigationItem {
  path: string;
  label: string;
}
export const publicNavigation: NavigationItem[] = [
  { path: '/', label: 'Início' },
  { path: '/agendamento', label: 'Agendar' },
  { path: '/consulta', label: 'Minha reserva' },
  { path: '/produtos', label: 'Produtos' },
];
export const barberNavigation: NavigationItem[] = [
  { path: '/previa/barbeiro', label: 'Visão geral' },
  { path: '/previa/barbeiro/agenda', label: 'Minha agenda' },
  { path: '/previa/barbeiro/escala', label: 'Minha escala' },
  { path: '/previa/barbeiro/atendimentos', label: 'Atendimentos' },
  { path: '/previa/barbeiro/comissoes', label: 'Comissões' },
];
export const adminNavigation: NavigationItem[] = [
  { path: '/previa/admin', label: 'Dashboard geral' },
  { path: '/previa/admin/agendamentos', label: 'Agendamentos' },
  { path: '/previa/admin/equipe', label: 'Equipe' },
  { path: '/previa/admin/servicos', label: 'Serviços' },
  { path: '/previa/admin/clientes', label: 'Clientes' },
  { path: '/previa/admin/financeiro', label: 'Financeiro' },
  { path: '/previa/admin/estoque', label: 'Produtos e estoque' },
  { path: '/previa/admin/configuracoes', label: 'Configurações' },
];
