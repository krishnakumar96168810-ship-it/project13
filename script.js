// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});


// ========================================
// DARK / LIGHT MODE
// ========================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


// ========================================
// ANIMATED COUNTERS
// ========================================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 80;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        };

        updateCounter();

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    observer.observe(counter);
});


// ========================================
// COST CALCULATOR
// ========================================

function calculateCost() {

    const chargerPrice =
        Number(document.getElementById("chargerType").value);

    const chargerCount =
        Number(document.getElementById("chargerCount").value);

    if (chargerCount < 1) {

        alert("Please enter at least 1 charger.");

        return;
    }

    const total = chargerPrice * chargerCount;

    document.getElementById("costResult").textContent =
        formatIndianCurrency(total);

}


// ========================================
// INDIAN CURRENCY FORMAT
// ========================================

function formatIndianCurrency(number) {

    return "₹" + number.toLocaleString("en-IN");

}


// ========================================
// CASE STUDY DATA
// ========================================

const casestudies = {

    India: {

        title: "India — Charging Infrastructure",

        text:
        "India is expanding public EV charging infrastructure alongside electric mobility. Charging projects can combine AC charging, DC fast charging, renewable energy, battery storage and digital payment systems. Site-specific grid capacity, land, electrical connection and local regulations strongly influence project design and cost."

    },

    China: {

        title: "China — High-Power Charging & Battery Swap",

        text:
        "China has developed large-scale EV charging networks and battery-swapping systems. Companies including NIO have developed automated battery-swapping stations, while high-power charging technologies are being developed for rapid energy delivery."

    },

    USA: {

        title: "USA — Highway Fast Charging",

        text:
        "The US charging ecosystem includes extensive public fast-charging infrastructure supporting long-distance EV travel. Highway charging locations typically require substantial electrical infrastructure, site planning, payment systems and reliable high-power equipment."

    },

    Europe: {

        title: "Europe — Electrified Corridors",

        text:
        "European charging infrastructure is expanding across highways, cities, workplaces and commercial locations. High-power corridor charging and standardized charging infrastructure support long-distance electric mobility."

    }

};


// ========================================
// OPEN CASE STUDY
// ========================================

function showCase(country) {

    const data = caseStudies[country];

    document.getElementById("modalCountry").textContent =
        country.toUpperCase();

    document.getElementById("modalTitle").textContent =
        data.title;

    document.getElementById("modalText").textContent =
        data.text;

    document.getElementById("caseModal")
        .classList.add("active");

}


// ========================================
// CLOSE CASE STUDY
// ========================================

function closeCase() {

    document.getElementById("caseModal")
        .classList.remove("active");

}


// Close modal by clicking outside

document.getElementById("caseModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeCase();
        }

    });


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5,8,7,0.92)";

    } else {

        navbar.style.background =
            "rgba(5,8,7,0.75)";

    }

});


// =====================================================
// INTERACTIVE EV STATION DESIGNER
// =====================================================

const designCharger =
    document.getElementById("designCharger");

const designNumber =
    document.getElementById("designNumber");

const solarInput =
    document.getElementById("solarInput");

const batteryInput =
    document.getElementById("batteryInput");

const gridInput =
    document.getElementById("gridInput");


// =====================================================
// RANGE VALUE DISPLAY
// =====================================================

function updateRangeLabels() {

    document.getElementById("chargerNumberValue")
        .textContent =
        designNumber.value;

    document.getElementById("solarValue")
        .textContent =
        solarInput.value + " kWp";

    document.getElementById("batteryValue")
        .textContent =
        batteryInput.value + " kWh";

}


// Run when slider changes

designNumber.addEventListener(
    "input",
    updateRangeLabels
);

solarInput.addEventListener(
    "input",
    updateRangeLabels
);

batteryInput.addEventListener(
    "input",
    updateRangeLabels
);


// =====================================================
// MAIN STATION CALCULATION
// =====================================================

function updateStationDesign() {

    // Charger power in kW

    const chargerPower =
        Number(designCharger.value);


    // Number of chargers

    const numberOfChargers =
        Number(designNumber.value);


    // Solar capacity

    const solarCapacity =
        Number(solarInput.value);


    // Battery capacity

    const batteryCapacity =
        Number(batteryInput.value);


    // Grid connection

    const gridCapacity =
        Number(gridInput.value);


    // =================================================
    // TOTAL CHARGING POWER
    // =================================================

    const totalPower =
        chargerPower * numberOfChargers;


    // =================================================
    // UPDATE POWER VALUES
    // =================================================

    document.getElementById("totalPower")
        .textContent =
        formatPower(totalPower);


    document.getElementById("chargingPower")
        .textContent =
        formatPower(totalPower);


    document.getElementById("solarResult")
        .textContent =
        solarCapacity + " kWp";


    document.getElementById("batteryResult")
        .textContent =
        batteryCapacity + " kWh";


    document.getElementById("gridResult")
        .textContent =
        formatPower(gridCapacity);


    // =================================================
    // ENERGY FLOW
    // =================================================

    document.getElementById("flowSolar")
        .textContent =
        solarCapacity + " kWp";


    document.getElementById("flowBattery")
        .textContent =
        batteryCapacity + " kWh";


    document.getElementById("flowGrid")
        .textContent =
        formatPower(gridCapacity);


    document.getElementById("flowChargers")
        .textContent =
        numberOfChargers +
        " × " +
        chargerPower +
        " kW";


    // =================================================
    // GRID CAPACITY CHECK
    // =================================================

    const status =
        document.getElementById("stationStatus");

    const message =
        document.getElementById(
            "engineeringMessage"
        );


    if (gridCapacity >= totalPower) {

        status.innerHTML =
            `
            <span></span>
            GRID CAPACITY OK
            `;

        message.textContent =
            `The selected ${gridCapacity} kW grid
            connection is equal to or greater than the
            calculated ${totalPower} kW maximum charger
            load. This is a preliminary load assessment;
            actual electrical design should include
            diversity, demand management, auxiliary loads,
            protection and applicable electrical standards.`;

    } else {

        status.innerHTML =
            `
            <span></span>
            GRID UPGRADE REQUIRED
            `;

        message.textContent =
            `The calculated maximum charging load is
            ${totalPower} kW, while the selected grid
            connection is ${gridCapacity} kW.
            A larger connection, load management,
            battery storage or a different charger
            configuration may be required. Final sizing
            requires a detailed electrical study.`;

    }


    // =================================================
    // SOLAR CONTRIBUTION CHECK
    // =================================================

    if (solarCapacity >= totalPower) {

        message.textContent +=
            ` The selected solar capacity is at least
            equal to the nominal charging load, although
            actual simultaneous solar-to-EV supply depends
            on irradiance, inverter limits and operating
            conditions.`;

    } else {

        message.textContent +=
            ` Solar PV capacity is ${solarCapacity} kWp,
            so grid and/or battery energy will normally
            remain important during periods when solar
            generation is insufficient.`;

    }

}


