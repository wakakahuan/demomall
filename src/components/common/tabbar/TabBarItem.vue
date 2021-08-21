<template>
<div class="tab-bar-item" @click="itemClick"> 
    <!-- <div class="tab-bar-item" >  -->
      <!-- <img src="../../assets/img/tabbar/shouye.svg" alt="">
      <div>首页</div> -->
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
      <!-- <div ><slot name="item-icon"></slot></div>
      <div><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div> -->
      
      
      <!-- <slot name="item-icon"></slot>
      <slot name="item-icon-active"></slot>
      <slot name="item-text"></slot> -->
</div>
     
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'green'
        }
    },
    data(){
        return{
            // isActive:false
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
    },
    methods:{
        itemClick(){
            // console.log("itemclick");
            this.$router.replace(this.path)
        }
    }
}
</script>

<style scoped>
.tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 3px;
  }
  .active {
      color: green;
  }
</style>