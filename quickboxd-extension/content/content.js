console.log("quickbox started");

const netflixApi = "https://www.netflix.com/nq/website/memberapi/v2341bd5f/metadata?movieid=";
const tmdbApi = "https://api.themoviedb.org/3/search/movie?api_key=64b672e1e4c287afd09c22b468cdba0f&query=";
const quickApi = "https://us-central1-quickboxd.cloudfunctions.net/quick";

(async () => {
  try {
    const paths = window.location.pathname.split("/");
    const netflixResponse = await (await fetch(netflixApi + paths[paths.length-1])).json();
    const tmdbResponse = await (await fetch(tmdbApi + netflixResponse.video.title)).json();
    
    if (tmdbResponse.total_results > 0) {
      movieData = await (await fetch(quickApi + "?id=" + tmdbResponse.results[0].id)).json();
      
      chrome.storage.sync.set({'quickboxd': movieData}, function() {
        console.log(movieData)
        console.log('Quickboxd done!');
      });
    }

  } catch (e) {
    console.log(e)
  }
})();