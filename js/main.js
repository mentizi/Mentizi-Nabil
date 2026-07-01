const page = window.location.pathname.split('/').pop();

var LANG_PATH="js/lang/";
if((page!="index.html") && (page!=""))
{
	
	LANG_PATH = '../js/lang/';
	
}

let currentLang = localStorage.getItem('lang') || 'fr';

// util
function q(id){ return document.getElementById(id); }

// charger le fichier de langue (cache bust pour forcer reload si nécessaire)
function loadLang(lang){
	
  return new Promise((resolve, reject) => {
    // supprimer ancien script s'il existe
    const old = document.getElementById('lang-script');
    if(old) old.remove();

    const s = document.createElement('script');
    s.id = 'lang-script';
    s.src = `${LANG_PATH}${lang}.js`;
    s.onload = () => resolve(window.langData);
    s.onerror = () => reject(new Error('Impossible de charger la langue'));
    document.head.appendChild(s);
  });
}

function applyContent(data){
  // header
  q('nameHeader').textContent = data.nameHeader || data.name;
  
  q('roleHeader').textContent = data.role;
  //menu
  q('menu_1').textContent = data.menu1;
  q('menu_2').textContent = data.menu2;
  q('menu_3').textContent = data.menu3;
  q('menu_4').textContent = data.menu4;
  q('menu_5').textContent = data.menu5;
  
  
 if(page=="apropos.html"){
	 if(data.lang=='ar')
	 {
		q("about_section").style.direction = "rtl";
	 }
	 else
	 {
		 q("about_section").style.direction = "";
	 }
	 q('nameFooter').textContent = data.nameFooter;
	q('p0').textContent = data.p0;
	q('p1').innerHTML = data.p1;
	q('p2').innerHTML = data.p2;
	q('p3').innerHTML = data.p3;
	q('p4').innerHTML = data.p4;
	q('titreFooter').textContent = data.titreFooter;
 }
 else if(page=="formations.html")
 {
	 if(data.lang=='ar')
	 {
		q("about_section").style.direction = "rtl";
	 }
	 else
	 {
		 q("about_section").style.direction = "";
	 }
	q('titre_f').innerHTML = data.titre_f;
	q('eldiv1').innerHTML = data.eldiv1;
	q('eldiv2').innerHTML = data.eldiv2;
	q('eldiv3').innerHTML = data.eldiv3; 
 }
 else if(page=="experience.html")
 {
	 if(data.lang=='ar')
	 {
		q("about_section").style.direction = "rtl";
	 }
	 else
	 {
		 q("about_section").style.direction = "";
	 }
	Object.keys(data).forEach(id => {
		  const el = q(id);
		  if (el) {
			el.innerHTML = data[id];
		  }
		});
 } else{
	 
	 q('c_p').textContent = data.c_p;
  q('el1').textContent = data.el1;
q('el2').textContent = data.el2;
q('el3').textContent = data.el3;
q('el4').textContent = data.el4;
q('el5').textContent = data.el5;
q('el6').textContent = data.el6;
q('el7').textContent = data.el7;
q('el8').textContent = data.el8;
q('el9').textContent = data.el9;
q('el10').textContent = data.el10;

q('el11').textContent = data.el11;
q('el12').textContent = data.el12;
q('el13').textContent = data.el13;
q('el14').textContent = data.el14;
q('el15').textContent = data.el15;
q('el16').textContent = data.el16;
q('el17').textContent = data.el17;
q('el18').textContent = data.el18;
q('el19').textContent = data.el19;
q('el20').textContent = data.el20;

q('el21').textContent = data.el21;
q('el22').textContent = data.el22;
q('el23').textContent = data.el23;
q('el24').textContent = data.el24;
q('el25').textContent = data.el25;
q('el26').textContent = data.el26;
q('el27').textContent = data.el27;
q('el28').textContent = data.el28;
q('el29').textContent = data.el29;
q('el30').textContent = data.el30;

q('el31').textContent = data.el31;
q('el32').textContent = data.el32;
q('el33').textContent = data.el33;
q('el34').textContent = data.el34;
q('el35').textContent = data.el35;
q('el36').textContent = data.el36;
q('el37').textContent = data.el37;
q('el38').textContent = data.el38;
q('el39').textContent = data.el39;
q('el40').textContent = data.el40;

q('el41').textContent = data.el41;
q('el42').textContent = data.el42;
q('el43').textContent = data.el43;
q('el44').textContent = data.el44;
q('el45').textContent = data.el45;
q('el46').textContent = data.el46;
q('el47').textContent = data.el47;
q('el48').textContent = data.el48;
q('el49').textContent = data.el49;
q('el50').textContent = data.el50;

q('el51').textContent = data.el51;
q('el52').textContent = data.el52;
q('el53').textContent = data.el53;
q('el54').textContent = data.el54;
q('el55').textContent = data.el55;
q('el56').textContent = data.el56;
q('el57').textContent = data.el57;
q('el58').textContent = data.el58;
q('el59').textContent = data.el59;
q('el60').textContent = data.el60;

q('el61').textContent = data.el61;
q('el62').textContent = data.el62;
q('el63').textContent = data.el63;
q('el64').textContent = data.el64;
q('el65').textContent = data.el65;
q('el66').textContent = data.el66;
  
  
  // hero
  q('heroTitle').textContent = data.heroTitle;
  q('heroSubtitle').textContent = data.heroSubtitle;
  q('contactMail').href = `mailto:${data.email}`;
  q('linkGithub').href = data.github;

  // card
  q('nameCard').textContent = data.name;
  q('roleCard').textContent = data.role;

  // about
  q('aboutTitle').textContent = data.aboutTitle;
  q('aboutText').textContent = data.about;

  // skills
  q('skillsTitle').textContent = data.skillsTitle;
  const skillsList = q('skillsList');
  skillsList.innerHTML = '';
  data.skills.forEach(s => {
    const el = document.createElement('div');
    el.className = 'skill-pill';
    el.textContent = s;
    skillsList.appendChild(el);
  });

  // experiences
  q('expTitle').textContent = data.expTitle;
  const expList = q('expList');
 expList.innerHTML = '';
  (data.experience || []).forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `<h4>${item.title} <small style="color:var(--muted);font-weight:600"> — ${item.period}</small></h4>
                    <p>${item.desc}</p>`;
    expList.appendChild(el);
  });

  // contact & footer
  q('contactTitle').textContent = data.contactTitle;
  q('email').textContent = data.email;
  q('footerText').textContent = data.footer;
 }
  // animations: trigger show
  document.querySelectorAll('.animated').forEach((el, i) => {
    setTimeout(()=>el.classList.add('show'), 120 * i);
  });
}

// gestion boutons langue
document.addEventListener('DOMContentLoaded', async ()=>{
  const buttons = document.querySelectorAll('.lang-switch .lang');
  buttons.forEach(b => {
    b.addEventListener('click', async (e) => {
      const lang = b.getAttribute('data-lang');
      if(lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem('lang', lang);
      buttons.forEach(x=>x.classList.toggle('active', x===b));
      try {
        const data = await loadLang(lang);
        applyContent(data);
      } catch(err){
        console.error(err);
      }
    });
    // set active class initial
    if(b.getAttribute('data-lang') === currentLang) b.classList.add('active');
  });

  // charger langue initiale
  try {
    const data = await loadLang(currentLang);
    applyContent(data);
  } catch(e){
    console.error(e);
  }
});
