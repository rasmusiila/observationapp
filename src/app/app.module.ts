import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ObservationsComponent} from './observations/observations.component';
import {ExcerptPipe} from './pipes/excerpt.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ObservationFormComponent} from './observation-form/observation-form.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {FileUploadComponent} from './observation-form/file-upload/file-upload.component';

@NgModule({
    declarations: [
        AppComponent,
        ObservationsComponent,
        ExcerptPipe,
        ObservationFormComponent,
        PageNotFoundComponent,
        FileUploadComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
