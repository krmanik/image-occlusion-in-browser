
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

/*SVG.on(document, 'DOMContentLoaded', function () {
    draw = SVG('drawing')
            .height(600)
            .width(600)

    rect = draw.rect(100, 100).move(100, 50).fill('#f06')

    rect
        .on('click', function () {
            this
                .draggable()
                .selectize()
                .resize()
        })
})*/

var clozeMode = "normal";
var selectedElement = "";
var svgGroup = "";
var addedList = [];

var canDraw = false;

document.addEventListener('click', function (e) {
    selectedElement = e.target.id;

    if (canDraw) {
        drawRectWhenEnabled();
    }

    if (clozeMode == "group") {
        questionColor = combineColor;
        document.getElementById("addState").onclick = function () {
            if (document.getElementById("addState").value == "false") {
                document.getElementById("addState").value = true;
                document.getElementById("iconGroup").style.color = "#FF6F00";

                createOrigSvg();

            } else {
                document.getElementById("addState").value = false;
                document.getElementById("iconGroup").style.color = "#607d8b";

                if (svgGroup != "") {
                    createQuesSvg();
                    //createGroup(addedList)
                } else {
                    showSnackbar("Add rectangles to a group first");
                }
            }
        }

        if (document.getElementById("addState").value == "true") {

            document.getElementById("group-done-btn").style.display = "none";

            try {
                if (document.getElementById(selectedElement).tagName == "rect") {
                    svgGroup = "added";

                    var c = hexToRgb(originalColor);
                    var color = "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
                    if (document.getElementById(selectedElement).style.fill == "" || document.getElementById(selectedElement).style.fill == color) {
                        document.getElementById(selectedElement).style.fill = questionColor;
                        addedList.push(selectedElement);
                    } else {

                        // if again tap then remove from list
                        for (i = 0; i < addedList.length; i++) {
                            if (selectedElement == addedList[i]) {
                                document.getElementById(selectedElement).style.fill = originalColor;
                                addedList.splice(i, 1);
                                break;
                            }
                        }
                        if (addedList.length == 0) {
                            svgGroup = "";
                        }
                    }
                }

            } catch (e) {
                console.log(e);
            }
        } else {
            if (document.getElementById("add-note").style.height == "100%" || document.getElementById("settingsSideNav").style.height == "100%"
                || document.getElementById("viewHelpSideNav").style.height == "100%" || document.getElementById("viewNoteSideNav").style.width == "100%") {
                document.getElementById("done-btn").style.display = "none";
                document.getElementById("group-done-btn").style.display = "none";
            } else {
                document.getElementById("group-done-btn").style.display = "block";
            }
        }
    } // group cloze

}, false);


function enableDrawRect() {
    canDraw = !canDraw;

    if (canDraw) {
        document.getElementById("enableDrawRectId").style.color = "#fdd835";
        document.getElementById("drawBtn").style.pointerEvents = "none";
    } else {
        document.getElementById("enableDrawRectId").style.color = "#009688";
        document.getElementById("drawBtn").style.pointerEvents = "unset";
    }
}

var note_num = 1;
var originalImageName;
var draw;
var rect;
function drawRect() {
    try {
        
        document.getElementById("drawRectId").style.color = "#fdd835";

        draw.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawRectId").style.color = "#009688";
            })
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            });

    } catch (e) {
        console.log(e);
        showSnackbar("Add image first");
        document.getElementById("drawRectId").style.color = "#009688";
    }
}

function drawRectWhenEnabled() {
    try {

        draw.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                if (this != null) {
                this
                    .draggable()
                    .selectize()
                    .resize()
                }
            })            
            .on('drawstart', function () {
                if (!canDraw) {
                    this.remove();
                }
            })
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            });

    } catch (e) {
        console.log(e);
        showSnackbar("Add image first");
        document.getElementById("drawRectId").style.color = "#009688";
    }
}


function addRect() {
    try {
        draw.rect(200, 50).move(100, 50).fill(originalColor)
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            })
    } catch (e) {
        console.log(e);
        showSnackbar("Add image first");
    }
}

