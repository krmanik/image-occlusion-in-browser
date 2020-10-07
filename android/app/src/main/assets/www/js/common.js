
/* Do not remove
MIT License

Copyright (c) 2020 Mani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var noteHeader;
var noteFooter;
var noteRemarks;
var noteSources;
var noteExtra1;
var noteExtra2;

function getNoteFromForm() {
    noteHeader = document.getElementById("noteHeader").value;
    noteFooter = document.getElementById("noteFooter").value;
    noteRemarks = document.getElementById("noteRemarks").value;
    noteSources = document.getElementById("noteSources").value;
    noteExtra1 = document.getElementById("noteExtra1").value;
    noteExtra2 = document.getElementById("noteExtra2").value;
}


var textare_id = 0;
function addCsvLineToViewNote(csv) {
    var container = document.getElementById("noteData");
    var textarea = document.createElement("textarea");
    textarea.id = "note-text-area-" + textare_id;
    textarea.setAttribute("style", "display: block; width:90%; height:10vh; margin-top:6px;");
    textarea.value = csv;
    container.appendChild(textarea);
    document.getElementById(textarea.id).readOnly = true;
    textare_id += 1;
}

function downloadAllNotes() {
    var container = document.getElementById("noteData");

    var textToExport = "";
    for (i = 0; i < container.childElementCount; i++) {
        textToExport += container.children[i].value;
    }

    exportFile(textToExport, "output-all-notes.txt");
}

function addNote() {
    if (document.getElementById("add-note").style.height == "100%") {
        document.getElementById("add-note").style.height = "0";
    } else {
        document.getElementById("add-note").style.height = "100%";
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function viewNote() {
    document.getElementById("viewNoteSideNav").style.width = "100%";
}

function closeViewNoteNav() {
    document.getElementById("viewNoteSideNav").style.width = "0";
}


function sideNavMain() {

    if (document.getElementById("page-title-id").innerHTML == "Settings" || document.getElementById("page-title-id").innerHTML == "Help" || document.getElementById("page-title-id").innerHTML == "Move Images") {
        hideAll();
        resetTitle();
        settings();
    } else {
        document.getElementById("mainSideNav").style.width = "80%";
    }
}

function closeMainNav() {
    document.getElementById("mainSideNav").style.width = "0";
}



var scaleVar = 1.0;
function zoomOut() {
    scaleVar -= 0.1;
    document.getElementById("SVG101").style.transform = "scale(" + scaleVar + ")";
    document.getElementById("uploadPreview").style.transform = "scale(" + scaleVar + ")";
}

function zoomIn() {
    scaleVar += 0.1;
    document.getElementById("SVG101").style.transform = "scale(" + scaleVar + ")";
    document.getElementById("uploadPreview").style.transform = "scale(" + scaleVar + ")";
}


function resetZoom() {
    document.getElementById("SVG101").style.transform = "scale(1.0)";
    document.getElementById("uploadPreview").style.transform = "scale(1.0)";
    scaleVar = 1.0;
}

function changePage(page) {

    hideAll();

    if (page == "settings") {
        document.getElementById("settingsSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Settings";
        document.getElementById("done-btn").style.display = "none";
    } else if (page == "help") {
        document.getElementById("viewHelpSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Help";
        document.getElementById("done-btn").style.display = "none";
    } else if (page == "move") {
        document.getElementById("moveImgSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Move Images";
        document.getElementById("done-btn").style.display = "none";

        countNumberOfImage();
    }

    changeIcon();
}

function hideAll() {
    document.getElementById("settingsSideNav").style.height = "0";
    document.getElementById("viewHelpSideNav").style.height = "0";
    document.getElementById("viewNoteSideNav").style.height = "0";
    document.getElementById("mainSideNav").style.width = "0";
    document.getElementById("moveImgSideNav").style.height = "0";
}

function changeIcon() {
    if (document.getElementById("page-title-id").innerHTML == "Settings" || document.getElementById("page-title-id").innerHTML == "Help" || document.getElementById("page-title-id").innerHTML == "Move Images") {
        document.getElementById('menu-icon').innerHTML = "arrow_back";
    }
}

function exportFile(csv, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));

    //var filename = "output.txt";
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// change if value changed by user
function settings() {
    questionColor = document.getElementById("QColor").value;
    originalColor = document.getElementById("OColor").value;

    // check if valid hex value, set to default if not valid
    if (!/^#[0-9A-F]{6}$/i.test(questionColor)) {
        questionColor = "#F44336";
        document.getElementById("settingsSideNav").style.height = "100%";
        showSnackbar("Not a valid color");
    }

    if (!/^#[0-9A-F]{6}$/i.test(originalColor)) {
        originalColor = "#fdd835";
        document.getElementById("settingsSideNav").style.height = "100%";
        showSnackbar("Not a valid color");
    }
}

window.onbeforeunload = function () {
    return "Have you downloaded output-all-notes.txt?";
};

// assign to input
var questionColor = "#F44336";
var originalColor = "#fdd835";
/* https://stackoverflow.com/questions/9334084/moveable-draggable-div */
window.onload = function () {
    document.getElementById("QColor").value = questionColor;
    document.getElementById("OColor").value = originalColor;
}

