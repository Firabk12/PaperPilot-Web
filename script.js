// Close mobile nav after clicking a link
document.querySelectorAll('#ppNav .nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    var nav = document.getElementById('ppNav');
    if (nav.classList.contains('show')) {
      var collapse = bootstrap.Collapse.getOrCreateInstance(nav);
      collapse.hide();
    }
  });
});

// Little wobble nudge on the mascot when it's clicked, just for fun
var mascot = document.querySelector('.pp-mascot');
if (mascot) {
  mascot.addEventListener('click', function () {
    mascot.style.transition = 'transform .4s ease';
    mascot.style.transform = 'rotate(6deg) scale(1.03)';
    setTimeout(function () {
      mascot.style.transform = '';
    }, 400);
  });
}

// THEME TOGGLE — persists user choice and respects system preference
(function(){
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');
  var storageKey = 'pp-theme';

  function applyTheme(name){
    root.setAttribute('data-theme', name);
    if(icon) icon.textContent = name === 'dark' ? '☀️' : '🌙';
  }

  function getPreferredTheme(){
    var stored = null;
    try { stored = localStorage.getItem(storageKey); } catch(e) { /* ignore */ }
    if(stored) return stored;
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // initialize
  var initial = getPreferredTheme();
  applyTheme(initial);

  // attach handler
  if(toggle){
    toggle.addEventListener('click', function(){
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(storageKey, next); } catch(e) {}
    });
  }

  // respond to system changes if user hasn't set a preference
  try{
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
      var stored = null;
      try { stored = localStorage.getItem(storageKey); } catch(e) {}
      if(stored) return; // user choice wins
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }catch(e){ /* older browsers */ }

})();

