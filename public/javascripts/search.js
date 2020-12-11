

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


render_table=(data)=> {

  let listDiv = $('#mytable')
  data.data.forEach(value => {
    console.log(value.Record)
    let div = listDiv.append("<tr>")
    let etat 
    if (value.Record.currentState===1){
        etat = "ouvert"
    }
    if (value.Record.currentState===2){
        etat = "droits détenus par une librairie"
    }
    if (value.Record.currentState===3) {
        etat = "rétrocédés à la maison d'édition"
    }
    let row ="<td>"+value.Record.resourceID.toString()+'</td>"+"<td>'+value.Record.resourceTitle.toString()+'</td>"+"<td>'+value.Record.resourceDescription.toString()+'</td>"+"<td>'+value.Record.owner.toString()+'</td>"+"<td>'+value.Record.resourceValue.toString()+'</td>"+"<td>'+value.Record.issuer.toString()+'</td>"+"<td>'+value.Record.issueDateTime.toString()+'</td>"+"<td>'+value.Record.maturityDateTime.toString()+'</td>'+'</td>"+"<td>'+etat+'</td>'
    div.append(row); 
    });
};

  
