window.addEventListener('load', function() {
	const linkList = document.getElementById('link-list');
	const links = Array.from(linkList.children);
	const highlight = document.getElementById('highlight');
	let highlightStyle = highlight.style;

	const linkContainers = {
		projects: {link: 'project-nav', div: document.getElementById('project-container'), display: 'grid'},
		resume: {link: 'resume-nav', div: document.getElementById('resume-container'), display: 'flex'},
		contact: {link: 'contact-nav', div: document.getElementById('contact-container'), display: 'flex'}
	}

	let current = 'projects';

	function switchTo(target) {
		let selectedContainer = linkContainers[current];
		selectedContainer.div.style.display = 'none';

		selectedContainer = linkContainers[target];
		selectedContainer.div.style.display = selectedContainer.display;

		current = target;
	}

	let mouseInList = false;
	linkList.addEventListener('mouseleave', () => {
		highlightStyle.opacity = '0';
		highlightStyle.transition = 'opacity 0.2s';
		mouseInList = false;
	});

	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		if (link.tagName == 'DIV') break;

		link.addEventListener('mouseover', () => {
			if (mouseInList)
				highlightStyle.transition = 'opacity 0.2s, left 0.1s';
			else
				highlightStyle.opacity = '1';

			let left = (200 * i).toString() + 'px';
			highlightStyle.left = left;

			mouseInList = true;
		});

		link.addEventListener('mousedown', () => {
			let target = link.id.substring(0, link.id.length - 4);
			if (target != current) {
				document.getElementById(current + '-nav').className = '';
				link.className = 'selected';
				switchTo(target);
			}
		});
	}
});
