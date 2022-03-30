pythonCode = `
import random
import csv

import traceback
import js

from glob import glob
from os.path import join

new_title = js.deckName

anki_deck_title = "Anki Image Occlusion"

if new_title != None:
   anki_deck_title = new_title

anki_model_name = "image occlusion"

#model_id = random.randrange(1 << 30, 1 << 31)
model_id = 1615567072

def exportDeck(data_filename, deck_filename):
   try:
      import genanki  
      # front side
      front = """
{{#Image}}
<div id="io-header">{{Header}}</div>
<div id="io-wrapper">
<div id="io-overlay">{{Question Mask}}</div>
<div id="io-original">{{Image}}</div>
</div>
<div id="io-footer">{{Footer}}</div>

<script>
// Prevent original image from loading before mask
aFade = 50, qFade = 0;
var mask = document.querySelector('#io-overlay>img');
function loaded() {
var original = document.querySelector('#io-original');
original.style.visibility = "visible";
}
if (mask === null || mask.complete) {
loaded();
} else {
mask.addEventListener('load', loaded);
}
</script>
{{/Image}}

"""

      style = """
/* GENERAL CARD STYLE */
.card {
font-family: "Helvetica LT Std", Helvetica, Arial, Sans;
font-size: 150%;
text-align: center;
color: black;
background-color: white;
}

/* OCCLUSION CSS START - don't edit this */
#io-overlay {
position:absolute;
top:0;
width:100%;
z-index:3
}

#io-original {
position:relative;
top:0;
width:100%;
z-index:2;
visibility: hidden;
}

#io-wrapper {
position:relative;
width: 100%;
}
/* OCCLUSION CSS END */

/* OTHER STYLES */
#io-header{
font-size: 1.1em;
margin-bottom: 0.2em;
}

#io-footer{
max-width: 80%;
margin-left: auto;
margin-right: auto;
margin-top: 0.8em;
font-style: italic;
}

#io-extra-wrapper{
/* the wrapper is needed to center the
left-aligned blocks below it */
width: 80%;
margin-left: auto;
margin-right: auto;
margin-top: 0.5em;
}

#io-extra{
text-align:center;
display: inline-block;
}

.io-extra-entry{
margin-top: 0.8em;
font-size: 0.9em;
text-align:left;
}

.io-field-descr{
margin-bottom: 0.2em;
font-weight: bold;
font-size: 1em;
}

#io-revl-btn {
font-size: 0.5em;
}

/* ADJUSTMENTS FOR MOBILE DEVICES */

.mobile .card, .mobile #content {
font-size: 120%;
margin: 0;
}

.mobile #io-extra-wrapper {
width: 95%;
}

.mobile #io-revl-btn {
font-size: 0.8em;
}

"""

      # back side
      back = """
{{#Image}}
<div id="io-header">{{Header}}</div>
<div id="io-wrapper">
<div id="io-overlay">{{Answer Mask}}</div>
<div id="io-original">{{Image}}</div>
</div>
{{#Footer}}<div id="io-footer">{{Footer}}</div>{{/Footer}}
<button id="io-revl-btn" onclick="toggle();">Toggle Masks</button>
<div id="io-extra-wrapper">
<div id="io-extra">
{{#Remarks}}
<div class="io-extra-entry">
<div class="io-field-descr">Remarks</div>{{Remarks}}
</div>
{{/Remarks}}
{{#Sources}}
<div class="io-extra-entry">
<div class="io-field-descr">Sources</div>{{Sources}}
</div>
{{/Sources}}
{{#Extra 1}}
<div class="io-extra-entry">
<div class="io-field-descr">Extra 1</div>{{Extra 1}}
</div>
{{/Extra 1}}
{{#Extra 2}}
<div class="io-extra-entry">
<div class="io-field-descr">Extra 2</div>{{Extra 2}}
</div>
{{/Extra 2}}
</div>
</div>

<script>
// Toggle answer mask on clicking the image
var toggle = function() {
var amask = document.getElementById('io-overlay');
if (amask.style.display === 'block' || amask.style.display === '')
amask.style.display = 'none';
else
amask.style.display = 'block'
}

// Prevent original image from loading before mask
aFade = 50, qFade = 0;
var mask = document.querySelector('#io-overlay>img');
function loaded() {
var original = document.querySelector('#io-original');
original.style.visibility = "visible";
}
if (mask === null || mask.complete) {
loaded();
} else {
mask.addEventListener('load', loaded);
}
</script>
{{/Image}}
"""
      # print(self.fields)
      anki_model = genanki.Model(
          model_id,
          anki_model_name,
          fields=[{"name": "id"},{"name": "Header"}, {"name": "Image"}, {"name": "Question Mask"}, {"name": "Footer"}, {"name": "Remarks"}, {"name": "Sources"}, {"name": "Extra 1"}, {"name": "Extra 2"}, {"name": "Answer Mask"}, {"name": "Original"}],
          templates=[
              {
                  "name": "Card 1",
                  "qfmt": front,
                  "afmt": back,
              },
          ],
          css=style,
      )

      anki_notes = []

      with open(data_filename, "r", encoding="utf-8") as csv_file:
          csv_reader = csv.reader(csv_file, delimiter="\\t")
          for row in csv_reader:
              flds = []
              for i in range(len(row)):
                  flds.append(row[i])

              anki_note = genanki.Note(
                  model=anki_model,
                  fields=flds,
              )
              anki_notes.append(anki_note)

      anki_deck = genanki.Deck(model_id, anki_deck_title)
      anki_package = genanki.Package(anki_deck)

      # add media
      files = []
      for ext in ('*.gif', '*.png', '*.jpg', '*.jpeg', '*.bmp', '*.svg'):
         files.extend(glob(join("images", ext)))
      
      anki_package.media_files = files

      for anki_note in anki_notes:
          anki_deck.add_note(anki_note)

      anki_package.write_to_file(deck_filename)

      deck_export_msg = "Deck generated with {} flashcards".format(len(anki_deck.notes))
      js.showSnackbar(deck_export_msg)

   except Exception:
       traceback.print_exc()

    
import micropip

# localhost
# micropip.install("http://localhost:8000/py-whl/frozendict-1.2-py3-none-any.whl")
# micropip.install("http://localhost:8000/py-whl/pystache-0.5.4-py3-none-any.whl")
# micropip.install("http://localhost:8000/py-whl/PyYAML-5.3.1-cp38-cp38-win_amd64.whl")
# micropip.install('http://localhost:8000/py-whl/cached_property-1.5.2-py2.py3-none-any.whl')
# micropip.install("http://localhost:8000/py-whl/genanki-0.8.0-py3-none-any.whl")

# from GitHub using CDN
micropip.install("https://cdn.jsdelivr.net/gh/krmanik/Anki-Export-Deck-tkinter/docs/py-whl/frozendict-1.2-py3-none-any.whl")
micropip.install("https://cdn.jsdelivr.net/gh/krmanik/Anki-Export-Deck-tkinter/docs/py-whl/pystache-0.5.4-py3-none-any.whl")
micropip.install("https://cdn.jsdelivr.net/gh/krmanik/Anki-Export-Deck-tkinter/docs/py-whl/PyYAML-5.3.1-cp38-cp38-win_amd64.whl")
micropip.install("https://cdn.jsdelivr.net/gh/krmanik/Anki-Export-Deck-tkinter/docs/py-whl/cached_property-1.5.2-py2.py3-none-any.whl")
micropip.install("https://cdn.jsdelivr.net/gh/krmanik/Anki-Export-Deck-tkinter/docs/py-whl/genanki-0.8.0-py3-none-any.whl")

`

