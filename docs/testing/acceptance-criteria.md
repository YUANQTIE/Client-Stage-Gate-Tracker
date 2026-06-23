

### BASELINE REQUIREMENTS

| # | Description | Pre-Condition | Post-Condition | Estimate | Prio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | As a Client, I want to enter my email and password so that I may be validated as a valid user and redirected to my own view for the project, contracts, high-level dashboard, and credentials. | - Email Field is typable<br>- Password Field is typable<br>- Login button is clickable | - Email is visible<br>- Email is validated through checking if it is an email<br>- Password is visible<br>- Password can be seen through '*' or through the actual characters<br>- Both credentials should be validated if they are in the database<br>- Client is redirected to client view | 1 week (Tomorrow - until June 21) | 2 |
| **2** | As a member of the Product Team, I want to enter my email and password so that I may be validated as a valid user and redirected to my own view of the low-level dashboards, project management, and my own tasks. | Email Field is typable<br>- Password Field is typable<br>- Login button is clickable | - Email is visible<br>- Email is validated through checking if it is an email<br>- Password is visible<br>- Password can be seen through '*' or through the actual characters<br>- Both credentials should be validated if they are in the database<br>- Product Team member is redirected to product team view | | 1 |
| **3** | As a Product Owner, I want to enter my email and password so that it may redirect me to my view for low-level dashboards, contracting, project creation, project management overview, phase groupings (staging), and low-level dashboard | Email Field is typable<br>- Password Field is typable<br>- Login button is clickable | - Email is visible<br>- Email is validated through checking if it is an email<br>- Password is visible<br>- Password can be seen through '*' or through the actual characters<br>- Both credentials should be validated if they are in the database<br>- Product owner member is redirected to product owner view | | 3 |
| **4** | As a member of the Finance Team, I want to enter my email and password for Login so I can be redirected to my view for contract viewing and invoice triggering per stage. | - Email Field is typable<br>- Password Field is typable<br>- Login button is clickable | - Email is visible<br>- Email is validated through checking if it is an email<br>- Password is visible<br>- Password can be seen through '*' or through the actual characters<br>- Both credentials should be validated if they are in the database<br>- Finance member is redirected to finance view | | 6 |
| **5** | As a member of the Asceoft Team, I want to be able to Sign-up using my email, password, and the type of member (Product Team, Product Owner, Finance) I am from Asceoft. | Email Field is typable<br>- Password Field is typable<br>- FirstName field is typable<br>- LastName field is typable<br>- Phone Number field is typable and numerical<br>Job Title input is typable but not required<br>- Member Type /Department input is drop down<br>Sign-Up Button is clickable | - Email is visible<br>- Email is validated through checking if it is an email<br>- Password is visible<br>- Password can be seen through * or through the actual characters<br>- FirstName and LastName are visible<br>Job Title can be blank<br>- There is a selected input form the member type dropdown<br>- Both credentials should be invalidated if they are already existing in the database<br>Sign-up button should just redirect to the login page if validated<br>- Asceoft Member is successfully registered. | | 4 |
| **6**<br>**7**<br>**8** | As a client, I want to be able to Sign-up for the app with my email, password, address, TIN, and contact #.<br><br>As a user, when I login, I want to be able to have extra security through OTP validation, which the code should be sent to the email I registered to the app with.<br><br>As a user, when I Sign-Up, I want to be able to have extra security through OTP validation, which the code should be sent to the email I used for registering. | - Email Field is typable<br>- Password Field is typable<br>- Address field is typable and separated by St #., St., City, Country<br>- TIN field is typable and numerical<br>- Company Name field is typable<br>- Phone Number is typable and numerical (not limited to Philippine prefixes)<br>- Sign-Up Button is clickable<br><br>- OTP input is typable and limited to the set number of characters<br>- Resend OОТР button is clickable<br>Submit button is clickable<br><br>OTP input is typable and limited to the set number of characters<br>Submit button is clickable<br>- Resend OTP button is clickable | - Email is visible<br>- Email is validated through checking if it is an email<br>- Password is visible<br>- Password can be seen through '*' or through the actual characters<br>- Tin must be validated<br>- Both credentials should be invalidated if they are already existing in the database<br>- Sign-up button should just redirect to the login page if validated<br>Client is successfully registered.<br><br>- OTP input is correctly validated, Resend OTP should be limited by a set amount of time<br>Submit button should redirect the Asceoft member to their appropriate view<br><br>- OTP input is correctly validated,<br>- Submit button should redirect the client to their appropriate view<br>- Resend OTP should be limited by a set amount of time | Sprint 3<br><br>Sprint 3 | 5<br>8<br>7 |

