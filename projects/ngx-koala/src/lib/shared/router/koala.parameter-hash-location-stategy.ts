import { Injectable } from "@angular/core";
import { HashLocationStrategy } from "@angular/common";
import { koalaEnvironment } from "../../environments/koala.environment";

@Injectable()
export class KoalaParameterHashLocationStrategy extends HashLocationStrategy {
  prepareExternalUrl(internal: string): string {
    const hasToken = !!localStorage.getItem(koalaEnvironment.storageTokenName);
    return !hasToken ?
           window.location.search + super.prepareExternalUrl(internal) :
           super.prepareExternalUrl(internal);
  }
}
