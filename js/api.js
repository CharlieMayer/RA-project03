
$(document).ready(function(){

$.ajax({
  url: "http://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=8ccddf4rtjz5k5btqam84qak&format=json&show=image,name,regularPrice,salePrice,sku",
   method: 'GET',
  }).done(function(data) {


    for(i in data.products){
         //var products= data
        // console.log(products);
          var image= data.products[i].image;
          var name= data.products[i].name;
          var regularPrice= data.products[i].regularPrice;
          console.log(name);
          console.log(image);
          console.log(regularPrice);


          var clone= $('.product-list').eq(0).clone();
            $(clone).children(".product-wrapper").children('img').attr('src',image);
            $(clone).children(".product-wrapper").children('p').html(name);
            $(clone).children(".product-wrapper").children('p').html(regularPrice);
            $('.product-list').append(clone);



      }

      }).fail(function(err) {
        throw err;
      });
});
