window.addEventListener('load', function() {
	const linkList = document.getElementById('link-list');
	const links = Array.from(linkList.children);
	const highlight = document.getElementById('highlight');
	let highlightStyle = highlight.style;

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
			console.log('Clicked on ' + link.innerHTML);
		});
	}
});
