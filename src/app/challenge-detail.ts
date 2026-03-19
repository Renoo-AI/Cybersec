import {ChangeDetectionStrategy, Component, inject, signal, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterModule} from '@angular/router';
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
  challenges = CHALLENGES;
  
  challengeSlug = signal<string>('');
  
  currentChallenge = computed(() => 
    this.challenges.find(c => c.slug === this.challengeSlug())!
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
    if (this.flagInput().trim() === this.currentChallenge().flag) {
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

  // Challenge Actions
  loginSqli() {
    if (this.userInput().includes("' OR '1'='1")) {
      this.gameState.byteMessage.set('SQL Injection successful! You bypassed the login.');
      this.gameState.byteMood.set('happy');
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
      this.gameState.byteMessage.set('Price manipulated! The checkout is now free.');
      this.gameState.byteMood.set('happy');
    }
  }

  updateCookie() {
    if (this.userRole() === 'admin') {
      this.gameState.byteMessage.set('Role escalated to admin! Refresh to see the change.');
      this.gameState.byteMood.set('happy');
    }
  }

  decodeCookie() {
    try {
      const decoded = atob(this.userCookie());
      if (decoded === 'role=admin') {
        this.gameState.byteMessage.set('Base64 cookie updated correctly!');
        this.gameState.byteMood.set('happy');
      }
    } catch(error) {
      console.error('Cookie decode error:', error);
    }
  }

  submitSearch() {
    if (this.searchQuery().includes('<script>alert')) {
      this.gameState.byteMessage.set('XSS Triggered! Alert(1) would have fired here.');
      this.gameState.byteMood.set('excited');
    }
  }

  addComment() {
    if (this.newComment()) {
      this.commentList.update(list => [...list, this.newComment()]);
      if (this.newComment().includes('<script>alert')) {
        this.gameState.byteMessage.set('Stored XSS payload saved! Every visitor will now see your alert.');
        this.gameState.byteMood.set('excited');
      }
      this.newComment.set('');
    }
  }
}
