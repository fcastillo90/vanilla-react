declare namespace JSX {
  type Child = Node | ArrayLike<Node>;
  type Element = globalThis.Element & {props: { [key: string]: any }, tag: Tag}
  
  interface IntrinsicElements extends IntrinsicElementMap { }

  type CommonProperties = Partial<{
      style: Partial<CSSStyleDeclaration>
      class: string
  }>

  type CommonEvents = {
      [E in keyof GlobalEventHandlers]?: GlobalEventHandlers[E]
  }

  type IntrinsicElementMap = {
      [K in keyof HTMLElementTagNameMap]: CommonEvents & CommonProperties & {
          [k: string]: any
      }
  } & {
      [K in keyof SVGElementTagNameMap]: {
          [k: string]: any
      }
  }

  type Tag = keyof JSX.IntrinsicElements
//   type HTMLTag = keyof HTMLElementTagNameMap;
//   type SVGTag = keyof SVGElementTagNameMap;

  interface Component {
      (props?: { [key: string]: any }, children?: Element): Child
  }
}