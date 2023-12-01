document.addEventListener('DOMContentLoaded', function() {
    // Select all the links in the navbar
    var links = document.querySelectorAll('.navbar a');
  
    // Add a tabindex attribute to each link
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute('tabindex', i + 1);
    }
  
    // Set focus on the first link
    links[0].focus();
  
    // Listen for keydown events
    window.addEventListener('keydown', function(e) {
      // Get the currently focused element
      var focused = document.activeElement;
  
      // If the left arrow key is pressed
      if (e.key === 'ArrowLeft') {
        for (var i = 0; i < links.length; i++) {
          if (links[i] === focused && i > 0) {
            links[i - 1].focus();
            break;
          }
        }
      }
      // If the right arrow key is pressed
      else if (e.key === 'ArrowRight') {
        for (var i = 0; i < links.length; i++) {
          if (links[i] === focused && i < links.length - 1) {
            links[i + 1].focus();
            break;
          }
        }
      }
    });
  });
  
  