// ============================================================================================================================
// LAYOUT FUNCTIONS ===========================================================================================================
// CARDS ======================================================================================================================
//  @lcation: main.js
//  @Line:    0
function getGroup(id) {
    document.getElementById('chat_room').value = id
    if (document.getElementById('chat_room').value !== "") {
        // document.getElementById('rooms-list-form').submit()
        let action = "chat.html"
        var form = document.getElementById('rooms-list-form');
        form.setAttribute('action', action);
        document.getElementById('chat_room').value
        form.submit();
    }

}
// CHAT ROOM HEADER INFO
//  @lcation: main.js
//  @Line:    0
function getChatRoom_header(room) {

    document.getElementById('chat-room-title').innerHTML = "#" + room.name;
    document.getElementById('chat-room-desc').innerHTML = room.Description;
    document.getElementById('chat-room-date').innerHTML = room.date
}

// CARDS =======================================================================================================================
// ROOM CARDS ELEMENT
//  @lcation: searchresults.js
//  @Line:    0
function groupCard(groupInfo, id) {

    document.querySelector('.group-cards').innerHTML = "";
    if (id === "user") {

        return groupInfo.filter(res => res.user === "63108dafa3def5783589b628").map(group => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = "/media/"+group.image;
            card.appendChild(img);

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            card.appendChild(cardContent);

            const cardIcon = document.createElement('span');
            cardIcon.classList.add('icon');
            cardContent.appendChild(cardIcon);

            const iconImg = document.createElement('img');
            iconImg.src = "/media/"+group.image;
            iconImg.alt = "results img"
            cardIcon.appendChild(iconImg);

            const cardTitle = document.createElement('div');
            cardTitle.classList.add('title');
            cardTitle.innerHTML = group.name;
            cardContent.appendChild(cardTitle);

            const p = document.createElement('p');
            p.classList.add('desc');
            p.innerHTML = group.Description;
            cardContent.appendChild(p);

            const footwer = document.createElement('div');
            footwer.classList.add('footer');
            footwer.innerHTML = "group Description";
            cardContent.appendChild(footwer);

            return document.querySelector('.group-cards').appendChild(card);
        })

    }
    else {
        if (id) {

            return groupInfo.filter(res => res.category === id).map(group => {
                const card = document.createElement('div');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = "/media/"+group.image;
                card.appendChild(img);

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');
                card.appendChild(cardContent);

                const cardIcon = document.createElement('span');
                cardIcon.classList.add('icon');
                cardContent.appendChild(cardIcon);

                const iconImg = document.createElement('img');
                iconImg.src = "/media/"+group.image;
                iconImg.alt = "results img"
                cardIcon.appendChild(iconImg);

                const cardTitle = document.createElement('div');
                cardTitle.classList.add('title');
                cardTitle.innerHTML = group.name;
                cardContent.appendChild(cardTitle);

                const p = document.createElement('p');
                p.classList.add('desc');
                p.innerHTML = group.Description;
                cardContent.appendChild(p);

                const footwer = document.createElement('div');
                footwer.classList.add('footer');
                footwer.innerHTML = "group Description";
                cardContent.appendChild(footwer);

                return document.querySelector('.group-cards').appendChild(card);
            })

        } else {
            return groupInfo.map(group => {
                const card = document.createElement('div');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = "/media/"+group.image;
                img.setAttribute("onclick", "setLayoutLoad('group-chat','" + group.name + "')")
                card.appendChild(img);

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');
                card.appendChild(cardContent);

                const cardIcon = document.createElement('span');
                cardIcon.setAttribute("onclick", "setLayoutLoad('group-chat','" + group.name + "')")
                cardIcon.classList.add('icon');
                cardContent.appendChild(cardIcon);

                const iconImg = document.createElement('img');
                iconImg.src = "/media/"+group.image;
                iconImg.alt = "results img"
                cardIcon.appendChild(iconImg);

                const cardTitle = document.createElement('div');
                cardTitle.classList.add('title');
                cardTitle.setAttribute("onclick", "setLayoutLoad('group-chat','" + group.name + "')")
                cardTitle.innerHTML = group.name;
                cardContent.appendChild(cardTitle);

                const p = document.createElement('p');
                p.classList.add('desc');
                p.innerHTML = group.Description;
                cardContent.appendChild(p);

                const footwer = document.createElement('div');
                footwer.classList.add('footer');
                footwer.innerHTML = "group.Description";
                cardContent.appendChild(footwer);

                return document.querySelector('.group-cards').appendChild(card);
            })

        }

    }

}

