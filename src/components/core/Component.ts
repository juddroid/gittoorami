interface Tsx {
  (): string;
}

const Component = () => {
  let $target: Element;
  let $tsx: Tsx;

  const init = (target: Element, tsx: Tsx) => {
    $target = target;
    $tsx = tsx;
    render();
  };

  const render = () => ($target.innerHTML = $tsx());

  return { init, render };
};

export default Component();
