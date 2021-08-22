/** @jsx createElement */
import '../styles/index.css';
import App from './App';
import Raccoonact from './components/core/Raccoonact';
import { createElement } from '../src/utils';

const rootElement = document.getElementById('root');
console.log(App());
Raccoonact.render(<App />, rootElement);
