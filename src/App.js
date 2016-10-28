import ShoppingCart from 'ShoppingCart.js';
import BBProductAPIService from './BBProductAPIService';
import BBProductData from '.model/BBProductData';
import Catalog from './Catalog';

export default class App{
 constructor(){
   console.log("creating app");
 this.data= [  ];
 this.getTheData();
 this.ShoppingCart = new ShoppingCart();
 }

getTheData(){
 this.BBProductAPIService = new BBProductAPIService();
 let context= this;
 // result = this.BBProductAPIService.loadDataUsingJQuery();
 this.sucessCallback= function(response){
   console.log('blah response = \n ' + response);
   context.data = JSON.parse(response);
  context.processResultsIntoUsableData(context.data);

 };


 this.failCallback =function(error){
   console.error("Failed! \n", error);
 };
 this.BBProductAPIService.loadDataUsingJS().then(this.sucessCallback,this.failCallback);
// load the data


}
 processResultsIntoUsableData(result){
   // from here, extract only the product info
   this.rawData = new BBProductData(result);  //new BBProductData(results)
   this.products = this.rawData.products;
   console.log('PRODUCTS ONLY IS THIS THING HERE-  \n' + this.products)
   this.createTableOfItems(this.products);
}
createTableOfItems(products){
    for (var i=0; i < products.length; i++) {
      var currentItem= products[i];
        var image=products[i].image;
        var name= products[i].name;
        var regularPrice= products[i].regularPrice;
        var sku= products[i].sku;
        console.log(name);
        console.log(image);
        console.log(regularPrice);
        console.log(sku);

        var clone= $('.product-wrapper').eq(0).clone();
        $(clone).children('img').attr('src',image);
        $(clone).children('p').html(name);
        $(clone).children('p').html(regularPrice);
        $('.flickity-slider').append(clone);



    }

}
    /**  console.log('createTableOfItems();');
      let maxItemsPerRow = 3; // todo: formula
      let currentRow = 1;
      let productTable = "<table border='1' width='100%'>";
      let currentCell = 1;
      // count the number of products (should be 10)
      for (let itemCount = 0; itemCount<products.length; itemCount++){
          // produce a "table" of items
          let currentItem = products[itemCount];
          if(currentCell == 1){
           productTable += "<tr>\n";
          }
          // make an item
          productTable +="<td align='center' bgcolor='#f0ffff '>";
          productTable +=`<img src='` + currentItem['image'] + `' width="150" height="150" border="1" alt='`+ currentItem['name']+`' title='`+ currentItem['name'] +`'><br>`;



          productTable +=`<span>`+ currentItem['name'] +`</span><br>`;
          productTable +=`<button type='button' id='`+ currentItem['sku'] +`' data-sku='` + currentItem['sku'] +`'>add to cart :)</button>`;



          productTable +='</td>';
          currentCell++;
          if (currentCell>maxItemsPerRow){
          productTable += "\n</tr>\n";
          currentCell=1;
          }

      }
**/

      // console.log('productTable = ' + productTable);
      //document.getElementById('story-grid').innerHTML = productTable;
      // the same as $('story-grid').html(productTable);

