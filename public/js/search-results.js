const searchInput = document.getElementById('search-input');
const countResults = document.getElementById('count_results');
const indexResult = document.getElementById('index_result');


// @Desc:     Group card List 
// @Function:  fetch request 
// @location: js/utils/functions.js
// @route      GET http://localhost:8000/chatroom/get
// @line:      68
async function filterRooms() {

    // searchInput.value = searchIndex

    const requestOptions = {
        method: 'get'
    };
    var roomData = await fetch('http://localhost:8000/chatroom/get', requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))

    console.log(roomData);

    // @Desc:     Group card List 
    // @location: js/utils/functions.js
    // @line:      68
    filterResults(roomData, searchIndex, searchCatIndex);
}


function filterResults(roomList, filterIndex, catIndex) {

    if (!filterIndex && !catIndex) {

        const rooms = roomList.map(res => {
            resultsCardLayout(res)
        })
        

        countResults.innerHTML = rooms.length;
        indexResult.innerHTML = searchIndex;

    }
    else if (catIndex === "all") {

        const rooms = roomList.filter(res => res.name.includes(filterIndex)).map(res => {
            resultsCardLayout(res)
        })
        
        countResults.innerHTML = rooms.length;
        indexResult.innerHTML = searchIndex;
    }
    else if (filterIndex && !catIndex) {

        const rooms = roomList.filter(res => res.name.includes(filterIndex)).map(res => {
            resultsCardLayout(res)
        })
        
        countResults.innerHTML = rooms.length;
        indexResult.innerHTML = searchIndex;
    }
    else if (catIndex !== "all") {
        const rooms = roomList.filter(res => res.category === searchCatIndex && res.name.includes(filterIndex)).map(res => {
            resultsCardLayout(res)
        })
        
        console.log(catIndex);
        countResults.innerHTML = rooms.length;
        indexResult.innerHTML = searchIndex;
    }
    else {

        const rooms = roomList.map(res => {
            resultsCardLayout(res)
        })
        

        countResults.innerHTML = rooms.length;
        indexResult.innerHTML = searchIndex;

    }
}


function serachResultsLayout() {

    filterRooms();

}
window.onload = serachResultsLayout()