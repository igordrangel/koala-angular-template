import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { LoaderBarPageInterface } from '../../loader/loader-bar-page.interface';

export const KOALA_LOADER_SUBJECT = new BehaviorSubject<LoaderBarPageInterface>({
  typeLoader: 'indeterminate',
  progress: 0,
  show: false
});

@Injectable({providedIn: "any"})
export class KoalaLoaderService {

  public getLoaderSubject() {
    return KOALA_LOADER_SUBJECT;
  }

  public create(loaderConfig?: {
    progress?: number;
    typeLoader?: "buffer" | "determinate" | "query" | "indeterminate"
  }) {
    KOALA_LOADER_SUBJECT.next({
      show: true,
      progress: loaderConfig.progress ? loaderConfig.progress : 0,
      typeLoader: loaderConfig.typeLoader ? loaderConfig.typeLoader : 'indeterminate'
    });
  }

  public dismiss() {
    KOALA_LOADER_SUBJECT.next({
      show: false,
      progress: 0,
      typeLoader: 'indeterminate'
    });
  }
}
