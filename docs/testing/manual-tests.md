# Manual Test Log

**User Login Verification (Test ID: 02-AsceoftLogin)**

* **Tester Name:** Iain Guillermo
* **Date of Execution:** June 10, 2026
* **Module / Screen Under Test:** User Login Screen & OTP Verification Screen
* **Objective:** To test if registered users can log in to the system.

---

### Scenario 1: Valid User Login (Test Case 02-1)
* **Status:** PASSED

##### Actions Performed:
1. Opened the login screen and entered an email address belonging to a registered account.
2. Entered the correct password for that account.
3. Clicked the 'Sign In' button.

* **Expected Behavior:** The user should be redirected to the main dashboard page.
* **Actual Results Observed:** The user was successfully directed to the main dashboard page.
* **Tester Notes:** Steps 4, 5, and 6 involving the OTP input and verification were bypassed because the OTP feature has not yet been verified with the client or implemented.

---

### Scenario 2: Invalid Login - Incorrect Password (Test Case 02-2)
* **Status:** PASSED

##### Actions Performed:
1. Entered a valid, registered email address.
2. Entered an incorrect password.
3. Clicked the 'Sign In' button.

* **Expected Behavior:** The user must remain on the login screen, and a message displaying 'Incorrect password entered' or something similar should be visible.
* **Actual Results Observed:** The user remained on the login screen, and an error message displaying 'Invalid login credentials' appeared.
* **Tester Notes:** None

---

### Scenario 3: Invalid Login - Unregistered Email (Test Case 02-3)
* **Status:** PASSED

##### Actions Performed:
1. Entered an email address that is not registered in the system.
2. Entered a random password.
3. Clicked the 'Sign In' button.

* **Expected Behavior:** The user must remain on the login screen, and a message displaying 'Invalid email address entered' or something similar should be visible.
* **Actual Results Observed:** The user remained on the login screen, and an error message displaying 'Invalid login credentials' appeared.
* **Tester Notes:** None

---

### Scenario 4: Invalid Login - Incorrect OTP (Test Case 02-4)
* **Status:** BLOCKED

##### Actions Performed:
1. Entered a valid, registered email address.
2. Entered the correct password.
3. Clicked the 'Sign In' button.
4. Attempted to enter an incorrect OTP on the secondary verification screen and hit 'Verify'.

* **Expected Behavior:** The user must remain on the OTP screen, and an error message displaying 'Incorrect OTP entered' should be visible.
* **Actual Results Observed:** Unable to verify. The system bypassed the OTP screen entirely and went to the dashboard due to the feature not being fully implemented yet.
* **Tester Notes:** Awaiting client confirmation on OTP implementation status.
