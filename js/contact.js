document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registration-form");
  const success = document.querySelector("#success-message");
  const fields = ["fullName","email","phone","participation","country","message"];
  const setError = (input, message) => { input.classList.add("invalid"); input.classList.remove("valid"); input.nextElementSibling.textContent=message; };
  const setValid = input => { input.classList.remove("invalid"); input.classList.add("valid"); input.nextElementSibling.textContent=""; };
  form.addEventListener("submit", e => {
    e.preventDefault(); let valid=true;
    const name=document.querySelector("#fullName"), email=document.querySelector("#email"), phone=document.querySelector("#phone"), participation=document.querySelector("#participation"), country=document.querySelector("#country"), message=document.querySelector("#message");
    if(!name.value.trim()){setError(name,"Le nom est obligatoire.");valid=false}else setValid(name);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){setError(email,"Email invalide.");valid=false}else setValid(email);
    if(phone.value.replace(/\D/g,"").length<8){setError(phone,"Minimum 8 chiffres.");valid=false}else setValid(phone);
    if(!participation.value){setError(participation,"Choisissez une option.");valid=false}else setValid(participation);
    if(!country.value){setError(country,"Choisissez un pays.");valid=false}else setValid(country);
    if(message.value.trim().length<20){setError(message,"Minimum 20 caractères.");valid=false}else setValid(message);
    if(valid){success.textContent="Inscription envoyée avec succès !";success.classList.add("show");form.reset();fields.forEach(id=>document.querySelector("#"+id).classList.remove("valid"));}
  });
});
