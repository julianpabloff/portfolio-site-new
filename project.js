window.addEventListener('load', function() {
	const projects = document.querySelector('div.project-container').children;
	for (let project of projects) {
		const children = project.children;
		const banner = children.item(1);
		const expand = children.item(2);
		const seeMore = expand.children.item(0);
		project.addEventListener('mouseenter', () => {
			banner.style.bottom = '200px';
			seeMore.style.opacity = '1';
		});
		project.addEventListener('mouseleave', () => {
			banner.style.bottom = '0px';
			seeMore.style.opacity = '0';
		});
		expand.addEventListener('mousedown', () => {
			console.log('See more');
		});
	}
});
