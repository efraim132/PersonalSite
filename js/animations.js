window.sr = ScrollReveal();
    sr.reveal('.navbar',{
      duration: 1000,
      origin:'top'
    });
    sr.reveal('#NameTag',{
      duration: 1000,
      delay:300,
      origin:'left',
      distance:'10px'
    });
    sr.reveal('#DescTag',{
      duration: 1000,
      delay:500,
      origin:'right',
      distance:'10px'
    });
    sr.reveal('#Intro div', {
      duration: 1000,
      origin:'bottom',
      distance:'30px',
      viewFactor: 0.2
    })

    sr.reveal('.titleText', {
      duration: 1000,
      origin:'left',
      distance:'30px',
      viewFactor: 0.2
    })

    sr.reveal('.content-left', {
      duration: 500,
      origin:'left',
      distance:'300px',
      viewFactor: 0.2
    })
    sr.reveal('.content-right', {
      duration: 500,
      origin:'right',
      distance:'300px',
      viewFactor: 0.2
    })