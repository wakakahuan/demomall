<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <div class="content" ref="content">
        <home-swiper :banners="banners"></home-swiper>
        <home-recommned :recommneds="recommends"></home-recommned>
        <feature-view></feature-view>
        <tab-control class="tab-control" :title="['流行','分类','精选']" @tabclick="tabclick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
        <loading></loading>
      </div>
      
      <back-top @click.native="backClick" v-show="isshowtop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Loading from 'components/common/Loading/Loading'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommned from './childComps/HomeRecommned'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from "network/home"


export default {
    name:'Home',
    components:{
      NavBar,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      HomeRecommned,
      FeatureView,
      Loading
    },
    data(){
      return {
        // result:null
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isshowtop:false,
        scroll:0
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted () {
      //监听滚动，回到顶部
      window.addEventListener('scroll', this.TopScroll)
      //监听滚动 切换页面定位回原来的位置
      window.addEventListener('scroll', this.handleScroll);
      //监听滚动，上拉加载更多
      window.addEventListener('scroll',this.upScroll);
    },
    activated() { 
    if(this.scroll > 0) {
      window.scrollTo(0, this.scroll);
      this.scroll = 0;
      window.addEventListener('scroll', this.handleScroll);
    }
    },
    deactivated() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    destroyed (){
      //注意，如果离开该页面需要移除这个监听的事件，不然会报错。
      window.removeEventListener('scroll', this.TopScroll)
      //window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('scroll', this.upScroll)
    },
    methods:{
      /* 
      事件监听相关
       */
      tabclick(index){
        //console.log(index)
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      //返回顶部
      backClick(){
        //console.log('监听');
        window.scrollTo({
          top:0,
          behavior:"smooth"
        })
      },
      TopScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop);
        // console.log(typeof(scrollTop));
        // console.log(scrollTop > 1000);
        this.isshowtop = scrollTop > 1000
        
      },
      //上拉加载更多
      upScroll(){
        if( document.documentElement.scrollTop >= this.$refs.content.offsetHeight - 1440 ){
          this.pullUpLoad()
          }
      },
      pullUpLoad(){
        this.getHomeGoods(this.currentType)
        this.pullUpLoad = () => {}
      },
      finishPullUpload(){
        this.pullUpLoad = () => {
          this.getHomeGoods(this.currentType)
          this.pullUpLoad = () => {}
        }
      },
      handleScroll () {
      this.scroll  = document.documentElement && document.documentElement.scrollTop
      },   
      /* 
      网络请求相关
        */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.finishPullUpload()
      })
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
}
</script>

<style>
#home {
  padding-top: 43px;
  height: 100vh;
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
    z-index: 9;
  }

  .conent {
    position: absolute;
    margin-bottom: 49px;
  }
</style>