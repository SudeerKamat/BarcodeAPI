import { LightningElement } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities'; //import barcode API

export default class MyBarcodeScanner extends LightningElement {
    scannedResult ='';

    connectedCallback(){
        this.loadScanner = getBarcodeScanner(); 
    }

    handleClick(event){
        const loadScanner = getBarcodeScanner();
        if(loadScanner.isAvailable()){ //check if device has mobile capabilities
            const scanOptions ={
                barcodeTypes:[this.loadScanner.barcodeTypes.QR], // barcode types 
                instructionText :'Scan a QR Code',
                successText :'Scan Completed..!'
            };
            loadScanner.beginCapture(scanOptions)
            .then((result)=>{
                this.scannedResult = result.value;   // print final result on the screen 
            })
            .catch((error)=>{
                this.showError('error',error);
            })
            .finally(()=>{
                loadScanner.endCapture();
            })
        }
        else{
            this.showError('Error','Device Not Supported..!');
        }
    }
}