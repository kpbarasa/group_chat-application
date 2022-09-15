const input_dropdown = document.getElementById('input_dropdown');

// Get username and room from URL
const { chatContent, searchIndex, searchCatIndex } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

user_profile_area
const userProfileArea = document.getElementById('user_profile_area');
const groupContent = document.getElementById('browse_groups_area');
const inputGroupForm = document.getElementById('browse_new_input_group_form');
const searchResults = document.getElementById('search-results');
const groupChat = document.getElementById('chat_message_area');
const groupChatInfo = document.getElementById('group-chat-info');
const roomsListForm = document.getElementById('rooms-list-form');


// @lcation: chatContent.html 
// @line:
function setLayoutLoad(id, roomName, subIndex) {
  console.log(subIndex);
  let layoutIndex = document.getElementById('chatContent');
  let layoutChatRoom = document.getElementById('chat_room');
  let searchIndexInput = document.getElementById('search_index');
  let searchCatIndex = document.getElementById('search_cat_index');
  let searchHeader = document.getElementById('search-header');
  let searchHeaderBrowse = document.getElementById('search-header-browse');
  let searchInput = document.getElementById('search-input');
  alert(searchInput.value)

  layoutIndex.value = id;
  layoutChatRoom.value = roomName

  if (searchHeaderBrowse.value) { searchIndexInput.value = searchHeaderBrowse.value; searchCatIndex.value = ""; }
  else if (searchInput.value) { searchIndexInput.value = searchInput.value; searchCatIndex.value = ""; }
  else if (subIndex) { searchIndexInput.value = searchIndex; searchCatIndex.value = subIndex }

  return roomsListForm.submit()

}

// @lcation: chatContent.html 
// @line:
function setLayout(id) {
  console.log(id);

  if (id === "default") {
    groupContent.classList.remove('hide');
    inputGroupForm.classList.add('hide');
    groupChat.classList.add('hide');
    groupChatInfo.classList.add('hide');
  }
  else if (id === "profile") {
    userProfileArea.classList.remove('hide');
    groupChat.classList.add('hide');
    groupChatInfo.classList.add('hide');
    groupContent.classList.add('hide');
    inputGroupForm.classList.add('hide');
  }
  else if (id === "search-results") {
    searchResults.classList.remove('hide');
    inputGroupForm.classList.add('hide');
    groupContent.classList.add('hide');
    groupChat.classList.add('hide');
    groupChatInfo.classList.add('hide');
  }
  else if (id === "new-group") {
    inputGroupForm.classList.remove('hide');
    groupContent.classList.add('hide');
    groupChat.classList.add('hide');
    groupChatInfo.classList.add('hide');
  }
  else if (id === "group-chat") {
    groupChat.classList.remove('hide');
    groupChatInfo.classList.remove('hide');
    groupContent.classList.add('hide');
    inputGroupForm.classList.add('hide');
  }
  else {
    groupContent.classList.remove('hide');
    inputGroupForm.classList.add('hide');
    groupChat.classList.add('hide');
    groupChatInfo.classList.add('hide');
  }

}

