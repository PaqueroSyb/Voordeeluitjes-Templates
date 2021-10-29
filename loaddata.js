var retrieveDogs = document.getElementById('retrieveDogs');
var loadedXTimes = document.getElementById('loadedXTimes');
var count = 0;
retrieveDogs.addEventListener('click', function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        var response = JSON.parse(xhttp.responseText);
        var images = response.message;
        var imageDiv = document.querySelectorAll('.dog-image')
        images.forEach(function (image, index) {
          var currentImage = imageDiv[index].querySelector('img');
          imageDiv[index].removeChild(currentImage);

          var newImage = document.createElement("img");
          newImage.setAttribute('src', image);
          imageDiv[index].appendChild(newImage);
        });
      }
    };
    xhttp.open("GET", "https://dog.ceo/api/breeds/image/random/6", true);
    xhttp.send();

    count++;
    loadedXTimes.innerText = count;
});