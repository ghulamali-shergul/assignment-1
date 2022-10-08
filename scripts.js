
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response){
            
            var tbodyEl = $('#namebody');

            tbodyEl.html('');

                response.tweets.forEach(function(tweet) {
                    tbodyEl.append('\
                        <tr>\
                            <td>' + tweet?.id + '</td>\
                            <td>' + tweet?.user?.screen_name + '</td>\
                            <td>' + tweet?.user?.name + '</td>\
                        </tr>\
                    ');
                });
              
          }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
              var tbodyEl = $('#tweetbody');
              
              tbodyEl.html('');
              console.log(response)
              response.tweets.forEach((tweet) => {
                  tbodyEl.append('\
                      <tr>\
                          <td>' + tweet.id + '</td>\
                          <td>' + tweet.text + '</td>\
                          <td>' + tweet.created_at + '</td>\
                      </tr>\
                  ');
              });
          }
      });
    });

    //Get searched tweets  
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        
        $.ajax({
            url: `/tweets/recent-search`,
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('#searchbody');
                
                tbodyEl.html('');
                console.log(response)
                response.tweets.forEach((tweet) => {
                    tbodyEl.append('\
                        <tr>\
                            <td>' + tweet[0].id + '</td>\
                            <td>' + tweet[0].text + '</td>\
                            <td>' + tweet[0].created_at + '</td>\
                        </tr>\
                    ');
                });
            }
        });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        const [tweetID, tweetText] = $("#create-input").val().split(";");

        //TODO: creat a tweet
  
        
        // $.post("/tweetinfo", { tweetId: tweetID, tweetText: tweetText }, (r) => {
        //       console.log(r);
        //       $("#create-input").val('');
        //       $('#get-button').click();
        // });

        $.ajax({
            url: '/tweetinfo',
            method: 'POST',
            contentType: "application/json", // send as JSON
            data: JSON.stringify({ tweetId: tweetID, tweetText: tweetText }),
            success: function(r) {
              console.log(r);
              $("#create-input").val('');
              $('#get-button').click();
            }
        });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var TweetId = $('#search-input').val();
    
    //TODO: search a tweet and display it.
     //var searchInput = $('#search-id').val();
     //   console.log(searchInput)
        
        $.ajax({
            url: `/tweets/searchinfo/${TweetId}`,
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('#searchbody');
                
                tbodyEl.html('');
                console.log(response)
               
                    tbodyEl.append('\
                        <tr>\
                            <td >' + response.id + '</td>\
                            <td >' + response.text + '</td>\
                            <td>' + response.created_at + '</td>\
                        </tr>\
                    ');
                
            }
        });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
        $.ajax({
            url: `/tweetinfo/${name}/${newName}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: newName }),
            success: function(response) {
                console.log(response);
            }
        });
  });


  //DELETE
  $("#delete-form").on('submit', function(event) {
    var id = $('#delete-input').val();
    event.preventDefault();

    //TODO: delete a tweet
    //var rowEle = $('#delete-button').closest('tr');
    //    var id = rowEle.find('.id').text();
        
        $.ajax({
            url: `/tweetinfo/${id}`,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });

  });


});

function test_print(){

    console.log(“test code”)

}


                    
   