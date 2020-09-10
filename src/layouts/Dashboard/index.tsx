import Container from "@material-ui/core/Container";
import React, {Component} from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/auth";
import DashboardLayout from './dashboardLayout'
const Index = ({component: Component, ...rest} : any) => {
  return (
    <Route {...rest} render={matchProps => (
      <DashboardLayout>
        <Component {...matchProps} />
      </DashboardLayout>
    )} />
  )
};

const mapStateToProps = (state: any) : any => {
  return {
    user : state.user,
  }
}

const mapActionToProps = (dispatch : any, props : any) => {
  return {
    saveAuth : (key : string) => {
      dispatch(actions.saveAuth(key));
    }
  }
}

export default connect(mapStateToProps,mapActionToProps)(Index);