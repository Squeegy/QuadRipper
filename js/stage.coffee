class window.Stage
  levels: (level for level in Level.levels when level)

  constructor: ->
    scene.stage = this

    @bindEvents()
    @createLevelMesh()

    @crosshair = new Crosshair
    @mesh.add @crosshair

    @guns = Gun.create()
    for type, gun of @guns
      @mesh.add gun

    @bullets = []
    @enemies = []
    @health = 100

    @nextLevel()

  createLevelMesh: ->
    @mesh = new THREE.Mesh(
      new THREE.PlaneGeometry 0, 0
      new THREE.MeshBasicMaterial()
    )
    scene.add @mesh
    
    floor = new THREE.Mesh(
      new THREE.PlaneGeometry 200, 200
      new THREE.MeshPhongMaterial(color: 0xdddddd)
    )
    floor.position.z = -5
    @mesh.add floor

    # walls
    @walls = [
      new Wall 'top'
      new Wall 'right'
      new Wall 'bottom'
      new Wall 'left'
    ]
    @mesh.add wall for wall in @walls

  bindEvents: ->
    $(document.body)
      .on('mousemove', @onMouseMove)
      .on('keydown', @onKeyDown)
      .on('keyup', @onKeyUp)

  onMouseMove: (e) =>
    pointerPos = scene.camera.screenToWorld('xy', e.clientX, e.clientY)
    @crosshair.updatePosition pointerPos
    
    for type, gun of @guns
      gun.updatePosition pointerPos

  keycodeToPosition: (code) ->
    switch code
      when 87 then 'bottom'    # W
      when 68 then 'left'      # D
      when 83 then 'top'       # S
      when 65 then 'right'     # A

  onKeyDown: (e) =>
    return if @health <= 0
    position = @keycodeToPosition e.which
    return unless position

    for type, gun of @guns
      gun.setActive type is position

    return false

  onKeyUp: (e) =>
    @guns[@keycodeToPosition(e.which)]?.setActive no
    return false

  update: ->
    @updateTiming()

    # crosshair
    @crosshair.update()

    # guns
    gun.update() for type, gun of @guns

    # bullets
    for bullet in @bullets
      bullet.update()
      @mesh.remove bullet if bullet.expired

    @bullets = (bullet for bullet in @bullets when not bullet.expired)

    # enemies
    for enemy in @enemies
      enemy.update()
      @mesh.remove enemy if enemy.expired

    @enemies = (enemy for enemy in @enemies when not enemy.expired)

    # walls
    if @showHit
      @showHit = no
      wall.material.color = new THREE.Color(0xffffff) for wall in @walls
    else
      wall.material.color = new THREE.Color(0xaaaaaa) for wall in @walls

    if @health <= 0
      wall.material.color = new THREE.Color(0xff0000) for wall in @walls
    
    else if @level.completed()
      wall.material.color = new THREE.Color(0x00ff00) for wall in @walls
      unless @completed
        @completed = yes
        setTimeout (=> @nextLevel()), 5000

  updateTiming: ->
    @thisFrameAt ||= Date.now()/1000 - 1/60

    @lastFrameAt = @thisFrameAt
    @thisFrameAt = Date.now()/1000
    @delta = @thisFrameAt - @lastFrameAt

  hit: (enemy) ->
    @health -= 10
    @showHit = yes

    if @health is 0
      setTimeout (=> @reset()), 5000

  reset: ->
    enemy.expired = yes for enemy in @enemies
    @health = 100

    @level?.kill()
    @level = new @levels[@levelIndex]
    @level.start()

  nextLevel: ->
    @completed = no
    @levelIndex ?= -1
    @levelIndex++
    @levelIndex = 0 if @levelIndex >= @levels.length
    @reset()

  Object.defineProperty @::, 'health',
    get: -> @_health
    set: (val) ->
      @_health = if val > 0 then val else 0
      $('#health').html @_health
