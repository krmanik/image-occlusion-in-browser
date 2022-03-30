/* Do not remove
GPL 3.0 License

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
    //console.log(e.target.id);
    selectedElement = e.target.id;

    if (canDraw) {
        drawMultipleFigure();
    }

}, false);

function enableDrawRect() {
    canDraw = !canDraw;

    if (canDraw) {
        document.getElementById("enabledrawBtnIcon").style.color = "#fdd835";
        document.getElementById("drawBtn").style.pointerEvents = "none";
    } else {
        document.getElementById("enabledrawBtnIcon").style.color = "#009688";
        document.getElementById("drawBtn").style.pointerEvents = "unset";
    }
}

var note_num = 1;
var originalImageName;
var draw;
var temp_draw;
var rect;

function drawFigure() {
    if (drawFigureName == "Rectangle") {
        drawRect();
    } else if (drawFigureName == "Ellipse") {
        drawEllipse();
    } else if (drawFigureName == "Polygon") {
        drawPolygon();
    } else if (drawFigureName == "Textbox") {
        drawText();
    }
}

function drawRect() {
    try {

        document.getElementById("drawBtnIcon").style.color = "#fdd835";

        var rect = draw.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawBtnIcon").style.color = "#009688";
                polygonStack.push(rect);
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
        document.getElementById("drawBtnIcon").style.color = "#009688";
    }
}

function drawEllipse() {
    try {

        document.getElementById("drawBtnIcon").style.color = "#fdd835";

        var ellipse = draw.ellipse().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawBtnIcon").style.color = "#009688";
                polygonStack.push(ellipse);
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
        document.getElementById("drawBtnIcon").style.color = "#009688";
    }
}

var polygon;
function drawPolygon() {
    try {

        document.getElementById("drawBtnIcon").style.color = "#fdd835";

        document.getElementById("statusMsg").innerHTML = "Press Enter to stop drawing";

        polygon = draw.polygon().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawBtnIcon").style.color = "#009688";
                // view stopDrawPolygon()
                //polygonStack.push(polygon['node'].id);
            })
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            })
            .on('drawstart', function () {
                document.addEventListener('keydown', function (e) {
                    if (e.keyCode == 13) {
                        draw.polygon().draw('done');
                        draw.polygon().off('drawstart');
                        document.getElementById("drawBtnIcon").style.color = "#009688";
                        document.getElementById("statusMsg").innerHTML = "";
                    }
                });

            });

    } catch (e) {
        console.log(e);
        showSnackbar("Add image first");
        document.getElementById("drawBtnIcon").style.color = "#009688";
    }
}

function stopDrawPolygon() {
    try {
        document.getElementById("statusMsg").innerHTML = "";
        document.getElementById("drawBtnIcon").style.color = "#009688";
        draw.polygon().draw('stop', event);
        polygonStack.push(polygon);
    } catch (e) {
        console.log(e);
    }
}

var polygonStack = [];
function drawText() {
    try {

        document.getElementById("drawBtnIcon").style.color = "#fdd835";

        var group = draw.group();

        var rect = group.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawBtnIcon").style.color = "#009688";

                //popup get rect color, text, text color then put at the position

                var textToInsert = addTextPopup();

                var x = rect.x() + 0.5 * rect.width();
                var y = rect.y() + 0.5 * rect.height();

                var text = group.text(textToInsert)
                    .font({ size: textSize, family: 'Helvetica', fill: textColor })
                    .center(x, y);

                group.draggable(true);
                group.selectize(true);
                group.resize(false);

                var e = document.getElementById(group.id());
                e.setAttribute("data-type", "text-box-g");

                polygonStack.push(group);

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
        document.getElementById("drawBtnIcon").style.color = "#009688";
    }
}

function addTextPopup() {
    var text = prompt("Enter text", "");
    if (name != null) {
        return text;
    }
}

var undoStack = [];
function undoDraw() {

    if (polygonStack.length > 0) {
        var polygon = polygonStack.pop();

        if (polygon != undefined) {
            var gElem = SVG.adopt(document.getElementById(polygon));
            gElem.selectize(false);

            undoStack.push(polygon);

            gElem.remove();
        }
    }
}

function redoDraw() {
    if (undoStack.length > 0) {
        var gElem = undoStack.pop();
        draw.add(gElem);
        gElem.selectize(true);

        polygonStack.push(gElem);
    }
}

function drawMultipleFigure() {
    if (drawFigureName == "Rectangle") {
        drawMultipleRect();
    } else if (drawFigureName == "Ellipse") {
        drawMultipleEllipse();
    } else if (drawFigureName == "Textbox") {
        drawMultipleText();
    }
}


function drawMultipleRect() {
    try {

        var rect = draw.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                polygonStack.push(rect);
                this
                    .selectize()
                    .draggable()
                    .resize()
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
        document.getElementById("enabledrawBtnIcon").style.color = "#009688";
    }
}

function drawMultipleEllipse() {
    try {

        var ellipse = draw.ellipse().draw().fill(originalColor)
            .on('drawstop', function () {
                polygonStack.push(ellipse);
                this
                    .selectize()
                    .draggable()
                    .resize()
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
        document.getElementById("enabledrawBtnIcon").style.color = "#009688";
    }
}



function drawMultipleText() {
    try {

        document.getElementById("drawBtnIcon").style.color = "#fdd835";

        var group = draw.group();

        var rect = group.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawBtnIcon").style.color = "#009688";

                //popup get rect color, text, text color then put at the position

                var textToInsert = addTextPopup();

                var x = rect.x() + 0.5 * rect.width();
                var y = rect.y() + 0.5 * rect.height();

                var text = group.text(textToInsert)
                    .font({ size: 30, family: 'Helvetica' })
                    .center(x, y);

                group.draggable(true);
                group.selectize(true);
                group.resize(false);

                var e = document.getElementById(group.id());
                e.setAttribute("data-type", "text-box-g");

                polygonStack.push(group);

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
        document.getElementById("drawBtnIcon").style.color = "#009688";
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

/*
function deletePolygon() {
    try {
        for (i = 0; i < polygonStack.length; i++) {
            if (polygonStack[i] != undefined) {
                if (selectedElement == polygonStack[i]['node'].id) {
                    var gElem = SVG.adopt(document.getElementById(selectedElement));
                    gElem.selectize(false);
                    undoStack.push(gElem);
                    gElem.remove();
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
*/

