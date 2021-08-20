interface Tsx {
  (): string;
}

const Component = () => {
  let $target: Element;
  let $tsx: Tsx;

  const init = (target: Element, tsx: Tsx) => {
    $target = target;
    $tsx = tsx;
  };

  const render = () => ($target.innerHTML = $tsx());

  return { init, render };
};

export default Component;
