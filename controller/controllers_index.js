// document.write('<scr'+'ipt type="text/javascript" src="other js file.js" ></scr'+'ipt>');
var myapp = angular.module('starter.controllers_index' , ['ui.grid'])





myapp.controller('con_sys_index', function($scope,$window ) {



$scope.text = ()=>{

  var header = document.getElementById("myDIV");
  var btns = header.getElementsByClassName("btn1");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
  }


}
$scope.text()

$scope.logout =()=>{

  $window.location.href = "#/login";
}
                  });
