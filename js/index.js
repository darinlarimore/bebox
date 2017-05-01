 var jsonSource = "https://api.airtable.com/v0/appHy9VHiciXJsXF4/Design%20Projects?api_key=key9zM2eKD4GJ1VVX",
    bebox = $("#be-box"),
    be = $ ("#be"),
    button = $ ("#button"),
    clicked = false,
    textbox = $("#textbox"),
    text = $(".text"),
    photo = $("#photo"),
    bgContainer = $("#container"),
    photoDiv = $("#photo-div"),
    bgLine = new TimelineMax({repeat: 0}),
    textLine = new TimelineMax({repeat:-1}),
    beBox =  new TimelineMax({repeat:0}),
    beBoxColor =  new TimelineMax({repeat:0, yoyo:true}),
    once = new TimelineMax({repeat:0}),
    wordChange =  new TimelineMax({repeat:-1}),
    imageChange =  new TimelineMax({repeat:0}),
    wordsDiv = $("#wordsDiv"),
    imgDiv = $("#imgDiv"),
    colors = ["#F6D85F", "#59B2DE", "#6AB78B", "#835B9F", "#C83932", "black"],
    bgColors = ["#F6D85F", "#59B2DE", "#6AB78B", "#835B9F", "#C83932"],
    words = [],
    nextWord = [];

    function randomColor(t) {
      var daColor = colors[Math.floor(Math.random() * colors.length)];
        beBox.staggerTo(bgContainer, 1, {css: {backgroundColor: "transparent"}})
        .staggerTo(bebox, t, {fill:daColor})


    }

    function complete() {
      var key = words[Math.floor(Math.random() * words.length)],
          randWord = key.phrase,
          funnyPhoto = key.photo;
      if(randWord.length >= 12){
        once.to(wordsDiv, 1, {opacity: 0, css:{fontSize: "80px"}, text:{value:randWord, delimiter:""}, ease:Linear.easeNone})
        .to(photo, 0, {attr:{href:funnyPhoto}, transformOrigin:"50% 50%"})
        .staggerTo(textbox, 1, {attr:{ width: (wordsDiv.width() - 885)}, onRepeat:swapImage()})
        .to(wordsDiv, 1, {opacity: 1, onRepeat:randomColor(7)})
        .staggerTo(wordsDiv, 1, {opacity: 1})
        .staggerTo(wordsDiv, 1, {opacity: 0})
      } else if(randWord.length <= 12){
        once.to(wordsDiv, 1, {opacity: 0, css:{fontSize: "110px"}, text:{value:randWord, delimiter:""}, ease:Linear.easeNone})
        .to(photo, 0, {attr:{href:funnyPhoto}, transformOrigin:"50% 50%"})
        .staggerTo(textbox, 1, {attr:{ width: (wordsDiv.width() - 885)}, onRepeat:swapImage()})
        .to(wordsDiv, 1, {opacity: 1, onRepeat:randomColor(7)})
        .staggerTo(wordsDiv, 1, {opacity: 1})
        .staggerTo(wordsDiv, 1, {opacity: 0})
      }
    };

    function swapImage() {
      var randomChange = Math.random();
      if (randomChange >= 0.5) {
       imageChange.staggerTo(photoDiv, 1, {attr:{opacity: 1, x: 245}})
       .staggerTo(photoDiv, 3, {attr:{opacity: 1, x: 245}})
       .staggerTo(photoDiv, 1, {attr:{opacity: 0, x: 45}})
      }
       else if (randomChange < 0.5) {
       imageChange.staggerTo(photoDiv, 1, {attr:{opacity: 1, y: -200}})
       .staggerTo(photoDiv, 3, {attr:{opacity: 1, y: -200}})
       .staggerTo(photoDiv, 1, {attr:{opacity: 0, y: 0}})
      }
    };


 function animate() {
    beBox.fromTo(bebox, 1, {drawSVG:"0%", fill: "white", ease:Quart.easeInOut}, {drawSVG:"10%", ease:Quart.easeInOut}, "+=0.1")
    .staggerTo(bebox, 1, {drawSVG:"90% 100%", ease:Quart.easeInOut}, 0.5)
    .staggerTo(bebox, 1, {drawSVG:"100%", ease:Quart.easeInOut}, {drawSVG:"10%", ease:Quart.easeInOut}, "+=0.1")
    .staggerTo(bebox, 1, {fill: "black", stroke:"black", scale:1, opacity:1}, 0.2)

    beBox.from(be, 1, {opacity:0}, 1)

    textLine.fromTo(textbox, 1, {drawSVG:"0%", ease:Quart.easeInOut}, {drawSVG:"10%", ease:Quart.easeInOut}, "+=0.1")
    .staggerTo(textbox, 1, {drawSVG:"95% 100%"}, 0.5)
    .staggerTo(textbox, 1, {drawSVG:"100%", stroke:"black", onComplete:complete}, {drawSVG:"10%", ease:Quart.easeInOut}, "+=0.1")
    .staggerTo(textbox, 2.9, {drawSVG:"100%", ease:Quart.easeInOut })
    .staggerTo(textbox, 1, {opacity: 0})
    .staggerTo(textbox, 1.5, {opacity: 0})
    // console.log(words)
};

  button.click(function() {
    var daColor = colors[Math.floor(Math.random() * colors.length)];

        beBoxColor.staggerTo(bebox, 0, {fill:daColor})
        .staggerTo(bebox, .2, {scale:1.5, transformOrigin: "50% 50%", ease: Elastic.easeInOut.config(2, 1)}, 3)
        .staggerTo(bebox, .2, {scale:1, transformOrigin: "50% 50%", ease: Elastic.easeInOut.config(2, 1), onComplete:bgColor()})
  })


  function bgColor() {
    var bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
      bgLine.to(bgContainer, .3, {css: {backgroundColor: bgColor}})
  }

  //fetch the json feed
  $.getJSON( jsonSource, function() {
    $("").prependTo("#container");
  }).done(function(data) {
    if (data) {
      $.each(data.records, function( i, item ) {
        if (item.fields.Phrase !== undefined && item.fields.colorphoto !== undefined) {
          words.push({
            phrase: item.fields.Phrase,
            photo: item.fields.colorphoto[0].url});
         }
      }).done(animate())

    } else {
      // if the json request is successful but there are no items
      $("<p>JSON request succeeded but no data returned.</p>").prependTo("#container");
    }
  })

  .fail(function() {
    $("<p>JSON request fail</p>").prependTo("#container");
  })

  .error(function() {
    $("<p>JSON request error</p>").prependTo("#container");
  });
