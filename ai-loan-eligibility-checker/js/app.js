const $ = (id) => document.getElementById(id);

const money = (n) =>
  "₹" + Number(n).toLocaleString("en-IN", {
    maximumFractionDigits: 0
  });

function validateNumber(value, min, max, label) {
  const n = Number(value);

  if (
    !Number.isFinite(n) ||
    n < min ||
    (max !== undefined && n > max)
  ) {
    throw new Error(
      `${label} must be between ${min}${
        max !== undefined ? " and " + max : ""
      }.`
    );
  }

  return n;
}


// ==========================================
// 1. LOAN ELIGIBILITY CHECKER
// ==========================================

$("loanForm").addEventListener("submit", (e) => {
  e.preventDefault();

  $("loanError").textContent = "";

  try {
    const age = validateNumber(
      $("age").value,
      18,
      70,
      "Age"
    );

    const income = validateNumber(
      $("income").value,
      1,
      undefined,
      "Monthly income"
    );

    const credit = validateNumber(
      $("loanCredit").value,
      300,
      900,
      "Credit score"
    );

    const existingEmi = validateNumber(
      $("existingEmi").value,
      0,
      undefined,
      "Existing EMI"
    );

    const amount = validateNumber(
      $("loanAmount").value,
      1000,
      undefined,
      "Requested loan"
    );

    const employment = $("employment").value;

    if (!employment) {
      throw new Error("Please select employment type.");
    }

    const dti = (existingEmi / income) * 100;

    let score = 0;

    // Credit score points
    score +=
      credit >= 750
        ? 35
        : credit >= 700
        ? 28
        : credit >= 650
        ? 20
        : credit >= 600
        ? 10
        : 0;

    // Income points
    score +=
      income >= 50000
        ? 25
        : income >= 30000
        ? 18
        : income >= 20000
        ? 12
        : 6;

    // Age points
    score += age >= 21 && age <= 55 ? 15 : 8;

    // Employment points
    score +=
      employment === "Salaried"
        ? 15
        : employment === "Self-employed"
        ? 12
        : employment === "Student"
        ? 4
        : 8;

    // Debt-to-income points
    score +=
      dti <= 30
        ? 10
        : dti <= 45
        ? 5
        : 0;

    const eligible =
      score >= 65 &&
      credit >= 600 &&
      dti <= 50;

    const risk =
      score >= 80
        ? "Lower"
        : score >= 65
        ? "Moderate"
        : "Higher";

    const estimatedRange = Math.max(
      0,
      Math.min(
        amount,
        income * (eligible ? 18 : 8)
      )
    );

    $("loanResult").innerHTML = `
      <span class="result-icon">
        ${eligible ? "✅" : "⚠️"}
      </span>

      <h3>
        ${eligible ? "Estimated Eligible" : "Needs Improvement"}
      </h3>

      <p>
        This rule-based result is a project estimate
        and is not an actual lender approval.
      </p>

      <div class="metric-grid">

        <div class="metric">
          <small>Readiness Score</small>
          <strong>${score}/100</strong>
        </div>

        <div class="metric">
          <small>Risk Level</small>
          <strong>${risk}</strong>
        </div>

        <div class="metric">
          <small>Est. Range</small>
          <strong>${money(estimatedRange)}</strong>
        </div>

      </div>

      <p class="muted">
        Debt-to-income ratio: ${dti.toFixed(1)}%.
        Actual lenders use their own underwriting criteria.
      </p>
    `;


        // Save loan application to Google Sheets
    fetch("http://127.0.0.1:5000/api/save-loan", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    age: age,
    income: income,
    credit: credit,
    existingEmi: existingEmi,
    loanAmount: amount,
    employment: employment,
    dti: dti.toFixed(1),
    result: eligible
      ? "Estimated Eligible"
      : "Needs Improvement"
  })
})
.then(response => response.json())
.then(data => {
  console.log("Google Sheets:", data);
})
.catch(error => {
  console.error("Google Sheets error:", error);
});


  } catch (err) {
    $("loanError").textContent = err.message;
  }
});


// ==========================================
// 2. CREDIT SCORE ANALYZER
// ==========================================

function analyzeCredit(score) {

  if (score >= 800) {
    return [
      "Excellent",
      "Strong credit profile based on the entered score.",
      "success"
    ];
  }

  if (score >= 750) {
    return [
      "Very Good",
      "Generally indicates a strong credit profile.",
      "success"
    ];
  }

  if (score >= 700) {
    return [
      "Good",
      "Generally indicates a positive credit profile.",
      "success"
    ];
  }

  if (score >= 650) {
    return [
      "Fair",
      "Consider maintaining on-time payments and manageable credit usage.",
      ""
    ];
  }

  if (score >= 600) {
    return [
      "Needs Attention",
      "Review repayment history and outstanding obligations.",
      ""
    ];
  }

  return [
    "Low",
    "Consider reviewing credit records and repayment habits.",
    "error"
  ];
}