function draggable(el) {
    el.addEventListener('mousedown', function (e) {
        var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
        var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

        function mouseMoveHandler(e) {
            el.style.top = (e.clientY - offsetY) + 'px';
            el.style.left = (e.clientX - offsetX) + 'px';
        }

        function reset() {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', reset);
        }

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', reset);
    });
}

/* https://www.kirupa.com/html5/drag.htm */
function touchDraggable(el) {
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    el.addEventListener("touchstart", dragStart, false);
    el.addEventListener("touchend", dragEnd, false);
    el.addEventListener("touchmove", drag, false);

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
    }

    function drag(e) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, el);
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}

// save to app directory
function saveFile(fileName, fileData) {
    var dir = cordova.file.externalDataDirectory;
    //var dir = cordova.file.externalRootDirectory + "AnkiDroid/collection.media/";
    window.resolveLocalFileSystemURL(dir, function (directoryEntry) {
        //console.log(directoryEntry);
        directoryEntry.getFile(fileName, { create: true, exclusive: false }, function (entry) {
            entry.createWriter(function (writer) {
                //console.log("Writing..." + fileName);
                writer.write(fileData);
            }, function (error) {
                console.log("Error " + error.code);
            });
        });
    });
}

function success(result) {
    alert("plugin result: " + result);
};

var card_added_num = 1;
function addCardToAnkiDroid(cardData) {
    //console.log(cardData);
    // noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile
    var note = {
        "noteId": cardData[0],
        "header": cardData[1],

        "origImgSvg": cardData[2],
        "quesImgSvg": cardData[3],

        "footer": cardData[4],
        "remarks": cardData[5],
        "sources": cardData[6],

        "extra1": cardData[7],
        "extra2": cardData[8],

        "ansImgSvg": cardData[9],
        "origImg": cardData[10]
    }

    var noteData = JSON.stringify(note);

    cordova.plugins.addCard(noteData, function (result) {
        console.log(result);
        if (result == "Card added") {
            document.getElementById("card-added").innerHTML = card_added_num + " card added";

            card_added_num++;

        } else if (result == "Permission required") {
            showSnackbar("Storage and additional permission required.");
        } else {
            showSnackbar("Card not added");
        }
    });
}

function showSnackbar(msg) {
    var x = document.getElementById("snackbar");

    x.innerHTML = msg;
    x.className = "show";

    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function moveImagesToAnkiDroid() {
    cordova.plugins.moveImagesToAnkiDroid(appPath, function (result) {
        console.log(result);
    });


    countNumberOfImage();

}

var appPath = "";
function countNumberOfImage() {
    appPath = cordova.file.externalDataDirectory;

    window.resolveLocalFileSystemURL(appPath, function (dirEntry) {
        var directoryReader = dirEntry.createReader();
        directoryReader.readEntries(onSuccessCallback, onFailCallback);
    });

}

function onSuccessCallback(entries) {
    //console.log("number of files:" + entries.length);
    document.getElementById("num_images_move").innerHTML = entries.length + " images to move";
}

function onFailCallback() {
    console.log("error file list count");
}

function get_html_file(path) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', path)
  
    xhr.onload = () => {
      if (xhr.status == 200)
        html = xhr.response;
        document.getElementById("side-nav-container").innerHTML = html; 
    }  
    xhr.send()
  }

  setTimeout(function () { 
    get_html_file("common.html");
   }, 1000);