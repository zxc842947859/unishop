<template>
	<view class="search-page">
		<view class="search-bar">
			<input type="text" v-model="searchKeyWord" placeholder="请输入您想要的商品" @confirm="searchEvent" />
			<icon type="search" size="36rpx"></icon>
			<button type="default" size="mini">取消</button>
		</view>
		<view class="search-box">
			<view class="top">
				<text>历史搜索</text>
				<icon type="clear" size="30rpx" color="#cccccc" @click="clearHistory"></icon>
			</view>
			<view class="search-list">
				<text class="search-record" v-for="(item, index) in searchHistoryList" :key="index">{{ item }}</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyWord: '', // 搜索关键字
				searchHistoryList: []
			}
		},
		onShow() {
			uni.getStorage({
				key: 'historyList',
				success: (res) => {
					this.searchHistoryList = res.data
				}
			})
		},
		methods: {
			saveHistory({
				key = 'historyList',
				data
			}) {
				// 存储
				uni.setStorage({
					key: key,
					data: data,
					success: () => {}
				})
			},
			// 搜索Í
			searchEvent() {
				// 添加搜索记录到列表开头
				this.searchHistoryList.unshift(this.searchKeyWord)
				this.searchHistoryList.length > 10 && (this.searchHistoryList = this.searchHistoryList.slice((0, 10)))
				// 去重
				this.searchHistoryList = [...new Set(this.searchHistoryList)]
				console.log(this.searchHistoryList)
				this.saveHistory({
					data: this.searchHistoryList
				})
				// 跳转到搜索列表界面
				uni.navigateTo({
					url: '/components/SearchList/SearchList?kw=' + this.searchKeyWord
				})
			},
			// 清除历史搜索记录
			clearHistory() {

				this.searchHistoryList.length && uni.showModal({
					title: '提示',
					content: '您确定要删除历史搜索记录嘛?',
					success: (res) => {
						res.confirm && uni.removeStorage({
							key: 'historyList',
							success: () => {
								this.searchHistoryList = []
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-page {
		.search-bar {
			position: relative;
			background: #eeeeee;
			padding: 30rpx 16rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			input {
				flex: 1;
				height: 60rpx;
				background: #fff;
				font-size: 24rpx;
				padding-left: 68rpx;
				color: #333;
			}

			button {
				height: 60rpx;
				margin-left: 20rpx;
				background: #eee;
				color: #333;
				width: 160rpx;
			}

			icon {
				position: absolute;
				left: 38rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 34rpx;
				height: 30rpx;
				overflow: hidden;
			}
		}

		.search-box {
			.top {
				padding: 0 16rpx;
				color: #333;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					line-height: 88rpx;
				}

				icon {
					margin-right: 16rpx;
				}
			}

			.search-list {
				display: flex;
				padding: 0 16rpx;
				justify-content: flex-start;
				flex-wrap: wrap;

				.search-record {
					font-size: 24rpx;
					background: #dddddd;
					padding: 10rpx 20rpx;
					color: #333;
					margin: 0 30rpx 20rpx 0;
				}
			}
		}
	}
</style>
