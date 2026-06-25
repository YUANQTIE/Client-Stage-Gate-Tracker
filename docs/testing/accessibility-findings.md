# Accessibility Findings

## Page Tested
Login Page

| Element Pair | Contrast Ratio | WCAG AA Status |
|-------------|---------------|----------------|
| Dark blue "Welcome back" text on white background | 12.6:1 | PASS |
| White "Asceoft" logo text on dark navy background | 13.8:1 | PASS |
| Purple "Sign In" button text on purple button background | 4.7:1 | PASS |

---

## Accessibility Issue

### Issue
When invalid login credentials are entered, the user remains on the login page without a visible error message explaining what went wrong.

### Affected Users
- Screen reader users who rely on system feedback to determine whether an action was successful.
- Users with limited technical experience who may assume the application is unresponsive.

### Impact
The user receives no clear indication that the login failed, making it difficult to identify and correct the problem. This may lead to repeated unsuccessful login attempts and frustration.

### Recommended Fix
Display a clear error message such as: "Invalid email or password. Please try again."

The message should be:
- Visible near the login form.
- Announced to screen readers using an `aria-live` region.
- Programmatically associated with the login form so assistive technologies can detect it.
