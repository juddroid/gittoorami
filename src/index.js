/** @jsx createElement */
import App from './App.js';
import Raccoonact from './components/core/Raccoonact.js';
import { createElement } from '../src/utils.js';

const rootElement = document.getElementById('root');
console.log(App());
Raccoonact.render(<App />, rootElement);
