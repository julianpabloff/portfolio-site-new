window.addEventListener('load', function() {
	const html = document.querySelector('html');
	const body = document.getElementById('main-container');
	const backdrop = document.getElementById('modal-background');
	let backdropStyle = backdrop.style;

	let activeModal; let activeModalIndex = null;
	const modals = document.getElementById('modal-background').children;
	let modalTransition = 300; // opacity transition

	let htmlScrollPosition = html.scrollTop; // remember where html was at

	let waitToCollapse = false;
	function collapseProject(p) {
		// console.log('Trying to collapse project shelf');
		if (waitToCollapse) return;
		let projectChildren = projects[p].children;
		let movingDiv = projectChildren.item(1);
		let seeMore = projectChildren.item(2).firstElementChild;
		movingDiv.style.bottom = '0';
		seeMore.style.opacity = '0';
	}
	function resetGallery(p) {
		// I would have to make the gallery variables global
		// for this to work bleh idk
	}

	const projects = document.querySelector('div#project-container').children;
	const lefts = document.getElementsByClassName('gallery-left');
	const rights = document.getElementsByClassName('gallery-right');
	const galleries = document.getElementsByClassName('gallery-images-container');
	const indicators = document.getElementsByClassName('indicator');

	for (let p = 0; p < projects.length; p++) {
		let project = projects[p];
		const children = project.children;
		const movingDiv = children.item(1);
		const expand = children.item(2);
		const seeMore = expand.children.item(0);
		project.addEventListener('mouseover', function() {
			movingDiv.style.bottom = '210px';
			seeMore.style.opacity = '1';
		});
		project.addEventListener('mouseleave', () => collapseProject(p));

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

		expand.addEventListener('click', () => {
			activeModal = modals[p];
			activeModalIndex = p;
			let modalStyle = activeModal.style;
			htmlScrollPosition = html.scrollTop;
			body.style.top = '-' + html.scrollTop.toString() + 'px';
			body.style.position = 'fixed';
			html.scrollTop = 0;
			waitToCollapse = true;
			// setTimeout(() => {
			// 	waitToCollapse = false;
			// 	collapseProject();
			// }, modalTransition);
			backdropStyle.display = 'flex';
			setTimeout(() => { 
				backdropStyle.opacity = '1';
				modalStyle.display = 'flex';
				setTimeout(() => {
					modalStyle.top = '80px';
				}, 1);
			}, 1);
		});

		let modal = modals[p];
		const exitButton = modal.children.item(0).firstElementChild;
		exitButton.addEventListener('click', closeModal, true);

		let gallery = galleries[p];
		let page = 0;
		let pageCount = Math.ceil(gallery.children.length / 3);
		let galleryDisplacement = 0;

		let indicator = indicators[p];
		for (let i = 0; i < pageCount; i++) {
			let element = document.createElement('div');
			element.className = 'indicator-element';
			if (i == 0) element.className += ' selected';
			indicator.appendChild(element);
		}

		lefts[p].addEventListener('click', () => {
			if (page > 0) {
				galleryDisplacement -= 665;
				gallery.style.right = galleryDisplacement.toString() + 'px';

				indicator.children[page].className = 'indicator-element';
				page--;
				indicator.children[page].className += ' selected';
			}
		});

		rights[p].addEventListener('click', () => {
			if (page < pageCount - 1) {
				galleryDisplacement += 665;
				gallery.style.right = galleryDisplacement.toString() + 'px';

				indicator.children[page].className = 'indicator-element';
				page++;
				indicator.children[page].className += ' selected';
			}
		});
	}

	function closeModal() {
		backdropStyle.opacity = '0';
		waitToCollapse = false;
		setTimeout(() => collapseProject(activeModalIndex), 100);
		setTimeout(() => { // wait for modal to fade away
			// backdrop.scrollTop = 0;
			body.style.position = 'static';
			backdropStyle.display = 'none';
			activeModal.style.top = '150px';
			activeModal.style.display = 'none';
			html.scrollTop = htmlScrollPosition;
			activeModalIndex = null;
		}, modalTransition);
	}
	backdrop.addEventListener('click', (event) => {
		if (event.target == backdrop) closeModal();
	}, true);
});
