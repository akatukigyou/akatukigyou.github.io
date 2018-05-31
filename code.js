"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* TINY GENERATED CODE, DO NOT EDIT BY HAND
* @project UTiny.Demo.DragonMatch
*/

game.BoardService = function () {};

game.BoardService.prototype = Object.create(null);
game.BoardService.prototype.constructor = game.BoardService;

/**
 * @method 
 * @desc Creates a new instance of a gem and sets up the intial state
 * @param {game.Cell} cell
 * @param {game.GemType} type
 * @returns {ut.Entity}
 */
game.BoardService.prototype.createGem = function (cell, type) {
    var group = ut.Flow.Service.instantiate("game.GemPrefab");
    var entity = group.root;

    // gem setup
    var gem = entity.getComponent(game.Gem);
    gem.setType(type);
    gem.setAnimating(false);

    // node setup
    var node = entity.getComponent(game.CellGraphNode);
    node.setCell(cell);
    Graph.addNode(cell, entity);

    // renderer setup
    var renderer = entity.getComponent(ut.Sprite2DRenderer);
    /*
    var color = null;
     switch (type) {
        case game.GemType.Red:
            color = new ut.Core2D.Color(1, 0, 0, 1);
            break;
        case game.GemType.Green:
            color = new ut.Core2D.Color(0, 1, 0, 1);
            break;
        case game.GemType.Blue:
            color = new ut.Core2D.Color(0, 0, 1, 1);
            break;
        case game.GemType.Purple:
            color = new ut.Core2D.Color(1, 0, 1, 1);
            break;
    }
     renderer.setColor(color);
    */
    renderer.setSprite(gem.pieces()[type]);

    // transform setup
    var transform = entity.getComponent(ut.Core2D.Transform);
    transform.setLocalPosition(Graph.getPosition(cell));

    return entity;
};

/**
 * @system
 * @desc Spawns the initial board state
 */
game.BoardSpawnSystem.update = function (sched, world) {
    world.forEachEntity([game.Board, game.BoardSpawn], function (entity, board, spawn) {
        for (var x = 0; x < Graph.width; x++) {
            for (var y = 0; y < Graph.height; y++) {
                var cell = new game.Cell(x, y);
                if (null != Graph.getNode(cell)) {
                    continue;
                }

                // Select a random gem type
                var type = getRandomInt(0, 3);

                // @todo select a type that will not trigger a match

                var entity = Board.createGem(cell, type);

                entity.getComponent(game.Gem).setAnimating(true);
                entity.getComponent(ut.Core2D.Transform).tween("localScale", new Vector3(0, 0, 0), entity.getComponent(ut.Core2D.Transform).localScale()).setDuration(0.5).setEase(ut.tween.EaseType.EaseOutBack).onComplete(function (e) {
                    e.getComponent(game.Gem).setAnimating(false);
                }, entity);
            }
        }
        entity.removeComponent(game.BoardSpawn);
    });
};

/**
 * @method
 * @desc Returns all gems that match the given type along the x-axis for the given cell
 * @param {game.Cell} cell
 * @param {game.GemType} type
 * @returns {ut.Entity[]} entities
 */
game.BoardService.prototype.getHorizontalMatchingEntities = function (cell, type) {
    var entities = [];

    for (var x = cell.x + 1; x < Graph.width; x++) {
        var entity = Graph.getNode(new game.Cell(x, cell.y));
        if (null == entity) {
            break;
        }
        var gem = entity.getComponent(game.Gem);
        if (gem.animating()) {
            break;
        }
        if (gem.type() != type) {
            break;
        }
        entities.push(entity);
    }

    for (var x = cell.x - 1; x >= 0; x--) {
        var entity = Graph.getNode(new game.Cell(x, cell.y));
        if (null == entity) {
            break;
        }
        var gem = entity.getComponent(game.Gem);
        if (gem.animating()) {
            break;
        }
        if (gem.type() != type) {
            break;
        }
        entities.push(entity);
    }

    return entities;
};

/**
 * @method
 * @desc Returns all entities that match the given type along the y-axis for the given cell
 * @param {game.Cell} cell
 * @param {game.GemType} type
 * @returns {ut.Entity[]} entities
 */
game.BoardService.prototype.getVerticalMatchingEntities = function (cell, type) {
    var entities = [];

    for (var y = cell.y + 1; y < Graph.height; y++) {
        var entity = Graph.getNode(new game.Cell(cell.x, y));
        if (null == entity) {
            break;
        }
        var gem = entity.getComponent(game.Gem);
        if (gem.animating()) {
            break;
        }
        if (gem.type() != type) {
            break;
        }
        entities.push(entity);
    }

    for (var y = cell.y - 1; y >= 0; y--) {
        var entity = Graph.getNode(new game.Cell(cell.x, y));
        if (null == entity) {
            break;
        }
        var gem = entity.getComponent(game.Gem);
        if (gem.animating()) {
            break;
        }
        if (gem.type() != type) {
            break;
        }
        entities.push(entity);
    }

    return entities;
};

