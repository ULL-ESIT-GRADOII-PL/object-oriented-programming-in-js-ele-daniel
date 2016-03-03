(function (exports) {

    function Medida(valor, tipo) {
        this.valor = valor;
        this.tipo  = tipo;
    }

    function Temperatura(valor, tipo) {
        Medida.call(this, valor, tipo);
    }

    Temperatura.prototype = {
        // Se estandariza a celsius
        to_standard_measure : function () {
            throw "Not implemented";
        }
        // Desde la medida estandar
        from_standard_measure : function () {
            throw "Not implemented";
        }
    }

    function Celsius(valor, tipo) {
         Temperatura.call(this, valor, tipo);
    }

    function Fahrenheit(valor, tipo) {
        Temperatura.call(this, valor, tipo);
    }

    function Kelvin(valor, tipo) {
        Temperatura.call(this, valor, tipo);
    }
})(this);
