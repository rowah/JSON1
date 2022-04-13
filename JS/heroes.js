async function populate() {

    //declare the requestURL variable to store the GitHub URL
    const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    //Initialize a new Request object
    const request = new Request(requestURL);
  //make the network request using the fetch() function which returns a Response object
    const response = await fetch(request);
    //retrieve the response as JSON using the json() function of the Response object.
    //we converted the network response directly into a JavaScript object using response.json()
    const superHeroes = await response.json();
      
  
    populateHeader(superHeroes);
    populateHeroes(superHeroes);


    
  
  }

  function populateHeader(obj) {
    //create an <h1> element with createElement(), set its textContent to equal the squadName property of the object, then append it to the header using appendChild()
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = obj['squadName'];
    header.appendChild(myH1);
  
    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${obj['homeTown']} // Formed: ${obj['formed']}`;
    header.appendChild(myPara);
  }

  //Function that creates and displays the superhero cards:
  function populateHeroes(obj) {
    const section = document.querySelector('section');
    const heroes = obj['members'];

  //use a for...of loop to loop through each object in the array. For each one we:
    for (const hero of heroes) {
  //Create several new elements: an <article>, an <h2>, three <p>s, and a <ul>
      const myArticle = document.createElement('article');
      const myH2 = document.createElement('h2');
      const myPara1 = document.createElement('p');
      const myPara2 = document.createElement('p');
      const myPara3 = document.createElement('p');
      const myList = document.createElement('ul');
        //Set the <h2> to contain the current hero's name.
      myH2.textContent = hero.name;
      //Fill the three paragraphs with their secretIdentity, age, and a line saying "Superpowers:" to introduce the information in the list.
      myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
      myPara2.textContent = `Age: ${hero.age}`;
      myPara3.textContent = 'Superpowers:';
  //Store the powers property in another new constant called superPowers — this contains an array that lists the current hero's superpowers.
      const superPowers = hero.powers;
      //Use another for...of loop to loop through the current hero's superpowers — for each one we create an <li> element, put the superpower inside it, then put the listItem inside the <ul> element (myList) using appendChild().
      for (const power of superPowers) {
        const listItem = document.createElement('li');
        listItem.textContent = power;
        myList.appendChild(listItem);
      }
  //The very last thing we do is to append the <h2>, <p>s, and <ul> inside the <article> (myArticle), then append the <article> inside the <section>. The order in which things are appended is important, as this is the order they will be displayed inside the HTML.
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);
  
      section.appendChild(myArticle);
    }
  }
  //Finally, we need to call our top-level populate() function:
  populate();




  //The above code was simple in terms of accessing the JavaScript object, because we converted the network response directly into a JavaScript object using response.json().
  //But sometimes we aren't so lucky — sometimes we receive a raw JSON string, and we need to convert it to an object ourselves. And when we want to send a JavaScript object across the network, we need to convert it to JSON (a string) before sending. Luckily, these two problems are so common in web development that a built-in JSON object is available in browsers, which contains the following two methods:
        //parse(): Accepts a JSON string as a parameter, and returns the corresponding JavaScript object.
        //stringify(): Accepts an object as a parameter, and returns the equivalent JSON string.
  