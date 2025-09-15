// 懒加载实现
export const watchImagesIntersecting = (images: NodeListOf<HTMLImageElement>) => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target as HTMLImageElement;
				img.onload = () => {
					img.removeAttribute('data-src');
					// img.classList.add('lazy-loaded');
					// img.classList.remove('lazy-loading');
				};

				img.onerror = () => {
					console.error(`Failed to load image: ${img.dataset.src}`);
					// img.classList.add('lazy-load-error');
					// img.classList.remove('lazy-loading');
				};

				// img.classList.add('lazy-loading');
				img.src = img.dataset.src ?? '';

				observer.unobserve(img);
			}
		});
	});

	images.forEach(img => observer.observe(img));
};

// 监听含data-src的img，添加observer来替换src为真实地址实现懒加载，查找不到（dom未挂载完成）会重试
export const lazyLoadImagesWithRetry = (maxRetries = 5, delay = 100): void => {
	let retries = 0;

	const tryLoadImages = () => {
		const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img[data-src]');
		// console.log(images);

		if (images.length > 0 || retries >= maxRetries) {
			watchImagesIntersecting(images);
		} else {
			// 未找到图片，重试
			retries++;
			setTimeout(tryLoadImages, delay);
		}
	};

	tryLoadImages();
};
