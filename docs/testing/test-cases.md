# Test Cases (Sign-up / Login)

## Test ID: 01-ClientLogin
* **Designed by:** PUT TEXT
* **Test Data Source:** PUT TEXT
* **Module or Screen:** PUT TEXT
* **Objectives:** PUT TEXT

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username<br>2. Enter "mypassword" as the Password<br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 02-AsceoftLogin
* **Designed by:** Antonio Almero
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen, OTP Verification Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **02-1** | Valid user login | 1. In the email address field, enter an email address with a registered account. <br>2. In the password field, enter the correct password for the registered account. <br>3. Click the "Sign In" button. <br>4. After being redirected to the OTP screen, view the delivered email with the OTP. <br>5. In the OTP input, enter the correct OTP. <br>6. Click the "Verify" button. | After performing the test steps, the user should have been redirected to the main dashboard page.<br><br>*Note: OTP has not been tested as it has not been verified with the client if we should still implement that feature.* | The user was directed to the main dashboard page. | lain Guillermo / 06-10-2026 |
| **02-2** | Invalid user login: incorrect password | 1. In the email address field, enter an email address with a registered account. <br>2. In the password field, enter any incorrect password. <br>3. Click the "Sign In" button. | After performing the test steps, the user must still remain in the user login screen. A message displaying "Incorrect password entered" or similar must be/have been visible. | The user still remain in the login screen with a message displaying "Invalid login credentials" to indicate that one/both of the login credentials is incorrect. | lain Guillermo / 06-10-2026 |
| **02-3** | Invalid user login: invalid email address | 1. In the email address field, enter an email address WITHOUT a registered account. <br>2. In the password field, enter any password. <br>3. Click the "Sign In" button. | After performing the test steps, the user must still remain in the user login screen. A message displaying "Invalid email address entered" or similar must be/have been visible. | The user still remain in the login screen with a message displaying "Invalid login credentials" to indicate that one/both of the login credentials is incorrect. | lain Guillermo / 06-10-2026 |
| **02-4** | Invalid user login: incorrect OTP | 1. In the email address field, enter an email address with a registered account. <br>2. In the password field, enter the correct password for the registered account. <br>3. Click the "Sign In" button. <br>4. After being redirected to the OTP screen, enter any incorrect OTP. <br>5. Click the "Verify" button. | After performing the test steps, the user must still remain in the OTP screen. A message displaying "Incorrect OTP entered" or similar must be/have been visible. | *(Not specified / remaining in OTP screen)* | lain Guillermo / 06-10-2026 |

---

## Test ID: 03-PasswordReset
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username<br>2. Enter "mypassword" as the Password<br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 04-LogOut
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username <br>2. Enter "mypassword" as the Password <br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

## Test ID: 05-ProjectCreate
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username <br>2. Enter "mypassword" as the Password <br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

--

## Test ID: 06-ProjectView
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username <br>2. Enter "mypassword" as the Password <br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 07-ProjectEdit
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username <br>2. Enter "mypassword" as the Password <br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 08-ProjectDelete
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username <br>2. Enter "mypassword" as the Password <br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 09-PhaseCreate
* **Designed by:** Jose Dimagiba
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username <br>2. Enter "mypassword" as the Password <br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

--

