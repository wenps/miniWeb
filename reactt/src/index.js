import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

function render(props) {
  const dom = getRootDom(props)
  try {
    const root = createRoot(dom);
    root.render(<App />)
  } catch (error) {
    console.log(error);
  } 
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
}

export async function mount(props) {
  render(props);
}

export async function unmount(props) {
  const dom = getRootDom(props)
  ReactDOM.unmountComponentAtNode(dom);
}

function getRootDom(props) {
  const { container } = props;
  return container ? container.querySelector('#app') : document.querySelector('#app')
}