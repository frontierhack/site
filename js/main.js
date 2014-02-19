$(function () {
	var section = [];

	// This is almost entirely sugar
	// It makes the hash change, and adds a little shadow 
	var scroll = function () {
		for (var i = section.length - 1; i >= 0; i--) {
			if($(window).scrollTop() > section[i].min && $(window).scrollTop() < section[i].max){

				if(section[i].id && section[i].id !="hero"){
					var hash = "#" + section[i].id.replace("-section", "");
				}else{
					var hash = "";
				}

				if(document.location.hash != hash && document.location.hash != hash){
					if(hash){
						$(".top-bar").addClass("shadow");
					}else{
						$(".top-bar").removeClass("shadow");
					}

					if(history.replaceState){
						history.pushState('', document.title, window.location.pathname + hash);
						$(window).trigger("hashchange");
					}
				}
			}
		}
	},

	resize = function () {
			$("#hero").css("height", $(window).innerHeight());

			var margin = $(".top-bar").height() - parseInt($("#hero").css("margin-top"), 10);

			$("section").each(function (index) {
				var offsets = $(this).offset();
				section[index] = {};
				section[index].min = offsets.top - margin;
				section[index].max = offsets.top + $(this).height() - margin;
				section[index].id = $(this).attr("id");
			});
			scroll();
		};

	if (!Modernizr.svg) {
		var $logo = $("#logo img");
		var src = $logo.attr("src");
		$logo.attr("src", src.replace("svg", "png"));
	}

	var currentHash = document.location.hash;

	$(window).scroll(scroll);
	$(window).resize(resize);

	resize();
	$("a[href^=#]").anchorjump({offset: 1});
	if($(window).scrollTop == 0){
		$.anchorjump(currentHash, {offset: 1});
	}
});