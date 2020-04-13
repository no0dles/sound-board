export class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  private childs: HTMLElement[] = [];

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  addChild(node: HTMLElement) {
    this.childs.push(node);
    this.shadow.append(node);
  }

  removeChilds() {
    for (const child of this.childs) {
      this.shadow.removeChild(child);
    }
    this.childs = [];
  }
}
