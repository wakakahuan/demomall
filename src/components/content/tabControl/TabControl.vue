<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="item" 
        class="tab-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        title:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemClick(index) {
            this.currentIndex = index;
            //内部发生点击，子传父
            this.$emit('tabclick',index)
        }
    }
}
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        background-color: #fff;
        font-size: 15px;
    }
    .tab-control-item {
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
    .tab-control-item span {
        padding:5px;
    }
    .active {
        color: var(--color-high-text);
    }
    .active span {
        border-bottom: 3px solid var(--color-tint);
    }
</style>