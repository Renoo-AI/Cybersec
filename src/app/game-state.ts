import { signal, computed } from '@angular/core';

export interface Challenge {
  id: number;
  slug: string;
  title: string;
  level: 'Super Beginner' | 'Easy' | 'Medium';
  objective: string;
  flag: string;
  skill: string;
  hints: string[];
  explanation: {
    bug: string;
    why: string;
    prevention: string;
  };
}

export const CHALLENGES: Challenge[] = [
  // LEVEL 1: VERY EASY (1-20)
  {
    id: 1, slug: "admin-param", title: "Admin Parameter", level: "Super Beginner",
    objective: "URL has ?user=guest → how to become admin?",
    flag: "FLAG{PARAMETER_TAMPERING_BASIC}", skill: "URL Parameter Manipulation",
    hints: ["Look at the URL address bar.", "Change 'guest' to 'admin'.", "Press Enter to refresh the page."],
    explanation: { bug: "Insecure Parameter Handling", why: "Trusting client-side parameters for authorization.", prevention: "Use server-side session management." }
  },
  {
    id: 2, slug: "view-source", title: "View Source", level: "Super Beginner",
    objective: "Page says 'view-source for secret' → where do you look?",
    flag: "FLAG{SOURCE_CODE_IS_NOT_HIDDEN}", skill: "Inspecting Page Source",
    hints: ["Right-click and select 'View Page Source'.", "Look for comments like <!-- ... -->", "Check the bottom of the file."],
    explanation: { bug: "Information Disclosure", why: "Sensitive data left in comments.", prevention: "Remove all comments and sensitive data from production code." }
  },
  {
    id: 3, slug: "hidden-comment", title: "Hidden Comment", level: "Super Beginner",
    objective: "Hidden comment contains /secret-page → what next?",
    flag: "FLAG{HIDDEN_PAGES_FOUND}", skill: "Source Code Analysis",
    hints: ["Find the path in the HTML comments.", "Append that path to the current URL.", "Visit the new page."],
    explanation: { bug: "Information Leakage", why: "Internal paths exposed in comments.", prevention: "Audit code for internal references." }
  },
  {
    id: 4, slug: "robots-txt", title: "Robots.txt", level: "Super Beginner",
    objective: "robots.txt shows /admin → what do you do?",
    flag: "FLAG{ROBOTS_ARE_NOT_SECURITY}", skill: "Reconnaissance",
    hints: ["Visit /robots.txt in your browser.", "Look for 'Disallow' entries.", "Try visiting the disallowed paths."],
    explanation: { bug: "Security by Obscurity", why: "Relying on robots.txt to hide pages.", prevention: "Use proper authentication for all sensitive areas." }
  },
  {
    id: 5, slug: "cookie-role", title: "Cookie Role", level: "Super Beginner",
    objective: "Cookie: role=user → how to escalate?",
    flag: "FLAG{COOKIE_TAMPERING_EASY}", skill: "Cookie Manipulation",
    hints: ["Open DevTools > Application > Cookies.", "Find the 'role' cookie.", "Change its value to 'admin'."],
    explanation: { bug: "Insecure Cookie Storage", why: "Storing roles in plain text cookies.", prevention: "Use signed or encrypted session tokens." }
  },
  {
    id: 6, slug: "base64-decode", title: "Base64 Decode", level: "Super Beginner",
    objective: "Base64 string: cm9sZT1ndWVzdA== → decode it",
    flag: "FLAG{BASE64_IS_NOT_ENCRYPTION}", skill: "Decoding",
    hints: ["Use an online Base64 decoder.", "The string decodes to 'role=guest'.", "Try changing guest to admin and re-encoding."],
    explanation: { bug: "Weak Encoding", why: "Using encoding instead of encryption.", prevention: "Use strong cryptographic standards." }
  },
  {
    id: 7, slug: "js-bypass", title: "JS Bypass", level: "Super Beginner",
    objective: "Input blocked by JS → how to bypass?",
    flag: "FLAG{CLIENT_SIDE_BYPASS}", skill: "Bypassing Client Logic",
    hints: ["Disable JavaScript in your browser.", "Or modify the JS code in DevTools.", "Try submitting the form directly."],
    explanation: { bug: "Client-Side Validation Only", why: "Relying on JS for security.", prevention: "Always validate on the server." }
  },
  {
    id: 8, slug: "enable-button", title: "Enable Button", level: "Super Beginner",
    objective: "Button is disabled → how to enable?",
    flag: "FLAG{DOM_MANIPULATION_WIN}", skill: "DOM Manipulation",
    hints: ["Inspect the button element.", "Remove the 'disabled' attribute.", "Click the button."],
    explanation: { bug: "UI-Based Security", why: "Disabling buttons is not security.", prevention: "Check permissions on the server." }
  },
  {
    id: 9, slug: "hidden-isadmin", title: "Hidden isAdmin", level: "Super Beginner",
    objective: "Form has hidden isAdmin=false → what change?",
    flag: "FLAG{HIDDEN_FIELD_TAMPER}", skill: "Form Manipulation",
    hints: ["Inspect the form HTML.", "Find the <input type='hidden'> tag.", "Change value='false' to value='true'."],
    explanation: { bug: "Insecure Hidden Fields", why: "Trusting hidden inputs.", prevention: "Store state on the server." }
  },
  {
    id: 10, slug: "price-tamper", title: "Price Tamper", level: "Super Beginner",
    objective: "URL: ?price=100 → how to make free purchase?",
    flag: "FLAG{PRICE_MANIPULATION_SUCCESS}", skill: "Business Logic Tampering",
    hints: ["Change the price parameter in the URL.", "Try ?price=0.", "Complete the purchase."],
    explanation: { bug: "Parameter-Based Pricing", why: "Allowing users to set prices.", prevention: "Look up prices server-side." }
  },
  {
    id: 11, slug: "js-check-bypass", title: "JS Check Bypass", level: "Super Beginner",
    objective: "Page checks if(user==='admin') → how to pass?",
    flag: "FLAG{JS_LOGIC_BYPASS}", skill: "JavaScript Debugging",
    hints: ["Open the Console in DevTools.", "Set the 'user' variable to 'admin'.", "Or override the check function."],
    explanation: { bug: "Client-Side Auth Logic", why: "Performing auth checks in JS.", prevention: "Move auth logic to the server." }
  },
  {
    id: 12, slug: "reveal-div", title: "Reveal Div", level: "Super Beginner",
    objective: "DevTools shows hidden div → how to reveal?",
    flag: "FLAG{CSS_IS_NOT_SECURITY}", skill: "CSS Manipulation",
    hints: ["Find the div with 'display: none' or 'visibility: hidden'.", "Change the CSS property to 'block' or 'visible'.", "The flag is inside."],
    explanation: { bug: "Hidden Content Exposure", why: "Hiding data with CSS still sends it to the client.", prevention: "Don't send data the user shouldn't see." }
  },
  {
    id: 13, slug: "maxlength-bypass", title: "MaxLength Bypass", level: "Super Beginner",
    objective: "Input max length 5 → how bypass?",
    flag: "FLAG{MAXLENGTH_BYPASSED}", skill: "HTML Attribute Tampering",
    hints: ["Inspect the input field.", "Change the 'maxlength' attribute to a larger number.", "Or remove it entirely."],
    explanation: { bug: "Client-Side Length Limit", why: "Enforcing length only in HTML.", prevention: "Validate length on the server." }
  },
  {
    id: 14, slug: "js-password", title: "JS Password", level: "Super Beginner",
    objective: "JS file contains password → where to find?",
    flag: "FLAG{HARDCODED_PASSWORD_JS}", skill: "Static Analysis",
    hints: ["Check the 'Sources' tab in DevTools.", "Look through linked .js files.", "Search for 'password' or 'key'."],
    explanation: { bug: "Hardcoded Credentials", why: "Storing passwords in public JS files.", prevention: "Use secure backends for authentication." }
  },
  {
    id: 15, slug: "file-guessing", title: "File Guessing", level: "Super Beginner",
    objective: "Page says 'not found' → try what files?",
    flag: "FLAG{DIRECTORY_BRUTEFORCE}", skill: "Fuzzing",
    hints: ["Try common files like config.php, .env, or backup.zip.", "Check for index.old or test.html.", "Look for sensitive file patterns."],
    explanation: { bug: "Predictable Resource Location", why: "Leaving sensitive files in the web root.", prevention: "Restrict access to sensitive files." }
  },
  {
    id: 16, slug: "b64-cookie-tamper", title: "B64 Cookie", level: "Super Beginner",
    objective: "Cookie is Base64 → what do you do?",
    flag: "FLAG{ENCODED_COOKIE_TAMPER}", skill: "Encoding Manipulation",
    hints: ["Decode the cookie value.", "Modify the contents.", "Re-encode and save."],
    explanation: { bug: "Weak Session Management", why: "Using simple encoding for sessions.", prevention: "Use cryptographically secure tokens." }
  },
  {
    id: 17, slug: "debug-param", title: "Debug Param", level: "Super Beginner",
    objective: "URL param debug=false → what change?",
    flag: "FLAG{DEBUG_MODE_ENABLED}", skill: "Feature Flag Tampering",
    hints: ["Change debug=false to debug=true.", "Check if new info or buttons appear.", "Debug modes often leak data."],
    explanation: { bug: "Exposed Debugging Features", why: "Leaving debug modes active in production.", prevention: "Disable debug features in production." }
  },
  {
    id: 18, slug: "display-none", title: "Display None", level: "Super Beginner",
    objective: "Page uses display:none → how show?",
    flag: "FLAG{CSS_HIDDEN_REVEAL}", skill: "CSS Debugging",
    hints: ["Inspect the page for hidden elements.", "Toggle the 'display' property in the styles pane.", "Look for hidden flags."],
    explanation: { bug: "Insecure Data Hiding", why: "CSS hiding is not security.", prevention: "Server-side rendering of authorized content only." }
  },
  {
    id: 19, slug: "console-error", title: "Console Error", level: "Super Beginner",
    objective: "Console shows error → what to inspect?",
    flag: "FLAG{CONSOLE_LEAKS_INFO}", skill: "Console Debugging",
    hints: ["Open the Console tab.", "Read the error message carefully.", "It might contain a path or a secret."],
    explanation: { bug: "Verbose Error Reporting", why: "Leaking internal details in errors.", prevention: "Use generic error messages for users." }
  },
  {
    id: 20, slug: "login-bypass-js", title: "Login Bypass JS", level: "Super Beginner",
    objective: "Login form no backend → how bypass?",
    flag: "FLAG{NO_BACKEND_LOGIN}", skill: "Client-Side Auth Bypass",
    hints: ["Check the login function in the JS source.", "See if it just checks a string.", "Try to find the hardcoded password."],
    explanation: { bug: "Client-Side Authentication", why: "Auth handled entirely in JS.", prevention: "Always use a secure backend for auth." }
  },

  // LEVEL 2: EASY (21-40)
  {
    id: 21, slug: "idor-id", title: "IDOR ID", level: "Easy",
    objective: "?id=1 → how access another user?",
    flag: "FLAG{IDOR_VULNERABILITY_REALISM}", skill: "IDOR",
    hints: ["Change the ID in the URL.", "Try id=2 or id=0.", "Check if you see someone else's data."],
    explanation: { bug: "IDOR", why: "Missing access control on IDs.", prevention: "Verify user ownership of requested resources." }
  },
  {
    id: 22, slug: "api-tamper", title: "API Tamper", level: "Easy",
    objective: "API returns user data → how change request?",
    flag: "FLAG{API_REQUEST_TAMPER}", skill: "API Security",
    hints: ["Intercept the request in the Network tab.", "Try changing the method or parameters.", "Look for hidden fields in the response."],
    explanation: { bug: "Insecure API Endpoint", why: "Trusting client-side API calls.", prevention: "Implement strict server-side validation." }
  },
  {
    id: 23, slug: "reflected-xss-test", title: "Reflected XSS", level: "Easy",
    objective: "Input reflected in page → test what payload?",
    flag: "FLAG{REFLECTED_XSS_FOUND}", skill: "XSS",
    hints: ["Try <script>alert(1)</script>.", "Check if the script executes.", "Look for other tags like <img> with onerror."],
    explanation: { bug: "Reflected XSS", why: "Unsanitized input reflected in HTML.", prevention: "Encode output and sanitize input." }
  },
  {
    id: 24, slug: "stored-xss-test", title: "Stored XSS", level: "Easy",
    objective: "Comment field stores input → what vuln?",
    flag: "FLAG{STORED_XSS_FOUND}", skill: "XSS",
    hints: ["Submit a script as a comment.", "Refresh the page to see if it runs.", "This affects all users."],
    explanation: { bug: "Stored XSS", why: "Saving malicious scripts to the DB.", prevention: "Sanitize data before saving." }
  },
  {
    id: 25, slug: "path-traversal-test", title: "Path Traversal", level: "Easy",
    objective: "File viewer uses ?file= → try what pattern?",
    flag: "FLAG{PATH_TRAVERSAL_FOUND}", skill: "Path Traversal",
    hints: ["Try ../../../etc/passwd.", "Or try to access files outside the web root.", "Use null bytes if needed."],
    explanation: { bug: "Path Traversal", why: "Unrestricted file path access.", prevention: "Whitelist allowed files." }
  },
  {
    id: 26, slug: "command-injection-test", title: "Command Injection", level: "Easy",
    objective: "Server uses ping → how inject command?",
    flag: "FLAG{COMMAND_INJECTION_FOUND}", skill: "Command Injection",
    hints: ["Use command separators like ; or &&.", "Try ping 8.8.8.8 ; id.", "Check the output for command results."],
    explanation: { bug: "Command Injection", why: "Executing shell commands with user input.", prevention: "Avoid shell execution APIs." }
  },
  {
    id: 27, slug: "json-cookie", title: "JSON Cookie", level: "Easy",
    objective: "Cookie contains JSON → modify what field?",
    flag: "FLAG{JSON_COOKIE_TAMPER}", skill: "Cookie Manipulation",
    hints: ["Parse the JSON in the cookie.", "Look for 'admin': false.", "Change it to true."],
    explanation: { bug: "Insecure JSON Session", why: "Trusting JSON data in cookies.", prevention: "Sign and encrypt session data." }
  },
  {
    id: 28, slug: "js-password-check", title: "JS Password Check", level: "Easy",
    objective: "Password check in JS → what do you do?",
    flag: "FLAG{JS_PASSWORD_BYPASS}", skill: "Reverse Engineering",
    hints: ["Find the checkPassword function.", "Read the logic to find the correct string.", "Or bypass the check entirely."],
    explanation: { bug: "Client-Side Auth", why: "Auth logic exposed to client.", prevention: "Move auth to server." }
  },
  {
    id: 29, slug: "config-leak", title: "Config Leak", level: "Easy",
    objective: "Page loads /config.js → what to look for?",
    flag: "FLAG{CONFIG_FILE_LEAK}", skill: "Information Disclosure",
    hints: ["Open config.js in a new tab.", "Look for API keys or database credentials.", "Check for internal URLs."],
    explanation: { bug: "Sensitive Config Exposure", why: "Exposing config files to the public.", prevention: "Keep config files out of the web root." }
  },
  {
    id: 30, slug: "backup-guess", title: "Backup Guessing", level: "Easy",
    objective: "Hidden backup files → guess which names?",
    flag: "FLAG{BACKUP_GUESS_SUCCESS}", skill: "Fuzzing",
    hints: ["Try backup.sql, .old, .bak, .swp.", "Check for common directory names like /backup/.", "Use a wordlist."],
    explanation: { bug: "Predictable Backups", why: "Leaving backups in accessible places.", prevention: "Secure backup storage." }
  },
  {
    id: 31, slug: "length-bypass", title: "Length Bypass", level: "Easy",
    objective: "JS checks length===10 → bypass how?",
    flag: "FLAG{LENGTH_CHECK_BYPASS}", skill: "Client-Side Bypass",
    hints: ["Modify the input field's value in the console.", "Or change the JS check to return true.", "Submit the form."],
    explanation: { bug: "Weak Client Validation", why: "Easily bypassed logic.", prevention: "Server-side validation." }
  },
  {
    id: 32, slug: "xss-filter-bypass", title: "XSS Filter Bypass", level: "Easy",
    objective: "Input filtered <script> → bypass idea?",
    flag: "FLAG{XSS_FILTER_BYPASS}", skill: "XSS",
    hints: ["Try different tags like <img> or <body>.", "Use event handlers like onload or onerror.", "Try encoding the payload."],
    explanation: { bug: "Incomplete XSS Filter", why: "Blacklisting tags is ineffective.", prevention: "Use a robust sanitization library." }
  },
  {
    id: 33, slug: "api-key-source", title: "API Key Source", level: "Easy",
    objective: "API key in source → how use it?",
    flag: "FLAG{API_KEY_EXPOSURE}", skill: "Information Disclosure",
    hints: ["Find the key in the HTML or JS.", "Try using it in an API request.", "Check if it grants extra permissions."],
    explanation: { bug: "Hardcoded API Key", why: "Exposing keys in client code.", prevention: "Use environment variables and backends." }
  },
  {
    id: 34, slug: "admin-zero", title: "Admin Zero", level: "Easy",
    objective: "URL: ?admin=0 → what change?",
    flag: "FLAG{ADMIN_PARAM_TAMPER}", skill: "Parameter Tampering",
    hints: ["Change admin=0 to admin=1.", "Check if you get admin access.", "Simple boolean parameters are common targets."],
    explanation: { bug: "Insecure Privilege Flag", why: "Trusting client for role definition.", prevention: "Server-side role management." }
  },
  {
    id: 35, slug: "post-tamper", title: "POST Tamper", level: "Easy",
    objective: "Form uses POST → can you tamper?",
    flag: "FLAG{POST_REQUEST_TAMPER}", skill: "Request Manipulation",
    hints: ["Use a tool like Burp Suite or DevTools Network tab.", "Edit the request body before it's sent.", "Change values like 'price' or 'role'."],
    explanation: { bug: "Insecure POST Data", why: "Assuming POST is safer than GET.", prevention: "Validate all input on the server." }
  },
  {
    id: 36, slug: "redirect-stop", title: "Redirect Stop", level: "Easy",
    objective: "Page redirects → how stop it?",
    flag: "FLAG{REDIRECT_BYPASS_SUCCESS}", skill: "Traffic Interception",
    hints: ["Use a proxy to intercept the response.", "Remove the 'Location' header.", "Or disable JS redirects in the browser."],
    explanation: { bug: "Client-Side Redirect", why: "Relying on client to follow redirects.", prevention: "Enforce access control before redirecting." }
  },
  {
    id: 37, slug: "localstorage-token", title: "LocalStorage Token", level: "Easy",
    objective: "Token in localStorage → what inspect?",
    flag: "FLAG{LOCALSTORAGE_TOKEN_LEAK}", skill: "Web Storage Analysis",
    hints: ["Open DevTools > Application > Local Storage.", "Look for keys like 'token' or 'session'.", "Try decoding the value."],
    explanation: { bug: "Insecure Token Storage", why: "LocalStorage is accessible to XSS.", prevention: "Use HttpOnly cookies for sensitive tokens." }
  },
  {
    id: 38, slug: "param-pollution", title: "Param Pollution", level: "Easy",
    objective: "Parameter not used → try adding new one",
    flag: "FLAG{PARAM_POLLUTION_SUCCESS}", skill: "HPP",
    hints: ["Try adding ?admin=true to a URL that doesn't have it.", "See if the server picks it up.", "This is called Parameter Pollution."],
    explanation: { bug: "HTTP Parameter Pollution", why: "Server accepting unexpected parameters.", prevention: "Strictly define allowed parameters." }
  },
  {
    id: 39, slug: "eval-risk", title: "Eval Risk", level: "Easy",
    objective: "JS uses eval() → what risk?",
    flag: "FLAG{EVAL_IS_EVIL_WIN}", skill: "Code Injection",
    hints: ["Find where eval() is used.", "Try to inject JS code into the input it processes.", "eval() executes any string as code."],
    explanation: { bug: "Code Injection via eval()", why: "eval() is extremely dangerous with user input.", prevention: "Never use eval() with untrusted data." }
  },
  {
    id: 40, slug: "upload-path", title: "Upload Path", level: "Easy",
    objective: "Image path reveals /uploads → next step?",
    flag: "FLAG{UPLOADS_DIR_DISCOVERY}", skill: "Reconnaissance",
    hints: ["Visit the /uploads directory directly.", "See if directory listing is enabled.", "Look for other users' files."],
    explanation: { bug: "Directory Listing Enabled", why: "Exposing file structures to the public.", prevention: "Disable directory listing on the server." }
  },

  // LEVEL 3: MEDIUM (41-60)
  {
    id: 41, slug: "sqli-login", title: "SQLi Login", level: "Medium",
    objective: "Login uses SQL → try what payload?",
    flag: "FLAG{SQL_INJECTION_BYPASS}", skill: "SQLi",
    hints: ["Try ' OR 1=1 --", "Try admin' --", "Use comments to ignore the rest of the query."],
    explanation: { bug: "SQL Injection", why: "Direct input in SQL queries.", prevention: "Use parameterized queries." }
  },
  {
    id: 42, slug: "xss-echo", title: "XSS Echo", level: "Medium",
    objective: "Input echoed → XSS test?",
    flag: "FLAG{XSS_ECHO_SUCCESS}", skill: "XSS",
    hints: ["Try <img src=x onerror=alert(1)>.", "Check if the payload is filtered.", "Try different event handlers."],
    explanation: { bug: "Reflected XSS", why: "Echoing input without encoding.", prevention: "Use context-aware output encoding." }
  },
  {
    id: 43, slug: "persistent-xss", title: "Persistent XSS", level: "Medium",
    objective: "Stored message → persistent XSS?",
    flag: "FLAG{PERSISTENT_XSS_WIN}", skill: "XSS",
    hints: ["Submit a script in a message or profile field.", "Check if it runs when you view the page later.", "This is the most dangerous XSS."],
    explanation: { bug: "Stored XSS", why: "Malicious scripts saved to the database.", prevention: "Sanitize all stored content." }
  },
  {
    id: 44, slug: "file-upload-ext", title: "File Upload Ext", level: "Medium",
    objective: "File upload → try what extension?",
    flag: "FLAG{FILE_UPLOAD_BYPASS}", skill: "File Upload",
    hints: ["Try uploading .php, .jsp, or .exe.", "Try double extensions like .jpg.php.", "Try bypass filters with .phtml."],
    explanation: { bug: "Unrestricted File Upload", why: "Allowing executable files to be uploaded.", prevention: "Validate file types and content." }
  },
  {
    id: 45, slug: "url-decode", title: "URL Decode", level: "Medium",
    objective: "URL encoded string → decode it",
    flag: "FLAG{URL_DECODING_SUCCESS}", skill: "Encoding",
    hints: ["Use a URL decoder tool.", "%20 is space, %3C is <, etc.", "Look for hidden commands in the encoded string."],
    explanation: { bug: "Encoded Payload", why: "Hiding attacks in URL encoding.", prevention: "Decode and sanitize all parameters." }
  },
  {
    id: 46, slug: "hidden-api", title: "Hidden API", level: "Medium",
    objective: "Hidden API endpoint → find how?",
    flag: "FLAG{API_DISCOVERY_SUCCESS}", skill: "API Recon",
    hints: ["Check JS files for fetch() or axios calls.", "Look at the Network tab for API requests.", "Try common paths like /api/v1/."],
    explanation: { bug: "Unprotected API", why: "Assuming APIs are hidden if not linked.", prevention: "Secure all API endpoints." }
  },
  {
    id: 47, slug: "id-reuse", title: "ID Reuse", level: "Medium",
    objective: "Response contains ID → reuse it?",
    flag: "FLAG{ID_REUSE_EXPLOIT}", skill: "Session Management",
    hints: ["Find an ID in a response (e.g., a session ID).", "Try using it in another request.", "Check if it grants access to another session."],
    explanation: { bug: "Predictable Session IDs", why: "Using weak or reusable IDs.", prevention: "Use cryptographically strong random IDs." }
  },
  {
    id: 48, slug: "json-edit", title: "JSON Edit", level: "Medium",
    objective: "JSON response editable → modify?",
    flag: "FLAG{JSON_TAMPER_SUCCESS}", skill: "API Security",
    hints: ["Intercept a JSON response.", "Modify the fields (e.g., change 'is_admin': false to true).", "See if the UI or server accepts the change."],
    explanation: { bug: "Insecure Client State", why: "Trusting JSON data from the client.", prevention: "Validate all data on the server." }
  },
  {
    id: 49, slug: "cookie-admin", title: "Cookie Admin", level: "Medium",
    objective: "Role in cookie → change to admin?",
    flag: "FLAG{COOKIE_ADMIN_BYPASS}", skill: "Cookie Manipulation",
    hints: ["Find the 'role' or 'admin' cookie.", "Change its value.", "Refresh the page."],
    explanation: { bug: "Insecure Cookie Auth", why: "Storing roles in editable cookies.", prevention: "Use server-side session stores." }
  },
  {
    id: 50, slug: "csrf-missing", title: "CSRF Missing", level: "Medium",
    objective: "CSRF token missing → what attack?",
    flag: "FLAG{CSRF_ATTACK_SUCCESS}", skill: "CSRF",
    hints: ["Check if forms have a hidden CSRF token.", "If missing, you can perform actions on behalf of a user.", "Try to craft a malicious form."],
    explanation: { bug: "Missing CSRF Protection", why: "Allowing cross-site requests to perform actions.", prevention: "Use CSRF tokens or SameSite cookies." }
  },
  {
    id: 51, slug: "password-reset-abuse", title: "Password Reset", level: "Medium",
    objective: "Password reset → abuse how?",
    flag: "FLAG{RESET_TOKEN_EXPLOIT}", skill: "Auth Logic",
    hints: ["Try to guess the reset token.", "Check if the token is in the URL.", "Try to reset another user's password."],
    explanation: { bug: "Weak Password Reset", why: "Predictable or insecure reset tokens.", prevention: "Use strong, one-time reset tokens." }
  },
  {
    id: 52, slug: "search-inject", title: "Search Inject", level: "Medium",
    objective: "Search input → inject what?",
    flag: "FLAG{SEARCH_INJECTION_WIN}", skill: "Injection",
    hints: ["Try SQLi or XSS in the search box.", "Check how the results are displayed.", "Look for error messages."],
    explanation: { bug: "Search Injection", why: "Unsanitized search parameters.", prevention: "Sanitize all search inputs." }
  },
  {
    id: 53, slug: "param-brute", title: "Param Brute", level: "Medium",
    objective: "Parameter ignored → brute values?",
    flag: "FLAG{PARAM_BRUTE_SUCCESS}", skill: "Fuzzing",
    hints: ["Try different values for a parameter.", "Use a script to automate the process.", "Look for changes in the response."],
    explanation: { bug: "Predictable Parameters", why: "Allowing brute force of parameters.", prevention: "Use rate limiting and complex IDs." }
  },
  {
    id: 54, slug: "traversal-deep", title: "Traversal Deep", level: "Medium",
    objective: "File path → try traversal?",
    flag: "FLAG{DEEP_TRAVERSAL_WIN}", skill: "Path Traversal",
    hints: ["Try multiple ../ levels.", "Try to access system files like /etc/shadow.", "Use encoding to bypass filters."],
    explanation: { bug: "Deep Path Traversal", why: "Insufficient path validation.", prevention: "Use absolute paths and chroot." }
  },
  {
    id: 55, slug: "error-leak", title: "Error Leak", level: "Medium",
    objective: "Server error leaks path → use it?",
    flag: "FLAG{ERROR_PATH_LEAK}", skill: "Information Disclosure",
    hints: ["Trigger an error (e.g., by sending invalid input).", "Read the stack trace or error message.", "Look for internal file paths."],
    explanation: { bug: "Verbose Error Messages", why: "Leaking internal system info.", prevention: "Use custom error pages." }
  },
  {
    id: 56, slug: "debug-enable", title: "Debug Enable", level: "Medium",
    objective: "Debug mode → enable how?",
    flag: "FLAG{DEBUG_MODE_WIN}", skill: "Feature Tampering",
    hints: ["Look for 'debug' in JS or cookies.", "Try setting it to 1 or true.", "Check for new menu items."],
    explanation: { bug: "Exposed Debug Mode", why: "Leaving debug tools in production.", prevention: "Remove debug code before deployment." }
  },
  {
    id: 57, slug: "method-swap", title: "Method Swap", level: "Medium",
    objective: "API accepts GET → change to POST?",
    flag: "FLAG{METHOD_SWAP_SUCCESS}", skill: "API Security",
    hints: ["Try changing the HTTP method.", "See if the server responds differently.", "Some APIs are insecure with certain methods."],
    explanation: { bug: "Insecure HTTP Methods", why: "Allowing sensitive actions via GET.", prevention: "Enforce correct HTTP methods." }
  },
  {
    id: 58, slug: "js-beautify", title: "JS Beautify", level: "Medium",
    objective: "JS minified → beautify and read",
    flag: "FLAG{JS_REVERSE_SUCCESS}", skill: "Reverse Engineering",
    hints: ["Use a JS beautifier tool.", "Read the code to find hidden logic.", "Look for obfuscated strings."],
    explanation: { bug: "Obfuscated Logic", why: "Assuming minification is security.", prevention: "Never store secrets in client code." }
  },
  {
    id: 59, slug: "iframe-source", title: "Iframe Source", level: "Medium",
    objective: "Hidden iframe → inspect source",
    flag: "FLAG{IFRAME_SOURCE_LEAK}", skill: "Web Analysis",
    hints: ["Find the <iframe> tag in the HTML.", "Check its 'src' attribute.", "Visit the iframe source directly."],
    explanation: { bug: "Hidden Iframe Exposure", why: "Using iframes to hide content.", prevention: "Secure all embedded content." }
  },
  {
    id: 60, slug: "open-redirect", title: "Open Redirect", level: "Medium",
    objective: "Redirect param → open redirect?",
    flag: "FLAG{OPEN_REDIRECT_WIN}", skill: "Redirect Exploit",
    hints: ["Look for parameters like ?next= or ?url=.", "Try changing the value to an external site.", "Check if the page redirects there."],
    explanation: { bug: "Open Redirect", why: "Trusting user-provided redirect URLs.", prevention: "Use a whitelist of allowed redirect domains." }
  },

  // LEVEL 4: HARD (61-80)
  {
    id: 61, slug: "jwt-decode", title: "JWT Decode", level: "Medium",
    objective: "JWT token → decode what part?",
    flag: "FLAG{JWT_DECODE_SUCCESS}", skill: "JWT Security",
    hints: ["JWT has 3 parts: Header, Payload, Signature.", "Decode the payload (middle part).", "Look for user info or roles."],
    explanation: { bug: "JWT Information Leak", why: "Storing sensitive info in JWT payload.", prevention: "Don't store PII in JWTs." }
  },
  {
    id: 62, slug: "jwt-unsigned", title: "JWT Unsigned", level: "Medium",
    objective: "JWT unsigned → exploit how?",
    flag: "FLAG{JWT_UNSIGNED_EXPLOIT}", skill: "JWT Security",
    hints: ["Check if the signature is verified.", "Try changing the algorithm to 'none'.", "Modify the payload and see if it's accepted."],
    explanation: { bug: "JWT None Algorithm", why: "Allowing unsigned JWTs.", prevention: "Enforce strong signature verification." }
  },
  {
    id: 63, slug: "cookie-sign-tamper", title: "Cookie Sign", level: "Medium",
    objective: "Cookie signed? → try tampering",
    flag: "FLAG{COOKIE_SIGN_BYPASS}", skill: "Cookie Security",
    hints: ["Check if the cookie has a signature.", "Try to find the signing key.", "Try to forge a new signature."],
    explanation: { bug: "Weak Cookie Signing", why: "Using weak keys for signing.", prevention: "Use strong, secret signing keys." }
  },
  {
    id: 64, slug: "rate-limit-bypass", title: "Rate Limit", level: "Medium",
    objective: "Rate limit → bypass how?",
    flag: "FLAG{RATE_LIMIT_BYPASS}", skill: "API Security",
    hints: ["Try using different IP addresses (proxies).", "Try adding headers like X-Forwarded-For.", "Check if the limit is per-session."],
    explanation: { bug: "Weak Rate Limiting", why: "Easily bypassed limits.", prevention: "Implement robust rate limiting." }
  },
  {
    id: 65, slug: "brute-force-auth", title: "Brute Force", level: "Medium",
    objective: "Login brute force → automate?",
    flag: "FLAG{BRUTE_FORCE_SUCCESS}", skill: "Auth Security",
    hints: ["Use a tool like Hydra or a custom script.", "Try common passwords.", "Look for a lack of account lockout."],
    explanation: { bug: "Lack of Brute Force Protection", why: "Allowing unlimited login attempts.", prevention: "Implement account lockout and CAPTCHA." }
  },
  {
    id: 66, slug: "idor-api", title: "IDOR API", level: "Medium",
    objective: "IDOR with /api/user/2 → escalate",
    flag: "FLAG{IDOR_API_SUCCESS}", skill: "IDOR",
    hints: ["Try changing the user ID in the API path.", "Check if you can see other users' private data.", "This is a common API flaw."],
    explanation: { bug: "API IDOR", why: "Missing authorization on API paths.", prevention: "Verify user permissions for every API call." }
  },
  {
    id: 67, slug: "upload-filter-bypass", title: "Upload Filter", level: "Medium",
    objective: "File upload filter → bypass?",
    flag: "FLAG{UPLOAD_FILTER_BYPASS}", skill: "File Upload",
    hints: ["Try changing the MIME type in the request.", "Try using null bytes in the filename.", "Try different file signatures."],
    explanation: { bug: "Weak File Filter", why: "Relying on easily spoofed metadata.", prevention: "Perform deep file inspection." }
  },
  {
    id: 68, slug: "xss-encode", title: "XSS Encode", level: "Medium",
    objective: "XSS filter → encode payload",
    flag: "FLAG{XSS_ENCODE_BYPASS}", skill: "XSS",
    hints: ["Use URL encoding or HTML entities.", "Try double encoding.", "Use JS functions like String.fromCharCode()."],
    explanation: { bug: "XSS Filter Bypass", why: "Filters failing to handle encoding.", prevention: "Use robust, context-aware encoding." }
  },
  {
    id: 69, slug: "traversal-encode", title: "Traversal Encode", level: "Medium",
    objective: "Path traversal blocked → double encode",
    flag: "FLAG{TRAVERSAL_ENCODE_WIN}", skill: "Path Traversal",
    hints: ["Try %252e%252e%252f for ../.", "Double encoding can bypass some filters.", "Check how the server decodes parameters."],
    explanation: { bug: "Double Encoding Bypass", why: "Inconsistent decoding across layers.", prevention: "Decode once and validate strictly." }
  },
  {
    id: 70, slug: "command-inject-filter", title: "Command Filter", level: "Medium",
    objective: "Command injection filtered → bypass?",
    flag: "FLAG{COMMAND_FILTER_BYPASS}", skill: "Command Injection",
    hints: ["Try alternative separators like | or `.", "Use environment variables.", "Try to bypass with wildcards."],
    explanation: { bug: "Incomplete Command Filter", why: "Blacklisting characters is insufficient.", prevention: "Use parameterized APIs." }
  },
  {
    id: 71, slug: "sqli-filter", title: "SQLi Filter", level: "Medium",
    objective: "SQLi filtered ' → try alternative",
    flag: "FLAG{SQLI_FILTER_BYPASS}", skill: "SQLi",
    hints: ["Try using double quotes (\").", "Use hex encoding for strings.", "Try different comment styles."],
    explanation: { bug: "Weak SQLi Filter", why: "Blacklisting single quotes is not enough.", prevention: "Use prepared statements." }
  },
  {
    id: 72, slug: "hpp-exploit", title: "HPP Exploit", level: "Medium",
    objective: "Parameter pollution → use how?",
    flag: "FLAG{HPP_EXPLOIT_SUCCESS}", skill: "HPP",
    hints: ["Send multiple parameters with the same name.", "See which one the server uses.", "Try to bypass logic with the second parameter."],
    explanation: { bug: "HTTP Parameter Pollution", why: "Inconsistent parameter handling.", prevention: "Validate and sanitize all parameters." }
  },
  {
    id: 73, slug: "cors-misconfig", title: "CORS Misconfig", level: "Medium",
    objective: "CORS misconfig → exploit?",
    flag: "FLAG{CORS_EXPLOIT_SUCCESS}", skill: "CORS Security",
    hints: ["Check for Access-Control-Allow-Origin: *.", "Try to send a request from another domain.", "Look for sensitive data in the response."],
    explanation: { bug: "Permissive CORS Policy", why: "Allowing any domain to access data.", prevention: "Use a strict whitelist of allowed origins." }
  },
  {
    id: 74, slug: "ssrf-input", title: "SSRF Input", level: "Medium",
    objective: "SSRF input → what URL?",
    flag: "FLAG{SSRF_EXPLOIT_SUCCESS}", skill: "SSRF",
    hints: ["Try to make the server fetch an internal URL.", "Try http://localhost/ or http://169.254.169.254/.", "Look for internal services."],
    explanation: { bug: "Server-Side Request Forgery", why: "Allowing the server to fetch arbitrary URLs.", prevention: "Whitelist allowed domains and protocols." }
  },
  {
    id: 75, slug: "subdomain-test", title: "Subdomain Test", level: "Medium",
    objective: "Subdomain found → test separately",
    flag: "FLAG{SUBDOMAIN_DISCOVERY_WIN}", skill: "Recon",
    hints: ["Use a tool to find subdomains.", "Check for dev. or staging. subdomains.", "These often have weaker security."],
    explanation: { bug: "Unprotected Subdomains", why: "Dev subdomains often lack production security.", prevention: "Secure all subdomains equally." }
  },
  {
    id: 76, slug: "backup-subdomain", title: "Backup Subdomain", level: "Medium",
    objective: "Backup subdomain → access?",
    flag: "FLAG{BACKUP_SUBDOMAIN_WIN}", skill: "Recon",
    hints: ["Look for subdomains like backup. or old.", "Check for directory listing.", "Look for sensitive files."],
    explanation: { bug: "Exposed Backup Infrastructure", why: "Leaving backups on accessible subdomains.", prevention: "Restrict access to backup servers." }
  },
  {
    id: 77, slug: "api-versioning", title: "API Versioning", level: "Medium",
    objective: "API versioning → try v1/v2",
    flag: "FLAG{API_VERSION_EXPLOIT}", skill: "API Security",
    hints: ["Try changing the version in the API path.", "Older versions might have known bugs.", "Check if v1 is still active."],
    explanation: { bug: "Insecure Legacy API", why: "Leaving old, vulnerable APIs active.", prevention: "Deprecate and secure old API versions." }
  },
  {
    id: 78, slug: "admin-panel-fuzz", title: "Admin Fuzz", level: "Medium",
    objective: "Hidden admin panel → fuzz paths",
    flag: "FLAG{ADMIN_PANEL_DISCOVERY}", skill: "Fuzzing",
    hints: ["Try paths like /admin_portal, /manage, /control.", "Use a wordlist for admin panels.", "Look for login pages."],
    explanation: { bug: "Hidden Admin Interface", why: "Relying on obscurity for admin security.", prevention: "Use strong auth and IP whitelisting." }
  },
  {
    id: 79, slug: "debug-log-leak", title: "Debug Log Leak", level: "Medium",
    objective: "Debug logs → extract secrets",
    flag: "FLAG{DEBUG_LOG_LEAK_WIN}", skill: "Information Disclosure",
    hints: ["Look for files like debug.log or error.log.", "Check for sensitive info like session IDs.", "Look for database queries."],
    explanation: { bug: "Sensitive Data in Logs", why: "Logging PII or secrets.", prevention: "Sanitize logs and restrict access." }
  },
  {
    id: 80, slug: "multi-step-exploit", title: "Multi-Step", level: "Medium",
    objective: "Multi-step exploit → chain 3 bugs",
    flag: "FLAG{CHAIN_EXPLOIT_MASTER}", skill: "Chaining",
    hints: ["Find a leak, use it to bypass auth, then escalate.", "Real attacks are rarely single-step.", "Think like an attacker."],
    explanation: { bug: "Chained Vulnerabilities", why: "Small bugs combining into a major breach.", prevention: "Implement Defense in Depth." }
  }
];

