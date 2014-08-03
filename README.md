# TraktProgress

NodeJS CLI client to update [trakt.tv](http://trakt.tv/) progress

## Install

Clone this repo and execute `./bin/traktprogress.js` or `npm install traktprogress -g`

**REMEMBER TO EDIT COFIGURATION FILE**

If you install traktprogress globally ( `-g option in npm`) you can find your configuration file in `/usr/lib/node_modules/traktprogress`

## How to configure it

* Create an account on [trakt.tv](http://trakt.tv) website
* Set as 'seen' your seasons or episodes until now (search it like http://trakt.tv/search/all?q=bleach and set 'seen' all seasons those you have watched)
* Take your APIKEY here: [http://trakt.tv/api-docs/authentication](http://trakt.tv/api-docs/authentication)
* Encrypt your account's password in SHA-1 (you can use: [SHA-1 Encrypt](http://www.sha1-online.com/) )
* Put in your configuration file: your username, your encrypted password and your apikey

## How to use it

* Run it with `traktprogress`, it takes your episodes from the trakt.tv site and put it into a list
* You can move up/down using arrow keys
* When you want to check an episode you can press `enter` and select `yes` otherwise `tab` or using your mouse select `no`
* Press `q` to exit

## Screenshot
![screen1](http://i.imgur.com/cqyplL2.jpg)

![screen2](http://i.imgur.com/3sN1FyK.jpg)

## License

MIT