// =====================================================
// POWER FORMAT
// =====================================================

function formatPower(power) {

    if (power >= 1000) {

        return (
            (power / 1000)
                .toFixed(2)
                .replace(".00", "")
            + " MW"
        );

    }

    return power + " kW";
}


// =====================================================
// AUTOMATIC LIVE UPDATE
// =====================================================

// Update the design immediately when the user
// changes any configuration.

designCharger.addEventListener(
    "change",
    updateStationDesign
);

designNumber.addEventListener(
    "input",
    updateStationDesign
);

solarInput.addEventListener(
    "input",
    updateStationDesign
);

batteryInput.addEventListener(
    "input",
    updateStationDesign
);

gridInput.addEventListener(
    "change",
    updateStationDesign
);


// =====================================================
// INITIAL DESIGN
// =====================================================

updateRangeLabels();

updateStationDesign();


// =====================================================
// PART 3 — EV CHARGING STATION ROI CALCULATOR
// =====================================================


// =====================================================
// GET INPUT VALUE
// =====================================================

function getNumber(id) {

    return Number(
        document.getElementById(id).value
    ) || 0;

}


// =====================================================
// MAIN ROI CALCULATOR
// =====================================================

function calculateROI() {


    // =================================================
    // CAPEX INPUTS
    // =================================================

    const chargers =
        getNumber("roiChargers");

    const chargerPower =
        getNumber("roiPower");

    const chargerCost =
        getNumber("chargerCost");

    const gridCost =
        getNumber("gridCost");

    const civilCost =
        getNumber("civilCost");

    const solarCapacity =
        getNumber("roiSolar");

    const solarCost =
        getNumber("solarCost");

    const batteryCapacity =
        getNumber("roiBattery");

    const batteryCost =
        getNumber("batteryCost");

    const landCost =
        getNumber("landCost");

    const softwareCost =
        getNumber("softwareCost");

    const contingencyPercent =
        getNumber("contingency");


    // =================================================
    // OPERATING INPUTS
    // =================================================

    const sessionsPerDay =
        getNumber("sessionsDay");

    const energyPerSession =
        getNumber("energySession");

    const chargingTariff =
        getNumber("chargingTariff");

    const electricityPrice =
        getNumber("electricityCost");

    const maintenance =
        getNumber("maintenanceCost");

    const otherOpex =
        getNumber("otherOpex");


    // =================================================
    // CAPEX CALCULATION
    // =================================================


    // Charger hardware

    const chargerCAPEX =
        chargers * chargerCost;


    // Solar

    const solarCAPEX =
        solarCapacity * solarCost;


    // Battery

    const batteryCAPEX =
        batteryCapacity * batteryCost;


    // Base CAPEX before contingency

    const baseCAPEX =
        chargerCAPEX +
        gridCost +
        civilCost +
        solarCAPEX +
        batteryCAPEX +
        landCost +
        softwareCost;


    // Contingency

    const contingencyAmount =
        baseCAPEX *
        (contingencyPercent / 100);


    // Total investment

    const totalInvestment =
        baseCAPEX +
        contingencyAmount;


    // =================================================
    // ENERGY CALCULATION
    // =================================================


    // Energy sold per day

    const dailyEnergy =
        sessionsPerDay *
        energyPerSession;


    // Energy sold per year

    const annualEnergy =
        dailyEnergy * 365;


    // =================================================
    // REVENUE
    // =================================================


    const dailyRevenue =
        dailyEnergy *
        chargingTariff;


    const annualRevenue =
        dailyRevenue * 365;


    // =================================================
    // ELECTRICITY COST
    // =================================================


    const dailyElectricityCost =
        dailyEnergy *
        electricityPrice;


    const annualElectricityCost =
        dailyElectricityCost * 365;


    // =================================================
    // OPERATING COST
    // =================================================


    const annualOpex =
        annualElectricityCost +
        maintenance +
        otherOpex;


    // =================================================
    // OPERATING SURPLUS
    // =================================================


    const operatingSurplus =
        annualRevenue -
        annualOpex;


    // =================================================
    // SIMPLE PAYBACK
    // =================================================

    let paybackYears = 0;


    if (operatingSurplus > 0) {

        paybackYears =
            totalInvestment /
            operatingSurplus;

    } else {

        paybackYears = Infinity;

    }


    // =================================================
    // UPDATE RESULTS
    // =================================================


    document.getElementById("totalInvestment")
        .textContent =
        formatINR(totalInvestment);


    document.getElementById("dailyEnergy")
        .textContent =
        formatNumber(dailyEnergy) + " kWh";


    document.getElementById("annualEnergy")
        .textContent =
        formatNumber(
            annualEnergy / 1000
        ) + " MWh";


    document.getElementById("annualRevenue")
        .textContent =
        formatINR(annualRevenue);


    document.getElementById("annualElectricity")
        .textContent =
        formatINR(
            annualElectricityCost
        );


    document.getElementById("annualOpex")
        .textContent =
        formatINR(annualOpex);


    document.getElementById("operatingProfit")
        .textContent =
        formatINR(operatingSurplus);


    // =================================================
    // PAYBACK DISPLAY
    // =================================================


    const paybackElement =
        document.getElementById("payback");


    const statusElement =
        document.getElementById("projectStatus");


    if (
        operatingSurplus > 0 &&
        isFinite(paybackYears)
    ) {

        paybackElement.textContent =
            paybackYears.toFixed(1)
            + " years";


        statusElement.textContent =
            "POSITIVE OPERATING SURPLUS";

    } else {

        paybackElement.textContent =
            "Not achieved";


        statusElement.textContent =
            "NEGATIVE OPERATING SURPLUS";

    }


    // =================================================
    // CAPEX BREAKDOWN
    // =================================================


    document.getElementById("breakCharger")
        .textContent =
        formatINR(chargerCAPEX);


    document.getElementById("breakGrid")
        .textContent =
        formatINR(gridCost);


    document.getElementById("breakCivil")
        .textContent =
        formatINR(civilCost);


    document.getElementById("breakSolar")
        .textContent =
        formatINR(solarCAPEX);


    document.getElementById("breakBattery")
        .textContent =
        formatINR(batteryCAPEX);


    document.getElementById("breakLand")
        .textContent =
        formatINR(landCost);


    document.getElementById("breakSoftware")
        .textContent =
        formatINR(softwareCost);


    document.getElementById("breakContingency")
        .textContent =
        formatINR(contingencyAmount);


    // =================================================
    // CONSOLE ENGINEERING DATA
    // =================================================

    console.log(
        "EV Charging Station Analysis"
    );

    console.log(
        "Total Charger Power:",
        chargers * chargerPower,
        "kW"
    );

    console.log(
        "Total CAPEX:",
        totalInvestment
    );

    console.log(
        "Annual Energy:",
        annualEnergy,
        "kWh"
    );

    console.log(
        "Annual Revenue:",
        annualRevenue
    );

    console.log(
        "Annual OPEX:",
        annualOpex
    );

    console.log(
        "Operating Surplus:",
        operatingSurplus
    );

}


