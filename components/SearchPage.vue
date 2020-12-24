<template>
	<view class="search-page">
		<view class="search-bar">
			<input type="text" value="" placeholder="请输入您想要的商品" />
			<icon type="search" size="36rpx"></icon>
			<button type="default" size="mini">取消</button>
		</view>
		<view class="search-box">
			<view class="top">
				<text>历史搜索</text>
				<icon type="clear" size="30rpx" color="#cccccc"></icon>
			</view>
			<view class="search-list">
				<text class="search-record">小米</text>
				<text class="search-record">小米小米</text>
				<text class="search-record">小米小米小米</text>
				<text class="search-record">小米小</text>
				<text class="search-record">小米小米小</text>
				<text class="search-record">小米小米</text>
				<text class="search-record">小米小米小米</text>
				<text class="search-record">小米小</text>
				<text class="search-record">小米小米小</text>
				<text class="search-record">小米小米</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	.search-page {
		.search-bar {
			// height: 120rpx;
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
					margin: 0 30rpx 20rpx 0 ;
				}
			}
		}
	}
</style>
