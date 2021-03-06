// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Enemy = (function(_super) {

    __extends(Enemy, _super);

    Enemy.prototype.size = 6;

    Enemy.prototype.speed = 15;

    Enemy.prototype.health = 1;

    function Enemy() {
      Enemy.__super__.constructor.apply(this, arguments);
      this.velocity = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5).setLength(this.speed);
    }

    Enemy.prototype.update = function() {
      this.position.addSelf(this.velocity.clone().multiplyScalar(scene.stage.delta));
      if (this.showHit) {
        this.material.color = new THREE.Color(0xffffff);
        this.showHit = false;
      } else {
        this.material.color = new THREE.Color(0xff0000);
      }
      switch (false) {
        case !(this.position.x > 100 - this.size):
          scene.stage.hit(this);
          this.position.x = 100 - this.size;
          return this.velocity.x *= -1;
        case !(this.position.x < -100 + this.size):
          scene.stage.hit(this);
          this.position.x = -100 + this.size;
          return this.velocity.x *= -1;
        case !(this.position.y > 100 - this.size):
          scene.stage.hit(this);
          this.position.y = 100 - this.size;
          return this.velocity.y *= -1;
        case !(this.position.y < -100 + this.size):
          scene.stage.hit(this);
          this.position.y = -100 + this.size;
          return this.velocity.y *= -1;
      }
    };

    Enemy.prototype.hit = function(bullet) {
      this.health -= 1;
      if (this.health <= 0) {
        this.expired = true;
      }
      return this.showHit = true;
    };

    return Enemy;

  })(THREE.Mesh);

}).call(this);
