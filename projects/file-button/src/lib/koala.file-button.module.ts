import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { FileButtonComponent } from './file-button.component';

@NgModule({
  exports: [
    FileButtonComponent
  ],
	declarations: [
		FileButtonComponent
	],
	imports: [
		CommonModule,
		MatTooltipModule,
		MatButtonModule,
		MatIconModule
	]
})
export class KoalaFileButtonModule {
}
