$(document).ready(function(){

  $('#login').click(function(){
    navigator.id.request();
  });

  $('#logout').click(function(){
    navigator.id.logout();
  });

  navigator.id.watch({
    onlogin: function(assertion){
      $.post('/persona/verify', {assertion: assertion}, function(res){
        console.log(res);
        if(!loggedIn && res.status == 'okay') location.reload();
      })
    },

    onlogout: function(){
      $.post('/persona/logout', function(res){
        console.log(res);
        if(loggedIn && res.status == 'okay') location.reload();
      });
    }
  });

  // Users
  $('a[href="#users"]').click(function(e){
    history.pushState({ tab: 'users' }, '', '/staff/users');
  });
  $('a[href="#permissions"]').click(function(e){
    history.pushState({ tab: 'permissions' }, '', '/staff/users/permissions');
  });

  window.onpopstate = function(e){
    var url = e.target.document.URL;
    var indexOfSlash = url.lastIndexOf('/') + 1;
    var indexOfOther = url.length;
    if(url.indexOf('#', indexOfSlash) != -1) indexOfOther = url.indexOf('#', indexOfSlash);
    if(url.indexOf('?', indexOfSlash) != -1) indexOfOther = url.indexOf('?', indexOfSlash);
    var tab = url.substr(indexOfSlash, indexOfOther - indexOfSlash)
    $('a[href="#'+tab+'"]').tab('show');
  }

});
