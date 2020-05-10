import React from 'react';
import ReactDOM from 'react-dom';
import { setDefaultOptions } from 'esri-loader';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
// import {createStore} from 'redux';
// import {rootReducer} from './reducers/index';
import {Provider} from 'react-redux';
import store from './store'

setDefaultOptions({ css: true });

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );

serviceWorker.unregister();
