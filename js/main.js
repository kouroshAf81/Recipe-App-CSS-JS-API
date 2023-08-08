let result = document.querySelector('#result');
let searchBtn = document.querySelector('#search-btn');
let userInput = document.querySelector('#user-input');

let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

searchBtn.addEventListener('click', () => {
    if(userInput.value.length == 0) {
        result.innerHTML = '<h3> Input field cannot be Empty </h3>'
        return
    }
    fetch(url + userInput.value ).then(response => response.json()).then( data => { 
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
    
        for(let i in myMeal) {
            let ingredient = '';
            let measure = '';
    
            if(i.startsWith('strIngredient') && myMeal[i]) {
                ingredient = myMeal[i];
                measure = myMeal['strMeasure' + count];
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        result.innerHTML = 
        `
        <img src=${myMeal.strMealThumb} />
        <div class="details"> 
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id='hide-recipe'>X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        
        <button id='show-recipe'>View Recipe</button>
            
        `
        let ingredientCon = document.querySelector('#ingredient-con');
        let parent = document.createElement('ul');
        let recipe = document.querySelector('#recipe');
        let hideRecipe = document.querySelector('#hide-recipe');
        let showRecipe = document.querySelector('#show-recipe');
    
        ingredients.forEach( i => {
            let child = document.createElement('li');
            child.innerHTML = i;
            parent.appendChild(child);
            ingredientCon.appendChild(parent);
        });
    
        hideRecipe.addEventListener('click', () => {
            recipe.style.display = 'none'
        })
        showRecipe.addEventListener('click', () => {
            recipe.style.display = 'block'
        })
    }).catch( () => {
        result.innerHTML = '<h3>Food Recipe Not Found </h3>'
    })
})

