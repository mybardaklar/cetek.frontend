document.addEventListener("alpine:init", () => {
	Alpine.store("navigationDrawer", {
		on: false,

		toggle() {
			this.on = !this.on;
		},
	});
});

document.addEventListener("DOMContentLoaded", () => {});
