// Contact details are assembled here instead of written in the HTML, so bots scraping the page
// source don't find a plain email address or phone number. Visitors see normal, clickable links.
//   data-email          link text and href become the address
//   data-email-subject  href only (the link keeps its own text), with that subject
//   data-phone          link text and href become the phone number
(function () {
	var email = ['masanuntii', 'gmail.com'].join('@')
	var phone = ['+40', '758', '30', '55', '49']
	var mailto = 'mai' + 'lto:'

	// Webmail (e.g. Gmail set as the browser's mail handler) opens in a new tab instead of replacing the site;
	// a desktop mail app opens as usual.
	function newTab(a) {
		a.target = '_blank'
		a.rel = 'noopener'
	}

	document.querySelectorAll('[data-email]').forEach(function (a) {
		a.href = mailto + email
		a.textContent = email
		newTab(a)
	})
	document.querySelectorAll('[data-email-subject]').forEach(function (a) {
		a.href = mailto + email + '?subject=' + encodeURIComponent(a.getAttribute('data-email-subject'))
		newTab(a)
	})
	document.querySelectorAll('[data-phone]').forEach(function (a) {
		a.href = 'tel:' + phone.join('')
		a.textContent = phone.join(' ')
	})
})()