/**
 * @method
 * @desc Gets all entities that are a 'match' with the given cell and type using the given thresold (e.g. 3 for match3)
 * @param {game.Cell} cell
 * @param {game.GemType} type
 * @param {int32} threshold
 * @returns {ut.Entity[]} entities
 */
game.BoardService.prototype.getMatchingEntities = function (cell, type, threshold) {
    var entities = [];

    var horizontal = this.getHorizontalMatchingEntities(cell, type);
    if (horizontal.length >= threshold - 1) {
        entities = entities.concat(horizontal);
    }

    var vertical = this.getVerticalMatchingEntities(cell, type);
    if (vertical.length >= threshold - 1) {
        entities = entities.concat(vertical);
    }

    return entities;
};

/**
 * @method
 * @desc Returns a list of match entities that currently exist for the given gems
 * @param {ut.Entity[]} entities - Array of gem entities to query
 * @returns {ut.Entity[]} matches - Array of match entities
 */
game.BoardService.prototype.getExistingMatches = function (entities) {
    var matches = [];
    for (var i = 0; i < entities.length; i++) {
        var matched = entities[i].getComponent(game.Matched);
        if (null != matched) {
            matches.push(matched.match());
        }
    }
    return matches;
};

/**
 * @method
 * @desc Merges a collection of match entities to a single match object
 * @param {ut.Entity[]} matches - Collection of matches
 * @returns {ut.Entity} match Single match entity
 */
game.BoardService.prototype.mergeMatches = function (matches) {
    while (matches.length > 1) {
        var matchEntity = matches[0];
        var otherEntity = matches[1];

        if (matchEntity._mId == otherEntity._mId) {
            matches.splice(1, 1);
            continue;
        }

        var match = matchEntity.getComponent(game.Match);
        var other = otherEntity.getComponent(game.Match);

        var matchGems = match.gems();
        var otherGems = other.gems();

        for (var i = 0; i < otherGems.length; i++) {
            if (null != matchGems.find(function (e) {
                return e._mId == otherGems[i]._mId;
            })) {
                continue;
            }

            otherGems[i].getOrAddComponent(game.Matched).setMatch(matchEntity);

            matchGems.push(otherGems[i]);
        }

        match.setGems(matchGems);
        otherEntity.destroy();
        matches.splice(1, 1);
    }

    return matches[0];
};

/**
 * @system
 * @desc Computes all matches and creates match entities
 */
game.CreateMatchSystem.update = function (sched, world) {
    world.forEachEntity([game.Board], function (entity, board) {

        if (!Dragon.isAlive()) {
            // the dragon is dead, stop processing the board
            entity.removeComponent(game.Board);
        }

        for (var x = 0; x < Graph.width; x++) {
            for (var y = 0; y < Graph.height; y++) {
                var cell = new game.Cell(x, y);
                var entity = Graph.getNode(cell);

                if (null == entity) {
                    continue;
                }

                // Entities with a Matched component has already been processed
                if (entity.hasComponent(game.Matched)) {
                    continue;
                }

                var gem = entity.getComponent(game.Gem);

                // Ignore animating gems
                if (gem.animating()) {
                    continue;
                }

                var type = gem.type();

                // Get all adjacent gems that match our type IF there are 3 or more
                var matchedGemEntities = Board.getMatchingEntities(cell, type, 3);

                // Did we detect any sort of match?
                if (matchedGemEntities.length == 0) {
                    continue;
                }

                // If these entities are already part of a match fetch those entities
                var matchEntities = Board.getExistingMatches(matchedGemEntities);

                // Merge exiting matches down to a single match (since this new entity provides the link)
                // or generate a new match object
                var matchEntity = matchEntities.length > 0 ? Board.mergeMatches(matchEntities) : world.create();
                var match = matchEntity.getOrAddComponent(game.Match);
                var matchGems = match.gems();

                matchGems.push(entity);
                entity.getOrAddComponent(game.Matched).setMatch(matchEntity);

                for (var i = 0; i < matchedGemEntities.length; i++) {
                    if (null != matchGems.find(function (e) {
                        return e._mId == matchedGemEntities[i]._mId;
                    })) {
                        continue;
                    }

                    matchedGemEntities[i].getOrAddComponent(game.Matched).setMatch(matchEntity);
                    matchGems.push(matchedGemEntities[i]);
                }

                match.setGems(matchGems);
            }
        }
    });
};

/**
 * @system
 * @desc Collapses the board state
 */
