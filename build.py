import re
import os

class Builder():
    def __init__(self):
        self.files = list()
        self.addfile('EngineJS/scene.js')
        self.addfile('EngineJS/drawing.js')
        self.addfile('EngineJS/key.js')
        self.addfile('EngineJS/inputManager.js')
        self.addfile('EngineJS/vector2d.js')
        self.addfile('EngineJS/transform.js')
        self.addfile('EngineJS/triangle.js')
        self.addfile('EngineJS/collider.js')
        self.addfile('EngineJS/colliders.js')
        self.addfile('EngineJS/gameObject.js')
        self.addfile('EngineJS/colliders/quadCollider.js')
        self.addfile('EngineJS/colliders/triangleCollider.js')
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