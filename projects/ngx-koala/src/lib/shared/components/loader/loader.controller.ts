import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { LoaderBarPageInterface } from './loader-bar-page.interface';

export const LOADER_SUBJECT = new BehaviorSubject<LoaderBarPageInterface>({
  typeLoader: 'indeterminate',
  progress: 0,
  show: false
});

@Injectable({providedIn: "root"})
export class LoaderController {

  public static getLoaderSubject() {
    return LOADER_SUBJECT;
  }

  public static create(loaderConfig?: {
    progress?: number;
    typeLoader?: "buffer" | "determinate" | "query" | "indeterminate"
  }) {
    LOADER_SUBJECT.next({
      show: true,
      progress: loaderConfig.progress ? loaderConfig.progress : 0,
      typeLoader: loaderConfig.typeLoader ? loaderConfig.typeLoader : 'indeterminate'
    });
  }

  public static dismiss() {
    LOADER_SUBJECT.next({
      show: false,
      progress: 0,
      typeLoader: 'indeterminate'
    });
  }
}
