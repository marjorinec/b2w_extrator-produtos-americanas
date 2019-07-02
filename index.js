const axios = require('axios')
const cheerio = require('cheerio')

function pegaProduto(urlProduto) {
	axios.get(urlProduto).then(function (response) {
		const $ = cheerio.load(response.data)

		const dadosProduto = {
			id: extraiId($),
			breadcrumb: extraiBreadcrumbs($),
			name: extraiNome($),
			img: extraiImagem($),
			seller: extraiVendedor($),
			price: extraiPreco($)
		}

		const jsonDadosProduto = JSON.stringify(dadosProduto)

		process.stdout.write(jsonDadosProduto)
		return jsonDadosProduto
	}).catch( function (error) {
			process.stdout.write("Erro - " + error)
		}
	)
}

function extraiId($) {
	const elementoId = $('#content section section span').first().text()

	let produtoId = elementoId.replace('(Cód.', '').replace(')', '')
	produtoId = parseInt(produtoId)
	return produtoId
}

function extraiBreadcrumbs($) {
	const breadcrumbs = []

	$('.product-breadcrumb a').each(function(i, valor) {
		let crumb = $(valor).text()
		breadcrumbs.push(crumb)
	})

	return breadcrumbs
}

function extraiNome($) {
	return $('h1').text()
}

function extraiImagem($) {
	return $('.gallery img').first().attr('src')
}

function extraiVendedor($) {
	return $('.seller-name-container span').first().text()
}

function extraiPreco($) {
	let preco = $('section').first().find('.sales-price').text()
	preco = preco.replace("R$ ", "").replace(".", "").replace(",", ".")
	preco = parseFloat(preco)

	return preco
}

module.exports = pegaProduto