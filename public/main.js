var thumbUp = document.getElementsByClassName("fa-thumbs-up");

$(document).ready(function(){
    str = tinycolor.random().darken(20);
    str2 = tinycolor(str.toHexString()).darken(30);
    $("body").css("background-color", str.toHexString());
    $("div.menu").css("background-color", str2.toHexString());
    setInterval(function(event){
      str = tinycolor.random().darken(15);
      str2 = tinycolor(str.toHexString()).darken(30);
      $("body").css("background-color", str.toHexString());
      $("div.menu").css("background-color", str2.toHexString());
    },1500);
// ====================page Scroll
$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});
// ==============================


// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         var name = $('#name').text
//         // this.parentNode.childNodes[1].innerText
//         var email = $('#email').text
//         // this.parentNode.childNodes.childNodes[1].innerText
//         var location = $('#location').text
//         // this.parentNode.childNodes[3].innerText
//         var story = $('#story').text
//         // this.parentNode.childNodes[5].innerText
//         var gameplan = $("#gameplan").text
//         // this.parentNode.childNodes[7].innerText
//         var asks = $('#needs').text
//         // this.parentNode.childNodes[9].innerText
//         var size = $('#size').text
//         // this.parentNode.childNodes[11].innerText
//         var updates = $('#updates').text
//         // this.parentNode.childNodes[13].innerText
//         // const photo = this.parentNode.parentNode.childNodes[17].innerText
//         const thumbUp = parseFloat($('#likes').text)
//         // parseFloat(this.parentNode.childNodes[15].innerText)
//
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'email': email,
//             'name': name,
//             'location': location,
//             'story' : story,
//             'gameplan' : gameplan,
//             'asks' : asks,
//             'size' : size,
//             'updates' :updates,
//             // 'photo' : photo,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
});
