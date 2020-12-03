
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


$('#READ').on("click", (event)=>{
  
  event.preventDefault();
  $("#read-page").show();
  $("#submit-page").hide();
  
});

$('#ADD').on("click", (event)=>{
  
  event.preventDefault();
  $("#read-page").hide();
  $("#submit-page").show();
  
});

$('#sign-out').on("click",(event)=>{

  localStorage.clear();
  window.location.href = "/logout"
})