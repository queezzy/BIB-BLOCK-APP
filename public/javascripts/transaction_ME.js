
const data = '[{ "username": "Bibliotheque_1","password": "eadb8d9d79e3fe767600efd8918ef8b9"},{"username": "Bibliotheque_2","password": "3d805f42ef6e78e3cd28cd74a6102e62"},{"username": "Maison_Edition","password": "e1e7afe991a320fda97f0591c2e4ef0d"}]'

/*Make_list = (data) => {
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
*/

$('#read-all').on("click", (event) => {

  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll();
  $("#read-page").show();
  

});

$('#issue-resource').on("click", (event) => {

  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#submit-page").show();

});

$('#redeem-resource').on("click", (event) => {

  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#redeem-page").show();

});

$('#sign-out').on("click", (event) => {

  localStorage.clear();
  window.location.href = "/logout"
})


submitRights = (e) => {

  e.preventDefault();
  $(".metadata-message").hide()
  $("#transaction-loader").show()
  const resource = {
    resource_id: $("#submit-page").find("#resource_id").val(),
    resource_issuer: $("#submit-page").find("#resource_issuer").val(),
    resource_title: $("#submit-page").find("#resource_title").val(),
    resource_description: $("#submit-page").find("#resource_description").val(),
    resource_value: $("#submit-page").find("#resource_value").val()
  }
  console.log(resource)

  $.ajax({
    url: "http://localhost:3000/users/submit/",
    type: "POST",
    data: JSON.stringify(resource),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function (xhr, data) {
      $("#submit-issue-transaction").prop("disabled", true)
      console.log("COUCOU JENVOIE DES TRUCS POUR TOI")
      console.log(data)
    },
    complete: function (xhr, data) {
      $("#transaction-loader").hide()
      $("#submit-issue-transaction").prop("disabled", false)
      $("#submit-rights-form")[0].reset()
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

$("#submit-issue-transaction").on('click', submitRights)




readAll = () => {

  $.ajax({
    url: "http://localhost:3000/users/all_publication/",
    type: "GET",
    complete: function (xhr, data) {
      $("#transaction-loader").hide()
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
        render_table(data);
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
}


render_table=data=> {
  res = [];
 /* for (let [key, value] of Object.entries(data.message)) {
    console.log(`${JSON.stringify(key)}: ${JSON.stringify(value)}`);
  }*/

  var listDiv = $('#mytable')
  data.data.forEach(value => {
    console.log(value.Record)
    var div = listDiv.append("<tr>")
    let etat 
    if (value.Record.currentState===1){
         etat = "ouvert"
    }
    else if (value.Record.currentState===2){
         etat = "droits détenus par une librairie"
    }
    else {
         etat = "rétrocédés à la maison d'édition"
    }
    var row ="<td>"+value.Record.resourceID.toString()+'</td>"+"<td>'+value.Record.resourceTitle.toString()+'</td>"+"<td>'+value.Record.resourceDescription.toString()+'</td>"+"<td>'+value.Record.owner.toString()+'</td>"+"<td>'+value.Record.resourceValue.toString()+'</td>"+"<td>'+value.Record.issuer.toString()+'</td>"+"<td>'+value.Record.issueDateTime.toString()+'</td>"+"<td>'+value.Record.maturityDateTime.toString()+'</td>'+'</td>"+"<td>'+etat+'</td>'
    div.append(row); 
    });
};