## Test ID: 10-PhaseEdit
* **Designed by:** Isa Lee
* **Test Data Source:** User data entry
* **Module or Screen:** Edit Phase
* **Objectives:** To test if a Product Owner (PO) can successfully edit an existing phase and ensure that updates are reflected in the project view, validation rules are enforced, and history is recorded.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10-1** | Edit Phase with Valid Data | 1. Log in as PO.<br>2. Select an existing phase.<br>3. Click "Edit Phase".<br>4. Modify phase details with valid values.<br>5. Click "Save Changes". | The phase information is successfully updated.<br>A success message is displayed.<br>The updated details are displayed in the phase information. | The phase information was successfully updated and displayed correctly after saving changes. | Isa Lee / 06-10-2026 |
| **10-2** | Verify that Changes are Reflected Immediately in the Project View via the UI | 1. Edit a phase field with a valid value.<br>2. Click "Save Changes".<br>3. Return to the project overview page. | The updated phase information appears immediately in the UI.<br>No page refresh is required. | Updated phase information appeared correctly in the project overview without requiring a page refresh. | Isa Lee / 06-10-2026 |
| **10-3** | Verify that Changes are Stored in the Database | 1. Select an existing phase.<br>2. Click "Edit Phase".<br>3. Modify a field with a valid value.<br>4. Click "Save Changes".<br>5. Refresh the page or log out and log back in.<br>6. Reopen the phase. | Updated information remains after refreshing.<br>The system retrieves the updated data from the database.<br>Information is not stored through local storage. | Changes persisted after refresh and relogin. Updated information remained visible. Database verification could not be performed. | Isa Lee / 06-10-2026 |
| **10-4** | Verify that the Database Correctly Records Previous Phase History Details | 1. Select an existing phase.<br>2. Record current phase details.<br>3. Edit the phase information.<br>4. Save changes.<br>5. Check the database. | Previous phase details are logged in history.<br>Date, time, and editor information are recorded.<br>Updated values are stored. | Database history verification could not be performed because database access was unavailable. | Isa Lee / 06-10-2026 |
| **10-5** | Required Fields Validation | 1. Leave a required field blank.<br>2. Click "Save Changes". | Submission is prevented.<br>A validation message is displayed.<br>Original phase information remains unchanged. | Validation worked correctly. The system prevented submission and displayed an error message. | Isa Lee / 06-10-2026 |
| **10-6** | Phase Edit Form Accepts Valid Inputs Only | 1. Enter an invalid value into a field.<br>2. Modify other fields with valid values.<br>3. Click "Save Changes". | Submission is prevented.<br>A validation message is displayed.<br>No changes are saved. | Invalid input was rejected and changes were not saved. | Isa Lee / 06-10-2026 |
| **10-7** | Unauthorized User Attempts to Edit Phase | 1. Log in as a Project Team Member or Client user.<br>2. Open an existing phase.<br>3. Attempt to access the Edit Phase function. | The Edit Phase option is unavailable or disabled.<br>The user cannot modify phase information. | Unauthorized users could not access the Edit Phase function. | Isa Lee / 06-10-2026 |

---

## Test ID: 11-PhaseDelete
* **Designed by:** Iain Guillermo
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username<br>2. Enter "mypassword" as the Password<br>3. Click the Login button | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 12-ModuleCreate
* **Designed by:** Isa Lee
* **Test Data Source:** User data entry
* **Module or Screen:** Module Creation Screen
* **Objectives:** To test if a Product Owner or Project Team Member can successfully create a module under an existing phase.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **12-1** | Valid and Successful Module Creation | 1. Select an existing phase.<br>2. Click the "Create Module" button.<br>3. Enter all required information.<br>4. Click "Save". | The module is successfully created.<br>A success message is displayed.<br>The module is linked to the selected phase.<br>The module appears in the project structure hierarchy. |  | Isa Lee / 06-10-2026 |
| **12-2** | Verify that the Module is Linked to the Correct Phase | 1. Select phase "Correct Phase".<br>2. Create module "Tester Module".<br>3. Save the module.<br>4. Navigate to another phase. | The module appears only under the correct phase.<br>The module does not appear under other phases. |  | Isa Lee / 06-10-2026 |
| **12-3** | Required Fields Validation | 1. Select an existing phase.<br>2. Click "Create Module".<br>3. Leave a required field blank.<br>4. Fill other required fields.<br>5. Click "Save". | Submission is prevented.<br>A validation message appears.<br>No module is created. |  | Isa Lee / 06-10-2026 |
| **12-4** | Module Creation Form Accepts Valid Inputs ONLY | 1. Select an existing phase.<br>2. Click "Create Module".<br>3. Enter invalid input in a field.<br>4. Complete remaining fields with valid data.<br>5. Click "Save". | Submission is prevented.<br>Validation message appears.<br>No module is created. |  | Isa Lee / 06-10-2026 |
| **12-5** | Unauthorized User Attempts to Create a Module | 1. Log in as a Client user.<br>2. Navigate to Project Structure.<br>3. Attempt to create a module. | Create Module option is unavailable or disabled.<br>User cannot create a module. |  | Isa Lee / 06-10-2026 |
| **12-6** | Verify that the Module Successfully Appears in the Correct Project Structure/Hierarchy | 1. Create a module.<br>2. Save the module.<br>3. Refresh the page. | The module remains visible under the selected phase.<br>The hierarchy is correct. |  | Isa Lee / 06-10-2026 |
| **12-7** | Verify that the Module is Stored in the Database | 1. Edit an existing module.<br>2. Save changes.<br>3. Refresh or relog.<br>4. Reopen the module.<br>5. Check the database. | Changes persist after refresh.<br>Updated data is retrieved from the database. |  | Isa Lee / 06-10-2026 |

