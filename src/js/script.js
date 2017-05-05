slidr.create('slidr-one').start();
slidr.create('slidr-two').start();
slidr.create('slidr-three').start();



var ideaRequest = new XMLHttpRequest();

function randomPage() {
  var number = Math.floor((Math.random() * 50) + 1);
  return number;
}

var url = "https://pixabay.com/api/?key=5018958-ed49ccd90878e6614abdf24a6&image_type=photo&min_width=700&min_height=700&page=" + randomPage() + "&per_page=7&editors_choice=true";

// console.log(randomPage());

function send(data) {
  ideaRequest.open('GET', data);
  ideaRequest.send();
}

function convert() {

  var result = JSON.parse(ideaRequest.responseText);
  // console.log(result.hits[1].webformatURL);
  console.log(result);
  var html = document.getElementById('code').innerHTML;
  var tmpl = _.template(html);

  document.querySelector('.holiday').innerHTML = tmpl({
    list: result
  });
}

function load() {
  ideaRequest.onload = function() {
    if (ideaRequest.readyState == 4) {
      convert();
      var container = document.querySelector('.holiday');
      var size = document.querySelector('.holiday__picture').width;
      console.log(size);
      var msnry = new Masonry(container, {
        // Настройки
        columnWidth: '.holiday__sizer',
        itemSelector: '.holiday__item',
        gutter: 20,


      });
      console.log('ok');
    } else {
      console.log('error');
    }
  };
}

function go(myUrl) {
  send(myUrl);
  load();
}

go(url);


var start = document.querySelector('.promo-btn_search');
start.addEventListener('click', function() {
  var req = document.querySelector('.search__field').value;
  var search = "https://pixabay.com/api/?key=5018958-ed49ccd90878e6614abdf24a6&q=" + req + "&image_type=photo&min_width=300&min_height=300&page=" + randomPage() + "&per_page=7";
  // console.log(randomPage());
  go(search);
});
