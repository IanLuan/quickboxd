const netflixApi = "https://www.netflix.com/nq/website/memberapi/v2341bd5f/metadata?movieid=80242342";
const tmdbApi = "https://api.themoviedb.org/3/search/movie?api_key=64b672e1e4c287afd09c22b468cdba0f&query=";

window.onload = async () => {
  const netflixResponse = await (await fetch(netflixApi)).json();
  const title = netflixResponse.video.title;

  const tmdbResponse = await (await fetch(tmdbApi + title)).json();
  const movieId = tmdbResponse.results[0].id;
  
  document.querySelector("#teste_pop").innerHTML = "yes";
}