export class GameStateService {
  solvedChallenges = signal<number[]>([]);
  currentChallengeId = signal<number>(1);
  
  // Byte AI Companion State
  byteMessage = signal('Welcome, teammate! I\'m Byte. Ready to hack some systems?');
  byteMood = signal<'idle' | 'happy' | 'thinking' | 'excited' | 'tactical'>('idle');
  
  totalFlags = computed(() => this.solvedChallenges().length);
  
  isSolved(id: number) {
    return this.solvedChallenges().includes(id);
  }

  solve(id: number) {
    if (!this.isSolved(id)) {
      this.solvedChallenges.update(prev => [...prev, id]);
    }
  }

  setCurrent(id: number) {
    this.currentChallengeId.set(id);
    // Phase 2: Byte logic for levels 21+
    if (id >= 21) {
      this.byteMood.set('tactical');
      this.byteMessage.set('SENTINEL Tactical Remote Handler online. Monitoring enterprise perimeter for anomalies...');
    } else {
      this.byteMood.set('idle');
    }
  }

  // Phase 3: QR Sync Logic
  syncDevice(payload: string) {
    try {
      const data = JSON.parse(atob(payload));
      if (data.progress && Array.isArray(data.progress)) {
        this.solvedChallenges.set(data.progress);
        return true;
      }
    } catch (e) {
      console.error('Sync failed:', e);
    }
    return false;
  }
}
