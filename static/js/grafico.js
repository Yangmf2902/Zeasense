const leituras = [
    { hora: "08:00", temperatura: 24.8, umidade: 67.2, TVOC: 153, eCO2: 567 },
    { hora: "09:00", temperatura: 25.1, umidade: 67.8, TVOC: 149, eCO2: 579 },
    { hora: "10:00", temperatura: 25.4, umidade: 68.1, TVOC: 145, eCO2: 596 },
    { hora: "11:00", temperatura: 25.7, umidade: 68.7, TVOC: 142, eCO2: 601 },
    { hora: "12:00", temperatura: 26.0, umidade: 69.1, TVOC: 139, eCO2: 605 },
    { hora: "13:00", temperatura: 25.8, umidade: 68.9, TVOC: 135, eCO2: 610 },
    { hora: "14:00", temperatura: 25.7, umidade: 68.79, TVOC: 132, eCO2: 619 }
];

const contexto = document.getElementById("grafico");

const grafico = new Chart(contexto, {
    type: "line",

    data: {
        labels: leituras.map(leitura => leitura.hora),

        datasets: [
            {
                label: "Temperatura (°C)",
                data: leituras.map(leitura => leitura.temperatura),
                borderColor: "#d58b22",
                backgroundColor: "rgba(213, 139, 34, 0.15)",
                tension: 0.3,
                yAxisID: "temperatura"
            },
            {
                label: "Umidade relativa (%)",
                data: leituras.map(leitura => leitura.umidade),
                borderColor: "#168da3",
                backgroundColor: "rgba(22, 141, 163, 0.15)",
                tension: 0.3,
                yAxisID: "umidade"
            },
            {
                label: "TVOC (µgm⁻³)",
                data: leituras.map(leitura => leitura.TVOC),
                borderColor: "#d354fa",
                backgroundColor: "rgba(213, 139, 34, 0.15)",
                tension: 0.3,
                yAxisID: "TVOC"
            },
            {
                label: "eCO2 (ppm)",
                data: leituras.map(leitura => leitura.eCO2),
                borderColor: "#f16969",
                backgroundColor: "rgba(213, 139, 34, 0.15)",
                tension: 0.3,
                yAxisID: "eCO2"
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            mode: "index",
            intersect: false
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Horário"
                }
            },

            temperatura: {
                type: "linear",
                position: "left",
                title: {
                    display: true,
                    text: "Temperatura (°C)"
                }
            },
            eCO2: {
                type: "linear",
                position: "left",
                title: {
                    display: true,
                    text: "eCO2 (ppm)"
                }
            },

            umidade: {
                type: "linear",
                position: "right",
                title: {
                    display: true,
                    text: "Umidade relativa (%)"
                }
            },
            TVOC: {
                type: "linear",
                position: "right",
                title: {
                    display: true,
                    text: "TVOC (µgm⁻³)"
                }
            }
        }
    }
});

document.getElementById("exportar").addEventListener("click", () => {
    const cabecalho = "hora,temperatura_c,umidade_relativa_pct";

    const linhas = leituras.map(leitura =>
        `${leitura.hora},${leitura.temperatura},${leitura.umidade}`
    );

    const conteudo = [cabecalho, ...linhas].join("\n");

    const arquivo = new Blob(
        ["\uFEFF" + conteudo],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = "zeasense_leituras_simuladas.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});

console.info("Zeasense: gráfico carregado com dados simulados.");