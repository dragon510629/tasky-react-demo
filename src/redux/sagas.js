import { call, put, takeEvery } from 'redux-saga/effects';
import {deleteWorkspaceApi, getListWorkSpace, workSpaceDetailAPI, createWorkspaceApi} from '../api/workSpace';
import { getListClientAPI } from '../api/client';
import { saveListWorkspace } from './actions/workspace';
import { saveListClients } from './actions/client';
function* getListWorkspace() {
  try {
    const workspaces = yield call(getListWorkSpace);
    yield put(saveListWorkspace(workspaces.data));
  } catch (e) {
    console.log(1);
  }
}

function* getListClient() {
  try {
    const clients = yield call(getListClientAPI);
    yield put(saveListClients(clients.data));
  } catch (e) {
    console.log(1);
  }
}

function* getWorkspaceDetail(action) {
  try {
    const clients = yield call(workSpaceDetailAPI ,action.id);
    console.log(clients);
  } catch (e) {
    console.log(e);
  }
}

function* deleteWorkspace(action) {
  try {
    yield call(deleteWorkspaceApi,action.payload);
    yield* getListWorkspace();
  } catch (e) {
    console.log(e);
  }
}

function* createWorkspace(action) {
  try {
    yield call(createWorkspaceApi,{name: action.payload.workspaceName, clientId: action.payload.client} );
    yield* getListWorkspace();
  } catch (e) {
    console.log(1);
  }
}

function* rootSaga() {
  yield takeEvery("GET_LIST_WORKSPACE", getListWorkspace);
  yield takeEvery("GET_LIST_CLIENT", getListClient);
  yield takeEvery("GET_WORKSPACE_DETAIL", getWorkspaceDetail);
  yield takeEvery("DELETE_WORKSPACE", deleteWorkspace);
  yield takeEvery("CREATE_WORKSPACE", createWorkspace);
}


export default rootSaga;