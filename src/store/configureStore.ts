//如果redux里包含的东西不止前面的则需要使用大括号
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store;