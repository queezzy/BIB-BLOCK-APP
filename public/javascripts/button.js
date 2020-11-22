console.log('Client-side code running');

/*const button = document.getElementsByClassName('check');
button[0].addEventListener('click', function(e) {
  console.log('button was clicked');
});*/

submitMyIssue = (e) => {

  e.preventDefault();
  const paper = { 
    paperID: $("#paperID").val(),
    paperIssuer: $("#paperIssuer").val(), 
    paperFaceValue: $("#paperFaceValue").val() }

  $.ajax({
    url: "http://localhost:3000/submit/",
    type : "POST",
    data: JSON.stringify(paper),
    contentType: "application/json; charset=utf-8",
    dataType : "json",
    beforeSend: function( xhr,data ) {
      //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
      console.log("COUCOU JENVOIE DES TRUCS POUR TOI")
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

$('#SubmitInfo').on('click',submitMyIssue)

