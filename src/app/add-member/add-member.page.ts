import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

qrData = null;
createdCode = null;
scannedCode = null;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  createCode(){
    this.createdCode; // = this.currentHouse.id
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }

}