game.BoardCollapseSystem.update = function (sched, world) {
    world.forEachEntity([game.Board], function (entity, board) {
        for (var x = 0; x < Graph.width; x++) {
            var dropDistance = 0;

            for (var y = 0; y < Graph.height; y++) {
                var cell = new game.Cell(x, y);
                var node = Graph.getNode(cell);

                if (null == node) {
                    dropDistance++;
                    continue;
                }

                if (dropDistance <= 0) {
                    continue;
                }

                var g = node.getComponent(game.Gem);

                if (g.animating()) {
                    break;
                }

                var t = node.getComponent(ut.Core2D.Transform);

                var c = new game.Cell(x, y - dropDistance);

                t.tween("localPosition", t.localPosition(), Graph.getPosition(c)).setDuration(0.5).setEase(ut.tween.EaseType.EaseOutBounce).onComplete(function (e) {
                    e.getComponent(game.Gem).setAnimating(false);
                }, node);

                g.setAnimating(true);

                var n = node.getComponent(game.CellGraphNode);
                n.setCell(c);
                Graph.removeNode(cell);
                Graph.addNode(c, node);
            }
        }
    });
};

game.BoardRefillSystem.update = function (sched, world) {
    world.forEachEntity([game.Board], function (entity, board) {
        for (var x = 0; x < Graph.width; x++) {
            for (var y = Graph.height - 1; y >= 0; y--) {
                var cell = new game.Cell(x, y);
                if (null != Graph.getNode(cell)) {
                    break;
                }

                // Select a random type
                var type = getRandomInt(0, 3);

                var entity = Board.createGem(cell, type);
                var transform = entity.getComponent(ut.Core2D.Transform);

                var start = Graph.getPosition(new game.Cell(cell.x, cell.y + Graph.height));
                var end = Graph.getPosition(cell);

                entity.getComponent(game.Gem).setAnimating(true);
                transform.tween("localPosition", start, end).setDuration(0.5).onComplete(function (e) {
                    e.getComponent(game.Gem).setAnimating(false);
                }, entity);
            }
        }
    });
};

var Board = new game.BoardService();

/**
 * @todo move to random class
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

game = game || {};

/**
 * @abstract
 * @class
 * @tutorial 4_game.GettingStarted
 */
game.GraphService = function () {
    this.position = new Vector2(0, 0);
    this.nodes = {};
};
game.GraphService.prototype = Object.create(null);
game.GraphService.prototype.constructor = game.GraphService;

/**
 * @method
 * @desc Clears all nodes from the graph
 */
game.GraphService.prototype.clear = function () {
    this.nodes = {};
};

/**
 * @extends game.GraphService
 * @class
 * @classdesc GraphService with a cell based layout of nodes (i.e. Grid)
 * @property {int32} width
 * @property {int32} height
 * @property {game.CellLayout} layout
 */
game.CellGraphService = function () {
    game.GraphService.prototype.constructor.call(this);
    this.width = 4;
    this.height = 4;
    this.layout = new game.CellLayout();
};
game.CellGraphService.prototype = Object.create(game.GraphService.prototype);
game.CellGraphService.prototype.constructor = game.CellGraphService;

/**
 * @method
 * @desc Converts the given world space position into a cell position 
 * @param {ut.Vector3} pos - World space position
 * @returns {ut.Vector2} Cell position
 */
game.CellGraphService.prototype.getCell = function (pos) {
    // convert to local graph space
    var p = new Vector2(pos.x - this.position.x, pos.y - this.position.y);

    // graph origin is the center, offset if needed
    if (this.width % 2 != 0) {
        p.x += this.layout.size.x * 0.5;
    }

    if (this.height % 2 != 0) {
        p.y += this.layout.size.y * 0.5;
    }

    // shift origin to bottom left
    p.x += this.width * this.layout.size.x * 0.5;
    p.y += this.height * this.layout.size.y * 0.5;

    // compute our cell
    var cell = new game.Cell(p.x / this.layout.size.x, p.y / this.layout.size.y).ceil();

    // @todo clamp function
    if (cell.x < 0) {
        cell.x = 0;
    } else if (cell.x >= this.width - 1) {
        cell.x = this.width - 1;
    }

    // @todo clamp function
    if (cell.y < 0) {
        cell.y = 0;
    } else if (cell.y >= this.height - 1) {
        cell.y = this.height - 1;
    }

    return cell;
};

/**
 * @method
 * @desc Converts the cell position to a world space position
 * @param {ut.Vector2} pos - Cell position
 * @returns {ut.Vector2} World space position
 */
