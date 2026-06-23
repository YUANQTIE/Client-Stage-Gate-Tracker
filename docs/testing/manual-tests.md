# CSSWENG Masterfile Test Cases

## Test ID: 01-ClientLogin
* **Designed by:** Jose Dimagiba [cite: 2, 3]
* **Test Data Source:** User data entry [cite: 4, 5]
* **Module or Screen:** User Login Screen [cite: 7]
* **Objectives:** To test if registered users can log in to the system. [cite: 8, 9]

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** [cite: 6] | Valid User login [cite: 6] | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username<br>2. Enter "mypassword" as the Password<br>3. Click the Login button [cite: 6] | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. [cite: 6] | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. [cite: 6] | Jose Dimagiba / 5/22/26 [cite: 6] |

---

## Test ID: 02-AsceoftLogin
* **Designed by:** Antonio Almero [cite: 11, 12]
* **Test Data Source:** User data entry [cite: 13, 14]
* **Module or Screen:** User Login Screen, OTP Verification Screen [cite: 16, 17]
* **Objectives:** To test if registered users can log in to the system. [cite: 18, 19]

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **02-1** [cite: 15] | Valid user login [cite: 15] | 1. In the email address field, enter an email address with a registered account. [cite: 15]<br>2. In the password field, enter the correct password for the registered account. [cite: 20]<br>3. Click the "Sign In" button. [cite: 20]<br>4. After being redirected to the OTP screen, view the delivered email with the OTP. [cite: 20]<br>5. In the OTP input, enter the correct OTP. [cite: 20]<br>6. Click the "Verify" button. [cite: 20] | After performing the test steps, the user should have been redirected to the main dashboard page. [cite: 15]<br><br>*Note: OTP has not been tested as it has not been verified with the client if we should still implement that feature.* [cite: 20] | The user was directed to the main dashboard page. [cite: 15] | lain Guillermo / 06-10-2026 [cite: 15] |
| **02-2** [cite: 20] | Invalid user login: incorrect password [cite: 20] | 1. In the email address field, enter an email address with a registered account. [cite: 20]<br>2. In the password field, enter any incorrect password. [cite: 20]<br>3. Click the "Sign In" button. [cite: 20] | After performing the test steps, the user must still remain in the user login screen. A message displaying "Incorrect password entered" or similar must be/have been visible. [cite: 20] | The user still remain in the login screen with a message displaying "Invalid login credentials" to indicate that one/both of the login credentials is incorrect. [cite: 20] | lain Guillermo / 06-10-2026 [cite: 20] |
| **02-3** [cite: 21] | Invalid user login: invalid email address [cite: 21] | 1. In the email address field, enter an email address WITHOUT a registered account. [cite: 21]<br>2. In the password field, enter any password. [cite: 21]<br>3. Click the "Sign In" button. [cite: 21] | After performing the test steps, the user must still remain in the user login screen. A message displaying "Invalid email address entered" or similar must be/have been visible. [cite: 21] | The user still remain in the login screen with a message displaying "Invalid login credentials" to indicate that one/both of the login credentials is incorrect. [cite: 21] | lain Guillermo / 06-10-2026 [cite: 21] |
| **02-4** [cite: 21] | Invalid user login: incorrect OTP [cite: 21] | 1. In the email address field, enter an email address with a registered account. [cite: 21]<br>2. In the password field, enter the correct password for the registered account. [cite: 21]<br>3. Click the "Sign In" button. [cite: 21]<br>4. After being redirected to the OTP screen, enter any incorrect OTP. [cite: 21]<br>5. Click the "Verify" button. [cite: 22, 23] | After performing the test steps, the user must still remain in the OTP screen. A message displaying "Incorrect OTP entered" or similar must be/have been visible. [cite: 21] | *(Not specified / remaining in OTP screen)* | lain Guillermo / 06-10-2026 [cite: 21] |

---

## Test ID: 03-PasswordReset
* **Designed by:** Jose Dimagiba [cite: 25]
* **Test Data Source:** User data entry [cite: 26, 27]
* **Module or Screen:** User Login Screen [cite: 29, 30]
* **Objectives:** To test if registered users can log in to the system. [cite: 31, 32]

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** [cite: 28] | Valid User login [cite: 28] | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username<br>2. Enter "mypassword" as the Password<br>3. Click the Login button [cite: 28] | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. [cite: 28] | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. [cite: 28] | Jose Dimagiba / 5/22/26 [cite: 28] |

---

## Test ID: 04-LogOut
* **Designed by:** Jose Dimagiba [cite: 34]
* **Test Data Source:** User data entry [cite: 35, 36]
* **Module or Screen:** User Login Screen [cite: 38, 39]
* **Objectives:** To test if registered users can log in to the system. [cite: 40, 41]

| Test Case # | Description | Test Steps | Expected Results | Actual Results | Performed by / Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-1** [cite: 37] | Valid User login [cite: 37] | In the Login Screen, the tester should:<br>1. Enter "testuser" as the Username [cite: 37, 42]<br>2. Enter "mypassword" as the Password [cite: 42]<br>3. Click the Login button [cite: 42] | Upon completing the steps above, the Profile of the tester should be displayed.<br><br>Verify that the Full Name, Position & Company of the tester is displayed. [cite: 37, 42] | The profile of the tester is displayed. The full name, position, and company of the tester are displayed. [cite: 37, 42] | Jose Dimagiba / 5/22/26 [cite: 37] |
