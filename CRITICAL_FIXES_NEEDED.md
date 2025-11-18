# Critical IndexedDB Fixes Needed

## Status
The code has `app.db` references throughout but `app.db` is NEVER initialized (it's null).
This causes "Cannot read properties of null" errors everywhere.

## Immediate Action Required
Remove or replace ALL `app.db.*` calls with API calls.

## Most Critical Functions (Breaking Admin Panel)

1. **updateDatabaseStatus()** - Line 2898
2. **loadServicesTable()** - Line 3856  
3. **loadAdminsTable()** - Line 3909
4. **deleteUser()** - Line 3989
5. **deleteService()** - Line 4041
6. **deleteAdmin()** - Line 4060
7. **showEditServiceModal()** - Line 4088
8. **addService()** - Line 4131
9. **updateService()** - Line 4166
10. **addAdmin()** - Line 4280
11. **editAdmin()** - Line 4318
12. **updateAdmin()** - Line 4375
13. **showUserDetails()** - Line 4558
14. **exportData()** - Line 4690
15. **importData()** - Line 4747
16. **clearDatabase()** - Line 4772
17. **createBackup()** - Line 4789
18. **restoreBackup()** - Line 4846
19. **saveCompanySettings()** - Line 5011
20. **editAddress()** - Line 5727
21. **updateAddress()** - Line 5766
22. **loadSampleData()** - Line 5887

## Solution
Since this is extensive, I recommend:
1. Comment out the entire DatabaseManager class
2. Set app.db = null in app object (already done)
3. Systematically replace each function above with API calls

This will require checking if backend endpoints exist for each operation.