game.CellGraphService.prototype.getPosition = function (cell) {
    var p = new Vector3(cell.x * this.layout.size.x, cell.y * this.layout.size.y, 0);

    if (this.width % 2 == 0) {
        p.x += this.layout.size.x * 0.5;
    }

    if (this.width % 2 == 0) {
        p.y += this.layout.size.y * 0.5;
    }

    p.x -= this.width * this.layout.size.x * 0.5;
    p.y -= this.height * this.layout.size.y * 0.5;

    p.x += this.position.x;
    p.y += this.position.y;
    p.z += this.position.z;

    return p;
};

/**
 * @method
 * @desc Add or overwrite a node at the given cell position
 * @param {ut.Vector2} cell - Cell position
 * @param {ut.Entity} node - Entity to store in the graph
 */
game.CellGraphService.prototype.addNode = function (cell, node) {
    var key = cell.getHashCode();
    this.nodes[key] = node;
};

/**
 * @method
 * @desc Removes the node for the given cell from the graph
 * @param {ut.Vector2} cell - Cell position
 */
game.CellGraphService.prototype.removeNode = function (cell) {
    var key = cell.getHashCode();
    if (!this.nodes.hasOwnProperty(key)) {
        return;
    }
    delete this.nodes[key];
};

/**
 * @method
 * @desc Returns the node for the given cell
 * @param {ut.Vector2} cell - Cell position
 * @returns {ut.Entity} Entity that was stored
 */
game.CellGraphService.prototype.getNode = function (cell) {
    var key = cell.getHashCode();
    if (!this.nodes.hasOwnProperty(key)) {
        return null;
    }
    return this.nodes[key];
};

/**
 * @method
 * @desc Computes the hash code for this cell
 * @returns {int32} computed hash
 */
game.Cell.prototype.getHashCode = function () {
    return this.x * 31 + this.y;
};

/**
 * @method
 * @desc Ceil the x and y properties
 */
game.Cell.prototype.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
};

/**
 * @type {game.CellGraphService}
 * @desc Singleton graph instance
 * @tutorial 4_game.GettingStarted
 */
var Graph = new game.CellGraphService();

game.DragonService = function () {};

game.DragonService.prototype = Object.create(null);
game.DragonService.prototype.constructor = game.DragonService;

game.DragonService.prototype.getDragonTransform = function () {
    return world.getByName('Dragon').getComponent(ut.Core2D.Transform);
};

game.DragonService.prototype.getDragon = function () {
    return world.getByName('Dragon').getComponent(game.Dragon);
};

game.DragonService.prototype.applyDamage = function (amount) {
    var dragon = Dragon.getDragon();
    if (dragon != null) {
        var newHealth = dragon.health();
        newHealth -= amount;
        dragon.setHealth(newHealth);
    }
};

game.DragonService.prototype.isAlive = function () {
    var dragon = Dragon.getDragon();
    if (dragon != null) {
        return dragon.health() > 0;
    }
    return false;
};

var Dragon = new game.DragonService();
ut.Flow = ut.Flow || {};

/**
 * @class
 * @classdesc A handle to a collection of instantiated entities. This can be used to keep track of multiple instances of the same group
 * @property {ut.Entity}   root     - The root entity for this group (entities[0])
 * @property {ut.Entity[]} entities - Entities belonging to this group instance
 */
ut.Flow.EntityGroup = function () {
    this.root = null;
    this.entities = [];
};
ut.Flow.EntityGroup.prototype = Object.create(null);
ut.Flow.EntityGroup.prototype.constructor = ut.Flow.EntityGroup;

/**
 * @method
 * @desc Destroys all entities for this group instance
 */
ut.Flow.EntityGroup.prototype.destroy = function () {
    for (var i = 0; i < this.entities.length; i++) {
        if (null != this.entities[i] && this.entities[i].valid()) {
            this.entities[i].destroy();
        }
    }

    this.root = null;
    this.entities = [];
};

ut.Flow.Service = {
    /**
     * @method
     * @desc Returns an entity group object by name
     * @param {string} name - Fully qualified group name
     */
    getEntityGroupData: function getEntityGroupData(name) {
        var parts = name.split('.');
        return parts.reduce(function (v, p) {
            return v[p];
        }, entities[parts.shift()]);
    },

    /**
     * @method
     * @desc Creates an instance of a scene and returns a scene handle
     * @param {string} name - EntityGroup name
     * @returns {ut.Flow.EntityGroup} EntityGroup handle
     */
    instantiate: function instantiate(name) {
        var group = new ut.Flow.EntityGroup();
        var data = this.getEntityGroupData(name);
        if (data == undefined) {
            throw "ut.Flow.Service.instantiate: No 'EntityGroup' was found with the name '" + name + "'";
        }
        group.entities = data.load(world);
        if (group.entities.length > 0) {
            group.root = group.entities[0];
        }
        return group;
    },

    /**
     * @method
     * @desc Destroys all entities belonging to a scene
     * @param {string} name - EntityGroup name
     */
    destroyAll: function destroyAll(name) {
        var ctype = this.getEntityGroupData(name).Component;
        // iterate over all entities that have this component and destroy them
        world.forEachEntity([ctype], function (entity, component) {
            entity.destroy();
        });
    }
};
ut.tween = ut.tween || {};

