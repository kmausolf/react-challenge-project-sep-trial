import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { Main, Login, OrderForm, ViewOrders } from '../components';
import { useSelector } from 'react-redux';

const requireLogin = (to, from, next) => {

  // if the route requires auth
  if(to.meta.auth) {
    // if the user has a token, let them pass
    if(to.meta?.userToken.length) {
      next();
    }
    // otherwise, send them back to login
    next.redirect("/login");
  }
  else {
    next();
  }
};

const AppRouter = (props) => {
  const userToken = useSelector(state => state.auth.token);

  return (
    <Router>
      <GuardProvider guards={[requireLogin]}>
        <GuardedRoute path="/" exact component={Main} />
        <GuardedRoute path="/login" exact component={Login} />
        <GuardedRoute path="/order" exact component={OrderForm} meta={{ auth: true, userToken }} />
        <GuardedRoute path="/view-orders" exact component={ViewOrders} meta={{ auth: true, userToken }} />
      </GuardProvider>
    </Router>
  );
}

export default AppRouter;
