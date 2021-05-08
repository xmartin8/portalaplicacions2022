'use strict';
/* Funcio color background botons*/ 
$("button").on(function() {
    let trPare = $(this).parent().parent()
    let buttons = trPare.find("button").not(":last")
    if($(this).text()=="Mostrar"){
      if($(this).hasClass('collapsed')){
          $(this).removeClass( "active" );
      }else{
          $(this).addClass("active")
      }
    }else{
      buttons.each(function() {
        $( this ).removeClass( "active" );
      })
      if($(this).parent()[0].tagName=="TD"){
        $(this).addClass("active")
      }
    }
});

/*Funcio filtrar taula nom*/
$("#alumne").on("keyup", function() {
  let value = $(this).val().toLowerCase();
  $("#taulaSolicituds tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

/*Funcio filtrar taula grup */ 
$('#filter').on(function() {
  let grup = $(this).val()
  $("#taulaSolicituds tr").filter(function() {
    if(grup =="Tots") return $(this).toggle(true)
    $(this).toggle($(this).attr('grup') == grup )
  });
});

/*Assignar Seminari i actualitzar places*/
const csrf = document.getElementsByName('csrfmiddlewaretoken')

$("button").on(function() {
    let solicitudId= $(this).attr("solicitud-id")
    let usuariId= $(this).attr("usuari-id") 
    let seminariId= $(this).attr("seminari-id") 
    $.ajax({
        type: 'POST',
        url: '/batxilleratProjecte/assignarProjecte/',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'solicitudId':solicitudId,
            'usuariId':usuariId,
            'seminariId':seminariId,
        },
        success: function(response){
          let data= response.data
          $(`button[seminari-id]`).each(function() {
             let button= $(this)
             let seminariId = button.attr("seminari-id")
            $.each( data, function( key, value ) {
              if(value.seminari == seminariId){
                 button.attr('data-bs-content',`Places Disponibles: ${value.num_places}`)
              }
            });
          });
        },
        error: function(error){
            console.log(error)
        }
    })
})