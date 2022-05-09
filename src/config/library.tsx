import { ROOT_NODE } from '.';
import App from '@/Views'

export const React = {
  createElement: (tag: string | JSX.Component, props: { [key: string]: any }, ...children: JSX.Element[]) => {
    if (typeof tag === 'function') {
      return tag(props, ...children);
    }
    return {
      tag,
      props,
      children,
    };
  },
};

const myAppState: any[] = [];
let myAppStateCursor = 0;

export const useState = <T extends unknown>(initialState: T): [T, (newState: T) => void] => {
  // get the cursor for this useState
  const stateCursor = myAppStateCursor;
  // Check before setting AppState to initialState (reRender)
  myAppState[stateCursor] = myAppState[stateCursor] || initialState;

  const setState = (newState: T) => {
    myAppState[stateCursor] = newState;
    reRender();
  };
  // prepare the cursor for the next state.
  myAppStateCursor++;
  
  return [myAppState[stateCursor], setState];
};

export const render = (el: JSX.Element, container: HTMLElement) => {
  let domEl: any;
  // 0. Check the type of el
  //    if string we need to handle it like text node.
  if (typeof el === 'string' || typeof el === 'number') {
    // create an actual Text Node
    domEl = document.createTextNode(String(el));
    container.appendChild(domEl);
    // No children for text node so we return.
    return;
  }
  // 1. First create the document node corresponding el
  domEl = document.createElement(el.tag);
  // 2. Set the props on domEl
  let elProps = el.props ? Object.keys(el.props) : null;
  if (elProps && elProps.length > 0) {
    elProps.forEach((prop) => (domEl[prop] = el.props[prop]));
  }
  // 3. Handle creating the Children.
  if (el.children && el.children.length > 0) {
    // When child is rendered, the container will be
    // the domEl we created here.
    Array.from(el.children).forEach((node: any) => render(node, domEl));
  }
  // 4. append the DOM node to the container.
  container.appendChild(domEl);
};

export const reRender = () => {
  const rootNode = document.getElementById(ROOT_NODE) as HTMLElement;
  // reset/clean whatever is rendered already
  rootNode.innerHTML = '';
  // Reset the global state cursor
  myAppStateCursor = 0;
  render(<App />, rootNode);
};
