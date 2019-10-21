from build import Builder
b = Builder()
b.addfile('example/tank/crate.js')
b.addfile('example/tank/tank.js')
b.addfile('example/tank/circle.js')
b.addMainScene('example/tank/main.js', 'Main')
b.addResources('example/tank/Tank.png')
b.build()