import ReactDOM from 'react-dom/client';

import { PrimeReactProvider } from 'primereact/api';
import { RouterProvider } from 'react-router-dom';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css';
import router from './routes/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <RouterProvider router={router} />
  </PrimeReactProvider>
);
