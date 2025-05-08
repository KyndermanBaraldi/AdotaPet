document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.querySelector('#id_postal_code');

    if (cepInput) {
        cepInput.addEventListener('blur', function () {
            const cep = cepInput.value.replace(/\D/g, '');

            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.querySelector('#id_address_line1').value = data.logradouro || '';
                            document.querySelector('#id_neighborhood').value = data.bairro || '';
                            document.querySelector('#id_city').value = data.localidade || '';
                            document.querySelector('#id_state').value = data.uf || '';
                        } else {
                            alert('CEP não encontrado.');
                        }
                    })
                    .catch(() => alert('Erro ao buscar o endereço.'));
            }
        });
    }
});
