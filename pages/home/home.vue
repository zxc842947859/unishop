<template>
	<view class="home">
		<!-- 搜索 -->
		<view class="top">
			<input class="search" value="" placeholder="搜索" confirm-type="search" />
			<icon class="icon" type="search" color="#bbb" size="28rpx"></icon>
		</view>
		<!-- 轮播 -->
		<swiper class="swiper" :indicator-dots="true" indicator-color="rgba(255, 255, 255, 0.4)" indicator-active-color="#fff"
		 :autoplay="true" :interval="3000" :duration="1000" circular>
			<block v-for="(item, index) in swiperList" :key="index">
				<swiper-item>
					<image class="img" :src="item.image_src" mode=""></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 分类 -->
		<view class="type">
			<view class="item" v-for="(item, index) in catitems" :key="index">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-box">
			<view class="floor-item" v-for="(item, index) in floordata" :key="index">
				<view class="floor-top">
					<image :src="item.floor_title.image_src" mode=""></image>
				</view>
				<view class="floor-info">
					<view class="left">
						<image :src="item.product_list[0].image_src" mode=""></image>
					</view>
					<view class="right">
						<block v-for="(item2, subIndex) in item.product_list" :key="subIndex">
							<image v-if="subIndex" class="floor-img" :src="item2.image_src" mode=""></image>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				catitems: [],
				floordata: []
			}
		},
		methods: {

		},
		created() {
			uni.request({
				url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
				success: res => {
					if (res.statusCode === 200) {
						this.swiperList = res.data.message
					}
				}
			})

			uni.request({
				url: 'https://www.uinav.com/api/public/v1/home/catitems',
				success: res => {
					this.catitems = res.data.message
				}
			})

			uni.request({
				url: 'https://www.uinav.com/api/public/v1/home/floordata',
				success: res => {
					this.floordata = res.data.message
					console.log(this.floordata)
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.home {
		.top {
			position: relative;
			height: 60rpx;
			padding: 20rpx 16rpx;
			background: #eb4450;

			.search {
				height: 60rpx;
				background: #fff;
				text-align: center;
				font-size: 30rpx;
				line-height: 60rpx;
				padding-left: 50rpx;
				border-radius: 6rpx;
			}

			.icon {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-150%, -50%);
			}
		}

		.swiper {
			height: 340rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.type {
			display: flex;
			justify-content: space-between;
			height: 194rpx;
			background: #fff;

			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				image {
					width: 128rpx;
					height: 140rpx;
				}
			}
		}

		.floor-box {
			.floor-item {
				.floor-top {
					height: 88rpx;
					background: #F8F8F8;

					image {
						padding-top: 30rpx;
						height: 58rpx;
					}
				}

				.floor-info {
					background: #fff;
					padding: 20rpx 16rpx 10rpx;
					display: flex;

					.left image {
						width: 232rpx;
						height: 386rpx;
						margin-right: 10rpx;

					}

					.right {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;

						.floor-img {
							height: 188rpx;
							width: 232rpx;
						}
					}

				}
			}
		}
	}
</style>