---

## Test ID: 13-ModuleEdit
* **Designed by:** Isa Lee
* **Test Data Source:** User data entry
* **Module or Screen:** Edit Module Screen
* **Objectives:** To test whether a Product Owner (PO) can successfully edit an existing module and ensure updates are reflected in the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **13-1** | Edit the Module with Valid Data | Log in as PO → Select module → Edit module → Modify values → Save Changes | Changes are saved successfully and a success message appears. |  | Isa Lee / 06-10-2026 |
| **13-2** | Verify that the Updates are Reflected in the UI | Edit a module → Save changes → Return to project structure | Changes are visible through the UI. |  | Isa Lee / 06-10-2026 |
| **13-3** | Verify that the Changes are Stored in the Database | Edit module → Save → Refresh/relog → Check database | Changes persist and are retrieved from database. |  | Isa Lee / 06-10-2026 |
| **13-4** | Verify that the Database Correctly Records Previous Module History Details | Record module details → Edit module → Save → Check database | History log contains previous values and editor information. |  | Isa Lee / 06-10-2026 |
| **13-5** | Required Fields Validation | Leave required field blank → Save Changes | Submission prevented and validation message shown. |  | Isa Lee / 06-10-2026 |
| **13-6** | Module Edit Form Accepts Valid Inputs ONLY | Enter invalid value → Save Changes | Submission prevented and validation message shown. |  | Isa Lee / 06-10-2026 |
| **13-7** | Unauthorized User Attempts to Edit Module | Log in as unauthorized user → Open module → Attempt edit | Edit Module option unavailable or disabled. |  | Isa Lee / 06-10-2026 |

---

## Test ID: 14-ModuleDelete
* **Designed by:** Isa Lee
* **Test Data Source:** User data entry
* **Module or Screen:** Module Deletion Screen
* **Objectives:** To test if a Product Owner can successfully delete a module and verify cascading effects.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **14-1** | Successful Deletion of Module with Confirmation | Delete module → Confirm Delete → Refresh | Module is deleted and success message appears. |  | Isa Lee / 06-10-2026 |
| **14-2** | Verify that the Module is Removed from the UI | Delete module → Refresh → Search module | Module no longer appears in UI. |  | Isa Lee / 06-10-2026 |
| **14-3** | Verify that the Workflows and Tickets are also Deleted | Delete module containing workflows and tickets | Related workflows and tickets are deleted. |  | Isa Lee / 06-10-2026 |
| **14-4** | Verify that Module History is Stored in the Database Despite Deletion | Delete module → Check database | Historical records remain stored. |  | Isa Lee / 06-10-2026 |
| **14-5** | Verify that the Deletion Confirmation Prompt Works Properly | Delete module → Observe confirmation dialog | Confirmation prompt appears before deletion. |  | Isa Lee / 06-10-2026 |
| **14-6** | Attempt to Access Deleted Modules | Delete module → Attempt direct access | System returns error or module not found. |  | Isa Lee / 06-10-2026 |
| **14-7** | Unauthorized User Cannot Delete a Module | Log in as unauthorized user → Attempt delete | Delete button hidden or disabled. |  | Isa Lee / 06-10-2026 |

---

## Test ID: 15-WorkflowCreate
* **Designed by:** Iain Guillermo
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, enter valid credentials and click Login. | User profile is displayed. | User profile is displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 16-WorkflowEdit
* **Designed by:** Iain Guillermo
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, enter valid credentials and click Login. | User profile is displayed. | User profile is displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 17-WorkflowDelete
* **Designed by:** Iain Guillermo
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, enter valid credentials and click Login. | User profile is displayed. | User profile is displayed. | Jose Dimagiba / 5/22/26 |

---

## Test ID: 18-ProjectFullView
* **Designed by:** Iain Guillermo
* **Test Data Source:** User data entry
* **Module or Screen:** User Login Screen
* **Objectives:** To test if registered users can log in to the system.

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** | Valid User login | In the Login Screen, enter valid credentials and click Login. | User profile is displayed. | User profile is displayed. | Jose Dimagiba / 5/22/26 |
