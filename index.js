const container=document.querySelector('.box');
const sidebar=document.querySelector('.sidebar');
const mainTitle=document.getElementById('main-title');
const closeButton=document.querySelector('.close');
const films = ["Jaws", "The Lion King","Aliens", "Harry Potter and the Philosopher's Stone", "The Goonies", "Hugo", "Twister", "Legally Blonde", "Elf", "Charlie and the Chocolate Factory"];
let count=1;
let movieImages=[];
createMovieCards();
 function createMovieCards(){
     films.forEach(async (film)=>{
        const movie=await fetchMovieDetails(film);
        let card=document.createElement("span");
        card.setAttribute('style',`--i:${count}`);
        let movieImage=document.createElement('img');
        movieImage.setAttribute('src',`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`);
        movieImage.setAttribute('alt',`${movie.title}`);
        movieImage.setAttribute('name',`${movie.title}`)
        movieImage.setAttribute('title',`Click to know more..`)
        card.appendChild(movieImage);
        container.appendChild(card);
        count++;
        console.log(movie);
    })
    
}
async function fetchMovieDetails(movie){
    try{
        const url=`https://api.themoviedb.org/3/search/movie?api_key=3f1651ceb2474ae484574ca93bfebf7e&language=en-US&query=${movie}&page=1&include_adult=false`;
        const response= await fetch(url);
        const filmData=await response.json();
        return await filmData.results[0];
    }catch(e){
        console.log('Oops! Error: ',e);
    }
}

async function generateDetails(movie){
const filmData=await fetchMovieDetails(movie);
console.log(filmData);
document.querySelector('.movie-title').innerText=`${filmData.title}`;
document.querySelector('.release-date').innerText=`Release Date : ${filmData.release_date}`;
document.querySelector('.rating').textContent=`Rating : ${filmData.vote_average}/10`;
document.querySelector('.sidebar > img').src=`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${filmData.poster_path}`;
document.querySelector('.overview').innerText=`${filmData.overview}`;
}
// event listeners
document.querySelector('body').addEventListener('mouseover',(e)=>{
if(films.includes(e.target.name)){
    console.log(e.target.name)
    container.style.animationPlayState="paused";
}
});
document.querySelector('body').addEventListener('mouseout',(e)=>{
    if(films.includes(e.target.name)){
        container.style.animationPlayState="running";
    }
    });
document.querySelector('body').addEventListener('click',(e)=>{
        if(films.includes(e.target.name)){
            sidebar.classList.remove('hidden');
            container.style.marginRight=`${sidebar.offsetWidth}px`;            
            mainTitle.style.marginRight='40rem';
            generateDetails(e.target.name);
        }
        });
closeButton.addEventListener('click',()=>{
            sidebar.classList.add('hidden');
            container.style.marginRight='0';
            mainTitle.style.marginRight='inherit';
        })           
        