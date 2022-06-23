window.onload = () => {
  chrome.storage.sync.get("quickboxd", function(data) {
    alert(data.quickboxd.rating)
  });
  // document.querySelector("#quick_rating").innerHTML = movieData.rating;
  // document.querySelector("#quick_watches").innerHTML = movieData.stats.watches;
  // document.querySelector("#quick_lists").innerHTML = movieData.stats.lists;
  // document.querySelector("#quick_likes").innerHTML = movieData.stats.likes;
}