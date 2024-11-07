function redirectIfNotBlacklisted() {
  const currentDomain = window.location.hostname.toLowerCase().replace(/^www\./, '');
  const blacklist = [
    'youtube.com',
    'facebook.com',
    'meta.com',
    'tiktok.com',
    'x.com',
    'fivethirtyeight.com',
    'nypost.com',
    'instagram.com'
  ];

  // Allow music.youtube.com
  if (currentDomain.includes('music.youtube.com')) {
    return;
  }

  // Pycharm Hello World
  // Redirect if on any blacklisted domain
  if (!blacklist.some(domain => currentDomain === domain)) {
    return
  }

  window.location.href = 'https://xkcd.com';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', redirectIfNotBlacklisted);
} else {
  redirectIfNotBlacklisted(); // DOM is already loaded, run directly
}

