document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ftel").addEventListener("input", handlePhone);
});

function validateForm() {
    let fname = document.getElementById("fname").value;
    let femail = document.getElementById("femail").value;
    let ftel = document.getElementById("ftel").value;
    let subject = document.getElementById("subject").value;

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (fname === "" || femail === "" || ftel === "" || subject === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!emailPattern.test(femail)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
    }
}
function handlePhone(event) {
    const input = event.target;
    input.value = phoneMask(input.value);
}
const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}
