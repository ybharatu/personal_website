// $(document).ready(function() {
//   const corsProxy = 'https://api.allorigins.win/get?url=';
//   const url = 'https://en.wikipedia.org/wiki/Main_Page';

//   $.get(corsProxy + encodeURIComponent(url), function(data) {
//     const $quote = $(data).find('#mp-dyk .mp-h2');
//     const quoteText = $quote.text().trim();
//     console.log(quoteText)
//     console.log($quote)
//     $('#quote-placeholder').html(`<h2>${quoteText}</h2>`);
//   });
// });
// $(document).ready(function() {
//   const url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Template:Did_you_know&prop=text&section=1&disablelimitreport=1&disableeditsection=1&origin=*';

//   $.getJSON(url, function(data) {
//     const $quote = $(data.parse.text["*"]).find('#mp-dyk > ul > li');
//     const quoteText = $quote.text().trim();
//     $('#quote-placeholder').html(`<h2>${quoteText}</h2>`);
//     console.log(quoteText)
//     console.log($quote)
//   });
// });


// $(document).ready(function() {
//   const url = 'https://en.wikipedia.org/wiki/Main_Page';

//   $.get(`https://api.allorigins.win/get?url=${url}`, function(data) {
//   	var $html = $(data);
// 	var $quote = $html.find('#mp-topbanner div.motto');    const $quoteParent = $quote.parent();
//     const quoteText = $quoteParent.text().trim();
//     $('#quote-placeholder').html(`<h2>${quoteText}</h2>`);
//     console.log(quoteText)
//     console.log($quote)
//   });
// });

// Load the JSON file using an HTTP request
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      const quotes = JSON.parse(xhr.responseText);

      // Get a random quote from the array
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      // Get the HTML header element and set its text to the quote
      const header = document.querySelector('.quote-placeholder');
      const authorHeader = document.querySelector('.author-placeholder');
      header.textContent = randomQuote.Quote;
      authorHeader.textContent = randomQuote.Author
    } else {
      console.error('Error loading quotes.json:', xhr.status);
    }
  }
};
xhr.open('GET', 'extra/quotes.json');
xhr.send();