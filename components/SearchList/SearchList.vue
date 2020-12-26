<template>
	<view class="search-list">
		<view class="top">


			<!-- 搜索栏 -->
			<view class="search-bar">
				<view class="search-box">
					<icon class="se-icon" type="search" size="36rpx"></icon>
					<input refs='search' type="text" v-model="searchKW" confirm-type="search" :focus="searchKW.length || !searchKW.length"
					 @confirm="searchGoods" />
					<icon class="clear-icon" type="clear" size="30rpx" v-show="searchKW.length" @click="searchKW = ''"></icon>
				</view>
			</view>
			<!-- 排序 -->
			<view class="sort-box">
				<view class="sort-item" :class="{active: sortStr === '综合'}" @click="switchSort('综合')">综合</view>
				<view class="sort-item" :class="{active: sortStr === '销量'}" @click="switchSort('销量')">销量</view>
				<view class="sort-item pricesort" :class="{active: sortStr === '价格', pricedown: down, priceup: up}" @click="switchPrice('价格')">价格</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<list class="goods-list">
			<cell class="goods-item" v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsItem.goods_id">
				<image class="cell-left" :src="goodsItem.goods_small_logo" mode="aspectFit"></image>
				<view class="cell-right">
					<text class="goods-title">{{ goodsItem.goods_name }}</text>
					<view class="price">
						<text>¥</text>{{ goodsItem.goods_price }}
					</view>
				</view>
			</cell>
			<uni-load-more :status="status" />
		</list>

	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				goodsList: [], // 商品列表
				searchKW: '',
				inFouchs: false,
				sortStr: '综合',
				pagenum: 1,
				pagesize: 5,
				page: 0,
				status: 'more',
				down: false,
				up: false
			}
		},
		// 上拉加载更多
		onReachBottom() {
			this.status !== 'noMore' && this.loadMore()
		},
		methods: {
			switchSort(sort) {
				this.down = this.up = false
				this.sortStr = sort
				this.searchGoods()
			},
			switchPrice() {
				this.sortStr = '价格'
				this.down = !this.down
				this.up = !this.down
				this.searchGoods()
			},
			searchGoods() {
				this.pagenum = 1
				this.page = 0
				this.status = 'more'
				this.goodsList = []
				this.loadMore()
			},
			async loadMore() {
				// 加载中
				this.status = 'loading'
				// 请求数据
				const res = await this.$request({
					url: '/goods/search',
					data: {
						query: this.searchKW,
						pagenum: this.pagenum,
						pagesize: this.pagesize
					},
					isShowLoading: false,

				})
				this.page++
				this.pagenum = (this.page * this.pagesize) + 1
				this.goodsList.push(...res.message.goods)
				console.log(res)
				this.sortStr === '价格' && this.goodsList.sort((item1, item2) =>
					this.down ? item2.goods_price - item1.goods_price : item1.goods_price - item2.goods_price
				)
				console.log(this.goodsList)
				this.status = this.goodsList.length >= res.message.total || !res.message.goods.length ? 'noMore' : 'more'
			}
		},

		onLoad(option) {
			this.searchKW = option.kw
			this.loadMore()
		}
	}
</script>

<style lang="less" scoped>
	.search-list {
		.top {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 2;

			.search-bar {
				padding: 30rpx 16rpx;
				background: #eeeeee;

				.search-box {
					height: 60rpx;
					background: #fff;
					display: flex;
					align-items: center;
					color: #333;
					font-size: 28rpx;

					.se-icon {
						width: 30rpx;
						height: 34rpx;
						overflow: hidden;
						margin: 0 16rpx 0 32rpx;
					}

					input {
						flex: 1;
					}

					.clear-icon {
						right: 16rpx;
						margin: 0 16rpx;
					}
				}
			}

			.sort-box {
				background: #fff;
				display: flex;
				height: 99rpx;
				padding: 0 16rpx;
				border-bottom: 1px solid #dddddd;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.sort-item {
					flex: 1;
				}

				.active {
					color: #ea4451;
				}

				.pricesort {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						top: 50%;
						left: 66%;
						transform: translateY(-100%);
						border-color: transparent transparent #ccc transparent;
						/*1、下边框有颜色 对应着上边框没有宽度,是正三角形；2、上边框有颜色 对应着下边框没宽度，是倒三角形*/
						border-style: solid;
						border-width: 0 8rpx 8rpx 8rpx;
					}

					&::before {
						content: '';
						position: absolute;
						top: 50%;
						left: 66%;
						transform: translateY(100%);
						border-color: #ccc transparent transparent transparent;
						/*1、下边框有颜色 对应着上边框没有宽度,是正三角形；2、上边框有颜色 对应着下边框没宽度，是倒三角形*/
						border-style: solid;
						border-width: 8rpx 8rpx 0 8rpx;

					}
				}

				.pricedown {
					&::after {
						border-color: transparent transparent #cccccc transparent;
					}

					&::before {
						border-color: #666666 transparent transparent transparent;
					}
				}

				.priceup {
					&::after {
						border-color: transparent transparent #666 transparent;
					}

					&::before {
						border-color: #ccc transparent transparent transparent;
					}
				}
			}
		}

		.goods-list {
			position: relative;
			top: 220rpx;

			// position: fixed;
			// left: 0;
			// right: 0;
			// bottom: 0;
			// top: 220rpx;
			// overflow: auto;
			// padding-bottom: 20rpx;
			.goods-item {
				margin: 0 16rpx;
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx solid #dddddd;

				.cell-left {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
				}

				.cell-right {
					height: 200rpx;
					flex: 1;
					display: flex;
					justify-content: space-between;
					flex-direction: column;

					.goods-title {
						font-size: 28rpx;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.price {
						color: #ea4451;
						font-size: 36rpx;
						font-weight: 500;

						text {
							font-size: 24rpx;
							margin-right: 4rpx;
						}
					}
				}
			}
		}
	}
</style>
