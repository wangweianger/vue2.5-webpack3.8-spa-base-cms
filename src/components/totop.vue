<template>
    <a href="javascript:;" class="totop" v-show="isShow" @click="toTop">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACdElEQVR4Xu2b3VECMRDHN0kB0oFagWSOd7ECsAKlA61AqUTtACsQ37k5rUDsQAtI4iySmZsbYO7ydcDtPcAMQ5L7/7LZTTYJg/VTFEVPKTVijJ3Z347x2xizFEK8Sil/UB/Dj6Io+lrrNwDoHaPoDZqWnPNrKeUHw57XWn91SLzlgRAky/P8FgCeOtLzVZkTBPAIAA8dBTAlAGQBNATIB5ATpChAYbDRPOAdAOZ7Om8YAsBlg3dzmgdMsyxDv7F3j0NIJwAuM0GyABoCHfcBS8yq7J0HxOzOfzarSUbLyQkG026M+V2lpRg7CVZps4raA4DihRAYt0EpNW8JQjsArHjMyZVyks8AcNGsA73/nR5AVXw5K621xhlmSgjJAXxyzoc2JV3tv3WCNiWEpAB2im/JEpIBqCW+sknzzBgbeY/y3RUkAdBIfPl9F4sFQriJCCE6AGfxVnRkCFEBeItPACEagGDiLQSHtX6dkRMegDHmRQhxty3U1Xmrbf+JsI0XFgCKHwwGuNcY7QkMIRyAFOJLwyHUhm4YACnFl+YKQ6XUzHMR5Q+gDfElCH3PlaQfgDbFB4LgDmAfxAeA4AWg1uaIEOLervtdQkOe58alXM0y7gBqNgCc8yspZS1Ym+okAEdgAedSSucs8sFbQJZlq7OIrg8BOPQhQBZAQ4B8ADlB1wiA5SgKUBQ48LVA58MgAPieKPMtv8sFxV8N+jjABGUJgMsxuQQdk6wJsgCygEh7bsls2LMhGgI0BAJvNnpaZPLiE3t1Fs/rnSZvvt0Gvznn/fLl6VmHIKD48erydGl7CS9RjxseNm63D91ax0vTM3uA4w8mgBVvG3GwqwAAAABJRU5ErkJggg==" alt="">
    </a>
</template>
<script type="es6">
    export default{
        data(){
            return {
                isShow: false
            }
        },
        methods: {
            toTop(){
                $("html,body").animate({"scrollTop" : 0}, 500)
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                var that = this
                $(window).on("scroll", function(){
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    if(scrollTop > 200){
                        that.isShow = true
                    }else{
                        that.isShow = false
                    }
                })
            })
        }
    }
</script>
<style>
    .totop {
        width: 40px;
        height: 40px;
        display: block;
        text-align: center;
        line-height: 40px;
        position: fixed;
        bottom: 60px;
        right: 10px;
        z-index:10000;
    }
    .totop img{
        width: 100%;
        height: 100%;
    }
    @media (max-width: 768px) { 
        .totop{
           bottom: 30px;
            right: 30px;
        }
    }
</style>