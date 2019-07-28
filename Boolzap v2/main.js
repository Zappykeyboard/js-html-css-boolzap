$(document).ready(function () {

  //i contatti disponibili
  var contatti = [
    {
      ID: 1,
      name: "Marco D.",
      icon: "img/avatar_1.jpg"
    },
    {
      ID: 2,
      name: "Michele",
      icon: "img/avatar_2.jpg"
    },
    {
      ID: 3,
      name: "Fabio",
      icon: "img/avatar_3.jpg"
    },
    {
      ID: 4,
      name: "Samuele",
      icon: "img/avatar_4.jpg"
    },
    {
      ID: 5,
      name: "Alessandro B.",
      icon: "img/avatar_5.jpg"
    },
    {
      ID: 6,
      name: "Alessandra L.",
      icon: "img/avatar_6.jpg"
    },
    {
      ID: 7,
      name: "Marco D.",
      icon: "img/avatar_7.jpg"
    },
    {
      ID: 8,
      name: "Davide",
      icon: "img/avatar_8.jpg"
    }
  ];

  //le chat degli utenti
  var chatStore = {};

  //template per i contatti
  var hContactsSource = $("#contact-template").html();
  var hContactTemplate = Handlebars.compile(hContactsSource);

  //template per i messaggi
  var hMessageSource = $("#message-template").html();
  var hMessageTemplate = Handlebars.compile(hMessageSource)

  //selettore area chat 
  var chatArea = $("#chat-area");
  //l'html interno delle chat
  var chatContent = chatArea.html();

  //Selettore box testo chat
  var chatTextBox = $("#chat-text-box");

  //selettori placeholder
  var myPlaceholder = $(".placeholder.right span");
  var contactPlaceHolder = $(".placeholder.left span");

  //pulisco gli input nei campi di testo
  $("input").val("");


  //inserisco i contatti in lista
  populateContactList();

  function populateContactList() {
    var context;

    for (var i = 0; i < contatti.length; i++) {
      context = {
        userID: contatti[i].ID,
        icon: contatti[i].icon,
        userName: contatti[i].name
      }

      $("#contact-list").append(hContactTemplate(context));

    }
  }


  //aggiungo la classe active al primo contatto in lista
  $("#contact-list .contact-box:nth-child(2)").addClass("active");

  //chiamo la funzione displayChat usando il primo contatto come parametro
  displayChat($(".contact-box.active").attr("contactID"));

  //imposto nome,icona e chat nello spazio in alto
  function displayChat(id) {


    //vuoto la chat attuale 
    chatArea.empty();

    var contactSelector = $("[contactID=" + id + "]");

    updateLastAccess("Mai");

    //prelevo l'icona
    var iconPath = contactSelector.find("img").attr("src");

    //imposto l'icona
    $("#contact-info").find("img").attr("src", iconPath);

    //prelevo il nome del contatto
    var contactName = contactSelector.find(".name").text();

    //imposto il nome del contatto
    $("#contact-info").find(".name").text(contactName);

    //inserisci chat nella chat-area
    if (chatStore[id] !== undefined) {
      //aggiungo la chat salvata nella finestra
      chatArea.append(chatStore[id]);

      lastMessageTime = chatArea.find(".contact:last .message-time").text();
      updateLastAccess(lastMessageTime);

    } else if (chatArea.html() === "") {
      console.log("HELlo")
      updateLastAccess("Mai");
    }
  }

  function sendTheText(text) {

    if (text) {
      //inserico i dati per il template
      var context = {
        theMessage: text,
        messageTime: getTimeString(),
        messageOwner: "user",
      };

      //appendo il messaggio...
      chatArea.append(hMessageTemplate(context));
      //...e lo rendo visibile
      $("#chat-area .message-body").removeClass("hide");

      reply();
    }
  }

  //ottengo data e ora come stringa hh:mm yyy/mm/dd
  function getTimeString() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var timeString = "" + hours;

    if (minutes < 10) {
      timeString += ":0" + minutes;
    } else {
      timeString += ":" + minutes;
    }

    timeString += "-" + year + "/" + (month + 1) + "/" + day;

    return timeString;
  }

  function reply() {

    var sender = $(".contact-box.active .name").text();

    var context = {
      theMessage: "Beep-boop, handlebars!",
      messageTime: getTimeString(),
      messageOwner: "contact",
      placeholder: sender + " sta scrivendo…",
    }

    contactPlaceHolder.text(sender + " sta scrivendo…");

    updateLastAccess(getTimeString());
    
    setTimeout(function () {
      //appendo il messaggio...
      chatArea.append(hMessageTemplate(context));
      //...e lo rendo visibile
      $("#chat-area .message-body").removeClass("hide");

      contactPlaceHolder.text("");
    }, 2000);


  }

  function updateLastAccess(timeString) {
    //aggiorno l'ultimo accesso
    $(".last-access span").text(timeString);
  }

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

  //funzioni per cambiare icona del microfono e mostrare il placeholder
  chatTextBox.on("focus", function () {
    $("#send-text #send-icon").removeClass("fa-microphone").addClass("fa-paper-plane");
    myPlaceholder.show();
  });
  chatTextBox.on("focusout", function () {
    $("#send-text #send-icon").addClass("fa-microphone").removeClass("fa-paper-plane");
    myPlaceholder.hide();
  });

  //funzione del box di invio messaggi
  chatTextBox.keyup(function () {

    if ($(this).val()) {
      $("#send-text #send-icon").removeClass("fa-microphone").addClass("fa-paper-plane");
      myPlaceholder.show();
    } else {
      myPlaceholder.hide();
      $("#send-text #send-icon").removeClass("fa-paper-plane").addClass("fa-microphone");

    }

    if (event.which == 13) {

      //rimuovo il placehoder 
      myPlaceholder.hide();


      sendTheText($(this).val());

      //cancello il contenuto del campo
      $(this).val("");

      //rimetto l'icona microfono
      $("#send-text #send-icon").removeClass("fa-paper-plane").addClass("fa-microphone");

    }

  });

  //al click, manda il messaggio
  $("#send-text").click(function () {
    if (chatTextBox.val()) {
      sendTheText(chatTextBox.val());
      //cancello il contenuto del campo
      $(this).val("");

      $("#send-text #send-icon").removeClass("fa-paper-plane").addClass("fa-microphone");
    }
  });


  //funzione per rendere visibile il menu messaggi
  chatArea.on("click", ".menu-open", function () {

    //nascondo momentaneamente l'ora del messaggio
    // $(this).parentsUntil(chatArea).find(".message-time-cont .message-time").toggle();
    console.log($(this).parent().find(".message-menu"))
    //rendo visibile il menu
    $(this).parentsUntil(".message-body").siblings(".message-menu").toggle();


  });

  //funzione per cancellare il messaggio
  chatArea.on("click", ".delete-this", function () {

    //rimuovo il messaggio
    $(this).parentsUntil(chatArea).remove();

  });


  //funzione per passare da una chat all'altra
  $(".contact-box").on("click", function () {
    {

      if ($(this).attr("class").includes("active")) {
        return;
      } else {
        //salvo la chat attuale
        var theChat = chatArea.html();

        var activeID = $(".contact-box.active").attr("contactID");

        chatStore[activeID] = theChat;

        $(".contact-box[contactID='" + activeID + "']").removeClass("active");

        //l'ID del contatto cliccato
        var contactID = $(this).attr("contactID");

        $(".contact-box[contactID='" + contactID + "']").addClass("active");

        displayChat(contactID)
      }

    }
  })
});