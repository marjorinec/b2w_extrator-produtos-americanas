const axios = require('axios');

axios.get("https://www.americanas.com.br/produto/132248681/iphone-7-32gb-preto-matte-desbloqueado-ios-10-wi-fi-4g-camera-12mp-apple?DCSext.recom=RR_item_page.rr1-ClickCP&nm_origem=rec_item_page.rr1-ClickCP&nm_ranking_rec=2").then(function (response) {
	console.log(response.data);
})