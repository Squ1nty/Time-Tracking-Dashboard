let dailyBtn = document.getElementById("dailyBtn");
let weeklyBtn = document.getElementById("weeklyBtn");
let monthlyBtn = document.getElementById("monthlyBtn");

let previousTracking = document.getElementsByClassName("previousTracking");
let buttonSelected = document.getElementById("buttonSelected");

let workTimeTracked = document.getElementById("workTimeTracked");
let playTimeTracked = document.getElementById("playTimeTracked");
let studyTimeTracked = document.getElementById("studyTimeTracked");
let exerciseTimeTracked = document.getElementById("exerciseTimeTracked");
let socialTimeTracked = document.getElementById("socialTimeTracked");
let selfCareTimeTracked = document.getElementById("selfCareTimeTracked");

const timeTrackedElementArray = [
  workTimeTracked, 
  playTimeTracked, 
  studyTimeTracked, 
  exerciseTimeTracked, 
  socialTimeTracked, 
  selfCareTimeTracked
];

let previousWorkTimeTracked = document.getElementById("previousWorkTimeTracked");
let previousPlayTimeTracked = document.getElementById("previousPlayTimeTracked");
let previousStudyTimeTracked = document.getElementById("previousStudyTimeTracked");
let previousExerciseTimeTracked = document.getElementById("previousExerciseTimeTracked");
let previousSocialTimeTracked = document.getElementById("previousSocialTimeTracked");
let previousSelfCareTimeTracked = document.getElementById("previousSelfCareTimeTracked");

const previousTimeTrackedElementArray = [
  previousWorkTimeTracked, 
  previousPlayTimeTracked, 
  previousStudyTimeTracked, 
  previousExerciseTimeTracked, 
  previousSocialTimeTracked, 
  previousSelfCareTimeTracked
];

let timeFrame = "";
let hoursTracked = 0;

function hourPluralDisplay(hoursTracked){
  if(hoursTracked === 1){
    return "hr";
  }
  else{
    return "hrs";
  }
}

function displayData(data, timeFrame){
  let index = 0;

  data.forEach(dataItem => {
    if(timeFrame === "daily"){
      timeTrackedElementArray[index].textContent = `${dataItem.timeframes.daily.current}${hourPluralDisplay(dataItem.timeframes.daily.current)}`;
      previousTimeTrackedElementArray[index].textContent = `Yesterday - ${dataItem.timeframes.daily.previous}${hourPluralDisplay(dataItem.timeframes.daily.previous)}`;
    }
    else if(timeFrame === "weekly"){
      timeTrackedElementArray[index].textContent = `${dataItem.timeframes.weekly.current}${hourPluralDisplay(dataItem.timeframes.weekly.current)}`;
      previousTimeTrackedElementArray[index].textContent = `Last Week - ${dataItem.timeframes.weekly.previous}${hourPluralDisplay(dataItem.timeframes.weekly.previous)}`;
    }
    else if(timeFrame === "monthly"){
      timeTrackedElementArray[index].textContent = `${dataItem.timeframes.monthly.current}${hourPluralDisplay(dataItem.timeframes.monthly.current)}`;
      previousTimeTrackedElementArray[index].textContent = `Last Month - ${dataItem.timeframes.monthly.previous}${hourPluralDisplay(dataItem.timeframes.monthly.previous)}`;
    }
    index++;
  });
}

async function fetchData(timeFrame){
  try{
    const response = await fetch("./data.json");
    if(!response.ok){
      throw new Error(`HTTP error: ${response.status}`);
    }
    let data = await response.json();
    displayData(data, timeFrame);
  }
  catch(error){
    console.error(`Could not get products: ${error}`);
  }
}

dailyBtn.addEventListener("click", (e) =>{
  weeklyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");

  dailyBtn.classList.add("active");
  fetchData("daily");
});
weeklyBtn.addEventListener("click", (e) =>{
  dailyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");

  weeklyBtn.classList.add("active");
  fetchData("weekly");
});
monthlyBtn.addEventListener("click", (e) =>{
  dailyBtn.classList.remove("active");
  weeklyBtn.classList.remove("active");

  monthlyBtn.classList.add("active");
  fetchData("monthly");
});