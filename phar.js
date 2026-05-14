// Inventory array
let inventory = [

  {
    name: "Relief",
    quantity: 500,
    expiryDate: "2026-06-11",
    price: 50.00
  },

  {
    name: "Paracetamol",
    quantity: 755,
    expiryDate: "2026-06-12",
    price: 20.00
  }

];

let sales = [];



// ADD MEDICINE
function addMedicine() {

  let name = document.getElementById("name").value.trim();

  let quantity = Number(document.getElementById("quantity").value);

  let expiryDate =
    document.getElementById("expiry").value;

  let price = Number(
    document.getElementById("price").value
  );

  if (name === "" || quantity <= 0 || expiryDate === "" || price <= 0) {

    showOutput(
      `<p style="color:red;">
                ⚠️ Please fill all medicine details.
            </p>`
    );

    return;
  }

  let medicine = {
    name,
    quantity,
    expiryDate,
    price
  };

  inventory.push(medicine);

  showOutput(
    `<p>✅ ${name} added successfully!</p>`
  );
  //alert(`${name} added successfully!`);
}

document.getElementById("name").value = "";
document.getElementById("quantity").value = "";
document.getElementById("expiry").value = "";
document.getElementById("price").value = "";



// SELL MEDICINE
function sellMedicine() {

  let sellName =
    document.getElementById("sellName").value.trim();

  let sellQty = Number(
    document.getElementById("sellQty").value
  );

  if (sellName === "" || sellQty <= 0) {
    showOutput(
      `<p style="color:red;">
                ⚠️ Enter medicine name and quantity.
            </p>`
    );
    return;
  }

  for (let med of inventory) {

    if (
      med.name.toLowerCase()
      ===
      sellName.toLowerCase()
      &&
      med.quantity >= sellQty
    ) {

      med.quantity -= sellQty;

      let total =
        sellQty * med.price;

      sales.push({

        medicineName: med.name,

        quantitySold: sellQty,

        totalPrice: total,

        saleDate:
          new Date().toDateString()
      });

      showOutput(
        `<p>💊 Sold ${sellQty} of ${med.name}</p>`
      );
      document.getElementById("sellName")
        .value = "";
      document.getElementById("sellQty")
        .value = "";
      return;
    }
  }

  showOutput(
    `<p>❌ Medicine not found or insufficient stock</p>`
  );
}



// LIST INVENTORY
function listInventory() {

  let text =
    "<h2>Inventory</h2>";

  for (let med of inventory) {

    text += `
            <p>
                💊 <strong>${med.name}</strong>
                <br>
                Qty: ${med.quantity}
                <br>
                Expiry: ${med.expiryDate}
                <br>
                Price: $${med.price}
            </p>
        `;
  }

  showOutput(text);
}



// EXPIRY ALERT
function listExpiringSoon() {

  let text =
    "<h2>Expiry Alerts</h2>";

  let today = new Date();
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
                    expires on ${med.expiryDate}
                    (${Math.floor(diff)} days left)
                </p>
            `;
    }
  }

  if (!found) {
    text += "<p>✅ No medicines are expiring soon.</p>";
  }

  showOutput(text);
}



// DAILY REPORT
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



// OUTPUT FUNCTION
function showOutput(message) {
  document.getElementById("output").innerHTML = message;
}
