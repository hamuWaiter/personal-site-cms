export function lazyLoadPlugin (md) {
	const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

	md.renderer.rules.image = function(tokens, idx, options, env, self) {
		// 获取当前图片token
		const token = tokens[idx];

		const [_, src] = token.attrs.find(([attrName, val]) => attrName === 'src') ?? [];

		// 添加data-src属性用来在页面监听图片是否出现在视口
		token.attrSet('data-src', src);
		// 将src替换为占位图片
		token.attrSet('src', '/loading.gif');

		// 调用默认渲染器
		return defaultRender(tokens, idx, options, env, self);
	};

	return md;
}