import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/workspace";


function WorkspaceDetail() {
  return (
    <h1>sss</h1>
  );
}


const mapStateToProps = (state: any) : any => {
  return {
    workspace : state.workspace,
  }
}

const mapActionToProps = (dispatch : any) => {
  return {
    saveListWorkspace : (data : []) => {
      dispatch(actions.saveListWorkspace(data));
    },
    selectedWorkspace : (data : {}) => {
      dispatch(actions.selectWorkspace(data));
    },
  }
}

export default connect(mapActionToProps, mapStateToProps)(WorkspaceDetail);