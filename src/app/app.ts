import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {CHALLENGES, GameStateService} from './game-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [GameStateService]
})
export class App {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;
}
