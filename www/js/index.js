/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var jan_code="";

var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
//        this.receivedEvent('deviceready');

    admob.banner.config({
        id: 'ca-app-pub-XXXXXXX/XXXXXXX',
        isTesting: false, //テスト時はtrueにする
        autoShow: true,  
        bannerAtTop: true
    });

    $("#search_web").hide();        

      //読み込み
    admob.banner.prepare();
    // 表示
    admob.banner.show();  
        

	cordova.getAppVersion.getVersionNumber().then(function (version) {
	    $('#version').text(version);
	});
    
    
    /*
      BarCode Scan
    */

    $('#btn_barscan').on('click', function(e) {
      console.log('クリックされました!');

           cordova.plugins.barcodeScanner.scan(
              function (result) {
                if(result.cancelled == false){
                  $("#search_web").show();        
/*
                  alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
*/
                   $('#info_text').text("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n"  //QR_CODE
                       );
                        jan_code=result.text;
                } else {

                }
                        
              },
              function (error) {
                  alert("Scanning failed: " + error);
              },
              {
                  preferFrontCamera : true, // iOS and Android
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: true, // Android, launch with the torch switched on (if available)
                  saveHistory: true, // Android, save scan history (default false)
                  prompt : "Place a barcode inside the scan area", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true, // iOS
                  disableSuccessBeep: false // iOS and Android
              }
           );
    });
    

    /*
    Detailed Information
    */
/*
    $('#btn_barscan').on('click', function(e) {
  console.log('クリックされました!');
    });
    
*/

    $('#search_web').on('click', function(e) {
    var hrl_ref=jan_code;
        if( jan_code.indexOf( 'http', 0) === -1) {
           hrl_ref='https://www.google.com/search?q='+jan_code;
        }
         var ref = cordova.InAppBrowser.open(hrl_ref, '_blank', 'location=yes');
    });

    },

};

app.initialize();