/* global angular */
'format amd';
/* global define */

(function () {
    'use strict';

    function angularNumbro(angular, numbro) {
        return angular.module('ngNumbro', [])
            .provider('$numbroConfig', function () {
                var formats = {};

                this.setFormat = function (name, format) {
                    formats[name] = format;
                };

                this.setDefaultFormat = function (format) {
                    numbro.defaultFormat(format);
                };

                this.setDefaultCurrencyFormat = function (format) {
                    numbro.defaultCurrencyFormat(format);
                };

                this.setLanguage = function (lang, def) {
                    numbro.language(lang, def);
                };

                this.setCurrentLanguage = function (lang) {
                    numbro.language(lang);
                };

                this.$get = function () {
                    return {
                        customFormat: function (name) {
                            return formats[name] || name;
                        }
                    };
                };
            })
            .filter('numbro', ['$numbroConfig', function ($numbroConfig) {
                return function (input, format) {
                    if (input == null) {
                        return input;
                    }

                    format = $numbroConfig.customFormat(format);

                    return numbro(input).format(format);
                };
            }])
            .filter('numbroCurrency', ['$numbroConfig', function ($numbroConfig) {
                return function (input, format) {
                    if (input == null) {
                        return input;
                    }

                    format = $numbroConfig.customFormat(format);

                    return numbro(input).formatCurrency(format);
                };
            }]);

    }

    if (typeof define === 'function' && define.amd) {
        define(['angular', 'numbro'], angularNumbro);
    } else if (typeof module !== 'undefined' && module && module.exports) {
        angularNumbro(angular, require('numbro'));
        module.exports = 'angularNumbro';
    } else {
        angularNumbro(angular, window.numbro);
    }
})();
