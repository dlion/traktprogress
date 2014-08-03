var request = require('request');

module.exports = (function(request) {
  var API   = "http://api.trakt.tv/";

  return {
    /**
     * Return all the shows with next episode
     * @param {String}  KEY   KEY of the user
     * @param {function} cb   function(err, result)
     */
    getShowsProgress: function(KEY, user, cb, sort) {
      var sort = sort || 'most-completed';
      request.get(API + 'user/progress/watched.json/' + KEY + "/" + user
                  + '/0/' + sort, function(err, resp) {
        if(!err) {
          //To add Unique shows that I have seen
          var body = JSON.parse(resp.body),
              i,
              result = [];

          for(i in body) {
            if(body[i].next_episode !== false) {
              result.push({
                'imdbID': body[i].show.imdb_id,
                'title': body[i].show.title,
                'year': body[i].show.year,
                'perc': body[i].progress.percentage,
                'left': body[i].progress.left,
                'seasonNext': body[i].next_episode.season,
                'numberNext': body[i].next_episode.number,
                'titleNext': body[i].next_episode.title,
                'first_aired': body[i].next_episode.first_aired
              });
            }
          }
          cb(null, result);
        } else {
          cb(true, body.status.error);
        }
      });
    },

    /**
     * Return all the shows data to coming out, default: today to 7 days
     * @param {String} KEY  KEY of the user
     * @param {String} user Nick of the user
     * @param {function} cb function(err, result)
     */
    getShowsCalendar: function(KEY, user,  cb) {
      request.get(API + 'user/calendar/shows.json/' + KEY + "/" + user,
                  function(err, resp) {
        if(!err) {
          var body = JSON.parse(resp.body),
              i, j,
              result = [];

          for(i in body) {
            for(j in body[i].episodes) {
              result.push({
                'imdbID': body[i].episodes[j].show.imdb_id,
                'year': body[i].episodes[j].show.year,
                'title': body[i].episodes[j].show.title,
                'date': body[i].date,
                'episodeNext': body[i].episodes[j].episode.season,
                'titleNext': body[i].episodes[j].episode.title
              });
            }
          }
          cb(null, result);
        } else {
          cb(true, false);
        }
      });
    },

    /**
     * @param {String} KEY APIKEY
     * @param {String} title Title of the show
     * @param {Number} season Number of the season
     */
    getSeasonEpisodes: function(KEY, title, season) {
      request.get(API + 'show/season.json/' + KEY + '/' + title + '/' + season,
                  function(err, resp) {
        if(!err) {
          var body = JSON.parse(resp.body),
              i,
              result = [];

          for(i in body) {
            result.push({
              'episode': body[i].episode,
              'title': body[i].title,
              'first_aired': body[i].first_aired,
              'first_aired_iso': body[i].first_aired_iso
            });
          }
          cb(null, result);
        } else {
          cb(true, false);
        }
      });
    },

    /**
     * @param {String} KEY  API KEY
     * @param {Object} userData {username: String, password: SHA1String}
     * @param {Object} episodeData {imdB: String, title: String, year: Number,
     * season: Number, episode: Number }
     */
    setSeen: function(KEY, userData, episodeData, cb) {
      request.post({
        url: API + 'show/episode/seen/' + KEY,
        json: {
          'username': userData.username,
          'password': userData.password,
          'imdb_id': episodeData.imdbID,
          'title': episodeData.title,
          'year': episodeData.year,
          'episodes': [{
            'season': episodeData.season,
            'episode': episodeData.episode
          }]
        }
      }, function(err) {
        if(!err) {
          cb(null, true);
        } else {
          cb(true, false);
        }
      });
    }
  };
}(request));
