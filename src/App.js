/** @jsx createElement */
import { createElement } from '../src/utils.js';
import Raccoonact from './components/core/Raccoonact.js';

const App = () => {
  const [count, setCount] = Raccoonact.useState(1);
  const [text, setText] = Raccoonact.useState(``);

  return (
    <main>
      <h1>
        This is <i>Not</i> React
      </h1>
      <button onClick={() => setCount(count + 1)}>Click me!!!! {count}</button>
      <input
        value={text}
        placeholder={'input'}
        onChange={(e) => setText(e.target.value)}
      />
    </main>
  );
};

export default App;
