import ReactDOM from 'react-dom/client';

import { App } from './App';
import { GlobalStyles } from './GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalStyles>
    <App />
  </GlobalStyles>
);
