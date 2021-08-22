let _Component = null;
let _root = null;
let _hooks = null;

export const render =
  (hooks) =>
  (Component = _Component, root = _root) => {
    console.log(hooks);
    if (JSON.stringify(hooks) === _hooks) return;
    else _hooks = JSON.stringify(hooks);
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    const renderDom = getRenderDom(Component, root);
    _Component = Component;
    _root = root;
    const dom = createDom(renderDom);
    // mount the new ones
    root.appendChild(dom);
  };

export const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
};
const createTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

export const createDom = (fiber) => {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  const props = fiber.props || {};
  updateDom(dom, {}, props);
  if (props.children) {
    props.children.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => {
          dom.appendChild(createDom(el));
        });
      } else {
        dom.appendChild(createDom(child));
      }
    });
  }
  return dom;
};
const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
const updateDom = (dom, prevProps, nextProps) => {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => (dom[name] = ''));
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => (dom[name] = nextProps[name]));
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

// recursive funciton
export const getRenderDom = (Component, root) => {
  const type = Component.type;
  if (Array.isArray(Component))
    return Component.map((child) => getRenderDom(child, root));
  const renderDom = typeof type === 'string' ? Component : type();
  if (renderDom.props && renderDom.props.children) {
    renderDom.props.children.forEach((child, idx) => {
      if (typeof child.type !== 'string') {
        // recursive call for children
        renderDom.props.children[idx] = getRenderDom(
          renderDom.props.children[idx],
          root
        );
      }
    });
  }
  return renderDom;
};
