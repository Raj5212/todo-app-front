import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import  store  from './redux/store';
import Pages from './pages/index'

function App() {
  return (
    <Provider store={store}>
         <Router>
      <Pages/>
      </Router>
    </Provider>
  );
}

export default App;
