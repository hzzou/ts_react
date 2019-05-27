import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import Routes from './route/index';
//import './flexible.debug';


const store = configureStore;
class App extends React.Component{
  render(){
    return(
      <Routes />
      // <Provider store={store}>
        
      // </Provider>
    )
  }
}

export default App;