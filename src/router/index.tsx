import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard/index";
import WorkSpace from "../Components/Workspace/index";

export const DashboardRouter = [
  {
    id: 'Dashboard',
    path: '/',
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
    component: Dashboard,
  },
  {
    id: 'workspace',
    path: '/workspace',
    children: [
      {
        path: '/workspace',
        name: 'WorkSpace',
        component: WorkSpace,
      },
    ],
    component: WorkSpace,
  },
];

export const AuthRouter = [
  {
    id: 'login',
    path: '/login',
    component: Login,
  },
];

export default [AuthRouter, DashboardRouter];