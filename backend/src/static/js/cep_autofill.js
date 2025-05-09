document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.querySelector("#id_postal_code");

    if (cepInput) {
        cepInput.addEventListener("blur", function () {
            const cep = cepInput.value.replace(/\D/g, "");
            if (cep.length !== 8) return;

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.erro) return;

                    const addressField = document.querySelector("#id_address_line1");
                    const neighborhoodField = document.querySelector("#id_neighborhood");
                    const cityField = document.querySelector("#id_city");
                    const stateField = document.querySelector("#id_state");
                    const numberField = document.querySelector("#id_address_number");

                    if (addressField) addressField.value = data.logradouro || "";
                    if (neighborhoodField) neighborhoodField.value = data.bairro || "";
                    if (cityField) cityField.value = data.localidade || "";
                    if (stateField) stateField.value = data.uf || "";

                    // Move o foco para o campo de número
                    if (numberField) numberField.focus();
                })
                .catch((error) => {
                    console.error("Erro ao buscar o CEP:", error);
                });
        });
    }
});

