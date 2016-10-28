export default class BBProductAPIService {
    constructor(){
        console.log('initializing Best Buy API Service');
        this.bbURL = "http://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=8ccddf4rtjz5k5btqam84qak&format=json&show=image,name,regularPrice,salePrice,sku";
        //this.loadDataUsingJS();
    }

    loadDataUsingJQuery(){
        // include the ajax call here
        return data; // or result/JSON
    }

    loadDataUsingJS(){
        // can use this or the JQuery one
        let _promiseFn = (_success, _reject) => {
            let request = new XMLHttpRequest();
            request.onload = () => {
                switch(request.status){
                    case 200:
                        _success(request.response );// take our success function and pass our data/response into it
                        break;
                    case 404:
                        console.log('error: service url not found');
                        _reject(Error(request.statusText));
                        break;
                    default:
                        _reject(Error(request.statusText));
                        break;
                }
            };
            // Handle network errors
            request.onerror = function () {
                _reject(Error('Network Error'));
            }
            request.open('GET', this.bbURL);
            request.send();
        }
        let promise = new Promise(_promiseFn);
        return promise;
    }

}