//  @Tittle:  RESULTS CARD
//  @lcation: searchresults.js
//  @Line:    0
function resultsCardLayout(res) {
    const card = document.createElement('div');
    card.classList.add('results-card');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('results-img');
    card.appendChild(imgDiv);

    const img = document.createElement('img');
    img.src = "/media/"+res.image;
    img.alt = "results img"
    imgDiv.appendChild(img);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('relts-card-info');
    card.appendChild(cardInfo);

    const cardIcon = document.createElement('span');
    cardIcon.classList.add('icon');
    cardInfo.appendChild(cardIcon);

    const iconImg = document.createElement('img');
    iconImg.src = "/media/"+res.image;
    iconImg.alt = "results img"
    cardIcon.appendChild(iconImg);

    // const icon = document.createElement('i');
    // cardIcon.classList.add('fas');
    // cardIcon.classList.add('fa-info');
    // cardInfo.appendChild(cardIcon);

    const cardTitle = document.createElement('span');
    cardTitle.classList.add('title');
    cardTitle.innerHTML = res.name
    cardInfo.appendChild(cardTitle);

    const cardDesc = document.createElement('span');
    cardDesc.classList.add('desc');
    cardDesc.innerHTML = res.Description
    cardInfo.appendChild(cardDesc);

    const cardMeta = document.createElement('span');
    cardMeta.classList.add('meta');
    cardMeta.innerHTML = "0 members"
    cardInfo.appendChild(cardMeta);

    return document.querySelector('.search-results-card').appendChild(card);
}

// ROOM CATEGORY MENU LIST ELEMENT 
//  @lcation: main.js
//  @Line:    0
function groupCategoryList_menu(roomCategories) {
    roomCategories.map(categories => {

        var list = document.createElement("li");
        list.setAttribute("name", "select-group-cat");
        list.setAttribute("id", "select-group-cat");

        var link = document.createElement("a");
        link.setAttribute("onclick", "getUserRooms('" + categories._id + "')");
        list.appendChild(link);

        var i = document.createElement("i");
        i.classList.add("fas")
        i.classList.add("fa-users")
        link.appendChild(i);

        var span = document.createElement("span");
        span.innerHTML = categories.name;
        link.appendChild(span);

        return document.querySelector('.room-cat-list').appendChild(list);

    })

}


// ROOM CATEGORY FORM SELECT INPUT
//  @lcation: main.js
//  @Line:    0
function groupCategoryList_select(roomCategories) {

    var select = document.createElement("select");
    select.setAttribute("name", "select-group-cat");
    select.setAttribute("id", "select_group_cat");

    var option = document.createElement("option");
    option.innerHTML = "Select category";
    select.appendChild(option);

    roomCategories.map(cat => {
        var options = document.createElement("option");
        options.setAttribute("value", cat._id);
        options.innerHTML = cat.name;
        select.appendChild(options);
    })
    return document.querySelector('.selcect-cat-input').appendChild(select);

}

