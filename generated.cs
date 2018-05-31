using UTiny;
using UTiny.Core;
using UTiny.Math;
using UTiny.HTML;
using UTiny.Flow;
using UTiny.Tween;
using UTiny.Core2D;
using UTiny.Audio;
using UTiny.Particles;

/*
 * !!! TEMP UNITL PROPER SCENE FORMAT !!!
 */
namespace entities.game
{
    namespace Level_Base
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace GemPrefab
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace ParticlePrefab
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace SlashPrefab
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace VictoryGroup
    {
        public struct Component : IComponentData
        {
        }
    }
}

namespace game
{
    public struct Gem : IComponentData
    {
        public game.GemType type;
        public bool animating;
        public DynamicArray<Entity> pieces;
        public Vector2 dragStart;
        public int isDragged;
    }
    public struct Board : IComponentData
    {
    }
    public struct BoardSpawn : IComponentData
    {
    }
    public struct Matched : IComponentData
    {
        public Entity match;
    }
    public struct Match : IComponentData
    {
        public DynamicArray<Entity> gems;
    }
    public struct CellGraph : IComponentData
    {
        public int width;
        public int height;
        public CellLayout layout;
    }
    public struct CellGraphNode : IComponentData
    {
        public Cell cell;
    }
    public struct CellGraphNodeRegister : IComponentData
    {
    }
    public struct SlashEffect : IComponentData
    {
    }
    public struct Dragon : IComponentData
    {
        public int health;
        public Entity healthFillEntity;
    }
    public struct Cell
    {
        public int x;
        public int y;
    }
    public struct CellLayout
    {
        public Vector2 size;
        public Vector2 spacing;
    }
    enum GemType
    {
        Swirl = 0
        , Circle = 1
        , D20 = 2
        , Star = 3
    }
    [UpdateAfter(typeof(BoardCollapseSystem))]
    public class BoardRefillSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(InputHandler))]
    public class GemDragSystem : IComponentSystem
    {
    }
    public class CreateMatchSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(BoardSpawnSystem))]
    public class BoardCollapseSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(CellGraphSystem))]
    public class BoardSpawnSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(CreateMatchSystem))]
    public class DestroyMatchSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(CellGraphSystem))]
    public class CellGraphNodeRegisterSystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(RenderingFence))]
    public class CellGraphSystem : IComponentSystem
    {
    }
    public class ParticleEmitterSystem : IComponentSystem
    {
    }
    public class SlashEffectSystem : IComponentSystem
    {
    }
    public class DragonSystem : IComponentSystem
    {
    }
}

namespace ut
{
}

namespace ut.Math
{
}

namespace ut.HTML
{
}

namespace ut.Flow
{
}

namespace ut.tween
{
    public struct TweenTime : IComponentData
    {
        public float time;
        public float duration;
        public float interpolation;
        public bool reverse;
    }
    public struct TweenEase : IComponentData
    {
        public ut.tween.EaseType easeType;
    }
    public struct TweenTarget : IComponentData
    {
        public Entity entity;
        public int component;
        public string property;
    }
    public struct TweenPlay : IComponentData
    {
        public sbyte padding;
    }
    public struct TweenLoop : IComponentData
    {
        public ut.tween.LoopType loopType;
        public int loopIndex;
        public int loopCount;
    }
    public struct TweenDelay : IComponentData
    {
        public float time;
        public float delay;
    }
    public struct TweenColor : IComponentData
    {
        public Color start;
        public Color end;
    }
    public struct TweenVector3 : IComponentData
    {
        public Vector3 start;
        public Vector3 end;
    }
    public struct TweenFloat : IComponentData
    {
        public float start;
        public float end;
    }
    public struct TweenSequence : IComponentData
    {
        public int index;
    }
    public struct TweenOnComplete : IComponentData
    {
        public sbyte padding;
    }
    enum EaseType
    {
        Linear = 0
        , EaseInQuad = 1
        , EaseOutQuad = 2
        , EaseInOutQuad = 3
        , EaseInCubic = 4
        , EaseOutCubic = 5
        , EaseInOutCubic = 6
        , EaseInQuart = 7
        , EaseOutQuart = 8
        , EaseInOutQuart = 9
        , EaseInQuint = 10
        , EaseOutQuint = 11
        , EaseInOutQuint = 12
        , EaseInBack = 13
        , EaseOutBack = 14
        , EaseInOutBack = 15
        , EaseInBounce = 16
        , EaseOutBounce = 17
        , EaseInOutBounce = 18
    }
    enum LoopType
    {
        None = 0
        , Repeat = 1
        , PingPong = 2
    }
    [UpdateBefore(typeof(TweenLoopSystem))]
    [UpdateAfter(typeof(TweenEaseSystem))]
    public class TweenVector3System : IComponentSystem
    {
    }
    [UpdateAfter(typeof(TweenDelaySystem))]
    public class TweenTimeSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(TweenTimeSystem))]
    public class TweenEaseSystem : IComponentSystem
    {
    }
    [UpdateAfter(typeof(TweenSequenceStartSystem))]
    public class TweenDelaySystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(TweenSequenceEndSystem))]
    [UpdateAfter(typeof(TweenEaseSystem))]
    public class TweenLoopSystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(RenderingFence))]
    public class TweenDestroySystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(TweenLoopSystem))]
    [UpdateAfter(typeof(TweenEaseSystem))]
    public class TweenColorSystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(TweenLoopSystem))]
    [UpdateAfter(typeof(TweenEaseSystem))]
    public class TweenFloatSystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(TweenOnCompleteSystem))]
    public class TweenSequenceEndSystem : IComponentSystem
    {
    }
    [UpdateBefore(typeof(TweenDestroySystem))]
    public class TweenOnCompleteSystem : IComponentSystem
    {
    }
    public class TweenSequenceStartSystem : IComponentSystem
    {
    }
}

namespace ut.Core2D
{
    namespace layers
    {
        public struct Default : IComponentData
        {
        }
        public struct TransparentFX : IComponentData
        {
        }
        public struct IgnoreRaycast : IComponentData
        {
        }
        public struct Water : IComponentData
        {
        }
        public struct UI : IComponentData
        {
        }
        public struct PostProcessing : IComponentData
        {
        }
    }
}

namespace ut.Audio
{
}

namespace ut.Particles
{
}
