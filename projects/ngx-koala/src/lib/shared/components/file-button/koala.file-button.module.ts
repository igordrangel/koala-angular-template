import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
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
