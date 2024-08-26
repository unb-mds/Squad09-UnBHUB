import ReactDOM from 'react-dom/client';

import { PrimeReactProvider } from 'primereact/api';
import { RouterProvider } from 'react-router-dom';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // primereact/resources/themes/lara-dark-teal/theme.css
import router from './routes/index.tsx';

// primereact/resources/themes/saga-green/theme.css  
// primereact/resources/themes/tailwind-light/theme.css
// primereact/resources/themes/lara-light-indigo/theme.css
// primereact/resources/themes/lara-light-teal/theme.css
// primereact/resources/themes/viva-light/theme.css
// primereact/resources/themes/mira/theme.css 
// primereact/resources/themes/nano/theme.css

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <RouterProvider router={router} />
  </PrimeReactProvider>
);
