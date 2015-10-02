(function() {

	var $arrow;
	var $window;
	var stageW;
	var stageH;

	var isMotion;

	$(function() {
		$arrow = $("#arrow");
		$window = $(window);

		isMotion = false;

		$(window).on("resize", resizeHandler);
		resizeHandler();

		// DeviceMotion Event
		window.addEventListener("devicemotion", devicemotionHandler);
		window.addEventListener("deviceorientation", deviceorientationHandler);
	});

	// 加速度が変化
	function devicemotionHandler(event) {
		if(isMotion) return;

		// 加速度
		// X軸
		var x = event.acceleration.x;
		// Y軸
		var y = event.acceleration.y;
		// Z軸
		var z = event.acceleration.z;

		$arrow.stop();

		var l = 7;
		if(x > l) { // 右
			$arrow.css({
				x: -stageW
			});
			$arrow.children("img").css({
				"-webkit-transform": "rotate(90deg)",
				"-moz-transform": "rotate(90deg)",
				"transform": "rotate(90deg)"
			});
		}
		else if(x < -l) { // 左
			$arrow.css({
				x: stageW
			});
			$arrow.children("img").css({
				"-webkit-transform": "rotate(-90deg)",
				"-moz-transform": "rotate(-90deg)",
				"transform": "rotate(-90deg)"
			});
		}
		else if(y > l) { // 上
			$arrow.css({
				y: stageH
			});
			$arrow.children("img").css({
				"-webkit-transform": "rotate(0deg)",
				"-moz-transform": "rotate(0deg)",
				"transform": "rotate(0deg)"
			});
		}
		else if(y < -l) { // 下
			$arrow.css({
				y: -stageH
			});
			$arrow.children("img").css({
				"-webkit-transform": "rotate(180deg)",
				"-moz-transform": "rotate(180deg)",
				"transform": "rotate(180deg)"
			});
		}
		else return;

		isMotion = true;

		$arrow.delay(500).transition({x: 0, y: 0}, 300, "easeOutCubic", function() {isMotion = false});
	}

	function resizeHandler(event) {
		stageW = $window.width();
		stageH = $window.height();
	}

  function deviceorientationHandler(event) {
		//ジャイロセンサー情報取得
		// X軸
		var beta = event.beta;
		// Y軸
		var gamma = event.gamma;
		// Z軸
		var alpha = event.alpha;
		var html = "";
		html += "X回転 : " + beta + "<br>";
		html += "Y回転 : " + gamma + "<br>";
		html += 'Z回転 : ' + alpha;
		$("#debug").html(html);

		$arrow.css({
			"-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
			"-moz-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)",
			"transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + alpha + "deg)"
		})
	}



})();
