<template>
	<view>
		搜索列表
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		async onLoad(option) {
			const res = await this.$request({
				url: '/goods/search',
				data: {
					query: option.kw,
					pagenum: 1,
					pagesize: 5
				}
			})
			console.log(res)
		}
	}
</script>

<style>

</style>
