import { CanActivateFn } from '@angular/router';

export const desktopOnlyGuard: CanActivateFn = (route, state) => {
  // Basic check for mobile user agents
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Allow access to dashboard for mobile sync, but restrict challenges
  if (isMobile && state.url.startsWith('/challenge')) {
    return false;
  }

  return true;
};
