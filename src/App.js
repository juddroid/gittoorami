/** @jsx createElement */
import { createElement } from '../src/utils';
import Raccoonact from './components/core/Raccoonact';

const App = () => {
  const [count, setCount] = Raccoonact.useState(1);

  return (
    <main>
      <h1>
        This is <i>Not</i> React
      </h1>
      <button onClick={() => setCount(count + 1)}>Click me!!!! {count}</button>
    </main>
  );
};

export default App;
