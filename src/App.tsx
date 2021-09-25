import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from './lib/queryClient.js';
import ViewPlan from './pages/ViewPlan.js';
import NotFound from './pages/NotFound.js';

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* TODO: Remove this and replace by home implementation */}
            <Redirect to="/view" />
          </Route>
          <Route path="/view/:planId?">
            <ViewPlan />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
