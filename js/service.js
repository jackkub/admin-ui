angular.module('app.service', [])
    .factory('rms', function($http) {
        var label = false;
        var cond = false;
        var data = false;
        var list = false;
        return {
            sendCond: function(data) {
                this.cond = data;
            },
            showCond: function() {

                return this.cond;
            },
            sendLabel: function(data) {
                this.label = data;
            },
            showLabel: function() {

                return this.label;
            },
            sendData: function(data) {
                this.data = data;
            },
            showData: function() {

                return this.data;
            },
            gettable: function(db, tb) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('/api/v2/' + db + '/_table/' + tb).then(function(res) {
                    // The then function here is an opportunity to modify the response
                    //console.log(JSON.stringify(res));โ€
                    // The return value gets picked up by the then in the controller.
                    return res.data;
                });
                // Return the promise to the controller
                return promise;
            },
             
            insert_table: function(db, tb, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.post('/api/v2/' + db + '/_table/' + tb, {
                    "resource": data
                }).then(function(res) {
                    // The then function here is an opportunity to modify the response
                    //console.log(JSON.stringify(res));โ€
                    // The return value gets picked up by the then in the controller.
                    return res;
                });
                // Return the promise to the controller
                return promise;
            },
            sp_param: function(db, sp, data) {
         
                var promise = $http.post('/api/v2/' + db + '/_proc/' + sp, {
                    "params": data,
                    "schema": {},
                    "wrapper": "resource"
                }).then(function(res) {
                    return res.data;
                },function(res){
                    return res.data;

                });
                return promise;
            }


        }

    })

    .factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response = { success: username === 'test1' && password === 'test1' };
                if (!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);


            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };

        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    }])

.factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

    /* jshint ignore:end */
});