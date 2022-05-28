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
	// const galleries = document.getElementsByClassName('gallery-images-container');
	const galleries = document.getElementsByClassName('modal-gallery-images');
	console.log(galleries);
	const galleryNavBars = document.getElementsByClassName('modal-gallery-navbar');
	const indicators = document.getElementsByClassName('indicator');
	// const imageCounter = document.getElementsByClassName('image-counter');

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

		techIconsDiv.addEventListener('mouseenter', (event) => {
			handleLabelPosition(event);
			labelOn();
		});
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

		let gallery = galleries[p].children[0];
		let pageIndex = 0;
		const pageCount = Math.ceil(gallery.children.length / 3);
		let galleryDisplacement = 0;
		let imagesExpanded = false;
		let imageIndex = 0;
		const imageCount = gallery.children.length;

		// let indicator = indicators[p];
		// Nav bar element selection
		const navBar = galleryNavBars[p];
		const imageToggleButton = navBar.children[0].children[1];
		const imageToggleButtonSpan = imageToggleButton.children[0];
		const navButtons = navBar.children[1];
		const indicator = navButtons.children[1];
		const indicatorElements = indicator.children;
		const imageCounter = navButtons.children[0];
		const imageIndexSpan = imageCounter.children[0];
		const imageCountSpan = imageCounter.children[1];
		imageCountSpan.innerHTML = imageCount.toString();
		for (let i = 0; i < pageCount; i++) {
			let element = document.createElement('div');
			element.className = 'indicator-element';
			if (i == 0) element.className += ' selected';
			indicator.appendChild(element);
		}

		function scrollImagesLeft() {
			if (!imagesExpanded && pageIndex > 0) {
				galleryDisplacement -= 665;
				gallery.style.right = galleryDisplacement.toString() + 'px';

				indicatorElements[pageIndex].className = 'indicator-element';
				pageIndex--;
				imageIndex = pageIndex * 3;
				indicatorElements[pageIndex].className += ' selected';
			} else if (imagesExpanded && imageIndex > 0) {
				galleryDisplacement -= 665;
				gallery.style.right = galleryDisplacement.toString() + 'px';
				imageIndex--;
				imageIndexSpan.innerHTML = (imageIndex + 1).toString();
			}
		}
		function scrollImagesRight() {
			if (!imagesExpanded && pageIndex < pageCount - 1) {
				galleryDisplacement += 665;
				gallery.style.right = galleryDisplacement.toString() + 'px';

				indicatorElements[pageIndex].className = 'indicator-element';
				pageIndex++;
				imageIndex = pageIndex * 3;
				indicatorElements[pageIndex].className += ' selected';
			} else if (imagesExpanded && imageIndex < imageCount - 1) {
				galleryDisplacement += 665;
				gallery.style.right = galleryDisplacement.toString() + 'px';
				imageIndex++;
				imageIndexSpan.innerHTML = (imageIndex + 1).toString();
			}
		}

		lefts[p].addEventListener('click', scrollImagesLeft);
		rights[p].addEventListener('click', scrollImagesRight);
		galleries[p].addEventListener('click', event => {
			console.log(event);
			if (imagesExpanded) {
				// const layerX = event.layerX;
				// // console.log(event);
				// const width = event.target.width;
				// if (layerX % 665 < width / 3) {
				// 	scrollImagesLeft();
				// } else if (layerX % 665 > width - width / 3) {
				// 	scrollImagesRight();
				// }
			}
		});

		imageToggleButton.addEventListener('click', () => {
			if (imagesExpanded) collapseImages();
			else expandImages(imageIndex);
		});
		const images = gallery.children;
		for (let i = 0; i < imageCount; i++) {
			const image = images[i];
			image.addEventListener('click', (event) => {
				if (!imagesExpanded) expandImages(i)
				else {
					const layerX = event.layerX;
					// console.log(event);
					const width = event.target.width;
					if (layerX % 665 < width / 3) {
						scrollImagesLeft();
					} else if (layerX % 665 > width - width / 3) {
						scrollImagesRight();
					}
				}
			});
		}
		function expandImages(i) {
			for (const image of images) {
				image.style.width = '640px';
				image.className = 'gallery-img expanded';
			}
			imageToggleButtonSpan.innerHTML = 'Collapse';
			indicator.style.display = 'none';
			imageCounter.style.display = 'block';
			imageIndexSpan.innerHTML = (i + 1).toString();
			galleryDisplacement = 665 * (pageIndex * 3 + i % 3);
			gallery.style.right = (galleryDisplacement).toString() + 'px';
			imagesExpanded = true;
			imageIndex = i;
		}
		function collapseImages() {
			for (const image of images) {
				image.style.width = '196.67px';
				image.className = 'gallery-img collapsed';
			}
			imageCounter.style.display = 'none';
			imageToggleButtonSpan.innerHTML = 'Enlarge';
			pageIndex = Math.floor(imageIndex / 3);
			galleryDisplacement = 665 * pageIndex;
			gallery.style.right = (galleryDisplacement).toString() + 'px';
			for (let i = 0; i < indicatorElements.length; i++) {
				const indicatorElement = indicatorElements[i];
				if (i == pageIndex) indicatorElement.className = 'indicator-element selected';
				else indicatorElement.className = 'indicator-element';
			}
			indicator.style.display = 'grid';
			imagesExpanded = false;
		}
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
