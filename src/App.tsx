import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import queryClient from './lib/queryClient';
import Home from './pages/Home';

const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};

export default App;
