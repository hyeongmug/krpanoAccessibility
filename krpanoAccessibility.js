function krpanoAccessibility() {

	varBind(0);

	function varBind(time) {

		setTimeout(function() {

			var thumbs = krpano.get('layer[skin_btn_thumbs]'),
				left = krpano.get('layer[skin_btn_left]'),
				right = krpano.get('layer[skin_btn_right]'),
				up = krpano.get('layer[skin_btn_up]'),
				down = krpano.get('layer[skin_btn_down]'),
				zoomIn = krpano.get('layer[skin_btn_in]'),
				zoomOut = krpano.get('layer[skin_btn_out]'),
				vr = krpano.get('layer[skin_btn_vr]'),
				fs = krpano.get('layer[skin_btn_fs]'),
				hide = krpano.get('layer[skin_btn_hide]'),
				show = krpano.get('layer[skin_btn_show]'),
				gyro = krpano.get('layer[skin_btn_gyro]'),
				prev = krpano.get('layer[skin_btn_prev]'),
				next = krpano.get('layer[skin_btn_next]');

			var thumbsScroll = krpano.get('layer[skin_thumbs]');



			if (left && right && up && down && thumbsScroll.sprite.childNodes.length) {
				controls = {
					thumbs: thumbs,
					left: left,
					right: right,
					up: up,
					down: down,
					zoomIn: zoomIn,
					zoomOut: zoomOut,
					vr: vr,
					fs: fs,
					hide: hide,
					show: show,
					gyro: gyro,
					prev: prev,
					next: next
				}

				thumbArray = thumbsScroll.sprite.childNodes;

				setTabIndex();
			} else {
				varBind(100);
			}

		}, time)

	}

	function setTabIndex() {

		krpano.tabIndex = 1;

		for (var i = 0; i < Object.keys(controls).length; i++) {
			controls[Object.keys(controls)[i]].sprite.tabIndex = 1;
		}


		for (var i = 0; i < thumbArray.length; i++) {
			thumbArray[i].tabIndex = 1;
		}


		eventBind();
		textBind();

	}

	function createBlind(text) {

		var blind = document.createElement('span');
		blind.style.overflow = 'hidden';
		blind.style.position = 'absolute';
		blind.style.top = 0;
		blind.style.left = 0;
		blind.style.width = '1px';
		blind.style.height = '1px';
		blind.style.fontSize = 0;
		blind.style.lineHeight = 0;

		blind.textContent = text;

		return blind;
	}

	function textBind() {

		controls.thumbs.sprite.appendChild(createBlind('썸네일 보기/감추기'));

		controls.zoomIn.sprite.appendChild(createBlind('줌인'));
		controls.zoomOut.sprite.appendChild(createBlind('줌아웃'));

		controls.vr.sprite.appendChild(createBlind('WebVR모드'));

		controls.fs.sprite.appendChild(createBlind('전체화면 on/off'));

		controls.hide.sprite.appendChild(createBlind('컨트롤영역 감추기'));
		controls.show.sprite.appendChild(createBlind('컨트롤영역 보이기'));

		controls.gyro.sprite.appendChild(createBlind('자이로센서 on/off'));

		controls.prev.sprite.appendChild(createBlind('이전 VR 보기'));
		controls.next.sprite.appendChild(createBlind('다음 VR 보기'));

		controls.up.sprite.appendChild(createBlind('상'));
		controls.down.sprite.appendChild(createBlind('하'));
		controls.left.sprite.appendChild(createBlind('좌'));
		controls.right.sprite.appendChild(createBlind('우'));



		for (var i = 0; i < thumbArray.length; i++) {
			thumbArray[i].appendChild(createBlind(i+'번 VR 보기'));
		}

	}


	function eventBind() {


		controls.thumbs.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('skin_showmap(false); skin_showthumbs();');
			}

			if (e.key == 'Tab') {
				if (!e.shiftKey) {
					if (krpano.get('layer[skin_thumbs].state') == 'opened') {
						e.preventDefault();
						console.log('dcdd')
						thumbArray[0].focus();
					}
				}

			}
		}

		controls.thumbs.sprite.onkeydown = function(e) {
			if (e.key == 'Tab') {
				if (!e.shiftKey) {
					if (krpano.get('layer[skin_thumbs].state') == 'opened') {
						e.preventDefault();
					}
				}
			}
		}

		thumbArray[thumbArray.length - 1].onkeydown = function(e) {
			if (e.key == 'Tab') {
				if (!e.shiftKey) {
					e.preventDefault();
					controls.left.sprite.focus();
				}
			}
		}

		thumbArray[0].onkeydown = function(e) {
			if (e.key == 'Tab') {
				if (e.shiftKey) {
					e.preventDefault();
					controls.thumbs.sprite.focus();
				}
			}
		}

		controls.left.sprite.onkeydown = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(hlookat_moveforce,-1);');
			}

			if (e.key == 'Tab') {
				if (e.shiftKey) {
					if (krpano.get('layer[skin_thumbs].state') == 'opened') {
						e.preventDefault();
						thumbArray[thumbArray.length - 1].focus();
					}
				}
			}
		}

		controls.left.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(hlookat_moveforce,0);');
			}
		}

		controls.right.sprite.onkeydown = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(hlookat_moveforce,1);');
			}
		}

		controls.right.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(hlookat_moveforce,0);');
			}
		}

		controls.up.sprite.onkeydown = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(vlookat_moveforce,-1);');
			}
		}

		controls.up.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(vlookat_moveforce,0);');
			}
		}

		controls.down.sprite.onkeydown = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(vlookat_moveforce,1);');
			}
		}

		controls.down.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(vlookat_moveforce,0);');
			}
		}

		controls.zoomIn.sprite.onkeydown = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(fov_moveforce,-1);');
			}
		}

		controls.zoomIn.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(fov_moveforce,0);');
			}
		}

		controls.zoomOut.sprite.onkeydown = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(fov_moveforce,1);');
			}
		}

		controls.zoomOut.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('set(fov_moveforce,0);');
			}
		}

		controls.gyro.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('switch(plugin[skin_gyro].enabled); if(plugin[skin_gyro].enabled, skin_showmap(false));');
			}
		}

		controls.vr.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('webvr.enterVR();');
			}
		}

		controls.fs.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('switch(fullscreen);');
			}
		}

		controls.hide.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('skin_hideskin();');
			}
		}

		controls.show.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('skin_showskin();');
			}
		}

		controls.prev.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('if(skin_settings.thumbs_loop, skin_nextscene_loop(-1), skin_nextscene(-1) );');
			}
		}

		controls.next.sprite.onkeyup = function(e) {
			if (e.key == 'Enter') {
				krpano.call('if(skin_settings.thumbs_loop, skin_nextscene_loop(+1), skin_nextscene(+1) );');
			}
		}


		for (var i = 0; i < thumbArray.length; i++) {
			thumbArray[i].tabIndex = 1;
			thumbArray[i].panoIndex = i;

			thumbArray[i].onkeyup = function(e) {

				if (e.key == 'Enter') {
					loadscene(e.target.panoIndex);

				}

			}
		}

		function loadscene(index) {
			krpano.call('loadscene(' + index + ')');
		}

	}

}