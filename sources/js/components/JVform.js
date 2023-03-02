export const JVform = (clsForm)=>{
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
            const createDivForTemplate = document.createElement('div');
            createDivForTemplate.classList.add('JVform__error-message');
            const getAtrError = data.dataset.error;
            const getName = data.name;
            let templateMessage;
            getAtrError ? templateMessage = `<p>${getAtrError}</p>` : templateMessage = `<p>Ingrese ${getName}</p>`;
            createDivForTemplate.innerHTML = templateMessage;
            data.parentNode.append(createDivForTemplate);
        });
    }
    //CONFIGURACION GENERAL DEL FORMULARIO
    const ConfigJVform = ()=>{
        
        //VARIABLES GENERALES
        const getEventSubmit = document.querySelector(`${clsForm}`);
        const getAllInputs = document.querySelectorAll(`${clsForm} input`);
        const getAllTextareas = document.querySelectorAll(`${clsForm} textarea`);

        //CREACIÓN MENSAJE DE ERROR LLAMANDO A LA FUNCIÓN CREADA PARA ELLO
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
                //VALIDAMOS EL TIPO DE ATRIUBTO Y AÑADIMOS VALIDACIÓN CON EXPRESIONES REGULARES

                const getParent = data.closest('.JVform__ctn-input');

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

        //---------------- EJECUCIÓN DE EVENTOS -----------------//
        //EJECUCION DE LA VALIDACIÓN GENERAL
        getAllInputs && getAllInputs.forEach((data)=>{
            data.addEventListener('keyup', reUseValidation);
            data.addEventListener('blur', reUseValidation);
        });
        //EJECICIÓN VALIDACIÓN TEXTAREA
        getAllTextareas && getAllTextareas.forEach((data)=>{
            data.addEventListener('keyup', reUseValidationTextArea);
            data.addEventListener('blur', reUseValidationTextArea);
        });
        //---------------- FIN EJECUCIÓN DE EVENTOS -----------------//

        //---------------- ENVÍO DEL FORMULARIO --------------------//
        //VALIDACION DE CONDICIONES EN SUBMIT Y ENVIO DEL FORM
        getEventSubmit.addEventListener('submit', (e)=>{
            e.preventDefault();

            const getAllClsValidate = document.querySelectorAll(`${clsForm} .validateVF`);
            const getAllClsInputCtn = document.querySelectorAll(`${clsForm} .JVform__ctn-input`);
            const getMessageError = document.querySelector(`${clsForm} .JVform__error-send`);
            //FUNCIÓN PARA AÑADIR Y QUITAR CLASE QUE VALIDA
            const reUseAssignementCls = (clsValidation)=>{
                clsValidation.forEach((data)=>{
                    const getParentVal = data.parentNode;
                    if(getParentVal.classList.contains('validateVF')){
                        getParentVal.querySelector('.JVform__error-message').classList.remove('active');
                    }else{
                        getParentVal.querySelector('.JVform__error-message').classList.add('active');
                    }
                });
            }
            console.log(getAllClsInputCtn.length, getAllClsValidate.length);
            if(getAllClsInputCtn.length == getAllClsValidate.length){
                console.log('enviado');
                getMessageError.classList.remove('active');
            }else{
                //MENSAJE DE ERROR PARA INPUTS
                reUseAssignementCls(getAllInputs);
                //MENSAJE DE ERROR PARA TEXTAREAS
                reUseAssignementCls(getAllTextareas);
                //MENSAJE DE ERROR GENERAL
                getMessageError.classList.add('active');
            }

        });
        //---------------- FIN DEL ENVIO DEL FORMULARIO --------------------//
    }

    return ConfigJVform();
}