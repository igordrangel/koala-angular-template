import { KoalaMenuToolInterface } from './koala.menu-tool.interface';

export interface KoalaMenuModuleInterface {
  icon?: string;
  name: string;
  tools?: KoalaMenuToolInterface[];
  routerLink?: string;
  expanded: boolean;
  active?: boolean;
}
