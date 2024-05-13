import { Routes } from '@angular/router';
import { HotelsShellComponent } from './hotels/components/hotels-shell/hotels-shell.component';

export const routes: Routes = [
    { path: 'search-hotels', component: HotelsShellComponent },
    { path: '', redirectTo: 'search-hotels', pathMatch: 'full' },
];
