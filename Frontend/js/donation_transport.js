document.addEventListener("DOMContentLoaded", function () {
    let fuelAmount = 200;
    let autoAmount = 300;
    let fuelDisplay = document.getElementById("display-fuel");
    let autoDisplay = document.getElementById("display-auto");
    let donationTypeSelect = document.getElementById("donation-type");

    
    let allSections = document.querySelectorAll(".donation-option");
    allSections.forEach(section => section.style.display = "none");

  
    donationTypeSelect.addEventListener("change", function () {
        allSections.forEach(section => section.style.display = "none");
        let selectedOption = this.value;
        if (selectedOption) {
            document.getElementById(`${selectedOption}-section`).style.display = "block";
        }
    });

   
    document.getElementById("increase-fuel").addEventListener("click", function () {
        fuelAmount += 50;
        fuelDisplay.innerText = fuelAmount;
    });

    document.getElementById("decrease-fuel").addEventListener("click", function () {
        if (fuelAmount > 200) {
            fuelAmount -= 50;
            fuelDisplay.innerText = fuelAmount;
        }
    });

    document.getElementById("increase-auto").addEventListener("click", function () {
        autoAmount += 100;
        autoDisplay.innerText = autoAmount;
    });

    document.getElementById("decrease-auto").addEventListener("click", function () {
        if (autoAmount > 300) {
            autoAmount -= 100;
            autoDisplay.innerText = autoAmount;
        }
    });

   
    document.getElementById("rzp-button-transport").onclick = function (e) {
        let selectedDonation = document.getElementById("donation-type").value;
        let finalAmount = 0;

        if (selectedDonation === "fuel") {
            finalAmount = fuelAmount * 100;
        } else if (selectedDonation === "auto") {
            finalAmount = autoAmount * 100;
        } else {
            let customAmount = document.getElementById("custom-amount").value;
            if (!customAmount || customAmount < 1) {
                alert("Please enter a valid donation amount.");
                return;
            }
            finalAmount = customAmount * 100;
        }

        let donorName = document.getElementById("donor-name").value;
        let donorAadhar = document.getElementById("donor-aadhar").value;

        if (!donorName) {
            alert("Please enter your name.");
            return;
        }

        if (donorAadhar && donorAadhar.toString().length !== 12) {
            alert("Aadhaar must be 12 digits.");
            return;
        }

        var options = {
            "key": "YOUR_RAZORPAY_KEY",
            "amount": finalAmount,
            "currency": "INR",
            "name": "Pukaar Animal Shelter",
            "description": selectedDonation === "fuel" ? "Fuel Donation" : "Auto Fare Donation",
            "handler": function (response) {
                alert("Thank you for your support! Payment ID: " + response.razorpay_payment_id);
            },
            "theme": {
                "color": "#007BFF"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    };
});
