import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileUploadComponent} from './file-upload.component';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';

class MockAngularFireStorage {
}

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;
    let angularFireStorage: AngularFireStorage;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FileUploadComponent],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                {provide: AngularFireStorage, useClass: MockAngularFireStorage}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;

        angularFireStorage = TestBed.get(AngularFireStorage);

        component.parentForm = new FormGroup({
            avatarFile: new FormControl('')
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
