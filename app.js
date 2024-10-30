// selecting elements

let form = document.querySelector("form");
let searchBTn = document.querySelector(".search-btn");
let flagElm = document.querySelector(".flag");
let nameElm = document.querySelector("#name");
let basicText = document.querySelector(".basic-text");
let inputElm = document.querySelector(".input");
let geoText = document.querySelector(".geo-text");
let moreText = document.querySelector(".more-text");
let errorDiv = document.querySelector(".error");
let hideDiv = document.querySelectorAll(".hide");

async function showData(countryName) {
    let URL = `https://restcountries.com/v3.1/name/${countryName}`;
    let response = await fetch(URL);

    if (response.status == 404) {
        console.log("Invalid City Name");
        errorDiv.style.display = "block";

        hideDiv.forEach(n => {
            n.classList.add("hideDiv")
        })
    }

    else {
        let data = await response.json();

        let CurrencyCode = Object.keys(data[0].currencies)[0];
        let currencyName = data[0].currencies[CurrencyCode];
        let lang = data[0].languages

        flagElm.src = data[0].flags.png;
        nameElm.innerHTML = data[0].name.common;
        basicText.innerHTML = `

                    <p class="card-p">
                        <span class="key">Capital : </span>
                        <span class="value">${data[0].capital[0]}</span>
                    </p>
                    <p class="card-p">
                        <span class="key">Region : </span>
                        <span class="value">${data[0].region}</span>
                    </p>
                    <p class="card-p">
                        <span class="key">Population : </span>
                        <span class="value">
                        ${data[0].population.toLocaleString()}</span>
                    </p>
                    <p class="card-p">
                        <span class="key">Currency Code : </span>
                        <span class="value">${CurrencyCode} (${currencyName.symbol})</span>
                    </p>
                    <p class="card-p">
                        <span class="key">Currency Name : </span>
                        <span class="value">
                        ${currencyName.name}</span>
                    </p>
                    <p class="card-p">
                        <span class="key">Language : </span>
                        <span class="value">${Object.values(lang).toString()}</span>
                    </p>
    `

        geoText.innerHTML = `

    <p class="card-p">
        <span class="key">Region : </span>
        <span class="value">${data[0].region}</span>
    </p>
    <p class="card-p">
        <span class="key">Subregion : </span>
        <span class="value">${data[0].subregion}</span>
    </p>
    <p class="card-p">
        <span class="key">Capital : </span>
        <span class="value">
        ${data[0].capital[0]}</span>
    </p>
    <p class="card-p">
        <span class="key">Lat, Lng : </span>
        <span class="value">
        ${data[0].latlng[0]} , ${data[0].latlng[1]}</span>
    </p>
    <p class="card-p">
        <span class="key">Area : </span>
        <span class="value">${data[0].area} km</span><sup>2</sup>
    </p>
    <p class="card-p">
        <span class="key">Main border : </span>
        <span class="value">
        ${data[0].borders[0]}</span>
    </p>
    <p class="card-p">
        <span class="key">Map : </span>
        <span class="value"><a href="${data[0].maps.googleMaps}" target="blank">Click here</a></span>
    </p>
`

        // changing display divs 
        errorDiv.style.display = "none";

        hideDiv.forEach(n => {
            n.classList.remove("hideDiv")
        })
    }
}

showData("nepal");
searchBTn.addEventListener("click", (event) => {
    event.preventDefault();
    showData(inputElm.value);
})
form.addEventListener("submit", (event) => {
    event.preventDefault()
    showData(inputElm.value)
})

/* <p class="card-p">
<span class="key">Official Name : </span>
<span class="value">${data[0].name.official}</span>
</p> */