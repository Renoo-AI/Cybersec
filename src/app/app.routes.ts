import {Routes} from '@angular/router';
import {Dashboard} from './dashboard';
import {ChallengeDetail} from './challenge-detail';

export const routes: Routes = [
  {path: '', component: Dashboard},
  {path: 'challenge/:id', component: ChallengeDetail},
  {path: '**', redirectTo: ''}
];
