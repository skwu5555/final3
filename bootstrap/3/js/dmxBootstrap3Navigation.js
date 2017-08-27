jQuery(document).ready(function($){
	var url = window.location.href;
	$('ul.nav a').map(function() {
 		$(this).parent().toggleClass('active', this.href == url || this.href == url.split("?")[0].split("#")[0]);
	});
});