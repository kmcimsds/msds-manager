const jsonUrls = [

  "https://raw.githubusercontent.com/kmcimsds/msds-manager/main/%EC%97%B0%EA%B5%AC3%ED%8C%80/CASE1/chemical-list.json",

  "https://raw.githubusercontent.com/kmcimsds/msds-manager/main/%EC%97%B0%EA%B5%AC3%ED%8C%80/CASE2/chemical-list.json",

  "https://raw.githubusercontent.com/kmcimsds/msds-manager/main/%EC%97%B0%EA%B5%AC3%ED%8C%80/%EB%AC%BC%EC%84%B1%EC%8B%A42/chemical-list.json",

  "https://raw.githubusercontent.com/kmcimsds/msds-manager/main/%EC%97%B0%EA%B5%AC3%ED%8C%80/%EB%A8%B8%EC%8B%A0%EB%A3%B8/chemical-list.json",

  "https://raw.githubusercontent.com/kmcimsds/msds-manager/main/%EC%97%B0%EA%B5%AC3%ED%8C%80/%ED%99%94%ED%95%99%EC%B0%BD%EA%B3%A0/chemical-list.json",

  "https://raw.githubusercontent.com/kmcimsds/msds-manager/main/%EC%97%B0%EA%B5%AC3%ED%8C%80/%EC%95%BC%EC%A0%81%EC%9E%A5/chemical-list.json"

];

let chemicalData = [];

async function loadAllData() {

  for (const url of jsonUrls) {

    try {

      const response = await fetch(url);

      const data = await response.json();

      chemicalData.push(...data);

    } catch (error) {

      console.error(error);

    }

  }

}

function renderResults(keyword) {

  const resultArea =
    document.getElementById("resultArea");

  resultArea.innerHTML = "";

  const filtered =
    chemicalData.filter(item =>
      item.chemical_name
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

  filtered.forEach(item => {

    const card = document.createElement("div");

    card.className = "card";

    const pdfUrl =
      item.pdf_link;

    card.innerHTML = `

      <h3>${item.chemical_name}</h3>

      <p><strong>CAS No:</strong> ${item.cas_no || "-"}</p>

      <p><strong>제조사:</strong> ${item.manufacturer || "-"}</p>

      <p><strong>UUID:</strong> ${item.uuid}</p>

      ${
        item.msds_uploaded
          ? `<a class="pdf-btn" href="${pdfUrl}" target="_blank">MSDS 보기</a>`
          : `<span>MSDS 미업로드</span>`
      }

    `;

    resultArea.appendChild(card);

  });

}

document
  .getElementById("searchInput")
  .addEventListener("input", e => {

    renderResults(e.target.value);

  });

loadAllData();
