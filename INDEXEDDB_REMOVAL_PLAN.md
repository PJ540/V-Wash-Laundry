# IndexedDB Removal Plan

## Critical Issue
The admin dashboard is not working because IndexedDB references are still present throughout the code. IndexedDB stores data locally in the browser, which means:
- Admin cannot see customer bookings (different browser storage)
- Data is not centralized
- Backend API is not being used properly

## Functions That Need Complete Replacement

### 1. Database Status Functions
- `updateDatabaseStatus()` - Line ~2898
  - Remove IndexedDB size calculation
  - Remove all `app.db.getAll()` calls
  - Replace with API calls to get counts

### 2. Service Management
- `loadServicesTable()` - Line ~3856
  - Replace `app.db.getAll('services')` with API call
- `showEditServiceModal()` - Line ~4088
  - Replace `app.db.getAll('services')` with API call
- `addService()` - Line ~4131
  - Replace `app.db.add('services', newService)` with API POST
- `updateService()` - Line ~4166
  - Replace `app.db.getAll()` and `app.db.update()` with API PUT
- `deleteService()` - Line ~4041
  - Replace `app.db.delete('services', serviceId)` with API DELETE

### 3. Admin Management
- `loadAdminsTable()` - Line ~3909
  - Replace `app.db.getAll('admins')` with API call
- `addAdmin()` - Line ~4280
  - Replace `app.db.getAll()` and `app.db.add()` with API calls
- `editAdmin()` - Line ~4318
  - Replace `app.db.getAll('admins')` with API call
- `updateAdmin()` - Line ~4375
  - Replace `app.db.getAll()` and `app.db.update()` with API calls
- `deleteAdmin()` - Line ~4060
  - Replace `app.db.delete('admins', adminId)` with API DELETE

### 4. User Management
- `deleteUser()` - Line ~3989
  - Replace all `app.db.getAll()` and `app.db.delete()` with API DELETE
- `showUserDetails()` - Line ~4558
  - Replace `app.db.getAll()` calls with API calls

### 5. Address Management
- `editAddress()` - Line ~5727
  - Replace `app.db.getAll('addresses')` with API call
- `updateAddress()` - Line ~5766
  - Replace `app.db.getAll()` and `app.db.update()` with API calls

### 6. Data Import/Export
- `exportData()` - Line ~4690
  - Replace `app.db.exportAllData()` with API call
- `importData()` - Line ~4747
  - Replace `app.db.importData()` with API call
- `clearDatabase()` - Line ~4772
  - Replace `app.db.clearAllData()` with API call
- `createBackup()` - Line ~4789
  - Replace `app.db.exportAllData()` with API call
- `restoreBackup()` - Line ~4846
  - Replace `app.db.importData()` with API call

### 7. Settings
- `saveCompanySettings()` - Line ~5011
  - Replace `app.db.update('settings')` with API calls

### 8. Sample Data
- `loadSampleData()` - Line ~5887
  - Replace all `app.db.getAll()` and `app.db.add()` with API calls

## Solution Approach
1. Keep DatabaseManager class but make it inactive (comment out initialization)
2. Replace ALL app.db.* calls with corresponding API calls
3. Ensure all functions use apiClient for backend communication
4. Remove app.db initialization from app object

## Priority Order
1. Service Management (most critical for admin)
2. Admin Management
3. User Management  
4. Database Status
5. Import/Export features
6. Sample Data loading