function removeRect() {
    try {
        if (document.getElementById(selectedElement).tagName == "rect"
             && document.getElementById(selectedElement).parentElement.tagName == "svg") {

            var svgEle = SVG.adopt(document.getElementById(selectedElement));
            svgEle.selectize(false);

            if (clozeMode == "group") {
                // remove from list also
                for (i = 0; i < addedList.length; i++) {
                    if (selectedElement == addedList[i]) {
                        addedList.splice(i, 1);
                        break;
                    }
                }
            }

            svgEle.remove();

        } else if ( document.getElementById(selectedElement).tagName == "rect"
            && document.getElementById(selectedElement).parentElement.tagName == "g") {
            var g = document.getElementById(selectedElement).parentElement;
            var gElem = SVG.adopt(document.getElementById(g.id));
            gElem.selectize(false);
            gElem.remove();        
        }
    } catch (e) {
        console.log(e);
        showSnackbar("Select a rectangle");
    }
}


var imgHeight;
var imgWidth;
function addImage() {
    scaleVar = 1.0;

    try {
        document.getElementById("drawing").innerHTML = "<img id='uploadPreview'/>";

        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("uploadPreview");
        imgtag.title = selectedFile.name;
        imgtag.type = selectedFile.type;

        originalImageName = imgtag.title;
        //console.log("Img Name "+ originalImageName );

        reader.onload = function (event) {
            imgtag.src = event.target.result;

            imgtag.onload = function () {
                // access image size here 
                //console.log(this.width);
                //console.log(this.height);

                imgHeight = this.height;
                imgWidth = this.width;

                //saveSelectedImageToAnkiDroid();

                draw = SVG('drawing')
                    .height(imgHeight)
                    .width(imgWidth)
                    .id("SVG101")
            };
        };

        reader.readAsDataURL(selectedFile);
    } catch (e) {
        console.log(e);
        showSnackbar("Image import error");
    }

};


/* https://stackoverflow.com/questions/53560991/automatic-file-downloads-limited-to-10-files-on-chrome-browser */
function pause(msec) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(resolve, msec || 1000);
        }
    );
}

var svgNS = "http://www.w3.org/2000/svg";
var xmlns = "http://www.w3.org/2000/svg";

async function saveSVG(name, rect, height, width) {

    await pause(200);

    var svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("xmlns", xmlns);
    svg.setAttributeNS(null, "height", height);
    svg.setAttributeNS(null, "width", width);

    var g = document.createElementNS(svgNS, "g");
    g.innerHTML = rect;

    svg.append(g);

    var svgData = svg.outerHTML;

    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    //saveFile(name + ".svg", svgBlob);

}