// SEARCH RESULTS CATEGORY LIST
//  @lcation: main.js
//  @Line:    0
function searchResultsCat_list(roomCategories) {

    console.log(roomCategories);

    roomCategories.map(async (room) => {

        const requestOptions = {
            method: 'get'
        };

        const roomData = await fetch('http://localhost:8000/chatroom/get', requestOptions)
            .then(res => res.json())
            .catch(err => console.log(err))

        const dataCount = roomData.filter(res => res.name.includes(searchIndex) && res.category === room._id)
        console.log(dataCount);


        var li = document.createElement("li");
        li.classList.add("link");
        // li.classList.add("active");
        dataCount.length > 0 ? "" : li.setAttribute( "disabled","disabled");

        li.setAttribute("onclick", "setLayoutLoad('search-results','search-results', '" + room._id + "')");
        // li.innerHTML=room.name+" ("+03+")"

        var span = document.createElement("span");
        span.innerHTML = room.name;
        li.appendChild(span)

        var spanCount = document.createElement("span");
        dataCount.length > 0 ? spanCount.innerHTML = "(" + dataCount.length + ")" : spanCount.innerHTML = "(0)"

        li.appendChild(spanCount)

        return document.querySelector('.results-cat-list').appendChild(li);
    })

}

// ROOMS MENU LINK
//  @lcation: main.js :
//  @Line:    89
function groupList(roomList) {

    return roomList.slice(0,8).map(room => {
        const link = document.createElement('a');
        link.setAttribute("onclick", "setLayoutLoad('group-chat','" + room.name + "')");
        link.classList.add('sb-btn');
        link.innerHTML = room.name.slice(0, 1);

        const img = document.createElement('img');
        img.src = "/media/"+room.image;
        link.appendChild(img);

        const span = document.createElement('span');
        span.classList.add('desc');
        span.innerHTML = room.name;
        link.appendChild(span);

        // @class:    .my-room-list
        // @location: chatContent.html 
        // @Object:   div
        // @Line:     51
        return document.querySelector('.my-room-list').appendChild(link);

    })

}


// Fetch reqests =======================================================================================================================

async function countRoomsCat(catID) {
    console.log(catID);

    const requestOptions = {
        method: 'get'
    };

    const roomData = await fetch('http://localhost:8000/chatroom/get', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))

    const dataCount = roomData.filter(res => res.category === catID)
    console.log(dataCount.length);




}


// Get data from file input 
function upldediImg(id) {

    let arrFiles = [];
    let group_mg = "";

    const userImg = document.getElementById('updt-user-img')
    const groupImg = document.getElementById('group-img')

    if(id === "room") group_mg = groupImg.files;
    if(id === "profile") group_mg = userImg.files;

    // console.log(group_mg);

    if (group_mg.length !== 0) {
        clearImg()
        arrFiles.push(group_mg[0])

        console.log(arrFiles[0]);

        const reader = new FileReader();

        reader.readAsDataURL(arrFiles[0]);

        reader.onloadend = function () {

            const res = reader.result;

            // console.log(res);

            if(id === "room"){
                const img = document.createElement('img');
                img.src = res;
                img.alt = res
    
                return document.querySelector('.group-input-img').appendChild(img);
            }

            if(id === "profile"){
                const img = document.createElement('img');
                img.src = res;
                img.alt = res
    
                return document.querySelector('.img-avatar-holder').appendChild(img);
            }

        }


    }

}

function clearImg(){
    
    const img = document.createElement('img');
    img.src = "";
    img.alt = ""

    return document.querySelector('.img-avatar-holder').appendChild(img);
}

//Get user data 
function getUserData_elements(res){
    console.log(res);
            document.getElementById('profile-user-title').innerHTML = res[0].displayName
            // document.getElementById('profile-user-status').innerHTML = date()
            document.getElementById('updt-userName').value = res[0].displayName
            document.getElementById('updt-firstName').value = res[0].firstName
            document.getElementById('updt-lastName').value = res[0].lastName
            document.getElementById('updt-userEmail').value = res[0].email

            const img = document.createElement('img');
            img.src = "/media/"+res[0].image;
            img.alt = res[0].image

            document.querySelector('.img-avatar-holder').appendChild(img);
}

function register() {

    window.location = "register.html";
}
function loginGoogle() {

    window.location = "user/login/google";
    
}
function passwordRecovery() {

    window.location = "user/recover/password" ;

}