languagePluginLoader.then(() => {
    return pyodide.loadPackage(['micropip'])
}).then(() => {
    pyodide.runPython(pythonCode);

    document.getElementById("loading").style.display = "none";
    document.getElementById("statusMsg").innerHTML = "";

    showSnackbar("Ready to import file");
})

languagePluginLoader.then(function () {
    console.log('Ready');
});

function exportDeck() {
    pyodide.runPython(`exportDeck('output-all-notes.txt', 'output.apkg')`);
}

function downloadDeck() {
    let txt = pyodide.runPython(`                  
    with open('/output.apkg', 'rb') as fh:
        out = fh.read()
    out
    `);

    const blob = new Blob([txt], { type: 'application/zip' });
    let url = window.URL.createObjectURL(blob);

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "Export-Deck.apkg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function saveSelectedImageToInternal() {
    pyodide.runPython("import os")
    pyodide.runPython("import js")
    pyodide.runPython("import base64")

    pyodide.runPython("if not os.path.exists('images'): os.mkdir('images')")

    pyodide.runPython("blob = js.document.getElementById('uploadPreview').getAttribute('src')")
    pyodide.runPython("name = js.document.getElementById('uploadPreview').getAttribute('title')")

    // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEECAAAAAAjIz....
    pyodide.runPython("blob = blob.split(',')[1]")
    pyodide.runPython("imgData = base64.b64decode(blob)")
    pyodide.runPython(`with open('images/' + name, 'wb') as f: 
                            f.write(imgData)`)
}