### POSSIBLE ADDITION/S

| # | Description | Pre-Condition | Post-Condition | Estimate | Prio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **9** | As part of the team of Asceoft, I want to make sure that all of the users in the app are verified and have actual connection with Asceoft. | Referral email is typable<br>Submit button is clickable | - Referral email is validated through the database<br>User is successfully registered.<br>Submit button should redirect the user back to the Login page | | 9 |

---

### USER STORIES

#### User Story #1: A client will login to the application using their credentials to give them access to the system
* **Estimate (Days):** 
* **Priority:** High
* **Pre-condition:** 
  * The system is running.
  * The client's account has already been made and saved in the db

##### Scenario:
1. The system prompts the client for their email and password.
2. The client inputs their email and password.
3. The system validates the credentials.
4. An OTP is sent to the email of the credentials.
5. The client inputs the OTP.
6. The system displays the client landing page.

##### Post-condition:
The client successfully logged in. The client landing page is displayed.

##### Acceptance Criteria:
1. Test that if the email and password is correct and connected to one account only.
2. Check if the password is incorrect, the client landing page will not show up and the user will be prompted for the correct credentials.

---

#### User Story #2: An Asceoft user will login to the application using their credentials to give them access to the system.
* **Estimate (Days):** 
* **Priority:** High
* **Pre-condition:** 
  * The system is running.
  * An Asceoft user is logged in.

##### Scenario:
1. The system prompts the Asceoft user for their email and password.
2. The Asceoft user inputs their email and password.
3. The system validates the credentials.
4. An OTP is sent to the email of the Asceoft user to.
5. The Asceoft user inputs the OTP..
6. The system displays the landing page.

##### Post-condition:
The user landing page successfully logged in. The user landing page is displayed.

##### Acceptance Criteria:
1. Test that if the email and password is correct and connected to one account only.
2. Check if the password is incorrect, the user landing page will not show up and the user will be prompted for the correct password.

---

#### User Story #3: A client user wants to log in into the application using their credentials, but forgot their password and wishes to reset it.
* **Estimate (Days):** 
* **Priority:** High
* **Pre-condition:** 
  * The system is running.
  * The client's account has already been made and saved in the db

##### Scenario:
1. The client selects "Forgot Password."
2. The system prompts for the registered email password
3. The client enters their email
4. The system sends an OTP or password reset link
5. The client verifies their identity
6. The client enters their new password
7. The system updates the password in the database
8. The client is redirected to the login/landing page

##### Post-condition:
The new password is saved into the database while the old one is erased. The client can now login using the new password while the old password is now flagged as invalid.

##### Acceptance Criteria:
1. Test that if the email and new password is correct and connected to one account only.
2. Test that only registered emails can request password resets.
3. Test that an OTP or reset link is successfully sent
4. Test that the password is successfully changed after verification.
5. Test that the old password no longer works

---

#### User Story #4: A client or Ascesoft logs out of the application.
* **Estimate (Days):** 
* **Priority:** High
* **Pre-condition:** 
  * The system is running.
  * The client's account has already been made and saved in the db
  * The client is logged in

##### Scenario:
1. The user presses "Logout"
2. The system terminates the active session
3. The system redirects the user back into the landing page

##### Post-condition:
The user is successfully logged out of the system

##### Acceptance Criteria:
1. Test that the session ended successfully
2. Test that the protected pages cannot be accessed after logging out
