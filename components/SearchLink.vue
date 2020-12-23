<template>
	<view class="search">
		<view class="top">
			<input class="search" @click="searchEvent" value="" placeholder="搜索" confirm-type="search" disabled />
			<icon class="icon" type="search" color="#bbb" size="24rpx"></icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			searchEvent() {
				console.log('搜索')
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		.top {
			position: relative;
			height: 60rpx;
			padding: 20rpx 16rpx;
			background: #eb4450;

			.search {
				height: 60rpx;
				background: #fff;
				text-align: center;
				font-size: 26rpx;
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
	}
</style>
