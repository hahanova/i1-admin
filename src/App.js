import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/header/header';
import Routing from './routes/router';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routing />
      </Router>
    </Provider>
  );
}

export default App;
