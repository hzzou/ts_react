import { take, call, put, all, takeEvery } from 'redux-saga/effects'

//星号和yield组合表示generator函数
function* helloSaga(){
  yield console.log('Hello Saga')
}
function* Saga_2(){
  yield console.log('Saga_2')
}

export default function* rootSaga(){
  yield all([
    Saga_2(),
    helloSaga()
  ])
}