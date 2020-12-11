$('#read-all').on("click", (event) => {

  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll(0);
  $("#read-page").show();


});


$('#read-open').on("click", (event) => {

  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll(1);
  $("#read-page").show();

});

$('#read-mine').on("click", (event) => {

  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll(2);
  $("#read-page").show();

});

$('#buy-resource').on("click", (event) => {

  event.preventDefault();
  $(".transaction-content").hide();
  $("#buy-page").show();

});

$('#redeem-resource').on("click", (event) => {

  event.preventDefault();
  $(".transaction-content").hide();
  $("#redeem-page").show();

});

$('#sign-out').on("click", (event) => {

  localStorage.clear();
  window.location.href = "/logout"

});

buyRights = (e) => {

  e.preventDefault();
  $(".metadata-message").hide()
  $("#transaction-loader").show()
  let variable = JSON.parse(window.localStorage.getItem("bib_block_values"))
  const resource = {
    resource_id: $("#buy-page").find("#resource-id").val().trim().toUpperCase(),
    resource_issuer: $("#buy-page").find("#resource-issuer").val().trim(),
    resource_current_owner: $("#buy-page").find("#resource-current-owner").val().trim(),
    resource_new_owner: variable.username
  }
  if((resource.resource_id.length<3) ||  resource.resource_issuer.length<3 
    || (resource.resource_current_owner.length<3) || (!resource.resource_id.match(/^[0-9]+$/)) ){

    $("#error_message_transaction").show()
    $("#error_message_transaction").text("Les données saisies sont invalides. Veuillez respecter les règles suivantes :"
       + "\n Aucun champ texte ne doit être vide \n Chaque champ texte ne doit avoir une taille inférieure à 3. "
       + "\n L'ID ne doit contenir que des caractères numériques [0-9]. ");
    $("#transaction-loader").hide()
    return false
  
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

$("#submit-buy-transaction").on("click", buyRights);

readAll = (param) => {

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
        render_table(data, param);
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
    resource_id: $("#redeem-page").find("#resource-id").val().trim().toUpperCase(),
    resource_issuer: $("#redeem-page").find("#resource-issuer").val().trim().toUpperCase()
  }

  if((resource.resource_id.length<3) ||  resource.resource_issuer.length<3 || (!resource.resource_id.match(/^[0-9]+$/)) ){


  $("#error_message_transaction").show()
  $("#error_message_transaction").text("Les données saisies sont invalides. Veuillez respecter les règles suivantes :"
     + "\n Aucun champ texte ne doit être vide \n Chaque champ texte ne doit avoir une taille inférieure à 3"
     + "\n L'ID ne doit contenir que des caractères numériques [0-9]");
  $("#transaction-loader").hide()
  return false

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

$("#submit-redeem-transaction").on("click", redeemRights);

function search(ele) {
  if(event.key === 'Enter') {
      console.log(ele.value); 
      event.preventDefault();
      $(".metadata-message").hide()
      $(".transaction-content").hide();
      $("#transaction-loader").show();
      //$("#read-page").show();
      $("#mytable").empty();
      query_ledger(ele.value);
      $("#read-page").show(); 
        
 }
}

query_ledger = (param) => {

  params = {"resourceTitle":param}
    
  $.ajax({
    url: "http://localhost:3000/users/search",
    type: "POST",
    data: JSON.stringify(params),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function (xhr, data) {
      console.log("COUCOU JENVOIE DES TRUCS POUR TOI")
      console.log(data)
    },
    complete: function (xhr, data) {
      console.log("Sended")
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
        render_table(data,0);
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


render_table = (data, param) => {

  let listDiv = $('#mytable')
  data.data.forEach(value => {
    console.log(value.Record)
    let div = listDiv.append("<tr>")
    let etat
    if (value.Record.currentState === 1) {
      etat = "ouvert"
    }
    if (value.Record.currentState === 2) {
      etat = "en exploitation"
    }
    if (value.Record.currentState === 3) {
      etat = "exploitation terminée"
    }
    if (param === 0) {
      let row = "<td>" + value.Record.resourceID.toString() + '</td>"+"<td>' + value.Record.resourceTitle.toString() + '</td>"+"<td>' + value.Record.resourceDescription.toString() + '</td>"+"<td>' + value.Record.owner.toString() + '</td>"+"<td>' + value.Record.resourceValue.toString() + '</td>"+"<td>' + value.Record.issuer.toString() + '</td>"+"<td>' + value.Record.issueDateTime.toString() + '</td>"+"<td>' + value.Record.maturityDateTime.toString() + '</td>' + '</td>"+"<td>' + etat + '</td>'
      div.append(row);
    }
    if (param === 1) {
      if (value.Record.currentState === 1) {
        let row = "<td>" + value.Record.resourceID.toString() + '</td>"+"<td>' + value.Record.resourceTitle.toString() + '</td>"+"<td>' + value.Record.resourceDescription.toString() + '</td>"+"<td>' + value.Record.owner.toString() + '</td>"+"<td>' + value.Record.resourceValue.toString() + '</td>"+"<td>' + value.Record.issuer.toString() + '</td>"+"<td>' + value.Record.issueDateTime.toString() + '</td>"+"<td>' + value.Record.maturityDateTime.toString() + '</td>' + '</td>"+"<td>' + etat + '</td>'
        div.append(row);
      }
    }
    if (param === 2) {
      let variable = JSON.parse(window.localStorage.getItem("bib_block_values"))
      if (value.Record.owner === variable.username) {
        let row = "<td>" + value.Record.resourceID.toString() + '</td>"+"<td>' + value.Record.resourceTitle.toString() + '</td>"+"<td>' + value.Record.resourceDescription.toString() + '</td>"+"<td>' + value.Record.owner.toString() + '</td>"+"<td>' + value.Record.resourceValue.toString() + '</td>"+"<td>' + value.Record.issuer.toString() + '</td>"+"<td>' + value.Record.issueDateTime.toString() + '</td>"+"<td>' + value.Record.maturityDateTime.toString() + '</td>' + '</td>"+"<td>' + etat + '</td>'
        div.append(row);
      }
    }
  });
};


let user_session = JSON.parse(window.localStorage.getItem("bib_block_values"))
if(user_session){
  $("#biblock-active-user").text(user_session.username)
}