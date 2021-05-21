window.addEventListener('load', function() {
	const button = document.getElementById('button');
	const popup = document.getElementById('pop-up');
	let hidden = true;
	button.addEventListener('mousedown', () => {
		popup.style.opacity = hidden * 1;
		popup.style.height = (300 * hidden).toString() + 'px';
		hidden = !hidden;
	});

	const linkList = document.getElementById('link-list');
	const links = Array.from(linkList.children);
	const highlight = document.getElementById('highlight');
	const clickable = document.getElementById('clickable');
	let highlightStyle = highlight.style;
	let clickableStyle = clickable.style;

	const anchor = document.querySelector('div#clickable a');
	const urlList = [
		'https://google.com',
		'https://youtube.com',
		'https://drive.google.com'
	];

	let mouseInList = false;
	linkList.addEventListener('mouseleave', () => {
		highlightStyle.opacity = '0';
		highlightStyle.transition = 'opacity 0.2s';
		clickableStyle.display = 'none';
		mouseInList = false;
	});

	let position = 0;
	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		if (link.tagName == 'DIV') continue;

		link.listPosition = position;
		position += 1;

		link.addEventListener('mouseover', () => {
			if (mouseInList) highlightStyle.transition = 'opacity 0.2s, left 0.1s';
			else highlightStyle.opacity = '1';

			let left = (200 * link.listPosition).toString() + 'px';
			highlightStyle.left = left;
			clickableStyle.left = left;
			clickableStyle.display = 'block';
			anchor.href = urlList[link.listPosition];

			mouseInList = true;
		});
	}
});
