document.addEventListener("DOMContentLoaded", function () {
    let customAmountInput = document.getElementById("custom-amount");

    document.getElementById("rzp-button1").onclick = function (e) {
        let finalAmount = parseInt(customAmountInput.value) * 100;

        if (isNaN(finalAmount) || finalAmount < 5000) {
            alert("Please enter a minimum donation of ₹50.");
            return;
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
            "description": "Construction Donation",
            "handler": function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            },
            "theme": {
                "color": "#D2691E"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    };
});
