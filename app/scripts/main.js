angular.module("DemoApp", ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        views: {
            "main": {
                templateUrl: 'partials/main.html'
            }
        }
    }).state('docs', {
        url: '/docs',
        views: {
            "main": {
                templateUrl: 'partials/docs.html'
            }
        }
    });
}).value("presets", {
    "default": {
        'thumb-color': {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        },
        'track-color': {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        },
        'thumb-border-color': {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        },
        'thumb-roundness': 50,
        'thumb-height': 16,
        'thumb-shadow-size': 1,
        'thumb-width': 16,
        'thumb-shadow-color': {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        },
        'thumb-shadow-blur': 1,
        'thumb-border-width': 1,
        'track-shadow-size': 1,
        'track-shadow-blur': 1,
        'track-border-width': 1,
        'track-height': 5,
        'track-radius': 5,
        'track-border-color': {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        },
        'track-shadow-color': {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        },
        'contrast': 5,
        'namespace': 'slider'
    }
}).directive("colorPicker", function () {
    return {
        restrict: "AE",
        templateUrl: 'partials/color-picker.html',
        scope: {
            color: "="
        }
    };
}).run(function ($rootScope, presets) {
    $rootScope.presets = presets;

    $rootScope.$watch('slider', function (slider, old) {
        var lessVals = angular.copy(slider);

        function toRGBA(rgbObject) {
            return "rgba(" + rgbObject.r + "," + rgbObject.g + "," + rgbObject.b + "," + rgbObject.a + ")";
        }

        lessVals['thumb-color'] = toRGBA(lessVals['thumb-color']);
        lessVals['thumb-border-color'] = toRGBA(lessVals['thumb-border-color']);
        lessVals['thumb-shadow-color'] = toRGBA(lessVals['thumb-shadow-color']);

        lessVals['track-color'] = toRGBA(lessVals['track-color']);
        lessVals['track-border-color'] = toRGBA(lessVals['track-border-color']);
        lessVals['track-shadow-color'] = toRGBA(lessVals['track-shadow-color']);

        console.log("Slider...", slider, lessVals);

        lessVals['track-radius'] += "px";
        lessVals['track-shadow-size'] += "px";
        lessVals['track-shadow-blur'] += "px";
        lessVals['track-height'] += "px";
        lessVals['track-border-width'] += "px";

        lessVals['thumb-shadow-size'] += "px";
        lessVals['thumb-shadow-blur'] += "px";
        lessVals['thumb-height'] += "px";
        lessVals['thumb-width'] += "px";
        lessVals['thumb-border-width'] += "px";
        lessVals['thumb-roundness'] += "%";

        lessVals['contrast'] += "%";
        less.modifyVars(lessVals);

        if (slider.namespace) {
            $rootScope.output = __lastCSS.replace(/input\[type=range\]/g, 'input[type=range].' + slider.namespace);
        } else {
            $rootScope.output = __lastCSS;
        }
    }, true);

    $rootScope.slider = presets.default;
});
