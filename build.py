import re
import os

class Builder():
    def __init__(self):
        self.files = list()
        self.addfile('scene.js')
        self.addfile('drawing.js')
        self.addfile('key.js')
        self.addfile('inputManager.js')
        self.addfile('vector2d.js')
        self.addfile('transform.js')
        self.addfile('triangle.js')
        self.addfile('collider.js')
        self.addfile('colliders.js')
        self.addfile('gameObject.js')
        self.addfile('colliders/quadCollider.js')
        self.addfile('colliders/triangleCollider.js')
    def build(self):
        output = open("EngineJS.js", 'w')
        print('Building...')
        for path in self.files:
            print(path)
            file = open(path, 'r+')
            output.write(file.read())
            file.close()
        output.close()
    def addfile(self, path):
        self.files.append(path)