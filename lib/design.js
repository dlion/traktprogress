var blessed = require('blessed'),
    screen = blessed.screen();

/**
 * Ncurses
 */

//Table big
var tableBig = blessed.box({
  left: 0,
  top: 0,
  width: screen.width,
  height: screen.height,
  tags:true
});

//On the table there is a title
var title   = blessed.box({
  top: '1%',
  height: '4%',
  width: screen.width,
  align: 'center',
  content: '{black-fg}Trakt{/black-fg}Progress',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  },
  parent: tableBig
});

var titleTitle = blessed.box({
  left: 0,
  top: '4%',
  height: '4%',
  width: '25%',
  content: '{white-fg}Title{/white-fg}',
  align: 'center',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  },
  parent: tableBig
});

//TitleTable
var tableTitle = blessed.box({
  left: 0,
  top: '4%',
  width: '25%',
  height: screen.height,
  tags: true,
  parent: tableBig
});

//List on the titleTable
var listTitle = blessed.list({
  selectedFg: 'white',
  selectedBg: 'blue',
  parent: tableTitle,
  top: '4%',
  left: 0,
  tags: true
});

var titleTitleNext = blessed.box({
  left: '24%',
  top: '4%',
  height: '4%',
  width: '41%',
  content: '{white-fg}Next Episode{/white-fg}',
  align: 'center',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  },
  parent: tableBig
});

//TitleNextTable
var tableNextTitle = blessed.box({
  left: '24%',
  top: '4%',
  width: '41%',
  height: screen.height,
  tags: true,
  parent: tableBig
});

//List on the titleNext
var listNextTitle = blessed.list({
  selectedFg: 'white',
  selectedBg: 'blue',
  parent: tableNextTitle,
  top: '4%',
  left: 0,
  tags: true
});

var titleTitleSeason = blessed.box({
  left: '64%',
  top: '4%',
  width: '5%',
  height: '4%',
  content: '{white-fg}Season{/white-fg}',
  align: 'center',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  },
  parent: tableBig
});

//tableSeason
var tableSeason = blessed.box({
  left: '64%',
  top: '4%',
  width: '6%',
  height: screen.height,
  tags: true,
  parent: tableBig
});

//List on the perc
var listSeason = blessed.list({
  selectedFg: 'white',
  selectedBg: 'blue',
  parent: tableSeason,
  top: '4%',
  left: 0,
  tags: true
});

var titleTitleNumber = blessed.box({
  left: '69%',
  top: '4%',
  width: '5%',
  height: '4%',
  content: '{white-fg}Number{/white-fg}',
  align: 'center',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  },
  parent: tableBig
});

var tableNumber = blessed.box({
  left: '69%',
  top: '4%',
  width: '5%',
  height: screen.height,
  tags: true,
  parent: tableBig
});

var listNumber = blessed.list({
  selectedFg: 'white',
  selectedBg: 'blue',
  parent: tableNumber,
  top: '4%',
  left: 0,
  tags: true
});

var titleTitleDate = blessed.box({
  left: '73%',
  top: '4%',
  width: '29%',
  height: '4%',
  content: '{white-fg}Date{/white-fg}',
  align: 'center',
  tags: true,
  style: {
    fg: 'white',
    bg: 'blue'
  },
  parent: tableBig
});

var tableDate = blessed.box({
  left: '73%',
  top: '4%',
  width: '29%',
  height: screen.height,
  tags: true,
  parent: tableBig
});

var listDate = blessed.list({
  selectedFg: 'white',
  selectedBg: 'blue',
  parent: tableDate,
  top: '4%',
  left: 0,
  tags: true
});

//Initial Message
var message = blessed.box({
  parent: tableBig,
  width: '50%',
  height: 3,
  border: {
    type: 'line'
  },
  tags: true,
  top: 'center',
  left: 'center',
  content: "{center}Fetching data from the web, please wait...{/center}"
});

var form = blessed.form({
  parent: screen,
  width: '50%',
  height: 7,
  border: {
    type: 'line'
  },
  keys: true,
  tags: true,
  top: 'center',
  left: 'center'
});

var submit = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 35,
  width: 9,
  top: 3,
  tags: true,
  name: 'yes',
  content: ' Yes',
  style: {
    focus: {
      bg: 'blue',
      fg: 'white'
    },
    hover: {
      bg: 'blue',
      fg: 'white'
    }
  },
  border: {
    type: 'line'
  }
});

var cancel = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 48,
  width: 9,
  top: 3,
  name: 'no',
  tags: true,
  content: ' No',
  style: {
    focus: {
      bg: 'blue',
      fg: 'white'
    },
    hover: {
      bg: 'blue',
      fg: 'white'
    }
  },
  border: {
    type: 'line'
  }
});

exports.tableBig          = tableBig;
exports.tableTitle        = tableTitle;
exports.titleTitle        = titleTitle;
exports.titleTitleNext    = titleTitleNext;
exports.titleTitleSeason  = titleTitleSeason;
exports.titleTitleNumber  = titleTitleNumber;
exports.titleTitleDate    = titleTitleDate;
exports.tableNextTitle    = tableNextTitle;
exports.tableSeason       = tableSeason;
exports.tableNumber       = tableNumber;
exports.tableDate         = tableDate;
exports.title             = title;
exports.listTitle         = listTitle;
exports.listNextTitle     = listNextTitle;
exports.listSeason        = listSeason;
exports.listNumber        = listNumber;
exports.listDate          = listDate;
exports.message           = message;
exports.submit            = submit;
exports.cancel            = cancel;
exports.form              = form;
exports.screen            = screen;
