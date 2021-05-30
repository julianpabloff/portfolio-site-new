window.addEventListener('load', function() {
	const html = document.querySelector('html');
	const body = document.getElementById('main-container');
	const backdrop = document.getElementById('modal-background');
	let backdropStyle = backdrop.style;

	let modal; let activeModal = null;
	const modals = document.getElementById('modal-background').children;
	let modalTransition = 300; // opacity transition

	let htmlScrollPosition = html.scrollTop; // remember where html was at

	let waitToCollapse = false;
	function collapseProject(p) {
		console.log('Trying to collapse project shelf');
		if (waitToCollapse) return;
		let projectChildren = projects[p].children;
		let movingDiv = projectChildren.item(1);
		let seeMore = projectChildren.item(2).firstElementChild;
		movingDiv.style.bottom = '0';
		seeMore.style.opacity = '0';
	}

	const projects = document.querySelector('div#project-container').children;
	for (let p = 0; p < projects.length; p++) {
		let project = projects[p];
		const children = project.children;
		const movingDiv = children.item(1);
		const expand = children.item(2);
		const seeMore = expand.children.item(0);
		project.addEventListener('mouseover', function() {
			movingDiv.style.bottom = '201px';
			seeMore.style.opacity = '1';
		});
		project.addEventListener('mouseleave', () => collapseProject(p));
		expand.addEventListener('click', () => {
			modal = modals[p];
			activeModal = p;
			let modalStyle = modal.style;
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

	for (let modal of modals) {
		const exitButton = modal.children.item(0).firstElementChild;
		exitButton.addEventListener('click', closeModal, true);
	}


	function closeModal() {
		backdropStyle.opacity = '0';
		waitToCollapse = false;
		setTimeout(() => collapseProject(activeModal), 100);
		setTimeout(() => { // wait for modal to fade away
			// backdrop.scrollTop = 0;
			body.style.position = 'static';
			backdropStyle.display = 'none';
			modal.style.top = '150px';
			modal.style.display = 'none';
			html.scrollTop = htmlScrollPosition;
			activeModal = null;
		}, modalTransition);
	}
	backdrop.addEventListener('click', (event) => {
		if (event.target == backdrop) closeModal();
	}, true);
});
