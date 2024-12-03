declare module "react-cookie" {
  export class Cookies {
    constructor();
    set(name: string, value: string, options?: any): void;
    get(name: string): string | undefined;
    remove(name: string): void;
  }
}
