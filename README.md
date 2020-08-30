# image-occlusion-in-browser

Create image occlusion in browser. 

For desktop there is already addon for creating image occlusion. This is implementation for using mobile and creating deck with image occlusion.


# Demo
<img src="demo/demo_create.gif" height="380"></img> | <img src="demo/demo_draw_anywhere.gif" height="380"></img>

## Create image occlusion Anki decks in three steps

### Step 1 - Create svg question and answers mask 

1. Visit
[https://infinyte7.github.io/image-occlusion-in-browser/](https://infinyte7.github.io/image-occlusion-in-browser/)

2. Add rectangles to editor window by pressing "+" in tools.
(Drag or resize to specific location)

3. Add notes for the image

4. Download the notes. It will download svg question masks, answer masks, ```output-note.txt``` and also it will add individual note to view note window.

5. Then download combined notes from view note window. It will download ```output-all-notes.txt``` file. This file will be used to create deck.

### Step 2 - Copy all svg files to AnkiDroid folder
1. Copy question and answer svg files and original image to ```collection.media``` folder

### Step 3 - Generate decks using Pydroid 3
1. Download and install Pydroid 3 from play store.
2. Install ```genanki``` in Pydroid using Pip. View demo below.
3. Download ```image-occ-deck-export.py``` from release page.
4. Open ```image-occ-deck-export.py``` in Pydroid 3 and run
5. Select ```output-all-notes.txt``` and import 
6. Enter deck details and export.

View demo [Generate deck using Pydroid 3](demo/demo_pydroid_3.gif)

# Requirements for running it offline
1. Termux or any app that create localhost
2. Pydroid 3

Download from playstore.

# Steps for running offline

1. If using termux then install ```python```
```
pkg install python
```
2. Download files from release page
3. Extract to any folder
4. Use termux to traverse to that folder using 

```
cd storage/downloads/image-occlusion-in-browser
```
5. Run localhost

```
python -m http.server
```

6. Open chrome and enter url
```
localhost:8000
```
7. First, add image then add rectangle. After adding notes, click on download to get svg files with question mask and answer mask. 

8. Copy all the files (svg files and original image) to ```collection.media``` folder

9. Now open ```Pydroid 3``` and open ```image-occ-deck-export.py``` and import ```output.txt``` file and generate deck by entering name, model and title.

10. Import it in AnkiDroid and start reviewing.

# Demo
[View this](demo/demo_img_occ.gif)

# Limitations
- <s>I tried to create with more than six rectangle but it failed to generate svg files. I also tried async/await function but still not working.</s> 
<br>Solved using: https://stackoverflow.com/questions/53560991/automatic-file-downloads-limited-to-10-files-on-chrome-browser
- The user experience is not so good as compared to desktop but it can be used to create decks.

# Todo
- Deck export from browser
- <s>Create rectangle by drawing on screen</s>. To create rectangle at any part of screen then first select the button (below image), then tap at two points (top left corner and bottom right corner) to create rectangle of that width and height inside editor window. Note: Always reset zoom before creating rectangle using this.
<br>![](demo/select_to_create.PNG)


# License
### Deck Template
AGPL-3.0 License
<br>Copyright (c) glutanimate
<br>https://github.com/glutanimate/image-occlusion-enhanced

### svg.js
Copyright (c) 2012-2018 Wout Fierens
<br>https://svgdotjs.github.io/

### image occlusion in browser
MIT License
<br>Copyright (c) 2020 Mani
