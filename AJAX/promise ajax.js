// promise ajax
function myPromiseAjax(obj) {
	let {
		url,
		methods,
		success,
		error
	} = obj;
	let p = new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();

		xhr.open(methods, url, true);
		xhr.send()
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					resolve(xhr.responseURL);
				} else {
					reject(xhr.statusText);
					
				}
			}
		}

	})
    p.then(success,error)
	return p
}
myPromiseAjax({
    url:"https://www.runoob.com/try/ajax/ajax_info.txt",
    methods:"GET",
    success:(res)=>{console.log(res)},
    error:(res)=>{console.log(res)}
})
