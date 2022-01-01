import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users.actions';
import { types } from '../actions/types';
import * as api from '../api/user.api';

// Warkar saga
function* getUsers(){
    try{

        const result = yield call(api.getUser);
        yield put(actions.getUserSuccess({
            items:result.data.data
        }))


    }catch(error){
        yield put(actions.userError({
            error: 'An error occurred when trying to get the user'
        }))
    }
}


// This is a watcher saga
function* watchUsersRequest(){
    yield takeEvery(types.GET_USER_REQUEST, getUsers)
}

function* createUser(action){
    try{
        yield call(api.createUser, { firstName: action.payload.firstName, lastName: action.payload.lastName });
        yield call(getUsers);
    }catch(error){
        yield put(actions.userError({
            error: 'An error occurred when trying to create the user'
        }))
    }
}

function* watchCreateUserRequest(){
    yield takeLatest(types.CREATE_USER_REQUEST, createUser)
}

function* deleteUser(userId){
    try{
        yield call(api.deleteUser, userId);
        yield call(getUsers);
    }catch(error){
        yield put(actions.userError({
            error: 'An error occurred when trying to delete the user'
        }))
    }
}

function* watchDeleteUserRequest() {
    while(true){
        const action = yield take(types.DELETE_USER_REQUEST);
        yield call(deleteUser, {
            userId: action.payload.userId
        });
    }
}

const userSagas = [
    fork(watchUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];

export default userSagas;
