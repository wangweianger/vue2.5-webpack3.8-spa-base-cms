<template>
      <span>
          每页显示
          <select @change="p_callback" class="form-control w-100 inline-block" v-model="p_pageSize">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
          </select>
          页
      </span>
</template>
<script>
    import propsync from 'common/lib/mixin/propsync'
    export default {
        //父组件传递过来的参数
        props: {
            pageSize: {
                type: null,
                required: true
            },
            callback:{
                type: Function,
            },
        },
        mixins: [propsync],
        methods: {
           
        },
    }
</script>
<style lang="sass">
  
</style>

