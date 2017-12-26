var new_inpt_html = '<div class="input-wrapper"><input type="text" /><button class="remove-inpt">-</button></div>';
		var new_lst_itm_html = '<li>:text</li>';

		$(document).ready(function(){
			seo_analizer();
		});

		$(".add-inpt").click(function(){
			$(this).closest(".inputs-block").find("textarea#txt-from-inpts").before(new_inpt_html);
			return false;
		});

		$("body").on('click', '.remove-inpt', function(){
			$(this).closest('.input-wrapper').remove();
			return false;
		});

		$('.collect').click(function(){
			var inpts = $(this).closest('.inputs-block').find('input[type="text"]'), text = '', choose = $('input[name="choose"]:checked').val();


			switch(choose){
				case 'all':
					text = collectAll(inpts);
					break;
				case 'chet':
					text = collectChet(inpts);
					break;
				case 'nechet': 
					text = collectNeChet(inpts);
					break;
				default: 
					text = 'Выбирете какие элементы собрать';
			}

			$("#txt-from-inpts").text(text + " ");
			return false;
		});

		$('.show-popup').click(function(){
			$(".popup-wrapper").show(200);
		});

		$('.option-btn').click(function(){
			var option = $(this).data('option').split('_')[1];

			$(this).closest('.popup-wrapper').hide(200);

			setTimeout(function(){
				$('.option-selected-block').text("Вы выбрали опцию " + option);
			}, 100);


			return false;
		});

		$('.add-lst-itm').click(function(){
			var element_name = $(this).parent().find('.lst-itm-text').val();

			console.log(element_name);

			if (element_name.trim() == "") {
				alert('Вы не ввели название элемента');
				return false;
			}

			var lst_itm_html = new_lst_itm_html.replace(':text', element_name);

			$('ul.list-block').append(lst_itm_html);

			return false;

		});

		$('body').on('click', 'ul.list-block li', function(){
			$(this).toggleClass('clicked');
		});

		$('.image-block').mouseenter(function(){
			$(this).find('.text-for-img').addClass('active');
		});

		$('.image-block').mouseleave(function(){
			var txt_block = $(this).find('.text-for-img');
			setTimeout(function(){
				txt_block.removeClass('active');
			}, 1000);
		});

		$('.img-links-block *').mousemove(function(){
			var el = $(this),
				itm_type = el.prop('nodeName'),
				info_block = $('.info-block');

			switch(itm_type){
				case "IMG": {
					var src = el.prop('src'), alt = el.prop('alt');
					if(src.trim() == "" || alt.trim() == "") {
						info_block.text("Не все атрибуты заполнены");
						info_block.addClass('with-error');
						el.addClass('with-error');
					}
					else {
						info_block.text("Element type: " + itm_type + "\nsrc: " + src + "\nalt: " + alt);
						info_block.removeClass('with-error');
					}
					info_block.addClass('active');
					break;
				}
				case "A": {
					var title = el.prop('title'), target = el.prop('target');
					if (title.trim() == "" || target.trim() == "") {
						info_block.text("Не все атрибуты заполнены");
						info_block.addClass('with-error');
					}
					else
					{
						info_block.text("Element type: " + itm_type + "\ntitle: " + title + "\ntarget: " + target);
						info_block.removeClass('with-error');
					}
					info_block.addClass('active');
					break;
				}
			}

		});

		$('.img-links-block *').mouseleave(function(){
			var info_block = $('.info-block');
			setTimeout(function(){
				info_block.removeClass('active');
			}, 500);
		});

		function collectAll(elements){
			
			var text = '';

			elements.each(function(index, element){
				text += $(element).val() + " ";
				checkInpt($(element));
			});



			return text;

		}

		function collectChet(elements) {
			
			var text = '';

			elements.each(function(index, element){
				if (index == 0 || index % 2 == 0) 
				{
					text += $(element).val() + " ";
					checkInpt($(element));
				}
			});

			return text;

		}

		function collectNeChet(elements){
			
			var text = '';

			elements.each(function(index, element){
				if (index % 2 != 0) 
				{
					text += $(element).val() + " ";
					checkInpt($(element));
				}
			});

			return text;

		}

		function checkInpt(input){
			if(input.val().trim() == "" && !input.hasClass('with-error')){
				input.addClass('with-error');
				input.next().after("<span class='error-text'>Заполните поле</span>");
			}
			else if(input.val().trim() != ""){
				input.removeClass('with-error');
				input.parent().find('.error-text').remove();
			}
		}

		function seo_analizer(){
			var h1_count = $("body").find('h1').length,
				h2_count = $("body").find('h2').length,
				h3_count = $("body").find('h3').length,
				h4_count = $("body").find('h4').length,
				h5_count = $("body").find('h5').length,
				h6_count = $("body").find('h6').length,
				meta_title = $('head').find('meta[name="title"]'),
				meta_descr = $('head').find('meta[name="description"]'),
				meta_keywords = $('head').find('meta[name="keywords"]');

			if (h1_count == 0) {
				alert('Нет заголовка h1');
			}
			if (h2_count == 0) {
				alert('Нет заголовка h2');
			}
			if (h3_count == 0) {
				alert('Нет заголовка h3');
			}
			if (h4_count == 0) {
				alert('Нет заголовка h4');
			}
			if (h5_count == 0) {
				alert('Нет заголовка h5');
			}
			if (h6_count == 0) {
				alert('Нет заголовка h6');
			}

			if (meta_title.length == 0) {
				alert('Нет тега meta title');
			}

			if (meta_descr.length == 0) {
				alert('Нет тега meta description');
			}

			if (meta_keywords.length == 0) {
				alert('Нет тега meta keywords');
			}

			$('.seo-info-block').text('Количество заголовков h1: ' + h1_count + ', h2: ' + h2_count + ', h3: ' + h3_count + ', h4: ' + h4_count + ', h5: ' + h5_count + ', h6: ' + h6_count);
			$('.seo-info-block').append("<br />");

			meta_title_text = meta_title.length == 0 ? '' : meta_title.attr('content');
			meta_descr_text = meta_descr.length == 0 ? '' : meta_descr.attr('content');

			$('.seo-info-block').append('Длина тега meta-title: ' + meta_title_text.length + ', meta-description: ' + meta_descr_text.length);
		}