// Função para carregar os dados do arquivo JSON
function carregarDadosJSON(arquivo, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType("application/json");
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          callback(JSON.parse(this.responseText));
      }
  };
  xhttp.open("GET", arquivo, true);
  xhttp.send();
}

// Função para preencher os dados nas seções HTML
function preencherDados(data) {
  // Preencher a seção "About"
  document.getElementById('about').innerHTML = '<h2>About</h2><p>' + data.about[0].text + '</p>';

  // Preencher a seção "Background"
  document.getElementById('background').innerHTML = '<h2>Background</h2><p>' + data.background[0].text + '</p>' +
      '<p><a href="' + data.resume[0].link + '" target="_blank" rel="noopener noreferrer">View my resume</a></p>';

  // Preencher a seção "Skills"
  document.getElementById('skills').innerHTML = '<h2>Skills</h2><h3>Languages</h3><ul>';
  data.languages[0].items.split(', ').forEach(function(item) {
      document.getElementById('skills').innerHTML += '<li>' + item + '</li>';
  });
  document.getElementById('skills').innerHTML += '</ul><h3>Tools</h3><ul>';
  data.tools[0].items.split(', ').forEach(function(item) {
      document.getElementById('skills').innerHTML += '<li>' + item + '</li>';
  });
  document.getElementById('skills').innerHTML += '</ul>';

  // Preencher a seção "Projects"
  var projectsHTML = '<h2>Projects</h2><h3>Featured projects</h3><ul>';
  data['featured projects'].forEach(function(project) {
      projectsHTML += '<li><div class="card"><a href="' + project.link + '" target="_blank" rel="noopener noreferrer">' +
          '<img src="' + project.img + '" width="120" height="120" alt="project_img"><p>' + project.title + '</p>' +
          '<p>' + project.description + '</p></a></div></li>';
  });
  projectsHTML += '</ul><h3>Other projects</h3><ul>';
  data['other projects'].forEach(function(project) {
      projectsHTML += '<li><div class="card"><a href="' + project.link + '" target="_blank" rel="noopener noreferrer">' +
          '<img src="' + project.img + '" width="80" height="80" alt="project_img"><p>' + project.title + '</p>' +
          '<p>' + project.description + '</p></a></div></li>';
  });
  projectsHTML += '</ul>';
  document.getElementById('projects').innerHTML = projectsHTML;

  // Preencher a seção "Publications"
  var publicationsHTML = '<h2>Publications</h2><ul>';
  data.publicacoes.forEach(function(publication) {
      publicationsHTML += '<li>' + publication.title + '<a href="' + publication.link + '" target="_blank" rel="noopener noreferrer">&nbsp;[Link]</a></li>';
  });
  publicationsHTML += '</ul>';
  document.getElementById('publications').innerHTML = publicationsHTML;
}

// Carregar dados do JSON e preencher o conteúdo ao carregar a página
carregarDadosJSON('data.json', preencherDados);