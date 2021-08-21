<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommned :recommneds="recommends"></home-recommned>
      <feature-view></feature-view>
      <tab-control class="tab-control" :title="['流行','分类','精选']"></tab-control>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommned from './childComps/HomeRecommned'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata} from "network/home"


export default {
    name:'Home',
    components:{
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommned,
      FeatureView
    },
    data(){
      return {
        // result:null
        banners:[],
        recommends:[]
      }
    },
    created(){
      //1.请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
}
</script>

<style>
#home {
  padding-top: 44px;
 height: 2000px;
}
.home-nav {
  background-color: var(--color-tint);
  color:#fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>