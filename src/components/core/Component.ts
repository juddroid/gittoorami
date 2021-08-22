interface Tsx {
  (): string;
}

interface EventSet {
  click: EventProps[];
  change: EventProps[];
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
    change: [],
  };

  const init = (target: Element, tsx: Tsx) => {
    $target = target;
    $tsx = tsx;
    render();
  };

  const render = () => {
    // initialize
    idx = 0;
    eventSet['click'].length = 0;

    $target.innerHTML = $tsx();
    // document.addEventListener('click', (e) => listener(e, 'click'));
    // document.addEventListener('change', (e) => listener(e, 'change'));
  };

  const listener = (e: any, eventType: string) => {
    eventSet[eventType].forEach((event: any) => {
      if (e.target.id === event.id) {
        e.preventDefault();
        event.handler();
      }
    });
  };

  const addEvent = (eventType: string, id: string, handler: any) => {
    eventSet[eventType].push({ id, handler });
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
