/**
 * TINY GENERATED CODE, DO NOT EDIT BY HAND
 * @project UTiny.Demo.DragonMatch
 */

console.log('runtime version: internal');

ut.importModule(ut);
ut.importModule(ut.Math);
ut.importModule(ut.HTML);
ut.importModule(ut.Core2D);
ut.importModule(ut.Audio);
ut.importModule(ut.Particles);
/**
 * @type {ut.World}
 * @desc Singleton world instance
 */
var world;
ut.main = function() {
    world = new ut.World();
    var options = WorldSetup(world);
    var c1 = world.config(ut.Core2D.DisplayInfo);
    c1.setWidth(1440);
    c1.setHeight(2560);
    c1.setAutoSizeToFrame(true);
    c1.setRenderMode(0);
    var scheduler = world.scheduler();
    scheduler.schedule(game.CellGraphSystem);
    scheduler.schedule(game.BoardSpawnSystem);
    scheduler.schedule(game.BoardCollapseSystem);
    scheduler.schedule(game.BoardRefillSystem);
    scheduler.schedule(ut.Core2D.InputFence);
    scheduler.schedule(ut.HTML.InputHandler);
    scheduler.schedule(game.GemDragSystem);
    scheduler.schedule(game.CreateMatchSystem);
    scheduler.schedule(game.DestroyMatchSystem);
    scheduler.schedule(game.CellGraphNodeRegisterSystem);
    scheduler.schedule(game.ParticleEmitterSystem);
    scheduler.schedule(game.SlashEffectSystem);
    scheduler.schedule(game.DragonSystem);
    scheduler.schedule(ut.HTML.AssetLoader);
    scheduler.schedule(ut.tween.TweenSequenceStartSystem);
    scheduler.schedule(ut.tween.TweenDelaySystem);
    scheduler.schedule(ut.tween.TweenTimeSystem);
    scheduler.schedule(ut.tween.TweenEaseSystem);
    scheduler.schedule(ut.tween.TweenVector3System);
    scheduler.schedule(ut.tween.TweenColorSystem);
    scheduler.schedule(ut.tween.TweenFloatSystem);
    scheduler.schedule(ut.tween.TweenLoopSystem);
    scheduler.schedule(ut.tween.TweenSequenceEndSystem);
    scheduler.schedule(ut.tween.TweenOnCompleteSystem);
    scheduler.schedule(ut.tween.TweenDestroySystem);
    scheduler.schedule(ut.Particles.ParticleSystem);
    scheduler.schedule(ut.Core2D.RenderingFence);
    scheduler.schedule(ut.Core2D.SequencePlayerSystem);
    scheduler.schedule(ut.Core2D.DisplayList);
    scheduler.schedule(ut.Core2D.PlatformRenderingFence);
    scheduler.schedule(ut.HTML.Renderer);
    scheduler.schedule(ut.Audio.AudioSystem);
    try { ut.Runtime.Service.run(world); } catch (e) { if (e !== 'SimulateInfiniteLoop') throw e; }
}

function WorldSetup(world) {
    UT_ASSETS_SETUP(world);
    entities.game["Level_Base"].load(world);
    return {
        canvasWidth: 1440,
        canvasHeight: 2560,
        canvasAutoResize: true,
    };
}
