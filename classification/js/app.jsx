// 通过闭包定义一个模块
(function ($, React, ReactRouter, Reflux) {
// 定义一些初始化数据
var BANNER_NUM = 2; 	// banner图片
var ITEM_NUM = 33;		// item背景图片
var app = $('#app');	// 容器元素
var DataBase = null; 	// 存储的数据对象

// 第一步 创建分类的消息对象
var TypeAction = Reflux.createActions(['changeType'])
// 第二步 创建store，存储数据
var TypeStore = Reflux.createStore({
	// 绑定消息对象的
	listenables: [TypeAction],
	// 定义TypeAction中每一个消息的回调函数
	onChangeType: function (query) {
		// 过滤DataBase中的数据，找去type是query的数据
		var result = [];
		DataBase.forEach(function (obj) {
			// obj的type要等于query
			if (obj.type === query) {
				// 存储数据
				result.push(obj);
			}
		})
		// 通过this.trigger更新数据
		this.trigger(result);
	}
})
// 第一步 定义搜索aciton对象
var SearchAction = Reflux.createActions(['changeSearch']);
// 第二步 定义搜索store对象
var SearchStore = Reflux.createStore({
	listenables: [SearchAction],
	onChangeSearch: function (query) {
		// 根据query过滤数据
		var result = [];
		DataBase.forEach(function (obj) {
			// 判断每一个属性是否包含query
			for (var i in obj) {
				// 属性值是否包含query
				if (obj[i].indexOf(query) >= 0) {
					// 存储
					result.push(obj);
					// 不需要再次遍历
					return;
				}
			}
		})
		// 更新数据
		this.trigger(result);
	}
})
// 导航组件
var Nav = React.createClass({
	goHome: function () {
		// 进入首页 #/
		ReactRouter.HashLocation.replace('/')
	},
	// 点击回车进入搜索页面
	goToSearch: function (e) {
		// 回车键（13）
		if (e.keyCode === 13) {
			// 输入校验
			// 去除首尾空白
			var value = e.target.value.replace(/^\s+|\s+$/g, '');
			// 必须有内容，
			if (/^\s*$/.test(value)) {
				alert('请您输入内容！');
				return ;
			}
			// 要对输入的内容，编码
			// value = encodeURIComponent(value);
			// 进入搜索页面
			ReactRouter.HashLocation.replace('/search/' + value)
			// 清空输入框内容
			e.target.value = '';
		}
	},
	render: function () {
		// 渲染输出虚拟dom
		return (
			<div className="header">
				<header className="navbar">
					<div className="container">
						<img src="img/logo.png" alt="" className="pull-left" onClick={this.goHome}/>
						<div className="navbar-form pull-right">
							<div className="form-group">
								<input type="text" className="form-control" onKeyDown={this.goToSearch}/>
							</div>
						</div>
						<ul className="nav nav-pills nav-justified">
							<li>
								<a href="#/type/movie">视频</a>
							</li>
							<li>
								<a href="#/type/games">游戏</a>
							</li>
							<li>
								<a href="#/type/news">新闻</a>
							</li>
							<li>
								<a href="#/type/sports">体育</a>
							</li>
							<li>
								<a href="#/type/buy">购物</a>
							</li>
							<li>
								<a href="#/type/friends">社交</a>
							</li>
						</ul>
					</div>
				</header>
				<div className="banner"></div>
			</div>
		)
	}
})
var Util = {
	// 随机生成一张图片
	getImageUrl: function () {
		return 'url(img/item/item' + parseInt(Math.random() * ITEM_NUM) + '.jpg)';
	},
	// 渲染列表方法
	createList: function () {
		return this.state.list.map(function (obj, index) {
			// 动态获取图片地址,设置li的样式
			var style = {
				backgroundImage: this.getImageUrl()
			}
			return (
				<li key={index} style={style}>
					<a href={obj.site}>
						<div className="content">
							<h1>{obj.name}</h1>
						</div>
						<div className="layer">
							<p>{'公司：' + obj.company}</p>
							<p>{'类型：' + obj.type}</p>
							<p>{'描述：' + obj.description}</p>
						</div>
					</a>
				</li>	
			)
		}.bind(this))
	}
}
// 分类页组件
var Type = React.createClass({
	// 继承方法
	// 第三步 绑定store,更新哪个状态，绑定哪个状态
	mixins: [Reflux.connect(TypeStore, 'list'), Util],
	getInitialState: function () {
		// 初始化默认状态
		return {
			list: []
		}
	},
	render: function () {
		return (
			<div className="section">
				<div className="box">
					<ul>{this.createList()}</ul>
				</div>
			</div>
		)
	}
})
// 搜索页组件
var Search = React.createClass({
	// 继承方法
	// 第三步，绑定list
	mixins: [Reflux.connect(SearchStore, 'list'), Util],
	getInitialState: function () {
		// 初始化默认状态
		return {
			list: []
		}
	},
	render: function () {
		return (
			<div className="section">
				<div className="box">
					<ul>{this.createList()}</ul>
				</div>
			</div>
		)
	}
})
// 首页组件
var Home = React.createClass({
	// 继承方法
	mixins: [Util],
	getInitialState: function () {
		// 初始化默认状态
		return {
			list: DataBase
		}
	},
	render: function () {
		return (
			<div className="section">
				<div className="box">
					<ul>{this.createList()}</ul>
				</div>
			</div>
		)
	}
})
// 应用程序组件
var App = React.createClass({
	render: function () {
		return (
			<div>
				<Nav></Nav>
				{/*第一步 定义路由容器*/}
				<ReactRouter.RouteHandler />
			</div>
		)
	},
	// 定义发送消息的方法
	sendAction: function () {
		// 渲染分类组件时候，我们需要发送消息的
		// 获取query
		var query = this.props.params.params.query;
		// 获取path
		var path = this.props.params.path;
		// 判断type页面
		if (path.indexOf('/type/') >= 0) {
			// 第四步 发送消息
			TypeAction.changeType(query);
		} else if (path.indexOf('/search/') >= 0) {
			// 第四步 发送消息
			SearchAction.changeSearch(query);
		}
	},
	// 组件创建完成，我们要发送消息
	componentDidMount: function () {
		this.sendAction();
	},
	// 组件更新，我们要发送消息
	componentDidUpdate: function () {
		this.sendAction();
	}
})
// 第二步 创建路由组件
var Route = React.createFactory(ReactRouter.Route);
// 默认路由组件
var DefaultRoute = React.createFactory(ReactRouter.DefaultRoute);
// 第三步 定义规则
var routes = (
	<Route path="/" handler={App}>
		{/* 假如  #/search/123 渲染Search组件 */}
		<Route path="search/:query" handler={Search}></Route>
		{/* 假如   #/type/games 渲染type组件 */}
		<Route path="type/:query" handler={Type}></Route>
		{/* 默认情况下渲染Home组件 */}
		<DefaultRoute handler={Home}></DefaultRoute>
	</Route>
);
/**
 * 定义图片加载器
 * @done 	加载完成时候的回调函数
 * @success 加载成功时候的回调函数
 * @fail 	加载失败时候的回调函数
 **/ 
function ImageLoader(done, success, fail) {
	this.done = done || function () {};
	this.success = success || function () {};
	this.fail = fail || function () {};
	// 初始化
	this.init();
}
// 定义初始化方法
ImageLoader.prototype = {
	init: function () {
		// 加载图片时候，减一，加载完成的时候加一
		// 存储banner图片数量
		this.totalBannerNum = this.bannerNum = BANNER_NUM;
		// 存储item图片数量
		this.totalItemNum = this.itemNum = ITEM_NUM;
		// 图片总数
		this.total = this.totalBannerNum + this.totalItemNum;
		// 加载所有的图片
		this.loader();
	},
	// 加载所有的图片，banner图片和item图片
	loader: function () {
		// 先加载banner图片
		while(--this.bannerNum >= 0) {
			this.loadImage(this.bannerNum, true);
		}
		// 循环结束，this.bannerNum是-1,多减了一次，所以要加回来
		++this.bannerNum;
		// 加载item图片
		while(--this.itemNum >= 0) {
			this.loadImage(this.itemNum)
		}
		// 循环结束，this.itemNum-1,多减了一次，所以要加回来
		++this.itemNum;
	},
	/**
	 * 加载完成处理num
	 * @isBanner 	是否是banner图片
	 **/
	dealNum: function (isBanner) {
		// 是banner图片，处理bannerNum
		if (isBanner) {
			this.bannerNum++;
		} else {
			// 不是banner图片，处理itemNum
			this.itemNum++;
		}
	},
	/**
	 * 当图片加载完成执行相应的回调函数
	 * @isSuccess 	是否加载成功
	 ***/
	ready: function (isSuccess) {
		// 加载完成的图片数
		var loadNum = this.itemNum + this.bannerNum;
		// 判断成功还是失败
		if (isSuccess) {
			// 执行成功的回调函数
			this.success(this.total, loadNum);
		} else {
			this.fail(this.total, loadNum);
		}
		// 如果全部加载完成，要执行done方法
		if (this.total === loadNum) {
			this.done(this.total, loadNum);
		}
	},
	/**
	 * 定义loadImage加载
	 * @id 			图片num id
	 * @isBanner 	是否是banner图片
	 **/ 
	loadImage: function (id, isBanner) {
		// 定义图片加载器
		var img = new Image();
		// 根据id获取图片的地址，
		var url = this.getUrlById(id, isBanner)
		// 定义图片加载成功时候的回调函数
		img.onload = function () {
			// 加载成功一张，我们要加一
			this.dealNum(isBanner);
			// 加载完成，执行相应的回调函数
			this.ready(true);
		}.bind(this);
		// 定义图片加载失败时候的回调函数
		img.onerror = function () {
			// 加载失败一张，我们要加一
			this.dealNum(isBanner);
			// 加载完成，执行相应的回调函数
			this.ready();
		}.bind(this);
		// 加载图片
		img.src = url;
	},
	/**
	 * 根据id获取图片的地址
	 * @id 			图片的id
	 * @isBanner 	是否是banner图片
	 **/
	getUrlById: function (id, isBanner) {
		// 判断是否是banner图片
		if (isBanner) {
			return 'img/banner/banner' + id + '.jpg';
		} else {
			// 返回item图片的地址
			return 'img/item/item' + id + '.jpg';
		}
	}
}
// 通过异步请求获取数据
$.get('data/sites.json', function (res) {
	if (res && res.errno === 0) {
		// 存储数据，加载图片
		DataBase = res.data;
		var laoderSpan = app.find('.loader-text span');
		new ImageLoader(function () {
			laoderSpan.html('100.00');
			// 第四步 启动路由渲染组件
			ReactRouter.run(routes, function (Handler, params) {
				// 可以根据Handler动态渲染页面，也可以将参数对象params传递进来
				React.render(<Handler params={params} />, app.get(0))
			})
		}, function (total, num) {
			// 变成百分数，然后保留两位小数
			laoderSpan.html((num / total * 100).toFixed(2))
		}, function (total, num) {
			laoderSpan.html((num / total * 100).toFixed(2))
		});
	}
})
})(jQuery, React, ReactRouter, Reflux)