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
    <div class="flex-1 p-8 max-w-5xl mx-auto w-full">
      <div class="modern-card mb-12 bg-gradient-to-br from-white to-brand-secondary p-16 text-center border-none shadow-xl">
        <div class="w-24 h-24 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <mat-icon class="text-5xl text-brand-primary">security</mat-icon>
        </div>
        <h2 class="text-5xl font-extrabold mb-6 tracking-tight text-ui-text">Exploit<span class="text-brand-primary">Lab</span></h2>
        <p class="text-ui-muted text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          The modern way to master web security. 
          Interactive labs designed to teach you how to identify and prevent common vulnerabilities.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <div class="px-8 py-4 bg-white rounded-2xl shadow-sm border border-ui-border">
            <div class="text-3xl font-bold text-brand-primary">{{ gameState.totalFlags() }}</div>
            <div class="text-xs uppercase tracking-widest font-semibold text-ui-muted">Flags Captured</div>
          </div>
          <div class="px-8 py-4 bg-white rounded-2xl shadow-sm border border-ui-border">
            <div class="text-3xl font-bold text-ui-text">{{ challenges.length }}</div>
            <div class="text-xs uppercase tracking-widest font-semibold text-ui-muted">Total Labs</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="modern-card">
          <div class="w-12 h-12 bg-blue-50/10 rounded-xl flex items-center justify-center mb-6">
            <mat-icon class="text-brand-primary">terminal</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">Getting Started</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold flex items-center justify-center mt-0.5">1</span>
              <p class="text-ui-muted text-sm">Select a challenge from the sidebar to begin your journey.</p>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold flex items-center justify-center mt-0.5">2</span>
              <p class="text-ui-muted text-sm">Use the integrated playground to test for vulnerabilities.</p>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold flex items-center justify-center mt-0.5">3</span>
              <p class="text-ui-muted text-sm">Find the flag and submit it to earn your points.</p>
            </li>
          </ul>
        </div>

        <div class="modern-card">
          <div class="w-12 h-12 bg-purple-50/10 rounded-xl flex items-center justify-center mb-6">
            <mat-icon class="text-purple-600">sync</mat-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">Tactical QR Sync</h3>
          <p class="text-ui-muted text-sm leading-relaxed mb-6">
            Scan this code with your mobile device to sync your progress instantly. No account required.
          </p>
          <div class="flex justify-center p-4 bg-white rounded-xl">
            <img [src]="getQrUrl()" alt="Sync QR" class="w-32 h-32">
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <a routerLink="/challenge/admin-param" class="modern-button px-10 py-4 text-lg shadow-lg shadow-brand-primary/20">Start First Challenge</a>
      </div>
    </div>
  `
})
export class Dashboard {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;

  getQrUrl() {
    const payload = {
      sessionId: Math.random().toString(36).substring(7),
      progress: this.gameState.solvedChallenges()
    };
    const b64 = btoa(JSON.stringify(payload));
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${b64}`;
  }
}
