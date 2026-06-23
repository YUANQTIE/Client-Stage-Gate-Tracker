# CSSWENG Test Cases

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