/**
 * @class
 * @classdesc Handles scheduling, creation and destruction of all tween entities.
 *            Use singleton {@link Tween} to access the API
 * @property {object}   defaults               - The default values for tweens
 * @property {boolean}  defaults.autoPlay=true - The default play state for tweens 
 * @property {duration} defaults.duration=1    - The default duration for any tweens
 * @tutorial 3_ut.tween.GettingStarted
 */
ut.tween.TweenService = function () {
    var self = this;
    this.defaults = {
        autoPlay: true,
        duration: 1
    };

    // internal type map
    // @todo refactor this to be a core feature
    this._types = {};
    this._tweens = {};
};
ut.tween.TweenService.prototype = Object.create(null);
ut.tween.TweenService.prototype.constructor = ut.tween.TweenService;

/**
 * @method
 * @desc Creates a new tween object
 * @returns {!ut.tween.Tweener}
 */
ut.tween.TweenService.prototype.create = function () {
    var tween = new ut.tween.Tweener(this).setDuration(this.defaults.duration);

    if (this.defaults.autoPlay) {
        tween.play();
    }

    return tween;
};

/**
 * @method
 * @desc Creates a new sequence object
 * @returns {!ut.tween.Sequence}
 */
ut.tween.TweenService.prototype.sequence = function () {
    var sequence = new ut.tween.Sequence(this).setDuration(1);

    sequence.entity.addComponent(ut.tween.TweenSequence);

    if (this.defaults.autoPlay) {
        sequence.play();
    }

    return sequence;
};

/**
 * @method
 * @desc Destroys the given tween object
 * @param {ut.tween.Tween} tween - The tween object to destroy
 */
ut.tween.TweenService.prototype.destroy = function (tween) {
    delete this._tweens[tween.id];
    tween.entity.destroy();
    tween.entity = null;
};

/**
 * @method
 * @desc Gets a tween based on it's tween id
 * @param {int} id - The id for the tween object
 */
ut.tween.TweenService.prototype.getById = function (id) {
    return this._tweens[id];
};

/**
 * @method
 * @desct Gets all tweens for the given entity
 * @param {ut.Entity} entity - The target entity
 * @returns {Array.<ut.tween.Tween>}
 */
ut.tween.TweenService.prototype.getByTarget = function (entity) {
    var result = [];
    for (var id in this._tweens) {
        var tween = this._tweens[id];
        var target = tween.target();
        if (null == target) {
            continue;
        }
        if (target.mId == entity.mId) {
            result.push(tween);
        }
    }
    return result;
};

/**
 * @method
 * @desc Destroys all tweens for the given entity
 * @param {ut.Entity} entity - The target entity
 */
ut.tween.TweenService.prototype.destroyAll = function (entity) {
    var tweens = Tween.getByTarget(entity);
    for (var tween in tweens) {
        Tween.destroy(tweens[tween]);
    }
};

/**
 * @abstract
 * @class
 * @classdesc Base class used by Tweeners and Sequences
 * @param {ut.tween.TweenService}
 */
ut.tween.Tween = function (service) {
    this.service = service;
    this.entity = world.create("ut.tween");
    this.service._tweens[this.entity.mId] = this;
    this.onCompleteCallbacks = [];
};
ut.tween.Tween.prototype = Object.create(null);
ut.tween.Tween.prototype.constructor = ut.tween.Tween;

/**
 * @abtract
 * @method
 * @desc Gets the target for the tween if any
 * @returns {ut.Entity} The target for the tween (if any)
 */
ut.tween.Tween.prototype.target = function () {
    return null;
};

/**
 * @method
 * @desc Sets the delay for the tween
 * @param {float} delay - Delay in seconds
 * @returns {ut.tween.Tween} self
 */
ut.tween.Tween.prototype.setDelay = function (delay) {
    var c = this.entity.getOrAddComponent(ut.tween.TweenDelay);
    c.setDelay(delay);
    return this;
};

/**
 * @method
 * @desc Sets the duration for the tween
 * @param {float} duration - Duration in seconds
 * @returns {ut.tween.Tween} self
 */
ut.tween.Tween.prototype.setDuration = function (duration) {
    if (duration <= 0) {
        throw 'Tween.setDuration: duration must be greater than 0';
    }
    var c = this.entity.getOrAddComponent(ut.tween.TweenTime);
    c.setDuration(duration);
    return this;
};

