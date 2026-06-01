// LOCAL STORAGE

let inventory =
  JSON.parse(localStorage.getItem("inventory"))
  || [

    {
      name: "Relief",
      quantity: 500,
      expiryDate: "2026-06-11",
      price: 50
    },

    {
      name: "Paracetamol",
      quantity: 755,
      expiryDate: "2026-06-12",
      price: 20
    }
  ];

let sales =
  JSON.parse(localStorage.getItem("sales"))
  || [];


// SAVE DATA

function saveData() {

  localStorage.setItem(
    "inventory",
    JSON.stringify(inventory)
  );

  localStorage.setItem(
    "sales",
    JSON.stringify(sales)
  );
}


// DASHBOARD

function updateDashboard() {

  document.getElementById(
    "totalMedicines"
  ).textContent = inventory.length;

  document.getElementById(
    "totalSales"
  ).textContent = sales.length;

  let revenue = 0;

  for (let sale of sales) {

    revenue += sale.totalPrice;
  }

  document.getElementById(
    "totalRevenue"
  ).textContent = `$${revenue}`;
}


// OUTPUT

function showOutput(message) {

  document.getElementById(
    "output"
  ).innerHTML = message;
}


// ADD MEDICINE

function addMedicine() {

  let name =
    document.getElementById("name")
      .value.trim();

  let quantity =
    Number(
      document.getElementById("quantity")
        .value
    );

  let expiryDate =
    document.getElementById("expiry")
      .value;

  let price =
    Number(
      document.getElementById("price")
        .value
    );

  if (
    name === ""
    ||
    quantity <= 0
    ||
    expiryDate === ""
    ||
    price <= 0
  ) {

    showOutput(`
      <p style="color:red;">
        ⚠️ Fill all medicine details.
      </p>
    `);

    return;
  }

  inventory.push({

    name,
    quantity,
    expiryDate,
    price
  });

  saveData();

  updateDashboard();

  showOutput(`
    <p>
      ✅ ${name} added successfully!
    </p>
  `);

  document.getElementById("name")
    .value = "";

  document.getElementById("quantity")
    .value = "";

  document.getElementById("expiry")
    .value = "";

  document.getElementById("price")
    .value = "";
}


// SELL MEDICINE

function sellMedicine() {

  let sellName =
    document.getElementById("sellName")
      .value.trim();

  let sellQty =
    Number(
      document.getElementById("sellQty")
        .value
    );

  for (let med of inventory) {

    if (
      med.name.toLowerCase()
      ===
      sellName.toLowerCase()
    ) {

      if (med.quantity >= sellQty) {

        med.quantity -= sellQty;

        let total =
          sellQty * med.price;

        sales.push({

          medicineName: med.name,

          quantitySold: sellQty,

          totalPrice: total
        });

        saveData();

        updateDashboard();

        showOutput(`
          <p>
            💊 Sold ${sellQty}
            of ${med.name}
          </p>
        `);

        return;
      }
    }
  }

  showOutput(`
    <p style="color:red;">
      ❌ Medicine not found
      or insufficient stock.
    </p>
  `);
}


// INVENTORY

function listInventory() {

  let text = `

    <h2>
      Inventory
    </h2>

    <table class="inventory-table" border="2" cellpadding="5">

      <tr>

        <th>Name</th>

        <th>Qty</th>

        <th>Expiry</th>

        <th>Price</th>

      </tr>
  `;

  for (let med of inventory) {

    text += `

      <tr>

        <td>${med.name}</td>

        <td>${med.quantity}</td>

        <td>${med.expiryDate}</td>

        <td>$${med.price}</td>

      </tr>
    `;
  }

  text += `
    </table>
  `;

  showOutput(text);
}


// EXPIRY ALERT

function listExpiringSoon() {

  let text =
    "<h2>Expiry Alerts</h2>";

  let today =
    new Date();

  let found = false;

  for (let med of inventory) {

    let expiry =
      new Date(med.expiryDate);

    let diff =
      (expiry - today)
      /
      (1000 * 60 * 60 * 24);

    if (diff <= 30 && diff >= 0) {

      found = true;

      text += `

        <p>

          ⚠️ ${med.name}
          expires in
          ${Math.floor(diff)}
          days

        </p>
      `;
    }
  }

  if (!found) {

    text += `
      <p>
        ✅ No medicines
        expiring soon.
      </p>
    `;
  }

  showOutput(text);
}


// LOW STOCK

function lowStockAlert() {

  let text =
    "<h2>Low Stock Medicines</h2>";

  let found = false;

  for (let med of inventory) {

    if (med.quantity <= 50) {

      found = true;

      text += `

        <p>

          ⚠️ ${med.name}
          only has
          ${med.quantity}
          left.

        </p>
      `;
    }
  }

  if (!found) {

    text += `
      <p>
        ✅ No low stock medicines.
      </p>
    `;
  }

  showOutput(text);
}


// REPORT

function dailyReport() {

  let totalRevenue = 0;

  let report =
    "<h2>Daily Report</h2>";

  for (let sale of sales) {

    totalRevenue += sale.totalPrice;

    report += `

      <p>

        💰 ${sale.medicineName}
        x ${sale.quantitySold}
        =
        $${sale.totalPrice}

      </p>
    `;
  }

  report += `

    <h3>
      Total Revenue:
      $${totalRevenue}
    </h3>
  `;

  showOutput(report);
}


// INITIALIZE

updateDashboard();
