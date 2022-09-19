const users = [];
const usersPrivate = [];

// Join user to chat
function userJoin(id, username, room) {

  const user = { id, username, room };

  users.push(user);
  console.log(users);

  return user;

}
// Join users to chat
function usersJoin(id, username, username2) {

  const room = username+"-"+username2 
  const user = { id, username, username2, room };

  usersPrivate.push(user);

  return user;

}

// Get current user
function getCurrentUser(id) {
  console.log("users");
  console.log(users);
  return users.find(user => user.id === id);
}

function getCurrentUser_private(id) {
  console.log("usersPrivate");
  console.log(usersPrivate);
  return usersPrivate.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  usersJoin,
  getCurrentUser,
  getCurrentUser_private,
  userLeave,
  getRoomUsers
};
