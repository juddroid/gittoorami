import HomeSweetHome from './HomeSweetHome';
import '../styles/index.css';

const App = () => {
  const $root = document.querySelector('#root');
  $root.innerHTML = HomeSweetHome();
};

window.addEventListener('DOMContentLoaded', App);
