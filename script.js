// NUROGENSIS Predictive Maintenance System JavaScript
let nurogensisSystemInstance = null;

class NurogensisSystem {
    constructor() {
        console.log('Starting NurogensisSystem initialization...');
        try {
            this.equipmentData = [];
            this.sensorData = [];
            this.charts = {};
            this.intervalId = null;
            this.temperatureData = [];
            this.vibrationData = [];
            this.sensorDataPoints = [];
            
            console.log('Properties initialized...');
            this.initializeSystem();
            console.log('System data initialized...');
            this.bindEvents();
            console.log('Events bound...');
            this.startRealTimeUpdates();
            console.log('Real-time updates started...');
            
            console.log('NurogensisSystem constructor completed successfully');
        } catch (error) {
            console.error('Error in NurogensisSystem constructor:', error);
            throw error;
        }
    }

    hideLoadingScreen() {
        console.log('System ready - loading screen will be hidden automatically');
    }

    initializeSystem() {
        console.log('Initializing system data...');
        try {
            // Initialize with sample equipment data
            this.equipmentData = [
                {
                    id: 'EQ001',
                    name: 'Industrial Pump A1',
                    category: 'Manufacturing',
                    location: 'Factory Floor 1',
                    status: 'Active',
                    health: 92,
                    temperature: 78,
                    vibration: 2.1,
                    pressure: 145,
                    purchaseDate: '2022-01-15',
                    maintenanceSchedule: 6
                },
                {
                    id: 'EQ002',
                    name: 'HVAC Unit B2',
                    category: 'HVAC',
                    location: 'Building 2',
                    status: 'Maintenance Due',
                    health: 76,
                    temperature: 95,
                    vibration: 3.8,
                    pressure: 132,
                    purchaseDate: '2021-08-20',
                    maintenanceSchedule: 12
                },
                {
                    id: 'EQ003',
                    name: 'Generator C3',
                    category: 'Manufacturing',
                    location: 'Power Plant',
                    status: 'Active',
                    health: 88,
                    temperature: 82,
                    vibration: 1.9,
                    pressure: 158,
                    purchaseDate: '2023-03-10',
                    maintenanceSchedule: 8
                }
            ];

            console.log('Equipment data loaded:', this.equipmentData.length, 'items');
            
            this.updateDashboard();
            this.initializeCharts();
            this.updateSensorDisplay();
            this.refreshEquipmentList();
            this.updateLastUpdated();
            
            console.log('System initialization completed successfully');
        } catch (error) {
            console.error('Error in initializeSystem:', error);
            throw error;
        }
    }

    bindEvents() {
        // Form submission
        document.getElementById('equipmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerEquipment();
        });