// =====================================================
// INDIAN CURRENCY FORMAT
// =====================================================

function formatINR(value) {

    if (!isFinite(value)) {

        return "₹0";

    }

    return "₹" +
        Math.round(value)
        .toLocaleString("en-IN");

}


// =====================================================
// NUMBER FORMAT
// =====================================================

function formatNumber(value) {

    return Math.round(value)
        .toLocaleString("en-IN");

}


// =====================================================
// AUTO CALCULATE WHEN INPUT CHANGES
// =====================================================

const roiInputs = [

    "roiChargers",
    "roiPower",
    "chargerCost",
    "gridCost",
    "civilCost",
    "roiSolar",
    "solarCost",
    "roiBattery",
    "batteryCost",
    "landCost",
    "softwareCost",
    "contingency",
    "sessionsDay",
    "energySession",
    "chargingTariff",
    "electricityCost",
    "maintenanceCost",
    "otherOpex"

];


roiInputs.forEach(id => {

    const element =
        document.getElementById(id);

    if (element) {

        element.addEventListener(
            "input",
            calculateROI
        );

        element.addEventListener(
            "change",
            calculateROI
        );

    }

});


// =====================================================
// INITIAL CALCULATION
// =====================================================

calculateROI();



/* =====================================================
   PART 4 - GLOBAL CASE STUDIES
===================================================== */


/* FILTER CASE STUDIES */

function filterCases(region, button) {

    const cards = document.querySelectorAll(".case-card");
    const buttons = document.querySelectorAll(".case-filter-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    cards.forEach(card => {

        const cardRegion = card.dataset.region;

        if (region === "all" || cardRegion === region) {

            card.style.display = "block";

            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 20);

        } else {

            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";

            setTimeout(() => {
                card.style.display = "none";
            }, 250);

        }

    });

}


/* =====================================================
   CASE STUDY DATABASE
===================================================== */

