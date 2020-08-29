# image-occlusion-in-browser

Create image occlusion in browser. 

For desktop there is already addon for creating image occlusion. This is implementation for using mobile and creating deck with image occlusion.

# Quick Start

1. Visit
[https://infinyte7.github.io/image-occlusion-in-browser/](https://infinyte7.github.io/image-occlusion-in-browser/)

2. First add image then rectangles. After add notes and then download.

It will generated following files

```
svg files - total number = number of rectangles * 2 + 1 
(Question Mask, Answer Mask, Original Mask)
```

Copy these files to collection.media folder.

```
output.tx file
```

The deck from output.txt file can be generated using ```image-occ-deck-export.py```. Open this .py file in ```Pydroid 3``` and run.
After enter deck details and export deck.

That deck can be imported to AnkiDroid.

# Demo
<img src="demo/demo_img_occ.gif" height="520"></img>

# Requirements 
1. Termux or any app that create localhost
2. Pydroid 3

Download from playstore.

# Steps

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
7. First add image then add rectangle (Add Rect). After adding notes, click on download to get svg files with question mask and answer mask. 

8. Copy all the files (svg files and original image) to ```collection.media``` folder

9. Now open ```Pydroid 3``` and open ```image-occ-deck-export.py``` and import ```output.txt``` file and generate deck by entering name, model and title.

10. Import it in AnkiDroid and start reviewing.


# Limitations
- I tried to create with more than six rectangle but it failed to generate svg files. I also tried async/await function but still not working. 
- The user experience is not so good as compared to desktop but it can be used to create decks.
- One image created at one time. More features to be added.

# Contributions
Contribution will be appreciated for adding features generating more than six files at one time. 

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
