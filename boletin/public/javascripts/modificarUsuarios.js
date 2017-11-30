function alerta(){
  var respuesta = confirm("Estas seguro de borrar a este usuario?");
  if(respuesta){
    alert("Usuario borrado.");
  }
}

$(document).ready(function(){

    $('.btn_eliminar').click(function(e){
        e.preventDefault();
        if(confirm("Estas seguro de borrar al usuario?"))
        {
          var elemento = $(this);
          var id = elemento.parent().parent().find('.nombreUsuario').attr('id');

        console.log(id);
          $.ajax({
              url : 'http://localhost:3000/eliminar_usuario',
              method : 'post',
              data : {id : id},
              success : function(res){
                  if(res.res){

                      // accesa al tr y lo elimina
                      elemento.parent().parent().remove();
                  }
              }
          });
        }
    });

    $('.editar_usuario').click(function(){
        var id = $(this).attr('id');

        $('#modal'+id).modal('show');
    });

    $('.btn_cerrar_modal').click(function(){
        var id = $(this).attr('id');
        $('#modal'+id).modal('hide');
    })

    // funcion para editar usuario
    $('.enviarCambiosUsuario').click(function(e){
        e.preventDefault();
        if(confirm("Estas seguro de enviar los cambios?"))
        {
          // obtener el tipo de usuario con el atributo id del radio button
          var tipoChecado = $("input:checked").attr('id');
          var id = $(this).attr('id');
          
          console.log(tipoChecado);
          
          console.log(id);

          $.post('http://localhost:3000/modificar_usuarios', {id : id, tipoChecado : tipoChecado });
        }
    });
});