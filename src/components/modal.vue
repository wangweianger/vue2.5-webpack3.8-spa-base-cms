<template>
  <div role="dialog"
    v-bind:class="{
    'modal':true,
    'fade':p_effect === 'fade',
    'zoom':p_effect === 'zoom'
    }"
    >
    <div v-bind:class="{'modal-dialog':true,'modal-lg':p_large,'modal-sm':p_small}" role="document"
      v-bind:style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="close"><span>&times;</span></button>
            <h4 class="modal-title">
              <slot name="title">
                {{p_title}}
              </slot>
            </h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body"></div>
        </slot>
        <slot name="modal-footer" v-if="p_isCancelShow&&!p_isSubmitShow || !p_isCancelShow&&p_isSubmitShow || p_isCancelShow&&p_isSubmitShow">
          <div class="modal-footer" :class="[{'tl':p_position=='left'},{'tc':p_position=='center'},{'tr':p_position=='right'}]">
            <button v-if="p_isCancelShow" type="button" class="btn btn-default" @click="close">{{ p_cancelText }}</button>
            <button v-if="p_isSubmitShow" type="button" class="btn btn-primary" @click="p_callback">{{ p_okText }}</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {coerce, getScrollBarWidth} from './utils/utils.js'
import $ from './utils/NodeList.js'
import propsync from 'common/lib/mixin/propsync'

export default {
  props: {
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      required: true,
      type: Boolean,
      coerce: coerce.boolean,
      twoWay: true
    },
    width: {
      default: null
    },
    callback: {
      type: Function,
      default () {}
    },
    effect: {
      type: String,
      default: null
    },
    backdrop: {
      type: Boolean,
      coerce: coerce.boolean,
      default: true
    },
    large: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    small: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    position:{
      type: String,
      default: 'right'   //left | right | center
    },
    isCancelShow:{
      type: Boolean,
      coerce: coerce.boolean,
      default: true,
    },
    isSubmitShow:{
      type: Boolean,
      coerce: coerce.boolean,
      default: true,
    },
    closeCallback:{
      type: Function,
      default () {}
    }
  },
  mixins: [propsync],
  computed: {
    optionalWidth () {
      if (this.p_width === null) {
        return null
      } else if (Number.isInteger(this.p_width)) {
        return this.p_width + 'px'
      }
      return this.p_width
    }
  },
  watch: {
    show (val) {
      const el = this.$el
      const body = document.body
      const scrollBarWidth = getScrollBarWidth()
      if (val) {
        $(el).find('.modal-content').focus()
        el.style.display = 'block'
        setTimeout(() => $(el).addClass('in'), 0)
        $(body).addClass('modal-open')
        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px'
        }
        if (this.p_backdrop) {
          $(el).on('click', e => {
            if (e.target === el) this.p_show = false
          })
        }
      } else {
        body.style.paddingRight = null
        $(body).removeClass('modal-open')
        $(el).removeClass('in').on('transitionend', () => {
          $(el).off('click transitionend')
          el.style.display = 'none'
        })
      }
    }
  },
  methods: {
    close () {
      this.p_closeCallback&&this.p_closeCallback();
      this.p_show = false
    }
  }
}
</script>
<style>
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
  -webkit-transform: scale(0.1);
  -moz-transform: scale(0.1);
  -ms-transform: scale(0.1);
  transform: scale(0.1);
  top: 300px;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  -webkit-transform: translate3d(0, -300px, 0);
  transform: translate3d(0, -300px, 0);
  opacity: 1;
}
</style>