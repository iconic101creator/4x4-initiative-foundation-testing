  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if(hamburger && mobileMenu){
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Get Involved forms: submit via fetch, show inline success (no redirect to Formspree)
  document.querySelectorAll('#join form').forEach(form => {
    const fieldsBlock = form.querySelector('.form-fields');
    const successBlock = form.querySelector('.form-success');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try{
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if(res.ok){
          if(fieldsBlock) fieldsBlock.style.display = 'none';
          if(successBlock) successBlock.classList.add('is-shown');
          form.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch(err){
        if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Try Again'; }
        alert("Something went wrong sending that. Mind trying again, or reach us directly at 4x4initiativefoundation@gmail.com?");
      }
    });
  });

  // Get Involved tabs
  const tabs = document.querySelectorAll('.involve-tab');
  const panels = document.querySelectorAll('.involve-panel');
  function activateTab(tab){
    if(!tab) return;
    tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
    panels.forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected','true');
    document.getElementById(tab.dataset.panel).classList.add('is-active');
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // Deep-link support: ?tab=donate jumps straight to that panel on page load
  const requestedTab = new URLSearchParams(window.location.search).get('tab');
  if(requestedTab){
    const match = document.querySelector(`.involve-tab[data-panel="panel-${requestedTab}"]`);
    if(match) activateTab(match);
  }

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el => io.observe(el));
