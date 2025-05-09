(function($) {
    $(document).ready(function() {
        const $state = $('#id_state');
        const $city = $('#id_city');

        function loadCities(uf, selectedCity = null) {
            if (!uf) {
                $city.empty().append('<option value="">---------</option>');
                return;
            }

            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

            $.get(url, function(data) {
                $city.empty();
                $city.append('<option value="">---------</option>');
                data.forEach(city => {
                    const option = $('<option></option>').val(city.nome).text(city.nome);
                    if (selectedCity && selectedCity === city.nome) {
                        option.attr('selected', 'selected');
                    }
                    $city.append(option);
                });
            });
        }

        const initialUF = $state.val();
        const initialCity = $city.val();

        if (initialUF) {
            loadCities(initialUF, initialCity);
        }

        $state.change(function() {
            const selectedUF = $(this).val();
            loadCities(selectedUF);
        });
    });
})(django.jQuery);

