window.onload = () => {
  chrome.storage.sync.get("quickboxd", function(data) {
    const lbxd = data.quickboxd.lbxd;
    document.querySelector(".movie-title").innerHTML = data.quickboxd.title;
    document.querySelector(".movie-poster img").src = lbxd.image;
    document.querySelector(".quick-rating__value").innerHTML = lbxd.rating;
    document.querySelector(".quick-stats.watches span").innerHTML = lbxd.stats.watches;
    document.querySelector(".quick-stats.lists span").innerHTML = lbxd.stats.lists;
    document.querySelector(".quick-stats.likes span").innerHTML = lbxd.stats.likes;
  });
}