$("creditBtn").addEventListener("click", () => {

  try {

    const score = validateNumber(
      $("creditInput").value,
      300,
      900,
      "Credit score"
    );

    const [label, text, cls] =
      analyzeCredit(score);

    $("creditResult").innerHTML = `
      <h3>${label}</h3>

      <p>${text}</p>

      <div class="metric-grid">

        <div class="metric">
          <small>Entered Score</small>
          <strong class="${cls}">
            ${score}
          </strong>
        </div>

        <div class="metric">
          <small>Range</small>
          <strong>300–900</strong>
        </div>

        <div class="metric">
          <small>Purpose</small>
          <strong>Education</strong>
        </div>

      </div>
    `;

  } catch (err) {

    $("creditResult").innerHTML =
      `<p class="error">${err.message}</p>`;

  }

});


// Run credit analysis once on page load
$("creditBtn").click();


// ==========================================
// 3. EMI CALCULATOR
// ==========================================

function calculateEMI(P, annualRate, years) {

  const n = years * 12;

  const r = annualRate / 12 / 100;

  if (r === 0) {
    return {
      emi: P / n,
      interest: 0,
      total: P
    };
  }

  const emi =
    P *
    r *
    Math.pow(1 + r, n) /
    (Math.pow(1 + r, n) - 1);

  const total = emi * n;

  return {
    emi: emi,
    interest: total - P,
    total: total
  };
}


function renderEMI() {

  try {

    const P = validateNumber(
      $("emiPrincipal").value,
      1,
      undefined,
      "Loan amount"
    );

    const rate = validateNumber(
      $("emiRate").value,
      0,
      100,
      "Interest rate"
    );

    const years = validateNumber(
      $("emiYears").value,
      1,
      30,
      "Tenure"
    );

    const {
      emi,
      interest,
      total
    } = calculateEMI(
      P,
      rate,
      years
    );

    $("emiResult").innerHTML = `

      <span class="result-icon">
        🧮
      </span>

      <h3>
        ${money(emi)} / month
      </h3>

      <p>
        Estimated reducing-balance EMI
      </p>

      <div class="metric-grid">

        <div class="metric">
          <small>Principal</small>
          <strong>
            ${money(P)}
          </strong>
        </div>

        <div class="metric">
          <small>Total Interest</small>
          <strong>
            ${money(interest)}
          </strong>
        </div>

        <div class="metric">
          <small>Total Repayment</small>
          <strong>
            ${money(total)}
          </strong>
        </div>

      </div>
    `;

    $("heroEmi").textContent =
      money(emi);

  } catch (err) {

    $("emiResult").innerHTML =
      `<p class="error">${err.message}</p>`;

  }
}


$("emiBtn").addEventListener(
  "click",
  renderEMI
);


["emiPrincipal", "emiRate", "emiYears"]
  .forEach((id) => {
    $(id).addEventListener(
      "input",
      renderEMI
    );
  });


renderEMI();


// ==========================================
// 4. AI FINANCIAL TIPS - LOCAL DEMO
// ==========================================

$("tipsBtn").addEventListener(
  "click",
  () => {

    const question =
      $("tipQuestion").value.trim();

    const result =
      $("tipsResult");


    // Empty question
    if (!question) {

      result.innerHTML = `
        <span class="ai-badge">
          AI DEMO
        </span>

        <p class="error">
          Please enter a question.
        </p>
      `;

      return;
    }


    const q =
      question.toLowerCase();

    let answer;


    // Budget / saving
    if (
      q.includes("budget") ||
      q.includes("saving") ||
      q.includes("save money")
    ) {

      answer =
        "Create a simple monthly budget by listing essential expenses first. " +
        "Set aside a reasonable amount for savings and review your spending regularly.";

    }


    // Loan
    else if (
      q.includes("loan") ||
      q.includes("personal loan")
    ) {

      answer =
        "Before applying for a loan, compare interest rates, processing fees, " +
        "repayment periods and your ability to make the monthly EMI. " +
        "Avoid borrowing more than you can comfortably repay.";

    }


    // Credit score
    else if (
      q.includes("credit score") ||
      q.includes("credit")
    ) {

      answer =
        "A healthy credit history can be supported by paying bills and EMIs on time, " +
        "keeping credit usage reasonable and checking your credit report for errors.";

    }


    // EMI
    else if (
      q.includes("emi")
    ) {

      answer =
        "Before choosing an EMI, check the total repayment amount, interest rate and " +
        "loan tenure. A longer tenure can reduce the monthly EMI but may increase total interest.";

    }


    // General financial tip
    else {

      answer =
        "For general financial planning, start by tracking income and expenses, " +
        "maintaining an emergency fund, comparing financial products carefully, " +
        "and avoiding unnecessary debt.";

    }


    result.innerHTML = `

      <span class="ai-badge">
        AI DEMO
      </span>

      <h3>
        Financial Tip
      </h3>

      <p>
        ${answer}
      </p>

    `;

  }
);