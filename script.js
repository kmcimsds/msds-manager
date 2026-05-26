const resultArea =
  document.getElementById("resultArea");

const searchInput =
  document.getElementById("searchInput");


// ------------------------------------
// JSON 경로
// ------------------------------------

const jsonFiles = [

  "./연구3팀/CASE1/chemical-list.json",
  "./연구3팀/CASE2/chemical-list.json",
  "./연구3팀/물성실2/chemical-list.json",
  "./연구3팀/머신룸/chemical-list.json",
  "./연구3팀/화학창고/chemical-list.json",
  "./연구3팀/야적장/chemical-list.json"

];


// ------------------------------------
// 전체 데이터 저장
// ------------------------------------

let allChemicals = [];


// ------------------------------------
// JSON 로드
// ------------------------------------

async function loadAllChemicals() {

  for (const file of jsonFiles) {

    try {

      const response = await fetch(file);

      if (!response.ok) continue;

      const data = await response.json();

      const mapped = data.map(item => {

        return {

          ...item,

          location:
            file.split("/")[1]

        };

      });

      allChemicals.push(...mapped);

    } catch (error) {

      console.error(error);

    }

  }

  renderChemicals(allChemicals);

}


// ------------------------------------
// 화면 출력
// ------------------------------------

function renderChemicals(list) {

  resultArea.innerHTML = "";

  if (list.length === 0) {

    resultArea.innerHTML =
      `<p class="empty">검색 결과가 없습니다.</p>`;

    return;

  }

  list.forEach(item => {

    const card =
      document.createElement("div");

    card.className = "chemical-card";

    const pdfLink =
      item.pdf_link
        ? item.pdf_link
        : "#";

    const buttonText =
      item.msds_uploaded
        ? "MSDS 열기"
        : "PDF 없음";

    card.innerHTML = `

      <div class="card-header">
        ${item.chemical_name}
      </div>

      <div class="card-body">

        <p><strong>분류:</strong> ${item.category || "-"}</p>

        <p><strong>CAS No:</strong> ${item.cas_no || "-"}</p>

        <p><strong>제조사:</strong> ${item.manufacturer || "-"}</p>

      </div>

      <div class="card-footer">

        <a
          href="${pdfLink}"
          target="_blank"
          class="pdf-button"
        >
          ${buttonText}
        </a>

      </div>

    `;

    resultArea.appendChild(card);

  });

}


// ------------------------------------
// 검색
// ------------------------------------

searchInput.addEventListener("input", () => {

  const keyword =
    searchInput.value.toLowerCase();

  const filtered =
    allChemicals.filter(item => {

      return (

        item.chemical_name &&
        item.chemical_name
          .toLowerCase()
          .includes(keyword)

      );

    });

  renderChemicals(filtered);

});


// ------------------------------------
// 시작
// ------------------------------------

loadAllChemicals();
