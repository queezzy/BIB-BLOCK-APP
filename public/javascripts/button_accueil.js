console.log('Good page');

const button_1 = document.getElementsByClassName('identification_btn_1');
button_1[0].addEventListener('click', function(e) {
  console.log('button 1 was clicked');
});


const button_2 = document.getElementsByClassName('identification_btn_2');
button_2[0].addEventListener('click', function(e) {
  console.log('button 2 was clicked');
});

const button_3 = document.getElementsByClassName('identification_btn_3');
button_3[0].addEventListener('click', function(e) {
  console.log('button 3 was clicked');
});



Get_to_identification = (e) => {
  e.preventDefault();
  $.ajax({
    url: "http://localhost:3000/sign_in",
    type : "GET",
    success: function(data, textStatus, XMLHttpRequest){
      console.log('Error: ' + textStatus);
    },
    error:function(xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(xhr.statusText);
      alert(xhr.responseText);
  }
  });
  
}


$('#identification_btn_1').on('click',Get_to_identification)
$('#identification_btn_2').on('click',Get_to_identification)
$('#identification_btn_3').on('click',Get_to_identification)