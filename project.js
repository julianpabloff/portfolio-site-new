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
		project.addEventListener('mouseout', () => {
			movingDiv.style.bottom = '0px';
			seeMore.style.opacity = '0';
		});
		expand.addEventListener('mousedown', () => {
			console.log('See more');
		});

		const techIconsDiv = movingDiv.children.item(0).children.item(1);
		const icons = techIconsDiv.children;
		const label = document.getElementById('tech-label');
		let labelStyle = label.style;

		function handleLabelPosition(event) {
			labelStyle.left = (event.pageX + 15).toString() + 'px';
			labelStyle.top = (event.pageY - 35).toString() + 'px';
		}
		function handleLabelContent() {
			labelStyle.display = 'initial';
			label.innerHTML = this.className;
		}
		function labelOn() {
			window.addEventListener('mousemove', handleLabelPosition);
			for (let icon of icons)
				icon.addEventListener('mouseenter', handleLabelContent);
		}
		function labelOff() {
			window.removeEventListener('mousemove', handleLabelPosition);
			labelStyle.display = 'none';
			for (let icon of icons) 
				icon.removeEventListener('mouseenter', handleLabelContent);
		}

		techIconsDiv.addEventListener('mouseenter', labelOn);
		techIconsDiv.addEventListener('mouseleave', labelOff);
	}
});