/**
 * @method
 * @desc Sets the loopType for the tween
 * @param {ut.tween.LoopType} loopType   - Loop type for the loop
 * @param {int} loopCount       - Number of loops (-1 for infinite)
 * @returns {ut.tween.Tween} self
 */
ut.tween.Tween.prototype.setLoop = function (loopType) {
    var loopCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    if (loopType == ut.tween.LoopType.None) {
        if (this.entity.hasComponent(ut.tween.TweenLoop)) {
            entity.removeComponent(ut.tween.TweenLoop);
        }
        return this;
    }

    var c = this.entity.getOrAddComponent(ut.tween.TweenLoop);
    c.setLoopType(loopType);
    c.setLoopCount(loopCount);
    return this;
};

/**
 * @method
 * @desc Returns true is the tween has completed
 * @returns {boolean}
 */
ut.tween.Tween.prototype.isDone = function () {
    var c = this.entity.getComponent(ut.tween.TweenTime);
    return c.time() >= c.duration();
};

/**
 * @method
 * @desc Plays the tween
 * @returns {ut.tween.Tween} self
 */
ut.tween.Tween.prototype.play = function () {
    var c = this.entity.getOrAddComponent(ut.tween.TweenPlay);
    return this;
};

/**
 * @method
 * @desc Stop the tween
 * @returns {ut.tween.Tween} self
 */
ut.tween.Tween.prototype.stop = function () {
    if (this.entity.hasComponent(ut.tween.TweenPlay)) {
        world.removeComponentId(this.entity.mId, ut.tween.TweenPlay.cid);
    }
    return this;
};

/**
 * @method
 * @desc Registers a callback to be invoked when the tween completes
 * @param {function} callback - Callback to be invoked
 * @returns {ut.tween.Tween} self
 */
ut.tween.Tween.prototype.onComplete = function (callback, args) {
    var c = this.entity.getOrAddComponent(ut.tween.TweenOnComplete);
    this.onCompleteCallbacks.push({ callback: callback, args: args });
    return this;
};

/**
 * @extends ut.tween.Tween
 * @class
 * @classdesc Sequence represents a chain of tweens that can be execution sequentially or in parallel
 * @param {ut.tween.TweenService} service - TweenService that this tween belongs to
 */
ut.tween.Sequence = function (service) {
    ut.tween.Tween.prototype.constructor.call(this, service);
    this._and = [];
    this._then = [];
};
ut.tween.Sequence.prototype = Object.create(ut.tween.Tween.prototype);
ut.tween.Sequence.prototype.constructor = ut.tween.Sequence;

/**
 * @method
 * @desc Appends the given tween to the end of sequence
 * @params {ut.tween.Tween} tween - The Tween to add
 * @returns {ut.tween.Sequence} self
 */
ut.tween.Sequence.prototype.then = function (tween) {
    this._then.push(tween.stop());
    return this;
};

/**
* @method
* @desc Sets the given tween to run in parallel with the sequence
* @params {ut.tween.Tween} tween - The Tween to add
* @returns {ut.tween.Sequence} self
*/
ut.tween.Sequence.prototype.and = function (tween) {
    this._and.push(tween.stop());
    return this;
};

/**
 * @extends ut.tween.Tween
 * @class
 * @classdesc Tweener takes control of a value and animates it
 * @param {ut.tween.TweenService} service - TweenService that this tween belongs to
 */
ut.tween.Tweener = function (service) {
    ut.tween.Tween.prototype.constructor.call(this, service);
};
ut.tween.Tweener.prototype = Object.create(ut.tween.Tween.prototype);
ut.tween.Tweener.prototype.constructor = ut.tween.Tweener;

Object.defineProperty(ut.tween.Tweener.prototype, 'id', {
    get: function get() {
        return this.entity.mId;
    }
});

/**
 * @method
 * @desc Sets the {@link ut.tween.EaseType} for the tween
 * @params {ut.tween.EaseType} easeType - The easeType set set
 * @returns {ut.tween.Tweener} self
 */
ut.tween.Tweener.prototype.setEase = function (easeType) {
    var c = this.entity.getOrAddComponent(ut.tween.TweenEase);
    c.setEaseType(easeType);
    return this;
};

/**
 * @method
 * @desc Gets the target for the tween if any
 * @returns {ut.Entity} The target for the tween (if any)
 */
ut.tween.Tweener.prototype.target = function () {
    if (null == this.entity) {
        return null;
    }

    if (!this.entity.hasComponent(ut.tween.TweenTarget)) {
        return null;
    }

    var c = this.entity.getComponent(ut.tween.TweenTarget);
    return c.entity();
};

/**
 * @method
 * @desc Sets the target for the tween
 * @param {ut.Entity} entity    - The target entity
 * @param {function}  component - The component type
 * @param {string}    property  - The property name
 * @returns {ut.tween.Tweener} self
 */
