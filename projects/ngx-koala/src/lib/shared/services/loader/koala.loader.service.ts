import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { LoaderBarPageInterface } from '../../components/loader/loader-bar-page.interface';

export const KOALA_LOADER_SUBJECT = new BehaviorSubject<LoaderBarPageInterface>({
  typeLoader: 'indeterminate',
  progress: 0,
  show: false
});

@Injectable({providedIn: "root"})
export class KoalaLoaderService {

  public static getLoaderSubject() {
    return KOALA_LOADER_SUBJECT;
  }

  public static create(loaderConfig?: {
    progress?: number;
    typeLoader?: "buffer" | "determinate" | "query" | "indeterminate"
  }) {
    KOALA_LOADER_SUBJECT.next({
      show: true,
      progress: loaderConfig.progress ? loaderConfig.progress : 0,
      typeLoader: loaderConfig.typeLoader ? loaderConfig.typeLoader : 'indeterminate'
    });
  }

  public static dismiss() {
    KOALA_LOADER_SUBJECT.next({
      show: false,
      progress: 0,
      typeLoader: 'indeterminate'
    });
  }
}
