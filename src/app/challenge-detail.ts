import {ChangeDetectionStrategy, Component, inject, signal, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {CHALLENGES, GameStateService} from './game-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, RouterModule],
  templateUrl: './challenge-detail.html',
  styleUrl: './app.css'
})
export class ChallengeDetail {
  route = inject(ActivatedRoute);
  gameState = inject(GameStateService);
  sanitizer = inject(DomSanitizer);
  challenges = CHALLENGES;
  
  challengeSlug = signal<string>('');
  
  currentChallenge = computed(() => 
    this.challenges.find(c => c.slug === this.challengeSlug())!
  );

  targetUrl = computed(() => {
    const challenge = this.currentChallenge();
    if (!challenge) return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/challenges/${challenge.id}/index.html`);
  });

  openTarget() {
    const challenge = this.currentChallenge();
    if (challenge) {
      window.open(`/challenges/${challenge.id}/index.html`, '_blank');
    }
  }

  viewCode() {
    const challenge = this.currentChallenge();
    if (challenge) {
      // Open the index.html file directly in a new tab
      window.open(`/challenges/${challenge.id}/index.html`, '_blank');
    }
  }

  // UI States
  activeHintIndex = signal(-1);
  showExplanation = signal(false);
  flagInput = '';
  confetti = signal(false);

  constructor() {
    // React to route params
    this.route.params.subscribe(params => {
      const slug = params['id'];
      if (slug) {
        this.challengeSlug.set(slug);
        const challenge = this.challenges.find(c => c.slug === slug);
        if (challenge) {
          this.gameState.setCurrent(challenge.id);
          this.resetChallengeState();
        }
      }
    });

    // React to challenge changes for Byte message
    effect(() => {
      const challenge = this.currentChallenge();
      this.gameState.byteMessage.set(`Challenge #${challenge.id}: ${challenge.title}. ${challenge.objective}`);
      this.gameState.byteMood.set('idle');
    });
  }

  resetChallengeState() {
    this.activeHintIndex.set(-1);
    this.showExplanation.set(false);
    this.flagInput = '';
  }

  showNextHint() {
    const current = this.activeHintIndex();
    if (current < 2) {
      this.activeHintIndex.set(current + 1);
      const hints = ['Nice start! Here\'s a little nudge.', 'Getting warmer! Try using your browser tools.', 'Okay, here\'s the keys to the kingdom!'];
      this.gameState.byteMessage.set(hints[this.activeHintIndex()]);
      this.gameState.byteMood.set('thinking');
    }
  }

  submitFlag() {
    if (this.flagInput.trim() === this.currentChallenge().flag) {
      this.gameState.solve(this.currentChallenge().id);
      this.gameState.byteMessage.set('BOOM! Flag secured! You\'re a natural! 🔥');
      this.gameState.byteMood.set('excited');
      this.showExplanation.set(true);
      this.confetti.set(true);
      setTimeout(() => this.confetti.set(false), 3000);
    } else {
      this.gameState.byteMessage.set('Hmm, that flag doesn\'t look right. Try again!');
      this.gameState.byteMood.set('thinking');
    }
  }
}
