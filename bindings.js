/*
 * AUTO-GENERATED, DO NOT EDIT BY HAND
 */
var game = game || {};
var ut = ut || {};
ut.tween = ut.tween || {};
ut.Core2D = ut.Core2D || {};
ut.Core2D.layers = ut.Core2D.layers || {};
var entities = entities || {};
entities.game = entities.game || {};
entities.game.Level_Base = entities.game.Level_Base || {};
entities.game.GemPrefab = entities.game.GemPrefab || {};
entities.game.ParticlePrefab = entities.game.ParticlePrefab || {};
entities.game.SlashPrefab = entities.game.SlashPrefab || {};
entities.game.VictoryGroup = entities.game.VictoryGroup || {};
game.GemType = {
  Swirl: 0,
  Circle: 1,
  D20: 2,
  Star: 3
};
ut.tween.EaseType = {
  Linear: 0,
  EaseInQuad: 1,
  EaseOutQuad: 2,
  EaseInOutQuad: 3,
  EaseInCubic: 4,
  EaseOutCubic: 5,
  EaseInOutCubic: 6,
  EaseInQuart: 7,
  EaseOutQuart: 8,
  EaseInOutQuart: 9,
  EaseInQuint: 10,
  EaseOutQuint: 11,
  EaseInOutQuint: 12,
  EaseInBack: 13,
  EaseOutBack: 14,
  EaseInOutBack: 15,
  EaseInBounce: 16,
  EaseOutBounce: 17,
  EaseInOutBounce: 18
};
ut.tween.LoopType = {
  None: 0,
  Repeat: 1,
  PingPong: 2
};
game.Cell = function(arg0, arg1) {
  this._x = (arg0|0);
  this._y = (arg1|0);
};
game.Cell.prototype = Object.create(null);
game.Cell.prototype.constructor = game.Cell;
Object.defineProperties(game.Cell.prototype, {
  x: {
    get: function() { return this._x; },
    set: function(v) { this._x = (v|0); },
  },
  y: {
    get: function() { return this._y; },
    set: function(v) { this._y = (v|0); },
  },
});
game.Cell._size = 8;
game.Cell._fromPtr = function(ptr, v) {
  v = v || Object.create(game.Cell.prototype);
  v._x = HEAP32[(ptr+0)>>2];
  v._y = HEAP32[(ptr+4)>>2];
  return v;
};
game.Cell._toPtr = function(ptr, v) {
  HEAP32[(ptr+0)>>2] = v._x;
  HEAP32[(ptr+4)>>2] = v._y;
};
game.Cell._tempHeapPtr = function(v) {
  var ptr = ut.tempHeapPtrBufferZero(8);
  if (v) game.Cell._toPtr(ptr, v);
  return ptr;
};
game.CellLayout = function(arg0, arg1) {
  this._size = new ut.Math.Vector2(); if ((arg0) !== undefined) { this._size.copy(arg0); };
  this._spacing = new ut.Math.Vector2(); if ((arg1) !== undefined) { this._spacing.copy(arg1); };
};
game.CellLayout.prototype = Object.create(null);
game.CellLayout.prototype.constructor = game.CellLayout;
Object.defineProperties(game.CellLayout.prototype, {
  size: {
    get: function() { return this._size; },
    set: function(v) { this._size.copy(v); },
  },
  spacing: {
    get: function() { return this._spacing; },
    set: function(v) { this._spacing.copy(v); },
  },
});
game.CellLayout._size = 16;
game.CellLayout._fromPtr = function(ptr, v) {
  v = v || Object.create(game.CellLayout.prototype);
  v._size = ut._utils.vec2FromHeap(null, ptr+0);
  v._spacing = ut._utils.vec2FromHeap(null, ptr+8);
  return v;
};
game.CellLayout._toPtr = function(ptr, v) {
  ut._utils.vec2ToHeap(v._size, ptr+0);
  ut._utils.vec2ToHeap(v._spacing, ptr+8);
};
game.CellLayout._tempHeapPtr = function(v) {
  var ptr = ut.tempHeapPtrBufferZero(16);
  if (v) game.CellLayout._toPtr(ptr, v);
  return ptr;
};
entities.game.Level_Base.ComponentStorageView = function(ptr) {
  this._ptr = ptr;
};
entities.game.Level_Base.ComponentStorageView.prototype = Object.create(null);
entities.game.Level_Base.ComponentStorageView.prototype.constructor = entities.game.Level_Base.ComponentStorageView;
Object.defineProperties(entities.game.Level_Base.ComponentStorageView.prototype, {
});
entities.game.Level_Base.Component = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new entities.game.Level_Base.ComponentStorageView();
};
entities.game.Level_Base.Component.prototype = Object.create(ut.Component.prototype);
entities.game.Level_Base.Component.prototype.constructor = entities.game.Level_Base.Component;
Object.defineProperties(entities.game.Level_Base.Component, { cid: { configurable: true, get: function() { delete entities.game.Level_Base.Component.cid; return entities.game.Level_Base.Component.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"entities::game::Level_Base::Component"*/, 0); } } });
entities.game.GemPrefab.ComponentStorageView = function(ptr) {
  this._ptr = ptr;
};
entities.game.GemPrefab.ComponentStorageView.prototype = Object.create(null);
entities.game.GemPrefab.ComponentStorageView.prototype.constructor = entities.game.GemPrefab.ComponentStorageView;
Object.defineProperties(entities.game.GemPrefab.ComponentStorageView.prototype, {
});
entities.game.GemPrefab.Component = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new entities.game.GemPrefab.ComponentStorageView();
};
entities.game.GemPrefab.Component.prototype = Object.create(ut.Component.prototype);
entities.game.GemPrefab.Component.prototype.constructor = entities.game.GemPrefab.Component;
Object.defineProperties(entities.game.GemPrefab.Component, { cid: { configurable: true, get: function() { delete entities.game.GemPrefab.Component.cid; return entities.game.GemPrefab.Component.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"entities::game::GemPrefab::Component"*/, 0); } } });
entities.game.ParticlePrefab.ComponentStorageView = function(ptr) {
  this._ptr = ptr;
};
entities.game.ParticlePrefab.ComponentStorageView.prototype = Object.create(null);
entities.game.ParticlePrefab.ComponentStorageView.prototype.constructor = entities.game.ParticlePrefab.ComponentStorageView;
Object.defineProperties(entities.game.ParticlePrefab.ComponentStorageView.prototype, {
});
entities.game.ParticlePrefab.Component = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new entities.game.ParticlePrefab.ComponentStorageView();
};
entities.game.ParticlePrefab.Component.prototype = Object.create(ut.Component.prototype);
entities.game.ParticlePrefab.Component.prototype.constructor = entities.game.ParticlePrefab.Component;
Object.defineProperties(entities.game.ParticlePrefab.Component, { cid: { configurable: true, get: function() { delete entities.game.ParticlePrefab.Component.cid; return entities.game.ParticlePrefab.Component.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"entities::game::ParticlePrefab::Component"*/, 0); } } });
entities.game.SlashPrefab.ComponentStorageView = function(ptr) {
  this._ptr = ptr;
};
entities.game.SlashPrefab.ComponentStorageView.prototype = Object.create(null);
entities.game.SlashPrefab.ComponentStorageView.prototype.constructor = entities.game.SlashPrefab.ComponentStorageView;
Object.defineProperties(entities.game.SlashPrefab.ComponentStorageView.prototype, {
});
entities.game.SlashPrefab.Component = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new entities.game.SlashPrefab.ComponentStorageView();
};
entities.game.SlashPrefab.Component.prototype = Object.create(ut.Component.prototype);
entities.game.SlashPrefab.Component.prototype.constructor = entities.game.SlashPrefab.Component;
Object.defineProperties(entities.game.SlashPrefab.Component, { cid: { configurable: true, get: function() { delete entities.game.SlashPrefab.Component.cid; return entities.game.SlashPrefab.Component.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"entities::game::SlashPrefab::Component"*/, 0); } } });
entities.game.VictoryGroup.ComponentStorageView = function(ptr) {
  this._ptr = ptr;
};
entities.game.VictoryGroup.ComponentStorageView.prototype = Object.create(null);
entities.game.VictoryGroup.ComponentStorageView.prototype.constructor = entities.game.VictoryGroup.ComponentStorageView;
Object.defineProperties(entities.game.VictoryGroup.ComponentStorageView.prototype, {
});
entities.game.VictoryGroup.Component = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new entities.game.VictoryGroup.ComponentStorageView();
};
entities.game.VictoryGroup.Component.prototype = Object.create(ut.Component.prototype);
entities.game.VictoryGroup.Component.prototype.constructor = entities.game.VictoryGroup.Component;
Object.defineProperties(entities.game.VictoryGroup.Component, { cid: { configurable: true, get: function() { delete entities.game.VictoryGroup.Component.cid; return entities.game.VictoryGroup.Component.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"entities::game::VictoryGroup::Component"*/, 0); } } });
game.GemStorageView = function(ptr) {
  this._ptr = ptr;
};
game.GemStorageView.prototype = Object.create(null);
game.GemStorageView.prototype.constructor = game.GemStorageView;
Object.defineProperties(game.GemStorageView.prototype, {
  type: {
    get: function() { return HEAP32[(this._ptr+0)>>2]; },
    set: function(v) { HEAP32[(this._ptr+0)>>2] = v; },
  },
  animating: {
    get: function() { return (HEAP8[this._ptr+4]?true:false); },
    set: function(v) { HEAP8[this._ptr+4] = (v)?1:0; },
  },
  pieces: {
    get: function() { return ut._stdVectorToArray(this._ptr+8, 8, function(p) { return ut.Entity._fromPtr(p); }); },
    set: function(v) { ut._arrayToStdVector(v, this._ptr+8, 8, function(p, v) { ut.Entity._toPtr(p, v); }); },
  },
  dragStart: {
    get: function() { return ut._utils.vec2FromHeap(null, this._ptr+20); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut._utils.vec2ToHeap(v, this._ptr+20); },
  },
  isDragged: {
    get: function() { return HEAP32[(this._ptr+28)>>2]; },
    set: function(v) { HEAP32[(this._ptr+28)>>2] = v; },
  },
});
game.Gem = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.GemStorageView();
};
game.Gem.prototype = Object.create(ut.Component.prototype);
game.Gem.prototype.constructor = game.Gem;
game.Gem.prototype._dtorFn = function dtor(ptr) {
  Module._free(HEAP32[(ptr+8)>>2]);
};
Object.defineProperties(game.Gem, { cid: { configurable: true, get: function() { delete game.Gem.cid; return game.Gem.cid = Module._ut_component_register_cid(32, 4, 0, 0/*"game::Gem"*/, ut.DestructorFn._cb.token_for(game.Gem.prototype._dtorFn)); } } });
game.Gem.prototype.type = function() {
  this._view._ptr = this._getRawPtr(); return this._view.type;
};
game.Gem.prototype.setType = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.type = v; this.setDirty();
};
game.Gem.prototype.animating = function() {
  this._view._ptr = this._getRawPtr(); return this._view.animating;
};
game.Gem.prototype.setAnimating = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.animating = v; this.setDirty();
};
game.Gem.prototype.pieces = function() {
  this._view._ptr = this._getRawPtr(); return this._view.pieces;
};
game.Gem.prototype.setPieces = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.pieces = v; this.setDirty();
};
game.Gem.prototype.dragStart = function() {
  this._view._ptr = this._getRawPtr(); return this._view.dragStart;
};
game.Gem.prototype.setDragStart = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.dragStart = v; this.setDirty();
};
game.Gem.prototype.isDragged = function() {
  this._view._ptr = this._getRawPtr(); return this._view.isDragged;
};
game.Gem.prototype.setIsDragged = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.isDragged = v; this.setDirty();
};
game.BoardStorageView = function(ptr) {
  this._ptr = ptr;
};
game.BoardStorageView.prototype = Object.create(null);
game.BoardStorageView.prototype.constructor = game.BoardStorageView;
Object.defineProperties(game.BoardStorageView.prototype, {
});
game.Board = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.BoardStorageView();
};
game.Board.prototype = Object.create(ut.Component.prototype);
game.Board.prototype.constructor = game.Board;
Object.defineProperties(game.Board, { cid: { configurable: true, get: function() { delete game.Board.cid; return game.Board.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"game::Board"*/, 0); } } });
game.BoardSpawnStorageView = function(ptr) {
  this._ptr = ptr;
};
game.BoardSpawnStorageView.prototype = Object.create(null);
game.BoardSpawnStorageView.prototype.constructor = game.BoardSpawnStorageView;
Object.defineProperties(game.BoardSpawnStorageView.prototype, {
});
game.BoardSpawn = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.BoardSpawnStorageView();
};
game.BoardSpawn.prototype = Object.create(ut.Component.prototype);
game.BoardSpawn.prototype.constructor = game.BoardSpawn;
Object.defineProperties(game.BoardSpawn, { cid: { configurable: true, get: function() { delete game.BoardSpawn.cid; return game.BoardSpawn.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"game::BoardSpawn"*/, 0); } } });
game.MatchedStorageView = function(ptr) {
  this._ptr = ptr;
};
game.MatchedStorageView.prototype = Object.create(null);
game.MatchedStorageView.prototype.constructor = game.MatchedStorageView;
Object.defineProperties(game.MatchedStorageView.prototype, {
  match: {
    get: function() { return ut.Entity._fromPtr(this._ptr+0); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut.Entity._toPtr(this._ptr+0, v); },
  },
});
game.Matched = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.MatchedStorageView();
};
game.Matched.prototype = Object.create(ut.Component.prototype);
game.Matched.prototype.constructor = game.Matched;
Object.defineProperties(game.Matched, { cid: { configurable: true, get: function() { delete game.Matched.cid; return game.Matched.cid = Module._ut_component_register_cid(8, 4, 0, 0/*"game::Matched"*/, 0); } } });
game.Matched.prototype.match = function() {
  this._view._ptr = this._getRawPtr(); return this._view.match;
};
game.Matched.prototype.setMatch = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.match = v; this.setDirty();
};
game.MatchStorageView = function(ptr) {
  this._ptr = ptr;
};
game.MatchStorageView.prototype = Object.create(null);
game.MatchStorageView.prototype.constructor = game.MatchStorageView;
Object.defineProperties(game.MatchStorageView.prototype, {
  gems: {
    get: function() { return ut._stdVectorToArray(this._ptr+0, 8, function(p) { return ut.Entity._fromPtr(p); }); },
    set: function(v) { ut._arrayToStdVector(v, this._ptr+0, 8, function(p, v) { ut.Entity._toPtr(p, v); }); },
  },
});
game.Match = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.MatchStorageView();
};
game.Match.prototype = Object.create(ut.Component.prototype);
game.Match.prototype.constructor = game.Match;
game.Match.prototype._dtorFn = function dtor(ptr) {
  Module._free(HEAP32[(ptr+0)>>2]);
};
Object.defineProperties(game.Match, { cid: { configurable: true, get: function() { delete game.Match.cid; return game.Match.cid = Module._ut_component_register_cid(12, 4, 0, 0/*"game::Match"*/, ut.DestructorFn._cb.token_for(game.Match.prototype._dtorFn)); } } });
game.Match.prototype.gems = function() {
  this._view._ptr = this._getRawPtr(); return this._view.gems;
};
game.Match.prototype.setGems = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.gems = v; this.setDirty();
};
game.CellGraphStorageView = function(ptr) {
  this._ptr = ptr;
};
game.CellGraphStorageView.prototype = Object.create(null);
game.CellGraphStorageView.prototype.constructor = game.CellGraphStorageView;
Object.defineProperties(game.CellGraphStorageView.prototype, {
  width: {
    get: function() { return HEAP32[(this._ptr+0)>>2]; },
    set: function(v) { HEAP32[(this._ptr+0)>>2] = v; },
  },
  height: {
    get: function() { return HEAP32[(this._ptr+4)>>2]; },
    set: function(v) { HEAP32[(this._ptr+4)>>2] = v; },
  },
  layout: {
    get: function() { return game.CellLayout._fromPtr(this._ptr+8); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } game.CellLayout._toPtr(this._ptr+8, v); },
  },
});
game.CellGraph = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.CellGraphStorageView();
};
game.CellGraph.prototype = Object.create(ut.Component.prototype);
game.CellGraph.prototype.constructor = game.CellGraph;
Object.defineProperties(game.CellGraph, { cid: { configurable: true, get: function() { delete game.CellGraph.cid; return game.CellGraph.cid = Module._ut_component_register_cid(24, 4, 0, 0/*"game::CellGraph"*/, 0); } } });
game.CellGraph.prototype.width = function() {
  this._view._ptr = this._getRawPtr(); return this._view.width;
};
game.CellGraph.prototype.setWidth = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.width = v; this.setDirty();
};
game.CellGraph.prototype.height = function() {
  this._view._ptr = this._getRawPtr(); return this._view.height;
};
game.CellGraph.prototype.setHeight = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.height = v; this.setDirty();
};
game.CellGraph.prototype.layout = function() {
  this._view._ptr = this._getRawPtr(); return this._view.layout;
};
game.CellGraph.prototype.setLayout = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.layout = v; this.setDirty();
};
game.CellGraphNodeStorageView = function(ptr) {
  this._ptr = ptr;
};
game.CellGraphNodeStorageView.prototype = Object.create(null);
game.CellGraphNodeStorageView.prototype.constructor = game.CellGraphNodeStorageView;
Object.defineProperties(game.CellGraphNodeStorageView.prototype, {
  cell: {
    get: function() { return game.Cell._fromPtr(this._ptr+0); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } game.Cell._toPtr(this._ptr+0, v); },
  },
});
game.CellGraphNode = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.CellGraphNodeStorageView();
};
game.CellGraphNode.prototype = Object.create(ut.Component.prototype);
game.CellGraphNode.prototype.constructor = game.CellGraphNode;
Object.defineProperties(game.CellGraphNode, { cid: { configurable: true, get: function() { delete game.CellGraphNode.cid; return game.CellGraphNode.cid = Module._ut_component_register_cid(8, 4, 0, 0/*"game::CellGraphNode"*/, 0); } } });
game.CellGraphNode.prototype.cell = function() {
  this._view._ptr = this._getRawPtr(); return this._view.cell;
};
game.CellGraphNode.prototype.setCell = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.cell = v; this.setDirty();
};
game.CellGraphNodeRegisterStorageView = function(ptr) {
  this._ptr = ptr;
};
game.CellGraphNodeRegisterStorageView.prototype = Object.create(null);
game.CellGraphNodeRegisterStorageView.prototype.constructor = game.CellGraphNodeRegisterStorageView;
Object.defineProperties(game.CellGraphNodeRegisterStorageView.prototype, {
});
game.CellGraphNodeRegister = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.CellGraphNodeRegisterStorageView();
};
game.CellGraphNodeRegister.prototype = Object.create(ut.Component.prototype);
game.CellGraphNodeRegister.prototype.constructor = game.CellGraphNodeRegister;
Object.defineProperties(game.CellGraphNodeRegister, { cid: { configurable: true, get: function() { delete game.CellGraphNodeRegister.cid; return game.CellGraphNodeRegister.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"game::CellGraphNodeRegister"*/, 0); } } });
game.SlashEffectStorageView = function(ptr) {
  this._ptr = ptr;
};
game.SlashEffectStorageView.prototype = Object.create(null);
game.SlashEffectStorageView.prototype.constructor = game.SlashEffectStorageView;
Object.defineProperties(game.SlashEffectStorageView.prototype, {
});
game.SlashEffect = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.SlashEffectStorageView();
};
game.SlashEffect.prototype = Object.create(ut.Component.prototype);
game.SlashEffect.prototype.constructor = game.SlashEffect;
Object.defineProperties(game.SlashEffect, { cid: { configurable: true, get: function() { delete game.SlashEffect.cid; return game.SlashEffect.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"game::SlashEffect"*/, 0); } } });
game.DragonStorageView = function(ptr) {
  this._ptr = ptr;
};
game.DragonStorageView.prototype = Object.create(null);
game.DragonStorageView.prototype.constructor = game.DragonStorageView;
Object.defineProperties(game.DragonStorageView.prototype, {
  health: {
    get: function() { return HEAP32[(this._ptr+0)>>2]; },
    set: function(v) { HEAP32[(this._ptr+0)>>2] = v; },
  },
  healthFillEntity: {
    get: function() { return ut.Entity._fromPtr(this._ptr+4); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut.Entity._toPtr(this._ptr+4, v); },
  },
});
game.Dragon = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new game.DragonStorageView();
};
game.Dragon.prototype = Object.create(ut.Component.prototype);
game.Dragon.prototype.constructor = game.Dragon;
Object.defineProperties(game.Dragon, { cid: { configurable: true, get: function() { delete game.Dragon.cid; return game.Dragon.cid = Module._ut_component_register_cid(12, 4, 0, 0/*"game::Dragon"*/, 0); } } });
game.Dragon.prototype.health = function() {
  this._view._ptr = this._getRawPtr(); return this._view.health;
};
game.Dragon.prototype.setHealth = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.health = v; this.setDirty();
};
game.Dragon.prototype.healthFillEntity = function() {
  this._view._ptr = this._getRawPtr(); return this._view.healthFillEntity;
};
game.Dragon.prototype.setHealthFillEntity = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.healthFillEntity = v; this.setDirty();
};
ut.tween.TweenTimeStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenTimeStorageView.prototype = Object.create(null);
ut.tween.TweenTimeStorageView.prototype.constructor = ut.tween.TweenTimeStorageView;
Object.defineProperties(ut.tween.TweenTimeStorageView.prototype, {
  time: {
    get: function() { return HEAPF32[(this._ptr+0)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+0)>>2] = v; },
  },
  duration: {
    get: function() { return HEAPF32[(this._ptr+4)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+4)>>2] = v; },
  },
  interpolation: {
    get: function() { return HEAPF32[(this._ptr+8)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+8)>>2] = v; },
  },
  reverse: {
    get: function() { return (HEAP8[this._ptr+12]?true:false); },
    set: function(v) { HEAP8[this._ptr+12] = (v)?1:0; },
  },
});
ut.tween.TweenTime = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenTimeStorageView();
};
ut.tween.TweenTime.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenTime.prototype.constructor = ut.tween.TweenTime;
Object.defineProperties(ut.tween.TweenTime, { cid: { configurable: true, get: function() { delete ut.tween.TweenTime.cid; return ut.tween.TweenTime.cid = Module._ut_component_register_cid(16, 4, 0, 0/*"ut::tween::TweenTime"*/, 0); } } });
ut.tween.TweenTime.prototype.time = function() {
  this._view._ptr = this._getRawPtr(); return this._view.time;
};
ut.tween.TweenTime.prototype.setTime = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.time = v; this.setDirty();
};
ut.tween.TweenTime.prototype.duration = function() {
  this._view._ptr = this._getRawPtr(); return this._view.duration;
};
ut.tween.TweenTime.prototype.setDuration = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.duration = v; this.setDirty();
};
ut.tween.TweenTime.prototype.interpolation = function() {
  this._view._ptr = this._getRawPtr(); return this._view.interpolation;
};
ut.tween.TweenTime.prototype.setInterpolation = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.interpolation = v; this.setDirty();
};
ut.tween.TweenTime.prototype.reverse = function() {
  this._view._ptr = this._getRawPtr(); return this._view.reverse;
};
ut.tween.TweenTime.prototype.setReverse = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.reverse = v; this.setDirty();
};
ut.tween.TweenEaseStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenEaseStorageView.prototype = Object.create(null);
ut.tween.TweenEaseStorageView.prototype.constructor = ut.tween.TweenEaseStorageView;
Object.defineProperties(ut.tween.TweenEaseStorageView.prototype, {
  easeType: {
    get: function() { return HEAP32[(this._ptr+0)>>2]; },
    set: function(v) { HEAP32[(this._ptr+0)>>2] = v; },
  },
});
ut.tween.TweenEase = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenEaseStorageView();
};
ut.tween.TweenEase.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenEase.prototype.constructor = ut.tween.TweenEase;
Object.defineProperties(ut.tween.TweenEase, { cid: { configurable: true, get: function() { delete ut.tween.TweenEase.cid; return ut.tween.TweenEase.cid = Module._ut_component_register_cid(4, 4, 0, 0/*"ut::tween::TweenEase"*/, 0); } } });
ut.tween.TweenEase.prototype.easeType = function() {
  this._view._ptr = this._getRawPtr(); return this._view.easeType;
};
ut.tween.TweenEase.prototype.setEaseType = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.easeType = v; this.setDirty();
};
ut.tween.TweenTargetStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenTargetStorageView.prototype = Object.create(null);
ut.tween.TweenTargetStorageView.prototype.constructor = ut.tween.TweenTargetStorageView;
Object.defineProperties(ut.tween.TweenTargetStorageView.prototype, {
  entity: {
    get: function() { return ut.Entity._fromPtr(this._ptr+0); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut.Entity._toPtr(this._ptr+0, v); },
  },
  component: {
    get: function() { return HEAP32[(this._ptr+8)>>2]; },
    set: function(v) { HEAP32[(this._ptr+8)>>2] = v; },
  },
  property: {
    get: function() { return Pointer_stringify(Module._ut_string_get_chars(this._ptr+12)); },
    set: function(v) { ut.prepareTempHeap(); Module._ut_string_set_chars(this._ptr+12, ut.tempHeapPtrCString(v)); },
  },
});
ut.tween.TweenTarget = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenTargetStorageView();
};
ut.tween.TweenTarget.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenTarget.prototype.constructor = ut.tween.TweenTarget;
Object.defineProperties(ut.tween.TweenTarget, { cid: { configurable: true, get: function() { delete ut.tween.TweenTarget.cid; return ut.tween.TweenTarget.cid = Module._ut_component_register_cid(24, 4, 0, 0/*"ut::tween::TweenTarget"*/, 0); } } });
ut.tween.TweenTarget.prototype.entity = function() {
  this._view._ptr = this._getRawPtr(); return this._view.entity;
};
ut.tween.TweenTarget.prototype.setEntity = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.entity = v; this.setDirty();
};
ut.tween.TweenTarget.prototype.component = function() {
  this._view._ptr = this._getRawPtr(); return this._view.component;
};
ut.tween.TweenTarget.prototype.setComponent = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.component = v; this.setDirty();
};
ut.tween.TweenTarget.prototype.property = function() {
  this._view._ptr = this._getRawPtr(); return this._view.property;
};
ut.tween.TweenTarget.prototype.setProperty = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.property = v; this.setDirty();
};
ut.tween.TweenPlayStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenPlayStorageView.prototype = Object.create(null);
ut.tween.TweenPlayStorageView.prototype.constructor = ut.tween.TweenPlayStorageView;
Object.defineProperties(ut.tween.TweenPlayStorageView.prototype, {
  padding: {
    get: function() { return HEAP8[this._ptr+0]; },
    set: function(v) { HEAP8[this._ptr+0] = v; },
  },
});
ut.tween.TweenPlay = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenPlayStorageView();
};
ut.tween.TweenPlay.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenPlay.prototype.constructor = ut.tween.TweenPlay;
Object.defineProperties(ut.tween.TweenPlay, { cid: { configurable: true, get: function() { delete ut.tween.TweenPlay.cid; return ut.tween.TweenPlay.cid = Module._ut_component_register_cid(1, 1, 0, 0/*"ut::tween::TweenPlay"*/, 0); } } });
ut.tween.TweenPlay.prototype.padding = function() {
  this._view._ptr = this._getRawPtr(); return this._view.padding;
};
ut.tween.TweenPlay.prototype.setPadding = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.padding = v; this.setDirty();
};
ut.tween.TweenLoopStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenLoopStorageView.prototype = Object.create(null);
ut.tween.TweenLoopStorageView.prototype.constructor = ut.tween.TweenLoopStorageView;
Object.defineProperties(ut.tween.TweenLoopStorageView.prototype, {
  loopType: {
    get: function() { return HEAP32[(this._ptr+0)>>2]; },
    set: function(v) { HEAP32[(this._ptr+0)>>2] = v; },
  },
  loopIndex: {
    get: function() { return HEAP32[(this._ptr+4)>>2]; },
    set: function(v) { HEAP32[(this._ptr+4)>>2] = v; },
  },
  loopCount: {
    get: function() { return HEAP32[(this._ptr+8)>>2]; },
    set: function(v) { HEAP32[(this._ptr+8)>>2] = v; },
  },
});
ut.tween.TweenLoop = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenLoopStorageView();
};
ut.tween.TweenLoop.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenLoop.prototype.constructor = ut.tween.TweenLoop;
Object.defineProperties(ut.tween.TweenLoop, { cid: { configurable: true, get: function() { delete ut.tween.TweenLoop.cid; return ut.tween.TweenLoop.cid = Module._ut_component_register_cid(12, 4, 0, 0/*"ut::tween::TweenLoop"*/, 0); } } });
ut.tween.TweenLoop.prototype.loopType = function() {
  this._view._ptr = this._getRawPtr(); return this._view.loopType;
};
ut.tween.TweenLoop.prototype.setLoopType = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.loopType = v; this.setDirty();
};
ut.tween.TweenLoop.prototype.loopIndex = function() {
  this._view._ptr = this._getRawPtr(); return this._view.loopIndex;
};
ut.tween.TweenLoop.prototype.setLoopIndex = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.loopIndex = v; this.setDirty();
};
ut.tween.TweenLoop.prototype.loopCount = function() {
  this._view._ptr = this._getRawPtr(); return this._view.loopCount;
};
ut.tween.TweenLoop.prototype.setLoopCount = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.loopCount = v; this.setDirty();
};
ut.tween.TweenDelayStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenDelayStorageView.prototype = Object.create(null);
ut.tween.TweenDelayStorageView.prototype.constructor = ut.tween.TweenDelayStorageView;
Object.defineProperties(ut.tween.TweenDelayStorageView.prototype, {
  time: {
    get: function() { return HEAPF32[(this._ptr+0)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+0)>>2] = v; },
  },
  delay: {
    get: function() { return HEAPF32[(this._ptr+4)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+4)>>2] = v; },
  },
});
ut.tween.TweenDelay = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenDelayStorageView();
};
ut.tween.TweenDelay.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenDelay.prototype.constructor = ut.tween.TweenDelay;
Object.defineProperties(ut.tween.TweenDelay, { cid: { configurable: true, get: function() { delete ut.tween.TweenDelay.cid; return ut.tween.TweenDelay.cid = Module._ut_component_register_cid(8, 4, 0, 0/*"ut::tween::TweenDelay"*/, 0); } } });
ut.tween.TweenDelay.prototype.time = function() {
  this._view._ptr = this._getRawPtr(); return this._view.time;
};
ut.tween.TweenDelay.prototype.setTime = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.time = v; this.setDirty();
};
ut.tween.TweenDelay.prototype.delay = function() {
  this._view._ptr = this._getRawPtr(); return this._view.delay;
};
ut.tween.TweenDelay.prototype.setDelay = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.delay = v; this.setDirty();
};
ut.tween.TweenColorStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenColorStorageView.prototype = Object.create(null);
ut.tween.TweenColorStorageView.prototype.constructor = ut.tween.TweenColorStorageView;
Object.defineProperties(ut.tween.TweenColorStorageView.prototype, {
  start: {
    get: function() { return ut.Core2D.Color._fromPtr(this._ptr+0); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut.Core2D.Color._toPtr(this._ptr+0, v); },
  },
  end: {
    get: function() { return ut.Core2D.Color._fromPtr(this._ptr+16); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut.Core2D.Color._toPtr(this._ptr+16, v); },
  },
});
ut.tween.TweenColor = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenColorStorageView();
};
ut.tween.TweenColor.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenColor.prototype.constructor = ut.tween.TweenColor;
Object.defineProperties(ut.tween.TweenColor, { cid: { configurable: true, get: function() { delete ut.tween.TweenColor.cid; return ut.tween.TweenColor.cid = Module._ut_component_register_cid(32, 4, 0, 0/*"ut::tween::TweenColor"*/, 0); } } });
ut.tween.TweenColor.prototype.start = function() {
  this._view._ptr = this._getRawPtr(); return this._view.start;
};
ut.tween.TweenColor.prototype.setStart = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.start = v; this.setDirty();
};
ut.tween.TweenColor.prototype.end = function() {
  this._view._ptr = this._getRawPtr(); return this._view.end;
};
ut.tween.TweenColor.prototype.setEnd = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.end = v; this.setDirty();
};
ut.tween.TweenVector3StorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenVector3StorageView.prototype = Object.create(null);
ut.tween.TweenVector3StorageView.prototype.constructor = ut.tween.TweenVector3StorageView;
Object.defineProperties(ut.tween.TweenVector3StorageView.prototype, {
  start: {
    get: function() { return ut._utils.vec3FromHeap(null, this._ptr+0); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut._utils.vec3ToHeap(v, this._ptr+0); },
  },
  end: {
    get: function() { return ut._utils.vec3FromHeap(null, this._ptr+12); },
    set: function(v) { if (typeof(v) !== 'object') { throw new Error('expected an object'); } ut._utils.vec3ToHeap(v, this._ptr+12); },
  },
});
ut.tween.TweenVector3 = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenVector3StorageView();
};
ut.tween.TweenVector3.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenVector3.prototype.constructor = ut.tween.TweenVector3;
Object.defineProperties(ut.tween.TweenVector3, { cid: { configurable: true, get: function() { delete ut.tween.TweenVector3.cid; return ut.tween.TweenVector3.cid = Module._ut_component_register_cid(24, 4, 0, 0/*"ut::tween::TweenVector3"*/, 0); } } });
ut.tween.TweenVector3.prototype.start = function() {
  this._view._ptr = this._getRawPtr(); return this._view.start;
};
ut.tween.TweenVector3.prototype.setStart = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.start = v; this.setDirty();
};
ut.tween.TweenVector3.prototype.end = function() {
  this._view._ptr = this._getRawPtr(); return this._view.end;
};
ut.tween.TweenVector3.prototype.setEnd = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.end = v; this.setDirty();
};
ut.tween.TweenFloatStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenFloatStorageView.prototype = Object.create(null);
ut.tween.TweenFloatStorageView.prototype.constructor = ut.tween.TweenFloatStorageView;
Object.defineProperties(ut.tween.TweenFloatStorageView.prototype, {
  start: {
    get: function() { return HEAPF32[(this._ptr+0)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+0)>>2] = v; },
  },
  end: {
    get: function() { return HEAPF32[(this._ptr+4)>>2]; },
    set: function(v) { HEAPF32[(this._ptr+4)>>2] = v; },
  },
});
ut.tween.TweenFloat = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenFloatStorageView();
};
ut.tween.TweenFloat.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenFloat.prototype.constructor = ut.tween.TweenFloat;
Object.defineProperties(ut.tween.TweenFloat, { cid: { configurable: true, get: function() { delete ut.tween.TweenFloat.cid; return ut.tween.TweenFloat.cid = Module._ut_component_register_cid(8, 4, 0, 0/*"ut::tween::TweenFloat"*/, 0); } } });
ut.tween.TweenFloat.prototype.start = function() {
  this._view._ptr = this._getRawPtr(); return this._view.start;
};
ut.tween.TweenFloat.prototype.setStart = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.start = v; this.setDirty();
};
ut.tween.TweenFloat.prototype.end = function() {
  this._view._ptr = this._getRawPtr(); return this._view.end;
};
ut.tween.TweenFloat.prototype.setEnd = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.end = v; this.setDirty();
};
ut.tween.TweenSequenceStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenSequenceStorageView.prototype = Object.create(null);
ut.tween.TweenSequenceStorageView.prototype.constructor = ut.tween.TweenSequenceStorageView;
Object.defineProperties(ut.tween.TweenSequenceStorageView.prototype, {
  index: {
    get: function() { return HEAP32[(this._ptr+0)>>2]; },
    set: function(v) { HEAP32[(this._ptr+0)>>2] = v; },
  },
});
ut.tween.TweenSequence = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenSequenceStorageView();
};
ut.tween.TweenSequence.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenSequence.prototype.constructor = ut.tween.TweenSequence;
Object.defineProperties(ut.tween.TweenSequence, { cid: { configurable: true, get: function() { delete ut.tween.TweenSequence.cid; return ut.tween.TweenSequence.cid = Module._ut_component_register_cid(4, 4, 0, 0/*"ut::tween::TweenSequence"*/, 0); } } });
ut.tween.TweenSequence.prototype.index = function() {
  this._view._ptr = this._getRawPtr(); return this._view.index;
};
ut.tween.TweenSequence.prototype.setIndex = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.index = v; this.setDirty();
};
ut.tween.TweenOnCompleteStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.tween.TweenOnCompleteStorageView.prototype = Object.create(null);
ut.tween.TweenOnCompleteStorageView.prototype.constructor = ut.tween.TweenOnCompleteStorageView;
Object.defineProperties(ut.tween.TweenOnCompleteStorageView.prototype, {
  padding: {
    get: function() { return HEAP8[this._ptr+0]; },
    set: function(v) { HEAP8[this._ptr+0] = v; },
  },
});
ut.tween.TweenOnComplete = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.tween.TweenOnCompleteStorageView();
};
ut.tween.TweenOnComplete.prototype = Object.create(ut.Component.prototype);
ut.tween.TweenOnComplete.prototype.constructor = ut.tween.TweenOnComplete;
Object.defineProperties(ut.tween.TweenOnComplete, { cid: { configurable: true, get: function() { delete ut.tween.TweenOnComplete.cid; return ut.tween.TweenOnComplete.cid = Module._ut_component_register_cid(1, 1, 0, 0/*"ut::tween::TweenOnComplete"*/, 0); } } });
ut.tween.TweenOnComplete.prototype.padding = function() {
  this._view._ptr = this._getRawPtr(); return this._view.padding;
};
ut.tween.TweenOnComplete.prototype.setPadding = function(v) {
  this._view._ptr = this._getRawPtr(); this._view.padding = v; this.setDirty();
};
ut.Core2D.layers.DefaultStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.Core2D.layers.DefaultStorageView.prototype = Object.create(null);
ut.Core2D.layers.DefaultStorageView.prototype.constructor = ut.Core2D.layers.DefaultStorageView;
Object.defineProperties(ut.Core2D.layers.DefaultStorageView.prototype, {
});
ut.Core2D.layers.Default = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.Core2D.layers.DefaultStorageView();
};
ut.Core2D.layers.Default.prototype = Object.create(ut.Component.prototype);
ut.Core2D.layers.Default.prototype.constructor = ut.Core2D.layers.Default;
Object.defineProperties(ut.Core2D.layers.Default, { cid: { configurable: true, get: function() { delete ut.Core2D.layers.Default.cid; return ut.Core2D.layers.Default.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"ut::Core2D::layers::Default"*/, 0); } } });
ut.Core2D.layers.TransparentFXStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.Core2D.layers.TransparentFXStorageView.prototype = Object.create(null);
ut.Core2D.layers.TransparentFXStorageView.prototype.constructor = ut.Core2D.layers.TransparentFXStorageView;
Object.defineProperties(ut.Core2D.layers.TransparentFXStorageView.prototype, {
});
ut.Core2D.layers.TransparentFX = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.Core2D.layers.TransparentFXStorageView();
};
ut.Core2D.layers.TransparentFX.prototype = Object.create(ut.Component.prototype);
ut.Core2D.layers.TransparentFX.prototype.constructor = ut.Core2D.layers.TransparentFX;
Object.defineProperties(ut.Core2D.layers.TransparentFX, { cid: { configurable: true, get: function() { delete ut.Core2D.layers.TransparentFX.cid; return ut.Core2D.layers.TransparentFX.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"ut::Core2D::layers::TransparentFX"*/, 0); } } });
ut.Core2D.layers.IgnoreRaycastStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.Core2D.layers.IgnoreRaycastStorageView.prototype = Object.create(null);
ut.Core2D.layers.IgnoreRaycastStorageView.prototype.constructor = ut.Core2D.layers.IgnoreRaycastStorageView;
Object.defineProperties(ut.Core2D.layers.IgnoreRaycastStorageView.prototype, {
});
ut.Core2D.layers.IgnoreRaycast = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.Core2D.layers.IgnoreRaycastStorageView();
};
ut.Core2D.layers.IgnoreRaycast.prototype = Object.create(ut.Component.prototype);
ut.Core2D.layers.IgnoreRaycast.prototype.constructor = ut.Core2D.layers.IgnoreRaycast;
Object.defineProperties(ut.Core2D.layers.IgnoreRaycast, { cid: { configurable: true, get: function() { delete ut.Core2D.layers.IgnoreRaycast.cid; return ut.Core2D.layers.IgnoreRaycast.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"ut::Core2D::layers::IgnoreRaycast"*/, 0); } } });
ut.Core2D.layers.WaterStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.Core2D.layers.WaterStorageView.prototype = Object.create(null);
ut.Core2D.layers.WaterStorageView.prototype.constructor = ut.Core2D.layers.WaterStorageView;
Object.defineProperties(ut.Core2D.layers.WaterStorageView.prototype, {
});
ut.Core2D.layers.Water = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.Core2D.layers.WaterStorageView();
};
ut.Core2D.layers.Water.prototype = Object.create(ut.Component.prototype);
ut.Core2D.layers.Water.prototype.constructor = ut.Core2D.layers.Water;
Object.defineProperties(ut.Core2D.layers.Water, { cid: { configurable: true, get: function() { delete ut.Core2D.layers.Water.cid; return ut.Core2D.layers.Water.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"ut::Core2D::layers::Water"*/, 0); } } });
ut.Core2D.layers.UIStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.Core2D.layers.UIStorageView.prototype = Object.create(null);
ut.Core2D.layers.UIStorageView.prototype.constructor = ut.Core2D.layers.UIStorageView;
Object.defineProperties(ut.Core2D.layers.UIStorageView.prototype, {
});
ut.Core2D.layers.UI = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.Core2D.layers.UIStorageView();
};
ut.Core2D.layers.UI.prototype = Object.create(ut.Component.prototype);
ut.Core2D.layers.UI.prototype.constructor = ut.Core2D.layers.UI;
Object.defineProperties(ut.Core2D.layers.UI, { cid: { configurable: true, get: function() { delete ut.Core2D.layers.UI.cid; return ut.Core2D.layers.UI.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"ut::Core2D::layers::UI"*/, 0); } } });
ut.Core2D.layers.PostProcessingStorageView = function(ptr) {
  this._ptr = ptr;
};
ut.Core2D.layers.PostProcessingStorageView.prototype = Object.create(null);
ut.Core2D.layers.PostProcessingStorageView.prototype.constructor = ut.Core2D.layers.PostProcessingStorageView;
Object.defineProperties(ut.Core2D.layers.PostProcessingStorageView.prototype, {
});
ut.Core2D.layers.PostProcessing = function(w, e) {
  this._w = w;
  this._e = e;
  this._view = new ut.Core2D.layers.PostProcessingStorageView();
};
ut.Core2D.layers.PostProcessing.prototype = Object.create(ut.Component.prototype);
ut.Core2D.layers.PostProcessing.prototype.constructor = ut.Core2D.layers.PostProcessing;
Object.defineProperties(ut.Core2D.layers.PostProcessing, { cid: { configurable: true, get: function() { delete ut.Core2D.layers.PostProcessing.cid; return ut.Core2D.layers.PostProcessing.cid = Module._ut_component_register_cid(0, 0, 3, 0/*"ut::Core2D::layers::PostProcessing"*/, 0); } } });
game.BoardRefillSystem = ut.System.define({
  name: "game.BoardRefillSystem"
 ,updatesAfter: ["game.BoardCollapseSystem"]
});
game.GemDragSystem = ut.System.define({
  name: "game.GemDragSystem"
 ,updatesAfter: ["UTiny.HTML.InputHandler"]
});
game.CreateMatchSystem = ut.System.define({
  name: "game.CreateMatchSystem"
});
game.BoardCollapseSystem = ut.System.define({
  name: "game.BoardCollapseSystem"
 ,updatesAfter: ["game.BoardSpawnSystem"]
});
game.BoardSpawnSystem = ut.System.define({
  name: "game.BoardSpawnSystem"
 ,updatesAfter: ["game.CellGraphSystem"]
});
game.DestroyMatchSystem = ut.System.define({
  name: "game.DestroyMatchSystem"
 ,updatesAfter: ["game.CreateMatchSystem"]
});
game.CellGraphNodeRegisterSystem = ut.System.define({
  name: "game.CellGraphNodeRegisterSystem"
 ,updatesAfter: ["game.CellGraphSystem"]
});
game.CellGraphSystem = ut.System.define({
  name: "game.CellGraphSystem"
 ,updatesBefore: ["UTiny.Core2D.RenderingFence"]
});
game.ParticleEmitterSystem = ut.System.define({
  name: "game.ParticleEmitterSystem"
});
game.SlashEffectSystem = ut.System.define({
  name: "game.SlashEffectSystem"
});
game.DragonSystem = ut.System.define({
  name: "game.DragonSystem"
});
ut.tween.TweenVector3System = ut.System.define({
  name: "ut.tween.TweenVector3System"
 ,updatesBefore: ["ut.tween.TweenLoopSystem"]
 ,updatesAfter: ["ut.tween.TweenEaseSystem"]
});
ut.tween.TweenTimeSystem = ut.System.define({
  name: "ut.tween.TweenTimeSystem"
 ,updatesAfter: ["ut.tween.TweenDelaySystem"]
});
ut.tween.TweenEaseSystem = ut.System.define({
  name: "ut.tween.TweenEaseSystem"
 ,updatesAfter: ["ut.tween.TweenTimeSystem"]
});
ut.tween.TweenDelaySystem = ut.System.define({
  name: "ut.tween.TweenDelaySystem"
 ,updatesAfter: ["ut.tween.TweenSequenceStartSystem"]
});
ut.tween.TweenLoopSystem = ut.System.define({
  name: "ut.tween.TweenLoopSystem"
 ,updatesBefore: ["ut.tween.TweenSequenceEndSystem"]
 ,updatesAfter: ["ut.tween.TweenEaseSystem"]
});
ut.tween.TweenDestroySystem = ut.System.define({
  name: "ut.tween.TweenDestroySystem"
 ,updatesBefore: ["UTiny.Core2D.RenderingFence"]
});
ut.tween.TweenColorSystem = ut.System.define({
  name: "ut.tween.TweenColorSystem"
 ,updatesBefore: ["ut.tween.TweenLoopSystem"]
 ,updatesAfter: ["ut.tween.TweenEaseSystem"]
});
ut.tween.TweenFloatSystem = ut.System.define({
  name: "ut.tween.TweenFloatSystem"
 ,updatesBefore: ["ut.tween.TweenLoopSystem"]
 ,updatesAfter: ["ut.tween.TweenEaseSystem"]
});
ut.tween.TweenSequenceEndSystem = ut.System.define({
  name: "ut.tween.TweenSequenceEndSystem"
 ,updatesBefore: ["ut.tween.TweenOnCompleteSystem"]
});
ut.tween.TweenOnCompleteSystem = ut.System.define({
  name: "ut.tween.TweenOnCompleteSystem"
 ,updatesBefore: ["ut.tween.TweenDestroySystem"]
});
ut.tween.TweenSequenceStartSystem = ut.System.define({
  name: "ut.tween.TweenSequenceStartSystem"
});


