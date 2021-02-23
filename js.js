
$(function() {
	var aID = [];	
	var desc= [];
	var limit = 49;

	$('#btnSearch').click(function(event) {
		var category    = $('.category').val();
		var search      = $('.Search-Engine').val();
		var description = $('#description').val(); 
		var web = $('#Search-Engine').val();
 
 		switch(category){
		  case 'MLB40272':
		    nameCategory = 'Geladeira';
		    break;
		  case 'MLB1002':
		    nameCategory = 'Tv';
		    break;
		  case 'MLB1055':
		    nameCategory = 'Celular';
 		    break;
		}
		switch(web){
		  case '0':
		  	alert('Selecione WEB')
		  	return false
		  case '3':
		  	alert('API NÃO ENCONTRADA NA WEB')
		  	return false

		}
		switch(category){
		  case '0':
		  	alert('Selecione Categoria')
		  	return false
		}

		// Requisição Mercado Livre

		var settings = {
		  "url": ' https://api.mercadolibre.com/sites/MLB/search?category='+category+'&q='+description+'', 
		  "method": "GET",
		  "timeout": 0,
		};

		$('.list-unstyled').html('');
		$.ajax(settings).done(function (response) { 
			var total = response.paging.total;
		  	var obj   = response.results;

			if(total == 0){
				$('.list-unstyled').html('<h3>NENHUM REGISTRO ENCONTRADO</h3>')	
			}

			Object.keys(obj).forEach(function(key) {
				 
				id    = obj[key].id;
			
				aID.push(id);

				image = obj[key].thumbnail;
				title = obj[key].title;			 
				price = obj[key].price;
 				link  = obj[key].permalink;
				 
	 			$('.list-unstyled').append(`
	 				<div class="row">
					<div class="col-lg-12">&nbsp</div>
	 				<div class="col-lg-2">
						<li>
						 	<img src=`+image+`  
						  	class="img-fluid img-thumbnail" 
						  	alt=`+image+`
						  	title=`+title+` 
						  	width="150" height="150">
						</li>
					</div>
	 				<div class="col-lg-8">					
						<li> <h5> `+title+` </h5> <strong> Categoria: `+nameCategory+` </strong> </li>
							<p class="description" id='`+key+`'> </p>
						<h5> 
							Preço: <strong>`+price.toFixed(2)+`</strong>
						</h5>
					</div>	
	 				<div class="col-lg-2">					
	 					<a href=`+link+` target='_blank'> 
	 						<input type='button' class="btn btn-info" value="Ir a web">
	 					</a>
					</div>	

					<div class="col-lg-12">&nbsp</div>
					`
				);
			});

			for(i = 0 ; i <= limit ; i++){
				$.ajax({
				  url: 'https://api.mercadolibre.com/items/'+aID[i]+'/description?api_version=2#json', 
				  method: "GET",
				  timeout: 0,
				  success:function(response){
	 				desc.push(response.plain_text);
					for(i = 0 ; i <= limit ; i++){
						$('#'+i).html(desc[i])
					}
				  }			 
				})
			}	
		});
	});
});