/* https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


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
        closeAddNoteNav();
    } else {
        document.getElementById("add-note").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Add Note";
        document.getElementById("done-btn").style.display = "none";

        document.getElementById("close-add-note-btn").style.display = "block";

    }
}

function closeAddNoteNav() {
    document.getElementById("add-note").style.height = "0";
    document.getElementById("close-add-note-btn").style.display = "none";
    resetTitle();
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function resetTitle() {
    document.getElementById('menu-icon').innerHTML = "menu";
    if (clozeMode == "normal") {
        document.getElementById("page-title-id").innerHTML = "Normal Cloze";
        document.getElementById("done-btn").style.display = "block";
    } else if (clozeMode == "group") {
        document.getElementById("page-title-id").innerHTML = "Group Cloze";
    } else if (clozeMode == "combine") {
        document.getElementById("combine-done-btn").style.display = "block";
        document.getElementById("page-title-id").innerHTML = "Combine Cloze";
    }
}

function closeViewNoteNav() {
    document.getElementById("viewNoteSideNav").style.width = "0";
}


function sideNavMain() {

    if (document.getElementById("page-title-id").innerHTML == "Settings" || document.getElementById("page-title-id").innerHTML == "Help" ||
        document.getElementById("page-title-id").innerHTML == "View Notes" || document.getElementById("page-title-id").innerHTML == "Move Images") {
        hideAll();
        resetTitle();
        settings();
        closeAddNoteNav();
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
    closeAddNoteNav();

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
    } else if (page == "view") {
        document.getElementById("viewNoteSideNav").style.width = "100%";
        document.getElementById("page-title-id").innerHTML = "View Notes";
        document.getElementById("done-btn").style.display = "none";
    }

    changeIcon();
}

function hideAll() {
    document.getElementById("settingsSideNav").style.height = "0";
    document.getElementById("viewHelpSideNav").style.height = "0";
    document.getElementById("viewNoteSideNav").style.width = "0";
    document.getElementById("mainSideNav").style.width = "0";
    document.getElementById("moveImgSideNav").style.height = "0";
    document.getElementById("add-note").style.height = "0";
}

function changeIcon() {
    if (document.getElementById("page-title-id").innerHTML == "Settings" || document.getElementById("page-title-id").innerHTML == "Help"
        || document.getElementById("page-title-id").innerHTML == "View Notes" || document.getElementById("page-title-id").innerHTML == "Move Images") {
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
        originalColor = "#FDD835";
        document.getElementById("settingsSideNav").style.height = "100%";
        showSnackbar("Not a valid color");
    }
}

window.onbeforeunload = function () {
    return "Have you downloaded output-all-notes.txt?";
};

// assign to input
var questionColor = "#EF9A9A";
var originalColor = "#FDD835";
/* https://stackoverflow.com/questions/9334084/moveable-draggable-div */
window.onload = function () {
    get_html_file("common.html");

    document.getElementById("QColor").value = questionColor;
    document.getElementById("OColor").value = originalColor;

    document.addEventListener("backbutton", onBackKeyDown, false);
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
    //var dir = cordova.file.externalDataDirectory;
    var dir = cordova.file.externalRootDirectory + "AnkiDroid/collection.media/";
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

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
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
        if (xhr.status == 200) {
            html = xhr.response;
            document.getElementById("side-nav-container").innerHTML = html;
        } else {
            showSnackbar("Failed to load side navigation data.");
        }
    }
    xhr.send();
}

function saveSelectedImageToAnkiDroid() {

    var image = document.getElementById("uploadPreview");

    fname = image.title;
    var data = image.src;
    var type = image.type;

    var base64 = data.split(",")[1];

    var blob = base64toBlob(base64, type);

    saveFile(fname, blob);

    showSnackbar("Image copied to AnkiDroid folder");
}

function changeMode(mode) {
    hideAll();
    document.getElementById("close-add-note-btn").style.display = "none";

    if (mode == 'normal') {
        console.log('normal');
        clozeMode = "normal";
        document.getElementById('done-btn').style.display = "block";
        document.getElementById('group-done-btn').style.display = "none";
        document.getElementById("merge-rect-btn").style.display = "none";
        document.getElementById('combine-done-btn').style.display = "none";

        document.getElementById('groupButton').style.display = "none";
        document.getElementById("page-title-id").innerHTML = "Normal Cloze";

        showSnackbar("Normal Cloze Mode");


    } else if (mode == 'group') {
        console.log('group');
        clozeMode = "group";

        document.getElementById('done-btn').style.display = "none";
        document.getElementById('group-done-btn').style.display = "block";
        document.getElementById("merge-rect-btn").style.display = "none";
        document.getElementById('combine-done-btn').style.display = "none";

        document.getElementById('groupButton').style.display = "block";
        document.getElementById("page-title-id").innerHTML = "Group Cloze";

        showSnackbar("Group Cloze Mode");

        origSVG = "";
        svgQues = "";
    } else if (mode == 'combine') {

        console.log('combine');
        clozeMode = "combine";

        document.getElementById('done-btn').style.display = "none";
        document.getElementById('group-done-btn').style.display = "none";
        document.getElementById('combine-done-btn').style.display = "block";
        

        document.getElementById('groupButton').style.display = "block";
        document.getElementById("page-title-id").innerHTML = "Combine Cloze";

        document.getElementById("merge-rect-btn").style.display = "block";

        showSnackbar("Combine Cloze Mode");
    }

}

function onBackKeyDown(e) {
    console.log("back press");
    var exit;
    var exit = confirm("Are you sure you want to exit ?");
    if (exit) {
        navigator.app.exitApp();
    }
}