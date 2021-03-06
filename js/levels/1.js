// Generated by CoffeeScript 1.3.3
(function() {
  var Level1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Level.levels[1] = Level1 = (function(_super) {

    __extends(Level1, _super);

    function Level1() {
      return Level1.__super__.constructor.apply(this, arguments);
    }

    Level1.prototype.start = function() {
      var i, _i, _j, _k, _l,
        _this = this;
      for (i = _i = 3; _i <= 15; i = _i += 3) {
        this.after(i, (function() {
          return _this.spawnEnemy(Enemy.Blip);
        }));
      }
      this.after(10, (function() {
        return _this.spawnEnemy(Enemy.Butter);
      }));
      for (i = _j = 16; _j <= 40; i = _j += 2) {
        this.after(i, (function() {
          return _this.spawnEnemy(Enemy.Blip);
        }));
      }
      this.after(40, (function() {
        return _this.spawnEnemy(Enemy.Butter);
      }));
      for (i = _k = 41; _k <= 50; i = _k += 1) {
        this.after(i, (function() {
          return _this.spawnEnemy(Enemy.Blip);
        }));
      }
      for (i = _l = 51; _l <= 60; i = _l += 0.35) {
        this.after(i, (function() {
          return _this.spawnEnemy(Enemy.Blip);
        }));
      }
      return this.after(61, function() {
        return _this.winnable = true;
      });
    };

    return Level1;

  })(Level);

}).call(this);
