<template>
	<view class="detail">
		<view class="top">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular
			 indicator-active-color="#fff" indicator-color="rgba(255, 255, 255, 0.4)">
				<block v-for="(pic, pic_index) in detailData.pics" :key="pic_index">
					<swiper-item>
						<image :src="pic.pics_big_url" mode=""></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="top2">
				<view class="price">
					¥<text>{{ detailData.goods_price }}</text>
				</view>
				<view class="goods-title">
					<text class="title">{{ detailData.goods_name }}</text>
					<view class="enshrine">
						<icon class="icon-shoucang iconfont"></icon>
						<text>收藏</text>
					</view>
				</view>
				<view class="freight">
					快递: 免运费
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="promotion">
				<text>促销</text>
				<text class="promotion-info">满300减30元</text>
			</view>
		</view>

		<view class="bottom-flex">
			<view class="kefu">
				<icon class="iconfont icon-lianxikefu"></icon>
				联系客服
			</view>
			<view class="gwc">
				<icon class="icon-gwc iconfont"></icon>
				购物车
			</view>
			<view class="buy">

				<button class="addgwc" type="warn" size="mini">加入购物车</button>
				<button class="by" type="warn" size="mini">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: null
			}
		},
		methods: {

		},
		async onLoad(option) {
			const res = await this.$request({
				url: '/goods/detail?goods_id=' + option.goods_id
			})
			console.log(res)
			this.detailData = res.message
		}
	}
</script>

<style lang="less" scoped>
	.detail {
		background-color: #f4f4f4;

		.top {
			background-color: #fff;
			width: 100%;

			.swiper {
				position: relative;
				width: 100%;
				height: 750rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.top2 {
				padding: 0 16rpx;

				.price {
					color: #ea4451;
					font-size: 40rpx;
					line-height: 120rpx;
					font-weight: 500;
					text {
						margin-left: 10rpx;
					}
				}

				.goods-title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 33rpx;

					.title {
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.enshrine {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						margin-left: 30rpx;
						width: 130rpx;
						border-left: 1px solid #dddddd;
						font-size: 28rpx;

						.icon-shoucang {
							font-size: 36rpx;
							color: #999;
						}

						text {
							color: #999999;
						}
					}
				}

				.freight {
					color: #999;
					font-size: 28rpx;
					padding-bottom: 30rpx;
				}
			}
		}

		.middle {
			margin: 20rpx 0;
			padding: 30rpx 16rpx;
			background: #fff;
			font-size: 28rpx;
			color: #333;

			.promotion {

				.promotion-info {
					margin-left: 40rpx;
					color: #ea4451;
				}
			}
		}

		.bottom-flex {
			position: fixed;
			display: flex;
			height: 100rpx;
			justify-content: space-between;
			left: 0;
			bottom: 0;
			right: 0;
			background: #fff;
			font-size: 28rpx;
			/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
			box-shadow: 0 0 1rpx 1rpx rgba(180, 180, 180, 0.2);; 

			.kefu,
			.gwc {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				color: #888;
				padding: 0 32rpx;

				.iconfont {
					font-size: 36rpx;
				}
			}

			.buy {
				button {

					border-radius: 0rpx;
					padding: 0;
					margin: 0;
					line-height: 100rpx;
					width: 210rpx;

					&::after {
						border: 0;
						border-radius: 0;
					}
				}

				.addgwc {
					background: #f4b73f;
				}

				.by {
					background: #ea4451;
				}

			}
		}
	}
</style>
