// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Crosshair = (function(_super) {

    __extends(Crosshair, _super);

    Crosshair.name = 'Crosshair';

    Crosshair.prototype.size = 4;

    Crosshair.prototype.bounds = 100;

    function Crosshair() {
      Crosshair.__super__.constructor.call(this, new THREE.PlaneGeometry(this.size, this.size), new THREE.MeshBasicMaterial({
        color: 0xffffff
      }));
      this.position.z = 0.1;
      this.scale.z = 0.001;
    }

    Crosshair.prototype.updatePosition = function(pos) {
      this.position.x = pos.x;
      this.position.y = pos.y;
      if (this.position.x > this.bounds) {
        this.position.x = this.bounds;
      }
      if (this.position.x < -this.bounds) {
        this.position.x = -this.bounds;
      }
      if (this.position.y > this.bounds) {
        this.position.y = this.bounds;
      }
      if (this.position.y < -this.bounds) {
        return this.position.y = -this.bounds;
      }
    };

    Crosshair.prototype.update = function() {};

    return Crosshair;

  })(THREE.Mesh);

}).call(this);
