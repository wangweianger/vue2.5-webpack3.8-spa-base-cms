<style lang="sass" scoped>
    .copot-page{
      overflow: hidden;
      margin-bottom:20px;
    }
</style>

<template>
  <div class="copot-page">    
    <div class="copot-page-size"></div>    
  </div> 
</template> 

<script>
import config from 'common/js/config'
import page from 'page'
import propsync from 'common/lib/mixin/propsync'

export default {
  /*routerName  路由名字 name
    totalCount  总条数
    callback    回调函数
  */
  props:{
    totalCount:{
      type:Number,
      required: true,
      default:0,
    },
    nowPage:{
      type:null,
      required: true,
      default:0,
    },
    pageSize: {
      type: null,
      required: true,
      default: 0,
    },
    isSearch:{
      type:null,
      default:false,
    }
  },
  mixins: [propsync],
  watch:{
    p_totalCount (newVal) {
      this.gitPages();
    },
    p_nowPage (newVal) {
      this.gitPages();
    },
    p_pageSize (newVal) {
      this.gitPages();
    },
    p_isSearch(){
      if(this.p_isSearch){
        setTimeout(()=>{
            this.p_isSearch=false;
        }, 100);
        console.log(211)
        this.gitPages();
      }
    }
  },
  mounted() {
      this.$nextTick(()=>{
          this.gitPages();
      })
  },
  methods:{
    gitPages:function(){
      var This=this;
      page({
          route:This.$route,
          routerName:This.$route.name,
          parent:$("div.copot-page-size"),
          nowPage:This.p_nowPage,
          pageSize: This.p_pageSize || config.pageSize,
          totalCount:This.p_totalCount,
          isSearch:this.p_isSearch
      })
    }
  },
 
}
</script>