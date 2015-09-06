var app = angular.module('brainGames', []);

app.controller('categorization',
  ['$scope', '$timeout', '$sce', function($scope, $timeout, $sce) {

    var categorizationCycle = 90;
    var planetId = 1;
    var planets = {0: 'sun', 1: 'mercury', 2: 'venus', 3: 'earth',
                   4: 'mars', 5: 'jupiter', 6: 'saturn', 7: 'uranus',
                   8: 'neptune'};

    $scope.planet = $sce.trustAsHtml('<img src="assets/img/cat/earth.png">');
    var i = 1;
    $scope.showTime = 700;

    window.addEventListener('keydown', function(e) {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
    $scope.game = function() {
      loop();
      function loop() {
        if (i < categorizationCycle) {
          $scope.planet = $sce.trustAsHtml('<img src="assets/img/cat/' +
            planets[i++ % 9] + '.png">');
          console.log('Show time is: ' + $scope.showTime);
          $timeout(loop , $scope.showTime);
          $(document).keydown(function(e) {
              switch (e.which) {
                case 37 && i === 8: // left
                  $scope.decreaseInterval();
                  break;

                case 39 && i !== 8: // right
                  $scope.decreaseInterval();
                  break;

                default:
                  $scope.increaseInterval();
                  return;
              }
            });
        }
      };
    };

    $scope.increaseInterval = function() {
      $scope.showTime = $scope.showTime + 250;
    };

    $scope.decreaseInterval = function() {
      if ($scope.showTime > 200) {
        $scope.showTime = $scope.showTime - 150;
      }
    };
  }
]);




$(document).ready(function() {
  $('.panel').css('height', $(window).height() + 'px');
  fadeInHeader();
  linkSmoothScroll();
});


function fadeInHeader() {
  $('#overlay').css('display', 'none');
  $('#main-title').css('display','none');
  $('#small').css('display', 'none');
  $('#big').css('display', 'none');
  $('#greeter').css('display', 'none');
  setTimeout(function() {
    $('#overlay').fadeIn(300);
  }, 700);
  setTimeout(function() {
    $('#main-title').fadeIn(300);
    $('#big').fadeIn(2000);
    $('#small').fadeIn(2000);
    $('#greeter').fadeIn(2000);
  }, 2000);
  setTimeout(function() {
    $('#bouncing-arrow').show(500);
  }, 3500);
}

function linkSmoothScroll() {
    $('a[href^='#']').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });
}
