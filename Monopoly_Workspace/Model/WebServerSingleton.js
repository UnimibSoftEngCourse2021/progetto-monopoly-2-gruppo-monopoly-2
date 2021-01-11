class WebServerSingleton {
  var webServerInstance;

  function getWebServerInstance(){
    if(!webServerInstance){
      webServerInstance = new WebServer();
    }
    return webServerInstance;
  }
}
