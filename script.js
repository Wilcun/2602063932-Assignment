document.getElementById('calculate-total').addEventListener('click', function() {
    const carItems = document.querySelectorAll('.car-item');
    let total = 0;
    let summaryHTML = '<h3>Ringkasan Sewa Mobil</h3><ul>';

    carItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const durationInput = item.querySelector('.duration');
        const startDateInput = item.querySelector('.start-date');

        if (checkbox.checked) {
            const pricePerDay = parseInt(checkbox.value);
            const duration = parseInt(durationInput.value) || 0;
            const subtotal = pricePerDay * duration;

            total += subtotal;

            const label = item.querySelector('label');
            const carName = label ? label.textContent.trim() : 'Mobil';

            summaryHTML += `<li>${carName} - Durasi: ${duration} hari - Subtotal: Rp ${subtotal}</li>`;
        }
    });

    summaryHTML += `</ul><strong>Total Keseluruhan: Rp ${total}</strong>`;
    document.getElementById('summary').innerHTML = summaryHTML;
});

document.getElementById('save-order').addEventListener('click', function() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const customerName = document.getElementById('customer-name').value;

    if (!customerName) {
        alert('Silakan masukkan nama pelanggan.');
        return;
    }

    const carItems = document.querySelectorAll('.car-item');
    let newOrders = [];

    carItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const durationInput = item.querySelector('.duration');
        const startDateInput = item.querySelector('.start-date');

        if (checkbox.checked) {
            const pricePerDay = parseInt(checkbox.value);
            const duration = parseInt(durationInput.value) || 0;
            const startDate = startDateInput.value;
            const subtotal = pricePerDay * duration;

const label = document.querySelector(`label[for="${checkbox.id}"]`);
const order = {
    id: Date.now() + Math.random(), // unique id
    customerName: customerName,
    carName: label ? label.textContent.trim() : '',
    startDate: startDate,
    duration: duration,
    totalPrice: subtotal,
    timestamp: new Date().toLocaleString()
};
            newOrders.push(order);
        }
    });

    if (newOrders.length === 0) {
        alert('Silakan pilih mobil dan isi durasi sewa.');
        return;
    }

    const updatedOrders = orders.concat(newOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    alert('Pesanan berhasil disimpan!');
    window.location.href = 'order.html'; // redirect to order page
});

