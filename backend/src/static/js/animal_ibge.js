(function($) {
    $(document).ready(function() {
        const $state = $('#id_state');
        const $city = $('#id_city');

        function loadCities(uf) {
            if (!uf) {
                $city.html('<option value="">---------</option>');
                return;
            }

            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

            $.getJSON(url, function(data) {
                $city.html('');
                $.each(data, function(index, item) {
                    $city.append($('<option>', {
                        value: item.nome,
                        text: item.nome
                    }));
                });

                // Se o campo já tem valor (em edição), seleciona-o
                const selected = $city.attr("data-selected");
                if (selected) {
                    $city.val(selected);
                }
            });
        }

        $state.change(function() {
            loadCities($(this).val());
        });

        // Se já tem estado (em modo edição), carrega as cidades
        if ($state.val()) {
            loadCities($state.val());
        }
    });
})(django.jQuery);
