/** @jsx createElement */
import App from './App.js';
import Raccoonact from './components/core/Raccoonact.js';
import { createElement } from '../src/utils.js';

const rootElement = document.getElementById('root');
Raccoonact.render(<App />, rootElement);
