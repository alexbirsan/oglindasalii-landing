// Click-to-play YouTube (.video): the page shows only the thumbnail and a play button, and the
// player's iframe (heavy, and it talks to YouTube) is created on the first click.
(function () {
	document.querySelectorAll('.video').forEach(function (video) {
		var play = video.querySelector('.video__play')
		play.addEventListener('click', function () {
			var iframe = document.createElement('iframe')
			iframe.src = 'https://www.youtube-nocookie.com/embed/' + video.dataset.videoId + '?autoplay=1&rel=0&playsinline=1'
			iframe.title = video.dataset.videoTitle
			iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'
			iframe.allowFullscreen = true
			// YouTube refuses to play (error 153) if the embed sends no referrer
			iframe.referrerPolicy = 'strict-origin-when-cross-origin'
			play.replaceWith(iframe)
			iframe.focus()
		})
	})
})()
