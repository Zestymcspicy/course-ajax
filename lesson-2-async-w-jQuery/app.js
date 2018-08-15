/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {Authorization: 'Client-ID b661635622605a3f29a7682c4fa5087278bdbdd047404406831afd3b4e690ebe'}
        }).done(addImage);
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a1b691f0fa6b44d7adc63781747d5271`
        }).done(addArticles);
    });

    function addImage(images) {
        const firstImage = images.results[(Math.floor(Math.random() * images.results.length))];

        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
        <img src="${firstImage.urls.small}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>)`
        );
    }
    function addArticles(articles) {

        responseContainer.insertAdjacentHTML('beforeend', '<ul>' +
      articles.response.docs.map(article => `<li>
        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
        ${article.snippet}
      </li>`) + '</ul>');
    }


})();
