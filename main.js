$(document).ready(function(){

  //pulisco gli input nei campi di testo
  $("input").val("");

  //mostra il messaggio dell'utente
  function sendTheText(){

    var input = $("#chat-text-box").val();

    if (input !== ""){
      //clono il template
      var template = $(".message-templates .user-message-body").clone();

      template.text(input);

      $("#chat-area").append(template);

      $("#chat-text-box").val("");

      //rimetto l'icona microfono microfono
      $("#send-text #send-icon").removeClass("fa-paper-plane").addClass("fa-microphone");

      //dopo un secondo, genero la risposta 
      setTimeout(reply, 1000);
    }
  }

  //mostra la risposta automatica
  function reply(){

    //clono il template
    var template = $(".message-templates .contact-message-body").clone();

    template.text("Okok");
    $("#chat-area").append(template);
  }

  $("#send-text").click(sendTheText);

  $("#chat-text-box").keyup(function(){
    $("#send-text #send-icon").removeClass("fa-microphone").addClass("fa-paper-plane");

    if ( event.which == 13 ) {
      sendTheText();
    }

  });


  //funzione di ricerca contatti
  $("#contact-search").keyup(function(){

    //il valore dell'input
    var input = $(this).val().toLowerCase();

    $(".contact-box").each(function (){

      //mostro il contatto attuale
      $(this).show();

      //il nome del contatto attuale
      var contactName = $(this).find(".name").text();

      //nascondo solo quelli che non rispondono all'input
      if(!contactName.toLowerCase().includes(input)){
        $(this).hide();
      }

    });
  });

});