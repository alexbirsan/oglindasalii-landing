// Tutorial tabs ([data-tabs]): one YouTube clip per tab. A clip is a link to the video ([data-youtube] = the
// video ID) showing its thumbnail; a click puts the player in its place, so nothing loads from YouTube before
// that. Without JS the link opens the video on YouTube. Leaving a tab puts its thumbnail back, which stops the clip.
(function () {
	document.querySelectorAll('[data-tabs]').forEach(function (root) {
		var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'))
		var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute('aria-controls')) })

		panels.forEach(function (panel) {
			var link = panel.querySelector('[data-youtube]')
			if (!link) return
			link.addEventListener('click', function (e) {
				e.preventDefault()
				var player = document.createElement('iframe')
				player.src = 'https://www.youtube-nocookie.com/embed/' + link.dataset.youtube + '?autoplay=1&rel=0'
				player.title = link.getAttribute('aria-label')
				player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'
				player.allowFullscreen = true
				// YouTube refuses to play (error 153) when the request doesn't say which site it comes from
				player.referrerPolicy = 'strict-origin-when-cross-origin'
				panel.replaceChild(player, link)
				panel.stop = function () { panel.replaceChild(link, player); panel.stop = null }
			})
		})

		function select(i, focus) {
			tabs.forEach(function (tab, j) {
				var on = j === i
				tab.setAttribute('aria-selected', on ? 'true' : 'false')
				tab.tabIndex = on ? 0 : -1
				panels[j].hidden = !on
				if (!on && panels[j].stop) panels[j].stop()
			})
			if (focus) tabs[i].focus()
		}

		tabs.forEach(function (tab, i) {
			tab.addEventListener('click', function () { select(i) })
			tab.addEventListener('keydown', function (e) {
				var n = tabs.length
				var to = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key]
				if (to === undefined) return
				e.preventDefault()
				select((to + n) % n, true)
			})
		})
	})
})()
