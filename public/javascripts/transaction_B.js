
const data = '[{ "username": "Bibliotheque_1","password": "eadb8d9d79e3fe767600efd8918ef8b9"},{"username": "Bibliotheque_2","password": "3d805f42ef6e78e3cd28cd74a6102e62"},{"username": "Maison_Edition","password": "e1e7afe991a320fda97f0591c2e4ef0d"}]'

Make_list = (data) => {
  var listDiv = document.getElementById('table');
  var tread = document.createElement('tread');
  var tr = document.createElement('tr');

  listDiv.appendChild(tread).appendChild(tr);
  for (var i = 0; i < data.list.length; ++i) {
    var th = document.createElement('th');
    var textnode = document.createTextNode(data[i]);
    th.appendChild(textnode);
  }
}

$('#read-all').on("click", (event)=>{
  
  event.preventDefault();
  $(".transaction-content").hide() 
  $("#read-page").show();
  
});


$('#read-open').on("click", (event)=>{
  
  event.preventDefault();
  $(".transaction-content").hide();
  $("#read-page").show();
  
});

$('#read-mine').on("click", (event)=>{
  
  event.preventDefault();
  $(".transaction-content").hide();
  $("#read-page").show();
  
});

$('#buy-resource').on("click", (event)=>{
  
  event.preventDefault();
  $(".transaction-content").hide();
  $("#buy-page").show();
  
});

$('#redeem-resource').on("click", (event)=>{
  
  event.preventDefault();
  $(".transaction-content").hide();
  $("#redeem-page").show();
  
});

$('#sign-out').on("click",(event)=>{

  localStorage.clear();
  window.location.href = "/logout"
  
});

buyRights = (e) => {

  e.preventDefault();
  $(".metadata-message").hide()
  $("#transaction-loader").show()

  const resource = {
    resource_id: $("#buy-page").find("#resource-id").val(),
    resource_issuer: $("#buy-page").find("#resource-issuer").val(),
    resource_current_owner: $("#buy-page").find("#resource-current-owner").val(),
    resource_new_owner : variable.username
  }
  $.ajax({
    url: "http://localhost:3000/users/buy/",
    type: "POST",
    data: JSON.stringify(resource),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function (xhr, data) {
      $("#submit-buy-transaction").prop("disabled", true)
      
      console.log("COUCOU JENVOIE DES TRUCS POUR TOI")
      console.log(data)
    },
    complete: function (xhr, data) {
      $("#transaction-loader").hide()
      $("#submit-buy-transaction").prop("disabled", false)
      $("#submit-buy-rights-form")[0].reset()
    }
  })
    .done(function (data) {

      if (console && console.log) {
        console.log("IM BAAAAAAAAACK")
        console.log("IM BACK", data);
        console.log(data);
      }
      if (data.status == 0 && data.message) {
        $("#success_message_transaction").show()
        $("#success_message_transaction").text(data.message)
      }
      if (data.status == 1 && data.message) {
        $("#error_message_transaction").show()
        $("#error_message_transaction").text(data.message)
      }
    })
    .fail(function (ex) {

      $("#error_message_transaction").show()
      $("#error_message_transaction").text("Une erreur s'est produite. Veuillez contacter les étudiants de l'ensimag qui ont développé le projet")
      console.log(ex);
    });
};

redeemRights = (e) => {

  e.preventDefault();
  $(".metadata-message").hide()
  $("#transaction-loader").show()

  const resource = {
    resource_id: $("#redeem-page").find("#resource-id").val(),
    resource_issuer: $("#redeem-page").find("#resource-issuer").val()
  }
  $.ajax({
    url: "http://localhost:3000/users/redeem/",
    type: "POST",
    data: JSON.stringify(resource),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function (xhr, data) {
      $("#submit-redeem-transaction").prop("disabled", true)
      
      console.log("COUCOU JENVOIE DES TRUCS POUR TOI")
      console.log(data)
    },
    complete: function (xhr, data) {
      $("#transaction-loader").hide()
      $("#submit-redeem-transaction").prop("disabled", false)
      $("#submit-redeem-form")[0].reset()
    }
  })
    .done(function (data) {

      if (console && console.log) {
        console.log("IM BAAAAAAAAACK")
        console.log("IM BACK", data);
        console.log(data);
      }
      if (data.status == 0 && data.message) {
        $("#success_message_transaction").show()
        $("#success_message_transaction").text(data.message)
      }
      if (data.status == 1 && data.message) {
        $("#error_message_transaction").show()
        $("#error_message_transaction").text(data.message)
      }
    })
    .fail(function (ex) {

      $("#error_message_transaction").show()
      $("#error_message_transaction").text("Une erreur s'est produite. Veuillez contacter les étudiants de l'ensimag qui ont développé le projet")
      console.log(ex);
    });
};

$("#submit-buy-transaction").on('click', buyRights)
$("#submit-redeem-transaction").on('click', redeemRights)
