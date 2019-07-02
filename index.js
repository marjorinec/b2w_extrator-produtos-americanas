const axios = require('axios')
const cheerio = require('cheerio')

/**
 * O módulo pegaProduto recebe uma URL de produto da loja Americanas.com,
 * acessa sua página e extrai o código HTML dela. A partir dele, são extraidos
 * os dados do produto, que são organizados em um objeto. O objeto é convertido
 * para um JSON, que é retornado e impresso no terminal.
 * 
 * @exports pegaProduto
 */


/**
 * Retorna dados do produto de uma URL da loja.
 * 
 * @param  {string} - a URL de um produto
 * @return {string} - o JSON com as informações do produto
 * @print - imprime o valor de retorno em stdout
 */

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
	}).catch(function (error) {
			process.stdout.write("Erro - " + error)
		}
	)
}

/**
 * Encontra um código de produto e o retorna.
 *
 * @param $ {objeto Cheerio carregado} - documento HTML do qual o código de produto será extraído
 * @return {integer} - o código do produto
 */

function extraiId($) {
	const elementoId = $('#content section section span').first().text()

	let produtoId = elementoId.replace('(Cód.', '').replace(')', '')
	produtoId = parseInt(produtoId)
	return produtoId
}

/**
 * Encontra o breadcrumb do produto na loja e o retorna.
 *
 * @param $ {objeto Cheerio carregado} - documento HTML do qual o breadcrumb será extraído
 * @return {string[]} - o breadcrumb do produto
 */

function extraiBreadcrumbs($) {
	const breadcrumbs = []

	$('.product-breadcrumb a').each(function(i, valor) {
		let crumb = $(valor).text()
		breadcrumbs.push(crumb)
	})

	return breadcrumbs
}

/**
 * Encontra o nome do produto e o retorna.
 *
 * @param $ {objeto Cheerio carregado} - documento HTML do qual o nome será extraído
 * @return {string} - o nome do produto
 */

function extraiNome($) {
	return $('h1').text()
}

/**
 * Encontra a URL da imagem do produto e a retorna.
 *
 * @param $ {objeto Cheerio carregado} - documento HTML do qual a URL será extraída
 * @return {string} - a URL da imagem do produto
 */

function extraiImagem($) {
	return $('.gallery img').first().attr('src')
}

/**
 * Encontra o vendedor do produto e o retorna.
 *
 * @param $ {objeto Cheerio carregado} - documento HTML do qual o nome do vendedor será extraído
 * @return {string} - o nome do vendedor do produto
 */

function extraiVendedor($) {
	return $('.seller-name-container span').first().text()
}

/**
 * Encontra o preço do produto e o retorna.
 *
 * @param $ {objeto Cheerio carregado} - documento HTML do qual o preço será extraído
 * @return {float} - o preço do produto
 */

function extraiPreco($) {
	let preco = $('section').first().find('.sales-price').text()
	preco = preco.replace("R$ ", "").replace(".", "").replace(",", ".")
	preco = parseFloat(preco)

	return preco
}

module.exports = pegaProduto