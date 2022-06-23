const functions = require("firebase-functions");
const axios = require('axios');
const cheerio = require('cheerio');


/* /esi/film/hustle-2022/stats/ */
/* /csi/film/hustle-2022/rating-histogram/ */
const lbxdUrl = "https://letterboxd.com";

const getRating = (data) => {
    const $ = cheerio.load(data);
    return $(".display-rating").text();
}

const getStats = (data) => {
  const $ = cheerio.load(data);
  return {
    watches: $(".filmstat-watches a").text(),
    lists: $(".filmstat-lists a").text(),
    likes: $(".filmstat-likes a").text()
  }
}

exports.quick = functions.https.onRequest(async (fnReq, fnRes) => {
  fnRes.set('Access-Control-Allow-Origin', '*');
  const movieId = fnReq.query.id;

  if(movieId) {
    axios(lbxdUrl + "/tmdb/" + movieId)
    .then(response => {
      const data = {};
      const $ = cheerio.load(response.data);
      const target = $(".film-poster").attr("data-target-link");

      data.image = $(".film-poster img").attr("src");

      axios(lbxdUrl + "/csi" + target + "rating-histogram")
      .then(response => {
        data.rating = getRating(response.data);

        axios(lbxdUrl + "/esi" + target + "stats")
        .then(response => {
          data.stats = getStats(response.data);

          fnRes.json(data)
        }).catch(err => console.error(err));

      }).catch(err => console.error(err));
      
    }).catch(err => console.error(err));
  }

});
