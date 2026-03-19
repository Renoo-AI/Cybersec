import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {CHALLENGES, GameStateService} from './game-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-challenge-layout',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <!-- Sidebar: Progress & Levels -->
      <aside class="w-full md:w-80 bg-black border-r border-hacker-border flex flex-col h-full md:h-screen overflow-y-auto">
        <div class="p-6 border-b border-hacker-border">
          <a routerLink="/" class="block hover:opacity-80 transition-opacity">
            <h1 class="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <mat-icon class="text-hacker-green">security</mat-icon>
              EXPLOIT<span class="text-hacker-green">LAB</span>
            </h1>
          </a>
          <div class="mt-4 flex items-center justify-between text-xs font-mono text-gray-500">
            <span>PROGRESS</span>
            <span class="text-hacker-green">{{ gameState.totalFlags() }} / {{ challenges.length }} FLAGS</span>
          </div>
          <div class="mt-2 h-1 w-full bg-hacker-border rounded-full overflow-hidden">
            <div class="h-full bg-hacker-green transition-all duration-500" [style.width.%]="(gameState.totalFlags() / challenges.length) * 100"></div>
          </div>
        </div>

        <nav class="flex-1 p-4 space-y-6">
          <!-- Level Groups -->
          @for (group of [
            { name: 'SUPER BEGINNER', range: [1, 5], color: 'text-blue-400' },
            { name: 'EASY', range: [6, 12], color: 'text-yellow-400' },
            { name: 'EASY/MEDIUM', range: [13, 20], color: 'text-orange-400' }
          ]; track group.name) {
            <div>
              <h3 class="text-[10px] uppercase tracking-widest font-bold mb-3 opacity-50">{{ group.name }}</h3>
              <div class="space-y-1">
                @for (c of challenges.slice(group.range[0]-1, group.range[1]); track c.id) {
                  <a 
                    [routerLink]="['/challenge', c.slug]"
                    routerLinkActive="bg-hacker-green/10 text-hacker-green"
                    class="w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group hover:bg-white/5"
                  >
                    <span class="truncate">{{ c.id }}. {{ c.title }}</span>
                    @if (gameState.isSolved(c.id)) {
                      <mat-icon class="text-hacker-green text-xs scale-75">check_circle</mat-icon>
                    }
                  </a>
                }
              </div>
            </div>
          }
        </nav>

        <!-- Byte AI Companion (Sidebar Bottom) -->
        <div class="p-6 bg-hacker-green/5 border-t border-hacker-border mt-auto">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-hacker-green flex items-center justify-center text-black font-bold text-xl animate-pulse">
              B
            </div>
            <div>
              <div class="text-xs font-bold text-hacker-green">BYTE</div>
              <div class="text-[10px] text-gray-500 uppercase tracking-tighter">AI Teammate</div>
            </div>
          </div>
          <p class="text-xs italic leading-relaxed text-gray-400">
            "{{ gameState.byteMessage() }}"
          </p>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-y-auto bg-hacker-dark relative">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './app.css'
})
export class ChallengeLayout {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;
}
