import { Injectable } from "@angular/core";
import { HashLocationStrategy } from "@angular/common";

@Injectable()
export class KoalaParameterHashLocationStrategy extends HashLocationStrategy {
  prepareExternalUrl(internal: string): string {
    return window.location.search + super.prepareExternalUrl(internal);
  }
}