ut.tween.Tweener.prototype.setTarget = function (entity, component, property) {
    // @temp until ctypes are registered
    this.service._types[component.cid] = component;

    var c = this.entity.getOrAddComponent(ut.tween.TweenTarget);
    c.setEntity(entity);
    c.setComponent(component.cid);
    c.setProperty(property);

    return this;
};

/**
 * @method
 * @desc Set the start and end float
 * @param {float} start - The start value
 * @param {float} end   - The end value
 * @returns {ut.tween.Tweener} self
 */
ut.tween.Tweener.prototype.setFloat = function (start, end) {
    var c = this.entity.getOrAddComponent(ut.tween.TweenFloat);
    c.setStart(start);
    c.setEnd(end);
    return this;
};

/**
 * @method
 * @desc Set the start and end vector
 * @param {Vector3} start - The start value
 * @param {Vector3} end   - The end value
 * @returns {ut.tween.Tweener} self
 */
ut.tween.Tweener.prototype.setVector3 = function (start, end) {
    var c = this.entity.getOrAddComponent(ut.tween.TweenVector3);
    c.setStart(start);
    c.setEnd(end);
    return this;
};

/**
 * @method
 * @desc Set the start and end color
 * @param {Color} start - The start value
 * @param {Color} end   - The end value
 * @returns {ut.tween.Tweener} self
 */
ut.tween.Tweener.prototype.setColor = function (start, end) {
    var c = this.entity.getOrAddComponent(ut.tween.TweenColor);
    c.setStart(start);
    c.setEnd(end);
    return this;
};

/**
 * @method
 * @desc Creates a new sequence with self (enqueued) and the given tween (enqueued)
 * @param {ut.tween.Tween} tween - The tween to chain
 * @returns {ut.tween.Sequence} The newly created sequence
 */
ut.tween.Tweener.prototype.then = function (tween) {
    return Tween.sequence().then(this).then(tween);
};

/**
 * @method
 * @desc Creates a new sequence with self (enqueued) and the given tween (parallelized)
 * @param {ut.tween.Tween} tween - The tween to chain
 * @returns {ut.tween.Sequence} The newly created sequence
 */
ut.tween.Tweener.prototype.and = function (tween) {
    return Tween.sequence().then(this).and(tween);
};

/**
 * @type {ut.tween.TweenService}
 * @desc Singleton tween instance
 * @tutorial 3_ut.tween.GettingStarted
 */
var Tween = new ut.tween.TweenService();

/**
 * Moves the transform to {position}
 */
ut.Core2D.Transform.prototype.tweenLocalPosition = function (position) {
    var entity = new ut.Entity(world.ptr, this._e);
    return Tween.create().setTarget(entity, ut.Core2D.Transform, 'localPosition').setVector3(this.localPosition(), position);
};

/**
 * Moves the transform.localPosition.x to {value}
 */
ut.Core2D.Transform.prototype.tweenLocalX = function (value) {
    var entity = new ut.Entity(world.ptr, this._e);
    return Tween.create().setTarget(entity, ut.Core2D.Transform, 'localPosition.x').setFloat(this.localPosition().x, value);
};

/**
 * Moves the transform.localPosition.y to {value}
 */
ut.Core2D.Transform.prototype.tweenLocalY = function (value) {
    var entity = new ut.Entity(world.ptr, this._e);
    return Tween.create().setTarget(entity, ut.Core2D.Transform, 'localPosition.y').setFloat(this.localPosition().y, value);
};

/**
 * Rotates the transform to {rotation}
 */
ut.Core2D.Transform.prototype.tweenLocalRotation = function (rotation) {
    throw 'tweenLocalRotation not implemented';
};

/**
 * Scales the transform to {scale}
 */
ut.Core2D.Transform.prototype.tweenLocalScale = function (scale) {
    var entity = new ut.Entity(world.ptr, this._e);
    return Tween.create().setTarget(entity, ut.Core2D.Transform, 'localScale').setVector3(this.localScale(), scale, true);
};

/**
 * @method
 * @desc Tweens the given property from start to end
 * @param {string} property - Property name path
 * @param {object} start - Start value
 * @param {object} end - End value
 * @returns {ut.tween.Tween}
 * @example transform.tween('localPosition.x', 0, 10);
 * @tutorial 3_ut.tween.GettingStarted
 */
