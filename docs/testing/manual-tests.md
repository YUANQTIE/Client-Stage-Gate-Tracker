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

* ---

# Phase Edit Verification (Test ID: 10-PhaseEdit)

* **Tester Name:** Isa Lee
* **Date of Execution:** July 2026
* **Module / Screen Under Test:** Edit Phase Screen
* **Objective:** To test if a Product Owner (PO) can successfully edit an existing phase and ensure that updates are reflected in the project view, validation rules are enforced, and history is recorded.

---

### Scenario 1: Edit Phase with Valid Data (Test Case 10-1)

* **Status:** PASSED

##### Actions Performed:
1. Logged in as a Product Owner.
2. Selected an existing phase.
3. Clicked "Edit Phase".
4. Modified the phase details using valid values.
5. Clicked "Save Changes".

* **Expected Behavior:** The phase information should be updated successfully, a success message should be displayed, and the updated phase details should appear in the phase information.
* **Actual Results Observed:** The phase information was updated successfully, a success message was displayed, and the updated details were reflected in the phase information.
* **Tester Notes:** None.

---

### Scenario 2: Verify Changes Are Reflected Immediately in the Project View (Test Case 10-2)

* **Status:** PASSED

##### Actions Performed:
1. Opened the Edit Phase screen.
2. Edited the phase name with a valid value.
3. Clicked "Save Changes".
4. Returned to the project overview page.

* **Expected Behavior:** The updated phase information should immediately appear in the user interface without requiring a page refresh.
* **Actual Results Observed:** The updated phase information appeared correctly in the project overview page without refreshing.
* **Tester Notes:** UI synchronization worked as expected.

---

### Scenario 3: Verify Changes Persist After Refreshing or Logging Out (Test Case 10-3)

* **Status:** PASSED

##### Actions Performed:
1. Selected an existing phase.
2. Edited a phase field using a valid value.
3. Clicked "Save Changes".
4. Refreshed the page.
5. Logged out and logged back in.
6. Reopened the edited phase.

* **Expected Behavior:** The updated information should remain unchanged after refreshing or logging back in, and the system should retrieve the updated data from the database.
* **Actual Results Observed:** The updated phase information remained intact after refreshing and logging back in. The updated data was successfully retrieved.
* **Tester Notes:** Data persistence was verified successfully.

---

### Scenario 4: Verify Database Records Previous Phase History (Test Case 10-4)

* **Status:** PASSED

##### Actions Performed:
1. Selected an existing phase.
2. Recorded the original phase details.
3. Edited the phase information.
4. Saved the changes.
5. Reviewed the database history records.

* **Expected Behavior:** The database should store the previous phase details and record the edit history, including the correct date, time, and user who performed the modification.
* **Actual Results Observed:** Previous phase information was recorded successfully and history records contained the correct information.
* **Tester Notes:** Audit history tracking is functioning correctly.

---

### Scenario 5: Required Fields Validation (Test Case 10-5)

* **Status:** PASSED

##### Actions Performed:
1. Opened the Phase Edit form.
2. Left a required field blank.
3. Clicked "Save Changes".

* **Expected Behavior:** The system should reject the update, prevent submission, display a validation message, and preserve the original phase information.
* **Actual Results Observed:** The system prevented submission, displayed a validation message, and retained the original phase information.
* **Tester Notes:** Required field validation worked correctly.

---

### Scenario 6: Invalid Input Validation (Test Case 10-6)

* **Status:** PASSED

##### Actions Performed:
1. Opened the Phase Edit form.
2. Entered an invalid value into a field.
3. Modified other editable fields with valid values.
4. Clicked "Save Changes".

* **Expected Behavior:** The system should reject the invalid input, prevent submission, display a validation message, and avoid saving any changes.
* **Actual Results Observed:** The system rejected the invalid input and prevented any changes from being saved.
* **Tester Notes:** Input validation is functioning correctly.

---

### Scenario 7: Unauthorized User Attempts to Edit Phase (Test Case 10-7)

* **Status:** PASSED

##### Actions Performed:
1. Logged in as a Product Team Member or Client user.
2. Opened an existing phase.
3. Attempted to access the Edit Phase function.

* **Expected Behavior:** The Edit Phase option should be unavailable or disabled and the user should not be able to modify phase information.
* **Actual Results Observed:** The Edit Phase option was unavailable and the user could not edit the phase information.
* **Tester Notes:** Access control restrictions are functioning correctly.
