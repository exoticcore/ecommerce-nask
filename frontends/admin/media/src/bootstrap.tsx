import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from 'store/Store';
import { BrowserRouter } from 'react-router-dom';

const mount = (el: Element | DocumentFragment, main: string = '') => {
  ReactDOM.createRoot(el).render(
    <BrowserRouter>
      <Provider store={store}>
        <App main={main} />
      </Provider>
    </BrowserRouter>
  );
};

if (process.env.NODE_ENV === 'development' || true) {
  const devRoot = document.querySelector('#_media-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
