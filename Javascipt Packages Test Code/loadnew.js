
    const inputPackageID = document.querySelector('.getInput');
    const loadData = document.querySelector('.loadJson');

    inputPackageID.addEventListener('keyup', function(event) {
      let packageID = inputPackageID.value;
      var xhttp = new XMLHttpRequest(); 
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          
          var data = JSON.parse(xhttp.responseText);
          Object.entries(data).forEach(([key, value]) => {
            if (key === packageID) {
              
              var newDiv = document.createElement('div');
              newDiv.classList.add('package');
              var newImage = document.createElement('img');
              newImage.src = value.ProductImage;
              newDiv.appendChild(newImage);
              var textDiv = document.createElement('div');
              textDiv.innerHTML = "<div class='title'>" + value.ProductTitle + "</div>" + value.ProductDescription;
              newDiv.appendChild(textDiv);
              loadData.appendChild(newDiv);
            }
          });
        }
      };
    xhttp.open("GET", "new.json", true);
    xhttp.send();
    if (event.keyCode === 8) {
      loadData.innerHTML = "";
    }
});
