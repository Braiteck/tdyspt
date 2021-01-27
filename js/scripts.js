$(() => {
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000
	})


	// Дилеры
	$('.dealers .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: false,
		loop: false,
		smartSpeed: 500,
		onTranslate: (event) => {
			const parent = $(event.target).closest('.dealers')

			parent.find('.list button').removeClass('active')
			parent.find('.list button:eq(' + event.item.index + ')').addClass('active')
		}
	})

	$('.dealers .list button').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.dealers')

		parent.find('.list button').removeClass('active')
		parent.find('.slider').trigger('to.owl', $(this).data('slide-index'))

		$(this).addClass('active')
	})


	// Товары
	$('.products .slider').owlCarousel({
		dots: false,
		loop: false,
		smartSpeed: 500,
		responsive: {
			0: {
				items: 1,
				margin: 20,
				nav: false
			},
			768: {
				items: 2,
				margin: 20,
				nav: true
			},
			1024: {
				items: 3,
				margin: 30,
				nav: true
			}
		},
		onInitialized: function (event) {
			setTimeout(function () {
				setHeight($(event.target).find('.product .info'))
			}, 100)
		},
		onResized: function (event) {
			$(event.target).find('.product .info').height('auto')

			setTimeout(function () {
				setHeight($(event.target).find('.product .info'))
			}, 100)
		}
	})


	// Фильтр
	$('aside .mob_filter_btn').click(function (e) {
		e.preventDefault()

		$(this).hasClass('active')
			? $(this).removeClass('active').next().slideUp(300)
			: $(this).addClass('active').next().slideDown(300)
	})


	$('aside .filter .name').click(function (e) {
		e.preventDefault()

		$(this).hasClass('active')
			? $(this).removeClass('active').next().slideUp(300)
			: $(this).addClass('active').next().slideDown(300)
	})


	// Товар
	$('.product_info .images .big .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: false,
		smartSpeed: 500,
		dots: false,
		autoHeight: false,
		responsive: {
			0: {
				nav: true
			},
			768: {
				nav: false
			}
		},
		onTranslate: (event) => {
			const parent = $(event.target).closest('.images')

			parent.find('.thumbs .slide > *').removeClass('active')
			parent.find('.thumbs .slide:eq(' + event.item.index + ') > *').addClass('active')
		}
	})

	$('.product_info .images .thumbs .slider').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		smartSpeed: 500,
		items: 4,
		responsive: {
			0: {
				margin: 10
			},
			1242: {
				margin: 17
			}
		}
	})

	$('.product_info .images .thumbs .slide > *').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.images')

		parent.find('.thumbs .slide > *').removeClass('active')
		parent.find('.big .slider').trigger('to.owl', $(this).data('slide-index'))

		$(this).addClass('active')
	})


	// Поиск
	$('.search_form .clear_btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.search_form')

		parent.find('.input').val('')
	})


	// Сортировка оборудомания
	$('.titles .sort').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).hasClass('down')
				? $(this).removeClass('down').addClass('up')
				: $(this).removeClass('up').addClass('down')
		} else {
			$('.titles .sort').removeClass('active')
			$(this).addClass('active')
		}
	})


	// Изменение вида отображения товаров в категории
	$('.views .grid_btn').click(function (e) {
		e.preventDefault()

		$('.views > *').removeClass('active')
		$(this).addClass('active')

		$('.products .list').addClass('row').removeClass('list')

		$('.products .row').each(function () {
			productHeight($(this), parseInt($(this).css('--products_count')))
		})
	})

	$('.views .list_btn').click(function (e) {
		e.preventDefault()

		$('.views > *').removeClass('active')
		$(this).addClass('active')

		$('.products .row').addClass('list').removeClass('row')

		$('.products .product .buy').height('auto')
	})


	if ($(window).width() < 1280) {
		$('.products .list').addClass('row').removeClass('list')

		$('.products .row').each(function () {
			productHeight($(this), parseInt($(this).css('--products_count')))
		})
	}


	// Конструктор - Характеристики
	$('.constructor .features .head').click(function (e) {
		e.preventDefault()

		const $item = $(this).closest('.item')

		$item.hasClass('active')
			? $item.removeClass('active').find('.data').slideUp(300)
			: $item.addClass('active').find('.data').slideDown(300)
	})


	// Отправка форм
	$('body').on('submit', '.form.custom_submit', function (e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src: '#success_modal',
			type: 'inline',
			touch: false
		})
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Изменение вида отображения товаров в категории
	if ($(window).width() < 1280) {
		$('.products .list').addClass('row').removeClass('list')
	}
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.buy').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.buy'))

		start = start + step
		finish = finish + step
	})
}