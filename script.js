fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {

        const dailyBtn = document.querySelector(".daily");
        const weeklyBtn = document.querySelector(".weekly");
        const monthlyBtn = document.querySelector(".monthly");

        let timeframe = "weekly";

        dailyBtn.addEventListener("click", function() {
            timeframe = "daily";
            updateCards();
        });
        weeklyBtn.addEventListener("click", function() {
            timeframe = "weekly";
            updateCards();
        });
        monthlyBtn.addEventListener("click", function() {
            timeframe = "monthly";
            updateCards();
        });

        function updateCards() {
            const cards = document.querySelectorAll(".card-design");
            cards.forEach((card, index) => {
                const current = json[index].timeframes[timeframe].current;
                const previous = json[index].timeframes[timeframe].previous;

                card.querySelector(".current-time").textContent = `${current}hrs`;
                card.querySelector(".last-time span").textContent = `${previous}hrs`;
            });
        }

        const container = document.querySelector(".card-container");
        json.forEach(function(item) {
            const card = document.createElement("div");
            card.classList.add("card-design");

            card.innerHTML = `
                <div class="inner-card" tabindex="0">
                    <div class="title-wrap">
                        <h3 class="title">${item.title}</h3>
                        <button><img src="images/icon-ellipsis.svg" alt=""></button>
                    </div>
                    <div class="time-wrap">
                        <h4 class="current-time">${item.timeframes.weekly.current}hrs</h4>
                        <p class="last-time">Last Week - <span>${item.timeframes.weekly.previous}hrs</span> </p>
                    </div>
                    
                </div>
                `;

            switch (item.title) {
                case "Work":
                    card.classList.add("card-work");
                    break;
                case "Play":
                    card.classList.add("card-play");
                    break;
                case "Study":
                    card.classList.add("card-study");
                    break;
                case "Exercise":
                    card.classList.add("card-exercise");
                    break;
                case "Social":
                    card.classList.add("card-social");
                    break;
                case "Self Care":
                    card.classList.add("card-self");
                    break;
                default:
                    break;
            }

            container.appendChild(card);
        });
        updateCards();
    });
