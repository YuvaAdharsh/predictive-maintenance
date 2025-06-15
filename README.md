# NUROGENSIS - Predictive Maintenance System

## 🔧 Overview
NUROGENSIS is a comprehensive industrial predictive maintenance system that uses machine learning algorithms and real-time sensor data to prevent unexpected machinery breakdowns in factories and industrial facilities.

## ✨ Features

### 📊 Dashboard
- **Real-time Equipment Overview**: Live monitoring of all registered equipment
- **Health Statistics**: Total equipment count, active systems, maintenance due alerts
- **Interactive Charts**: Equipment status distribution and health trends
- **Data Export**: Export system data in JSON or CSV formats

### 🔮 Predictive Analysis
- **Sensor Monitoring**: Real-time temperature, vibration, and pressure readings
- **Health Score Calculation**: AI-powered equipment health assessment
- **Failure Prediction**: Timeline predictions for potential equipment failures
- **Visual Analytics**: Live charts showing sensor data trends

### ➕ Equipment Management
- **Equipment Registration**: Add new equipment with detailed specifications
- **Category Management**: Organize by Manufacturing, IT, HVAC, Safety, Tools, Vehicles
- **Status Tracking**: Monitor Active, Maintenance Due, Under Maintenance, Out of Service
- **Search & Filter**: Advanced filtering by category, status, and search terms

### 🔍 Troubleshooting Guide
- **Temperature Anomalies**: Guidelines for overheating issues
- **Vibration Problems**: Solutions for mechanical wear detection
- **Power Consumption**: Energy efficiency monitoring
- **Humidity Control**: Environmental factor management
- **Maintenance Tips**: Best practices for predictive maintenance

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern dark theme with responsive design
- **JavaScript (ES6+)**: Object-oriented programming with classes
- **Chart.js**: Interactive data visualization

### Design
- **Dark Theme**: Professional industrial aesthetic
- **Responsive Layout**: Mobile-first design approach
- **Gradient Backgrounds**: Modern visual appeal
- **Interactive Elements**: Hover effects and smooth transition


### Getting Started
1. Open `index.html` in your web browser
2. The system will initialize with sample equipment data
3. Navigate through different sections using the top navigation

### Adding Equipment
1. Go to "Register Equipment" section
2. Fill in all required fields:
   - Equipment ID (unique identifier)
   - Equipment Name
   - Category selection
   - Location details
   - Purchase and warranty dates
   - Maintenance schedule
3. Click "Register Equipment"

### Managing Equipment
1. Navigate to "Manage Equipment"
2. Use search and filters to find specific equipment
3. Click "Edit" to modify equipment names
4. Click "Delete" to remove equipment (with confirmation)

### Monitoring Health
1. Check the Dashboard for overall system health
2. View Predictive Analysis for detailed sensor data
3. Monitor real-time updates every 5 seconds
4. Export data for external analysis

## 🔧 Configuration

### Sample Equipment Data
The system comes pre-loaded with:
- Industrial Pump A1 (Manufacturing)
- HVAC Unit B2 (HVAC)  
- Generator C3 (Manufacturing)

### Sensor Simulation
- **Temperature**: 60-120°F range
- **Vibration**: 0.5-6 mm/s range
- **Pressure**: 80-200 psi range
- **Health Score**: 0-100% with 5 decimal precision

### Chart Settings
- **Status Chart**: Doughnut chart with equipment distribution
- **Health Chart**: Line chart showing equipment health trends
- **Sensor Chart**: Real-time sliding window (20 data points)
- **Prediction Chart**: Bar chart for failure predictions


## 📊 Data Export

### JSON Export
- Complete equipment data with metadata
- Timestamp and summary statistics
- Structured format for API integration

### CSV Export
- Spreadsheet-compatible format
- Headers: ID, Name, Category, Location, Status, Health, Temperature, Vibration, Pressure, Purchase Date
- Easy import into Excel or Google Sheets

## 🔒 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📱 Mobile Support

- Responsive design for tablets and smartphones
- Touch-friendly interface elements
- Optimized chart rendering for small screens




## 📈 Future Enhancements

- [ ] Machine Learning integration for real failure prediction
- [ ] User authentication and role management
- [ ] Database integration for persistent storage
- [ ] Email alerts for critical equipment status
- [ ] Mobile app companion
- [ ] API endpoints for external system integration
- [ ] Advanced analytics and reporting
- [ ] IoT sensor integration capabilities
