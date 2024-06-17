import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import App from './app';
import { RootStore } from './counter-store/counter-mobx';
import { store } from './counter-store/counter-redux';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MobxProvider {...RootStore}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </MobxProvider>
  </React.StrictMode>,
);
