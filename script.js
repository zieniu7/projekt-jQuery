$(document).ready(function () {
	let table = $('#notesTable').DataTable()

	$('#date').datepicker()

	$('#darkMode').click(function () {
		$('body').toggleClass('dark')
	})

	$('#noteForm').validate({
		rules: {
			title: 'required',
			content: {
				required: true,
				minlength: 5,
			},
		},
		submitHandler: function (form) {
			let title = $('#title').val()
			let content = $('#content').val()
			let date = $('#date').val()

			let rowNode = table.row
				.add([
					title,
					content,
					date,
					"<button class='edit btn btn-warning'>Edytuj</button> " +
						"<button class='delete btn btn-danger'>Usuń</button>",
				])
				.draw()
				.node()

			$(rowNode).hide().fadeIn()

			form.reset()
		},
	})

	$('#notesTable tbody').on('click', '.delete', function () {
		let row = table.row($(this).parents('tr'))

		$(row.node()).slideUp(400, function () {
			row.remove().draw()
		})
	})

	$('#notesTable tbody').on('click', '.edit', function () {
		let row = $(this).parents('tr')

		let title = row.find('td:eq(0)').text()
		let content = row.find('td:eq(1)').text()

		let newTitle = prompt('Nowy tytuł:', title)
		let newContent = prompt('Nowa treść:', content)

		if (newTitle && newContent) {
			row.find('td:eq(0)').text(newTitle)
			row.find('td:eq(1)').text(newContent)
		}
	})

	$('#search').keyup(function () {
		table.search(this.value).draw()
	})

	$('#notesTable tbody')
		.on('mouseenter', 'tr', function () {
			$(this).addClass('highlight')
		})
		.on('mouseleave', 'tr', function () {
			$(this).removeClass('highlight')
		})
})
