const feedparser = require('feedparser-promised');

// feed: url for the feed
// Accepts a url feed and parses it, on success will return an array
module.exports = feedparser.parse;
