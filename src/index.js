import ReactDOM from 'react-dom';
/* import ReactGA from 'react-ga4'; */
import 'bootstrap/dist/js/bootstrap.js'; // PARA QUE FUNCIONEN LOS DROPDOWN MENUS
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import reportWebVitals from './reportWebVitals';

/* const Tracking_ID = 'G-LN814BQ9FL';
ReactGA.initialize(Tracking_ID); */

/* ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals(); */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
