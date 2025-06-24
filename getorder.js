document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    // Tampilkan daftar order
    displayOrders();
    function displayOrders() {
        const ordersList = document.getElementById('orders-list');
        if (!ordersList) {
            console.error('Element with id "orders-list" not found');
            return;
        }
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log('Orders from localStorage:', orders);
        if (orders.length === 0) {
            ordersList.innerHTML = '<p>Belum ada pesanan</p>';
            return;
        }
        ordersList.innerHTML = '';
        
        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <button class="delete-btn" data-id="${order.id}">×</button>
                <h3>Nama : ${order.customerName}</h3>
                <p>Mobil: ${order.carName}</p>
                <p>Tanggal Mulai: ${order.startDate}</p>
                <p>Durasi: ${order.duration} hari</p>
                <p>Total Harga: Rp ${order.totalPrice !== undefined && order.totalPrice !== null ? order.totalPrice.toLocaleString('id-ID') : 'N/A'}</p>
                <p class="timestamp">Dipesan pada: ${order.timestamp}</p>
            `;
            ordersList.appendChild(orderCard);
        });
        // Tambahkan event listener untuk tombol delete
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                deleteOrder(orderId);
            });
        });
    }
    function deleteOrder(orderId) {
        if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.filter(order => order.id.toString() !== orderId);
            localStorage.setItem('orders', JSON.stringify(orders));
            displayOrders();
        }
    }
});
