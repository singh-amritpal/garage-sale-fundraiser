/* 
  Author: Amritpal Singh
*/

$(document).ready(function () {
  $('#receipt').hide();     //hiding the receipt section when page is loaded.
})

//function to calculate receipt amount and contents when form is submitted.
function checkout() {

  //Declaring and initializing the price of each item available.
  let waterBottlesPrice = 5.00;
  let capsPrice = 20.0;
  let pensPrice = 2.00;
  let candyBagsPrice = 10.00;
  let cupCakesPrice = 3.00;

  //Declaring and initializing the initial quantity of items.
  let waterBottlesTotalPrice = 0;
  let capsTotalPrice = 0;
  let pensTotalPrice = 0;
  let candyBagsTotalPrice = 0;
  let cupCakesTotalPrice = 0;

  //taking user information from form.
  let customerName = document.getElementById('customerName').value;
  let customerEmail = document.getElementById('customerEmail').value;
  let cardNumber = document.getElementById('cardNumber').value;
  let cardExpiryMonth = document.getElementById('cardExpiryMonth').value;
  let cardExpiryYear = document.getElementById('cardExpiryYear').value;

  //taking quantity input of each item and parsing it into integers.
  let waterBottlesQuantity = parseInt(document.getElementById('waterBottles').value);
  let capsQuantity = parseInt(document.getElementById('caps').value);
  let pensQuantity = parseInt(document.getElementById('pens').value);
  let candyBagsQuantity = parseInt(document.getElementById('candyBags').value);
  let cupCakesQuantity = parseInt(document.getElementById('cupCakes').value);

  //validating if the input quantity for each item is empty, set it to 0.
  if (isNaN(waterBottlesQuantity)) {
    document.getElementById('waterBottles').placeholder = "0";
    waterBottlesQuantity = 0;
  }
  if (isNaN(capsQuantity)) {
    document.getElementById('caps').placeholder = "0";
    capsQuantity = 0;
  }
  if (isNaN(pensQuantity)) {
    document.getElementById('pens').placeholder = "0";
    pensQuantity = 0;
  }
  if (isNaN(candyBagsQuantity)) {
    document.getElementById('candyBags').placeholder = "0";
    candyBagsQuantity = 0;
  }
  if (isNaN(cupCakesQuantity)) {
    document.getElementById('cupCakes').placeholder = "0";
    cupCakesQuantity = 0;
  }

  //calculating total quantity of all items.
  let totalQuantity = waterBottlesQuantity + capsQuantity + pensQuantity + candyBagsQuantity + cupCakesQuantity;
  
  //regular expressions for credit card information.
  let creditCardRegex = /^4[0-9]{3}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/;
  let cardExpiryMonthRegex = /^(?:JAN?|FEB?|MAR?|APR?|MAY?|JUN?|JUL?|AUG?|SEP?|OCT?|NOV?|DEC?)$/;
  let cardExpiryYearRegex = /^(202[1-9]|2030)$/;

  let errors = '';

  //validating user Name and email address
  if (customerName == null || customerName == '') {
    errors += "Please enter your Name.<br>";
  }
  if (customerEmail == null || customerEmail == '') {
    errors += "Please enter an Email address.<br>";
  }

  //validating credit card input based on the regex.
  if (!creditCardRegex.test(cardNumber)) {
    errors += "Enter a valid Credit Card Number.<br>";
  }
  if (!cardExpiryMonthRegex.test(cardExpiryMonth)) {
    errors += "Enter a valid Credit Card Expiry Month.<br>";
  }
  if (!cardExpiryYearRegex.test(cardExpiryYear)) {
    errors += "Enter a valid Credit Card Expiry Year.<br>";
  }

  //validating items quantity input is not more than 99.
  if (waterBottlesQuantity > 99) {
    errors += "Maximum allowed limit for Water Bottles is 99.<br>";
  }
  if (capsQuantity > 99) {
    errors += "Maximum allowed limit for Caps is 99.<br>";
  }
  if (pensQuantity > 99) {
    errors += "Maximum allowed limit for Pens is 99.<br>";
  }
  if (candyBagsQuantity > 99) {
    errors += "Maximum allowed limit for Candy Bags is 99.<br>";
  }
  if (cupCakesQuantity > 99) {
    errors += "Maximum allowed limit for Cup Cakes is 99.<br>";
  }

  //validating items quantity is > 0.
  if (totalQuantity === 0 || isNaN(totalQuantity)) {
    errors += "Please buy at-least one of the available items.<br>";
  }

  //showing error (if any) on page as per validations above.
  if (errors) {
    document.getElementById('errors').innerHTML = errors;
    $('#receipt').hide();
  }
  else {  //if there are no errors, calculate receipt contents.
    $('#salesForm').hide();     //hide the sales form.

    $('#receipt').show();       //show the receipt

    //slice the credit card number to show only last 4 digits.
    let receiptCreditCardNumber = cardNumber.slice(15, 19);
    let outputCardNumber = "xxxx-xxxx-xxxx-" + receiptCreditCardNumber;

    //set errors in HTML to blank and show customer info collected from the form.
    document.getElementById('errors').innerHTML = '';
    document.getElementById('receiptCustomerName').innerHTML = `${customerName}`;
    document.getElementById('receiptCustomerEmail').innerHTML = `${customerEmail}`;
    document.getElementById('receiptCreditCard').innerHTML = `${outputCardNumber}`;

    if (waterBottlesQuantity > 0) { //validating if waterBottlesQuantity > 0, only then show the row in receipt by setting display property to "table-row".
      document.getElementById('receiptWaterBottles').style.display = 'table-row';

      //calculate waterBottleTotalPrice by multiplying quantity with price and adding in receipt with upto two decimal digits.
      waterBottlesTotalPrice = waterBottlesQuantity * waterBottlesPrice;
      document.getElementById('waterBottlesQuantity').innerHTML = `${waterBottlesQuantity}`;
      document.getElementById('waterBottlesUnitPrice').innerHTML = `$${waterBottlesPrice.toFixed(2)}`;
      document.getElementById('waterBottlesTotalPrice').innerHTML = `$${waterBottlesTotalPrice.toFixed(2)}`;
    }
    if (capsQuantity > 0) { //validating if capsQuantity > 0, only then show the row in receipt by setting display property to "table-row".
      document.getElementById('receiptCaps').style.display = 'table-row';

      //calculate capsTotalPrice by multiplying quantity with price and adding in receipt with upto two decimal digits.
      capsTotalPrice = capsQuantity * capsPrice;
      document.getElementById('capsQuantity').innerHTML = `${capsQuantity}`;
      document.getElementById('capsUnitPrice').innerHTML = `$${capsPrice.toFixed(2)}`;
      document.getElementById('capsTotalPrice').innerHTML = `$${capsTotalPrice.toFixed(2)}`;
    }
    if (pensQuantity > 0) { //validating if pensQuantity > 0, only then show the row in receipt by setting display property to "table-row".
      document.getElementById('receiptPens').style.display = 'table-row';

      //calculate pensTotalPrice by multiplying quantity with price and adding in receipt with upto two decimal digits.
      pensTotalPrice = pensQuantity * pensPrice;
      document.getElementById('pensQuantity').innerHTML = `${pensQuantity}`;
      document.getElementById('pensUnitPrice').innerHTML = `$${pensPrice.toFixed(2)}`;
      document.getElementById('pensTotalPrice').innerHTML = `$${pensTotalPrice.toFixed(2)}`;
    }
    if (candyBagsQuantity > 0) {  //validating if candyBagsQuantity > 0, only then show the row in receipt by setting display property to "table-row".
      document.getElementById('receiptCandyBags').style.display = 'table-row';

      //calculate candyBagsTotalPrice by multiplying quantity with price and adding in receipt with upto two decimal digits.
      candyBagsTotalPrice = candyBagsQuantity * candyBagsPrice;
      document.getElementById('candyBagsQuantity').innerHTML = `${candyBagsQuantity}`;
      document.getElementById('candyBagsUnitPrice').innerHTML = `$${candyBagsPrice.toFixed(2)}`;
      document.getElementById('candyBagsTotalPrice').innerHTML = `$${candyBagsTotalPrice.toFixed(2)}`;
    }
    if (cupCakesQuantity > 0) { //validating if cupCakesQuantity > 0, only then show the row in receipt by setting display property to "table-row".
      document.getElementById('receiptCupCakes').style.display = 'table-row';

      //calculate cupCakesTotalPrice by multiplying quantity with price and adding in receipt with upto two decimal digits.
      cupCakesTotalPrice = cupCakesQuantity * cupCakesPrice;
      document.getElementById('cupCakesQuantity').innerHTML = `${cupCakesQuantity}`;
      document.getElementById('cupCakesUnitPrice').innerHTML = `$${cupCakesPrice.toFixed(2)}`;
      document.getElementById('cupCakesTotalPrice').innerHTML = `$${cupCakesTotalPrice.toFixed(2)}`;
    }

    //calculating the price before adding donation amount.
    let priceBeforeDonation = waterBottlesTotalPrice + capsTotalPrice + pensTotalPrice + candyBagsTotalPrice + cupCakesTotalPrice;

    //calculating donation amount, i.e. greater of $10 or 10% of total amount.
    let donationAmount = (priceBeforeDonation * 0.10 < 10) ? 10 : (priceBeforeDonation * 0.10);
    document.getElementById('donationAmount').innerHTML = `$${donationAmount.toFixed(2)}`;

    //calculating total amount including donation amount.
    let totalPriceAfterDonation = priceBeforeDonation + donationAmount;
    document.getElementById('totalPrice').innerHTML = `$${totalPriceAfterDonation.toFixed(2)}`;
  }

  return false;
}

//function to add hyphens in credit card number after every 4 digits automatically when it is entered.
function creditCardHyphen(e) {
  let inputText = document.getElementById(e.id).value;
  inputText = inputText.split('-').join('');    // Remove hyphen when it is entered manually.

  let updatedText = inputText.match(/.{1,4}/g).join('-');
  document.getElementById(e.id).value = updatedText;
}