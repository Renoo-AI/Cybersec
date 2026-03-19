import {Routes} from '@angular/router';
import {Dashboard} from './dashboard';
import {ChallengeDetail} from './challenge-detail';
import {ChallengeLayout} from './challenge-layout';

export const routes: Routes = [
  {path: '', component: Dashboard},
  {
    path: 'challenge',
    component: ChallengeLayout,
    children: [
      {path: ':id', component: ChallengeDetail}
    ]
  },
  {path: '**', redirectTo: ''}
];
