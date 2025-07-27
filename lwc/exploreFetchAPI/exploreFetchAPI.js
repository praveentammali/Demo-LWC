//exploreFetchAPI.js
import { LightningElement, track } from "lwc";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ExploreFetchAPI extends LightningElement {
    postOffices = [];
    @track repos;
    columns = '';

        handlePostalcode(event){
        this.postalCode = event.detail.value;
        console.log(`Postal/Zip Code ${this.postalCode}`)
        //alert('Postal code is ',this.postalCode );
    }

   handleFetch() {
    if(this.postalCode) {
            fetch("https://api.postalpincode.in/pincode/"+this.postalCode,{ method: "GET" })
            .then((response) => {
                if(response.ok) {
                    // this.addressFound = true;
                    return response.json();
                } else {
                    throw Error(response);
                }
            })
        .then((data) => {
                let arrdata = data[0].PostOffice;
               // arrdata.forEach(element => {
                   this.repos = data[0].PostOffice;
                   console.log('each element', data[0].PostOffice);
                   
               // });
            })
             .catch(error => {
                console.log(`error postal code ${JSON.stringify(error)}`)
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error', 
                        message: 'Postal Code not found', 
                        variant: 'error'
                    }),
                );
            })
    }else{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Oops..', 
                    message: 'Please specify Postal/Zip Code', 
                    variant: 'warning'
                }),
            );
        }
     
   }
}