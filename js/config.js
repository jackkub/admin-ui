var app = angular.module('starter', ['ui.router' , 'starter.controllers_index'  ]);

// app.constant('INSTANCE_URL', 'http://localhost')
// app.constant('INSTANCE_PORT', '80')
// app.constant('DSP_API_KEY', '6498a8ad1beb9d84d63035c5d1120c007fad6de706734db9689f8996707e0f7d')
// app.constant('API_KEY_FILE', '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88')
// app.factory('httpInterceptor', function(INSTANCE_URL, INSTANCE_PORT) {
//         return {
//             request: function(config) { // Prepend instance url before every api call

//                 if (config.url.indexOf('/api/v2') > -1) { config.url = INSTANCE_URL + ':' + INSTANCE_PORT + config.url; };
//                 return config;
//             }
//         }
//     })
//     .config([ '$httpProvider',  function($httpProvider) {   $httpProvider.interceptors.push('httpInterceptor');  }])
//     .run(function($http, DSP_API_KEY, INSTANCE_URL, INSTANCE_PORT, API_KEY_FILE, $rootScope, rms) {  
//         $rootScope.server = INSTANCE_URL;
//         $rootScope.port = INSTANCE_PORT;
//         $rootScope.API_KEY_FILE = API_KEY_FILE;
//         $rootScope.DB1 = "viking";
//         //$rootScope.DB2 = "dbrmsdpmr";
//         $http.defaults.headers.common['X-Dreamfactory-API-Key'] = DSP_API_KEY; 
//         try {
//             $rootScope.user = JSON.parse(window.localStorage.user)
//         } catch (e) {}
//         $rootScope.meter = [];



//     })


app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
      url: '/login',
      views: {
          'header': {
              templateUrl: 'templates/login.html',
          // controller: 'con_sys_index'
          },
      }

  })
    .state('menu', {
        url: '/menu',
        views: {
            'header': {
                templateUrl: 'templates/menu.html',
             controller: 'con_sys_index'
            },
        }

    })
   .state('menu.dashboard', {
    url: '/dashboard',
    views: {
        'content': {
            templateUrl: 'templates/dashboard.html',
         // controller: 'con_sys_index'
        },
    }

})
.state('menu.members', {
  url: '/members',
  views: {
      'content': {
          templateUrl: 'templates/members.html',
       // controller: 'con_sys_index'
      },
  }

})
.state('menu.bank_analyze', {
  url: '/bank_analyze',
  views: {
      'content': {
          templateUrl: 'templates/bank_analyze.html',
       // controller: 'con_sys_index'
      },
  }

})

.state('menu.members_info', {
  url: '/members_info',
  views: {
      'content': {
          templateUrl: 'templates/members_info.html',
       // controller: 'con_sys_index'
      },
  }

})
.state('menu.payment', {
  url: '/payment',
  views: {
      'content': {
          templateUrl: 'templates/payment.html',
       // controller: 'con_sys_index'
      },
  }

})









    $urlRouterProvider.otherwise('login');

    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
});
