<template>
	<view class="category" v-if="categoryList.length">
		<!-- 搜索 -->
		<SearchLink></SearchLink>
		<view class="content">
			<view class="left">
				<view class="item" v-for="(cate, index) in categoryList" :key="index" @click="switchCat(index)" :class="{activeBg: cateId === index}">
					<view :class="{activeTitle: cateId === index}">
						{{ cate.cat_name }}
					</view>
				</view>

			</view>
			<view class="right" v-if="toggle">
				<image id="top" ref='top' class="top-img" src="../../static/images/titleImage.png" mode=""></image>
				<view class="cate-item" v-for="(cateItem, catIndex) in categoryList[cateId].children" :key="catIndex">
					<view class="cat-top">
						{{ cateItem.cat_name }}
					</view>
					<view class="cate-item-box">
						<view class="item-box-info" v-for="(infoItem, infoIndex) in cateItem.children" :key="infoIndex">
							<image class="info-img" :src="infoItem.cat_icon" mode=""></image>
							<view class="cat-info-name">{{infoItem.cat_name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchLink from '@/components/SearchLink.vue'
	import request from '../../utils/request.js'
	export default {
		components: {
			SearchLink
		},
		data() {
			return {
				categoryList: [],
				cateId: 0,
				toggle: true
			}
		},
		methods: {
			async getCategories() {
				const res = await request({
					url: '/categories'
				})
				this.categoryList = res.message
				console.log(this.categoryList)
			},
			switchCat(index) {
				this.cateId = index
				this.toggle = false
				this.$nextTick(() => {
					this.toggle = true
				})
			}
		},
		created() {
			this.getCategories()
		},
		mounted() {
			let query = uni.createSelectorQuery();
			const dom = query.select('#top')
			console.log(dom)
		}
	}
</script>

<style lang="less" scoped>
	.category {
		width: 100%;
		height: 100%;
		position: relative;

		.content {
			display: flex;
			justify-content: space-between;

			.left {
				position: absolute;
				top: 100rpx;
				left: 0;
				bottom: 0;
				width: 198rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				overflow: auto;

				&::-webkit-scrollbar {
					width: 0;
					height: 0;
					color: transparent;
				}

				.item {
					height: 100rpx;
					background: #f4f4f4;
					line-height: 100rpx;
					width: 100%;
					border-bottom: 1px solid #eee;
					text-align: center;
					color: #333;
					font-size: 28rpx;
				}

				.activeBg {
					background: #fff;

					.activeTitle {
						box-sizing: border-box;
						margin: 20rpx 0;
						text-indent: -8rpx;
						line-height: 60rpx;
						font-weight: bold;
						color: #eb4450;
						border-left: 8rpx solid #eb4450;
					}
				}
			}

			.right {
				position: absolute;
				top: 100rpx;
				right: 0;
				bottom: 0;
				overflow: auto;
				width: 520rpx;
				// height: 970rpx;
				background-color: #fff;
				padding: 20rpx 16rpx;

				&::-webkit-scrollbar {
					width: 0;
					height: 0;
					color: transparent;
				}

				.top-img {
					height: 180rpx;
					width: 100%;
					margin-bottom: 20rpx;
				}

				.cate-item {
					.cat-top {
						line-height: 110rpx;
						height: 110rpx;
						text-align: center;
						color: #333;
						font-size: 28rpx;

						&::before {
							content: '/';
							margin-right: 30rpx;
							color: #e0e0e0;
							font-size: 24rpx;
						}

						&::after {
							content: '/';
							margin-left: 30rpx;
							color: #e0e0e0;
							font-size: 24rpx;
						}
					}

					.cate-item-box {
						display: flex;
						flex-wrap: wrap;
						justify-content: flex-start;

						.item-box-info {
							padding: 20rpx 0rpx;
							width: 33.33%;
							text-align: center;

							.info-img {
								width: 120rpx;
								height: 120rpx;
							}

							.cat-info-name {
								color: #333;
								font-size: 24rpx;
								line-height: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
