document.addEventListener("DOMContentLoaded", function () {

    const sliderList = document.querySelector('.participant__list'),
        participantCards = sliderList.querySelectorAll('.participant__card'),
        participantsPrevButton = document.querySelector('.participants__prev-button'),
        participantsNextButton = document.querySelector('.participants__next-button'),
        interval = 4000;

    let participantSlideCount = participantCards.length;

    if (window.screen.width >= 691) {
        participantSlideCount = participantSlideCount - 2;
    } else if (window.screen.width >= 491) {
        participantSlideCount = participantSlideCount - 1;
    }

    let participantSlideIndex = 0,
        participantDirectionIndex = 1;

    const participantsSlide = () => {
        let imageWidth = sliderList.clientWidth;
        if (window.screen.width >= 1253) {
            imageWidth = sliderList.clientWidth / 3 + 7;
        } else if (window.screen.width >= 691) {
            imageWidth = sliderList.clientWidth / 3;
        } else if (window.screen.width >= 491) {
            imageWidth = sliderList.clientWidth / 2;
        }
        const slideOffset = participantSlideIndex * imageWidth;
        sliderList.style.transform = `translateX(${-slideOffset}px)`;
        if (window.screen.width >= 691) {
            document.querySelector('.participants__counter').textContent = participantSlideIndex + 3;
        } else if (window.screen.width >= 491) {
            document.querySelector('.participants__counter').textContent = participantSlideIndex + 2;
        }
        else document.querySelector('.participants__counter').textContent = participantSlideIndex + 1;
    }

    const participantChangeDirection = (slideIndex) => {
        if (slideIndex == 0) {
            participantDirectionIndex = 1;
        }
        if (slideIndex == participantSlideCount - 1) {
            participantDirectionIndex = 0;
        }
    }

    const participantChangeSlide = (slideIndex) => {
        participantsSlide();
        participantChangeDirection(slideIndex);
    }

    const participantsNextSlide = () => {
        if (participantDirectionIndex == 1) {
            participantSlideIndex++;
        } else {
            participantSlideIndex--;
        }
        participantChangeSlide(participantSlideIndex);
    }

    participantsSlide();

    document.querySelector('.participants__count').textContent = participantCards.length;

    sliderAutoPlay = setInterval(() => { participantsNextSlide() }, interval);

    participantsNextButton.addEventListener('click', () => {
        if (participantSlideIndex == participantSlideCount - 1) {
            participantSlideIndex = 0;
        } else {
            participantSlideIndex++;
        }
        participantChangeSlide(participantSlideIndex);
        clearInterval(sliderAutoPlay);
    })

    participantsPrevButton.addEventListener('click', () => {
        if (participantSlideIndex == 0) {
            participantSlideIndex = participantSlideCount - 1;
        } else {
            participantSlideIndex--;
        }
        participantChangeSlide(participantSlideIndex);
        clearInterval(sliderAutoPlay);
    })


    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const blockID = anchor.getAttribute('href').substr(1)
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    const stagesArrowPrev = document.querySelector("#stages__arrow-prev"),
        stagesArrowNext = document.querySelector("#stages__arrow-next"),
        stagesList = document.querySelector(".stages__list"),
        stagesItem = document.querySelector(".stages__list .stages__item"),
        dotsStages = document.querySelectorAll(".dots-wrapper span");

    let stagesItemWidth = stagesItem.clientWidth,
        maxCountStage = stagesList.childElementCount,
        countStage = 0,
        offsetStage = 0;

    stagesArrowPrev.addEventListener("click", () => {

        if (stagesArrowPrev.classList.contains('disabled')) {
            return
        }
        countStage--;
        changeDotActive();
        checkArrowDisabled();
        offsetStage = stagesItemWidth * countStage;
        stagesList.style.transform = `translateX(${-offsetStage}px)`;
    })

    stagesArrowNext.addEventListener("click", () => {
        if (stagesArrowNext.classList.contains('disabled')) {
            return
        }
        countStage++;
        changeDotActive();
        checkArrowDisabled();
        offsetStage = stagesItemWidth * countStage;
        stagesList.style.transform = `translateX(${-offsetStage}px)`;
    })

    for (let dot of dotsStages) {
        dot.addEventListener("click", () => {
            countStage = dot.dataset.id;
            changeDotActive();
            checkArrowDisabled();
            offsetStage = stagesItemWidth * dot.dataset.id;
            stagesList.style.transform = `translateX(${-offsetStage}px)`;
        })
    }

    function checkArrowDisabled() {
        if (countStage == maxCountStage - 1) {
            stagesArrowPrev.classList.remove('disabled');
            stagesArrowNext.classList.add("disabled");
        } else if (countStage == 0) {
            stagesArrowPrev.classList.add("disabled");
            stagesArrowNext.classList.remove("disabled");
        }
        else {
            stagesArrowPrev.classList.remove("disabled");
            stagesArrowNext.classList.remove("disabled");
        }
    }

    function changeDotActive() {
        dotsStages.forEach(element => {
            element.classList.remove("active")
            if (element.dataset.id == countStage) {
                element.classList.add("active");
            }
        });
    }
    
    function debounce(func){
        var timer;
        return function(){
          if(timer) clearTimeout(timer);
          timer = setTimeout(func,300);
        };
    }

    function resetSlider() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            stagesItemWidth = stagesItem.clientWidth;
            countStage = 0;
            offsetStage = 0;
            stagesList.style.transform = `translateX(${-offsetStage}px)`;
            changeDotActive();
            checkArrowDisabled();
        }
        participantSlideIndex = 0;
        participantChangeSlide(0);
        participantSlideCount = participantCards.length;
        document.querySelector('.participants__count').textContent = participantSlideCount;
        if (window.matchMedia('(min-width: 691px)').matches) {
            participantSlideCount = participantSlideCount - 2;
        } else if (window.matchMedia('(min-width: 491px)').matches) {
            participantSlideCount = participantSlideCount - 1;
        }
    }

    window.addEventListener('resize',debounce(resetSlider));

});