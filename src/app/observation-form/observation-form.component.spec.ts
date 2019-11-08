import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObservationFormComponent} from './observation-form.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormBuilder, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {ObservationService} from '../services/observation.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {RarityService} from '../services/rarity.service';
import { Router } from '@angular/router';
import {Rarity} from '../models/rarity';
import { Observable, of } from 'rxjs';

@Component({selector: 'app-file-upload', template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadStubComponent,
            multi: true
        }
    ]})
class FileUploadStubComponent implements ControlValueAccessor {
    @Input() parentForm: FormGroup;

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
    }
}

class MockFormBuilder {
    group() {
        return new FormGroup({
            speciesName: new FormControl(''),
            rarity: new FormControl(''),
            notes: new FormControl(''),
            avatarFile: new FormControl(null)
        });
    }
}
class MockObservationService {
}
class MockRarityService {
    getRarities(): Observable<Rarity[]> {
        return of([]);
    }
}
class MockRouter {
}

describe('ObservationFormComponent', () => {
    let component: ObservationFormComponent;
    let fixture: ComponentFixture<ObservationFormComponent>;
    let formBuilder: FormBuilder;
    let observationService: ObservationService;
    let rarityService: RarityService;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ObservationFormComponent,
                FileUploadStubComponent
            ],
            imports: [
                MDBBootstrapModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: FormBuilder, useClass: MockFormBuilder},
                {provide: ObservationService, useClass: MockObservationService},
                {provide: RarityService, useClass: MockRarityService},
                {provide: Router, useClass: MockRouter}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObservationFormComponent);
        component = fixture.componentInstance;

        formBuilder = TestBed.get(FormBuilder);
        observationService = TestBed.get(ObservationService);
        rarityService = TestBed.get(RarityService);
        router = TestBed.get(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
