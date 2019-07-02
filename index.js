const axios = require('axios');
const cheerio = require('cheerio');

axios.get("https://www.americanas.com.br/produto/134255922/smart-tv-led-40-android-tcl-40s6500-full-hd-com-conversor-digital-wi-fi-bluetooth-1-usb-2-hdmi-controle-remoto-com-comando-de-voz-google-assistant?chave=prf_hm_0_oh_1_txar_00&hl=lower&pfm_carac=1&pfm_index=0&pfm_page=home&pfm_pos=maintop4&pfm_type=vit_spacey").then(function (response) {
	const $ = cheerio.load(response.data)
	
	const dadosProduto = {
		id: extraiId($),
		breadcrumbs: extraiBreadcrumbs($),
		nome: extraiNome($),
		imagem: extraiImagem($),
		vendedor: extraiVendedor($),
		preco: extraiPreco($)
	}

	console.log(dadosProduto)
})

function extraiId($) {
	const elementoId = $('#content section section span').first().text();

	let produtoId = elementoId.replace('(Cód.', '').replace(')', '');
	produtoId = parseInt(produtoId);
	return produtoId;
}

function extraiBreadcrumbs($) {
	const breadcrumbs = [];

	$('.product-breadcrumb a').each(function(i, valor) {
		let crumb = $(valor).text()
		breadcrumbs.push(crumb)
	});

	return breadcrumbs
}

function extraiNome($) {
	return $('h1').text();
}

function extraiImagem($) {
	return $('.gallery img').first().attr('src');
}

function extraiVendedor($) {
	return $('.seller-name-container span').first().text();
}

function extraiPreco($) {
	let preco = $('section').first().find('.sales-price').text();
	preco = preco.replace("R$ ", "").replace(".", "").replace(",", ".");
	preco = parseFloat(preco);

	return preco
}