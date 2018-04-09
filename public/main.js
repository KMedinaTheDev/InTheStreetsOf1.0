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


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const email = this.parentNode.parentNode.childNodes[1].innerText
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const location = this.parentNode.parentNode.childNodes[5].innerText
        const story = this.parentNode.parentNode.childNodes[7].innerText
        const gameplan = this.parentNode.parentNode.childNodes[9].innerText
        const asks = this.parentNode.parentNode.childNodes[11].innerText
        const size = this.parentNode.parentNode.childNodes[13].innerText
        const updates = this.parentNode.parentNode.childNodes[15].innerText
        // const photo = this.parentNode.parentNode.childNodes[17].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[17].innerText)

        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'email': email,
            'name': name,
            'location': location,
            'story' : story,
            'gameplan' : gameplan,
            'asks' : asks,
            'size' : size,
            'updates' :updates,
            // 'photo' : photo,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
});
