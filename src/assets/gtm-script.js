(function () {
	// Check if the global state exists
	if (!window.reallyGlobalReactiveState) {
		console.error('Global reactive state not found');
		return;
	}

	// Create floating icon
	const createFloatingIcon = () => {
		const iconContainer = document.createElement('div');
		iconContainer.id = 'gtm-floating-icon';
		iconContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background-color: #3f51b5;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    `;

		const iconElement = document.createElement('span');
		iconElement.className = 'material-icons';
		iconElement.textContent = 'analytics';
		iconContainer.appendChild(iconElement);

		// Create panel (initially hidden)
		const panel = document.createElement('div');
		panel.id = 'gtm-state-panel';
		panel.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px;
      background-color: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      z-index: 9998;
      display: none;
      flex-direction: column;
      gap: 10px;
    `;

		// State display area
		const stateDisplay = document.createElement('pre');
		stateDisplay.style.cssText = `
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      max-height: 200px;
      overflow: auto;
    `;
		panel.appendChild(stateDisplay);

		// Counter increment button
		const incrementButton = document.createElement('button');
		incrementButton.textContent = 'Increment Counter';
		incrementButton.style.cssText = `
      background-color: #3f51b5;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    `;
		panel.appendChild(incrementButton);

		document.body.appendChild(iconContainer);
		document.body.appendChild(panel);

		// Toggle panel visibility
		let isPanelVisible = false;
		iconContainer.addEventListener('click', () => {
			isPanelVisible = !isPanelVisible;
			panel.style.display = isPanelVisible ? 'flex' : 'none';
			if (isPanelVisible) {
				updateStateDisplay();
			}
		});

		// Update state display function
		function updateStateDisplay() {
			const currentState = window.reallyGlobalReactiveState();
			stateDisplay.textContent = JSON.stringify(currentState, null, 2);
		}

		// Increment counter
		incrementButton.addEventListener('click', () => {
			window.reallyGlobalReactiveState.update(state => ({
				...state,
				counter: (state.counter || 0) + 1
			}));
			updateStateDisplay();
		});

		// Subscribe to state changes
		const originalUpdate = window.reallyGlobalReactiveState.update;
		window.reallyGlobalReactiveState.update = function (updaterFn) {
			const result = originalUpdate.call(window.reallyGlobalReactiveState, updaterFn);
			if (isPanelVisible) {
				updateStateDisplay();
			}
			return result;
		};

		// Initial update
		updateStateDisplay();
	};

	// Wait for DOM to be ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', createFloatingIcon);
	} else {
		createFloatingIcon();
	}
})();
