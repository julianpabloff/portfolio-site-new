const modal = document.getElementById('project-modal');
const backdrop = document.getElementById('modal-background');
let modalStyle = modal.style;
let backdropStyle = backdrop.style;
let modalTransition = 400;
let modalTransitionString = (modalTransition / 1000).toString() + 's'
modalStyle.transition = 'top ' + modalTransitionString;
backdropStyle.transition = 'opacity ' + modalTransitionString;
expand.addEventListener('click', () => {
	console.log('See more ' + project.id);
	backdropStyle.display = 'flex';
	setTimeout(() => { 
		backdropStyle.opacity = '1';
		modalStyle.display = 'flex';
		setTimeout(() => {
			modalStyle.top = '80px';
			backdrop.addEventListener('click', () => {
				event.stopPropagation();
				console.log(event.target);
				if (event.target == modal) return;
				console.log('EXIT');
				backdropStyle.opacity = '0';
				setTimeout(() => {
					backdropStyle.display = 'none';
				}, modalTransition);
			}, true);
		}, 1);
	}, 1);
});
