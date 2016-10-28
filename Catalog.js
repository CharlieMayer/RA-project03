/**
 * Created by Edward_J_Apostol on 2016-10-22.
 */
export default class Catalog{

    constructor(){
        //
    }

    /*
    * the pattern of the product list is
     <div class="product-wrapper" style="position:absolute; left: multiple of count (530)">
     <img src="images/stretch-knit-dress.jpg" alt="Image of stretch knit dress" />
     <p class="product-type">Dresses</p>
     <h3>Stretch Knit Dress</h3>
     <p class="price">$169.00</p>
     </div>
    *
    *
    * */
/*
    showCatalog(products){
        let carouselProduct = '';
        let AllCarouselProducts = '';
        let currentItem = null;
        // let formattedName = '';
        for (let itemCount = 0; itemCount<products.length; itemCount++){
            currentItem = products[itemCount];
            carouselProduct = `<div class="product-wrapper" style="position: absolute; left: ` + (itemCount*300)  + `px;">`;
            carouselProduct += `<img height="100" width="100" src="` + currentItem['image'] + `" alt="` + currentItem['name'] + `" title="` + currentItem['name'] + `" />`;
            carouselProduct += `<p style="font-size: smaller">` + currentItem['name']  + `</p><br>\n`;
            carouselProduct += `<button type='button' id='`+ currentItem['sku'] +`' data-sku='` + currentItem['sku'] +`'>add to cart</button>`;
            //carouselProduct += `<button type='button' id='delete-`+ currentItem['sku'] +`' data-sku='` + currentItem['sku'] +`'>remove Item from Cart</button>`;
            carouselProduct += `</div>`;
            AllCarouselProducts +=carouselProduct + `\n`;
        }
        AllCarouselProducts +='\n'; // close flickity product slider
        return AllCarouselProducts;

    }
*/

    showCatalog(products){
        let maxItemsPerRow = 3; // todo: formula
        let currentRow = 1;
        let productTable = "<table border='1' width='100%' style='border: solid'>";
        let currentCell = 1;
        // count the number of products (should be 10)
        for (let itemCount = 0; itemCount<products.length; itemCount++){
            // produce a "table" of items
            let currentItem = products[itemCount];
            if(currentCell == 1){
                productTable += "<tr>\n";
            }
            // make an item
            productTable +="<td align='center' bgcolor='#f0ffff'>";
            productTable +=`<img src='` + currentItem['image'] + `' width="150" height="150" border="1" alt='`+ currentItem['name']+`' title='`+ currentItem['name'] +`'><br>`;



            productTable +=`<span>`+ currentItem['name'] +`</span><br>`;
            productTable +=`<button type='button' id='`+ currentItem['sku'] +`' data-sku='` + currentItem['sku'] +`'>add to cart :)</button>`;
            productTable +=`<button type='button' id='delete-`+ currentItem['sku'] +`' data-sku='` + currentItem['sku'] +`'>remove Item from Cart</button>`;
            productTable +='</td>';
            currentCell++;
            if (currentCell>maxItemsPerRow){
                productTable += "\n</tr>\n";
                currentCell=1;
            }

        }
        // end loop
        return productTable;
    };



}
1 Comment Collapse
separating the view code to build the catalog separately from App.js

djeddiej [10:08 AM]
to implement in App.js it looked like this
