
const data = '[{ "username": "Bibliotheque_1","password": "eadb8d9d79e3fe767600efd8918ef8b9"},{"username": "Bibliotheque_2","password": "3d805f42ef6e78e3cd28cd74a6102e62"},{"username": "Maison_Edition","password": "e1e7afe991a320fda97f0591c2e4ef0d"}]'


$('#read-all').on("click", (event)=>{
  
  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll(0);
  $("#read-page").show();
  
  
});


$('#read-open').on("click", (event)=>{
  
  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll(1);
  $("#read-page").show();
  
});

$('#read-mine').on("click", (event)=>{
  
  event.preventDefault();
  $(".metadata-message").hide()
  $(".transaction-content").hide();
  $("#transaction-loader").show();
  //$("#read-page").show();
  $("#mytable").empty();
  readAll(2);
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
  
})


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
        render_table(data,param);
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


render_table=(data,param)=> {

  var listDiv = $('#mytable')
  data.data.forEach(value => {
    console.log(value.Record)
    var div = listDiv.append("<tr>")
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
    if (param===0){
      var row ="<td>"+value.Record.resourceID.toString()+'</td>"+"<td>'+value.Record.resourceTitle.toString()+'</td>"+"<td>'+value.Record.resourceDescription.toString()+'</td>"+"<td>'+value.Record.owner.toString()+'</td>"+"<td>'+value.Record.resourceValue.toString()+'</td>"+"<td>'+value.Record.issuer.toString()+'</td>"+"<td>'+value.Record.issueDateTime.toString()+'</td>"+"<td>'+value.Record.maturityDateTime.toString()+'</td>'+'</td>"+"<td>'+etat+'</td>'
      div.append(row); 
    }
    if (param===1){
      if (value.Record.currentState===1){
        var row ="<td>"+value.Record.resourceID.toString()+'</td>"+"<td>'+value.Record.resourceTitle.toString()+'</td>"+"<td>'+value.Record.resourceDescription.toString()+'</td>"+"<td>'+value.Record.owner.toString()+'</td>"+"<td>'+value.Record.resourceValue.toString()+'</td>"+"<td>'+value.Record.issuer.toString()+'</td>"+"<td>'+value.Record.issueDateTime.toString()+'</td>"+"<td>'+value.Record.maturityDateTime.toString()+'</td>'+'</td>"+"<td>'+etat+'</td>'
        div.append(row); 
      }  
    }
    if  (param===2){
      var variable = JSON.parse(window.localStorage.getItem("bib_block_values"))
      if( value.Record.owner===variable.username){
        var row ="<td>"+value.Record.resourceID.toString()+'</td>"+"<td>'+value.Record.resourceTitle.toString()+'</td>"+"<td>'+value.Record.resourceDescription.toString()+'</td>"+"<td>'+value.Record.owner.toString()+'</td>"+"<td>'+value.Record.resourceValue.toString()+'</td>"+"<td>'+value.Record.issuer.toString()+'</td>"+"<td>'+value.Record.issueDateTime.toString()+'</td>"+"<td>'+value.Record.maturityDateTime.toString()+'</td>'+'</td>"+"<td>'+etat+'</td>'
        div.append(row); 
      }
    }
    });
};