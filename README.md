# image occlusion in browser

Create image occlusion in browser for Desktop and iOS devices v13 and v14.

Anki Image Occlusion app used to create normal, group and combine cloze anki cards for reviewing and studying cards in [Anki](https://apps.ankiweb.net) software (spaced repetition flashcard app). Anki decks created using [genanki](https://github.com/kerrickstaley/genanki) Python module using [pyodide](https://github.com/iodide-project/pyodide) to run inside browser and JavaScript library [svg.js](https://svgdotjs.github.io/). It create ready to import decks for Anki and AnkiMobile.

#### Anki Occlusion for AnkiDroid source code and apk moved here https://github.com/infinyte7/Anki-Occlusion, also download apk from [F-Droid](https://f-droid.org/en/packages/io.infinyte7.ankiimageocclusion/)

# QuickStart
Open following websites in browser and start creating image occlusion decks. Wait for loading the page. It downloads approx. 30 mb files inside browser.

### Version 2
https://infinyte7.github.io/image-occlusion-in-browser/v2/index.html

### PWA Version for offline
https://infinyte7.github.io/image-occlusion-in-browser/pwa/index.html

### Note: First try above if does not work then try this one.
Latest version of pyodide (v0.16.1) is not working or showing error on iOS v13 so try this test version it uses pyodide v0.15.0

https://infinyte7.github.io/image-occlusion-in-browser/test15

#### Note: Rename and remove .zip at end of exported deck if present .zip extension to import in Anki

## Create Anki decks in five steps
1. Select image to editor window
2. Draw rectangles, ellipses, polygons or textbox
3. Add notes to decks
4. Download the decks
5. On smartphones the decks download with .zip extension, so rename and remove .zip to import in AnkiMobile.

# Tutorials / Features
- [Create image occlusion anki deck inside browser](demo/iOSv13_demo.gif)
- [Download ready to import deck](demo/multiple_cards.gif)
- [PWA version for offline use](demo/install_pwa.gif)
- [Create multiple cards in same deck](demo/multiple_cards.gif)
- [Create rectangles](demo/demo_draw_anywhere.gif)
- [Create ellipse](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_multiple_polygon.gif)
- [Create textbox](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_text_box.gif)
- [Create polygon](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_multiple_polygon.gif)
- [Create normal cloze](demo/demo_create.gif)
- [Create group cloze](demo/demo_group_element.gif)
- [Create combine cloze](demo/combine_cloze_demo_browser.gif)
- [Change color of masks](demo/demo_change_color.gif)
- [Undo / Redo feature](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_undo_redo.gif)


## Demo (Desktop)
![](demo/multiple_cards.gif)

<br>

## Demo (iOS v13)
![](demo/iOSv13_demo.gif)


### View updates
[Changelog.md](Changelog.md)


### Version 1
https://infinyte7.github.io/image-occlusion-in-browser

Download ```output-all-notes.txt``` and generate deck using this [python script](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/image-occ-deck-export.py).

[Read more](Create-In-Browser.md)<br>
[View demo](demo/combine_cloze_demo_browser.gif)

# Faq ?
### How to change question and answer rectangles mask color?
Go to settings and put valid hex color.

View hex color example https://www.materialpalette.com/colors

### How to group cloze with different color?
1. Draw rectangles
2. Go to settings and change question mask color
3. Click top right image button, then click rectangles. It will change rectangles color. The rectangles with new color will be added to list.
4. Again click top right image button to stop adding rectangles to list. 
5. Click done to add data to AnkiDroid.
6. Repeat from step 2 to step 5 for creating group cloze with different color.

### How to group cloze with different color in same cloze ?
1. Draw rectangles
2. Select group cloze button (top right) add rectangles to list.
3. Change question mask color from settings
4. Select more rectangles to list
5. Finally click done button to add notes data to AnkiDroid

View [demo](https://user-images.githubusercontent.com/12841290/95605099-0d038b00-0a8b-11eb-81ed-58a7e03c254e.gif)

# Contributions
This is implemented using javascript. It has bugs and issues. Any contributions to improvement of codes and features will be appreciated.

# License
View [License](License.md)