<template>
	<view class="search-page">
		<view class="search-bar">
			<input type="text" v-model.trim="searchKeyWord" placeholder="请输入您想要的商品" @confirm="searchEvent" confirm-type="search" @blur="clearShow=false" @focus="clearShow=true" focus />
			<icon type="search" class="search-icon" size="36rpx"></icon>
			<icon class="clear-icon" type="clear" size="26rpx" v-show="searchKeyWord.length && clearShow" @click="searchKeyWord = ''"></icon>
			<button type="default" size="mini" @click="back">取消</button>
		</view>
		<view class="search-box">
			<view class="top">
				<text>历史搜索</text>
				<icon type="clear" size="30rpx" color="#cccccc" @click="clearHistory" v-if="searchHistoryList.length"></icon>
			</view>
			<view class="search-list">
				<text class="search-record" @click="historySearch(item)" v-for="(item, index) in searchHistoryList" :key="index">{{ item }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyWord: '', // 搜索关键字
				clearShow: false,
				searchHistoryList: [], // 搜索记录
				go2List: true
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
		created() {
			this.$bus.$on('saveHistory', (kw) => {
				this.go2List = false
				this.historySearch(kw)
			})
		},
		methods: {
			back() {
				uni.navigateBack()
			},
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
			// 点击历史搜索进行搜索
			historySearch(kw) {
				this.searchKeyWord = kw
				this.searchEvent()
			},
			// 搜索Í
			searchEvent() {
				if (this.searchKeyWord.length <= 0) return
				// 添加搜索记录到列表开头
				this.searchHistoryList.unshift(this.searchKeyWord)
				this.searchHistoryList.length > 10 && (this.searchHistoryList = this.searchHistoryList.slice((0, 10)))
				// 去重
				this.searchHistoryList = [...new Set(this.searchHistoryList)]
				this.saveHistory({
					data: this.searchHistoryList
				})
				// 跳转到搜索列表界面
				this.go2List && uni.navigateTo({
					url: '/pages/SearchList/SearchList?kw=' + this.searchKeyWord
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
				font-size: 13px;
				padding-left: 68rpx;
				color: #333;
				// padding-right: 70rpx;
			}

			button {
				height: 60rpx;
				margin-left: 20rpx;
				background: #eee;
				color: #333;
				width: 160rpx;
			}

			.search-icon {
				position: absolute;
				left: 38rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 34rpx;
				height: 30rpx;
				overflow: hidden;
			}
			.clear-icon {
				position: absolute;
				right: 220rpx;
				z-index: 99;
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
					font-size: 13px;
					background: #dddddd;
					padding: 10rpx 20rpx;
					color: #333;
					margin: 0 30rpx 20rpx 0;
				}
			}
		}
	}
</style>