      // add event listeners to all the buttons to make them
      // respond
      for (let btnCount = 0; btnCount<products.length; btnCount++){
          let currentItem = products[btnCount];


          let onClickClosureFN = function(context){
            console.log('context is ' + context);
            let evtFunctionToReturn = function (evt){
              context.prepareItemToAddToCart(evt.context);
            };
            return evtFunctionToReturn;
          };  //TODO -move this outside of loop



          document.getElementById(currentItem['sku']).addEventListener('click',this.prepareItemToAddToCart);
          // or do this ! $(currentItem['sku']).on('click',{},this.shoppingCart.addItemToCart);

          let onClickClosureFn = function(context){
                         console.log('context is ' + context);
                         let evtFunctionToReturn = function (evt){
                             context.prepareItemToAddToCart(evt,context);
                         };
                         return evtFunctionToReturn;
                     }; // TODO - move this outside of loop

                     document.getElementById(currentItem['sku']).addEventListener('click',(onClickClosureFn)(this));


                     addItemToCart(item,qty=0){
                            console.log(`addItemToCart(): item is = ` + item + ` quantity is = ` + qty);
                            if (this.ss == null ){ return };
                            if( qty<=0 ) { return; }
                            if(item==null || typeof (item)=='undefined') { return; }

                            // check to see if the item in the cart already exists
                            // console.log('this.ss = ' + this.ss);
                            // loop through all the items currently in session storage
                            console.log('the # of items in session storage is ' + this.ss.length);
                            let numberOfItemsInCart = this.ss.length;

                            // case: we're the 1st product ever!
                            if (numberOfItemsInCart == 0){
                                // simply add the new item and quantity;
                                this.ss.setItem( item.toString() ,qty.toString() );
                                return;
                            } else {
                                // case: there is more than one product / sku
                                // loop through all the 'keys' in session storage
                                let numMatches = 0;
                                for (let theKey in this.ss){
                                    // check to see if the key matches the sku
                                    console.log('theKey = ' + theKey);
                                    if ( theKey == item.toString() ){
                                        console.log('found a matching key.')
                                        // if it does, update the quantity value by qty

                                        let newValue = (parseInt( this.ss.getItem(theKey) ) - parseInt (qty);
                                        if (newValue) <= 0){
                                          console.log('no items of this type left, removing from cart');
                                          this.ss.removeItem(theKey);
                                          break;//quits the loop
                                          return;
                                       }
                                        this.ss.setItem(theKey, newValue.toString()  );
                                        numMatches =1;
                                    } else {
                                        console.log('no match');
                                    }
                                    if (numMatches)==0){
                                      //no matches, just return
                                      return;
                                    }

                                }
                                // if we did not find a match after going looping through the keys
                                if (numMatches==0){
                                    // add the new key / value pair
                                    this.ss.setItem(item.toString(),qty);
                                }
                            }

                            // console.log the session storage to see what is happening.
                            console.log('the results of the cart so far...');
                            for (let newKey in this.ss){
                                console.log('key/sku = ' + newKey + ' quantity = ' + this.ss.getItem(newKey));

                            }



                        }



        }
      }
      addItemToCart(item,qty=0){
       console.log(`addItemToCart(): item is = ` + item + ` quantity is = ` + qty);
       if (this.ss == null ){ return };
       if( qty<=0 ) { return; }
       if(item==null || typeof (item)=='undefined') { return; }

       // check to see if the item in the cart already exists
       // console.log('this.ss = ' + this.ss);
       // loop through all the items currently in session storage
       console.log('the # of items in session storage is ' + this.ss.length);
       let numberOfItemsInCart = this.ss.length;

       // case: we're the 1st product ever!
       if (numberOfItemsInCart == 0){
           // simply add the new item and quantity;
           this.ss.setItem( item.toString() ,qty.toString() );
           return;
       } else {
           // case: there is more than one product / sku
           // loop through all the 'keys' in session storage
           let numMatches = 0;
           for (let theKey in this.ss){
               // check to see if the key matches the sku
               console.log('theKey = ' + theKey);
               if ( theKey == item.toString() ){
                   console.log('found a matching key.')
                   // if it does, update the quantity value by qty
                   let newValue = (parseInt( this.ss.getItem(theKey) ) + parseInt (qty)).toString();
                   this.ss.setItem(theKey, newValue  );
                   numMatches =1;
               } else {
                   console.log('no match');
               }

           }
           // if we did not find a match after going looping through the keys
           if (numMatches==0){
               // add the new key / value pair
               this.ss.setItem(item.toString(),qty);
           }
       }

       // console.log the session storage to see what is happening.
       console.log('the results of the cart so far...');
       for (let newKey in this.ss){
           console.log('key/sku = ' + newKey + ' quantity = ' + this.ss.getItem(newKey));

       }



   }





      prepareItemToAddToCart(evt,context){

          // we receive an event object that contains the information about the object
          // that generated the target
          if(evt==null || typeof (evt) === 'undefined'){
              return;
          }
          let targetSKU = evt.target.getAttribute('data-sku');
          // let targetSKU = $(evt.target).attr('data-sku')

          // update modal with content.
          // console.log( document.getElementsByClassName('modal-content') );
          let productAdded = this.getProductBySku(targetSKU);
          $('#content').last().html('<b>'+ productAdded.name +'</b><br>has been added to the cart.<br>');

          context.shoppingCart.addItemToCart(targetSKU,1);
      }

   getProductBySku(sku=0){
          if (sku==0){ return; };
          //console.log(this.products);
          let criteriaFn = function(product){
              return product['sku'] == sku;
          };
          let result = this.products.filter(criteriaFn);
          // result is an array of potential products.
          // but one product should be returned only.
          // so return the first element;
          return result[0];
      }
     }

     prepareDeleteItemFromCart(evt,context){
console.log('preparing to delete item from cart!!!');
if(evt==null || typeof (evt) === 'undefined'){
 return;
}
let targetSKU = evt.target.getAttribute('data-sku');
console.log(targetSKU,context);
context.shoppingCart.deleteItemFromCart(targetSKU,1);

}
// add event listeners to all the delete buttons to make them respond
       for (let delBtnCount = 0; delBtnCount < products.length; delBtnCount++){
               let currentItem = products[delBtnCount];
               let currentSku = currentItem['sku'];
               let deleteSku = 'delete-' + currentSku;
               console.log('creating click events for delete button -');
               console.log('deleteSku = ' + deleteSku);
               let currentObject = "#"+ deleteSku; // #delete-32421
               // the variable below assumes that in App.js you have a function called
               // 'prepareDeleteItemFromCart' that's like addItemToCart
               let context =  this;
               $(currentObject).on('click',null,{context:context},function(event){
                   // console.log(event);
                   // console.log(event.target);
                   // console.log(event.data);
                   // console.log(event.data.callBack);
                   event.data.context.prepareDeleteItemFromCart(event,event.data.context);
               });

       }

      }