        // Update last updated time
        setInterval(() => this.updateLastUpdated(), 60000);
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionName).classList.add('active');
        
        // Add active class to clicked button
        event.target.classList.add('active');
    }

    updateDashboard() {
        const total = this.equipmentData.length;
        const active = this.equipmentData.filter(eq => eq.status === 'Active').length;
        const maintenance = this.equipmentData.filter(eq => eq.status === 'Maintenance Due').length;
        const predicted = this.equipmentData.filter(eq => eq.health < 80).length;

        document.getElementById('totalEquipment').textContent = total;
        document.getElementById('activeEquipment').textContent = active;
        document.getElementById('maintenanceEquipment').textContent = maintenance;
        document.getElementById('predictedFailures').textContent = predicted;
    }

    initializeCharts() {
        // Status Chart
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        const statusData = this.getStatusData();
        
        this.charts.status = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Maintenance Due', 'Under Maintenance', 'Out of Service'],
                datasets: [{
                    data: statusData,
                    backgroundColor: ['#27ae60', '#f39c12', '#e74c3c', '#95a5a6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Health Chart
        const healthCtx = document.getElementById('healthChart').getContext('2d');
        this.charts.health = new Chart(healthCtx, {
            type: 'line',
            data: {
                labels: this.equipmentData.map(eq => eq.name),
                datasets: [{
                    label: 'Equipment Health %',
                    data: this.equipmentData.map(eq => eq.health),
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        // Sensor Chart with fixed dataset size
        const sensorCtx = document.getElementById('sensorChart').getContext('2d');
        this.sensorDataPoints = Array.from({length: 20}, (_, i) => i + 1);
        this.temperatureData = this.generateRandomData(20, 70, 100);
        this.vibrationData = this.generateRandomData(20, 1, 5);
        
        this.charts.sensor = new Chart(sensorCtx, {
            type: 'line',
            data: {
                labels: this.sensorDataPoints.map(point => `${point}m`),
                datasets: [{
                    label: 'Temperature',
                    data: this.temperatureData,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Vibration',
                    data: this.vibrationData,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 750
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Time (minutes)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Values'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });

        // Prediction Chart
        const predictionCtx = document.getElementById('predictionChart').getContext('2d');
        this.charts.prediction = new Chart(predictionCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Predicted Failures',
                    data: [2, 1, 3, 1],
                    backgroundColor: '#e74c3c'
                }, {
                    label: 'Maintenance Scheduled',
                    data: [5, 3, 4, 6],
                    backgroundColor: '#f39c12'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    getStatusData() {
        const active = this.equipmentData.filter(eq => eq.status === 'Active').length;
        const maintenance = this.equipmentData.filter(eq => eq.status === 'Maintenance Due').length;
        const underMaintenance = this.equipmentData.filter(eq => eq.status === 'Under Maintenance').length;
        const outOfService = this.equipmentData.filter(eq => eq.status === 'Out of Service').length;
        return [active, maintenance, underMaintenance, outOfService];
    }

    generateRandomData(count, min, max) {
        return Array.from({length: count}, () => Math.random() * (max - min) + min);
    }

    updateSensorDisplay() {
        const sensorGrid = document.getElementById('sensorGrid');
        sensorGrid.innerHTML = '';

        this.equipmentData.forEach(equipment => {
            const sensorCard = document.createElement('div');
            sensorCard.className = 'sensor-card';
            sensorCard.innerHTML = `
                <h4>${equipment.name}</h4>
                <div class="sensor-value" style="color: ${this.getHealthColor(equipment.health)}">
                    ${equipment.health.toFixed(1)}%
                </div>
                <div>Health Score</div>
                <div style="margin-top: 10px; font-size: 0.9em; color: #7f8c8d;">
                    Temp: ${equipment.temperature.toFixed(1)}°F | 
                    Vibration: ${equipment.vibration.toFixed(2)} mm/s
                </div>
            `;
            sensorGrid.appendChild(sensorCard);
        });
    }

    getHealthColor(health) {
        if (health >= 80) return '#27ae60';
        if (health >= 60) return '#f39c12';
        return '#e74c3c';
    }

    registerEquipment() {
        const formData = {
            id: document.getElementById('equipmentId').value,
            name: document.getElementById('equipmentName').value,
            category: document.getElementById('category').value,
            location: document.getElementById('location').value,
            purchaseDate: document.getElementById('purchaseDate').value,
            warrantyExpiry: document.getElementById('warrantyExpiry').value,
            maintenanceSchedule: parseInt(document.getElementById('maintenanceSchedule').value),
            status: document.getElementById('status').value,
            health: Math.floor(Math.random() * 40) + 60, // Random health 60-100
            temperature: Math.floor(Math.random() * 30) + 70, // Random temp 70-100
            vibration: Math.random() * 3 + 1, // Random vibration 1-4
            pressure: Math.floor(Math.random() * 50) + 120 // Random pressure 120-170
        };

        // Check if equipment ID already exists
        if (this.equipmentData.some(eq => eq.id === formData.id)) {
            alert('Equipment ID already exists! Please use a different ID.');
            return;
        }

        this.equipmentData.push(formData);
        this.updateDashboard();
        this.updateCharts();
        this.updateSensorDisplay();
        this.refreshEquipmentList();
        
        alert('Equipment registered successfully!');
        this.clearForm();
    }

    clearForm() {
        document.getElementById('equipmentForm').reset();
    }

    refreshEquipmentList() {
        const equipmentList = document.getElementById('equipmentList');
        equipmentList.innerHTML = '';

        this.equipmentData.forEach((equipment, index) => {
            const equipmentCard = document.createElement('div');
            equipmentCard.className = 'equipment-card';
            
            const statusClass = equipment.status.toLowerCase().replace(/\s+/g, '-');
            
            equipmentCard.innerHTML = `
                <div class="equipment-info">
                    <h4>${equipment.name} (${equipment.id})</h4>
                    <div class="equipment-details">
                        Category: ${equipment.category} | Location: ${equipment.location}
                    </div>
                    <div class="equipment-details">
                        Health: ${equipment.health.toFixed(1)}% | 
                        Temp: ${equipment.temperature.toFixed(1)}°F | 
                        Vibration: ${equipment.vibration.toFixed(2)} mm/s
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="status-badge status-${statusClass}">${equipment.status}</div>
                    <div style="margin-top: 10px;">
                        <button class="btn btn-primary" onclick="handleEditEquipment(${index})" style="padding: 5px 10px; font-size: 12px;">Edit</button>
                        <button class="btn btn-secondary" onclick="handleDeleteEquipment(${index})" style="padding: 5px 10px; font-size: 12px; background: #e74c3c;">Delete</button>
                    </div>
                </div>
            `;
            
            equipmentList.appendChild(equipmentCard);
        });
    }

    filterEquipment() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('filterCategory').value;
        const statusFilter = document.getElementById('filterStatus').value;

        const filtered = this.equipmentData.filter(equipment => {
            const matchesSearch = equipment.name.toLowerCase().includes(searchTerm) || 
                                equipment.id.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || equipment.category === categoryFilter;
            const matchesStatus = !statusFilter || equipment.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });

        // Update display with filtered results
        const equipmentList = document.getElementById('equipmentList');
        equipmentList.innerHTML = '';

        filtered.forEach((equipment, originalIndex) => {
            const index = this.equipmentData.indexOf(equipment);
            const equipmentCard = document.createElement('div');
            equipmentCard.className = 'equipment-card';
            
            const statusClass = equipment.status.toLowerCase().replace(/\s+/g, '-');
            
            equipmentCard.innerHTML = `
                <div class="equipment-info">
                    <h4>${equipment.name} (${equipment.id})</h4>
                    <div class="equipment-details">
                        Category: ${equipment.category} | Location: ${equipment.location}
                    </div>
                    <div class="equipment-details">
                        Health: ${equipment.health.toFixed(1)}% | 
                        Temp: ${equipment.temperature.toFixed(1)}°F | 
                        Vibration: ${equipment.vibration.toFixed(2)} mm/s
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="status-badge status-${statusClass}">${equipment.status}</div>
                    <div style="margin-top: 10px;">
                        <button class="btn btn-primary" onclick="handleEditEquipment(${index})" style="padding: 5px 10px; font-size: 12px;">Edit</button>
                        <button class="btn btn-secondary" onclick="handleDeleteEquipment(${index})" style="padding: 5px 10px; font-size: 12px; background: #e74c3c;">Delete</button>
                    </div>
                </div>
            `;
            
            equipmentList.appendChild(equipmentCard);
        });
    }

    updateCharts() {
        // Update status chart
        if (this.charts.status) {
            this.charts.status.data.datasets[0].data = this.getStatusData();
            this.charts.status.update();
        }

        // Update health chart
        if (this.charts.health) {
            this.charts.health.data.labels = this.equipmentData.map(eq => eq.name);
            this.charts.health.data.datasets[0].data = this.equipmentData.map(eq => parseFloat(eq.health.toFixed(1)));
            this.charts.health.update();
        }

        // Update sensor chart with sliding window (fixed size)
        if (this.charts.sensor) {
            // Shift data to the left and add new data point
            this.temperatureData.shift();
            this.vibrationData.shift();
            
            // Add new random data points
            this.temperatureData.push(Math.random() * 30 + 70); // 70-100
            this.vibrationData.push(Math.random() * 4 + 1); // 1-5
            
            // Update chart data
            this.charts.sensor.data.datasets[0].data = this.temperatureData;
            this.charts.sensor.data.datasets[1].data = this.vibrationData;
            this.charts.sensor.update('none'); // No animation for smoother real-time feel
        }
    }

    startRealTimeUpdates() {
        // Update sensor data every 5 seconds
        this.intervalId = setInterval(() => {
            this.simulateRealTimeData();
            this.updateSensorDisplay();
            this.updateCharts();
        }, 5000);
    }

    simulateRealTimeData() {
        this.equipmentData.forEach(equipment => {
            // Simulate small changes in sensor readings
            equipment.temperature += (Math.random() - 0.5) * 2;
            equipment.vibration += (Math.random() - 0.5) * 0.2;
            equipment.pressure += (Math.random() - 0.5) * 5;
            
            // Keep values within realistic ranges
            equipment.temperature = Math.max(60, Math.min(120, equipment.temperature));
            equipment.vibration = Math.max(0.5, Math.min(6, equipment.vibration));
            equipment.pressure = Math.max(80, Math.min(200, equipment.pressure));
            
            // Adjust health based on conditions
            let healthChange = 0;
            if (equipment.temperature > 100) healthChange -= 0.1;
            if (equipment.vibration > 4) healthChange -= 0.2;
            if (equipment.temperature < 85 && equipment.vibration < 2.5) healthChange += 0.05;
            
            equipment.health = Math.max(0, Math.min(100, equipment.health + healthChange));
            
            // Update status based on health
            if (equipment.health < 60) {
                equipment.status = 'Maintenance Due';
            } else if (equipment.health < 80 && equipment.status !== 'Under Maintenance') {
                if (Math.random() < 0.1) equipment.status = 'Maintenance Due';
            }
        });
        
        // Update dashboard stats
        this.updateDashboard();
    }

    updateLastUpdated() {
        document.getElementById('lastUpdated').textContent = new Date().toLocaleString();
    }

    exportData(format) {
        const data = {
            timestamp: new Date().toISOString(),
            equipmentData: this.equipmentData,
            summary: {
                totalEquipment: this.equipmentData.length,
                activeEquipment: this.equipmentData.filter(eq => eq.status === 'Active').length,
                maintenanceEquipment: this.equipmentData.filter(eq => eq.status === 'Maintenance Due').length,
                avgHealth: (this.equipmentData.reduce((sum, eq) => sum + eq.health, 0) / this.equipmentData.length).toFixed(1)
            }
        };

        if (format === 'json') {
            const dataStr = JSON.stringify(data, null, 2);
            this.downloadFile(dataStr, 'nurogensis-data.json', 'application/json');
        } else if (format === 'csv') {
            const csvData = this.convertToCSV(this.equipmentData);
            this.downloadFile(csvData, 'nurogensis-data.csv', 'text/csv');
        }
        
        alert(`Data exported successfully as ${format.toUpperCase()}!`);
    }

    convertToCSV(data) {
        const headers = ['ID', 'Name', 'Category', 'Location', 'Status', 'Health', 'Temperature', 'Vibration', 'Pressure', 'Purchase Date'];
        const rows = data.map(eq => [
            eq.id, eq.name, eq.category, eq.location, eq.status, 
            eq.health, eq.temperature, eq.vibration, eq.pressure, eq.purchaseDate
        ]);
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    editEquipment(index) {
        const equipment = this.equipmentData[index];
        const newName = prompt('Enter new equipment name:', equipment.name);
        if (newName && newName.trim()) {
            equipment.name = newName.trim();
            this.refreshEquipmentList();
            this.updateDashboard();
            this.updateCharts();
            this.updateSensorDisplay();
        }
    }

    deleteEquipment(index) {
        if (confirm('Are you sure you want to delete this equipment?')) {
            this.equipmentData.splice(index, 1);
            this.refreshEquipmentList();
            this.updateDashboard();
            this.updateCharts();
            this.updateSensorDisplay();
            console.log(`Equipment at index ${index} deleted successfully`);
        }
    }
}

// Global handler functions for equipment management
function handleEditEquipment(index) {
    console.log('Edit button clicked for index:', index);
    if (window.nurogensisSystem) {
        if (typeof window.nurogensisSystem.editEquipment === 'function') {
            window.nurogensisSystem.editEquipment(index);
        } else {
            console.error('editEquipment method not found');
            alert('Edit function not available. Please refresh the page.');
        }
    } else {
        console.error('NUROGENSIS system not found on window object');
        alert('System not ready. Please refresh the page.');
    }
}

function handleDeleteEquipment(index) {
    console.log('Delete button clicked for index:', index);
    if (window.nurogensisSystem) {
        if (typeof window.nurogensisSystem.deleteEquipment === 'function') {
            window.nurogensisSystem.deleteEquipment(index);
        } else {
            console.error('deleteEquipment method not found');
            alert('Delete function not available. Please refresh the page.');
        }
    } else {
        console.error('NUROGENSIS system not found on window object');
        alert('System not ready. Please refresh the page.');
    }
}

// Attach to window for global access
window.handleEditEquipment = handleEditEquipment;
window.handleDeleteEquipment = handleDeleteEquipment;

// Global functions for navigation and form management
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function clearForm() {
    document.getElementById('equipmentForm').reset();
}

function filterEquipment() {
    if (window.nurogensisSystem) {
        window.nurogensisSystem.filterEquipment();
    }
}

function refreshEquipmentList() {
    if (window.nurogensisSystem) {
        window.nurogensisSystem.refreshEquipmentList();
    }
}

function exportData(format) {
    if (window.nurogensisSystem) {
        window.nurogensisSystem.exportData(format);
    }
}

// Initialize the system when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting system initialization...');
    
    // Hide loading screen initially after a short delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            console.log('Hiding loading screen...');
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Initialize the system
    try {
        console.log('Creating NurogensisSystem instance...');
        nurogensisSystemInstance = new NurogensisSystem();
        window.nurogensisSystem = nurogensisSystemInstance;
        console.log('NUROGENSIS Predictive Maintenance System Initialized Successfully!');
        
    } catch (error) {
        console.error('CRITICAL ERROR: Failed to initialize NUROGENSIS system:', error);
        
        // Try to hide loading screen even if initialization fails
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        
        // Show error message to user
        document.body.innerHTML += `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: #e74c3c; color: white; padding: 20px; border-radius: 10px; 
                        z-index: 10000; text-align: center;">
                <h3>System Initialization Failed</h3>
                <p>Please refresh the page or check console for details.</p>
                <button onclick="location.reload()" style="background: white; color: #e74c3c; 
                        border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;
    }
});
