from build import Builder
b = Builder()
b.addfile('example/infinityRunner/player.js')
b.addfile('example/infinityRunner/ground.js')
b.addfile('example/infinityRunner/obstacleSpawner.js')
b.addfile('example/infinityRunner/obstacle.js')
b.addMainScene('example/infinityRunner/main.js', 'Main')
b.build()