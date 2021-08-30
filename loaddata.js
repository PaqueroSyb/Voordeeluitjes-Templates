window.onload = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        var response = JSON.parse(xhttp.responseText);
        for (let i = 0; i < response.athletes.length; i++) {
            document.getElementById("test-data").innerHTML += "<b>" + response.athletes[i].name + "</b><br> Deadlift: " + response.athletes[i].lift.deadlift + "<br> Squat: " + response.athletes[i].lift.squat  + "<br> Benchpress: " + response.athletes[i].lift.benchpress + "<br><br>";
        }
      }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
  };