document.addEventListener("DOMContentLoaded", function () {
    let vetAmount = 500; // Fixed minimum amount
    let vetDisplay = document.getElementById("display-vet");
    let customAmountInput = document.getElementById("custom-amount");

    document.getElementById("increase-vet").addEventListener("click", function () {
        vetAmount += 100; // Increase by ₹100
        vetDisplay.innerText = vetAmount;
    });

    document.getElementById("decrease-vet").addEventListener("click", function () {
        if (vetAmount > 500) {
            vetAmount -= 100;
            vetDisplay.innerText = vetAmount;
        }
    });

    document.getElementById("rzp-button1").onclick = function (e) {
        let finalAmount = vetAmount * 100; // Convert to paise for Razorpay

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
            "description": "Veterinary Donation",
            "handler": function (response) {
                alert("Thank you for your support! Payment ID: " + response.razorpay_payment_id);
            },
            "theme": {
                "color": "#4CAF50"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    };
});
