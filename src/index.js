import { createRoot } from 'react-dom/client'; // Importa createRoot de react-dom/client
import 'bootstrap/dist/js/bootstrap.js'; // PARA QUE FUNCIONEN LOS DROPDOWN MENUS
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root'); // Obtiene el contenedor
const root = createRoot(container); // Crea la raíz con el contenedor
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
