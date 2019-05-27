import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, {Suspense,lazy} from 'react';



//const Loading = lazy(()=>import('../common/Loading/Loading'));
import Loading from '../common/Loading/Loading';
import NotFound from '../common/NotFound/NotFound';
//const NotFound = lazy(()=>import('../common/NotFound/NotFound'));
import Home from '../pages/Home/Home';
//const Home = lazy(()=>import('../pages/Home/Home'));


const Routes = ()=>{
  return(
    <div className="app" > 
      <Router>
        <Switch>
          <Route path={'/404'} component={NotFound} />
          <Route path={'/'} component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes;
