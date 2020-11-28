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
    url: "http://localhost:3000/autentification/",
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
      if ( console && console.log ) {
        console.log("IM BAAAAAAAAACK")
        console.log( "IM BACK", data );
        console( data );
      }
    })  
  .fail(function(ex) {
    console.log(ex);
  });
};

$('#signIn').on('click',Try_authentification)

