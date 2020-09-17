import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {deleteWorkspaceApi, getListWorkSpace, workSpaceDetail, createWorkspaceApi} from '../api/workSpace';
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

function* mySaga() {
  yield takeEvery("GET_LIST_WORKSPACE", getListWorkspace);
  yield takeEvery("GET_LIST_CLIENT", getListClient);
}


export default mySaga;