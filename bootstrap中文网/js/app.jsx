// 定义导航组件
var Nav = React.createClass({
	// 定义初始化状态
	getInitialState: function () {
		// 哪个导航选中，由显示的页面决定
		var cls = {};
		cls[this.props.page] = 'choose'
		return {
			cls: cls
		}
	},
	// 点击导航回调函数
	childChangeNav: function (val) {
		// 更新自己的状态
		var cls = {};
		// 哪个被选中
		cls[val] = 'choose';
		// 更新状态
		this.setState({
			cls: cls
		})
		// 执行父组件的回调函数
		this.props.changeNav(val)
	},
	render: function () {
		// 点击导航，切换显示的页面的
		return (
			<div className="header navbar navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<a className="navbar-brand" onClick={this.childChangeNav.bind(this, 'home')}>Bootstrap</a>
					</div>
					<ul className="navbar-nav nav nav-pills pull-right">
						<li>
							<a>主题/模板</a>
						</li>
						<li>
							<a>Bootstrap中文网</a>
						</li>
					</ul>
					<ul className="navbar-nav nav nav-pills">
						<li>
							<a className={this.state.cls.start} data-id="start" onClick={this.childChangeNav.bind(this, 'start')}>起步</a>
						</li>
						<li>
							<a className={this.state.cls.css} onClick={this.childChangeNav.bind(this, 'css')}>全局 CSS 样式</a>
						</li>
						<li>
							<a className={this.state.cls.component} onClick={this.childChangeNav.bind(this, 'component')}>组件</a>
						</li>
						<li>
							<a className={this.state.cls.javascript}  onClick={this.childChangeNav.bind(this, 'javascript')}>JavaScript 插件</a>
						</li>
						<li>
							<a className={this.state.cls.marker} onClick={this.childChangeNav.bind(this, 'marker')}>定制</a>
						</li>
						<li>
							<a>网站实例</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
})

// 定义首页组件
var Home = React.createClass({
	// 初始化状态数据
	getInitialState: function () {
		return {
			firstList: [
				{
					img: 'img/sass-less.png',
					h3: '预处理脚本',
					p: '虽然可以直接使用 Bootstrap 提供的 CSS 样式表，不要忘记 Bootstrap 的源码是基于最流行的 CSS 预处理脚本 - <a href="">Less</a> 和 <a href="">Sass</a> 开发的。你可以采用预编译的 CSS 文件快速开发，也可以从源码定制自己需要的样式。'
				},
				{
					img: 'img/devices.png',
					h3: '一个框架、多种设备',
					p: '你的网站和应用能在 Bootstrap 的帮助下通过同一份代码快速、有效适配手机、平板、PC 设备，这一切都是 CSS 媒体查询（Media Query）的功劳。'
				},
				{
					img: 'img/components.png',
					h3: '特性齐全',
					p: 'Bootstrap 提供了全面、美观的文档。你能在这里找到关于 HTML 元素、HTML 和 CSS 组件、jQuery 插件方面的所有详细文档。'
				}
			],
			secondList: [
				{
					img: 'img/01.png'
				},
				{
					img: 'img/02.jpg'
				},
				{
					img: 'img/03.png'
				},
				{
					img: 'img/04.png'
				}
			]
		}
	},
	// 渲染列表方法
	getUlList: function (data) {
		return data.map(function (obj, index) {
			// 判断如果有h3和p属性，就渲染第一个列表，否则渲染第二个列表
			if (obj.p && obj.h3) {
				var content = {
					__html: obj.p
				}
				return (
					<li key={index}>
						<img src={obj.img} alt=""/>
						<h3>{obj.h3}</h3>
						<p dangerouslySetInnerHTML={content}></p>
					</li>
				)
			} else {
				return (
					<li key={index}>
						<img src={obj.img} alt=""/>
					</li>
				)
			}
			
		})
	},
	render: function () {
		// 渲染输出虚拟dom
		return (
			<section style={{display: this.props.show}} className="home">
				<div className="banner">
					<div className="big-logo">B</div>
					<h1>Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。</h1>
					<span className="btn btn-lg">下载 Bootstrap</span>
					<p className="home-info">当前版本： v3.3.7 | 文档更新于：2017-01-23</p>
				</div>
				<div className="first-list">
					<div className="container">
						<h2>为所有开发者、所有应用场景而设计。</h2>
						<p className="info">Bootstrap 让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>
						<div className="line"></div>	
						<ul className="clearfix">{this.getUlList(this.state.firstList)}</ul>
						<div className="line"></div>	
						<p className="description">Bootstrap 是完全开源的。它的代码托管、开发、维护都依赖 GitHub 平台。</p>
						<div className="btn btn-lg">查看GitHub项目主页</div>
					</div>
				</div>
				<div className="second-list">
					<div className="container">
						<h2>基于 Bootstrap 构建的网站</h2>
						<p className="info">全球数以百万计的网站都是基于 Bootstrap 构建的。你可以先参观一下我们提供的实例精选或者看一看我们粉丝的网站吧。</p>
						<div className="line"></div>
						<ul className="clearfix">{this.getUlList(this.state.secondList)}</ul>
						<div className="line"></div>
						<p className="description">我们在“优站精选”里展示了许多精美的 Bootstrap 网站。</p>
						<div className="btn btn-lg">逛一逛“优站精选</div>
					</div>
				</div>
			</section>
		)
	}
})

// banner组件
var Banner = React.createClass({
	render: function () {
		return (
			<div className="banner">
				<div className="container">
					<h2>{this.props.title}</h2>
					<p>{this.props.intro}</p>
				</div>
			</div>
		)
	}
})

// 定义Article组件
var Article = React.createClass({
	createList: function () {
		return this.props.data.map(function (obj, index) {
			return (
				<li key={index} id={obj.id}>
					<h3>{obj.title}</h3>
					<p>{obj.content}</p>
				</li>
			)
		})
	},
	render: function () {
		return (
			<article className="article">
				<ul>{this.createList()}</ul>
			</article>
		)
	}
})

// 定义aside组件
var Aside = React.createClass({
	// 定义渲染列表的方法
	createList: function () {
		return this.props.data.map(function (obj, index) {
			return (
				<li key={index}>
					<a href={'#' + obj.id}>{obj.title}</a>
				</li>
			)
		})
	},
	render: function () {
		return (
			<aside className="aside">
				<ul>{this.createList()}</ul>
			</aside>
		)
	}
})

// 定义content组件
var Content = React.createClass({
	// 初始化属性数据
	getDefaultProps: function () {
		return {
			data: []
		}
	},
	render: function () {
		return (
			<div className="container">
				<Article data={this.props.data}></Article>
				<Aside data={this.props.data}></Aside>
			</div>
		)
	}
})

// 定义一个工具方法对象
var Util = {
	// 封装获取数据的方法
	ajax: function (url, fn) {
		// 实现异步请求方法
		var xhr = new XMLHttpRequest();
		// 监听change事件
		xhr.onreadystatechange = function () {
			// 监听状态
			if (xhr.readyState === 4) {
				// 监听状态码
				if (xhr.status === 200) {
					// 返回成功，我们执行回调函数
					fn && fn(JSON.parse(xhr.responseText));
				}
			}
		}
		// 打开请求
		xhr.open('GET', url, true);
		// 发送请求
		xhr.send(null);
	}
}

// 抽象一个组件Page，来渲染所有页面
var Page = React.createClass({
	// 混合继承方法
	mixins: [Util],
	// 初始化状态
	getInitialState: function () {
		return {
			data: []
		}
	},
	render: function () {
		return (
			<section className="section" style={{display: this.props.show}}>
				<Banner title={this.props.title} intro={this.props.intro}></Banner>
				<Content data={this.state.data}></Content>
			</section>
		)
	},
	// 发送请求
	componentDidMount: function () {
		var me = this;
		// 发送请求
		this.ajax(this.props.url, function (res) {
			me.setState({
				data: res
			})
		})
	}
})

// 定义应用程序组件
var App = React.createClass({
	// 定义属性值的类型，以及哪些属性值是必须的
	propTypes: {
		// key 表示属性名称
		// value 表示属性的状态（可以定义属性类型以及是否必填）
		pageName: React.PropTypes.string.isRequired
	},
	// 定义默认状态
	getInitialState: function () {
		// 定义哪个页面需要显示
		var page = {
			home: 'none',
			start: 'none',
			css: 'none',
			component: 'none',
			javascript: 'none',
			marker: 'none'
		}
		// 比如显示首页
		// page.home = 'block';
		page[this.props.pageName] = 'block'
		// 初始化状态
		return {
			page: page
		}
	},
	// 切换导航的回调函数
	changeNav: function (val) {
		// 根据子组件传递val切换页面
		var page = this.state.page;
		// 所有页面设置成none，val页面设置成block
		for (var i in page) {
			page[i] = 'none';
		}
		// 排他法
		page[val] = 'block';
		// 更新状态
		this.setState({
			page: page
		})
	},
	// 获取显示页面的名称
	getShowPageName: function () {
		// 通过状态寻找
		var result = '';
		for (var i in this.state.page) {
			// 值是block
			if (this.state.page[i] === 'block') {
				// 我们保存的是页面的名称
				result = i;
			}
		}
		// 将结果返回
		return result;
	},
	render: function () {
		// 缓存page
		var page = this.state.page;
		// 哪个页面显示，就要将页面名称传递给nav
		return (
			<div>
				{/*引入导航组件*/}
				{/*<Nav page={this.getShowPageName()} changeNav={this.changeNav}></Nav>*/}
				<Nav page={this.props.pageName} changeNav={this.changeNav}></Nav>
				<Home show={page.home}></Home>
				<Page show={page.start} title="起步" intro="简要介绍 Bootstrap，以及如何下载、使用，还有基本模版和案例，等等。" url="data/start.json"></Page>
				<Page show={page.css} title="全局 CSS 样式" intro="设置全局 CSS 样式；基本的 HTML 元素均可以通过 class 设置样式并得到增强效果；还有先进的栅格系统。" url="data/css.json"></Page>
				<Page show={page.component} title="组件" intro="无数可复用的组件，包括字体图标、下拉菜单、导航、警告框、弹出框等更多功能。" url="data/component.json"></Page>
				<Page show={page.javascript} title="JavaScript 插件" intro="jQuery 插件为 Bootstrap 的组件赋予了“生命”。可以简单地一次性引入所有插件，或者逐个引入到你的页面中。" url="data/js.json"></Page>
				<Page show={page.marker} title="定制并下载 Bootstrap" intro="通过自定义 Bootstrap 组件、Less 变量和 jQuery 插件，定制一份属于你自己的 Bootstrap 版本吧。" url="data/download.json"></Page>
				{/*this.createPage()*/}
			</div>
		)
	}
})
// 渲染到页面中
ReactDOM.render(<App pageName='css' />, document.getElementById('app'))