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
  systemMessages = signal<{type: string, text: string}[]>([]);

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
          
          // Initialize system messages
          this.systemMessages.set([
            {type: 'SYSTEM', text: 'Environment ready. All systems operational.'},
            {type: 'AUTH', text: `Session verified. ${this.gameState.totalFlags()} flags in vault.`},
            {type: 'AI', text: 'Yo! Welcome to the lab. We got 80 challenges for you to crush. Find the flags and send them in the chat box below! 🚀'}
          ]);
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
    if (current < this.currentChallenge().hints.length - 1) {
      this.activeHintIndex.set(current + 1);
      const hintText = this.currentChallenge().hints[this.activeHintIndex()];
      this.gameState.byteMessage.set('Check the logs, I sent a hint there! 💡');
      this.gameState.byteMood.set('thinking');
      this.systemMessages.update(msgs => [...msgs, {type: 'AI', text: `Hint #${this.activeHintIndex() + 1}: ${hintText}`}]);
    }
  }

  submitFlag() {
    const input = this.flagInput.trim();
    if (!input) return;

    this.systemMessages.update(msgs => [...msgs, {type: 'USER', text: input}]);

    if (input === this.currentChallenge().flag) {
      this.gameState.solve(this.currentChallenge().id);
      this.gameState.byteMessage.set('BOOM! Flag secured! You\'re a natural! 🔥');
      this.gameState.byteMood.set('excited');
      this.systemMessages.update(msgs => [...msgs, {type: 'SUCCESS', text: `Flag accepted! Challenge #${this.currentChallenge().id} solved.`}]);
      this.showExplanation.set(true);
      this.confetti.set(true);
      setTimeout(() => this.confetti.set(false), 3000);
    } else {
      this.gameState.byteMessage.set('Hmm, that flag doesn\'t look right. Try again!');
      this.gameState.byteMood.set('thinking');
      this.systemMessages.update(msgs => [...msgs, {type: 'AI', text: 'That flag is incorrect. Keep digging!'}]);
    }
    this.flagInput = '';
  }
}
