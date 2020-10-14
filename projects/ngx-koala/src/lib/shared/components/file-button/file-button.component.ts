import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KoalaFileInterface } from './koala.file.interface';

@Component({
	selector: 'koala-file-button',
	templateUrl: 'file-button.component.html',
	styleUrls: ['file-button.component.css']
})
export class FileButtonComponent implements OnInit {
	@Input() color: 'blue' | 'red' | 'gray' | 'white' = 'white';
	@Input() backgroundColor: 'blue' | 'red' | 'gray' | 'white' | 'transparent' = 'blue';
	@Input() icon: string;
	@Input() text: string;
	@Input() tooltip: string;
	@Input() disabled: boolean;
	@Input() multiple: boolean;
	@Input() accept: string;
	@Output() getFiles = new EventEmitter<KoalaFileInterface[]>(null);
	public originalText: string;
	
	ngOnInit() {
		this.originalText = this.text;
	}
	
	public async emitFiles(files: FileList) {
		const filesEmit: KoalaFileInterface[] = [];
		if (files.length > 0) {
			this.text = `${files.length} arquivo${files.length > 1 ? 's' : ''} selecionado`;
			for (let f = 0; f <= files.length; f++) {
				const file = files.item(f);
				if (file) {
					const blobFile = await new Promise((resolve) => {
						const fileReader = new FileReader();
						fileReader.readAsDataURL(file);
						fileReader.onload = () => {
							resolve(fileReader.result);
						};
					});
					
					const fileSplit = blobFile.toString().split(';base64,');
					filesEmit.push({
						filename: file.name,
						type: fileSplit[0].replace('data:', ''),
						base64: fileSplit[1]
					});
				}
			}
			
			this.getFiles.emit(filesEmit);
		} else {
			this.text = this.originalText;
			this.getFiles.emit(null);
		}
	}
}
