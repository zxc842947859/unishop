const BASE_URL = 'https://www.uinav.com/api/public/v1'

export default function request({
	url,
	data,
	method,
	header,
	isShowLoading = true
}) {
	return new Promise((resolve, reject) => {
		// 开启加载中动画
		if (isShowLoading) {
			uni.showLoading({
				title: '加载中...',
				mask: true // 开启透明遮罩,防止点击穿透
			})
		}
		uni.request({
			url: BASE_URL + url,
			data: data,
			method: method,
			header: header,
			success: res => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					reject(res.data)
				}
			},
			fail: err => {
				reject(err)
			},
			// 请求完成回调
			complete: () => {
				// 关闭加载动画
				isShowLoading && uni.hideLoading()
			}
		})
	})
}
