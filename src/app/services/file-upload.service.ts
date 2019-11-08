import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor() {
    }
}
