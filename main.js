$(document).ready(function () {

  //pulisco gli input nei campi di testo
  $("input").val("");


  //qui vengono conservate le varie chat
  var chatStore = {};

  //il template per i messaggi
  var messagesTemplate = $("#chat-area .message-templates").clone();

  //inserisco messaggio nella chat di default
  //displayChat("user-1");



  //funzione per mostrare la chat del contatto rilevante
  function displayChat(id) {
    console.log("displayChat con id " + id, chatStore[id]);


    //imposto icona utente e nome utente in alto

    //prelevo l'icona
    var iconPath = $("#" + id).find("img").attr("src");

    //imposto l'icona
    $("#contact-info").find("img").attr("src", iconPath);

    //prelevo il nome del contatto
    var contactName = $("#" + id).find(".name").text();

    //imposto il nome del contatto
    $("#contact-info").find(".name").text(contactName);



    //inserisci chat nella chat-area
    if (chatStore[id] !== undefined) {

      $("#chat-area").append(chatStore[id].html());

    } else {

      //se non c'è niente nella chat, inseriamo il template e poi inseriamo un messaggio
      if ($("#chat-area").html() === "") {
        $("#chat-area").append(messagesTemplate);
      }
    }

  }


  //al click, manda il messaggio
  $("#send-text").click(sendTheText);

  //mostra il messaggio dell'utente
  function sendTheText() {

    var input = $("#chat-text-box").val();

    if (input !== "") {
      //clono il template
      var template = $(".message-templates .user-message-body").clone();

      template.find(".the-message").text(input);

      //aggiungo l'ora del messaggio
      $(template).find(".message-time").text(getTimeString());

      $("#chat-area").append(template);

      $("#chat-text-box").val("");

      //rimetto l'icona microfono microfono
      $("#send-text #send-icon").removeClass("fa-paper-plane").addClass("fa-microphone");

      //genero la risposta
      reply();
    }
  }



  //risposta automatica
  function reply() {

    //clono il template
    var template = $(".message-templates .contact-message-body").clone();

    //inserisco il placeholder in attesa delal risposta
    var placeHolder = $(".message-templates .placeholder").clone();
    var sender = $(".contact-box.active .name").text();
    placeHolder.text(sender + " sta scrivendo…");
    $("#chat-area").append(placeHolder);

    setTimeout(function () {

      template.find(".the-message").text("BEEP-BOOP");

      //aggiungo l'ora del messaggio
      $(template).find(".message-time").text(getTimeString());

      //aggiorno l'ultimo accesso
      $(".last-access span").text(getTimeString());

      //rimuovo il placehoder
      $("#chat-area > .placeholder").remove();

      //inserisco il messaggio vero e proprio
      $("#chat-area").append(template);
    }, 3000)

  }



  //funzioni per cambiare icona accanto al box di testo
  $("#chat-text-box").on("focus", function () {
    $("#send-text #send-icon").removeClass("fa-microphone").addClass("fa-paper-plane");
  });

  $("#chat-text-box").on("focusout", function () {
    $("#send-text #send-icon").addClass("fa-microphone").removeClass("fa-paper-plane");
  });


  //funzione per mandare un messaggio
  $("#chat-text-box").keyup(function () {

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

    //nascondo momentaneamente l'ora del messaggio
    $(this).parentsUntil("#chat-area").find(".message-time-cont .message-time").toggle();

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

      //cambio il colore del box contatto 
      $("#" + activeID).removeClass("active");

      //conservo la chat per poterla recuperare in seguito
      chatStore[activeID] = activeChat;

      //rimuovo i messaggi dalla chat attuale
      $("#chat-area").empty();

      //l'ID del contatto cliccato
      var contactID = $(this).attr("id");

      //cambio il colore del box contatto 
      $("#" + contactID).addClass("active")

      //mostro la chat rilevante
      displayChat(contactID);
    }
  })


  function getTimeString() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();

    var timeString = "" + hours;

    if (minutes < 10) {
      timeString += ":0" + minutes;
    } else {
      timeString += ":" + minutes;
    }

    timeString += "-" + year + "/" + month + "/" + day;

    return timeString;
  }

});