//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.address = [];
}
function Address(street, city, state, type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.type = type;
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Address.prototype.fullAddress = function() {
  return this.type + ": " +this.street + ", " + this.city + ", " + this.state;
}

//user interface logic
function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("#remove-new-addresses").hide();
}


$(document).ready(function(){
  $("#add-address").click(function() {
    $("#new-addresses").append('<div id="remove-new-addresses">'+ '<div class="new-address">' +
     '<div class="form-group">' +
       '<label for="new-street">Street</label>' +
       '<input type="text" class="form-control new-street">' +
     '</div>' +
     '<div class="form-group">' +
       '<label for="new-city">City</label>' +
       '<input type="text" class="form-control new-city">' +
     '</div>' +
     '<div class="form-group">' +
       '<label for="new-state">State</label>' +
       '<input type="text" class="form-control new-state">' +
     '</div>' +
   '<div class="checkbox">' +
     '<label>' + '<input type="checkbox" value="Home" name="address-type"> Home address</label>' +
   '</div>' +
   '<div class="checkbox">' +
     '<label><input type="checkbox" value="Work" name="address-type">Work address</label>' +
   '</div>' +
   '</div>'

 );
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var addressType = $(this).find("input:checkbox[name=address-type]:checked").val();
      var newAddress = new Address (inputtedStreet, inputtedCity, inputtedState, addressType);
      newContact.address.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function(){
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      newContact.address.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields();
  });
});