function removePolygon() {
    try {

        var gElem;

        if (document.getElementById(selectedElement).tagName == "tspan" || document.getElementById(selectedElement).tagName == "circle") {
            var g = document.getElementById(selectedElement).parentElement;
            gElem = SVG.adopt(document.getElementById(g.id));
            selectedElement = g.id;
        }

        if (document.getElementById(selectedElement).parentElement == "g"
            && (document.getElementById(selectedElement).parentElement.getAttribute("data-type") != "combine"
                || document.getElementById(selectedElement).parentElement.getAttribute("data-type") != "text-box-g")) {
            gElem = SVG.adopt(document.getElementById(selectedElement));            
        }

        if ((document.getElementById(selectedElement).tagName == "rect" || document.getElementById(selectedElement).tagName == "polygon"
            || document.getElementById(selectedElement).tagName == "ellipse" || document.getElementById(selectedElement).tagName == "text")
            && document.getElementById(selectedElement).parentElement.tagName == "svg") {

            gElem = SVG.adopt(document.getElementById(selectedElement));

        } else if ((document.getElementById(selectedElement).tagName == "rect" || document.getElementById(selectedElement).tagName == "ellipse"
            || document.getElementById(selectedElement).tagName == "polygon" || document.getElementById(selectedElement).tagName == "text")
            && document.getElementById(selectedElement).parentElement.tagName == "g") {

            var g = document.getElementById(selectedElement).parentElement;
            gElem = SVG.adopt(document.getElementById(g.id));
            selectedElement = g.id;
        }

        undoStack.push(gElem);

        gElem.selectize(false);
        gElem.remove();

        for (l=0; l<polygonStack.length; l++) {
            if (selectedElement == polygonStack[l]['node'].id) {
                polygonStack.splice(l, 1);
            }
        }

    } catch (e) {
        console.log(e);
        showSnackbar("Select a figure");
    }
}

