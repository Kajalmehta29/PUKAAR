document.addEventListener('DOMContentLoaded', function() {
   
    const donationType = document.getElementById('donation-type');
    const oneDogSection = document.getElementById('one-dog-section');
    const allDogsSection = document.getElementById('all-dogs-section');
    const customSection = document.getElementById('custom-section');
    
   
    const displayOne = document.getElementById('display-one');
    const displayAll = document.getElementById('display-all');
    const increaseOne = document.getElementById('increase-one');
    const decreaseOne = document.getElementById('decrease-one');
    const increaseAll = document.getElementById('increase-all');
    const decreaseAll = document.getElementById('decrease-all');
    const customAmount = document.getElementById('custom-amount');
    
    
    const donorName = document.getElementById('donor-name');
    const donorAadhar = document.getElementById('donor-aadhar');
    const donateButton = document.getElementById('rzp-button1');
    
   
    const mealText = document.querySelector('.meal-text');
    const mealAllText = document.querySelector('.meal-all-text');
    
    
    let oneDogAmount = 100;
    let allDogsAmount = 1500;
    let dayCountOne = 1;
    let dayCountAll = 1;
    
    
    donationType.addEventListener('change', function() {
       
        oneDogSection.classList.remove('active');
        allDogsSection.classList.remove('active');
        customSection.classList.remove('active');
        
       
        if (this.value === 'one-dog') {
            oneDogSection.classList.add('active');
        } else if (this.value === 'all-dogs') {
            allDogsSection.classList.add('active');
        } else if (this.value === 'custom') {
            customSection.classList.add('active');
        }
    });
    
    
    increaseOne.addEventListener('click', function() {
        dayCountOne++;
        oneDogAmount = 100 * dayCountOne;
        displayOne.textContent = oneDogAmount;
        mealText.textContent = `Sponsoring 1 dog for ${dayCountOne} day${dayCountOne > 1 ? 's' : ''}`;
    });
    
    decreaseOne.addEventListener('click', function() {
        if (dayCountOne > 1) {
            dayCountOne--;
            oneDogAmount = 100 * dayCountOne;
            displayOne.textContent = oneDogAmount;
            mealText.textContent = `Sponsoring 1 dog for ${dayCountOne} day${dayCountOne > 1 ? 's' : ''}`;
        }
    });
    
 
    increaseAll.addEventListener('click', function() {
        dayCountAll++;
        allDogsAmount = 1500 * dayCountAll;
        displayAll.textContent = allDogsAmount;
        mealAllText.textContent = `Sponsoring meals for all dogs for ${dayCountAll} day${dayCountAll > 1 ? 's' : ''}`;
    });
    
    decreaseAll.addEventListener('click', function() {
        if (dayCountAll > 1) {
            dayCountAll--;
            allDogsAmount = 1500 * dayCountAll;
            displayAll.textContent = allDogsAmount;
            mealAllText.textContent = `Sponsoring meals for all dogs for ${dayCountAll} day${dayCountAll > 1 ? 's' : ''}`;
        }
    });
    
    
    donateButton.addEventListener('click', function() {
        let amount = 0;
        let description = '';
        
       
        if (!donorName.value) {
            alert('Please enter your name');
            return;
        }
        
      
        if (donationType.value === 'one-dog') {
            amount = oneDogAmount;
            description = `Sponsoring meals for 1 dog for ${dayCountOne} day${dayCountOne > 1 ? 's' : ''}`;
        } else if (donationType.value === 'all-dogs') {
            amount = allDogsAmount;
            description = `Sponsoring meals for all dogs for ${dayCountAll} day${dayCountAll > 1 ? 's' : ''}`;
        } else if (donationType.value === 'custom') {
            amount = customAmount.value;
            if (!amount || amount <= 0) {
                alert('Please enter a valid donation amount');
                return;
            }
            description = 'General donation';
        } else {
            alert('Please select a donation type');
            return;
        }
        
     
        const options = {
            key: 'YOUR_RAZORPAY_KEY',
            amount: amount * 100, 
            currency: 'INR',
            name: 'Pukaar Animal Shelter',
            description: description,
            image: '/logo.png', 
            handler: function(response) {
                alert('Payment Successful! Thank you for your donation.');
               
           
            },
            prefill: {
                name: donorName.value,
            },
            theme: {
                color: '#6a4c93'
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    });
});