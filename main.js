import { cityWheater } from "./api.js";

async function createTempArray() {
  const iquiqueData = await cityWheater("iquique");
  const calamaData = await cityWheater("calama");
  const vinaData = await cityWheater("vina+del+mar");
  const valpoData = await cityWheater("valparaiso");
  const santiagoData = await cityWheater("santiago");
  const talcaData = await cityWheater("talca");
  const concepcionData = await cityWheater("concepcion");
  const temucoData = await cityWheater("temuco");
  const valdiviaData = await cityWheater("valdivia");
  const puertomonttData = await cityWheater("puerto+montt");

  const chartClimasArray = [
    ...iquiqueData.cityWheaterTempArr,
    ...calamaData.cityWheaterTempArr,
    ...vinaData.cityWheaterTempArr,
    ...valpoData.cityWheaterTempArr,
    ...santiagoData.cityWheaterTempArr,
    ...talcaData.cityWheaterTempArr,
    ...concepcionData.cityWheaterTempArr,
    ...temucoData.cityWheaterTempArr,
    ...valdiviaData.cityWheaterTempArr,
    ...puertomonttData.cityWheaterTempArr,
  ];

  const chartFeelsLikeArray = [
    ...iquiqueData.cityWheaterFeelsLikeArr,
    ...calamaData.cityWheaterFeelsLikeArr,
    ...vinaData.cityWheaterFeelsLikeArr,
    ...valpoData.cityWheaterFeelsLikeArr,
    ...santiagoData.cityWheaterFeelsLikeArr,
    ...talcaData.cityWheaterFeelsLikeArr,
    ...concepcionData.cityWheaterFeelsLikeArr,
    ...temucoData.cityWheaterFeelsLikeArr,
    ...valdiviaData.cityWheaterFeelsLikeArr,
    ...puertomonttData.cityWheaterFeelsLikeArr,
  ];

  const chartNamesArray = [
    ...iquiqueData.name,
    ...calamaData.name,
    ...vinaData.name,
    ...valpoData.name,
    ...santiagoData.name,
    ...talcaData.name,
    ...concepcionData.name,
    ...temucoData.name,
    ...valdiviaData.name,
    ...puertomonttData.name,
  ];

  let filterTempBaja = await chartClimasArray.map((element) => {
    if (element < 10) {
      return element;
    }
  });

  let filterTempMedia = await chartClimasArray.map((element) => {
    if (element >= 10 && element < 20) {
      return element;
    }
  });

  let filterTempAlta = await chartClimasArray.map((element) => {
    if (element >= 20) {
      return element;
    }
  });

  //*** chart

  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartNamesArray,
      datasets: [
        {
          label: "Temp° Baja (<10°)",
          data: filterTempBaja,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
        {
          label: "Temp° Media (10 a 19°)",
          data: filterTempMedia,
          backgroundColor: ["rgba(47, 152, 72, 0.2)"],
          borderColor: ["rgba(47, 152, 72, 1)"],
          borderWidth: 1,
        },
        {
          label: "Temp° Alta (>=20°)",
          data: filterTempAlta,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
        // Feels Like
        {
          label: "Sensación Térmica",
          data: chartFeelsLikeArray,
          backgroundColor: [
            "rgba(255, 128, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 128, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Temperaturas por Ciudad",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + "°";
              }
              return label;
            },
          },
        },
      },
    },
  });
}

createTempArray();

const fechaActual = new Date();
console.log(fechaActual);
document.getElementById("date-now").innerHTML = `
Actualizado al día de hoy:
<br>
<i>${fechaActual}</i>`;
