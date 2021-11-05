

$(document).ready(function(){
    $(document).on("click", "#imagePreview", function(){
        $("#input_imagen").click();
    });

    function filePreview(input){
        if(input.files && input.files[0]){
            var reader = new FileReader();

            reader.onload = function(e){
                $('#imagePreview').html("<img src='"+e.target.result+"'/>"); 
            }

            reader.readAsDataURL(input.files[0]);

            }

        }

        $('#input_imagen').change(function(){

        filePreview(this); 

    });

});





/*$(document).on("change", "#input_imagen", function () {
    
        console.log(this.files);
        var files = this.files;
        var element;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        var seEncontraronElementoNoValidos = false;

        for (var i = 0; i < files.length; i++) {
            element = files[i];
            
            if (supportedImages.indexOf(element.type) != -1) {
                createPreview(element);
            }
            else {
                seEncontraronElementoNoValidos = true;
            }
        }


function createPreview(file) {
    var imgCodified = URL.createObjectURL(file);
    var rand = getRandomString(5);
    var name = file.name;
    var img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"> <input type="hidden" name="photo-' + rand + '" value="' + name + '"> <div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    $(img).insertBefore(".ingresar_imagen");
}*/