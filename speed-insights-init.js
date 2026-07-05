// Vercel Speed Insights initialization
// This script loads the Speed Insights tracking script from Vercel

(function() {
  'use strict';
  
  // Create queue for Speed Insights events
  window.siq = window.siq || [];
  window.si = window.si || function() {
    window.siq.push(arguments);
  };
  
  // Configuration
  var config = {
    route: window.location.pathname,
    debug: false
  };
  
  // Create and inject the Speed Insights script
  var script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  
  // Add SDK information as data attributes
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '2.0.0');
  
  // Inject the script into the page
  var firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
})();
