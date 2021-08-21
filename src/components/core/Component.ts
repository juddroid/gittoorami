interface Tsx {
  (): string;
}

interface EventSet {
  click: EventProps[];
}

interface EventProps {
  id: string;
  handler: any;
}

const Component = () => {
  let $target: Element;
  let $tsx: Tsx;

  // hooks
  let stateList: any[] = [];
  let idx: number = 0;

  // events
  let eventSet: EventSet = {
    click: [],
  };

  const init = (target: Element, tsx: Tsx) => {
    $target = target;
    $tsx = tsx;
    render();
  };

  const render = () => {
    idx = 0;
    $target.innerHTML = $tsx();
    document.addEventListener('click', listener);
  };

  const listener = (e: any) => {
    eventSet['click'].forEach((event: any) => {
      if (e.target.id === event.id) {
        e.preventDefault();
        event.handler();
      }
    });
  };

  const addEvent = (eventType: string, id: string, handler: any) => {
    eventSet[eventType].push({ id, handler });
    console.log(eventSet);
  };

  const useState = (initialValue: any) => {
    const state = stateList[idx] || initialValue;
    const i = idx;
    const setState = (newState: any) => {
      stateList[i] = newState;
      render();
    };
    idx++;
    return [state, setState];
  };

  return { init, render, useState, addEvent };
};

export default Component();
