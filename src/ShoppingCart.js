
export default class ShoppingCart {

  constructor(){
    // steps to make a Shopping Cart
    console.log('creating shopping cart!');
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
}
