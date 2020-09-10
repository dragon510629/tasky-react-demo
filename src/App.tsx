import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardLayout from '../src/layouts/Dashboard/dashboardLayout';
import AuthLayout from '../src/layouts/Auth';
import {AuthRouter as Auth, DashboardRouter as Dashboard} from '../src/router/index';

const childRoutes = (Layout: any, routes: any) =>
  routes.map(({ children, path, component: Component }: any, index: any) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }: any, index: any) => (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

function App() {
  return (
    <div>
      <Switch>
        {childRoutes(DashboardLayout, Dashboard)}
        {childRoutes(AuthLayout, Auth)}
      </Switch>
    </div>
  )
}

export default App;