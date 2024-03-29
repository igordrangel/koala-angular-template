import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KoalaFileInterface } from './koala.file.interface';

@Injectable({providedIn: "any"})
export class KoalaBtnFileService {
	public setFileSubject = new BehaviorSubject<File|null>(null);
	public fileListSubject = new BehaviorSubject<KoalaFileInterface[]>([]);

	public async setFile(file: File) {
		if (file) {
			this.setFileSubject.next(file);
		}
	}

	public removeFile(files: KoalaFileInterface[], index: number) {
		files.splice(index, 1);
		this.fileListSubject.next(files);
	}
}
