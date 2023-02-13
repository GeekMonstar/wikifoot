const key = '94085ea0-39d1-11ed-b518-231c4e950966';
// const url = `https://app.sportdataapi.com/api/v1/soccer/countries/${countryId}?apikey=${key}`;
// const url = `https://app.sportdataapi.com/api/v1/soccer/matches?apikey=${key}&season_id=${countryId}&date_from=2022-08-02`
const requestInit = { method: 'GET' };
const playerContainer = document.querySelector('#player-list');
const select = document.querySelector('#selection');
const topLink = document.querySelector('#go-to-top');
let countryId = select.value;
select.addEventListener('change', () => {
    countryId = select.value;
    App();
})

window.addEventListener('scroll', () => {
    if (window.scrollY <= (window.screen.availHeight)/2) {
        topLink.style.display = 'none';
    }
    else {
        topLink.style.display = 'flex';
    }
})

async function App() {
    const url = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${key}&country_id=${countryId}&max_age=40`;//England: 42, Cammeroon: 28, Belgium: 21, Agentina: 13, France: 46, Spain: 113
    const request = await fetch(url, requestInit)
        .then(response => {
            playerContainer.innerHTML = '';
            let datas = response.json().then(datas => {
                console.log(datas);
                for (let i = 0; i <= 100; i++) {
                    playerContainer.innerHTML += `
                    <div class='player-item'>
                        <div class='player-img'>
                            <img src=${datas.data[i].img == '' ? './img/no-image.jpg' : datas.data[i].img} alt='${datas.data[i].firstname}'/>
                        </div>
                        <div class='player-details'>
                            <p><span class='first-name'>${datas.data[i].firstname}</span> <span>${datas.data[i].lastname}</span></p>
                            <p><span class='mark'>Birthday(Age):</span> ${datas.data[i].birthday}(${datas.data[i].age}yo)</p>
                            <p><span class='mark'>Country:</span> ${datas.data[i].country.name}</p>
                            <p><span class='mark'>height:</span> ${datas.data[i].height} cm</p>
                            <p><span class='mark'>weight:</span> ${datas.data[i].weight} kg</p>
                        <div>
                    </div>`;
                }
            })
        })
        .catch(e => {
            console.log(`Une érreur est survenue: ${e.message}`);
        })
}

App();