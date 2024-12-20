# 个人网站首页和管理端

## 启动项目

```sh
npm run deploy
```

```sh
npm start
```

## 构建项目

使用 `vite build` 即可。

## 注意
vite想要本地开发代理生效需要的node版本比较高（ps: 最好大于20，已知18不行）

## windows下开发配置
jetbrains 设置 编辑器-代码样式-行分割符 修改为 unix 和 macOS /n

关闭lf crlf 自动转换
> git config --global core.autocrlf false

拒绝提交包含混合换行符的文件
> git config --global core.safecrlf true
