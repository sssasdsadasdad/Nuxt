<template>
    <div class="slider_delete" :style="{webkitTransform:'translate3d('+transformX+'rem,0,0)'}"
        @touchstart.stop="touchStart($event)"
        @touchend.stop="touchEnd($event)"
        @touchmove.stop="touchMove($event)">
        <slot></slot>
    </div>
</template>
<script>
    /*
     * 滑动配置。distance 滑动距离
     */
    export default({
        data(){
            return {
                startPos:{x:0,y:0},
                endPos:{x:0,y:0},
                transformStartX:0,
                transformX: 0
            }
        },
        props:{
          sliderConf: {
            type: Object,
            default: {}
          }
        },
        methods:{
            touchStart(e){
                // e.preventDefault();
                this.startPos.x = e.targetTouches[0].screenX;
                this.transformStartX = this.transformX;
            },
            touchMove(e){
                // e.preventDefault();
                var x = e.targetTouches[0].screenX;
                var temp = (x - this.startPos.x)/75;
                console.log(temp);
                if(temp > this.sliderConf.distance || (this.transformX == 0 && temp > 0) || temp > 0){
                    this.transformX = 0;
                }else{
                    this.transformX =this.transformStartX + temp;
                }
            },
            touchEnd(e){
                // e.preventDefault();
                if(this.transformX > 0){
                    this.transformX = 0;
                }
                if(this.transformX < 0){
                    this.transformX = -this.sliderConf.distance;
                }
            }
        }
    })
</script>
<style>
    .slider_delete{
        position: absolute;
        left: 0;
        z-index: 100;
        right: 0
    }
</style>
