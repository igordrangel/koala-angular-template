import { NgModule } from "@angular/core";
import { LoaderIconAnimatedComponent } from "./icons/loader/loader-icon-animated.component";
import { CommonModule } from "@angular/common";
import { IconsAnimatedComponent } from "./icons-animated.component";

@NgModule({
  exports: [
    IconsAnimatedComponent
  ],
  declarations: [
    IconsAnimatedComponent,
    LoaderIconAnimatedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KoalaIconsAnimatedModule {}
