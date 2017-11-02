// 编译less文件，
fis.match('**.less', {
	parser: 'less',
	rExt: '.css'
})

// 编译jsx文件
fis.match('**.jsx', {
	parser: 'babel2',
	rExt: '.js'
})