import { Injectable } from "@angular/core";
import { HashLocationStrategy } from "@angular/common";
import { KOALA_TOKEN_STORAGE_NAME } from "../services/token/token.factory";

@Injectable()
export class KoalaParameterHashLocationStrategy extends HashLocationStrategy {
  prepareExternalUrl(internal: string): string {
    const hasToken = !!localStorage.getItem(KOALA_TOKEN_STORAGE_NAME);
    return !hasToken ?
           window.location.search + super.prepareExternalUrl(internal) :
           super.prepareExternalUrl(internal);
  }
}
