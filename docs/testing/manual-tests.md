# Manual Testing

**User Login Verification (Test ID: 02-AsceoftLogin)**

* **Tester Name:** Iain Guillermo[cite: 4]
* **Date of Execution:** June 10, 2026[cite: 4]
* **Module / Screen Under Test:** User Login Screen & OTP Verification Screen[cite: 4]
* **Objective:** To test if registered users can log in to the system.[cite: 4]

---

### Scenario 1: Valid User Login (Test Case 02-1)
* **Status:** PASSED[cite: 4]

##### Actions Performed:
1. Opened the login screen and entered an email address belonging to a registered account.[cite: 4]
2. Entered the correct password for that account.[cite: 4]
3. Clicked the 'Sign In' button.[cite: 4]

* **Expected Behavior:** The user should be redirected to the main dashboard page.[cite: 4]
* **Actual Results Observed:** The user was successfully directed to the main dashboard page.[cite: 4]
* **Tester Notes:** Steps 4, 5, and 6 involving the OTP input and verification were bypassed because the OTP feature has not yet been verified with the client or implemented.[cite: 4]

---

### Scenario 2: Invalid Login - Incorrect Password (Test Case 02-2)
* **Status:** PASSED[cite: 4]

##### Actions Performed:
1. Entered a valid, registered email address.[cite: 4]
2. Entered an incorrect password.[cite: 4]
3. Clicked the 'Sign In' button.[cite: 4]

* **Expected Behavior:** The user must remain on the login screen, and a message displaying 'Incorrect password entered' or something similar should be visible.[cite: 4]
* **Actual Results Observed:** The user remained on the login screen, and an error message displaying 'Invalid login credentials' appeared.[cite: 4]
* **Tester Notes:** None[cite: 4]

---

### Scenario 3: Invalid Login - Unregistered Email (Test Case 02-3)
* **Status:** PASSED[cite: 4]

##### Actions Performed:
1. Entered an email address that is not registered in the system.[cite: 4]
2. Entered a random password.[cite: 4]
3. Clicked the 'Sign In' button.[cite: 4]

* **Expected Behavior:** The user must remain on the login screen, and a message displaying 'Invalid email address entered' or something similar should be visible.[cite: 4]
* **Actual Results Observed:** The user remained on the login screen, and an error message displaying 'Invalid login credentials' appeared.[cite: 4]
* **Tester Notes:** None[cite: 4]

---

### Scenario 4: Invalid Login - Incorrect OTP (Test Case 02-4)
* **Status:** BLOCKED[cite: 4]

##### Actions Performed:
1. Entered a valid, registered email address.[cite: 4]
2. Entered the correct password.[cite: 4]
3. Clicked the 'Sign In' button.[cite: 4]
4. Attempted to enter an incorrect OTP on the secondary verification screen and hit 'Verify'.[cite: 4]

* **Expected Behavior:** The user must remain on the OTP screen, and an error message displaying 'Incorrect OTP entered' should be visible.[cite: 4]
* **Actual Results Observed:** Unable to verify. The system bypassed the OTP screen entirely and went to the dashboard due to the feature not being fully implemented yet.[cite: 4]
* **Tester Notes:** Awaiting client confirmation on OTP implementation status.[cite: 4]
