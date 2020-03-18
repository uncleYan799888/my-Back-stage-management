# demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


1.登录页没什么好说的，就是账号密码登录
  ADMIN   账号sunzeyan密码sunzeyan
  TOURIS  账号zhangxueyou密码zhangxueyou
          账号gutianle密码gutianle
2.输入账号密码登录后，后台会返回一个token,将token存在sessionStorage里，main.js里路由守卫有一个验证，若本地有token，
  则根据token向后台发出请求获取用户信息和动态菜单并存在vuex里面，其实存在sessionStorage里面应该也可以，但是想着信息方面还是不要存在本地，如果刷新了那就根据token再重新获取就行了，不同身份可访问的页面不同，前端再动态生成，若没有token，则跳转到login页
  关于动态生成路由的功能：
  store/module/permission.js,router/asyncRouter.js,utils/createRouter.js
  用到了vuex的模块化功能，将用户信息和动态路由存在了permission.js里面，思路是这样的，用户第一次登陆，根据token获取信息和路由，在asyncRouter.js里面先写好所有路由，一开始的时候只有login页面和404，获取了用户信息之后将获取到的可访问的路由与axyncRouter一一比对，比对生成主要在createRouter.js，比对完再用router.addRoutes()添加进router，然后将信息存在vuex里，主页生成动态导航的时候要用到，操作完毕后再跳转路由到主页
3.ADMIN可以访问todoListADMIN页面，TOURIS可以访问todoList页面
  业务流程： admin添加事项  -->待办执行提交  -->admin审批，可以通过或者驳回，通过状态则为已完成，事项结束，驳回重新转到TOURIS流程
  流程比较简单，但是后端也是自己写的，旨在展示流程的行走，后期也可以在此基础拓展
4.表格因为数据是自己一条一条插入的，所以进去就直接显示出来了，，，，
  里面的小图片是后台返回base64直接转化的，其他页面的头像也是
5.添加餐馆的页面的上传照片功能也是将图片先转化成base64码再上传到后端存储，用element-ui的form表单功能写的，验证什么的还是比较方便的
6.国际化功能是i18n
7.src/api  里面根据模块分好简单封装好了axios供页面调用
8.utils 放了供全局调用的方法，封装axios,生成路由功能
9.页面都在views里面
10.页面比较简单，也就这几个功能，旨在展示