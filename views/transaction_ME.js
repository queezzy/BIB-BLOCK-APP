
const data = '[{ "username": "Bibliotheque_1","password": "eadb8d9d79e3fe767600efd8918ef8b9"},{"username": "Bibliotheque_2","password": "3d805f42ef6e78e3cd28cd74a6102e62"},{"username": "Maison_Edition","password": "e1e7afe991a320fda97f0591c2e4ef0d"}]'

Make_list = (data) => {
  var listDiv = document.getElementById('table');
  var tread=document.createElement('tread');
  var tr = document.createElement('tr');

  listDiv.appendChild(tread).appendChild(tr);
  for (var i = 0; i < data.list.length; ++i) {
    var th = document.createElement('th');
    var textnode = document.createTextNode(data[i]);    
    th.appendChild(textnode);                               
}
}


function myFunction(event) {
  event.preventDefault();
  var block_read = document.getElementById("Readpage");
  var block_submit = document.getElementById("submitPage");
  console.log(event.target)
  selected = event.target.id
  
  if (selected === "read") {
    block_read.style.display = "inline";
    block_submit.style.display ="none";
  } else {
    block_read.style.display = "none";
    block_submit.style.display ="inline";
  }
} 




$('#READ').on("click",myFunction)
$('#ADD').on("click",myFunction)