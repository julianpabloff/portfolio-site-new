window.addEventListener('load', function() {
	const projects = document.querySelector('div.project-container').children;
	for (let project of projects) {
		const children = project.children;
		const movingDiv = children.item(1);
		const expand = children.item(2);
		const seeMore = expand.children.item(0);
		project.addEventListener('mouseover', () => {
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

		const techIconsDiv = movingDiv.children.item(0).children.item(1);
		const icons = techIconsDiv.children;
		let label = document.getElementById('tech-label');

		function handleLabelPosition(event) {
			label.style.left = (event.pageX + 15).toString() + 'px';
			label.style.top = (event.pageY - 35).toString() + 'px';
		}
		function handleLabelContent() {
			label.innerHTML = this.className;
		}
		function labelOn() {
			window.addEventListener('mousemove', handleLabelPosition);
			label.style.transition = 'opacity 0.2s';
			label.style.opacity = '1';
			for (let icon of icons)
				icon.addEventListener('mouseenter', handleLabelContent);
		}
		function labelOff() {
			window.removeEventListener('mousemove', handleLabelPosition);
			label.style.transition = 'none';
			label.style.opacity = '0';
			for (let icon of icons) 
				icon.removeEventListener('mouseenter', handleLabelContent);
		}

		techIconsDiv.addEventListener('mouseenter', labelOn);
		techIconsDiv.addEventListener('mouseleave', labelOff);
	}
});
