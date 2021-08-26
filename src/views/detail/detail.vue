<template>
    <div class="detail">
        <detail-nav-bar>
            <div slot="center">详情页</div>
        </detail-nav-bar>
        <div class="detail-content">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :base-info="baseInfo"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        </div>
    </div>
</template>

<script>
import DetailNavBar from './childcomponents/DetailNavBar.vue'
import DetailSwiper from './childcomponents/DetailSwiper.vue'
import DetailBaseInfo from './childcomponents/DetailBaseInfo.vue'
import DetailShopInfo from './childcomponents/DeatilShopInfo.vue'
import DetailGoodsInfo from './childcomponents/DetailGoodsInfo.vue'
import {getDetail,
        GoodsInfo,
        Shop
        } from 'network/detail'
export default {
    name:'detail',
    components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo
    },
    data() {
        return {
            iid: null,
            topImages:[],
            baseInfo: {},
            shop: {},
            detailInfo: {}
        }
    },
    created() {
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res => {
            this.topImages = res.result.itemInfo.topImages
            this.baseInfo = new GoodsInfo(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
            this.shop = new Shop(res.result.shopInfo)
            this.detailInfo = res.result.detailInfo
            console.log(this.detailInfo);
        })
    }
}
</script>

<style>

</style>