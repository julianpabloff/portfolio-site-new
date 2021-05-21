window.addEventListener('load', function() {
	const projects = document.querySelector('div.project-container').children;
	for (let project of projects) {
		const children = project.children;
		const movingDiv = children.item(1);
		const expand = children.item(2);
		const seeMore = expand.children.item(0);
		project.addEventListener('mouseenter', () => {
			movingDiv.style.bottom = '200px';
			seeMore.style.opacity = '1';
		});
		project.addEventListener('mouseleave', () => {
			movingDiv.style.bottom = '0px';
			seeMore.style.opacity = '0';
		});
		expand.addEventListener('mousedown', () => {
			console.log('See more');
		});

		/*
		const techIconsDiv = movingDiv.children.item(0).children.item(1);
		// const icons = Array.from(techIconsDiv.children);
		const icons = techIconsDiv.children;
		// const labels = icons.pop();
		const labels = techIconsDiv.lastElementChild;
		console.log(icons);
		console.log(labels);
		for (let i = 0; i < icons.length - 1; i++) {
			let img = icons[i];
			let label = labels.children.item(i);
			img.addEventListener('mouseenter', e => {
				label.style.opacity = '1';
			});
			img.addEventListener('mousemove', e => {
				// console.log(e.offsetX.toString() + ', ' + e.offsetY.toString());
				label.style.left = (e.offsetX + (36 * i) + 20).toString() + 'px';
				label.style.top = (e.offsetY - 50).toString() + 'px';
			});
			img.addEventListener('mouseleave', e => {
				label.style.opacity = '0';
				label.style.left = '0';
				label.style.top = '0';
			});
		}
		*/
	}
});
