# EngineJS
## Introduction
EngineJS is a work-in-progress 2D game engine using canvas. It aims to support a lot of game types, including those multiplayer...
It was first one ofmy pyhton projects, improved and rewritten here.
## How is it designed
#### This section is WORK-IN-PROGRESS!

As said before, it's based on canvas. The base class using canvas is `scene.js` that should be extended. Any object to draw, updateand move has to extend `GameObject` class from `gameObject.js`. Then you can override following methods: `draw(ctx)`, `update(dt)`...
About collisions: Each `GameObject` has a `Colliders` instance that contains some `Collider` instances that are list of triangles... If after moving, one of the triangle's points is inside any other from other `GameObject` triangle, we undo the movement.
Here is a basic treeview of the project:<br /><br />
```
+-EngineJS<br />
|--build.py\<br />
|--buildTankDemo.py<br />
|--index.htm<br />
|--README.md<br />
|--LICENCE<br />
|+-EngineJS<br />
||--scene.js<br />
||--drawing.js<br />
||--vector2d.js<br />
||--triangle.js<br />
||--collider.js<br />
||--colliders.js<br />
||--transform.js<br />
||--gameObject.js<br />
||--key.js<br />
||--inputManager.js<br />
||+-colliders<br />
|||--quadCollider.js<br />
|||--triangleCollider.js<br />
|+-Example<br />
||+-tank<br />
|||--crate.js<br />
|||--tank.js<br />
|||--Tank.png<br />
```