const caseStudies = {

    india: {

        title: "🇮🇳 India — EV Charging Infrastructure",

        text: `
            India is developing public EV charging infrastructure
            across urban centres and major transport corridors.
            The charging ecosystem includes AC charging, DC fast
            charging, renewable-energy integration and fleet charging.
        `,

        points: [
            "Public charging infrastructure is expanding rapidly.",
            "Charging demand is increasing with EV adoption.",
            "Highway corridors require reliable DC fast charging.",
            "Solar PV and battery storage can reduce grid demand.",
            "Site selection and electricity tariffs strongly affect economics."
        ],

        highlight:
            "IEA estimates India's public charging stock reached about 88,000 points at the end of 2025."
    },


    china: {

        title: "🇨🇳 China — Large-Scale Charging Network",

        text: `
            China has developed the world's largest public EV charging
            network. Large-scale deployment includes conventional AC
            chargers, DC fast chargers and increasingly powerful
            charging systems.
        `,

        points: [
            "China accounted for more than 65% of global public charging points at the end of 2025.",
            "More than 4.7 million public charging points were estimated at the end of 2025.",
            "Fast and ultra-fast charging deployment is accelerating.",
            "High charging density supports large EV fleets.",
            "Grid planning becomes increasingly important at high-power sites."
        ],

        highlight:
            "The IEA reports that China added more than 1.3 million public charging points during 2025."
    },


    usa: {

        title: "🇺🇸 USA — Highway Fast Charging",

        text: `
            The US charging ecosystem combines home charging,
            destination charging and high-power public charging.
            Highway corridors are an important application for
            DC fast charging.
        `,

        points: [
            "Public charging expanded significantly during 2025.",
            "Fast and ultra-fast chargers represent a growing share.",
            "Highway charging requires reliable uptime.",
            "Interoperability and connector availability are important.",
            "Large charging hubs can require substantial grid capacity."
        ],

        highlight:
            "IEA reports that US fast and ultra-fast public charging points grew by about 30% during 2025."
    },


    europe: {

        title: "🇪🇺 Europe — High-Speed Charging Corridors",

        text: `
            European charging development combines urban charging,
            destination charging and high-power motorway corridors.
            Regulations and cross-border travel are important drivers
            of infrastructure development.
        `,

        points: [
            "Europe had more than 1 million public charging points in 2025.",
            "Ultra-fast charging deployment is accelerating.",
            "Major highways require higher-power charging.",
            "Charging networks need interoperability.",
            "Renewable energy integration can support future charging hubs."
        ],

        highlight:
            "IEA reports that European Union ultra-fast charging points increased by around 30% from 2024 to 2025."
    },


    nio: {

        title: "🔋 NIO — Battery Swap",

        text: `
            Battery swapping is an alternative to conventional plug-in
            charging. Instead of waiting for a battery to charge,
            a compatible vehicle can exchange its depleted battery
            for a charged battery.
        `,

        points: [
            "NIO Power Swap Station 4.0 supports automated battery swapping.",
            "The company states that the Gen-4 station can complete a swap in 144 seconds.",
            "The station design includes storage for multiple batteries.",
            "Battery swapping can provide rapid energy replenishment.",
            "The model requires compatible vehicle and battery infrastructure."
        ],

        highlight:
            "NIO states that Power Swap Station 4.0 can perform a battery swap in 144 seconds and accommodate up to 23 batteries."
    },


    byd: {

        title: "⚡ BYD — Megawatt Flash Charging",

        text: `
            BYD introduced its Super e-Platform with a high-voltage
            architecture designed for very high charging power.
            The system demonstrates the direction of next-generation
            ultra-fast charging.
        `,

        points: [
            "BYD announced a 1 MW charging capability.",
            "The Super e-Platform uses a 1000 V architecture.",
            "The system targets extremely rapid charging.",
            "High-power charging requires advanced thermal management.",
            "Grid infrastructure must support large instantaneous loads."
        ],

        highlight:
            "BYD announced a 1 MW charging system in March 2025, with the company stating that compatible vehicles can add substantial range in minutes."
    }

};


/* =====================================================
   OPEN MODAL
===================================================== */

function openCaseStudy(id) {

    const modal = document.getElementById("caseModal");
    const content = document.getElementById("caseModalContent");

    const data = caseStudies[id];

    if (!data) return;

    let listHTML = "";

    data.points.forEach(point => {

        listHTML += `
            <li>
                <i class="fa-solid fa-circle-check"
                   style="color:#39ff88;margin-right:8px;">
                </i>
                ${point}
            </li>
        `;

    });

    content.innerHTML = `

        <h2 class="modal-title">
            ${data.title}
        </h2>

        <p class="modal-text">
            ${data.text}
        </p>

        <ul class="modal-list">
            ${listHTML}
        </ul>

        <div class="modal-highlight">
            <strong>Key data:</strong><br><br>
            ${data.highlight}
        </div>

    `;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeCaseStudy() {

    const modal = document.getElementById("caseModal");

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


/* CLOSE BY CLICKING OUTSIDE */

document.addEventListener("click", function(event) {

    const modal = document.getElementById("caseModal");

    if (event.target === modal) {

        closeCaseStudy();

    }

});


/* CLOSE WITH ESC */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeCaseStudy();

    }

});


/* =====================================================
   PART 5 - ENGINEERING DESIGN CALCULATOR
===================================================== */

