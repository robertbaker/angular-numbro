window.require.define({"angular-numbro": function(exports, require, module) {
/**
 * AngularJS filter for Numbro.js: number formatting as a filter
 * @version v1.5.1 - 2015-09-21
 * @link https://github.com/robertbaker/angular-numbro
 * @author Robert Baker <se7enalive@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* global numbro */
(function() {
    'use strict';

    angular.module('ngNumbro', [])
        .provider('$numbroConfig', function() {
            var formats = {};

            this.setFormat = function(name, format) {
                formats[name] = format;
            };

            this.setDefaultFormat = function(format) {
                numbro.defaultFormat(format);
            };

            this.setDefaultCurrencyFormat = function(format) {
                numbro.defaultCurrencyFormat(format);
            };

            this.setLanguage = function(lang, def) {
                numbro.language(lang, def);
            };

            this.setCurrentLanguage = function(lang) {
                numbro.language(lang);
            };

            this.$get = function() {
                return {
                    customFormat: function(name) {
                        return formats[name] || name;
                    }
                };
            };
        })
        .filter('numbro', ['$numbroConfig', function($numbroConfig) {
            return function(input, format) {
                if (input == null) {
                    return input;
                }

                format = $numbroConfig.customFormat(format);

                return numbro(input).format(format);
            };
        }])
        .filter('numbroCurrency', ['$numbroConfig', function($numbroConfig) {
            return function(input, format) {
                if (input == null) {
                    return input;
                }

                format = $numbroConfig.customFormat(format);

                return numbro(input).formatCurrency(format);
            };
        }]);
})();
}});

