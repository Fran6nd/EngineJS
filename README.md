# EngineJS
## Introduction
EngineJS is a work-in-progress 2D game engine using canvas. It aims to support a lot of game types, including those multiplayer...
It was first one ofmy pyhton projects, improved and rewritten here.
## How is it designed
#### This section is WORK-IN-PROGRESS!

As said before, it's based on canvas. The base class using canvas is `scene.js` that should be extended. Any object to draw, updateand move has to extend `GameObject` class from `gameObject.js`. Then you can override following methods: `draw(ctx)`, `update(dt)`...
About collisions: Each `GameObject` has a `Colliders` instance that contains some `Collider` instances that are list of triangles... If after moving, one of the triangle's points is inside any other from other `GameObject` triangle, we undo the movement.<br />
Here is a basic treeview of the project:<br /><br />
```
+-EngineJS
|--build.py
|--buildTankDemo.py
|--index.htm
|--README.md
|--LICENCE
|-+-EngineJS
| |--scene.js
| |--drawing.js
| |--vector2d.js
| |--triangle.js
| |--collider.js
| |--colliders.js
| |--transform.js
| |--gameObject.js
| |--key.js
| |--inputManager.js
| |-+-colliders
| | |--quadCollider.js
| | |--triangleCollider.js
| +-Example
| | +-tank
| | |--crate.js
| | |--tank.js
| | |--Tank.png
```
