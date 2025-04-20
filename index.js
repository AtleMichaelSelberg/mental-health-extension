const topLevelYoutubes = [
  'youtube.com',
  'm.youtube.com',
]

const isYoutubeDomain = (host) => {
  return topLevelYoutubes.some(domain => host === domain)
}

function isYouTubeHomepage() {
  const host = window.location.hostname
      .toLowerCase()
      .replace(/^www\./, '');

  return isYoutubeDomain(host)
      && (window.location.pathname === '' || window.location.pathname === '/')
      && window.location.search === ''
      && window.location.hash === '';
}

const clearYoutubeRecs = () => {
  document.querySelectorAll("ytd-watch-next-secondary-results-renderer").forEach(el => el.remove());
  document.querySelectorAll(".videowall-endscreen").forEach(el => el.remove());
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

  if (isYouTubeHomepage()) {
    window.location.href = 'https://www.youtube.com/watch?v=iyEZWhYrp30';
  }

  if (isYoutubeDomain(currentDomain)) {
    const observer = new MutationObserver(() => {
      clearYoutubeRecs()
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }


}

(function() {
  let lastUrl = location.href;

  function checkUrlChange() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      redirectIfNotBlacklisted();
    }
  }

  // initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      redirectIfNotBlacklisted();
      lastUrl = location.href;
    });
  } else {
    redirectIfNotBlacklisted();
    lastUrl = location.href;
  }

  // catch history API
  ['pushState', 'replaceState'].forEach(fn => {
    const orig = history[fn];
    history[fn] = function(...args) {
      const ret = orig.apply(this, args);
      checkUrlChange();
      return ret;
    };
  });

  // catch back/forward & hash
  window.addEventListener('popstate',  checkUrlChange);
  window.addEventListener('hashchange', checkUrlChange);

  // fallback for SPA nav (e.g. YouTube): detect DOM mutations
  new MutationObserver(checkUrlChange)
      .observe(document, { subtree: true, childList: true });
})();
