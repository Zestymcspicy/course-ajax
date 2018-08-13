(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const unsplashRequest = new XMLHttpRequest();
    const articleRequest = new XMLHttpRequest();
    unsplashRequest.onload = addImage;
    articleRequest.onload = addArticles;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID b661635622605a3f29a7682c4fa5087278bdbdd047404406831afd3b4e690ebe');
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=`);
        articleRequest.send();
        unsplashRequest.send();
    });


    // unsplashRequest.onerror = function (err) {
    //     requestError(err, 'image');
    // };


    function addImage() {

        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];

        if (data && data.results && data.results[0]) {
            htmlContent = `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
          <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`;
        } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
        }


        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    function addArticles () {}

})();