// ==============================================================================================================================
// Chatroom.html Layout =========================================================================================================
// ==============================================================================================================================
// @BROWSE GROUPS AREA 
// @lcation: chat.html 
// @line:
function show_browseGroupArea() {
  return document.getElementById('browse_groups_area').innerHTML = `
    <div id="group-content" class="schat-messages chat-main-sub">

      <!-- MAIN SIDE NAV HERE  -->
      <div class="chat-content">

        <h4 class="content-title">Discover</h4>

        <nav class="side-nav">

          <ul id="room-cat-list" class="room-cat-list">
            <li class=" active">
              <a onclick="getUserRooms('')">
                <i class="fas fa-user"></i>
                <span class="">Browse</span>
              </a>
            </li>
            <li class="">
              <a onclick="getUserRooms('user')">
                <i class="fas fa-user"></i>
                <span class="">My groups</span>
              </a>
            </li>
          </ul>

        </nav>

      </div>

      <!-- CONTENT NAV HERE  -->
      <div class="chat-content">

        <div class="chat-banner">

            <div class="form-group-item">
              <span>
                <button onclick="setLayoutLoad('search-results', 'search-results')">
                  <i class="fas fa-search"></i>
                </button>
              </span>
              <input name="search-header-browse" id="search-header-browse"  type="text" placeholder="Search group" required autocomplete="on" />
            </div>

        </div>

        <div id="group-cards" class="group-cards card-cotainer">
        </div>

      </div>

    </div>
    `
}
// NEW GROUP FORM 
// @lcation: chat.html 
// @line:
function show_inputGroupForm() {
  return document.getElementById('browse_new_input_group_form').innerHTML = `
    <div id="input_group_form" class="schat-messages">
      <!-- <form  action=""> -->

      <div class="" id="input_form">

        <div class="form-grid">
          <div class="title h3">
            Create new chat group
          </div>
        </div>

        <div class="form-grid">

          <div class="form-row">
            <div class="form-group">
              
              <div onclick="document.getElementById('group-img').click();" id="group-input-img" class="group-input-img img-holder">
                   <div class="button-container">
                     <button> <i class="fas fa-plus" ></i> </button>
                     <label>Upload image</label>
                   </div>
              </div>

              <input type="file" onchange="upldediImg('room')" name="group-img" id="group-img" class="hide" />

            </div>

          </div>

          <div class="from-row">

            <div class="form-group">
              <input type="text" id="room-name" placeholder="Group Title" />
            </div>

            <div id="selcect-cat-input" class="form-group selcect-cat-input">
            </div>

            <div class="form-group">
              <textarea name="Description" id="Description" cols="30" rows="5" placeholder="Description" onchange="testFunc()" ></textarea>
            </div>

            <div class="form-group">
              <button onclick="postRoom()" class="btn btn-light btn-rounded btn-md "> <i class="fas fa-plus"></i> Add
                group</button>
            </div>

          </div>

        </div>
      </div>
      <!-- </form> -->
    </div>
    `

}
// NEW GROUP FORM CATEGORY 
// @lcation: chat.html 
// @line:
function show_inputGroupFormCat() {
  return document.getElementById('browse_new_input_group_form_cat').innerHTML = `
    <div id="input_group_form" class=" schat-messages">
      <!-- <form  action=""> -->

      <div class="" id="input_form">

        <div class="form-grid">
          <div class="title h3">
            Create new chat group
          </div>
        </div>

        <div class="form-grid">

          <div class="form-row">
            <div class="form-group">
              
              <div class="img-holder">
                <img src="" alt="">
              </div>

              <input type="file" name="" id="group-img">

            </div>

          </div>

          <div class="from-row">

            <div class="form-group">
              <input type="text" id="room-name" placeholder="Group Title" />
            </div>

            <div id="selcect-cat-input" class="form-group selcect-cat-input">
            </div>

            <div class="form-group">
              <textarea name="" id="Description" cols="30" rows="5" placeholder="Description"></textarea>
            </div>

            <div class="form-group">
              <button onclick="postRoom()" class="btn btn-light btn-rounded btn-md "> <i class="fas fa-plus"></i> Add
                group</button>
            </div>

          </div>

        </div>
      </div>
      <!-- </form> -->
    </div>
    `

}
// CHAT ROOM AREA HERE 
// @lcation: chat.html 
// @line:
function show_chatArea() {

  return document.getElementById('chat_message_area').innerHTML = `
    <div>
        <!-- CHAT ROOM HEADER  -->
        <div id="group-chat" class="chat-messages ">
          <div class="chat-messages-header-container">
            <!-- CHAT MESSESAGE CONTENT  -->
            <div class="chat-messages-header">

              <!-- CHAT MESSESAGE  ICON  -->
              <div class="icon"> <i class="fas fa-plus"></i> </div>

              <!-- CHAT MESSESAGE HEADER TITLE -->
              <div class="title"> Wellcome to <span id="chat-room-title"></span> </div>

              <!-- CHAT MESSESAGE HEADER DESCRIPTION -->
              <p id="chat-room-desc" class="desc"></p>
            </div>

            <!-- CHAT MESSESAGE HEADER DATE -->
            <div class="divider"> <span id="chat-room-date">March 11, 2022</span> </div>
          </div>
        </div>

        <!-- CHAT MESSESAGE INPUT FORM  -->
        <div id="message-form" class="chat-form-container">

          <form id="chat-form" method="post" enctype="multipart/form-data">

            <input id="msg" type="text" placeholder="Message" required autocomplete="off" />

            <input type="file" class="custom-file-input" onchange="getUpldedGalleryiImg()" name="msg_img" id="msg_img"
              accept="image/*,video/*,.pdf,.csv" multiple>

            <div class="buttons-container">

              <a class="btn btn-alt btn-round ml-1 slide-up">
                <i class="fas fa-file"></i>
              </a>
              
              <a class="btn btn-alt btn-round ml-1 slide-up" onclick="document.getElementById('msg_img').click();">
                <i class="fas fa-image"></i>
              </a>
              <button type="submit" class="btn btn-alt btn-round ml-1"><i class="fas fa-paper-plane"></i> </button>
            </div>


          </form>

        </div>

      </div>
    `

}
// PROFILE AREA HERE 
// @lcation: chat.html 
// @line:
function show_profileArea() {

  return document.getElementById('user_profile_area').innerHTML = `
	<div class="join-container-dash">
		<main class="join-main-dash">

			<div class="grid-2-c">
				<div class="">
					<div class="form-control">
						<div class="form-row">
							<!-- <label for="username">User</label> -->
							<div id="img-avatar-holder" onclick="document.getElementById('updt-user-img').click()"
								class="img-avatar-holder">
								<div class="button-container">
									<!-- <button> <i class="fas fa-plus" ></i> </button> -->
									<label> <b><i class="fas fa-plus"></i></b> Upload image</label>
								</div>
							</div>
							<input type="file" onchange="upldediImg('profile')" name="user-img" id="updt-user-img"
								placeholder="Enter username..." class="hide" />
						</div>
						<div class="form-row">
							<button class="btn btn-md btn-alt btn-rounded">
								delete Account
							</button>
							<button class="btn btn-dark btn-md btn-rounded">
								Suspend Account
							</button>
						</div>
					</div>
				</div>
				<div class="main-content-area">

					<div class="form-container">

						<h4>Info</h4>

						<div class="form-control">
							<label for="username">Username</label>
							<input type="text" name="username" id="updt-userName" placeholder="Enter username..."
								required />
						</div>
						<div class="form-control">
							<label for="username">first name</label>
							<input type="text" name="firstName" id="updt-firstName" placeholder="Enter username..."
								required />
						</div>
						<div class="form-control">
							<label for="username">last name</label>
							<input type="text" name="lastName" id="updt-lastName" placeholder="Enter username..."
								required />
						</div>

					</div>


					<div class="form-container">

						<h4>Contacts </h4>

						<div class="form-control">
							<label for="username">Email</label>
							<input type="email" name="userEmail" id="updt-userEmail" placeholder="Enter username..."
								required />
						</div>

					</div>

					<div class="form-container">

						<h4>Update password</h4>

						<div class="form-control">
							<label for="username">password</label>
							<input type="password" name="password" id="updt-password" placeholder="Enter password.."
								required />
						</div>
						<div class="form-control">
							<label for="username">Confirm password</label>
							<input type="password" name="password" id="set-updt-password" placeholder="Enter password.."
								required />
						</div>

					</div>

					<button type="submit" onclick="update()" class="btn btn-dark btn-rounded "> <i class="fas fa-"></i>
						Update</button>
				</div>

			</div>
		</main>
	</div>
    `

}

