import { NgModule } from "@angular/core";
import { LoadingIconAnimatedComponent } from "./icons/loading/loading-icon-animated.component";
import { CommonModule } from "@angular/common";
import { IconsAnimatedComponent } from "./icons-animated.component";
import { DownloadingIconAnimatedComponent } from "./icons/downloading/downloading-icon-animated.component";

@NgModule({
  exports: [
    IconsAnimatedComponent
  ],
  declarations: [
    IconsAnimatedComponent,
    LoadingIconAnimatedComponent,
    DownloadingIconAnimatedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KoalaIconsAnimatedModule {}
