// USER VARIABLES 
const displayName = document.getElementById('userName')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const image = document.getElementById('profile-image')
const userEmail = document.getElementById('userEmail')
const password = document.getElementById('password')
const logEmail = document.getElementById('log-email')
const logPassword = document.getElementById('log-password')
const groupCards = document.getElementById('group-cards')

// 
const inputRoomName = document.getElementById('room-name')
const description = document.getElementById('Description')

// Register user 
// @Function: fetch request 
// @route:    POST http://localhost:8000/user/register
async function registerUser() {
    
    console.log(
        {
            "userName": document.getElementById('updt-userName').value,
            "firstName": document.getElementById('updt-firstName').value,
            "lastName": document.getElementById('updt-lastName').value,
            "email": document.getElementById('updt-userEmail').value,
            "image": document.getElementById('updt-user-img').files,
            "password": document.getElementById('updt-password').value
        }
    );
    
    const userName = document.getElementById('updt-userName');
    const firstName = document.getElementById('updt-firstName');
    const lastName = document.getElementById('updt-lastName');
    const email = document.getElementById('updt-userEmail');
    const password = document.getElementById('updt-password');

    let media_data = document.getElementById('updt-user-img').files;

    if (media_data[0]) {

        const reader = new FileReader();

        reader.readAsDataURL(media_data[0]);

        reader.onloadend = async function () {

            let mediaArr = []

            mediaArr.push(reader.result);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "displayName": userName.value,
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "email": email.value,
                    "image": mediaArr,
                    "password": password.value
                })
            };
            await fetch('http://localhost:8000/user/register', requestOptions)
            .then(res => res.json())
                .then(res => {console.log(res)

                    res.status !== "fail" ? window.location = "login.html" : Error()
                    
                })
                .catch(err => console.log(err))

        }
    }


}

// Update user 
// @Function: fetch request 
// @route:    POST http://localhost:8000/user/update
async function update() {
    
    const userName = document.getElementById('updt-userName');
    const firstName = document.getElementById('updt-firstName');
    const lastName = document.getElementById('updt-lastName');
    const email = document.getElementById('updt-userEmail');
    const password = document.getElementById('updt-password');

    let media_data = document.getElementById('updt-user-img').files;

        const reader = new FileReader();

        reader.readAsDataURL(media_data[0]);

        reader.onloadend = async function () {

            let mediaArr = []

            mediaArr.push(reader.result);
            console.log(mediaArr);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "userName": userName.value,
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "email": email.value,
                    "image": mediaArr,
                    "password": password.value
                })
            };
            await fetch('http://localhost:8000/user/update', requestOptions)
                .then(res => res.status === 200 ? window.location.reload() : Error())
                .catch(err => console.log(err))


    }
}

// @Desc:      Login user
// @Function: fetch request 
// @route:    GET http://localhost:8000/user/register
async function loginUser() {
    console.log(document.getElementById('log-password').value, document.getElementById('log-email').value);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email": logEmail.value, "password": logPassword.value })
    };
    await fetch('http://localhost:8000/user/login', requestOptions)
        .then(res => res.json())
        .then(res => {

            localStorage.setItem("userName", res.userName); // Get user info

            localStorage.setItem("token", res.token); // get JWT token
            
            res.status === "success" ? window.location = "chat.html" : Error();

        })
        .catch(err => console.log(err))

}

// @Desc:      Log out user
// @Function: fetch request 
// @route:    GET http://localhost:8000/user/register
async function logOut() {
    const requestOptions = {
        method: 'get',
    };
    await fetch('http://localhost:8000/user/logout', requestOptions)
        .then(res => res.json())
        .then(res => {

            res.status === "success" ? window.location = "login.html" : Error()

        })
        .catch(err => console.log(err))

}

// @Desc:      Login Google user
// @Function: fetch request 
// @route:    GET http://localhost:8000/user/register
async function loginGoogle() {
    const requestOptions = {
        method: 'GET'
    };
    await fetch('http://localhost:8000/user/login/google', requestOptions)
        .then(res => res.json())
        .then(res => {
            console.log(res);

            // localStorage.setItem("userName", res.userName); // Get user info

            // localStorage.setItem("token", res.token); // get JWT token

            // res.status === "success" ? window.location = "chat.html" : Error()

        })
        .catch(err => console.log(err))

}

