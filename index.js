function isYouTubeHomepage() {
  const host = window.location.hostname
      .toLowerCase()
      .replace(/^www\./, '');
  const topLevelYoutubes = [
      'youtube.com',
      'm.youtube.com',
  ]
  return topLevelYoutubes.some(domain => host === domain)
      && (window.location.pathname === '' || window.location.pathname === '/')
      && window.location.search === ''
      && window.location.hash === '';
}


function redirectIfNotBlacklisted() {
  const hostname = window.location.hostname;
  const currentDomain = hostname.trim().toLowerCase().replace(/^www\./, '');
  const blacklist = [
    'facebook.com',
    'meta.com',
    'tiktok.com',
    'x.com',
    'fivethirtyeight.com',
    'nypost.com',
  ];

  // Pycharm Hello World
  // Redirect if on any blacklisted domain
  if (blacklist.some(domain => currentDomain === domain)) {
    window.location.href = 'https://xkcd.com';
  }

  console.log(hostname)
  if (isYouTubeHomepage()) {
    window.location.href = 'https://www.youtube.com/watch?v=iyEZWhYrp30';
  }

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', redirectIfNotBlacklisted);
} else {
  redirectIfNotBlacklisted(); // DOM is already loaded, run directly
}

