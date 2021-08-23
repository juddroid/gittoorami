import { createElement, render } from '../../utils.js';

const Raccoonact = (() => {
  let stateList = [];
  let idx = 0;
  // function workLoop() {
  //   idx = 0;
  //   render(stateList)();
  //   setTimeout(workLoop, 300);
  // }
  // setTimeout(workLoop, 300);
  const useState = (initialValue) => {
    let state = stateList[idx] || initialValue;
    let _idx = idx;
    let setState = (newVal) => {
      stateList[_idx] = newVal;
      idx = 0;
      render(stateList)();
    };
    idx++;
    return [state, setState];
  };
  const useRef = (value) => useState({ current: value })[0];

  const useEffect = (cb, deps) => {
    const oldDeps = stateList[idx];
    let hasChanged = true;
    if (oldDeps)
      hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
    if (hasChanged) cb();
    stateList[idx] = deps;
  };

  return {
    useState,
    render: render(stateList),
    useEffect,
    useRef,
    createElement,
  };
})();

export default Raccoonact;
