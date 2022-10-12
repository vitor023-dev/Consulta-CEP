//jquery wrapper - codigo de embrulho - empacotar o código = jquery(function(){});

jQuery(function(){
    //ações
    var onlyNumbers = function(e){
        // console.log(e.target.value); Captar o que está sendo digitado dentro do campo
        // console.log(this.value); this aponta para o objeto execução em questão substituindo o e.target
        // console.log(this.value.replace(/\D/g, "")); \D tudo que não é numero, g global para pegar todos os números
        this.value = this.value.replace(/\D/g, "");
    }
    
    var validateEntry = function(){
        var cep = this.value; //valor digitado vai ao cep
        console.log(cep);

        if(cep.length === 8){
            $(this).removeClass("error");
            getAddress(cep);
        } else {
            $(this).addClass("error");
        }
    }

    var getAddress = function(cep){
        $.ajax({
            url:"https://viacep.com.br/ws/"+cep+"/json/",
            dataType:"json",
            error:getAddressError,
            success:getAddressSuccess
        });
    }

    var getAddressError = function(){
        console.error("Falhou!");
    }

    var getAddressSuccess = function(data){
        $("#logradouro").val(data.logradouro);
        $("#bairro").val(data.bairro);
        $("#cidade").val(data.localidade);
        $("#estado").val(data.uf);
    }

    //eventos
    $("#cep")
    .on("input", onlyNumbers) //input é um evento de dígito (ao digitar)
    .on("focusout", validateEntry);
    //.on para adicionar um evento



});