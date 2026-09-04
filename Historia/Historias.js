const sidebar=document.getElementById("sidebar");
const menuToggle=document.getElementById("menu-toggle");
menuToggle.addEventListener("click",()=>{sidebar.classList.toggle("open");menuToggle.classList.toggle("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){sidebar.classList.remove("open");menuToggle.classList.remove("open")}});

const stories=[
 {id:"madrugada",cat:"FINCA · 5:12 A.M.",title:"Antes de que salga el sol",text:"La finca todavía está medio dormida cuando comienza el movimiento. Entre aire frío y hojas mojadas, el día arranca antes que el sol. Para cuando alguien sirve la primera taza, ya hubo manos trabajando detrás de ella.",quote:"“Uno se despierta por el trabajo... pero el café ayuda a negociar con la madrugada.”"},
 {id:"abuela",cat:"CASA · 3:40 P.M.",title:"El café de la abuela",text:"Hay cafés que uno recuerda por el sabor y otros por la persona que los servía. Una olla en la cocina, pan sobre la mesa y una taza que nunca se medía en gramos. No era una receta perfecta. Era mejor: era familiar.",quote:"“Uno crece y prueba cafés más finos, pero algunos recuerdos siguen ganando.”"},
 {id:"lluvia",cat:"TARDE · 4:26 P.M.",title:"Café cuando llueve",text:"Empieza a llover, baja un poquito la temperatura y de repente el cuerpo decide que necesita café. Nadie sabe quién firmó esa ley, pero funciona. Si aparece pan dulce cerca, la tarde prácticamente se arregló sola.",quote:"“La lluvia pone el ambiente. El café hace el resto.”"},
 {id:"amigos",cat:"MESA · 6:18 P.M.",title:"“Solo un café”",text:"El plan era rápido: llegar, pedir una taza y regresar. Dos horas después ya se habló de clases, trabajo, gente que cae mal, planes imposibles y como siete temas que no tenían nada que ver. El café se acabó hace rato. La conversación no.",quote:"“‘Solo un café’ es una de las medidas de tiempo menos confiables conocidas por el ser humano.”"}
];
let current=0;
const tabs=[...document.querySelectorAll(".story-tab")];
function showStory(index){
 current=index;
 const s=stories[index], diary=document.getElementById("diary");
 diary.style.opacity=".25";
 setTimeout(()=>{
  document.getElementById("story-category").textContent=s.cat;
  document.getElementById("story-title").textContent=s.title;
  document.getElementById("story-text").textContent=s.text;
  document.getElementById("story-quote").textContent=s.quote;
  document.getElementById("story-page").textContent=`PÁGINA 0${index+1} / 04`;
  document.querySelector(".paper-mark").textContent=`CASA DEL CAFÉ · ARCHIVO 0${index+1}`;
  tabs.forEach((t,i)=>t.classList.toggle("active",i===index));
  diary.style.opacity="1";
 },150);
}
tabs.forEach((tab,i)=>tab.addEventListener("click",()=>showStory(i)));
document.getElementById("next-story").addEventListener("click",()=>showStory((current+1)%stories.length));

document.getElementById("memory-button").addEventListener("click",()=>{
 const input=document.getElementById("memory-input");
 const text=input.value.trim();
 if(!text){input.focus();return}
 document.querySelector("#memory-note small").textContent="TU NOTA CAFETERA";
 document.querySelector("#memory-note p").textContent=`“${text}”`;
});
document.getElementById("memory-input").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("memory-button").click()});

const search=document.getElementById("story-search");
search.addEventListener("keydown",e=>{
 if(e.key!=="Enter")return;
 const q=search.value.toLowerCase().trim(); if(!q)return;
 const found=stories.findIndex(s=>(s.title+" "+s.text+" "+s.quote+" "+s.cat).toLowerCase().includes(q));
 if(found>=0){
  showStory(found);
  document.getElementById("historias").scrollIntoView({behavior:"smooth",block:"center"});
  const diary=document.getElementById("diary"); diary.classList.add("search-hit");
  setTimeout(()=>diary.classList.remove("search-hit"),1200);
 }
});
