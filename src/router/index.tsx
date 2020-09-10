import React from 'react';
import Login from "../Components/Login";
import Dashboard from "../Components/Workspace/index";

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
];

export const AuthRouter = [
  {
    id: 'login',
    path: '/login',
    component: Login,
  },
];

export default [AuthRouter, DashboardRouter];