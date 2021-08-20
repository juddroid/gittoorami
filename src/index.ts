import '../styles/index.css';
import App from './App';
import Component from './components/core/Component';

const Root = () => {
  const $root = document.querySelector('#root');
  Component.init($root, App);
};

window.addEventListener('DOMContentLoaded', Root);
