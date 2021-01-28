class WebServerSingleton {
  webServerInstance;

  getWebServerInstance(){
    if(!webServerInstance){
      this.webServerInstance = new WebServer();
    }
    return webServerInstance;
  }
}
