const axios = require('axios');
const cheerio = require('cheerio');

axios.get("https://www.americanas.com.br/produto/132248681/iphone-7-32gb-preto-matte-desbloqueado-ios-10-wi-fi-4g-camera-12mp-apple?DCSext.recom=RR_item_page.rr1-ClickCP&nm_origem=rec_item_page.rr1-ClickCP&nm_ranking_rec=2").then(function (response) {
	const $ = cheerio.load(response.data)
	
	const dadosProduto = {
		id: extraiId($)
	}

})

function extraiId($) {
	const elementoId = $('#content section section span').first().text();

	let produtoId = elementoId.replace('(Cód.', '').replace(')', '');
	produtoId = parseInt(produtoId);
	return produtoId;
}


