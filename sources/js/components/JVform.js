export const JVform = (clsForm, preventSubmit, functionSubmit)=>{
    //CREAMOS VALIDACIONES CON EXPRESIONES REGULARES
    const RegularExpresions = ()=>{
        return {
            user: /^[a-zA-ZÀ-ÿ\s\.-_@]{3,40}/,
            text: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
            phone: /^(\+)?[\d\s\-\.]{5,30}$/,
            email: /^[\w\d\.\-]+@+[\w\d]+\.+[\w\d\.]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
            message: /.{10,200}/,
            url: /[a-zA-Z0-9_.+-]{0,3}\.[a-zA-Z0-9-]{0,100}\.[a-zA-Z0-9-.]+$/,
        }
    }
    //CREAMOS OBJETO CON LOS TIPOS DE DATA ATRIBUTOS DE LOS INPUTS
    const ObjWithTypeValidations = ()=>{
        return {
            'text': 'text',
            'number': 'number',
            'user': 'user',
            'phone': 'phone',
            'email': 'email',
            'password': 'password',
            'message': 'message',
            'url': 'url',
        }
    }
    //CREAMOS PLANTILLA DEL MENSAJE DE ERROR
    const createTemplateError = (cls)=>{
        cls.forEach((data)=>{
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
                getAtrError ? templateMessage = `<p>${getAtrError}</p>` : templateMessage = `<p>Ingrese ${getName}</p>`;
                createDivForTemplate.innerHTML = templateMessage;
                data.parentNode.append(createDivForTemplate);
            }
        });
    }
    //CONFIGURACION GENERAL DEL FORMULARIO
    const ConfigJVform = ()=>{
        
        //VARIABLES GENERALES
        const getEventSubmit = document.querySelector(`${clsForm}`);
        const getAllInputs = document.querySelectorAll(`${clsForm} input`);
        const getAllTextareas = document.querySelectorAll(`${clsForm} textarea`);

        //CREACIÓN MENSAJE DE ERROR Y LLAMANDO A LA FUNCIÓN CREADA PARA ELLO
        createTemplateError(getAllInputs);                
        createTemplateError(getAllTextareas);

        //-------------------- VALIDACIÓN GENERAL --------------------//
        //CREAMOS UNA VALIDACION QUE SE USARA EN LOS DIFERENTES EVENTOS DEL FORM
        const reUseValidation = ()=>{
            //DESESTRUCTURAMOS EL OBJETO CON LAS EXPRESIONES REGULARES
            const { user, text, phone, email, password, url } = RegularExpresions();
            getAllInputs && getAllInputs.forEach((data)=>{
                //OBTENEMOS LOS ATRIBUTOS DEL INPUT 
                const getAtrTypeValidation = data.dataset.validation;
                const getObjWithTypeValidations = ObjWithTypeValidations();
                const returnTypeValidation = getObjWithTypeValidations[getAtrTypeValidation];
                const getParent = data.closest('.JVform__ctn-input');
                const getAtrExpresion = data.dataset.expresion;
                const atrExpresionTransform = new RegExp(getAtrExpresion);
                //CREAMOS FUNCION PARA VALIDAR EL TIPO DE ATRIBUTO Y AÑADIMOS VALIDACIÓN CON EXPRESIONES REGULARES
                const reUseClsValidation = (typeValidation, exp)=>{
                    if(getAtrExpresion){
                        if(exp.test(data.value)){
                            getParent.classList.add('validateVF');
                            getParent.classList.remove('errorValidateVF');
                        }else{
                            getParent.classList.remove('validateVF');
                        }
                    }else{
                        if(returnTypeValidation == typeValidation){
                            if(exp.test(data.value)){
                                getParent.classList.add('validateVF');
                                getParent.classList.remove('errorValidateVF');
                            }else{ 
                                getParent.classList.remove('validateVF');
                            }
                        }   
                    }
                } 
                //VALIDACION PARA INPUT TEXT
                reUseClsValidation('text', text);
                //VALIDACION PARA NUMERO
                reUseClsValidation('phone', phone);
                //VALIDACION PARA CORREO
                reUseClsValidation('email', email);
                //VALIDACION PARA url
                reUseClsValidation('url', url);
                //VALIDACION PARA EXPRESIONES PERSONALIZADAS
                reUseClsValidation('personality', atrExpresionTransform);

            });
        }
        //----------------FIN VALIDACIÓN GENERAL --------------------//

        //------- MENSAJES DE ERROR PARA INPUTS FOCUSEADOS ---------//
        const reUseValidationMsg = (clsMsg)=>{
            const getParentDataMsg = clsMsg.closest('.JVform__ctn-input');
            getParentDataMsg.classList.contains('validateVF') ? getParentDataMsg.classList.remove('errorValidateVF') : getParentDataMsg.classList.add('errorValidateVF');
        }
        //----- FIN MENSAJES DE ERROR PARA INPUTS FOCUSEADOS -------//

        //------------ VALIDACIÓN PARA TEXTAREA --------------------//
        const reUseValidationTextArea = ()=>{
            //DESESTRUCTURAMOS MENSAJE
            const { message } = RegularExpresions();
            getAllTextareas && getAllTextareas.forEach((data)=>{
                const getParentTextarea = data.closest('.JVform__ctn-input');
                if(message.test(data.value)){
                    getParentTextarea.classList.add('validateVF');
                    getParentTextarea.classList.remove('errorValidateVF');
                }else{
                    getParentTextarea.classList.remove('validateVF');
                }
            });
        }
        //---------------- FIN VALIDACIÓN PARA TEXTAREA ------------//
            
        //---------------- VALIDACIÓN PARA CHECKBOX ---------------//
        getAllInputs && getAllInputs.forEach((data)=>{
            const getDataMandatory = data.dataset.mandatory;
            if(data.type == 'checkbox' || data.type == 'radio'){
                data.addEventListener('change', ()=>{
                    const getParentRadio = data.closest('.JVform__ctn-input');
                    if(getDataMandatory != "false"){
                        data.checked ? getParentRadio.classList.add('validateVF') : getParentRadio.classList.remove('validateVF');
                    }
                });
            }
        });
        //---------------- FIN VALIDACIÓN PARA CHECKBOX ----------//

        //---------------- VALIDACIÓN PARA ARCHIVOS -------------//
        getAllInputs && getAllInputs.forEach((data)=>{
            if(data.type == 'file'){
                data.addEventListener('change', ()=>{
                    const getSizeFile = data.files[0].size;
                    const getNameFile = data.files[0].name;
                    const getAtrLimitSize = parseInt(data.dataset.filesize);
                    const getAtrAllowdedDocs = data.dataset.fileallowed;
                    const getParentFile = data.closest('.JVform__ctn-input');
                    const nameFileToArr = getNameFile.split('.');
                    const getExtensionOfArr = nameFileToArr[nameFileToArr.length - 1].toLowerCase();

                    //VALIDACIÓN PARA CUANDO HAY UN LIMITE DE EXTENSIONES
                    if(getAtrAllowdedDocs){
                        const allowerdDocsToArr = getAtrAllowdedDocs.split(',');
                        if(allowerdDocsToArr.includes(getExtensionOfArr)){
                            getParentFile.classList.add('validateVF');
                        }else{
                            getParentFile.classList.remove('validateVF');
                        }
                    }
                    //VALIDACION PARA CUANDO HAY UN LIMITE DE PESO
                    if(getAtrLimitSize){
                        if(getSizeFile < getAtrLimitSize){
                            getParentFile.classList.add('validateVF');
                        }else{
                            getParentFile.classList.remove('validateVF');
                        }
                    }
                    //VALIDACION PARA CUANDO HAY LIMITE DE PESO Y EXTENSIONES
                    if(getAtrAllowdedDocs && getAtrLimitSize){
                        const allowerdDocsToArrTwo = getAtrAllowdedDocs.split(',');
                        if(allowerdDocsToArrTwo.includes(getExtensionOfArr) && getSizeFile < getAtrLimitSize){
                            getParentFile.classList.add('validateVF');
                        }else{
                            getParentFile.classList.remove('validateVF');
                        }
                    }
                });
            }
        });

        //---------------- FIN VALIDACIÓN PARA ARCHIVOS ---------//

        //---------------- EJECUCIÓN DE EVENTOS -----------------//
        //EJECUCION DE LA VALIDACIÓN GENERAL
        getAllInputs && getAllInputs.forEach((data)=>{
            data.addEventListener('keyup', reUseValidation);
            data.addEventListener('blur', reUseValidation);
            data.addEventListener('blur', ()=>{
                reUseValidationMsg(data);
            });
            data.addEventListener('change', ()=>{
                reUseValidationMsg(data);
            });
        });
        //EJECUCIÓN VALIDACIÓN TEXTAREA
        getAllTextareas && getAllTextareas.forEach((data)=>{
            data.addEventListener('keyup', reUseValidationTextArea);
            data.addEventListener('blur', reUseValidationTextArea);
            data.addEventListener('blur', ()=>{
                reUseValidationMsg(data);
            });
        });
        //---------------- FIN EJECUCIÓN DE EVENTOS -----------------//

        //---------------- ENVÍO DEL FORMULARIO --------------------//
        //VALIDACION DE CONDICIONES EN SUBMIT Y ENVIO DEL FORM
        getEventSubmit.addEventListener('submit', (e)=>{
            const getAllClsValidate = document.querySelectorAll(`${clsForm} .validateVF`);
            const getAllClsInputCtn = document.querySelectorAll(`${clsForm} .JVform__ctn-input`);
            const getMessageError = document.querySelector(`${clsForm} .JVform__error-send`);
            //FUNCIÓN PARA AÑADIR Y QUITAR CLASE QUE VALIDA
            const reUseAssignementCls = (clsValidation)=>{
                clsValidation.forEach((data)=>{
                    const getParentVal = data.closest('.JVform__ctn-input');
                    if(getParentVal.classList.contains('validateVF')){
                        getParentVal && getParentVal.classList.remove('errorValidateVF');
                    }else{
                        getParentVal && getParentVal.classList.add('errorValidateVF');
                    }
                });
            }
            console.log(getAllClsInputCtn.length, getAllClsValidate.length);
            if(getAllClsInputCtn.length == getAllClsValidate.length){

                preventSubmit == true || preventSubmit == 'true' && e.preventDefault();

                //EVENTO SUBMIT PARA ENVÍO DEL FORM AL BACKEND
                functionSubmit();

                getMessageError && getMessageError.classList.remove('active');
            }else{
                //MENSAJE DE ERROR PARA INPUTS
                reUseAssignementCls(getAllInputs);
                //MENSAJE DE ERROR PARA TEXTAREAS
                reUseAssignementCls(getAllTextareas);
                //MENSAJE DE ERROR GENERAL
                getMessageError && getMessageError.classList.add('active');
                if(getMessageError.classList.contains('active')){
                    getMessageError.style.animation = "error-message .5s 1 ease";
                    setTimeout(()=>{
                        getMessageError.style.animation = "nothing";
                    },500);
                }
                //SE PREVIENE EL EVENTO DEL SUBMIT
                e.preventDefault();
            }

        });
        //---------------- FIN DEL ENVIO DEL FORMULARIO --------------------//
    }

    return ConfigJVform();
}