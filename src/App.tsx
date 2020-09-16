import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DashboardLayout from '../src/layouts/Dashboard/dashboardLayout';
import AuthLayout from '../src/layouts/Auth';
import {AuthRouter as Auth, DashboardRouter as Dashboard} from '../src/router/index';
import {connect} from "react-redux";
import * as actions from "./redux/actions/auth";

const childRoutes = (Layout: any, token : string, routes: any) =>
  routes.map(({ children, path, component: Component }: any, index: any) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }: any, index: any) => (
        <Route
          key={index}
          path={path}
          exact
          render={(props) =>
              token ? (
              <Layout>
              <Component {...props} />
            </Layout>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
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

function App({auth}:any) {
  return (
    <div>
      <Switch>
        {childRoutes(DashboardLayout, auth.token, Dashboard)}
        {childRoutes(AuthLayout, auth.token, Auth)}
      </Switch>
    </div>
  )
}

const mapStateToProps = (state: any) : any => {
    return {
        auth : state.main,
    }
}

const mapActionToProps = (dispatch : any) => {
    return {
        saveAuth : (key : string) => {
            dispatch(actions.saveAuth(key));
        },
        saveUserInfo : (data : any) => {
            dispatch(actions.saveUser(data));
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(App);