
function fetchMeals(meal){
    console.log(meal)
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    let results = document.querySelector('.js-search-results')
    results.innerHTML = ''

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            return results.innerHTML += 
            `<div>
                Meal not found
            </div>`
        })
        .then(responseJSON => {
            if(responseJSON.meals === null){
                return results.innerHTML += 
                `<div>
                    Meal not found
                </div>`
            }
            console.log(responseJSON.meals)
            for (let i = 0; i < responseJSON.meals.length; i++){
                results.innerHTML += 
                `<div>
                    <ul>
                        <li>${responseJSON.meals[i].strMeal}</li>
                        <li>${responseJSON.meals[i].strArea}</li>
                        <li>${responseJSON.meals[i].strInstructions}</li>
                    </ul>
                    <img src="${responseJSON.meals[i].strMealThumb}"/>
                </div>`
            }
        })
}

function watchForm(){
    let form = document.querySelector('.js-search-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let value = document.querySelector('.js-query').value
        fetchMeals(value);
    })
}

function init(){
    watchForm()
}

init()