import re
import os
myfile = open("output.js", 'w')
added = list()
def addfile(f):


    file = open(f, 'r+')
    myfile.write(file.read())
    file.close()
def foreachfile(path, ext, cb):
    for r, d, f in os.walk(path):
        for file in f:
            if ext in file:

                if not file in added:
                    print(file)
                    added.append(file)
                    cb(r + '/' + file)
foreachfile('.', '.js', addfile)
myfile.close()