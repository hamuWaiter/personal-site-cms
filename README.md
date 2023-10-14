# Vue3 + Form

![](https://img.shields.io/badge/Project-Vue3-lime)

本项目为 Vue3 + Vite 构建的表单。包括输入框、单选、多选的组件。均在：`/src/forms` 。

## 启动项目

```sh
yarn
```

```sh
yarn start
```

## 构建项目

使用 `vite build` 即可。

## 表单数据

详见例子：`/src/mData.json`

```json
[
	{
		"name": "Here is the question title",
		"type": "sub=input/checkbox/radio",
		"{sub}": {
			"type": "when is 'input'",
			"radios": "when is ''radio",
			
			"value": any
		}
	}
]
```