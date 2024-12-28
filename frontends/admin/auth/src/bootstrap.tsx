import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/Store';

const mount = (
  el: Element | DocumentFragment,
  args?: { pathname?: string }
) => {
  createRoot(el).render(
    <BrowserRouter>
      <Provider store={store}>
        <App history={args?.pathname} />
      </Provider>
    </BrowserRouter>
  );
};

if (process.env.NODE_ENV === 'development' || true) {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
