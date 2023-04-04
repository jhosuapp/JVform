const generatePassword = ()=> {
    //LETRAS, NÚMEROS Y CARACTERES ESPECIALES
    const letters = "aAbBcCDdEeFfGgHhIiJjKkLlMmNnÑñOoPpQqRrSsTtUuVvWwXxYyZz"
    const numbers = "0123456789";
    const especialCharacters= "!@#$%^&*()<>?{}[]"; 
    //INIZIALIZAMOS VARIABLE PASSWORD Y LE ASIGNAMOS UN VALOR AELATORIO EN CADA CICLO
    let password = "";
    for (let i = 0; i < 7; i++) {
        password += letters.charAt(Math.floor(Math.random() * letters.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += especialCharacters.charAt(Math.floor(Math.random() * especialCharacters.length));
    }
    //RETORNAMOS LA CONTRASEÑA GENERADA
    return password;
}
  

export { generatePassword }