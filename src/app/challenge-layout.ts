import {ChangeDetectionStrategy, Component, inject, HostListener} from '@angular/core';
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
          <div
            class="block hover:opacity-80 transition-opacity cursor-pointer group/logo relative"
            (mousedown)="gameState.showHomePreview.set(true)"
            (mouseup)="gameState.showHomePreview.set(false)"
            (mouseleave)="gameState.showHomePreview.set(false)"
          >
            <h1 class="text-2xl font-extrabold tracking-tight flex items-center gap-2 text-ui-text">
              <mat-icon class="text-brand-primary">security</mat-icon>
              Exploit<span class="text-brand-primary">Lab</span>
            </h1>
            <div class="absolute -bottom-4 left-0 text-[8px] font-bold text-brand-primary opacity-0 group-hover/logo:opacity-100 transition-opacity uppercase tracking-tighter">Hold to Preview</div>
          </div>
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
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-y-auto bg-white relative">
        <router-outlet></router-outlet>
      </main>

      <!-- Home Preview Overlay -->
      @if (gameState.showHomePreview()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div class="absolute inset-0 bg-ui-text/60 backdrop-blur-md" (click)="gameState.showHomePreview.set(false)" (mousedown)="gameState.updateByteForPreview()" (keydown.enter)="gameState.showHomePreview.set(false)" tabindex="0" role="button" aria-label="Close preview"></div>

          <div class="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col relative z-10">
            <div class="p-8 border-b border-ui-border flex items-center justify-between bg-ui-sidebar/50">

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                  <mat-icon class="text-brand-primary">dashboard</mat-icon>
                </div>
                <div>
                  <h2 class="text-2xl font-bold">Quick Dashboard</h2>
                  <p class="text-xs text-ui-muted font-semibold uppercase tracking-widest">Mission Progress Overview</p>
                </div>
              </div>
              <button
                (click)="gameState.showHomePreview.set(false)" (mousedown)="gameState.updateByteForPreview()" (keydown.enter)="gameState.showHomePreview.set(false)" tabindex="0" role="button"
                class="w-10 h-10 rounded-full hover:bg-ui-border flex items-center justify-center transition-colors"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-8 lg:p-12">
              <!-- Stats Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="p-6 bg-brand-secondary/50 rounded-2xl border border-brand-primary/10">
                  <div class="text-3xl font-bold text-brand-primary mb-1">{{ (gameState.totalFlags() / challenges.length * 100) | number:'1.0-0' }}%</div>
                  <div class="text-[10px] font-bold text-ui-muted uppercase tracking-wider">Completion Rate</div>
                  <div class="mt-4 h-2 w-full bg-white rounded-full overflow-hidden">
                    <div class="h-full bg-brand-primary transition-all duration-1000" [style.width.%]="(gameState.totalFlags() / challenges.length) * 100"></div>
                  </div>
                </div>
                <div class="p-6 bg-white border border-ui-border rounded-2xl shadow-sm">
                  <div class="text-3xl font-bold text-ui-text mb-1">{{ gameState.totalFlags() }}</div>
                  <div class="text-[10px] font-bold text-ui-muted uppercase tracking-wider">Flags Captured</div>
                </div>
                <div class="p-6 bg-white border border-ui-border rounded-2xl shadow-sm">
                  <div class="text-3xl font-bold text-ui-text mb-1">{{ challenges.length - gameState.totalFlags() }}</div>
                  <div class="text-[10px] font-bold text-ui-muted uppercase tracking-wider">Labs Remaining</div>
                </div>
              </div>

              <!-- Challenge Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                @for (group of [
                  { name: 'Level 1', range: [1, 20], color: 'text-green-600', bg: 'bg-green-50' },
                  { name: 'Level 2', range: [21, 40], color: 'text-blue-600', bg: 'bg-blue-50' },
                  { name: 'Level 3', range: [41, 60], color: 'text-orange-600', bg: 'bg-orange-50' },
                  { name: 'Level 4', range: [61, 80], color: 'text-red-600', bg: 'bg-red-50' }
                ]; track group.name) {
                  <div>
                    <h3 class="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" [ngClass]="group.color">
                      <span class="w-2 h-2 rounded-full bg-current"></span>
                      {{ group.name }}
                    </h3>
                    <div class="grid grid-cols-5 gap-2">
                      @for (c of challenges.slice(group.range[0]-1, group.range[1]); track c.id) {
                        <a
                          [routerLink]="['/challenge', c.slug]"
                          (click)="gameState.showHomePreview.set(false); gameState.onChallengeClick(c.id)" (mousedown)="gameState.updateByteForPreview()" (keydown.enter)="gameState.showHomePreview.set(false); gameState.onChallengeClick(c.id)" tabindex="0" role="button"
                          class="aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all border"
                          [ngClass]="{ 'bg-green-500 border-green-600 text-white shadow-sm': gameState.isSolved(c.id), 'bg-white border-ui-border text-ui-muted hover:border-brand-primary hover:text-brand-primary': !gameState.isSolved(c.id), 'ring-2 ring-brand-primary ring-offset-2 animate-pulse': gameState.currentChallengeId() === c.id }"
                          [title]="c.title"
                        >
                          {{ c.id }}
                        </a>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="p-6 border-t border-ui-border bg-ui-sidebar/30 text-center">
              <a
                routerLink="/"
                (click)="gameState.showHomePreview.set(false)" (mousedown)="gameState.updateByteForPreview()" (keydown.enter)="gameState.showHomePreview.set(false)" tabindex="0" role="button"
                class="text-brand-primary font-bold text-sm hover:underline flex items-center justify-center gap-2"
              >
                <mat-icon class="text-sm">open_in_new</mat-icon>
                View Full Interactive Dashboard
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './app.css'
})
export class ChallengeLayout {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return;
    }

    if (event.key === 'h' || event.key === 'H') {
      this.gameState.toggleHomePreview(); if(this.gameState.showHomePreview()) this.gameState.updateByteForPreview();
    } else if (event.key === 'Escape' && this.gameState.showHomePreview()) {
      this.gameState.showHomePreview.set(false);
    }
  }
}
