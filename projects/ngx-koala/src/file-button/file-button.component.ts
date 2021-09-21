import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KoalaFileInterface } from './koala.file.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'koala-file-button',
	templateUrl: 'file-button.component.html',
	styleUrls: ['file-button.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileButtonComponent implements OnInit {
	@Input() color: string;
	@Input() backgroundColor: string;
	@Input() icon: string;
	@Input() text: string;
	@Input() tooltip: string;
	@Input() disabled: boolean;
	@Input() multiple: boolean;
	@Input() accept: string;
	@Input() setFile: BehaviorSubject<File>;
	@Input() updateFileList: BehaviorSubject<KoalaFileInterface[]>;
	@Input() autoclear: boolean = true;
	@Output() getFiles = new EventEmitter<KoalaFileInterface[]>(null);
	public files: KoalaFileInterface[] = [];
  public style: string;

	@ViewChild('file', {static: true}) private file: ElementRef<HTMLInputElement>;

	public textSubject = new BehaviorSubject<string>(null);

	ngOnInit() {
    this.style = `color: ${this.color}!important;background-color: ${this.backgroundColor}!important;`;
		this.textSubject.next(this.text);
		if (this.setFile) {
			this.setFile
			    .subscribe(async file => {
				    if (file) {
					    this.files.push(await this.convertFile(file));
					    this.generateTextButton();
					    this.getFiles.emit(this.files);
				    }
			    });
		}

		if (this.updateFileList) {
			this.updateFileList
			    .subscribe(fileList => {
				    this.files = fileList;
				    this.generateTextButton();
			    });
		}
	}

	public async emitFiles(files: FileList) {
		if (files?.length > 0) {
			for (let f = 0; f <= files.length; f++) {
				const file = files.item(f);
				if (file) {
					this.files.push(await this.convertFile(file));
				}
			}

			this.getFiles.emit(this.files);
		} else {
			this.getFiles.emit(null);
		}
		this.generateTextButton();
	}

	public open() {
		this.file.nativeElement.value = null;
		if (this.autoclear) {
			this.files = [];
			this.getFiles.emit(null);
			this.generateTextButton();
		}
		this.file.nativeElement.click();
	}

	private generateTextButton() {
		this.textSubject.next(this.files.length > 0 ?
			`${this.files.length} arquivo${this.files.length > 1 ? 's' : ''} selecionado` :
			this.text
		);
	}

	private async convertFile(file: File): Promise<KoalaFileInterface> {
		const blobFile = await new Promise((resolve) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
		});
		const fileSplit = blobFile.toString().split(';base64,');
		return {
			filename: file.name,
			type: fileSplit[0].replace('data:', ''),
			base64: fileSplit[1]
		};
	}
}
