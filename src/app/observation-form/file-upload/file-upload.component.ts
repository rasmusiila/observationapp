import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {LogService} from '../../services/log.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadComponent,
            multi: true
        }
    ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
    @Input() parentForm: FormGroup;

    private file: File | null = null;
    private onChange: any;

    // Main task
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;

    constructor(private storage: AngularFireStorage, private host: ElementRef<HTMLInputElement>,
                private logService: LogService) {
    }

    ngOnInit() {
    }

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.onChange(file);
        this.file = file;
    }

    startUpload(name: string): AngularFireUploadTask {
        if (!this.file) {
            return;
        }

        // The storage path
        const path = `images/${name}`;

        // The main task
        this.task = this.storage.upload(path, this.file);

        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();

        return this.task;
    }

    // TODO: use this function for the extra buttons if you have time later
    // Determines if the upload task is active
    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    get fileUpload() {
        return this.parentForm.get('avatarFile');
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(value: null): void {
        // clear file input
        this.host.nativeElement.value = '';
        this.file = null;
    }
}
