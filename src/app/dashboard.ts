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
    <div class="flex-1 p-8 max-w-6xl mx-auto w-full animate-in fade-in duration-700">
      <!-- Hero Section -->
      <div class="modern-card mb-12 bg-gradient-to-br from-white via-blue-50/50 to-brand-secondary p-12 md:p-16 text-center border-none shadow-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <div class="relative z-10">
          <div class="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <mat-icon class="text-4xl text-brand-primary">security</mat-icon>
          </div>
          <h2 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-ui-text">
            Exploit<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600">Lab</span>
          </h2>
          <p class="text-ui-muted text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            @if (gameState.xp() === 0) {
              Welcome, Operative. Your mission to master web security begins now.
            } @else {
              Welcome back, {{ gameState.levelTitle() }}. You have {{ gameState.xp() }} XP and a {{ gameState.streak() }} streak!
            }
          </p>

          <div class="flex flex-wrap justify-center gap-6 mb-10">
            <div class="px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-ui-border transition-transform hover:scale-105">
              <div class="text-3xl font-bold text-brand-primary">{{ gameState.totalFlags() }}</div>
              <div class="text-[10px] uppercase tracking-widest font-bold text-ui-muted">Flags Captured</div>
            </div>
            <div class="px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-ui-border transition-transform hover:scale-105">
              <div class="text-3xl font-bold text-ui-text">{{ gameState.xp() }}</div>
              <div class="text-[10px] uppercase tracking-widest font-bold text-ui-muted">XP Earned</div>
            </div>
            <div class="px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-ui-border transition-transform hover:scale-105">
              <div class="text-3xl font-bold text-ui-text">{{ gameState.levelTitle() }}</div>
              <div class="text-[10px] uppercase tracking-widest font-bold text-ui-muted">Rank</div>
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <a routerLink="/challenge/admin-param" class="modern-button px-10 py-4 text-lg shadow-lg shadow-brand-primary/20 flex items-center gap-2">
              <mat-icon>play_arrow</mat-icon>
              {{ gameState.totalFlags() === 0 ? 'Start Training' : 'Continue Mission' }}
            </a>
          </div>
        </div>
      </div>

      <!-- Categories & Info -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="modern-card md:col-span-2">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-bold flex items-center gap-2">
              <mat-icon class="text-brand-primary">assignment</mat-icon>
              Training Modules
            </h3>
            <span class="text-[10px] font-bold text-ui-muted uppercase tracking-widest">{{ challenges.length }} Labs Available</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            @for (group of [
              { name: 'Level 1: Super Beginner', icon: 'auto_awesome', color: 'text-green-500', range: [1, 20] },
              { name: 'Level 2: Easy', icon: 'bolt', color: 'text-blue-500', range: [21, 40] },
              { name: 'Level 3: Medium', icon: 'shield', color: 'text-orange-500', range: [41, 60] },
              { name: 'Level 4: Hard', icon: 'security', color: 'text-red-500', range: [61, 80] }
            ]; track group.name) {
              <div class="p-4 rounded-xl border border-ui-border hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all group">
                <div class="flex items-center gap-3 mb-3">
                  <mat-icon [ngClass]="group.color" class="text-sm">{{ group.icon }}</mat-icon>
                  <span class="text-xs font-bold text-ui-text">{{ group.name }}</span>
                </div>
                <div class="h-1.5 w-full bg-ui-sidebar rounded-full overflow-hidden">
                   <div class="h-full bg-brand-primary transition-all duration-1000" [style.width.%]="50"></div>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="modern-card bg-ui-sidebar border-none">
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
            <mat-icon class="text-purple-600">psychology</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">Byte Mentor</h3>
          <p class="text-ui-muted text-sm leading-relaxed mb-6 font-medium">
            {{ gameState.byteMessage() }}
          </p>
          <div class="p-4 bg-white rounded-xl border border-ui-border italic text-xs text-ui-muted shadow-sm">
            "{{ gameState.streak() > 2 ? 'You're on fire! Keep that streak going.' : 'Every expert was once a beginner. Keep pushing.' }}"
          </div>
        </div>
      </div>
    </div>
`
})
export class Dashboard {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;
}
