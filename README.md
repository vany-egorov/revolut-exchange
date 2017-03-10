Meta:

* Open the current Revolut app, on either iOS or Android, and navigate to the exchange screen.

* Implement the functionality of this screen in your own custom web widget using the FX rates from either source:
  * http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html#dev or
  * https://openexchangerates.org/
 
Explicit Requirements:

* Your app should poll the endpoint every 30 seconds to get the latest rates for GBP, EUR and USD. (The API provides close of day FX rates. We expect you to request the new rate every 30s. We do not expect the rate to change every 30s)
* Focus more on code design rather than UI. If you have time at the end of the task, please try and adapt the Revolut UI for web along with styling where possible.
 
Implicit Requirements:

* The code produced is expected to be of a high standard.
 
Please put your work on Bitbucket, or Github.

Video to see how it works:
https://www.youtube.com/watch?v=c0zPSiKYipc
