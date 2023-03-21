const createTemplateError = (cls)=>{
    cls.forEach((data)=>{
        //VALIDAMOS SI EL INPUT ES OBLIGATORIO
        const getAtrMandatory = data.dataset.mandatory;
        if(getAtrMandatory == "false"){
            const getParent = data.closest('.JVform__ctn-input');
            getParent && getParent.classList.add('validateVF');
        }else{
            const createDivForTemplate = document.createElement('div');
            createDivForTemplate.classList.add('JVform__error-message');
            const getAtrError = data.dataset.error;
            const getName = data.name;
            let templateMessage;
            //VALIDAMOS SI EXISTE EL ATRIBUTO MANDATORY, SINO LE AÑADIMOS UN MENSAJE POR DEFECTO
            getAtrError ? templateMessage = `<p>${getAtrError}</p>` : templateMessage = `<p>Ingrese ${getName}</p>`;
            createDivForTemplate.innerHTML = templateMessage;
            //CREAMOS EL ELEMENTO HTML DENTRO DEL CONTENEDOR "JVFORM__CTN-INPUT"
            data.parentNode.append(createDivForTemplate);
        }
    });
}

export { createTemplateError }