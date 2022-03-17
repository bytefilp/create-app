# @react-stater/react-vite

> react 流行技术项目模板

## 模板开发规范

1. 模板文件包含在template文件夹下
2. 由于通过npm发行会导致`.gitignore`文件丢失，所以解决方法是在模板文件中加入gitignore文件，通过安装器安装时将其改为`.gitignore`
3. 切记发布之前务必删除所有不需要上传文件，如`node_modules`文件夹以及IDE创建的临时文件夹

## TODO:

- [ ] 发布 `@react-stater/react-vite` 和 `@react-stater/create-app` 到npm当中
- [ ] 模板文件支持模板语法
- [ ] 引入mockJS支持数据mock文件创建
