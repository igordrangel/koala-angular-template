import { Injectable } from "@angular/core";
import { HashLocationStrategy } from "@angular/common";
import { KoalaEnvironment } from "../../environments/koalaEnvironment";

@Injectable()
export class KoalaParameterHashLocationStrategy extends HashLocationStrategy {
  prepareExternalUrl(internal: string): string {
    const hasToken = !!localStorage.getItem(KoalaEnvironment.environment?.storageTokenName);
    return !hasToken ?
           window.location.search + super.prepareExternalUrl(internal) :
           super.prepareExternalUrl(internal);
  }
}
