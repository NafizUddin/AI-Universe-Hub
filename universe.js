const loadContent = async (isSeeMore) => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const data = await response.json();
  const contents = data.data.tools;
  displayContent(contents, isSeeMore);
};

const displayContent = (contents, isSeeMore) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (!isSeeMore) {
    contents = contents.slice(0, 6);
  }

  contents.forEach((obj) => {
    const card = document.createElement("div");
    card.classList = `card bg-base-100 shadow-xl`;
    card.innerHTML = `
    <figure class="px-5 pt-5 rounded-2xl">
          <img class="w-full h-[250px]" src="${
            obj?.image.endsWith("Jasper%20copy.jpg")
              ? "./jasper-ai.jpg"
              : obj?.image
          }" />
          </figure>
          <div class="card-body">
            <div class="border-b border-gray-800 border-opacity-20 pb-3">
              <h2 class="card-title -mt-3">Features</h2>
              <ol class="text-[#585858]">
                <li>${obj?.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}</li>

              </ol>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-2xl font-semibold pt-3 mb-3">${obj.name}</h2>
                <div class="flex gap-3">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"
                        stroke="#585858"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p>${obj?.published_in}</p>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75"
                    stroke="#EB5757"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
    `;
    cardContainer.appendChild(card);
  });
};

const showAllCards = () => {
  //   const sorted = localStorage.getItem("sorted");

  loadContent(true);
  const seeMoreBtn = document.getElementById("seeMore-btn");
  seeMoreBtn.classList.add("hidden");
  //   if (sorted === "true") {
  //     console.log("Yes");
  //     sortByDate();
  //     loadContent(true);
  //     const seeMoreBtn = document.getElementById("seeMore-btn");
  //     seeMoreBtn.classList.add("hidden");
  //   } else {
  //     console.log("No");
  //     loadContent(true);
  //     const seeMoreBtn = document.getElementById("seeMore-btn");
  //     seeMoreBtn.classList.add("hidden");
  //   }
};

const sortByDate = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const data = await response.json();
  const contents = data.data.tools;

  contents.sort((a, b) => {
    const date1 = new Date(a?.published_in);
    const date2 = new Date(b?.published_in);
    if (date1 > date2) return 1;
    else if (date2 > date1) return -1;

    return 0;
  });

  //   localStorage.setItem("sorted", "true");
  displayContent(contents, false);
};

loadContent();
