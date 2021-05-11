
function init() {
  if (!window.addEventListener) return // Check for IE9+

  const isPreview = INSTALL_ID === 'preview'
  let options = INSTALL_OPTIONS

  let loadLogRocket = false;

  const vendorScript = document.createElement("script")
  vendorScript.src = "https://cdn.lr-ingest.io/LogRocket.min.js"
  document.head.appendChild(vendorScript)
  vendorScript.onload = function () {
    loadLogRocket = true;
    updateElement();
  }

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement() {
    if (!loadLogRocket) {
      isPreview && console.error("LogRocket not load yet")
      return
    }
    if (!options.id) {
      isPreview && console.error("LogRocket ID not set")
      return
    }

    isPreview && console.log(`LogRocket init ${options.id}`)
    window.LogRocket.init(options.id)
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      updateElement()
    },
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement)
  } else {
    updateElement()
  }
}

init()
