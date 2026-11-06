// Tutorial tabs ([data-tabs]): one silent clip per tab. A clip's file (data-src) is loaded only when the
// section scrolls into view. The tabs play one after another until the visitor picks one; from then on
// that clip loops. The active tab's bar shows how far the clip has played. With reduced motion nothing
// plays by itself: the clips get their controls instead.
(function () {
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	document.querySelectorAll('[data-tabs]').forEach(function (root) {
		var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'))
		var videos = tabs.map(function (tab) {
			return document.getElementById(tab.getAttribute('aria-controls')).querySelector('video')
		})
		var current = 0
		var auto = !reduce
		var visible = false
		var frame

		function load(video) {
			if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src
		}

		function play() {
			var video = videos[current]
			video.loop = !auto
			if (reduce) { video.controls = true; load(video); return }
			if (!visible) return
			load(video)
			var p = video.play()
			if (p) p.catch(function () {})
		}

		function progress() {
			cancelAnimationFrame(frame)
			var video = videos[current]
			tabs[current].style.setProperty('--p', video.duration ? video.currentTime / video.duration : 0)
			if (!video.paused) frame = requestAnimationFrame(progress)
		}

		function select(i, focus) {
			tabs.forEach(function (tab, j) {
				var on = j === i
				tab.setAttribute('aria-selected', on ? 'true' : 'false')
				tab.tabIndex = on ? 0 : -1
				tab.style.setProperty('--p', 0)
				document.getElementById(tab.getAttribute('aria-controls')).hidden = !on
				if (!on && videos[j].getAttribute('src')) { videos[j].pause(); videos[j].currentTime = 0 }
			})
			current = i
			if (focus) tabs[i].focus()
			play()
		}

		tabs.forEach(function (tab, i) {
			tab.addEventListener('click', function () { auto = false; select(i) })
			tab.addEventListener('keydown', function (e) {
				var n = tabs.length
				var to = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key]
				if (to === undefined) return
				e.preventDefault()
				auto = false
				select((to + n) % n, true)
			})
		})

		videos.forEach(function (video, i) {
			video.addEventListener('play', progress)
			video.addEventListener('ended', function () { if (auto && i === current) select((i + 1) % tabs.length) })
		})

		if (reduce) { play(); return }
		new IntersectionObserver(function (entries) {
			visible = entries[0].isIntersecting
			if (visible) play()
			else videos[current].pause()
		}, { threshold: 0.4 }).observe(root)
	})
})()
