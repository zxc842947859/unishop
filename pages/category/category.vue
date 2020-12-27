<template>
	<view class="category" v-if="categoryList.length">
		<!-- 搜索 -->
		<SearchLink></SearchLink>
		<!-- 主体 -->
		<view class="content">
			<!-- 左侧分类 -->
			<view class="left">
				<view class="item" v-for="(cate, index) in categoryList" :key="index" @click="switchCat(index)" :class="{active: cateId === index}">
					{{ cate.cat_name }}
				</view>

			</view>
			<!-- 右侧 -->
			<scroll-view class="right" scroll-y :scroll-top="scrollTop" @scroll="scroll" scroll-with-animation>
				<image id="top" ref='top' class="top-img" src="../../static/images/titleImage.png" mode=""></image>
				<view class="cate-item" v-for="(cateItem, catIndex) in categoryList[cateId].children" :key="catIndex">
					<view class="cat-top">
						{{ cateItem.cat_name }}
					</view>
					<view class="cate-item-box">
						<view class="item-box-info" v-for="(infoItem, infoIndex) in cateItem.children" :key="infoIndex" @click="go2search(infoItem.cat_name)">
							<image class="info-img" :src="infoItem.cat_icon" mode=""></image>
							<view class="cat-info-name">{{infoItem.cat_name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import SearchLink from '@/components/SearchLink.vue'
	export default {
		components: {
			SearchLink
		},
		data() {
			return {
				categoryList: [], // 类别所有数据
				cateId: 0, // 当前选择的类别
				toggle: true, // 用来控制右侧的静默刷新
				scrollTop: 0,  // 当前二级类别滚动位置
				old: {  // 原二级类别滚动位置
					scrollTop: 0
				}
			}
		},
		methods: {
			async getCategories() {
				const res = await this.$request({
					url: '/categories'
				})
				this.categoryList = res.message
			},
			// 记录原分类位置
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			// 切换类别
			switchCat(index) {
				this.cateId = index
				// 先回到原位置
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					// 再滚动到头部
					this.scrollTop = 0
				});
			},
			// 跳转至搜索列表
			go2search(name) {
				uni.navigateTo({
					url: '../SearchList/SearchList?kw=' + name
				})
			}
		},
		// 获取类别数据
		created() {
			this.getCategories()
		}
	}
</script>

<style lang="less" scoped>
	.category {

		.content {
			position: fixed;
			top: 100rpx;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			justify-content: space-between;

			.left {
				position: absolute;
				top: 0;
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
					font-size: 14px;
				}

				.active {
					background: #fff;
					font-weight: bold;
					color: #eb4450;
					position: relative;

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						width: 8rpx;
						height: 60rpx;
						transform: translateY(-50%);
						background: #eb4450;

					}
				}
			}

			.right {
				position: absolute;
				top: 0;
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
						font-size: 14px;

						&::before {
							content: '/';
							margin-right: 30rpx;
							color: #e0e0e0;
							font-size: 12px;
						}

						&::after {
							content: '/';
							margin-left: 30rpx;
							color: #e0e0e0;
							font-size: 12px;
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
								font-size: 12px;
								line-height: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
