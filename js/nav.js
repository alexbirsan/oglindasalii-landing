// Header links (.nav__link to a #section on this page): while scrolling, the link of the section on screen is marked
// (aria-current="location", styled in css/style.css) and the address follows it (#design-personalizat), without
// adding history entries. Outside those sections (the hero, Funcții) no link is marked and the address has no #.
// The Umami tag has data-exclude-hash, so these address changes are not counted as page views.
(function () {
	var links = [].slice.call(document.querySelectorAll('.nav__link[href^="#"]'))
	var items = links.map(function (a) {
		return { link: a, section: document.getElementById(a.getAttribute('href').slice(1)) }
	}).filter(function (item) { return item.section })
	if (!items.length) return

	var current = null
	var queued = false

	// moveAddress is false on load: a link like /#intrebari must keep its # until the browser has scrolled there
	function update(moveAddress) {
		queued = false
		// The section that crosses a line a third of the way down the screen
		var line = window.innerHeight / 3
		var active = null
		items.forEach(function (item) {
			var box = item.section.getBoundingClientRect()
			if (box.top <= line && box.bottom > line) active = item
		})
		var hash = active ? '#' + active.section.id : ''
		if (moveAddress && location.hash !== hash) history.replaceState(history.state, '', location.pathname + location.search + hash)
		if (active === current) return
		current = active
		items.forEach(function (item) {
			if (item === active) item.link.setAttribute('aria-current', 'location')
			else item.link.removeAttribute('aria-current')
		})
	}

	window.addEventListener('scroll', function () {
		if (!queued) { queued = true; requestAnimationFrame(function () { update(true) }) }
	}, { passive: true })
	window.addEventListener('resize', function () { update(false) })
	update(false)
})()
