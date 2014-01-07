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
					}else{
						if(hash){
							var name = hash.substr(1),
								$currentSection = $(".anchor a[name=" + name + "]");
							$currentSection.attr("name","");
							document.location.hash = hash;
							$currentSection.attr("name", name);
						}else{
							var currentScrollTop = $(window).scrollTop();
							document.location.hash = "";
							$(window).scrollTop(currentScrollTop);
						}
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

	var currentHash = document.location.hash;

	$(window).scroll(scroll);
	$(window).resize(resize);

	resize();
	$("a[href^=#]").anchorjump({offset: 1});
	if($(window).scrollTop == 0){
		$.anchorjump(currentHash, {offset: 1});
	}
});