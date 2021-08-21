import * as elements from 'typed-html';
import Component from './components/core/Component';

const HomeSweetHome = () => {
  const [count, setCount] = Component.useState(0);

  const handleClickButton = () => setCount(count + 1);
  Component.addEvent('click', 'home', handleClickButton);

  return (
    <div>
      <div>counter: {count}</div>
      <button id="home">보일러 한 대 놓아드리기</button>
    </div>
  );
};

export default HomeSweetHome;
