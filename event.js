chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('dragon.htm', {
    'bounds': {
      'width': 900,
      'height': 300
    }
  });
});