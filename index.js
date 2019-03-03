(function() {
  "use strict";

  var Ajax = function(method, url) {
    this.ajax = new XMLHttpRequest();
    this.method = method;
    this.url = url;
    this.init = function() {
      this.ajax.open(this.method, this.url);
      this.ajax.send();
      return this.ajax;
    };

    return this;
  };

  var popularDados = function(json) {
    var $text = document.createTextNode(json);
    $dados.innerHTML = "";
    $dados.appendChild($text);
  };

  var promisseAjax = function() {
    return new Promise(function(resolve, reject) {
      var ajax = new Ajax("GET", "http://api.github.com/users/" + $input.value);
      ajax.init().onreadystatechange = function(e) {
        if (this.status === 200 && this.readyState === 4)
          return resolve(this.responseText);
        else if (this.status !== 200) return reject("errouuu");
      };
    });
  };

  var $input = document.querySelector("input");
  var $dados = document.querySelector('[data-js="dadosUser"]');
  var $button = document.querySelector("button");

  var handlerClick = function(e) {
    e.preventDefault();
    promisseAjax()
      .then(function(response) {
        popularDados(response);
      })
      .catch(function(errou) {
        console.log(errou);
      });
  };

  $button.addEventListener("click", handlerClick, false);
})();
