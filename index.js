const container=document.querySelector('.box');
const sidebar=document.querySelector('.sidebar');
const mainTitle=document.getElementById('main-title');
const closeButton=document.querySelector('.close');
const searchBar = document.querySelector('.searchbar');
const searchBtn = document.getElementById('search');
const searchInput=document.getElementById('query')
const films = ["Jaws", "The Lion King","Aliens", "Harry Potter and the Philosopher's Stone", "The Goonies", "Hugo", "Twister", "Legally Blonde", "Elf", "Charlie and the Chocolate Factory"];
let count=1;
createMovieCards();

function setAttributes(element,attributes){
  for(let attribute in attributes){
      element.setAttribute(attribute,attributes[attribute]);
  }
}

 function createMovieCards(){
     films.forEach(async (film)=>{
        const movie=await fetchMovieDetails(film);
        let card=document.createElement("span");
        setAttributes(card,{style:`--i:${count}`});
        let movieImage=document.createElement('img');
        setAttributes(movieImage,{
            'src':`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie[0].poster_path}`,
            'alt':`${movie[0].title}`,
            'name':`${movie[0].title}`,
            'class':`movie-image`,
            'title':`Click to know more..`
        })
        card.appendChild(movieImage);
        container.appendChild(card);
        count++;
    })
    
}
async function displaySearchResults(){
const searchQuery = searchInput.value;
const results = await fetchMovieDetails(searchQuery);
const movieImages= document.querySelectorAll('.movie-image');
for(let i=0;i<10;i++){
    if(i<results.length && results[i].poster_path && results[i].vote_average>3){
        setAttributes(movieImages[i],{
            'src':`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${results[i].poster_path}`,
            'alt':`${results[i].title}`,
            'name':`${results[i].title}`
        });
    }
}
}

async function fetchMovieDetails(movie){
    try{
        const url=`https://api.themoviedb.org/3/search/movie?api_key=3f1651ceb2474ae484574ca93bfebf7e&language=en-US&query=${movie}&page=1&include_adult=false`;
        const response= await fetch(url);
        const filmData=await response.json();
        return await filmData.results;
    }catch(e){
        console.log('Oops! Error: ',e);
    }
}

async function generateDetails(movie){
const filmData=await fetchMovieDetails(movie);
document.querySelector('.movie-title').innerText=`${filmData[0].title}`;
document.querySelector('.release-date').innerText=`Release Date : ${filmData[0].release_date}`;
document.querySelector('.rating').textContent=`Rating : ${filmData[0].vote_average}/10`;
document.querySelector('.sidebar > img').src=`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${filmData[0].poster_path}`;
document.querySelector('.overview').innerText=`${filmData[0].overview}`;
}
// event listeners
document.querySelector('body').addEventListener('mouseover',(e)=>{
if(e.target.classList.contains('movie-image')){
    container.style.animationPlayState="paused";
}
});
document.querySelector('body').addEventListener('mouseout',(e)=>{
    if(e.target.classList.contains('movie-image')){
        container.style.animationPlayState="running";
    }
    });
document.querySelector('body').addEventListener('click',(e)=>{
        if(e.target.classList.contains('movie-image')){
            sidebar.classList.remove('hidden');
            container.style.marginRight=`${sidebar.offsetWidth}px`;            
            mainTitle.style.marginRight='40rem';
            searchBar.style.marginRight='40rem';
            generateDetails(e.target.name);
        }
        });
closeButton.addEventListener('click',()=>{
            sidebar.classList.add('hidden');
            container.style.marginRight='0';
            mainTitle.style.marginRight='inherit';
            searchBar.style.marginRight='inherit';
        })           

searchBtn.addEventListener('click',displaySearchResults);       
searchInput.addEventListener('change',displaySearchResults);       
