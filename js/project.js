window.addEventListener('load', function() {
	const html = document.querySelector('html');
	const body = document.getElementById('main-container');
	const backdrop = document.getElementById('modal-background');
	// const modal = document.getElementById('modal');
	let modal;
	// let modalStyle = modal.style;
	let backdropStyle = backdrop.style;
	backdropStyle.transition = 'opacity ' + '0.25s';

	let modalTransition = 300;
	// let modalTransitionString = (modalTransition / 1000).toString() + 's'
	// modalStyle.transition = 'top ' + modalTransitionString;
	let htmlScrollPosition = html.scrollTop;

	// const projectsData = [
	// 	{ title: 'Ratscrew', technologies: ['Javascript', 'Node.js'] },
	// 	{ title: 'Bomberman', technologies: ['socket.io', 'Node.js', 'Express'] },
	// 	{ title: 'Solitaire', technologies: ['Javascript', 'Node.js'] }
	// ];
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
		// let waitToCollapse = false;
		function collapseProject() {
			// if (waitToCollapse) return;
			movingDiv.style.bottom = '0';
			seeMore.style.opacity = '0';
		}
		project.addEventListener('mouseleave', collapseProject);
		expand.addEventListener('click', () => {
			modal = document.getElementById(project.id + '-modal');
			let modalStyle = modal.style;
			console.log(html.scrollTop);
			htmlScrollPosition = html.scrollTop;
			body.style.top = '-' + html.scrollTop.toString() + 'px';
			body.style.position = 'fixed';
			html.scrollTop = 0;
			// waitToCollapse = true;
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
					console.log(backdrop.scrollTop);
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

	backdrop.addEventListener('click', () => {
		// event.stopPropagation();
		if (event.target != backdrop) return;
		console.log('EXIT');
		backdropStyle.opacity = '0';
		setTimeout(() => {
			console.log('DONE');
			// backdrop.scrollTop = 0;
			body.style.position = 'static';
			backdropStyle.display = 'none';
			modal.style.top = '150px';
			modal.style.display = 'none';
			html.scrollTop = htmlScrollPosition;
		}, modalTransition);
	}, true);
});
