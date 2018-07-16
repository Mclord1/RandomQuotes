function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var currentQuote, currentAuthor = '';

function getQuote() {

    $(document).ready(function () {
        $.ajax({
            jsonp: 'jsonp',
            dataType: 'jsonp',
            url: 'https://api.forismatic.com/api/1.0/',
            contentType: 'application/jsonp',
            data: {
                lang: 'en',
                method: 'getQuote',
                format: 'jsonp'
            },
            success: function (r) {
                if (typeof r === 'string') {
                    r = JSON.parse(r);
                }

                currentQuote = r.quoteText;
                currentAuthor = r.quoteAuthor;

                $(".quoteMessage").animate({
                        opacity: 0
                    }, 500,
                    function () {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#text').html(currentQuote);
                    });

                $(".quoteAuthor").animate({
                        opacity: 0
                    }, 500,
                    function () {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#author').html(currentAuthor);
                    });

                    $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=wisequotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
            }


        });
    });
}


$(document).ready(function () {
    getQuote();
    $('#newQuote').on('click', getQuote);
});