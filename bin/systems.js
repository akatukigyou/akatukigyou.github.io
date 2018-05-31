"use strict";

/**
* TINY GENERATED CODE, DO NOT EDIT BY HAND
* @project UTiny.Demo.DragonMatch
*/

/**
 * @method
 * @desc System 
 * Components [{@link game.CellGraph}]
 * Execute Before [{@link ut.Core2D.RenderingFence}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.CellGraphSystem.update = function (sched, world) {
    world.forEachEntity([game.CellGraph], function (entity, cellgraph) {
        // @hack this should a singleton component
        // for now we bind the entity to a runtime js object (Graph)
        Graph.entity = entity;

        if (entity.hasComponent(ut.Core2D.Transform)) {
            Graph.position = entity.getComponent(ut.Core2D.Transform).localPosition();
        }

        Graph.width = cellgraph.width();
        Graph.height = cellgraph.height();
        Graph.layout = cellgraph.layout();
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.Core2D.Transform}, {@link game.Gem}]
 * Execute After [{@link ut.HTML.InputHandler}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.GemDragSystem.update = function (sched, world) {
    world.forEachEntity([ut.Core2D.Transform, game.Gem], function (entity, transform, gem) {

        var mouse = ut.Runtime.Input.getWorldInputPosition(world);

        if (ut.Runtime.Input.getMouseButtonDown(0)) {
            if (isMouseOverThisGem()) {
                gem.setDragStart(mouse);
                gem.setIsDragged(true);
            }
        } else if (ut.Runtime.Input.getMouseButton(0)) {
            if (gem.isDragged() && !gem.animating()) {
                var deltaX = mouse.x - gem.dragStart().x;
                var deltaY = mouse.y - gem.dragStart().y;

                var node = entity.getComponent(game.CellGraphNode);
                var nextCellEntity = null;
                var adjacentCell = node.cell();

                var dragResolved = false;

                if (deltaX < -10) {
                    // drag left
                    gem.setIsDragged(false);
                    adjacentCell.x--;
                    dragResolved = true;
                } else if (deltaX > 10) {
                    // drag right
                    gem.setIsDragged(false);
                    adjacentCell.x++;
                    dragResolved = true;
                } else if (deltaY < -10) {
                    // drag down
                    gem.setIsDragged(false);
                    adjacentCell.y--;
                    dragResolved = true;
                } else if (deltaY > 10) {
                    // drag up
                    gem.setIsDragged(false);
                    adjacentCell.y++;
                    dragResolved = true;
                }

                nextCellEntity = Graph.getNode(adjacentCell);

                if (dragResolved && nextCellEntity != null) {
                    var nextCellGem = nextCellEntity.getComponent(game.Gem);
                    if (nextCellGem != null && !nextCellGem.animating()) {
                        // swap cell values for the 2 nodes
                        var nextNode = nextCellEntity.getComponent(game.CellGraphNode);
                        var myCell = node.cell();
                        node.setCell(nextNode.cell());
                        nextNode.setCell(myCell);

                        // update the graph with the values
                        Graph.addNode(node.cell(), entity);
                        Graph.addNode(nextNode.cell(), nextCellEntity);

                        // animate them to their new positions
                        entity.getComponent(game.Gem).setAnimating(true);
                        nextCellEntity.getComponent(game.Gem).setAnimating(true);

                        transform.tween("localPosition", transform.localPosition(), Graph.getPosition(node.cell())).setDuration(0.5).setEase(ut.tween.EaseType.EaseOutBounce).onComplete(function (e) {
                            e.setAnimating(false);
                        }, gem);

                        var nextCellTransform = nextCellEntity.getComponent(ut.Core2D.Transform);
                        var targetPos = Graph.getPosition(nextNode.cell());
                        nextCellTransform.tween("localPosition", nextCellTransform.localPosition(), targetPos).setDuration(0.5).setEase(ut.tween.EaseType.EaseOutBounce).onComplete(function (e) {
                            e.setAnimating(false);
                        }, nextCellGem);
                    }
                }
            }
        }

        function isMouseOverThisGem() {
            var position = transform.localPosition();

            var xMin = position.x - Graph.layout.size.x * 0.5;
            var xMax = position.x + Graph.layout.size.x * 0.5;

            var yMin = position.y - Graph.layout.size.y * 0.5;
            var yMax = position.y + Graph.layout.size.y * 0.5;

            var mouse = ut.Runtime.Input.getWorldInputPosition(world);

            var x = mouse.x;
            var y = mouse.y;

            if (x > xMin && x < xMax && y > yMin && y < yMax) {
                return true;
            }
            return false;
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link game.Match}]
 * Execute After [{@link game.CreateMatchSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.DestroyMatchSystem.update = function (sched, world) {
    world.forEachEntity([game.Match], function (entity, match) {
        var gems = match.gems();

        for (var i = 0; i < gems.length; i++) {

            var gem = gems[i];
            gem.getComponent(game.Gem).setAnimating(true);

            var gemTransform = gem.getComponent(ut.Core2D.Transform);

            gemTransform.tween("localScale", gemTransform.localScale(), new Vector3(0, 0, 0)).setDuration(0.35).setEase(ut.tween.EaseType.EaseOutQuad).onComplete(function (e) {
                var cell = e.getComponent(game.CellGraphNode).cell();
                Graph.removeNode(cell);
                e.destroy();
            }, gem);

            // trigger particle effect
            var particleGroup = ut.Flow.Service.instantiate("game.ParticlePrefab");
            var particleEmitterEntity = particleGroup.root;
            var particleTransform = particleEmitterEntity.getComponent(ut.Core2D.Transform);
            var particleEmitter = particleEmitterEntity.getComponent(ut.Particles.ParticleEmitter);
            particleTransform.setLocalPosition(gemTransform.localPosition());

            var particleSprite = particleEmitter.particle().getComponent(ut.Core2D.Sprite2DRenderer);
            var color = null;

            switch (gem.getComponent(game.Gem).type()) {
                case game.GemType.Swirl:
                    color = new ut.Core2D.Color(1, 0, 0, 1);
                    break;
                case game.GemType.Circle:
                    color = new ut.Core2D.Color(0, 1, 0, 1);
                    break;
                case game.GemType.D20:
                    color = new ut.Core2D.Color(0, 0, 1, 1);
                    break;
                case game.GemType.Star:
                    color = new ut.Core2D.Color(.4, .6, .7, 1);
                    break;
            }
            particleSprite.setColor(color);

            var targetPos = Dragon.getDragonTransform().localPosition();

            particleTransform.tween("localPosition", particleTransform.localPosition(), targetPos).setDuration(1).setEase(ut.tween.EaseType.EaseInOutQuad).onComplete(function (e) {
                Dragon.applyDamage(1);
                spawnSlashEffect(targetPos);
                e.setEmitRate(0);
            }, particleEmitter);
        }

        entity.destroy();

        function spawnSlashEffect(targetPos) {
            var slashGroup = ut.Flow.Service.instantiate("game.SlashPrefab");
            var slashTransform = slashGroup.root.getComponent(ut.Core2D.Transform);

            var angle = getRandomInt(0, 360);
            var radAngle = Math.PI * angle / 180;

            var newRotation = new Quaternion().setFromEuler(new ut.Math.Euler(0, 0, radAngle));
            slashTransform.setLocalRotation(newRotation);

            var newPosition = targetPos;
            newPosition.x += getRandomInt(-80, 80);
            newPosition.y += getRandomInt(-80, 80);
            slashTransform.setLocalPosition(newPosition);
        }

        /**
         * @todo move to random class
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.Core2D.Transform}, {@link game.CellGraphNode}, {@link game.CellGraphNodeRegister}]
 * Execute After [{@link game.CellGraphSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.CellGraphNodeRegisterSystem.update = function (sched, world) {
    world.forEachEntity([ut.Core2D.Transform, game.CellGraphNode, game.CellGraphNodeRegister], function (entity, transform, cellgraphnode, cellgraphnoderegister) {
        // get the current cell and node we are at
        var cell = cellgraphnode.cell();
        var node = Graph.getNode(cell);
        var target = Graph.getCell(transform.localPosition());

        var nodeId = null != node ? node.mId : -1;

        // Has anything changed?
        if (cell.x != target.x || cell.y != target.y || nodeId != entity.mId) {
            if (null != node && nodeId == entity.mId) {
                // unregister from the graph
                Graph.removeNode(cell);
            }

            Graph.addNode(target, entity);
        }

        cellgraphnode.setCell(target);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.Core2D.Transform}, {@link ut.Particles.ParticleEmitter}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.ParticleEmitterSystem.update = function (sched, world) {
    world.forEachEntity([ut.Core2D.Transform, ut.Particles.ParticleEmitter], function (entity, transform, particleemitter) {
        /*
        var newPos = transform.localPosition();
        var targetPos = new Vector2(0,0);
        console.log("newPos:" + newPos.x);
        console.log("targetPos:" + targetPos.x);
        newPos = newPos.lerp(targetPos, sched.deltaTime() * 600);
        transform.setLocalPosition(newPos);
        */
        //var distanceTo = newPos.distanceTo(targetPos);
        //console.log("distanceTo:" + distanceTo);

        /*
        if(newPos.distanceTo(targetPos) < 10)
        {
        	console.log("entity.destroy");
        	//entity.destroy();
        }else
        {
        }
        */
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link game.SlashEffect}, {@link ut.Core2D.Transform}, {@link ut.Core2D.Sprite2DRenderer}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.SlashEffectSystem.update = function (sched, world) {
    world.forEachEntity([game.SlashEffect, ut.Core2D.Transform, ut.Core2D.Sprite2DRenderer], function (entity, slasheffect, transform, sprite2drenderer) {
        var newScale = transform.localScale();
        newScale.x += sched.deltaTime() * 800;
        transform.setLocalScale(newScale);

        if (newScale.x > 200) {
            entity.destroy();
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link game.Dragon}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
game.DragonSystem.update = function (sched, world) {
    world.forEachEntity([game.Dragon], function (entity, dragon) {
        var healthFillTransform = dragon.healthFillEntity().getComponent(ut.Core2D.Transform);
        if (dragon.health() > 0) {
            var fillPct = dragon.health() / 100.0;
            //console.log("health:" + dragon.health());
            var newScale = healthFillTransform.localScale();
            newScale.x = fillPct;
            healthFillTransform.setLocalScale(newScale);
        } else {
            dragon.healthFillEntity().setEnabled(false);
            ut.Flow.Service.instantiate("game.VictoryGroup");
            entity.removeComponent(game.Dragon);
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenSequence}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenSequenceStartSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenSequence], function (entity, tweensequence) {
        var index = tweensequence.index();
        var sequence = Tween.getById(entity.mId);

        for (var i = 0, len = sequence._and.length; i < len; i++) {
            var tween = sequence._and[i];

            // our tween was destroyed (either by system or user)
            // remove it and continue execution
            if (null == tween || tween.entity == null) {
                sequence._and.splice(i, 1);
                i--;len--;
                continue;
            }

            // always force the tween to play
            // even if the user calls stop
            // the sequence is in control of the tween
            tween.play();
        }

        while (index < sequence._then.length) {
            var tween = sequence._then[index];

            if (null == tween || tween.entity == null) {
                index++;
                continue;
            }

            // always force the tween to play
            // even if the user calls stop
            // the sequence is in control of the tween
            tween.play();

            if (!tween.isDone()) {
                break;
            }

            index++;
        }

        tweensequence.setIndex(index);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenDelay}]
 * Execute After [{@link ut.tween.TweenSequenceStartSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenDelaySystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenDelay], function (entity, tweenplay, tweentime, tweendelay) {
        var time = tweendelay.time();
        var delay = tweendelay.delay();
        var dt = sched.deltaTime();

        time += dt;

        var delta = delay - time;

        if (delta > 0) {
            tweentime.setTime(tweentime.time() - Math.min(delta, dt));
            tweendelay.setTime(time);
        } else {
            entity.removeComponent(ut.tween.TweenDelay);
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}]
 * Execute After [{@link ut.tween.TweenDelaySystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenTimeSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime], function (entity, tweenplay, tweentime) {
        var time = tweentime.time();
        var duration = tweentime.duration();
        var reverse = tweentime.reverse();
        var dt = sched.deltaTime();

        time += dt;

        var t = time / duration;

        // @todo use math.clamp01
        if (t < 0) {
            t = 0;
        } else if (t > 1) {
            t = 1;
        }

        if (reverse) {
            t = 1 - t;
        }

        tweentime.setTime(time);
        tweentime.setInterpolation(t);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenEase}]
 * Execute After [{@link ut.tween.TweenTimeSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenEaseSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenEase], function (entity, tweenplay, tweentime, tweenease) {
        var t = tweentime.interpolation();
        var easeType = tweenease.easeType();
        var ease = ut.tween.Easing.getFunction(easeType);
        tweentime.setInterpolation(ease(t));
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenTarget}, {@link ut.tween.TweenVector3}]
 * Execute After [{@link ut.tween.TweenEaseSystem}]
 * Execute Before [{@link ut.tween.TweenLoopSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenVector3System.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenTarget, ut.tween.TweenVector3], function (entity, tweenplay, tweentime, tweentarget, tweenvector3) {
        var t = tweentime.interpolation();
        var target = tweentarget.entity();
        if (null == target || !target.valid()) {
            return;
        }
        var ctype = Tween._types[tweentarget.component()];
        if (!target.hasComponent(ctype)) {
            return;
        }
        var component = target.getComponent(ctype);
        var property = tweentarget.property();

        // @todo ideally we shouldnt be using strings and unpacking dynamic javascript objects
        // instead we should really just store an offset to the data along with the type and access it directly
        var e = property.split('.');
        var pName = e.shift();

        // root represents our component property.
        // this value must be accessed using component.{pName}() and 
        // ALWAYS be written back using component.set{pName}()
        // root can be the value being tweened
        var root = component[pName]();

        // resolve the tree to get the target value we should tween
        var value = e.length > 0 ? e.reduce(function (v, p) {
            return v[p];
        }, root) : root;

        var start = tweenvector3.start();
        var end = tweenvector3.end();

        // apply linear interpolation
        value.x = start.x + (end.x - start.x) * t;
        value.y = start.y + (end.y - start.y) * t;
        value.z = start.z + (end.z - start.z) * t;

        // @hack use dynamic string until we have _view access for all properties
        component['set' + pName.charAt(0).toUpperCase() + pName.slice(1)](root);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenTarget}, {@link ut.tween.TweenColor}]
 * Execute After [{@link ut.tween.TweenEaseSystem}]
 * Execute Before [{@link ut.tween.TweenLoopSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenColorSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenTarget, ut.tween.TweenColor], function (entity, tweenplay, tweentime, tweentarget, tweencolor) {
        var t = tweentime.interpolation();
        var target = tweentarget.entity();
        if (null == target || !target.valid()) {
            return;
        }
        var ctype = Tween._types[tweentarget.component()];
        if (!target.hasComponent(ctype)) {
            return;
        }
        var component = target.getComponent(ctype);
        var property = tweentarget.property();

        // @todo ideally we shouldnt be using strings and unpacking dynamic javascript objects
        // instead we should really just store an offset to the data along with the type and access it directly
        var e = property.split('.');
        var pName = e.shift();

        // root represents our component property.
        // this value must be accessed using component.{pName}() and 
        // ALWAYS be written back using component.set{pName}()
        // root can be the value being tweened
        var root = component[pName]();

        // resolve the tree to get the target value we should tween
        var value = e.length > 0 ? e.reduce(function (v, p) {
            return v[p];
        }, root) : root;

        var start = tweencolor.start();
        var end = tweencolor.end();

        // apply linear interpolation
        value.r = start.r + (end.r - start.r) * t;
        value.g = start.g + (end.g - start.g) * t;
        value.b = start.b + (end.b - start.b) * t;
        value.a = start.a + (end.a - start.a) * t;

        // @hack use dynamic string until we have _view access for all properties
        component['set' + pName.charAt(0).toUpperCase() + pName.slice(1)](root);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenTarget}, {@link ut.tween.TweenFloat}]
 * Execute After [{@link ut.tween.TweenEaseSystem}]
 * Execute Before [{@link ut.tween.TweenLoopSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenFloatSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenTarget, ut.tween.TweenFloat], function (entity, tweenplay, tweentime, tweentarget, tweenfloat) {
        var t = tweentime.interpolation();
        var target = tweentarget.entity();
        var start = tweenfloat.start();
        var end = tweenfloat.end();
        var ctype = Tween._types[tweentarget.component()];

        if (!target.hasComponent(ctype)) {
            return;
        }

        var component = target.getComponent(ctype);
        var property = tweentarget.property();

        // @todo ideally we shouldnt be using strings and unpacking dynamic javascript objects
        // instead we should really just store an offset to the data along with the type and access it directly
        var e = property.split('.');
        var pName = e.shift();
        var vName = e.length > 0 ? e.pop() : null;

        // root represents our component property.
        // this value must be accessed using component.{pName}() and 
        // ALWAYS be written back using component.set{pName}()
        // root can be the value being tweened
        var root = component[pName]();

        // host represents the lowest depth 'object' we can reference
        // or root if none exists
        var host = e.length > 0 ? e.reduce(function (v, p) {
            return v[p];
        }, root) : root;

        // value represents the 'float' we are tweening
        var value = null != vName ? host[vName] : root;

        // apply linear interpolation
        value = start + (end - start) * t;

        // write the value to the host if any
        if (null != vName) {
            host[vName] = value;
        }

        // @hack use dynamic string until we have _view access for all properties
        component['set' + pName.charAt(0).toUpperCase() + pName.slice(1)](root);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenLoop}]
 * Execute After [{@link ut.tween.TweenEaseSystem}]
 * Execute Before [{@link ut.tween.TweenSequenceEndSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenLoopSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenLoop], function (entity, tweenplay, tweentime, tweenloop) {
        var time = tweentime.time();
        var duration = tweentime.duration();

        var loopType = tweenloop.loopType();
        var loopIndex = tweenloop.loopIndex();
        var loopCount = tweenloop.loopCount();

        // tween has finished and we should loop
        if (time >= duration && (loopCount == -1 || loopIndex < loopCount)) {

            switch (loopType) {
                case ut.tween.LoopType.None:
                    return;
                case ut.tween.LoopType.Restart:
                    break;
                case ut.tween.LoopType.PingPong:
                    tweentime.setReverse(!tweentime.reverse());
                    break;
            }

            // increment loop index
            tweenloop.setLoopIndex(loopIndex + 1);

            // restart the tween
            tweentime.setTime(0);
            tweentime.setInterpolation(0);
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenSequence}]
 * Execute Before [{@link ut.tween.TweenOnCompleteSystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenSequenceEndSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenSequence], function (entity, tweenplay, tweentime, tweensequence) {
        var index = tweensequence.index();
        var sequence = Tween.getById(entity.mId);

        var done = true;

        for (var i = 0, len = sequence._and.length; i < len; i++) {
            var tween = sequence._and[i];

            // our tween was destroyed (either by system or user)
            // remove it and continue execution
            if (null == tween || tween.entity == null) {
                sequence._and.splice(i, 1);
                i--;len--;
                continue;
            }

            if (!tween.isDone()) {
                done = false;
                break;
            }
        }

        if (index < sequence._then.length) {
            done = false;
        }

        // freeze time at 0 until we are done
        // the duration of the sequence is arbitrarty and can be any value except 0
        // the time component only exists to add lifecycle functionality to the sequence
        // @note in theory we can compute the real duration by checking all tweens in the sequence
        // however this is costly and adds very little
        tweentime.setTime(done ? tweentime.duration() : 0);
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}, {@link ut.tween.TweenOnComplete}]
 * Execute Before [{@link ut.tween.TweenDestroySystem}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenOnCompleteSystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime, ut.tween.TweenOnComplete], function (entity, tweenplay, tweentime, tweenoncomplete) {
        var time = tweentime.time();
        var duration = tweentime.duration();

        if (time >= duration) {
            var tween = Tween.getById(entity.mId);
            for (var i = 0, len = tween.onCompleteCallbacks.length; i < len; i++) {
                var complete = tween.onCompleteCallbacks[i];
                complete.callback(complete.args);
            }
        }
    });
};
/**
 * @method
 * @desc System 
 * Components [{@link ut.tween.TweenPlay}, {@link ut.tween.TweenTime}]
 * Execute Before [{@link ut.Core2D.RenderingFence}]
 * @param {ut.Scheduler} sched 
 * @param {ut.World} world 
 */
ut.tween.TweenDestroySystem.update = function (sched, world) {
    world.forEachEntity([ut.tween.TweenPlay, ut.tween.TweenTime], function (entity, tweenplay, tweentime) {
        var time = tweentime.time();
        var duration = tweentime.duration();

        if (time >= duration) {
            var tween = Tween.getById(entity.mId);
            Tween.destroy(tween);
        }
    });
};