// @Desc:      get chat Uer rooms
// @Function:  fetch request 
// @route:     GET http://localhost:8000/chatroom/get
async function getUserRooms(id) {

    const requestOptions = {
        method: 'get'
    };
    await fetch('http://localhost:8000/chatroom/get', requestOptions)
        .then(res => res.json())
        .then((res) => {

            // @Desc:     Group card layout 
            // @location: js/utils/functions.js
            // @line:      28
            groupCard(res, id)
            console.log(res);
        })
        .catch(err => console.log(err))

}

// @Desc:      get chat Uer rooms
// @Function:  fetch request 
// @route      GET http://localhost:8000/chatroom/get/63108dafa3def5783589b628
async function getUserRoomsSidebar() {

    const requestOptions = {
        method: 'get'
    };
    await fetch('http://localhost:8000/chatroom/get/63108dafa3def5783589b628', requestOptions)
        .then(res => res.json())
        .then((res) => {

            // @Desc:     Group card List 
            // @location: js/utils/functions.js
            // @line:      261
            groupList(res)
        })
        .catch(err => console.log(err))

}

// get chat Uer rooms
// @Function:  fetch request 
// @route:     GET http://localhost:8000/chatroom/cats
async function getRoomsCat(id) {

    const requestOptions = {
        method: 'get'
    };
    await fetch('http://localhost:8000/chatroom/cats', requestOptions)
        .then(res => res.json())
        .then((res) => {

            // @Desc:     Group card layout 
            // @location: js/utils/functions.js
            // @line:      213
            groupCategoryList_select(res)

            // @Desc:     Group card layout 
            // @location: js/utils/functions.js
            // @line:      186
            groupCategoryList_menu(res)

            // @Desc:     Group card layout 
            // @location: js/utils/functions.js
            // @line:      236
            searchResultsCat_list(res)
        })
        .catch(err => console.log(err))

}

// @Desc:      Delete chat room
// @Function:  fetch request 
// @route      GET http://localhost:8000/chatroom/del/
async function deleteRoom(id) {

    const requestOptions = {
        method: 'get'
    };
    await fetch('http://localhost:8000/chatroom/del/' + id, requestOptions)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err))

}

// @Desc:      New Room
// @Function:  fetch request 
// @route      http://localhost:8000/chatroom/new
async function postRoom() {

    const groupImg = document.getElementById('group-img')

    let media_data = groupImg.files;


    if (media_data[0]) {

        const reader = new FileReader();

        reader.readAsDataURL(media_data[0]);

        reader.onloadend = async function () {

            let mediaArr = []
            let groupName = document.getElementById('room-name')
            let selectGroupCat = document.getElementById('select_group_cat')
            let groupDesc = document.getElementById('Description');

            mediaArr.push(reader.result);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": groupName.value,
                    "user": "63108dafa3def5783589b628",
                    "category": selectGroupCat.value,
                    "Description": groupDesc.value,
                    "image": mediaArr,
                    "icon_image": mediaArr
                })
            };

            await fetch('http://localhost:8000/chatroom/new', requestOptions)
                .then(res => res.json())
                .then(res => {

                    console.log(res);
                    alert(res.message);
                    window.location.reload();

                })
                .catch(err => console.log(err))


        }
    }

}

// @Desc:      Get user data
// @Function:  fetch request 
// @route      http://localhost:8000/user/get/data
async function getUserData() {

    const requestOptions = {
        method: 'GET'
    };

    await fetch('http://localhost:8000/user/get/data', requestOptions)
        .then(res => res.json())
        .then(res => {

            getUserData_elements(res);
            console.log(res);

        })
        .catch(err => console.log(err))

}
getUserData()
window.onload = getUserRooms(), getUserRoomsSidebar(), getRoomsCat()



// Output message to DOM
function outputRommList(message) {

    const li = document.createElement('li');
    li.classList.add('meta');
    li.innerText = message.username;
    li.innerHTML += `<span>${message.time}</span>`;
}


