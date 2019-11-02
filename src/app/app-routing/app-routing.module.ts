import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ObservationsComponent} from '../observations/observations.component';
import {ObservationFormComponent} from '../observation-form/observation-form.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {path: 'observations', component: ObservationsComponent},
    {path: 'observation-form', component: ObservationFormComponent},
    {path: '', redirectTo: '/observations', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
