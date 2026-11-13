// Finca Ochoa - Final: solo configuracion util + filtro + reveal
(function(){
  var root=document.documentElement;
  var savedTheme=null; try{savedTheme=localStorage.getItem('fo-theme')}catch(e){}
  if(savedTheme){root.setAttribute('data-theme',savedTheme)}
  function setTheme(t){root.setAttribute('data-theme',t); try{localStorage.setItem('fo-theme',t)}catch(e){} updateThemeBtn()}
  function updateThemeBtn(){var b=document.querySelector('[data-theme-btn]'); if(!b) return; var dark=root.getAttribute('data-theme')==='dark'; b.textContent=dark?'Claro':'Oscuro'; b.setAttribute('aria-pressed',dark?'true':'false')}
  document.addEventListener('click',function(e){
    var tb=e.target.closest('[data-theme-btn]'); if(tb){var isDark=root.getAttribute('data-theme')==='dark'; setTheme(isDark?'light':'dark'); return}
    var inc=e.target.closest('[data-font-plus]'); var dec=e.target.closest('[data-font-minus]');
    if(inc||dec){var cur=parseFloat(getComputedStyle(root).getPropertyValue('--font-scale'))||1; var next=inc?Math.min(1.25,cur+0.08):Math.max(0.9,cur-0.08); root.style.setProperty('--font-scale',next.toFixed(2)); try{localStorage.setItem('fo-font',next)}catch(e){} var live=document.getElementById('tamano-actual'); if(live) live.textContent=Math.round(next*100)+'%'; return}
  });
  try{var f=localStorage.getItem('fo-font'); if(f) root.style.setProperty('--font-scale',f)}catch(e){}
  updateThemeBtn();
  var filterBtns=document.querySelectorAll('[data-filter]');
  var cards=document.querySelectorAll('[data-tipo]');
  var countEl=document.getElementById('resultado-filtro');
  if(filterBtns.length){
    filterBtns.forEach(function(btn){
      btn.addEventListener('click',function(){
        filterBtns.forEach(function(b){b.classList.remove('active'); b.setAttribute('aria-pressed','false')});
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
        var f=btn.getAttribute('data-filter'); var shown=0;
        cards.forEach(function(c){var show=(f==='todos'||c.getAttribute('data-tipo')===f); c.style.display=show?'':'none'; if(show) shown++});
        if(countEl) countEl.textContent='Mostrando '+shown+' de '+cards.length+' variedades.';
      });
    });
  }
  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible'); io.unobserve(en.target)}})},{threshold:.12});
    reveals.forEach(function(r){io.observe(r)});
  } else { reveals.forEach(function(r){r.classList.add('visible')}) }
  var form=document.getElementById('form-contacto');
  if(form){form.addEventListener('submit',function(e){e.preventDefault(); var ok=document.getElementById('form-ok'); if(ok){ok.hidden=false; ok.focus()} form.reset()})}
})();
