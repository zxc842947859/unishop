const BASE_URL = 'https://www.uinav.com/api/public/v1'


export default function request({
	url,
	data,
	method,
	header,
	isShowLoading = true
}) {
	return new Promise((resolve, reject) => {
		if (isShowLoading) {
			uni.showLoading({
				title: '加载中...',
				mask: true
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
					uni.hideLoading()
				} else {
					reject(res.data)
				}
			}
		})
	})
}
