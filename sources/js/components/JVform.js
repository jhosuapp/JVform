export const JVform = (clsForm, preventSubmit, functionSubmit)=>{
    //CREAMOS VALIDACIONES CON EXPRESIONES REGULARES
    const RegularExpresions = ()=>{
        return {
            user: /^[a-zA-ZÀ-ÿ\s\.-_@]{3,40}/,
            text: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
            phone: /^(\+)?[\d\s\-\.]{5,30}$/,
            email: /^[\w\d\.\-]+@+[\w\d]+\.+[\w\d\.]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
            message: /.{10,200}/
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
            'message': 'message'
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
            const { user, text, phone, email, password } = RegularExpresions();
            getAllInputs && getAllInputs.forEach((data)=>{
                //OBTENEMOS LOS ATRIBUTOS DEL INPUT 
                const getAtrTypeValidation = data.dataset.validation;
                const getObjWithTypeValidations = ObjWithTypeValidations();
                const returnTypeValidation = getObjWithTypeValidations[getAtrTypeValidation];
                const getParent = data.closest('.JVform__ctn-input');
                //CREAMOS FUNCION PARA VALIDAR EL TIPO DE ATRIBUTO Y AÑADIMOS VALIDACIÓN CON EXPRESIONES REGULARES
                const reUseClsValidation = (typeValidation, exp)=>{
                    if(returnTypeValidation == typeValidation){
                        if(exp.test(data.value)){
                            getParent.classList.add('validateVF');
                        }else{
                            getParent.classList.remove('validateVF');
                        }
                    }   
                } 
                //VALIDACION PARA INPUT TEXT
                reUseClsValidation('text', text);
                //VALIDACION PARA NUMERO
                reUseClsValidation('phone', phone);
                //VALIDACION PARA CORREO
                reUseClsValidation('email', email);
                //VALIDACION PARA CORREO
                reUseClsValidation('email', email);

            });
        }
        //----------------FIN VALIDACIÓN GENERAL --------------------//

        //------------ VALIDACIÓN PARA TEXTAREA --------------------//
        const reUseValidationTextArea = ()=>{
            //DESESTRUCTURAMOS MENSAJE
            const { message } = RegularExpresions();
            getAllTextareas && getAllTextareas.forEach((data)=>{
                const getParentTextarea = data.closest('.JVform__ctn-input');
                if(message.test(data.value)){
                    getParentTextarea.classList.add('validateVF');
                }else{
                    getParentTextarea.classList.remove('validateVF');
                }
            });
        }
        //---------------- FIN VALIDACIÓN PARA TEXTAREA ------------//
            
        //---------------- VALIDACIÓN PARA CHECKBOX ---------------//
        getAllInputs && getAllInputs.forEach((data)=>{
            if(data.type == 'checkbox' || data.type == 'radio'){
                data.addEventListener('change', ()=>{
                    data.checked ? 
                    data.closest('.JVform__ctn-input').classList.add('validateVF') : 
                    data.closest('.JVform__ctn-input').classList.remove('validateVF');
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
        });
        //EJECUCIÓN VALIDACIÓN TEXTAREA
        getAllTextareas && getAllTextareas.forEach((data)=>{
            data.addEventListener('keyup', reUseValidationTextArea);
            data.addEventListener('blur', reUseValidationTextArea);
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
                    const getParentVal = data.parentNode;
                    const getMessageErrorQuery =  getParentVal.querySelector('.JVform__error-message');
                    if(getParentVal.classList.contains('validateVF')){
                        getMessageErrorQuery && getMessageErrorQuery.classList.remove('active');
                    }else{
                        getMessageErrorQuery && getMessageErrorQuery.classList.add('active');
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
                //SE PREVIENE EL EVENTO DEL SUBMIT
                e.preventDefault();
            }

        });
        //---------------- FIN DEL ENVIO DEL FORMULARIO --------------------//
    }

    return ConfigJVform();
}