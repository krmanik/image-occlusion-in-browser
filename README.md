# image-occlusion-in-browser

Create image occlusion in browser.

For desktop there is already addon for creating image occlusion. This is implementation for using mobile and creating deck with image occlusion.

# App Features
   - New design
   - Cards auto added to AnkiDroid
   - Group cloze card generation simplified
   - **Selected image and generated SVG auto copy to ```AnkiDroid/collection.media/``` folder.**

# Tutorials / Features
- [Create question and answer mask](demo/demo_create.gif)
- [Create rectangles by tapping two point anywhere inside editor window](demo/demo_draw_anywhere.gif)
- [Create group question and answer mask](demo/demo_group_element.gif) (Need improvements)
- [Change color of masks](demo/demo_change_color.gif)
- [Export deck on mobile using browser](demo/demo_create_deck.gif)
- [Export deck on mobile using Pydroid 3](demo/demo_pydroid_3.gif)
- [Using offline](demo/demo_img_occ.gif)

### Demo
<img src="demo/new_design_demo.gif" height="450"></img>

# Create deck using Android app [Anki Image Occlusion]

The app made using [Apache Cordova](https://cordova.apache.org/) and [AnkiDroid API](https://github.com/ankidroid/Anki-Android/wiki/AnkiDroid-API) with ```HTML/CSS/JS```.

## Usage

To use this app. (This app is like addon for AnkiDroid app)
### 1. Install [AnkiDroid](https://github.com/ankidroid/Anki-Android)

   - Enable AnkiDroid API <br>
```AnkiDroid -> Settings -> Advanced -> Enable AnkiDroid API (Turn on)```

      Because this app add data to AnkiDroid app folder.

### 2. Install Anki Image Occlusion
   Download and install Anki Image Occlusion app from release page.

   https://github.com/infinyte7/image-occlusion-in-browser/releases
### 3. Give app permissions 
   Give ```storage``` and ```AnkiDroid database read and write permissions``` from app settings.
### 4. Import image 
   Select image from storage (top left corner image button).
### 5. Add rectangles
   Draw rectangles (bottom left draw button).
      - First select ```draw``` button then tap inside image at ```two point```, top left and bottom right, for creating box of that width and height.
### 6. Done
   Then click done button (top right corner button).

This will copy selected image, generated svg and notes data to AnkiDroid app.

## For Version <= Version 1.1.1
If not using latest version then following steps to be followed.
- Create card click on download icon.
- Card will be added one by one. But wait till ```card added``` toast showing on screen.
- Copy svg image from ```Internal Storage/ Android/ data/ io.infinyte7.ankiimageocclusion/ files/``` and original image file to AnkiDroid ```collection.media``` folder.

# Create image occlusion in browser
View [Create image occlusion in browser](Create-In-Browser.md)

# Create image occlusion offline
View [Create image occlusion Offline](Create-Offline.md)

# Build Anki Image Occlusion android app
1. Download this repository
2. Open ```android``` folder in Android Studio
3. Build and generate apk

# Faq ?
### Why is card not added to AnkiDroid?
1. Check app permission from app settings
```
Storage 
AnkiDroid app database read and write
```
2. Check ```Enable AnkiDroid API```

```AnkiDroid -> Settings -> Advanced -> Enable AnkiDroid API (Turn on)```

### Why is images not synced to Anki Desktop? 
In AnkiDroid, click ```check media``` then ```sync```. The images will be synced.

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

# Contributions
This is implemented using javascript. It has bugs and issues. Any contributions to improvement of codes and features will be appreciated.

# License
View [License](License.md)