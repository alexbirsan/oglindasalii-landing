// Carousels (.carousel): the slides already swipe on their own (CSS scroll-snap). This adds
// previous/next arrows and one dot per slide, and keeps the dots in sync while swiping.
// With a single slide nothing is added. The arrows wrap around from the last slide to the first.
(function () {
	var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
	var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'

	document.querySelectorAll('.carousel').forEach(function (carousel) {
		var track = carousel.querySelector('.carousel__track')
		var slides = track.querySelectorAll('.carousel__slide')
		var n = slides.length
		if (n < 2) return

		var nav = document.createElement('div')
		nav.className = 'carousel__nav'
		var prev = button('carousel__btn', 'Imaginea anterioară', arrow)
		var next = button('carousel__btn', 'Imaginea următoare', arrow)
		next.querySelector('svg').style.transform = 'scaleX(-1)'
		var dotsBox = document.createElement('div')
		dotsBox.className = 'carousel__dots'
		var dots = []
		slides.forEach(function (_, i) {
			var dot = button('carousel__dot', 'Imaginea ' + (i + 1) + ' din ' + n, '')
			dot.setAttribute('aria-current', i === 0 ? 'true' : 'false')
			dot.addEventListener('click', function () { go(i) })
			dotsBox.appendChild(dot)
			dots.push(dot)
		})
		prev.addEventListener('click', function () { go((current() - 1 + n) % n) })
		next.addEventListener('click', function () { go((current() + 1) % n) })
		nav.append(prev, dotsBox, next)
		carousel.appendChild(nav)

		function step() { return slides[1].offsetLeft - slides[0].offsetLeft }
		function current() { return Math.max(0, Math.min(n - 1, Math.round(track.scrollLeft / step()))) }
		function go(i) { track.scrollTo({ left: i * step(), behavior: smooth ? 'smooth' : 'auto' }) }
		function sync() {
			var c = current()
			dots.forEach(function (dot, i) { dot.setAttribute('aria-current', i === c ? 'true' : 'false') })
		}
		// The first dot starts active (set above), so nothing reads the layout until the visitor scrolls
		track.addEventListener('scroll', sync, { passive: true })
	})

	function button(className, label, html) {
		var b = document.createElement('button')
		b.type = 'button'
		b.className = className
		b.setAttribute('aria-label', label)
		b.innerHTML = html
		return b
	}
})()
