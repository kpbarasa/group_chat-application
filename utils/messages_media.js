const moment = require('moment');

function formatMessageMedia(username, media) {
  return {
    username,
    media,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessageMedia;
