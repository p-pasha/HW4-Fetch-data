// const getFilm = ()

fetch("https://ajax.test-danit.com/api/swapi/films")
  .then((response) => response.json())
  .then((films) => {
    films.forEach(({ characters, episodeId, name, openingCrawl }) => {
      const div = document.createElement("div")
      div.innerHTML = `
		<h2>Episode ${episodeId}. ${name}</h2>
		<h3>Short content:</h3>
		<p> ${openingCrawl}</p>
		<h3>Actores:</h3>`

      document.body.append(div)

      const promises = characters.map((url) => {
        return fetch(url).then((response) => response.json())
      })
      const charactersUl = document.createElement("ul")
      div.append(charactersUl)

      Promise.all(promises).then((obj) => {
        obj.map(({ name }) => {
          const charactersList = document.createElement("li")
          charactersList.innerHTML = name
          charactersUl.append(charactersList)
        })
      })
    })
  })
