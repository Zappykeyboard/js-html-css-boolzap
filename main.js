$(document).ready(function () {

  //pulisco gli input nei campi di testo
  $("input").val("");

  //messaggio iniziale
  //reply();

  //qui vengono conservate le varie chat
  var chatStore = {};

  displayChat("user-1");



  //funzione per mostrare la chat del contatto rilevante
  function displayChat(id) {
    console.log("displayChat con id " + id, chatStore.id);

    //imposto icona utente e nome utente in alto

    //prelevo l'icona
    var iconPath = $("#" + id).find("img").attr("src");

    //imposto l'icona
    $("#contact-info").find("img").attr("src", iconPath);

    //prelevo il nome del contatto
    var contactName = $("#" + id).find(".name").text();

    //imposto il nome del contatto
    $("#contact-info").find(".name").text(contactName);

    //TODO: inserisci chat nella chat-area
    if (chatStore.id) {
      $("#chat-area").replaceWith(chatStore.id);
      console.log(true)
    } else {
      reply();
      console.log(false)
    }

  }




  //mostra il messaggio dell'utente
  function sendTheText() {

    var input = $("#chat-text-box").val();

    if (input !== "") {
      //clono il template
      var template = $(".message-templates .user-message-body").clone();

      template.find(".the-message").text(input);

      $("#chat-area").append(template);

      $("#chat-text-box").val("");

      //rimetto l'icona microfono microfono
      $("#send-text #send-icon").removeClass("fa-paper-plane").addClass("fa-microphone");

      //dopo un secondo, genero la risposta 
      setTimeout(reply, 1000);
    }
  }

  //mostra la risposta automatica
  function reply() {

    //clono il template
    var template = $(".message-templates .contact-message-body").clone();

    template.find(".the-message").text("Okok");
    $("#chat-area").append(template);
  }

  $("#send-text").click(sendTheText);

  $("#chat-text-box").keyup(function () {
    $("#send-text #send-icon").removeClass("fa-microphone").addClass("fa-paper-plane");

    if (event.which == 13) {
      sendTheText();
    }

  });

  //funzione di ricerca contatti
  $("#contact-search").keyup(function () {

    //il valore dell'input
    var input = $(this).val().toLowerCase();

    //itero i contantti
    $(".contact-box").each(function () {

      //il nome del contatto attuale
      var contactName = $(this).find(".name").text();

      //nascondo solo quelli che non rispondono all'input
      if (contactName.toLowerCase().includes(input)) {
        $(this).show();
      } else {
        $(this).hide();
      }

    });
  });


  //funzione per rendere visibile il menu messaggi
  $("#chat-area").on("click", ".menu-open", function () {
    //rendo visibile il menu
    $(this).next().toggle();
  });

  //funzione per cancellare il messaggio
  $("#chat-area").on("click", ".delete-this", function () {

    //rimuovo il messaggio
    $(this).parentsUntil('#chat-area').remove();
  });

  //funzione per cambiare la chat visualizzata
  $(".contact-box").click(function () {

    //escludo box attivi
    if (!$(this).attr("class").includes("active")) {
      
      //salvo la chat attuale
      var activeChat = $("#chat-area").clone();

      //l'ID del contatto attivo
      var activeID = $(".contact-box.active").attr("id");

      $("#" + activeID).removeClass("active");

      //conservo la chat per poterla recuperare in seguito
      chatStore.activeID = activeChat;

      //rimuovo i messaggi dalla chat attuale
      $("#chat-area").empty();

      //l'ID del contatto cliccato
      var contactID = $(this).attr("id");
      $("#" + contactID).addClass("active")


      //var contactChat = chatStore.contactID;
      console.log(chatStore)

      displayChat(contactID);
    }
  })

});