function calculateEngineering() {

    /* INPUTS */

    const chargerPower =
        Number(document.getElementById("engChargerPower").value);

    const chargerCount =
        Number(document.getElementById("engChargerCount").value);

    const voltage =
        Number(document.getElementById("engVoltage").value);

    const pf =
        Number(document.getElementById("engPF").value);

    const diversity =
        Number(document.getElementById("engDiversity").value);

    const cableLength =
        Number(document.getElementById("engCableLength").value);

    const cableSize =
        Number(document.getElementById("engCableSize").value);

    const solar =
        Number(document.getElementById("engSolar").value);

    const battery =
        Number(document.getElementById("engBattery").value);


    /* =================================================
       1. CONNECTED LOAD
    ================================================= */

    const connectedLoad =
        chargerPower * chargerCount;


    /* =================================================
       2. DIVERSIFIED DESIGN LOAD
    ================================================= */

    const designLoad =
        connectedLoad * diversity;


    /* =================================================
       3. APPARENT POWER
    ================================================= */

    const kva =
        designLoad / pf;


    /* =================================================
       4. THREE-PHASE CURRENT

       I = P / √3 V PF
    ================================================= */

    const current =
        (designLoad * 1000) /
        (Math.sqrt(3) * voltage * pf);


    /* =================================================
       5. TRANSFORMER SELECTION

       Select next standard planning value.
    ================================================= */

    const transformerSizes = [
        100,
        160,
        200,
        250,
        315,
        400,
        500,
        630,
        750,
        1000,
        1250,
        1600,
        2000,
        2500
    ];

    let transformer = transformerSizes[
        transformerSizes.length - 1
    ];

    for (let size of transformerSizes) {

        if (size >= kva) {

            transformer = size;

            break;

        }

    }


    /* =================================================
       6. BREAKER SELECTION

       Preliminary rounded selection.
    ================================================= */

    const breakerSizes = [
        63,
        100,
        125,
        160,
        200,
        250,
        315,
        400,
        500,
        630,
        800,
        1000,
        1250,
        1600,
        2000
    ];

    let breaker = breakerSizes[
        breakerSizes.length - 1
    ];

    for (let size of breakerSizes) {

        if (size >= current * 1.25) {

            breaker = size;

            break;

        }

    }


    /* =================================================
       7. CABLE CURRENT CAPACITY

       Simplified educational reference values.

       Actual ampacity depends on:
       - conductor material
       - insulation
       - installation
       - ambient temperature
       - grouping
       - soil/duct
       - correction factors
    ================================================= */

    const cableAmpacity = {

        35: 125,
        50: 150,
        70: 195,
        95: 235,
        120: 270,
        150: 310,
        185: 350,
        240: 415

    };


    const ampacity =
        cableAmpacity[cableSize] || 0;


    let cableStatus;

    if (ampacity >= current * 1.25) {

        cableStatus =
            "✓ Preliminary adequate (" +
            ampacity +
            " A)"

    } else {

        cableStatus =
            "⚠ Increase cable size"

    }


    /* =================================================
       8. VOLTAGE DROP

       Simplified copper resistance approximation.

       R ≈ 0.0175 / A Ω/m

       ΔV ≈ √3 × I × R × L
    ================================================= */

    const resistancePerMeter =
        0.0175 / cableSize;

    const voltageDropValue =
        Math.sqrt(3) *
        current *
        resistancePerMeter *
        cableLength;

    const voltageDropPercent =
        (voltageDropValue / voltage) * 100;


    /* =================================================
       9. SOLAR CONTRIBUTION
    ================================================= */

    const solarContribution =
        Math.min(
            (solar / designLoad) * 100,
            100
        );


    /* =================================================
       10. BATTERY DURATION
    ================================================= */

    const batteryDuration =
        designLoad > 0
            ? battery / designLoad
            : 0;


    /* =================================================
       UPDATE RESULTS
    ================================================= */

    document.getElementById(
        "engConnectedLoad"
    ).textContent =
        connectedLoad.toFixed(1) + " kW";


    document.getElementById(
        "engDesignLoad"
    ).textContent =
        designLoad.toFixed(1) + " kW";


    document.getElementById(
        "engKVA"
    ).textContent =
        kva.toFixed(1) + " kVA";


    document.getElementById(
        "engCurrent"
    ).textContent =
        current.toFixed(0) + " A";


    document.getElementById(
        "engTransformer"
    ).textContent =
        transformer + " kVA";


    document.getElementById(
        "engBreaker"
    ).textContent =
        breaker + " A";


    document.getElementById(
        "cableCheck"
    ).textContent =
        cableStatus;


    document.getElementById(
        "voltageDrop"
    ).textContent =
        voltageDropValue.toFixed(2) +
        " V (" +
        voltageDropPercent.toFixed(2) +
        "%)";


    document.getElementById(
        "solarContribution"
    ).textContent =
        solarContribution.toFixed(1) +
        "% of design load";


    document.getElementById(
        "batteryDuration"
    ).textContent =
        batteryDuration.toFixed(2) +
        " hours";


    /* =================================================
       UPDATE SINGLE-LINE DIAGRAM
    ================================================= */

    document.getElementById(
        "slSolar"
    ).textContent =
        solar + " kWp";


    document.getElementById(
        "slBattery"
    ).textContent =
        battery + " kWh";


    document.getElementById(
        "slChargers"
    ).textContent =
        chargerCount +
        " × " +
        chargerPower +
        " kW";


    document.getElementById(
        "slVoltage"
    ).textContent =
        voltage + " V";

}


/* =====================================================
   AUTOMATIC CALCULATION
===================================================== */

const engineeringInputs = [

    "engChargerPower",
    "engChargerCount",
    "engVoltage",
    "engPF",
    "engDiversity",
    "engCableLength",
    "engCableSize",
    "engSolar",
    "engBattery"

];


engineeringInputs.forEach(id => {

    const element =
        document.getElementById(id);

    if (element) {

        element.addEventListener(
            "input",
            calculateEngineering
        );

        element.addEventListener(
            "change",
            calculateEngineering
        );

    }

});


/* INITIAL CALCULATION */

calculateEngineering();


/* =====================================================
   PART 6 - SITE LAYOUT DESIGNER
===================================================== */


/* GENERATE PARKING BAYS */

function generateParkingBays() {

    const container =
        document.getElementById("parkingContainer");

    const parkingCount =
        Number(
            document.getElementById("parkingBays").value
        );

    container.innerHTML = "";


    for (let i = 1; i <= parkingCount; i++) {

        const bay =
            document.createElement("div");

        bay.className =
            "parking-bay";

        bay.innerHTML = `

            <i class="fa-solid fa-car"></i>

            <span>
                BAY ${i}
            </span>

        `;

        container.appendChild(bay);

    }

}


