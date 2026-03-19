import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {CHALLENGES, GameStateService} from './game-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="flex-1 p-8 max-w-4xl mx-auto w-full">
      <div class="hacker-card mb-8 bg-gradient-to-br from-hacker-dark to-black p-12 text-center">
        <mat-icon class="text-6xl text-hacker-green mb-6 scale-150">security</mat-icon>
        <h2 class="text-4xl font-bold mb-4 tracking-tighter">WELCOME TO EXPLOIT<span class="text-hacker-green">LAB</span></h2>
        <p class="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Master the art of web security through hands-on challenges. 
          Learn to identify and exploit common vulnerabilities in a safe, sandboxed environment.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <div class="px-6 py-3 bg-hacker-green/10 border border-hacker-green/30 rounded-xl">
            <div class="text-2xl font-bold text-hacker-green">{{ gameState.totalFlags() }}</div>
            <div class="text-[10px] uppercase tracking-widest text-gray-500">Flags Captured</div>
          </div>
          <div class="px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div class="text-2xl font-bold text-blue-400">{{ challenges.length }}</div>
            <div class="text-[10px] uppercase tracking-widest text-gray-500">Total Levels</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="hacker-card">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <mat-icon class="text-hacker-green">terminal</mat-icon>
            GETTING STARTED
          </h3>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex gap-2">
              <span class="text-hacker-green font-bold">01.</span>
              Select a challenge from the sidebar.
            </li>
            <li class="flex gap-2">
              <span class="text-hacker-green font-bold">02.</span>
              Read the objective and use the playground.
            </li>
            <li class="flex gap-2">
              <span class="text-hacker-green font-bold">03.</span>
              Find the flag (THM{{ '{' }}...{{ '}' }}) and submit it.
            </li>
          </ul>
        </div>

        <div class="hacker-card">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <mat-icon class="text-hacker-green">psychology</mat-icon>
            BYTE AI COMPANION
          </h3>
          <p class="text-sm text-gray-400 leading-relaxed">
            Byte is your AI teammate. He'll give you hints and feedback as you work through the labs. 
            If you get stuck, look for the hint button on each challenge page.
          </p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <a routerLink="/challenge/view-source" class="hacker-button px-12 py-4 text-lg">START FIRST CHALLENGE</a>
      </div>
    </div>
  `
})
export class Dashboard {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;
}
