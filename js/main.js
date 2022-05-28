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
		if (windowWidth > 650) {
			highlightStyle.opacity = '0';
			highlightStyle.transition = 'opacity 0.2s';
		}
		mouseInList = false;
	});

	let tabletMode = document.documentElement.clientWidth <= 990;
	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		if (link.tagName == 'DIV') break;

		link.addEventListener('mouseover', () => {
			if (windowWidth > 990) {
				if (mouseInList) highlightStyle.transition = 'opacity 0.2s, left 0.1s';
				else highlightStyle.opacity = '1';
			}
			if (windowWidth > 990) setLeft(i);
			mouseInList = true;
		});

		link.addEventListener('mousedown', () => {
			if (windowWidth <= 990) {
				setLeft(i);
				highlightStyle.transition = 'none';
				highlightStyle.boxShadow = '0 0 3px 2px var(--selected-color)';
				highlightStyle.opacity = '1';
				setTimeout(() => {
					highlightStyle.transition = 'opacity 0.5s';
					highlightStyle.opacity = '0';
					setTimeout(() => {
						highlightStyle.transition = 'opacity 0.5s, left 0.1s';
						highlightStyle.boxShadow = 'none';
					}, 500);
				}, 1);
			}
			let target = link.id.substring(0, link.id.length - 4);
			if (target != current) {
				document.getElementById(current + '-nav').className = '';
				link.className = 'selected';
				switchTo(target);
			}
		});

	}
	function setLeft(index) {
		let left;
		if (windowWidth > 650) left = 200 * index;
		else left = (windowWidth - 50) * index / 3;
		highlightStyle.left = left.toString() + 'px';
	}
	function moveHighlight(index) {
		if (mouseInList) highlightStyle.transition = 'opacity 0.2s, left 0.1s';
		else highlightStyle.opacity = '1';

		let left = (200 * index).toString() + 'px';
		highlightStyle.left = left;

		mouseInList = true;
	}

	let windowWidth = document.documentElement.clientWidth;
	window.addEventListener('resize', event => {
		windowWidth = document.documentElement.clientWidth;
		if (windowWidth > 990 && tabletMode) {
			tabletMode = false;
		} else if (windowWidth <= 990 && !tabletMode) {
			highlightStyle.opacity = '0';
			tabletMode = true;
		}
	});
});
