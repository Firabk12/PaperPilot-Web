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