// ==============================================================================================================================
// Chatroom.html Layout functions ===============================================================================================
// ==============================================================================================================================
function layout_browseGroupArea() {


  var divMain = document.createElement("div");
  divMain.classList.add("schat-messages")
  divMain.classList.add("chat-main-sub")
  divMain.setAttribute("id", "group-content");

  var divSideNav = document.createElement("div");
  divSideNav.classList.add("chat-content")
  divSideNav.setAttribute("id", "group-content");
  divSideNav.innerHTML = "Select category";
  divMain.appendChild(divSideNav);

  var title = document.createElement("h4");
  title.classList.add("content-title")
  title.innerHTML = "Discover"
  divSideNav.appendChild(title);

  var ul = document.createElement("ul");
  ul.classList.add("room-cat-list")
  ul.setAttribute("id", "room-cat-list");
  divSideNav.appendChild(ul);

  var li = document.createElement("li");
  li.classList.add("room-cat-list")
  li.setAttribute("id", "room-cat-list");
  ul.appendChild(li);

  var link = document.createElement("a");
  link.classList.add("room-cat-list")
  link.setAttribute("onclick", "getUserRooms()");
  li.appendChild(link);

  var i = document.createElement("i");
  i.classList.add("fas")
  i.classList.add("fa-user")
  link.appendChild(i);

  var span = document.createElement("span");
  span.innerHTML = "My groups"
  link.appendChild(span);

  return document.querySelector('.browse_groups_area').appendChild(divMain);
}

function loadLayout() {

  show_profileArea();
  show_browseGroupArea();
  show_inputGroupForm();
  show_chatArea();

}
window.onload = setLayout(chatContent), loadLayout()


