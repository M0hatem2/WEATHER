
// async function getWeather(query) {
//    try {
//       let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=b73aee4d88ec4d97b7c12221212804&q=${query}`);
//       if (!response.ok) throw new Error("Error fetching data");

//       let data = await response.json();
//       display(data);
//    } catch (error) {
//       console.error("Error:", error.message);
//       alert("Failed to fetch weather data. Please try again.");
//    }
// }

// function display(data) {
//    var output = '';
//    for (let i = 0; i < data.length; i++) {
//       output += `
//             <div class="weather-item">
//                 <h3>${data[i].name}, ${data[i].region}</h3>
//                //  <p>Country: ${data[i].country}</p>
//                //  <p>Country: ${data[i].lat}</p>
//                //  <p>Country: ${data[i].lon}</p>
//             </div>
//         `;
//    }
//    document.getElementById('results').innerHTML = output; console.log(data);
// }

// // عند الضغط على زر البحث
// submit.addEventListener('click', function () {
//    let query = search.value.trim();
//    if (query === '') {
//       alert("Please enter a location!");
//       return;
//    }
//    getWeather(query);
// });
// الحصول على التاريخ الحالي
const today = new Date();

// استخراج اليوم
const day = today.getDate();

// استخراج الشهر (يبدأ من 0، لذا يجب إضافة 1)
const month = today.getMonth() + 1;

// استخراج السنة
const year = today.getFullYear();

// استخراج اليوم (الأحد = 0)
const weekDay = today.getDay();

// تحويل اليوم إلى اسم اليوم
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[weekDay];

// عرض التاريخ بصيغة يوم-شهر-سنة
console.log(`Today: ${day}-${month}-${year}`);

// عرض اسم اليوم
console.log(`Day: ${dayName}`);

// الحصول على اليوم التالي
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowDayName = days[tomorrow.getDay()];
console.log(`Tomorrow: ${tomorrow.getDate()}-${tomorrow.getMonth() + 1}-${tomorrow.getFullYear()} (${tomorrowDayName})`);

// الحصول على اليوم الذي يليه
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);
const dayAfterTomorrowDayName = days[dayAfterTomorrow.getDay()];
console.log(`Day After Tomorrow: ${dayAfterTomorrow.getDate()}-${dayAfterTomorrow.getMonth() + 1}-${dayAfterTomorrow.getFullYear()} (${dayAfterTomorrowDayName})`);

show = "Cairo"

// =======================================
var search = document.getElementById('search');
var submit = document.getElementById('submit');

async function getWeather(show) {
   var reqwest = new XMLHttpRequest();
   reqwest.open(
      'GET',
      'https://api.weatherapi.com/v1/search.json?key=b73aee4d88ec4d97b7c12221212804&q=' + show);
   reqwest.responseType = 'json';
   reqwest.send();

   reqwest.onload = function () {
      if (reqwest.status === 200) {
         var response = reqwest.response;

         // Assuming the first matching location is desired
         if (response.length > 0) {
            var location = response[0]; // First location in the search result

            // Display weather information
            document.getElementById('forecast').innerHTML = `  <div class="today forecast">
                                <div class="forecast-header" id="today">
                                        <div class="day">${dayName}</div>
                                        <div class=" date">${day}-${month}</div>
                                </div> <!-- .forecast-header -->
                                <div class="forecast-content" id="current">
                                        <div class="location">${location.name}</div>
                                        <div class="degree">
                                                <div class="num">${location.lat}<sup>o</sup>C</div>

                                                <div class="forecast-icon">
                                                        <img src="https://cdn.weatherapi.com/weather/64x64/night/122.png"
                                                                alt="" width="90">
                                                </div>

                                        </div>
                                        <div class="custom">Overcast</div>
                                        <span><img src="images/icon-umberella.png" alt="">20%</span>
                                        <span><img src="images/icon-wind.png" alt="">18km/h</span>
                                        <span><img src="images/icon-compass.png" alt="">East</span>
                                </div>
                        </div>
                        <div class="forecast">
                                <div class="forecast-header">
                                        <div class="day">${tomorrow.getDate()}-${tomorrow.getMonth() + 1}-${tomorrow.getFullYear()} (${tomorrowDayName})</div>
                                </div> <!-- .forecast-header -->
                                <div class="forecast-content">
                                        <div class="forecast-icon">
                                                <img src="https://cdn.weatherapi.com/weather/64x64/day/122.png" alt=""
                                                        width="48">
                                        </div>
                                        <div class="degree">${location.lon}<sup>o</sup>C</div>
                                        <small>6.6<sup>o</sup></small>
                                        <div class="custom">Overcast </div>
                                </div>
                        </div>
                        <div class="forecast">
                                <div class="forecast-header">
                                        <div class="day">${dayAfterTomorrow.getDate()}-${dayAfterTomorrow.getMonth() + 1}-${dayAfterTomorrow.getFullYear()} (${dayAfterTomorrowDayName})</div>
                                </div> <!-- .forecast-header -->
                                <div class="forecast-content">
                                        <div class="forecast-icon">
                                                <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt=""
                                                        width="48">
                                        </div>
                                        <div class="degree">8.4<sup>o</sup>C</div>
                                        <small>7<sup>o</sup></small>
                                        <div class="custom">Patchy rain nearby</div>
                                </div>
                        </div>`;
            console.log(location);

         } else {
            console.error("No matching locations found.");
         }
      } else {
         console.error("Failed to fetch weather data:", reqwest.statusText);
      }
   };

   reqwest.onerror = function () {
      console.error("Network error occurred.");
   };
}
function display() {
   var show = search.value.trim(); // قراءة الإدخال
   if (!show) {
      show = "Cairo"; // تعيين القيمة الافتراضية إذا كان الإدخال فارغًا
   }
   getWeather(show);
}
display()