/* GENERATE CHARGERS */

function generateChargers() {

    const container =
        document.getElementById("chargerArea");

    const count =
        Number(
            document.getElementById("siteChargers").value
        );

    const power =
        Number(
            document.getElementById("siteChargerPower").value
        );

    container.innerHTML = "";


    for (let i = 1; i <= count; i++) {

        const charger =
            document.createElement("div");

        charger.className =
            "charger-unit";

        charger.innerHTML = `

            <i class="fa-solid fa-bolt"></i>

            <span>
                ${power} kW
            </span>

        `;

        container.appendChild(charger);

    }

}


/* UPDATE COMPONENT VISIBILITY */

function updateSiteComponents() {

    const solar =
        document.getElementById("solarCanopy").value;

    const bess =
        document.getElementById("siteBess").value;


    const solarComponent =
        document.getElementById("solarComponent");

    const bessComponent =
        document.getElementById("bessComponent");


    if (solar === "yes") {

        solarComponent.style.display =
            "flex";

    } else {

        solarComponent.style.display =
            "none";

    }


    if (bess === "yes") {

        bessComponent.style.display =
            "flex";

    } else {

        bessComponent.style.display =
            "none";

    }

}


/* UPDATE TRANSFORMER */

function updateTransformer() {

    const transformer =
        document.getElementById(
            "siteTransformer"
        ).value;


    const transformerElement =
        document.getElementById(
            "transformerComponent"
        );


    transformerElement.querySelector(
        "span"
    ).textContent =
        transformer + " kVA";

}


/* CALCULATE SITE METRICS */

function calculateSiteMetrics() {

    const width =
        Number(
            document.getElementById(
                "siteWidth"
            ).value
        );

    const length =
        Number(
            document.getElementById(
                "siteLength"
            ).value
        );

    const parking =
        Number(
            document.getElementById(
                "parkingBays"
            ).value
        );

    const chargers =
        Number(
            document.getElementById(
                "siteChargers"
            ).value
        );

    const power =
        Number(
            document.getElementById(
                "siteChargerPower"
            ).value
        );


    /* SITE AREA */

    const siteArea =
        width * length;


    /*
       Preliminary parking allowance.

       30 m² / bay is used only
       as a conceptual planning value.
    */

    const parkingArea =
        parking * 30;


    /* INSTALLED POWER */

    const installedPower =
        chargers * power;


    /* UTILIZATION */

    const utilization =
        siteArea > 0
            ? (parkingArea / siteArea) * 100
            : 0;


    document.getElementById(
        "siteArea"
    ).textContent =
        siteArea.toLocaleString() +
        " m²";


    document.getElementById(
        "parkingArea"
    ).textContent =
        parkingArea.toLocaleString() +
        " m²";


    document.getElementById(
        "installedPower"
    ).textContent =
        installedPower +
        " kW";


    document.getElementById(
        "siteUtilization"
    ).textContent =
        utilization.toFixed(1) +
        "%";


    /* SCALE */

    document.getElementById(
        "siteScale"
    ).textContent =
        width +
        " m × " +
        length +
        " m";


    /* STATION TYPE */

    const stationType =
        document.getElementById(
            "stationType"
        ).value;


    const typeNames = {

        urban:
            "Urban Charging Station",

        highway:
            "Highway Charging Hub",

        fleet:
            "Fleet Charging Depot"

    };


    document.getElementById(
        "stationTypeLabel"
    ).textContent =
        typeNames[stationType] ||
        "EV Charging Station";

}


/* MAIN GENERATOR */

function generateSiteLayout() {

    generateParkingBays();

    generateChargers();

    updateSiteComponents();

    updateTransformer();

    calculateSiteMetrics();

}


/* RESET */

function resetSiteLayout() {

    document.getElementById(
        "siteWidth"
    ).value = 40;


    document.getElementById(
        "siteLength"
    ).value = 60;


    document.getElementById(
        "parkingBays"
    ).value = 8;


    document.getElementById(
        "siteChargers"
    ).value = 4;


    document.getElementById(
        "siteChargerPower"
    ).value = 60;


    document.getElementById(
        "solarCanopy"
    ).value = "yes";


    document.getElementById(
        "siteBess"
    ).value = "yes";


    document.getElementById(
        "siteTransformer"
    ).value = 500;


    document.getElementById(
        "stationType"
    ).value = "highway";


    generateSiteLayout();

}


/* =====================================================
   AUTO UPDATE
===================================================== */

const siteInputs = [

    "siteWidth",
    "siteLength",
    "parkingBays",
    "siteChargers",
    "siteChargerPower",
    "solarCanopy",
    "siteBess",
    "siteTransformer",
    "stationType"

];


siteInputs.forEach(id => {

    const element =
        document.getElementById(id);

    if (element) {

        element.addEventListener(
            "input",
            generateSiteLayout
        );

        element.addEventListener(
            "change",
            generateSiteLayout
        );

    }

});


/* =====================================================
   EXPORT SITE LAYOUT
===================================================== */

function downloadSiteLayout() {

    const canvas =
        document.getElementById(
            "siteCanvas"
        );


    /*
       html2canvas must be loaded
       for PNG export.
    */

    if (typeof html2canvas === "undefined") {

        alert(
            "Add html2canvas CDN to export the layout."
        );

        return;

    }


    html2canvas(canvas, {

        backgroundColor:
            "#0c1511",

        scale: 2

    }).then(imageCanvas => {

        const link =
            document.createElement("a");

        link.download =
            "EV-Charging-Station-Site-Layout.png";

        link.href =
            imageCanvas.toDataURL(
                "image/png"
            );

        link.click();

    });

}


