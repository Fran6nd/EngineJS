import re
import os
import requests
from shutil import copyfile


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
        self.resources = list()

    def build(self):
        if not os.path.exists('./build'):
            os.makedirs('./build')
        output = open("build/EngineJS.js", 'w')
        print('Building...')
        for path in self.files:
            print(path)
            file = open(path, 'r+')
            output.write(file.read())
            file.close()
        output.close()
        url = 'https://javascript-minifier.com/raw'
        data = {'input': open('build/EngineJS.js', 'r').read()}
        response = requests.post(url, data=data)
        simplified = response.text
        simplified = self.minifyClassNames(simplified)
        output = open("build/EngineJS.js", 'w')
        output.write(simplified)
        output.close()
        index = open('build/index.html', 'w')
        baseIndexFile = open('EngineJS/index.html', 'r')
        index.write(baseIndexFile.read().format(self.mainClassName))
        baseIndexFile.close()
        index.close()
        for r in self.resources:
            output = 'build/' + r
            if not os.path.exists(os.path.dirname(output)):
                os.makedirs(os.path.dirname(output))
            copyfile(r, output)


    def addfile(self, path):
        self.files.append(path)
    def addMainScene(self, path, className):
        self.addfile(path)
        self.mainClassName = className
    def addResources(self, path):
        self.resources.append(path)
    def minifyClassNames(self, f):
        classNameList = dict()
        pattern = re.compile(r'class [\w]+')
        self.index = 0
        def newClassName():
            self.index+=1
            return 'C' + str(self.index)
        for m in re.findall(pattern, f):
            name = m.replace('class ', '')
            if name != self.mainClassName:
                classNameList.update({name : newClassName()})
        for n in classNameList:
            f = f.replace(n, classNameList[n])
        return f
