(function(exports) {
    "use strict";


    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
    function Medida(valor,tipo) {
        if (!tipo) {
            var param = XRegExp(""
                                + "(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s* ) # Get number \n"
                                + "((e(?<exponent> [-+]?\\d+)\\s*)?)               # Get Exponent \n"
                                + "(?<measure>     [a-zA-Z]+)                      # Get kind");
            var m = XRegexExp.exec(valor, param);
            this.valor = parseFloat(m.value) * Math.pow(10, parseInt(m.exponent));
            this.tipo  = m.measure;
        }
        else {
            this.valor = valor;
            this.tipo  = tipo;
        }
    }

    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    function Temperatura(valor,tipo) {
        Medida.call(this, valor, tipo);
    }

    function Celsius(valor) {
        Temperatura.call(this, valor, "c");
    }

    Celsius.prototype = {
        toFahrenheit: function(value) {
            return ((this.valor * 9/5)+32);
        }
    }

    function Fahrenheit(valor) {
        Temperatura.call(this, valor, "f");
    }

    Fahrenheit.prototype = {
        toCelsius: function(value) {
            return ((this.valor - 32)*5/9);
        }
    }

    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Fahrenheit = Fahrenheit;

    // Tengo la expresion general parseo un entero en ya sea en notacion
    // cientifica o no
    // y algun tipo de conversion
    // despues tener un array y recorrerlo aplicando el metodo parse measure hasta encontrar uno valido


    // Claro lo de arriba puede ir mal con lo que añadir parsers para las opciones 30f to c, 30f c
    exports.convertir = function() {
        var valor     = document.getElementById('convert').value,
            elemento  = document.getElementById('converted');

        var measures = "((f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)"
            + "|(k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)"
            + "|(c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?))";

        var inputRegex = XRegExp (""
                                  + '^(\\s*)                                         # whitespaces \n'
                                  + '(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s*)  # captures the number   \n'
                                  + '((e(?<exponent> [-+]?\\d+)\\s*)?)               # captures the exponent \n'
                                  + '(?<kind>       ' + measures + ')                # Capture kind of value \n'
                                  + '(\\s*)$                                         # whitespaces \n'
                                  , 'xi');

        valor = XRegExp.exec(valor, inputRegex);

        if (valor) {
            var numero = parseFloat(valor.value), // Int
                tipo   = valor.kind;           // String

            console.log("Valor: " + numero + ", Tipo: " + tipo);

            switch (tipo) {
            case 'c':
                var celsius = new Celsius(numero);
                elemento.innerHTML = celsius.toFahrenheit().toFixed(2) + " Farenheit";
                break;
            case 'f':
                var fahrenheit = new Fahrenheit(numero);
                elemento.innerHTML = fahrenheit.toCelsius().toFixed(2) + " Celsius";
                break;
            // case 'k':
            //     var kelvin = new Kelvin(numero);
            //     elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
            //     break;

            default:
                /* rellene este código */
            }
        }
        else
            elemento.innerHTML = "";
    };
})(this);
