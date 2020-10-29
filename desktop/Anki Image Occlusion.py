from tkinter import *
from tkinter import font

import os
import time
import random
import subprocess
from glob import glob

from selenium import webdriver
from image_occ_deck_export import exportDeck

class ImageOcclusion:

    def __init__(self, master):
        self.master = master
        master.title("Image Occlusion")

        # capture button
        fontRoboto = font.Font(family='Roboto', size=16, weight='bold')

        btn_capture = Button(master, text="Start", command=self.start)
        btn_capture.config(highlightthickness=0, bd=0, fg="white", bg="#5fd38d",
                         activebackground="#5fd38d", activeforeground="white", font=fontRoboto)
        btn_capture.pack(padx="10", pady="10", fill=BOTH)


        btn_export = Button(master, text="Export", command=self.export)
        btn_export.config(highlightthickness=0, bd=0, fg="white", bg="#5fd38d",
                         activebackground="#5fd38d", activeforeground="white", font=fontRoboto)
        btn_export.pack(padx="10", pady="10", fill=BOTH)

    def start(self):
        chromedriver = "driver/chromedriver.exe"

        # appdata = os.getenv('APPDATA')
        appdata = os.getcwd()
        download = "Downloads"

        if not os.path.exists(download):
            os.mkdir(download)
        
        self.anki_dir = appdata + "\\" + download

        chromeOptions = webdriver.ChromeOptions()
        prefs = {"download.default_directory" : self.anki_dir}
        chromeOptions.add_argument("--start-maximized")
        chromeOptions.add_experimental_option("prefs", prefs)

        self.driver = webdriver.Chrome(executable_path=chromedriver, options=chromeOptions)

        self.driver.get("https://infinyte7.github.io/image-occlusion-in-browser/")

        # clear download folder
        files = glob('Downloads/*')
        for f in files:
            os.remove(f)


    def export(self):
        self.driver.execute_script("downloadAllNotes()")

        time.sleep(2)
        output_file = self.anki_dir + "\\output-all-notes.txt"

        ra = random.randrange(1 << 15, 1 << 16)

        export = "Export"
        if not os.path.exists(export):
            os.mkdir(export)

        output_deck = export + "/Export-deck-" + str(ra) + ".apkg"
        exportDeck(output_file, output_deck)

        # clear download folder
        files = glob('Downloads/*')
        for f in files:
            os.remove(f)

window = Tk()
# window.attributes("-topmost", True)
window.geometry("300x140")
my_gui = ImageOcclusion(window)
window.mainloop()
