<template>
	<view class="detail">
		<!-- 商品描述 -->
		<view class="top">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular
			 indicator-active-color="#fff" indicator-color="rgba(255, 255, 255, 0.4)">
				<block v-for="(pic, pic_index) in detailData.pics" :key="pic_index">
					<swiper-item>
						<image :src="pic.pics_big_url" mode=""></image>
					</swiper-item>
				</block>
			</swiper>
			<!-- 商品标题及价格 -->
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
		<!-- 活动及选择规格 -->
		<view class="middle">
			<view class="promotion">
				<text>促销</text>
				<text class="promotion-info">满300减30元</text>
			</view>
			<view class="spec">
				<text>已选</text>
				<text class="spec-info">黑色/s/1件</text>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="address">
			<view class="address-box">
				<text>送至</text>
				<text class="address-info">广东省 深圳市 宝安区</text>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-detail">
			<view class="detail-item">
				<view class="tw" :class="{active: showIntroduce}" @click="showIntroduce=true">
					图文介绍
				</view>
				<view class="spce-arg" :class="{active: !showIntroduce}" @click="showIntroduce=false">
					规格参数
				</view>
			</view>
			<!-- 图文介绍 -->
			<view v-if="showIntroduce" class="twjs" v-html="detailData.goods_introduce"></view>
			<!-- 规格参数 -->
			<view class="guige" v-else>
				<view class="guige-info" v-for="(specItem, speIndex) in detailData.attrs" :key="speIndex">
					<text class="spec-title">{{ specItem.attr_name }}</text>
					<text class="spec-val">{{ specItem.attr_value }}</text>
				</view>
			</view>
		</view>
		<!-- 底部工具栏 -->
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
				detailData: null, // 商品详情数据
				showIntroduce: true // 显示图文介绍
			}
		},
		methods: {

		},
		async onLoad(option) {
			const res = await this.$request({
				url: '/goods/detail?goods_id=' + option.goods_id
			})
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
					font-size: 20px;
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
						font-size: 14px;

						.icon-shoucang {
							font-size: 18px;
							color: #999;
						}

						text {
							color: #999999;
						}
					}
				}

				.freight {
					color: #999;
					font-size: 14px;
					padding-bottom: 20rpx;
				}
			}
		}

		.middle {
			margin: 20rpx 0;
			padding: 20rpx 16rpx;
			background: #fff;
			font-size: 14px;
			color: #333;

			.promotion {
				margin-bottom: 30rpx;

				.promotion-info {
					margin-left: 40rpx;
					color: #ea4451;
				}
			}

			.spec {
				.spec-info {
					margin-left: 40rpx;
					color: #999;
				}
			}
		}

		.address {
			background: #fff;
			margin-bottom: 20rpx;

			.address-box {
				padding: 20rpx 16rpx;
				font-size: 14px;

				.address-info {
					margin-left: 40rpx;
					color: #999;
				}
			}
		}

		.goods-detail {
			padding-bottom: 120rpx;
			background: #fff;

			.detail-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				color: #333;
				text-align: center;
				padding-bottom: 10rpx;

				view {
					flex: 1;
					padding: 20rpx 0;

				}

				.active {
					color: #ea4451;
					border-bottom: 8rpx solid #ea4451;
				}
			}

			.guige {
				background: #fff;
				padding: 1rpx 15rpx 0 17rpx;

				.guige-info {
					display: flex;
					justify-content: space-between;

					text {
						flex: 1;
						border: 1rpx solid #999;
						font-size: 10px;
						padding: 20rpx;
						color: #333;
						margin: -1rpx 0 0 -1rpx;
					}

					.spec-title {
						text-align: center;
					}
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
			font-size: 13px;
			/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
			box-shadow: 0 0 1rpx 1rpx rgba(180, 180, 180, 0.2);
			;

			.kefu,
			.gwc {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				color: #888;
				padding: 0 28rpx;

				.iconfont {
					font-size: 16px;
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
