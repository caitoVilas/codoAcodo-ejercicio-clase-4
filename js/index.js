const d = document, w = window;
const ls = localStorage;
const n = navigator;

// **** Evento Pongo en escucha el documento

d.addEventListener('DOMContentLoaded',e => {
scrollTopBtn('.scroll-top-btn');
searchFilters('.card-filter','.card');
getGeoLocation('geolocation');
});

darkTheme('.dark-theme-btn','dark-mode');


//************************Boton Pa Ariba ***************************************

function scrollTopBtn(btn){
    const $scrollBtn= d.querySelector(btn);

 w.addEventListener('scroll', e => {

  let scrolTop = w.pageYOffset || d.documentElement.scrollTop;
  if(scrolTop > 80){
     $scrollBtn.classList.remove('hidden');
  }else {
     $scrollBtn.classList.add('hidden');
 }
});
d.addEventListener('click', e => {
if(e.target.matches(btn)){
    w.scrollTo({
        behavior: 'smooth',
        top: 0
    })
}
});
}

//*********Filtro de busquedas ****************************************


function searchFilters(input,selector) {
 d.addEventListener('keyup', (e) => {
 if(e.target.matches(input)){
    //console.log(e.key);
    if(e.key === 'Escape') e.target.value = '';
    d.querySelectorAll(selector).forEach((el) => el.textContent.toLowerCase().includes(e.target.value)
    ?el.classList.remove('filter'):el.classList.add('filter'));
  }
 });
}

// ********************* Modo Oscuro **********************************+

function darkTheme(btn, classDark) {

  const $themeBtn = d.querySelector(btn),
  $selctors = d.querySelectorAll('[data-dark]');

  let moon = '🌙',
  sun = '☀️';    

const lighMode = () => {
  $selctors.forEach(el => el.classList.remove(classDark));
  $themeBtn.textContent = moon;
  ls.setItem('theme','light');
};
const darkMode = () => {
  $selctors.forEach(el => el.classList.add(classDark));
  $themeBtn.textContent = sun;
  ls.setItem('theme', 'dark');
};

d.addEventListener('click', e => {
   if(e.target.matches(btn)){
   if($themeBtn.textContent === moon){
     darkMode();
   }else {
   lighMode();
  }
 }    
});
d.addEventListener('DOMContentLoaded', e => {
  if(ls.getItem('theme') === null) ls.setItem('theme','light');

  if(ls.getItem('theme') === 'light') lighMode();

  if(ls.getItem('theme') === 'dark') darkMode();
  });
};

//******* Geolocalizacion *********************************************

function getGeoLocation(id) {

    console.log(id);
    const $id = d.getElementById(id),
      options = {
          enableHighAccurancy : true,
          timeout: 5000,
          maximunAge: 0
      };

      const success = (position) =>{

        let cords = position.coords;
        $id.innerHTML = `
        <p>Tu Posicion Actual es :<p>
        <ul>
        <li>Latitud     : <b>${cords.latitude}</b></li>
        <li>Longitud    : <b>${cords.longitude}</b></li>
        <li>Precicicion : <b>${cords.accuracy}</b></li>
        </ul>
        <a href="https://google.com/maps/@${cords.latitude},${cords.longitude},17.5z"
        target="_blank" rel="noopener">Ver en Google Maps</a>`;
        };

      const error = (err) =>{

        $id.innerHTML = `<p><mark>Error ${err.code} : ${err.message}</mark></p>`;
      };

      n.geolocation.getCurrentPosition(success,error,options);

}