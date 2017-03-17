var quotes;
//
//
//
// $("#header-quote").text("HELLO");
//
// var quoteIndex = -1;
//
// var getQuote = function () {
//   $("#header-quote").text("HELLO");
//
//   // var quotes = JSON.parse("")
// };

// function testFoo() {
//   $("#header-quote").text("HELLO");
//   // alert("Hi");
// };

// window.onload = function() {
//   testFoo();
// };

// window.onload = function() {
//   $("#header-quote").text("HELLO");
// };

function setQuote(text, source) {
  $("#header-quote").text(text + " - " + source);
}

$(document.body).ready(function () {
  $.ajax({url: "quotes.json",
    success: function(content){
      if(content) {
        quotes = content;
        var quoteIndex = parseInt(Math.random() * quotes["quotes"].length);
        // alert(quoteIndex);
        setQuote(quotes["quotes"][quoteIndex][1], quotes["quotes"][quoteIndex][0]);
      }
      else {
        alert("Error reading quotes");
      }
    },
    error: function(result){
        alert("Error loading quotes");
    }
  });
  // testFoo();
});



// $(document.body).ready(function () {
//   $.ajax({url: "quotes.jsonss"}).done(function(content) {
//     if(content) {
//       quoteFile = content;
//       alert("YES!");
//     }
//     else {
//       alert("FUCK");
//     }
//   });
//   // testFoo();
// });