ut.Component.prototype.tween = function (property, start, end) {
    var entity = new ut.Entity(world.ptr, this._e);
    var ctype = Object.getPrototypeOf(this).constructor;

    var tween = Tween.create().setTarget(entity, ctype, property).play();

    // @todo use rtti to determine fieldType and fieldOffset
    var component = entity.getComponent(ctype);
    var e = property.split('.');

    var value = e.reduce(function (v, p) {
        return v[p];
    }, component[e.shift()]());

    // @todo assert that start and end match the property being tweened
    switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
        case "number":
            // @hack We have no idea the real type for this number
            // {uint8} {int32} {float32} etc. assume float32 for now
            tween.setFloat(start, end);
            break;

        case "object":
            var type = Object.getPrototypeOf(value).constructor;

            switch (type) {
                case Vector3:
                    tween.setVector3(start, end);
                    break;
                case ut.Core2D.Color:
                    tween.setColor(start, end);
                    break;
                default:
                    throw 'tween: unsupported property type \'' + type.name + '\'';
            }
            break;
    }

    return tween;
};

ut.tween.Easing = {
    linear: function linear(t) {
        return t;
    },
    inQuad: function inQuad(t) {
        return t * t;
    },
    outQuad: function outQuad(t) {
        return t * (2 - t);
    },
    inOutQuad: function inOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    inCubic: function inCubic(t) {
        return t * t * t;
    },
    outCubic: function outCubic(t) {
        return --t * t * t + 1;
    },
    inOutCubic: function inOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    inQuart: function inQuart(t) {
        return t * t * t * t;
    },
    outQuart: function outQuart(t) {
        return 1 - --t * t * t * t;
    },
    inOutQuart: function inOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    inQuint: function inQuint(t) {
        return t * t * t * t * t;
    },
    outQuint: function outQuint(t) {
        return 1 + --t * t * t * t * t;
    },
    inOutQuint: function inOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
    inBack: function inBack(t) {
        var s = 1.70158;return t * t * ((s + 1) * t - s);
    },
    outBack: function outBack(t) {
        var s = 1.70158;return --t * t * ((s + 1) * t + s) + 1;
    },
    inOutBack: function inOutBack(t) {
        var s = 1.70158 * 1.525;if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    },
    inBounce: function inBounce(t) {
        return 1 - ut.tween.Easeing.outBounce(1 - t);
    },
    outBounce: function outBounce(t) {
        if (t < 1 / 2.75) {
            return t * t * 7.5625;
        } else if (t < 2 / 2.75) {
            t = t - 1.5 / 2.75;
            return t * t * 7.5625 + 0.75;
        } else if (t < 2.5 / 2.75) {
            t = t - 2.25 / 2.75;
            return t * t * 7.5625 + 0.9375;
        }

        t = t - 2.625 / 2.75;
        return t * t * 7.5625 + 0.984375;
    },
    inOutBounce: function inOutBounce(t) {
        t *= 2;
        if (t < 1) {
            return 0.5 * ut.tween.Easing.inBounce(t);
        }
        return 0.5 * ut.tween.Easing.outBounce(t - 1) + 0.5;
    },

    getFunction: function getFunction(type) {
        switch (type) {
            case ut.tween.EaseType.Linear:
                return ut.tween.Easing.linear;
            case ut.tween.EaseType.EaseInQuad:
                return ut.tween.Easing.inQuad;
            case ut.tween.EaseType.EaseOutQuad:
                return ut.tween.Easing.outQuad;
            case ut.tween.EaseType.EaseInOutQuad:
                return ut.tween.Easing.inOutQuad;
            case ut.tween.EaseType.EaseInCubic:
                return ut.tween.Easing.inCubic;
            case ut.tween.EaseType.EaseOutCubic:
                return ut.tween.Easing.outCubic;
            case ut.tween.EaseType.EaseInOutCubic:
                return ut.tween.Easing.inOutCubic;
            case ut.tween.EaseType.EaseInQuart:
                return ut.tween.Easing.inQuart;
            case ut.tween.EaseType.EaseOutQuart:
                return ut.tween.Easing.outQuart;
            case ut.tween.EaseType.EaseInOutQuart:
                return ut.tween.Easing.inOutQuart;
            case ut.tween.EaseType.EaseInQuint:
                return ut.tween.Easing.inQuint;
            case ut.tween.EaseType.EaseOutQuint:
                return ut.tween.Easing.outQuart;
            case ut.tween.EaseType.EaseInOutQuint:
                return ut.tween.Easing.inOutQuint;
            case ut.tween.EaseType.EaseInBack:
                return ut.tween.Easing.inBack;
            case ut.tween.EaseType.EaseOutBack:
                return ut.tween.Easing.outBack;
            case ut.tween.EaseType.EaseInOutBack:
                return ut.tween.Easing.inOutBack;
            case ut.tween.EaseType.EaseInBounce:
                return ut.tween.Easing.inBounce;
            case ut.tween.EaseType.EaseOutBounce:
                return ut.tween.Easing.outBounce;
            case ut.tween.EaseType.EaseInOutBounce:
                return ut.tween.Easing.inOutBounce;
        }
    }
};