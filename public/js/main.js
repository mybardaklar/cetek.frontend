document.addEventListener("alpine:init", () => {
	Alpine.store("navigationDrawer", {
		on: false,

		toggle() {
			this.on = !this.on;
		},
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const SectionReferencesSlider = new KeenSlider(
		"#SectionReferencesSlider",
		{
			loop: true,
			slides: {
				perView: 5,
				spacing: 40,
			},
		},
		[
			(slider) => {
				let timeout;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 2000);
				}
				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			},
		],
	);

	/* const $PageHomeHeroSliderPrevButton = document.getElementById("PageHomeHeroSliderPrevButton");
	const $PageHomeHeroSliderNextButton = document.getElementById("PageHomeHeroSliderNextButton");

	$PageHomeHeroSliderPrevButton.addEventListener("click", () => PageHomeHeroSlider.prev());
	$PageHomeHeroSliderNextButton.addEventListener("click", () => PageHomeHeroSlider.next()); */
});
