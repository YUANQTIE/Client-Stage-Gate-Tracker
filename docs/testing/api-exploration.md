# Invalid Login - Incorrect Password

### Endpoint
https://gwpcywphjekefzoftntk.supabase.co/auth/v1/token?grant_type=password

### Method
POST

### Raw Response
json
{
  "code": "invalid_credentials",
  "message": "Invalid login credentials"
}

---

### Status Code
400 Bad Request

### Data Field Observed
message: "Invalid login credentials"

### UI Comparison Note
The API returned a `400 Bad Request` response with the message "Invalid login credentials" when an incorrect password was entered. The login page remained visible and the user was not authenticated, which matches the behavior observed in the UI.
