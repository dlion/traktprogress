#!/usr/bin/env node
var trakt   = require('../lib/trakt.js'),
    design  = require('../lib/design.js'),
    conf    = require('../traktprogress.conf.json'),
    moment  = require('moment');

//Check if username, password and APIKEY are setted
if(conf.username === "" || conf.password === "" || conf.APIKEY === "") {
  console.error("Set your Username, Password and APIKEY");
  process.exit(0);
}

//Global variables
var arrayIndex = 0,
    result = {};

//Append to screen titles and messages
design.screen.append(design.tableBig);
design.tableBig.append(design.title);
design.tableBig.append(design.titleTitle);
design.tableBig.append(design.titleTitleNext);
design.tableBig.append(design.titleTitleSeason);
design.tableBig.append(design.titleTitleNumber);
design.tableBig.append(design.titleTitleDate);
design.tableBig.append(design.message);
design.message.hide();

/**
 * Exit
 */
design.screen.key(['escape', 'q', 'C-c'], function() {
  return process.exit(0);
});

//If press 'no'
design.cancel.on('press', function() {
  design.screen.remove(design.form);
  design.listTitle.focus();
  design.screen.render();
});

//If press 'yes'
design.submit.on('press', function() {
  //CheckIn
  trakt.setSeen(conf.APIKEY, {
    username: conf.username,
    password: conf.password
  }, {
    imdbID: result[arrayIndex].imdbID,
    title: result[arrayIndex].title,
    year: result[arrayIndex].year,
    season: result[arrayIndex].seasonNext,
    episode: result[arrayIndex].numberNext
  }, function(err) {
    if(!err) {
      design.message.setContent("{center}Check-in done!{/center}");
    } else {
      design.message.setContent("{center}Check-in Failed\nQuit and restart{/center}");
    }
    design.screen.remove(design.form);
    design.message.show();
    //Wait 2 seconds and re-init
    setTimeout(function(){ design.message.hide(); design.listTitle.focus(); init(); }, 2000);
    design.screen.render();
  });
});

/**
 * When Press a key into a list
 */
design.listTitle.on('keypress', function(ch, key) {
  if(key.name === "down") {

    design.listTitle.down(1);
    design.listNextTitle.down(1);
    design.listSeason.down(1);
    design.listNumber.down(1);
    design.listDate.down(1);

    //Put down and decrease the index
    if(arrayIndex < result.length-1) {
      arrayIndex += 1;
    }
  } else if(key.name === "up") {

    design.listTitle.up(1);
    design.listNextTitle.up(1);
    design.listSeason.up(1);
    design.listNumber.up(1);
    design.listDate.up(1);

    //Put up and increase the index
    if(arrayIndex > 0) {
      arrayIndex -= 1;
    }
  } else if(key.name === "enter") {
    //If there are episodes
    if(result.length > 0) {
      //get timestamp
      var tsShow  = moment(result[arrayIndex].first_aired*1000),
          tsNow   = moment();
      //Check if the show it was aired
      if((tsShow.isBefore(tsNow, 'year')  || tsShow.isSame(tsNow, 'year')) &&
         (tsShow.isBefore(tsNow, 'month') || tsShow.isSame(tsNow, 'month')) &&
         (tsShow.isBefore(tsNow, 'day')   || tsShow.isSame(tsNow, 'day'))) {
        design.form.setContent("{center}Are you sure to want to check this episode?\n{yellow-fg}"+result[arrayIndex].titleNext+"{/yellow-fg}{/center}");
        design.screen.append(design.form);
        design.submit.focus();
      }
    }
  }
  design.screen.render();
});

/*
 * Init
 */
function init() {
  //Clear all lists
  design.listTitle.clearItems();
  design.listNextTitle.clearItems();
  design.listSeason.clearItems();
  design.listNumber.clearItems();
  design.listDate.clearItems();

  design.message.show();
  design.screen.render();

  //Get all the shows
  trakt.getShowsProgress(conf.APIKEY, conf.username, function(err, ris) {
    if(!err) {
      result = ris;
      var index;
          arrayIndex = 0;

      design.message.hide();

      if(result.length > 0) {
        for(index in result) {
          design.listTitle.add("["+(result[index].perc).toString()+"%] "+result[index].title);
          design.listNextTitle.add(result[index].titleNext);
          design.listSeason.add((result[index].seasonNext).toString());
          design.listNumber.add((result[index].numberNext).toString());
          design.listDate.add(moment(result[index].first_aired*1000).format("DD/MM/YYYY"));
        }

      } else {
        design.listTitle.add("n/a");
        design.listNextTitle.add("n/a");
        design.listSeason.add("n/a");
        design.listNumber.add("n/a");
        design.listDate.add("n/a");
      }

      design.tableTitle.append(design.listTitle);
      design.tableNextTitle.append(design.listNextTitle);
      design.tableSeason.append(design.listSeason);
      design.tableNumber.append(design.listNumber);
      design.tableDate.append(design.listDate);
      design.listTitle.focus();
      design.screen.render();
    } else {
      console.error(ris);
    }
  });
};

//Start
init();
