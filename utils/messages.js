const moment = require('moment');

function formatMessage(username, text, room_id, user_id, room_name) {
  return {
    chatroom: room_id,
    chatroom_name: room_name,
    user: user_id,
    username,
    text,
    date: moment().format(),
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
