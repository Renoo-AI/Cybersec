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
    <div class="min-h-screen flex flex-col md:flex-row overflow-hidden bg-ui-bg">
      <!-- Sidebar: Progress & Levels -->
      <aside class="w-full md:w-80 bg-ui-sidebar border-r border-ui-border flex flex-col h-full md:h-screen overflow-y-auto">
        <div class="p-8 border-b border-ui-border bg-white">
          <a routerLink="/" class="block hover:opacity-80 transition-opacity">
            <h1 class="text-2xl font-extrabold tracking-tight flex items-center gap-2 text-ui-text">
              <mat-icon class="text-brand-primary">security</mat-icon>
              Exploit<span class="text-brand-primary">Lab</span>
            </h1>
          </a>
          <div class="mt-6 flex items-center justify-between text-[10px] font-bold text-ui-muted uppercase tracking-wider">
            <span>Progress</span>
            <span class="text-brand-primary">{{ gameState.totalFlags() }} / {{ challenges.length }} Solved</span>
          </div>
          <div class="mt-3 h-1.5 w-full bg-ui-border rounded-full overflow-hidden">
            <div class="h-full bg-brand-primary transition-all duration-700 ease-out shadow-[0_0_8px_rgba(0,102,255,0.4)]" [style.width.%]="(gameState.totalFlags() / challenges.length) * 100"></div>
          </div>
        </div>

        <nav class="flex-1 p-6 space-y-8">
          <!-- Level Groups -->
          @for (group of [
            { name: 'Level 1: Very Easy', range: [1, 20], color: 'bg-green-500' },
            { name: 'Level 2: Easy', range: [21, 40], color: 'bg-blue-500' },
            { name: 'Level 3: Medium', range: [41, 60], color: 'bg-orange-500' },
            { name: 'Level 4: Hard', range: [61, 80], color: 'bg-red-500' }
          ]; track group.name) {
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1.5 h-1.5 rounded-full" [ngClass]="group.color"></div>
                <h3 class="text-[11px] uppercase tracking-widest font-bold text-ui-muted">{{ group.name }}</h3>
              </div>
              <div class="space-y-1">
                @for (c of challenges.slice(group.range[0]-1, group.range[1]); track c.id) {
                  <a 
                    [routerLink]="['/challenge', c.slug]"
                    routerLinkActive="bg-brand-primary/10 text-brand-primary font-semibold shadow-sm"
                    class="w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between group hover:bg-white hover:shadow-sm border border-transparent hover:border-ui-border"
                  >
                    <span class="truncate text-ui-text/80 group-hover:text-ui-text">{{ c.id }}. {{ c.title }}</span>
                    @if (gameState.isSolved(c.id)) {
                      <mat-icon class="text-green-500 text-sm scale-90">check_circle</mat-icon>
                    }
                  </a>
                }
              </div>
            </div>
          }
        </nav>

        <!-- Byte AI Companion (Sidebar Bottom) -->
        @if (gameState.currentChallengeId() < 21) {
          <div class="p-6 bg-white border-t border-ui-border mt-auto shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/20">
                B
              </div>
              <div>
                <div class="text-xs font-bold text-ui-text">Byte</div>
                <div class="text-[10px] text-ui-muted uppercase tracking-wider font-semibold">AI Mentor</div>
              </div>
            </div>
            <div class="p-3 bg-ui-sidebar rounded-xl border border-ui-border">
              <p class="text-[11px] leading-relaxed text-ui-muted italic">
                "{{ gameState.byteMessage() }}"
              </p>
            </div>
          </div>
        } @else {
          <!-- Tactical Remote Handler (Phase 2) -->
          <div class="p-6 bg-brand-secondary border-t border-ui-border mt-auto">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-ui-border flex items-center justify-center text-brand-primary font-mono text-lg border border-brand-primary/30">
                <mat-icon>terminal</mat-icon>
              </div>
              <div>
                <div class="text-xs font-bold text-white uppercase tracking-tighter">TACTICAL HANDLER</div>
                <div class="text-[9px] text-brand-primary uppercase tracking-widest font-bold">LINK: ENCRYPTED</div>
              </div>
            </div>
            <div class="p-3 bg-black/40 rounded-lg border border-brand-primary/20 backdrop-blur-md">
              <p class="text-[10px] leading-relaxed text-brand-primary font-mono">
                <span class="opacity-50">></span> {{ gameState.byteMessage() }}
              </p>
            </div>
          </div>
        }
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-y-auto bg-white relative">
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
