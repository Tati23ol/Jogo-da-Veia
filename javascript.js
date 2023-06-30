$(document).ready(function() {
  let verificador = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  escolha();
  teste();
  atualizandoPlacar();

  vezDo = true;
  let playerUm = [];
  let playerDois = [];

  var placarUm = 0;
  var placarDois = 0;

  function teste() {
    $("#tabelaJogo div").click(function() {
      clicar(this);
    });
  }

  function escolha() {
    $("#bola").click(function() {
      vezDo = !vezDo;
      $("#escolhas").css("display", "none");
      $("#tabelaJogo").removeClass("disabled");
    });

    $("#xis").click(function() {
      vezDo = true;
      $("#escolhas").css("display", "none");
      $("#tabelaJogo").removeClass("disabled");
    });
  }

  function clicar(quadrado) {
    escolha();
    let indice = $("#tabelaJogo div").index(quadrado);
    if (playerUm.includes(indice) || playerDois.includes(indice)) {
      alert("Não é possível clicar em um quadrado existente.");
    } else {
      if (vezDo) {
        quadrado.innerHTML = "X";
        playerUm.push(indice);
      } else {
        quadrado.innerHTML = "O";
        playerDois.push(indice);
      }
      vezDo = !vezDo;
      checar();
    }
    console.log(playerUm.includes(indice));
    console.log(playerDois.includes(indice));

  }
  

  function checar() {
    verificador.forEach(posiveis => {
      let vencedorPlayerUm = posiveis.every(indice => playerUm.includes(indice));
      let vencedorPlayerDois = posiveis.every(indice => playerDois.includes(indice));

      if (vencedorPlayerUm) {
        posiveis.forEach(indice => {
          const elemento = document.getElementById(indice);
          elemento.classList.add("vencedor");
        });
        $("#resetando").removeClass("reset");
        alert("Player Um Ganhou");
        placarUm += 1;
        atualizandoPlacar();
      } else if (vencedorPlayerDois) {
        posiveis.forEach(indice => {
          const elemento = document.getElementById(indice);
          $("#resetando").removeClass("reset");
          elemento.classList.add("vencedor");
        });
        alert("Player Dois Ganhou");
        placarDois += 1;
        atualizandoPlacar();
        console.log(placarDois);
      }
    });
  }

  $("#btnResete").on("click", recarregarPag);

  function recarregarPag() {
    $("#tabelaJogo div").html(" ");
    $("#tabelaJogo div").removeClass("vencedor");
    playerUm = [];
    playerDois = [];
    vezDo = true;
    //location.reload();
  }

  function atualizandoPlacar() {
    $("#xisplacar").html(placarUm);
    $("#bolaPlacar").html(placarDois);

    localStorage.setItem('pontosPlayerUm', placarUm);
    localStorage.setItem('pontosPlayerDois', placarDois);

    var pontosPlayerUm = localStorage.getItem('pontosPlayerUm');
    var pontosPlayerDois = localStorage.getItem('pontosPlayerDois');
    placarUm = parseInt(pontosPlayerUm) || 0;
    placarDois = parseInt(pontosPlayerDois) || 0;
  }

  atualizandoPlacar();
});



