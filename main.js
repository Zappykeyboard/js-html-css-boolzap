$(document).ready(function(){



  function sendTheText(){

    var input = $("#chat-text-box").val();
    console.log(input);
    if (input !== ""){
      var template = $(".user-message .user-message-body").clone();

      template.text(input);

      $("#chat-area").append(template);

      $("#chat-text-box").val("");

      $("#send-text i").removeClass("fa-paper-plane").addClass("fa-microphone");
    }
  }

  $("#send-text").click(sendTheText);

  $("#chat-text-box").keypress(function(){

    if ( event.which == 13 ) {
      sendTheText();
    }

    $("#send-text i").removeClass("fa-microphone").addClass("fa-paper-plane");
  });

});