/* INITIAL */

generateSiteLayout();

/* =========================================================
   PART 7 — LIVE ENERGY MANAGEMENT SYSTEM
========================================================= */

let emsMode = "AUTO";

let solarPower = 85;
let evPower = 160;
let gridPower = 75;
let batteryPower = 25;
let batterySOC = 72;

let solarEnergy = 412;
let evEnergy = 685;
let sessions = 23;


/* ---------------------------------------------------------
   UPDATE CLOCK
--------------------------------------------------------- */

function updateEMSClock() {

    const now = new Date();

    const time = now.toLocaleTimeString();

    const timeElement = document.getElementById("emsTime");

    if (timeElement) {
        timeElement.textContent = time;
    }
}


/* ---------------------------------------------------------
   RANDOM LIVE SIMULATION
--------------------------------------------------------- */

function updateEMSSimulation() {

    /*
       Small changes simulate real sensor readings.
    */

    solarPower += (Math.random() * 12) - 6;

    evPower += (Math.random() * 10) - 5;

    batteryPower += (Math.random() * 6) - 3;


    /*
       Keep values inside realistic limits.
    */

    solarPower = Math.max(20, Math.min(150, solarPower));

    evPower = Math.max(50, Math.min(240, evPower));

    batteryPower = Math.max(5, Math.min(60, batteryPower));


    /*
       Calculate grid requirement.
    */

    gridPower =
        evPower -
        solarPower -
        batteryPower;


    /*
       Grid cannot be negative.
    */

    gridPower = Math.max(0, gridPower);


    /*
       Battery SOC simulation.
    */

    batterySOC += (Math.random() * 1.4) - 0.7;

    batterySOC =
        Math.max(20, Math.min(95, batterySOC));


    /*
       Energy accumulation.
    */

    solarEnergy += solarPower / 3600;

    evEnergy += evPower / 3600;


    updateEMSDisplay();

}


/* ---------------------------------------------------------
   UPDATE DISPLAY
--------------------------------------------------------- */

function updateEMSDisplay() {

    /*
       Main energy flow
    */

    setText("solarPower", Math.round(solarPower));

    setText("emsPower", Math.round(
        solarPower +
        gridPower +
        batteryPower
    ));

    setText("evPower", Math.round(evPower));

    setText("gridPower", Math.round(gridPower));

    setText("batteryPower", Math.round(batteryPower));


    /*
       Metric cards
    */

    setText("solarMetric", Math.round(solarPower));

    setText("evMetric", Math.round(evPower));

    setText("gridMetric", Math.round(gridPower));

    setText("socMetric", Math.round(batterySOC));


    /*
       Battery display
    */

    setText("batterySOC", Math.round(batterySOC));

    setText(
        "batteryDetailPower",
        Math.round(batteryPower)
    );


    const batteryLevel =
        document.getElementById("batteryLevel");

    if (batteryLevel) {

        batteryLevel.style.width =
            `${batterySOC}%`;

    }


    /*
       Battery status
    */

    let batteryStatus = "Discharging";

    if (batteryPower < 10) {
        batteryStatus = "Standby";
    }

    if (emsMode === "SOLAR PRIORITY") {
        batteryStatus = "Solar Charging";
    }

    setText(
        "batteryStatus",
        batteryStatus
    );


    /*
       Environmental calculations
    */

    const renewableShare =
        Math.min(
            100,
            (solarEnergy / Math.max(evEnergy, 1)) * 100
        );

    const co2 =
        solarEnergy * 0.45;

    setText(
        "solarEnergy",
        solarEnergy.toFixed(1)
    );

    setText(
        "evEnergy",
        evEnergy.toFixed(1)
    );

    setText(
        "renewableShare",
        Math.round(renewableShare)
    );

    setText(
        "co2Value",
        co2.toFixed(1)
    );


    /*
       Revenue calculation
       Example tariff = ₹18/kWh
    */

    const revenue =
        evEnergy * 18;

    setText(
        "dailyRevenue",
        Math.round(revenue).toLocaleString("en-IN")
    );


    /*
       Sessions
    */

    setText(
        "sessionCount",
        sessions
    );

    setText(
        "energySold",
        evEnergy.toFixed(1)
    );

    setText(
        "averageSession",
        (evEnergy / Math.max(sessions, 1)).toFixed(1)
    );


    /*
       Transformer loading
       Example transformer = 500 kVA
    */

    const transformerLoad =
        Math.min(
            100,
            (gridPower / 500) * 100
        );

    setText(
        "transformerLoad",
        Math.round(transformerLoad) + "%"
    );

}


/* ---------------------------------------------------------
   HELPER FUNCTION
--------------------------------------------------------- */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* ---------------------------------------------------------
   EMS CONTROL MODE
--------------------------------------------------------- */

function setEMSMode(mode) {

    emsMode = mode;

    setText(
        "emsMode",
        mode
    );


    /*
       Remove active class
    */

    const buttons =
        document.querySelectorAll(
            ".ems-control-btn"
        );

    buttons.forEach(button => {

        button.classList.remove("active");

    });


    /*
       Find clicked button
    */

    buttons.forEach(button => {

        if (
            button.textContent
                .trim()
                .includes(mode)
        ) {

            button.classList.add("active");

        }

    });


    /*
       Change system behavior
    */

    if (mode === "SOLAR PRIORITY") {

        batteryPower = 10;

        solarPower += 15;

    }


    if (mode === "GRID SUPPORT") {

        batteryPower += 15;

        gridPower = Math.max(
            0,
            gridPower - 15
        );

    }


    updateEMSDisplay();

}


