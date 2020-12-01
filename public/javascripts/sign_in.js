console.log('Client-side code running');

/*const button = document.getElementsByClassName('check');
button[0].addEventListener('click', function(e) {
  console.log('button was clicked');
});*/



Try_authentification = (e) => {

  e.preventDefault();
  const ID = { 
    userName: $("#inputEmail").val(),
    userPass: $("#inputPassword").val(), 
   }
  
  console.log(ID)
  $.ajax({
    url: "http://localhost:3000/users/authentication/",
    type : "POST",
    data: JSON.stringify(ID),
    contentType: "application/json; charset=utf-8",
    dataType : "json",
    beforeSend: function( xhr,data ) {
      //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
      console.log("COUCOU MON ID ")
      console.log(data)
    }
  })
    .done(function(data) {

        if (data.error_message){
          $("#error_message_login").show()
          $("#error_message_login").text(data.error_message)
        }
        else{
          console.log(data)
          if (data.username && data.role){

            localStorage.setItem("bib_block_values",{"username":data.username,"role":data.role})
            console.log(localStorage.getItem("bib_block_values"))
          }
        }

    })  
    .fail(function(ex) {
      $("#error_message_login").show()
      $("#error_message_login").text("Une erreur s'est produite. Veuillez contacter les étudiants de l'ensimag qui ont développé le projet")
      console.log(ex)
    });
};

$('#signIn').on('click',Try_authentification)

