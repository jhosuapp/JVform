const generatePassword = ()=> {
    //LETRAS, NÚMEROS Y CARACTERES ESPECIALES
    const lettersLowerCase = "abcdefghijklmnñopqrstuvwxyz";
    const lettersUpperCase = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
    const numbers = "0123456789";
    const especialCharacters= "!@#$%^&*()<>?{}[]"; 
    //INIZIALIZAMOS VARIABLE PASSWORD Y LE ASIGNAMOS UN VALOR AELATORIO EN CADA CICLO
    let password = "";
    for (let i = 0; i < 7; i++) {
        password += lettersLowerCase.charAt(Math.floor(Math.random() * lettersLowerCase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += lettersUpperCase.charAt(Math.floor(Math.random() * lettersUpperCase.length));
        password += especialCharacters.charAt(Math.floor(Math.random() * especialCharacters.length));
    }
    //RETORNAMOS LA CONTRASEÑA GENERADA
    return password;
}
  

export { generatePassword }