import { KoalaMenuToolInterface } from './koala.menu-tool.interface';

export interface KoalaMenuModuleInterface {
  icon?: string;
  koalaIcon?: boolean;
  name: string;
  tools?: KoalaMenuToolInterface[];
  routerLink?: string;
  expanded?: boolean;
  active?: boolean;
  animateOpen?: boolean;
  animateClose?: boolean;
}
