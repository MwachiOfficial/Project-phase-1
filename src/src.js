document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm')
    const breedInput = document.getElementById('breed')
    const generateFactButton = document.getElementById('generateFact')
    const catContainer = document.getElementById('catContainer')

    // Function to fetch cat data
    function fetchCats(breed) {
        const url = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`
        const apiKey = 'live_8qnNG4QTQR6jdxUsEnewmMQM17wqKzMD6vqERTB56cgCp3NM9HGPOfW73voJjeEu'
        const options = {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => displayCats(data))
            .catch(error => console.error('Error:', error));
    }

    // Function to display cat data
    function displayCats(cats) {
        catContainer.innerHTML = ''
        cats.forEach(cat => {
            const catDiv = document.createElement('div')
            catDiv.innerHTML = `
                <h2>${cat.name}</h2>
                <img src="${cat.image.url}" alt="${cat.name}">
                <p>${cat.description}</p>
            `
            catContainer.appendChild(catDiv)
        })
    }

    // Function to generate cat facts
    function generateCatFact() {
        const url = 'https://catfact.ninja/fact'
        fetch(url)
            .then(response => response.json())
            .then(data => alert(data.fact))
            .catch(error => console.error('Error:', error))
    }

    // Event listener for the search button
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const breed = breedInput.value
        fetchCats(breed)
    })

    // Event listener for the Cat Fact button
    generateFactButton.addEventListener('click', generateCatFact)

    //Dark mode
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Add event listener to the checkbox
    darkModeToggle.addEventListener('change', toggleDarkMode);


    fetchCats()
})