var imgHeight;
var imgWidth;
function addImage() {
    scaleVar = 1.0;

    polygonStack = [];
    undoStack = [];

    try {
        document.getElementById("drawing").innerHTML = "<img id='uploadPreview' style='-webkit-transform-origin-x: 0%; -webkit-transform-origin-y: 0%;'/>";

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

                saveSelectedImageToInternal();

                draw = SVG('drawing')
                    .height(imgHeight)
                    .width(imgWidth)
                    .id("SVG101")
                temp_draw = draw['node'].innerHTML;

                document.getElementById("SVG101").style.webkitTransformOriginX = "0%";
                document.getElementById("SVG101").style.webkitTransformOriginY = "0%";

                resetZoom();
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

    await pause(50);

    var svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("xmlns", xmlns);
    svg.setAttributeNS(null, "height", height);
    svg.setAttributeNS(null, "width", width);

    var g = document.createElementNS(svgNS, "g");
    g.innerHTML = rect;

    svg.append(g);

    var svgData = svg.outerHTML;

    var encodedData = btoa(svgData);

    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    
    // var svgUrl = URL.createObjectURL(svgBlob);
    // var downloadLink = document.createElement("a");
    // downloadLink.href = svgUrl;
    // downloadLink.download = name;
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    saveFile(name + ".svg", encodedData);

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
    document.getElementById("card-added").innerHTML = textare_id + "  card added" ;
}

var textToExport = "";
var textFileName = "";
function downloadAllNotes() {
    var container = document.getElementById("noteData");


    for (i = 0; i < container.childElementCount; i++) {
        textToExport += container.children[i].value;
    }

    //exportFile(textToExport, "output-all-notes.txt");

    textFileName = "output-all-notes.txt";

    pyodide.runPython("textFileName = js.textFileName")
    pyodide.runPython("textToExport = js.textToExport")

    pyodide.runPython(`with open(textFileName, 'w') as f: 
                            f.write(textToExport)`)

    showSnackbar("View Download folder");
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
    document.getElementById("done-export-all").style.display = "block";
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

function viewNote() {
    document.getElementById("viewNoteSideNav").style.height = "100%";
}

function closeViewNoteNav() {
    document.getElementById("viewNoteSideNav").style.height = "0";
}


function sideNavMain() {

    if (document.getElementById("page-title-id").innerHTML == "Settings" || document.getElementById("page-title-id").innerHTML == "Help"
        || document.getElementById("page-title-id").innerHTML == "View Notes" || document.getElementById("page-title-id").innerHTML == "Move Images") {
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
    
    var scrWidth = screen.width;
    if (imgWidth > scrWidth) {
        scaleVar = scrWidth/imgWidth;
    } else {
        scaleVar = imgWidth/scrWidth;
    }

    document.getElementById("SVG101").style.transform = "scale(" + scaleVar + ")";
    document.getElementById("uploadPreview").style.transform = "scale(" + scaleVar + ")";
}

function changePage(page) {

    hideAll();
    closeAddNoteNav();

    if (page == "settings") {
        document.getElementById("settingsSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Settings";
        document.getElementById("done-btn").style.display = "none";
        document.getElementById("done-export-all").style.display = "none";
    } else if (page == "help") {
        document.getElementById("viewHelpSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Help";
        document.getElementById("done-btn").style.display = "none";
        document.getElementById("done-export-all").style.display = "none";
    } else if (page == "move") {
        document.getElementById("moveImgSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "Move Images";
        document.getElementById("done-btn").style.display = "none";
        document.getElementById("done-export-all").style.display = "none";

        countNumberOfImage();
    } else if (page == "view") {
        document.getElementById("viewNoteSideNav").style.height = "100%";
        document.getElementById("page-title-id").innerHTML = "View Notes";
        document.getElementById("done-btn").style.display = "none";
        document.getElementById("done-export-all").style.display = "none";
    }

    changeIcon();
}

function hideAll() {
    document.getElementById("settingsSideNav").style.height = "0";
    document.getElementById("viewHelpSideNav").style.height = "0";
    document.getElementById("viewNoteSideNav").style.height = "0";
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

    localStorage.setItem("originalColor", originalColor);
    localStorage.setItem("questionColor", questionColor);

    textSize = document.getElementById("textSize").value;
    localStorage.setItem("textSize", textSize);

    textColor = document.getElementById("textColor").value;
    localStorage.setItem("textColor", textColor);

    deckName = document.getElementById("deckName").value;
    localStorage.setItem("deckName", deckName);
}

function resetSettings() {
    questionColor = "#EF9A9A";
    originalColor = "#FDD835";
    textColor = "#303942";
    textSize = 30;
    storageSvg = "AnkiDroid/collection.media/";
    deckName = "Anki Image Occlusion";

    document.getElementById("OColor").value = originalColor;
    localStorage.setItem("originalColor", originalColor);

    document.getElementById("QColor").value = questionColor;
    localStorage.setItem("questionColor", questionColor);

    document.getElementById("textSize").value = textSize;
    localStorage.setItem("textSize", textSize);

    document.getElementById("textColor").value = textColor;
    localStorage.setItem("textColor", textColor);

    document.getElementById("deckName").value = deckName;
    localStorage.setItem("deckName", deckName);
}

window.onbeforeunload = function () {
    return "Have you downloaded output-all-notes.txt?";
};

// assign to input
var questionColor = "#EF9A9A";
var originalColor = "#FDD835";
var textColor = "#303942";
var textSize = 30;
var storageSvg = "AnkiDroid/collection.media/";
var deckName = "Anki Image Occlusion";

window.onload = function () {
    get_local_file("common.html");

    document.getElementById("statusMsg").innerHTML = "Wait for loading...";

    document.addEventListener("backbutton", onBackKeyDown, false);

    // for stopping draw of polygon
    document.addEventListener("volumedownbutton", stopDrawPolygon, false);

    if (drawFigureName == "Rectangle") {
        document.getElementById("drawRectId").style.color = "#fdd835";
    }

    if (localStorage.getItem("questionColor") != null) {
        questionColor = localStorage.getItem("questionColor");
    }

    if (localStorage.getItem("originalColor") != null) {
        originalColor = localStorage.getItem("originalColor");
    }

    if (localStorage.getItem("storage") != null) {
        storageSvg = localStorage.getItem("storage");
    }

    if (localStorage.getItem("textColor") != null) {
        textColor = localStorage.getItem("textColor");
    }

    if (localStorage.getItem("textSize") != null) {
        textSize = localStorage.getItem("textSize");
    }

    if (localStorage.getItem("deckName") != null) {
        deckName = localStorage.getItem("deckName");
    }

    document.getElementById("QColor").value = questionColor;
    document.getElementById("OColor").value = originalColor;
    document.getElementById("textColor").value = textColor;
    document.getElementById("textSize").value = textSize;
    document.getElementById("deckName").value = deckName;

}

/* https://stackoverflow.com/questions/9334084/moveable-draggable-div */
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

var globalFileName;
var globalFileData;

// save to app directory
function saveFile(fileName, fileData) {
    globalFileName = fileName;
    globalFileData = fileData;

    pyodide.runPython("svgName = js.globalFileName")
    pyodide.runPython("svgData = js.globalFileData")

    pyodide.runPython("svgData = base64.b64decode(svgData)")
    pyodide.runPython(`with open('images/' + svgName, 'wb') as f: 
                            f.write(svgData)`)
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

var json_data;
function get_local_file(path) {
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

function moreTools() {
    if (document.getElementById("more-tools").style.display == "none") {
        document.getElementById("more-tools").style.display = "flex";
    } else {
        document.getElementById("more-tools").style.display = "none";
    }
}

var drawFigureName = "Rectangle";

function selectPolygon(e) {
    if (e.id == "rectBtn") {
        drawFigureName = "Rectangle";
    } else if (e.id == "ellipseBtn") {
        drawFigureName = "Ellipse";
    } else if (e.id == "polygonBtn") {
        drawFigureName = "Polygon";
    } else if (e.id == "textBtn") {
        drawFigureName = "Textbox";
        changeMode('normal');
        showSnackbar("Only normal cloze available.");
    }

    if (drawFigureName == "Rectangle") {

        document.getElementById("drawRectId").style.color = "#fdd835";
        document.getElementById("drawEllipseId").style.color = "#2196f3";
        document.getElementById("drawPolygonId").style.color = "#2196f3";
        document.getElementById("drawTextBoxId").style.color = "#2196f3";

    } else if (drawFigureName == "Ellipse") {

        document.getElementById("drawRectId").style.color = "#2196f3";
        document.getElementById("drawEllipseId").style.color = "#fdd835";
        document.getElementById("drawPolygonId").style.color = "#2196f3";
        document.getElementById("drawTextBoxId").style.color = "#2196f3";

    } else if (drawFigureName == "Polygon") {

        document.getElementById("drawRectId").style.color = "#2196f3";
        document.getElementById("drawEllipseId").style.color = "#2196f3";
        document.getElementById("drawPolygonId").style.color = "#fdd835";
        document.getElementById("drawTextBoxId").style.color = "#2196f3";

    } else if (drawFigureName == "Textbox") {

        document.getElementById("drawRectId").style.color = "#2196f3";
        document.getElementById("drawEllipseId").style.color = "#2196f3";
        document.getElementById("drawPolygonId").style.color = "#2196f3";
        document.getElementById("drawTextBoxId").style.color = "#fdd835";
    }
}

function alertAppUpdate() {
    var req = new XMLHttpRequest(); 
    
    req.responseType = 'json';
    req.open('GET', "https://raw.githubusercontent.com/krmanik/image-occlusion-in-browser/master/app-version.json", true);
    req.onload = function () {
        var jsonResponse = req.response;

        console.log(jsonResponse);

        if (jsonResponse['android'] > app_version) {
            showSnackbar("Update available. Version " + jsonResponse['android']);
        } else {
            showSnackbar("Update unavailable.");
        }
    };
    req.send(null);
}

function refresh() {

    pyodide.runPython(`
import os
import shutil
if os.path.exists('images'):
    shutil.rmtree('images')
    os.mkdir('images')
`)

    document.getElementById('noteData').innerHTML = "";
    document.getElementById('SVG101').innerHTML = temp_draw;
}


function exportAll() {
    document.getElementById('statusMsg').innerHTML = "Wait, deck generating...";
    setTimeout(function () { document.getElementById('statusMsg').innerHTML=""; }, 3000);

    downloadAllNotes();
    exportDeck();
    downloadDeck();
}

function closeConsole() {
    document.getElementById("pyodide-load-status").style.display = "none";
}