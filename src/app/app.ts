import {ChangeDetectionStrategy, Component, inject, signal, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CHALLENGES, GameStateService} from './game-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [GameStateService]
})
export class App {
  gameState = inject(GameStateService);
  challenges = CHALLENGES;
  
  currentChallenge = computed(() => 
    this.challenges.find(c => c.id === this.gameState.currentChallengeId())!
  );

  // Challenge specific states
  userInput = signal('');
  userPassword = signal('');
  userPrice = signal(100);
  userRole = signal('guest');
  userCookie = signal('cm9sZT11c2Vy'); // Base64 for role=user
  showSecretPage = signal(false);
  pathInput = signal('');
  searchQuery = signal('');
  commentList = signal<string[]>([]);
  newComment = signal('');
  
  // UI States
  activeHintIndex = signal(-1);
  showExplanation = signal(false);
  flagInput = signal('');
  confetti = signal(false);
  
  // Byte AI Companion
  byteMessage = signal('Welcome, teammate! I\'m Byte. Ready to hack some systems?');
  byteMood = signal<'idle' | 'happy' | 'thinking' | 'excited'>('idle');

  constructor() {
    // React to challenge changes
    effect(() => {
      const challenge = this.currentChallenge();
      this.resetChallengeState();
      this.byteMessage.set(`Challenge #${challenge.id}: ${challenge.title}. ${challenge.objective}`);
      this.byteMood.set('idle');
    });
  }

  resetChallengeState() {
    this.userInput.set('');
    this.userPassword.set('');
    this.userPrice.set(100);
    this.userRole.set('guest');
    this.userCookie.set('cm9sZT11c2Vy');
    this.showSecretPage.set(false);
    this.pathInput.set('');
    this.searchQuery.set('');
    this.activeHintIndex.set(-1);
    this.showExplanation.set(false);
    this.flagInput.set('');
  }

  selectChallenge(id: number) {
    this.gameState.setCurrent(id);
  }

  showNextHint() {
    const current = this.activeHintIndex();
    if (current < 2) {
      this.activeHintIndex.set(current + 1);
      const hints = ['Nice start! Here\'s a little nudge.', 'Getting warmer! Try using your browser tools.', 'Okay, here\'s the keys to the kingdom!'];
      this.byteMessage.set(hints[this.activeHintIndex()]);
      this.byteMood.set('thinking');
    }
  }

  submitFlag() {
    if (this.flagInput().trim() === this.currentChallenge().flag) {
      this.gameState.solve(this.currentChallenge().id);
      this.byteMessage.set('BOOM! Flag secured! You\'re a natural! 🔥');
      this.byteMood.set('excited');
      this.showExplanation.set(true);
      this.confetti.set(true);
      setTimeout(() => this.confetti.set(false), 3000);
    } else {
      this.byteMessage.set('Hmm, that flag doesn\'t look right. Try again!');
      this.byteMood.set('thinking');
    }
  }

  // Challenge Actions
  loginSqli() {
    if (this.userInput().includes("' OR '1'='1")) {
      this.byteMessage.set('SQL Injection successful! You bypassed the login.');
      this.byteMood.set('happy');
    }
  }

  checkPath() {
    const path = this.pathInput().toLowerCase();
    if (this.currentChallenge().id === 5 && (path === '/admin-login' || path === 'admin-login')) {
      this.showSecretPage.set(true);
    } else if (this.currentChallenge().id === 4 && (path === '/robots.txt' || path === 'robots.txt')) {
      this.showSecretPage.set(true);
    } else if (this.currentChallenge().id === 16 && (path === 'db.txt' || path === '/db.txt')) {
      this.showSecretPage.set(true);
    } else if (this.currentChallenge().id === 20 && (path === '/admin-vault' || path === 'admin-vault')) {
      this.showSecretPage.set(true);
    }
  }

  manipulatePrice() {
    if (this.userPrice() <= 1) {
      this.byteMessage.set('Price manipulated! The checkout is now free.');
      this.byteMood.set('happy');
    }
  }

  updateCookie() {
    if (this.userRole() === 'admin') {
      this.byteMessage.set('Role escalated to admin! Refresh to see the change.');
      this.byteMood.set('happy');
    }
  }

  decodeCookie() {
    try {
      const decoded = atob(this.userCookie());
      if (decoded === 'role=admin') {
        this.byteMessage.set('Base64 cookie updated correctly!');
        this.byteMood.set('happy');
      }
    } catch(error) {
      console.error('Cookie decode error:', error);
    }
  }

  submitSearch() {
    if (this.searchQuery().includes('<script>alert')) {
      this.byteMessage.set('XSS Triggered! Alert(1) would have fired here.');
      this.byteMood.set('excited');
    }
  }

  addComment() {
    if (this.newComment()) {
      this.commentList.update(list => [...list, this.newComment()]);
      if (this.newComment().includes('<script>alert')) {
        this.byteMessage.set('Stored XSS payload saved! Every visitor will now see your alert.');
        this.byteMood.set('excited');
      }
      this.newComment.set('');
    }
  }
}
