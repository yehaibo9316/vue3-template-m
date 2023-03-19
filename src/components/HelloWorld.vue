<template>
  <div class="container">
    <div class="top">
      <h1 @click="togglePlay">切换播放状态</h1>
    </div>
    <div
      class="middle"
      @touchstart.prevent="onMiddleTouchStart"
      @touchmove.prevent="onMiddleTouchMove"
      @touchend.prevent="onMiddleTouchEnd"
    >
      <div
        class="middle-l"
        :style="middleLStyle"
      >
        <div
          ref="cdWrapperRef"
          class="cd-wrapper"
        >
          <div
            ref="cdRef"
            class="cd"
          >
            <img
              ref="cdImageRef"
              class="image"
              :class="cdCls"
              src="https://y.gtimg.cn/music/photo_new/T002R800x800M000002J1yeb1T8kzq.jpg?max_age=2592000">
          </div>
        </div>
      </div>
      <div
        class="middle-r"
        ref="lyricScrollRef"
        :style="middleRStyle"
      >
        <div class="lyric-wrapper">
          <div style="pointer-events: none;"><p class="text">龙卷风 - G.E.M.
            邓紫棋</p>
            <p class="text">词：徐若瑄</p>
            <p class="text">曲：周杰伦</p>
            <p class="text">编曲：G.E.M. 邓紫棋</p>
            <p class="text">OP：蜂鸟音乐</p>
            <p class="text">SP：百纳娱乐</p>
            <p class="text">啊哈</p>
            <p class="text">啊啊啊啊啊啊</p>
            <p class="text">爱像一阵风吹完它就走</p>
            <p class="text">这样的节奏谁都无可奈何</p>
            <p class="text current">没有你以后我灵魂失控</p>
            <p class="text">黑云在降落我被它拖着走</p>
            <p class="text">静静悄悄默默离开</p>
            <p class="text">陷入了危险边缘baby</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="dot-wrapper">
        <span class="dot" :class="{'active':currentShow==='cd'}"></span>
        <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'HelloWorld',
  setup () {
    // 控制cd旋转
    const cdRef = ref(null)
    const cdImageRef = ref(null)
    const playing = ref(false)
    // 切换显示隐藏
    const currentShow = ref('cd')
    const middleLStyle = ref(null)
    const middleRStyle = ref(null)

    const cdCls = computed(() => {
        return playing.value ? 'playing' : ''
      }
    )

    watch(playing, (newPlaying) => {
      if (!newPlaying) {
        syncTransform(cdRef.value, cdImageRef.value)
      }
    })

    function syncTransform (wrapper, inner) {
      const wrapperTransform = getComputedStyle(wrapper).transform
      const innerTransform = getComputedStyle(inner).transform
      wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    }

    function togglePlay () {
      playing.value = !playing.value
    }

    const touch = {}
    let currentView = 'cd'

    function onMiddleTouchStart (e) {
      touch.startX = e.touches[0].pageX
    }

    function onMiddleTouchMove (e) {
      const deltaX = e.touches[0].pageX - touch.startX
      const left = currentView === 'cd' ? 0 : -window.innerWidth
      // 这一步 控制偏移x范围 [-window.innerWidth,0]
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, deltaX + left))
      touch.percent = Math.abs(offsetWidth / window.innerWidth)

      if (currentView === 'cd') {
        if (touch.percent > 0.2) {
          currentShow.value = 'lyric'
        } else {
          currentShow.value = 'cd'
        }
      } else {
        if (touch.percent < 0.8) {
          currentShow.value = 'cd'
        } else {
          currentShow.value = 'lyric'
        }
      }

      middleLStyle.value = {
        opacity: 1 - touch.percent
      }

      middleRStyle.value = {
        transform: `translate3d(${offsetWidth}px, 0, 0)`
      }
    }

    function onMiddleTouchEnd (e) {
      let offsetWidth
      let opacity
      if (currentShow.value === 'cd') {
        currentView = 'cd'
        offsetWidth = 0
        opacity = 1
      } else {
        currentView = 'lyric'
        offsetWidth = -window.innerWidth
        opacity = 0
      }

      const duration = 300
      middleLStyle.value = {
        opacity,
        transitionDuration: `${duration}ms`
      }

      middleRStyle.value = {
        transform: `translate3d(${offsetWidth}px, 0, 0)`,
        transitionDuration: `${duration}ms`
      }
    }

    return {
      currentShow,
      middleLStyle,
      middleRStyle,
      cdCls,
      cdRef,
      cdImageRef,
      togglePlay,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: 100%;
}

.top {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 0.2rem;
}

.middle {
  position: absolute;
  top: 40px;
  bottom: 60px;
  width: 100%;
  white-space: nowrap;
  font-size: 0;

  .middle-l {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;

    .cd-wrapper {
      position: absolute;
      left: 10%;
      top: 0;
      width: 80%;
      box-sizing: border-box;
      height: 100%;

      .cd {
        width: 100%;
        height: 100%;
        border-radius: 50%;

        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.1);
        }

        .playing {
          animation: rotate 20s linear infinite
        }
      }
    }
  }

  .middle-r {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .lyric-wrapper {
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      text-align: center;

      .text {
        line-height: 32px;
        color: $color-text-l;
        font-size: $font-size-medium;

        &.current {
          color: $color-text;
        }
      }
    }
  }
}

.bottom {
  position: absolute;
  bottom: 50px;
  width: 100%;

  .dot-wrapper {
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      vertical-align: middle;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
