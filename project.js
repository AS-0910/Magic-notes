console.log("Welcome");
showNotes();

// Adding event listener to add note button

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let obj ={
    title : addTitle.value ,
    notes : addTxt.value ,
  }

  notesObj.push(obj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  

    //console.log(notesObj);

  showNotes();
});

function showNotes() {
    
    let notes = localStorage.getItem("notes");
    
    if (notes == null) {
        
        notesObj = [];
    } else {
        
        notesObj = JSON.parse(notes);
    }
    
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="my-2 mx-2 notecard" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}
              </h5>
                <p class="card-text">${element.notes}</p>
                <button id="${index}" onclick= "deleteNote(this.id)"class="btn btn-primary">Delete Notes</button>
            </div>
        </div>    `;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show ! Use "Add a Note " section above to add notes`;
  }
}

function deleteNote(index) {
  //   console.log("Deleting the note ", index);

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {
  let inputVal = search.value;

  // console.log("Input event fired", inputVal);

  let noteCards = document.getElementsByClassName("notecard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
