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

});
