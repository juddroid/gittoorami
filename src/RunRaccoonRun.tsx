import * as elements from 'typed-html';
import Component from './components/core/Component';

const RunRaccoonRun = () => {
  const [value, setValue] = Component.useState('');

  const handleChangeInput = (e: any) => {
    console.log(e);
    setValue(e.target.value);
  };
  Component.addEvent('change', 'input', handleChangeInput);
  console.log(value);
  return <input id="input" {...{ value }} placeholder={'Run Raccoon Run'} />;
};

export default RunRaccoonRun;