/* ---------------------------------------------------------
   START EMS
--------------------------------------------------------- */

updateEMSClock();

updateEMSDisplay();


/*
   Clock updates every second
*/

setInterval(
    updateEMSClock,
    1000
);


/*
   Energy simulation updates every 3 seconds
*/

setInterval(
    updateEMSSimulation,
    3000
);

/* =========================================================
   PART 8 — OCPP + IoT CONTROL CENTER
========================================================= */


/* ---------------------------------------------------------
   CHARGER DATA
--------------------------------------------------------- */

const ocppChargers = {

    1: {
        power: 60,
        percent: 82,
        online: true
    },

    2: {
        power: 48,
        percent: 65,
        online: true
    },

    3: {
        power: 32,
        percent: 40,
        online: true
    },

    4: {
        power: 20,
        percent: 25,
        online: true
    }

};


/* ---------------------------------------------------------
   UPDATE OCPP NETWORK
--------------------------------------------------------- */

function updateOCPPNetwork() {

    let totalPower = 0;

    let connected = 0;

    let activeSessions = 0;


    Object.keys(ocppChargers).forEach(id => {

        const charger =
            ocppChargers[id];


        if (charger.online) {

            connected++;

            totalPower += charger.power;

        }


        if (
            charger.online &&
            charger.power > 5
        ) {

            activeSessions++;

        }


        /*
           Small simulated changes
        */

        if (charger.online) {

            charger.power +=
                (Math.random() * 4) - 2;

            charger.percent +=
                (Math.random() * 4) - 2;


            charger.power =
                Math.max(
                    5,
                    Math.min(
                        60,
                        charger.power
                    )
                );


            charger.percent =
                Math.max(
                    10,
                    Math.min(
                        100,
                        charger.percent
                    )
                );

        }


        updateChargerCard(
            id,
            charger
        );

    });


    /*
       Network metrics
    */

    setText(
        "connectedChargers",
        connected
    );


    setText(
        "activeSessions",
        activeSessions
    );


    setText(
        "networkPower",
        Math.round(totalPower)
    );


    /*
       Simulated energy increase
    */

    const energyElement =
        document.getElementById(
            "networkEnergy"
        );

    if (energyElement) {

        let currentEnergy =
            parseFloat(
                energyElement.textContent
            ) || 685;

        currentEnergy +=
            totalPower / 3600;

        energyElement.textContent =
            currentEnergy.toFixed(1);

    }

}


/* ---------------------------------------------------------
   UPDATE CHARGER CARD
--------------------------------------------------------- */

function updateChargerCard(
    id,
    charger
) {

    setText(
        "power" + id,
        Math.round(charger.power)
    );


    setText(
        "percent" + id,
        Math.round(charger.percent)
    );


    const progress =
        document.getElementById(
            "progress" + id
        );


    if (progress) {

        progress.style.width =
            charger.percent + "%";

    }


    const status =
        document.getElementById(
            "status" + id
        );


    if (status) {

        status.textContent =
            charger.online
                ? "ONLINE"
                : "OFFLINE";


        status.style.color =
            charger.online
                ? "#28e07d"
                : "#ff8585";

    }

}


/* ---------------------------------------------------------
   STOP CHARGING
--------------------------------------------------------- */

function stopCharging(id) {

    const charger =
        ocppChargers[id];


    if (!charger) return;


    charger.power = 0;

    charger.percent = 0;


    updateChargerCard(
        id,
        charger
    );


    showOCPPNotification(
        "Charging stopped on CP-00" + id
    );


    updateOCPPNetwork();

}


/* ---------------------------------------------------------
   RESTART CHARGER
--------------------------------------------------------- */

function restartCharger(id) {

    const charger =
        ocppChargers[id];


    if (!charger) return;


    charger.online = true;

    charger.power = 20;

    charger.percent = 25;


    updateChargerCard(
        id,
        charger
    );


    showOCPPNotification(
        "CP-00" + id + " restarted"
    );


    updateOCPPNetwork();

}


/* ---------------------------------------------------------
   STOP SESSION
--------------------------------------------------------- */

function stopSession(sessionId) {

    showOCPPNotification(
        "Session " +
        sessionId +
        " stopped"
    );

}


/* ---------------------------------------------------------
   REFRESH NETWORK
--------------------------------------------------------- */

function refreshOCPPNetwork() {

    updateOCPPNetwork();


    showOCPPNotification(
        "Charging network refreshed"
    );

}


/* ---------------------------------------------------------
   NOTIFICATION
--------------------------------------------------------- */

function showOCPPNotification(message) {

    let notification =
        document.getElementById(
            "ocppNotification"
        );


    /*
       Create notification if it
       doesn't already exist.
    */

    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "ocppNotification";


        notification.style.position =
            "fixed";

        notification.style.bottom =
            "25px";

        notification.style.right =
            "25px";

        notification.style.zIndex =
            "9999";

        notification.style.padding =
            "14px 18px";

        notification.style.borderRadius =
            "12px";

        notification.style.background =
            "#13231d";

        notification.style.border =
            "1px solid rgba(40,224,125,0.3)";

        notification.style.color =
            "#28e07d";

        notification.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.4)";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        "✓ " + message;


    notification.style.display =
        "block";


    setTimeout(() => {

        notification.style.display =
            "none";

    }, 2500);

}


/* ---------------------------------------------------------
   START OCPP SIMULATION
--------------------------------------------------------- */

updateOCPPNetwork();


setInterval(
    updateOCPPNetwork,
    3000
);