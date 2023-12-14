let categoryTrackingId = "1000";
let isSort = false;
// loading all data
async function loadAllData(categoryTrackingId, isSort) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryTrackingId}`
  );
  const data = await res.json();
  isSort ? showSortedData(data.data) : showData(data.data);
}

// loading categories
async function loadCategory() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoriesInfos = data.data;
  showCategory(categoriesInfos);
}

// showing the all categories
function showCategory(infos) {
  const categoryBtnContainer = getId("categories-container");

  let selectedButton = null;

  infos.forEach((info) => {
    const button = document.createElement("button");
    button.textContent = info.category;
    button.classList.add("btn", "normal-case", "category-btn");

    if (info.category === "All") {
      selectedButton = button;
      selectedButton.classList.add("active");
    }
    // button.setAttribute("id", `${info.category_id}`);

    button.addEventListener("click", () => {
      categoryTrackingId = info.category_id;
      if (selectedButton) {
        selectedButton.classList.remove("active");
      }

      selectedButton = button;
      selectedButton.classList.add("active");
      loadAllData(categoryTrackingId);
    });
    categoryBtnContainer.appendChild(button);
  });
}

// showing the all data
function showData(data) {
  const cardsContainer = getId("cards-container");

  cardsContainer.innerHTML = "";
  if (data) {
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add(
      "grid",
      "md:grid-cols-3",
      "grid-cols-1",
      "lg:grid-cols-4",
      "gap-4",
      "justify-center"
    );
    data.forEach((detail) => {
      const div = document.createElement("div");
      div.innerHTML = `

          <div class="card  shadow-md">
              <figure class="relative">
                  <img src="${
                    detail.thumbnail
                  }" class="w-full h-60 alt="Shoes" />
                  <div class="bg-black rounded-md right-2 bottom-2 text-white absolute">
                    ${secondsToHourMin(detail.others.posted_date)}
                  </div>
              </figure>
              <div class="card-body">
                  <div class="flex gap-4">
                      <div class="avatar">
                          <div class="w-10 h-10 rounded-full">
                              <img src="${detail.authors[0].profile_picture}" />
                          </div>
                      </div>
                      <div>
                          <h3 class="title font-bold">${detail.title}</h3>
                          <p class="block">${detail.authors[0].profile_name} ${
        detail.authors[0].verified
          ? `<img src="icons/verified.png" class="inline"/>`
          : ""
      }</p>
                          <p>${detail.others.views} views</p>
                      </div>
                  </div>
              </div>
          </div>
  
          `;
      wrapperDiv.appendChild(div);
    });
    cardsContainer.appendChild(wrapperDiv);
  }
  if (data.length == 0) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="flex flex-col justify-center items-center mt-16">
        <img src="icons/Icon.png" class="mx-auto" alt="" />
        <h3  class=" w-full md:w-6/12 lg:w-4/12 text-3xl font-bold text-center">Oops!! Sorry, There is no content here</h3>
      </div>
    `;

    cardsContainer.appendChild(div);
  }
}

// sort view showdata
function showSortedData(data) {
  const cardsContainer = getId("cards-container");

  data.sort((a, b) => {
    return b.others.views.replace("K", "") - a.others.views.replace("K", "");
  });


  cardsContainer.innerHTML = "";
  if (data) {

    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add(
      "grid",
      "md:grid-cols-3",
      "grid-cols-1",
      "lg:grid-cols-4",
      "gap-4",
      "justify-center"
    );
    data.forEach((detail) => {
      const div = document.createElement("div");
      div.innerHTML = `

          <div class="card  shadow-md">
              <figure class="relative">
                  <img src="${
                    detail.thumbnail
                  }" class="w-full h-60 alt="Shoes" />
                  <div class="bg-black rounded-md right-2 bottom-2 text-white absolute">
                    ${secondsToHourMin(detail.others.posted_date)}
                  </div>
              </figure>
              <div class="card-body">
                  <div class="flex gap-4">
                      <div class="avatar">
                          <div class="w-10 h-10 rounded-full">
                              <img src="${detail.authors[0].profile_picture}" />
                          </div>
                      </div>
                      <div>
                          <h3 class="title font-bold">${detail.title}</h3>
                          <p class="block">${detail.authors[0].profile_name} ${
        detail.authors[0].verified
          ? `<img src="icons/verified.png" class="inline"/>`
          : ""
      }</p>
                          <p>${detail.others.views} views</p>
                      </div>
                  </div>
              </div>
          </div>
  
          `;
      wrapperDiv.appendChild(div);
    });
    cardsContainer.appendChild(wrapperDiv);
  }
  if (data.length == 0) {
    cardsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="flex flex-col justify-center items-center mt-16">
        <img src="icons/Icon.png" class="mx-auto" alt="" />
        <h3  class=" w-full md:w-6/12 lg:w-4/12 text-3xl font-bold text-center">Oops!! Sorry, There is no content here</h3>
      </div>
    `;

    cardsContainer.appendChild(div);
  }
}

// converting seconds to hour and mintues
function secondsToHourMin(seconds) {
  let hourMin = "";

  seconds = parseInt(seconds);

  const hours = Math.floor((seconds / (60 * 60)) % 24);
  const minutes = Math.floor((seconds / 60) % 60);

  if (hours > 0) {
    hourMin += `${hours}hrs `;
  }

  if (minutes > 0) {
    hourMin += `${minutes}min `;
  }

  if (hours > 0 || minutes > 0) {
    hourMin += " ago";
  }

  return hourMin;
}

getId("sort-by-view").addEventListener("click", (event) => {
  isSort = true;
  loadAllData(categoryTrackingId, isSort);
});

// getId function
function getId(id) {
  return document.getElementById(id);
}

loadAllData(categoryTrackingId, isSort);
loadCategory();
