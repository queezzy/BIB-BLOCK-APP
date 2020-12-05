
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
  
})