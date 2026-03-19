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
  {
    id: 1,
    slug: "view-source",
    title: "View Source Hunt",
    level: "Super Beginner",
    objective: "The flag is hidden somewhere in the page structure. Can you find it?",
    flag: "FLAG{SOURCE_CODE_IS_NOT_HIDDEN}",
    skill: "Inspecting Page Source",
    hints: [
      "Right-click anywhere on the page and select \"Inspect\" or \"View Page Source\".",
      "Look for a comment or a hidden element in the HTML.",
      "Check the very bottom of the HTML body!"
    ],
    explanation: {
      bug: "Information Disclosure via Source Code.",
      why: "Developers sometimes leave sensitive information, API keys, or internal notes in the HTML that users shouldn't see.",
      prevention: "Never put sensitive data in client-side code (HTML, CSS, JS)."
    }
  },
  {
    id: 2,
    slug: "simple-sqli",
    title: "Simple Login Bypass",
    level: "Easy",
    objective: "The login form is poorly coded. Can you trick it into letting you in without a password?",
    flag: "FLAG{ALWAYS_SANITIZE_INPUTS}",
    skill: "SQL Injection Basics",
    hints: [
      "SQL queries often look like: SELECT * FROM users WHERE username = '...' AND password = '...'",
      "Try using a single quote (') to break the query.",
      "The classic payload is: ' OR '1'='1"
    ],
    explanation: {
      bug: "SQL Injection (SQLi).",
      why: "The application directly includes user input in a database query without sanitizing it.",
      prevention: "Use Prepared Statements or Parameterized Queries."
    }
  },
  {
    id: 3,
    slug: "broken-auth",
    title: "Broken Auth",
    level: "Medium",
    objective: "Can you bypass the authentication check?",
    flag: "FLAG{BROKEN_AUTH_BYPASS}",
    skill: "Authentication Bypass",
    hints: [
      "Check the URL parameters.",
      "What happens if you set authenticated=true?",
      "Sometimes simple logic can be bypassed with URL parameters."
    ],
    explanation: {
      bug: "Broken Authentication.",
      why: "The application relies on client-side parameters to verify authentication.",
      prevention: "Always verify authentication on the server using secure sessions."
    }
  },
  {
    id: 4,
    slug: "robots-txt",
    title: "Robots.txt Discovery",
    level: "Super Beginner",
    objective: "Search engines use a special file to know what NOT to index. Hackers love it.",
    flag: "FLAG{ROBOTS_KNOW_SECRETS}",
    skill: "Checking Common Files",
    hints: [
      "Try adding \"?file=robots.txt\" to the end of the URL.",
      "Robots.txt often lists \"Disallow\" paths which are meant to be hidden.",
      "Check the Disallow entry for a secret path."
    ],
    explanation: {
      bug: "Improper robots.txt Configuration.",
      why: "Robots.txt is public. Listing sensitive directories there is like giving a map to a thief.",
      prevention: "Use proper authentication for sensitive pages instead of relying on robots.txt for \"security by obscurity\"."
    }
  },
  {
    id: 5,
    slug: "hidden-page",
    title: "Hidden Page Guessing",
    level: "Super Beginner",
    objective: "Some pages aren't linked anywhere. Can you guess where the admin hides?",
    flag: "FLAG{HIDDEN_PAGES_EXIST}",
    skill: "Directory Enumeration",
    hints: [
      "Think of common names for administrative areas.",
      "Try paths like /admin, /login, /config, or /dashboard.",
      "In this lab, finding the page is the goal."
    ],
    explanation: {
      bug: "Unprotected Hidden Pages.",
      why: "If a page exists but isn't linked, it can still be found by guessing or \"fuzzing\".",
      prevention: "Always enforce strict authentication on all sensitive endpoints, regardless of whether they are linked."
    }
  },
  {
    id: 6,
    slug: "idor",
    title: "IDOR Beginner Lab",
    level: "Easy",
    objective: "You are viewing your profile (ID 1). Can you see ID 2?",
    flag: "FLAG{IDOR_FOUND_YOU}",
    skill: "Insecure Direct Object Reference",
    hints: [
      "Look at the URL: ?id=1.",
      "Change the number 1 to 2.",
      "This is called IDOR - accessing data you shouldn't by changing an ID."
    ],
    explanation: {
      bug: "Insecure Direct Object Reference (IDOR).",
      why: "The server doesn't check if the logged-in user has permission to see the requested ID.",
      prevention: "Implement proper access control checks for every object request."
    }
  },
  {
    id: 7,
    slug: "xss",
    title: "Search Box XSS Intro",
    level: "Medium",
    objective: "The search box repeats whatever you type. Can you make it run code?",
    flag: "FLAG{XSS_IS_REAL_POWER}",
    skill: "Reflected XSS",
    hints: [
      "Try typing something like `<h1>Hello</h1>`. Does it render as a heading?",
      "Now try a script tag: `<script>alert(\"XSS\")</script>`.",
      "In this challenge, triggering an alert will reveal the flag."
    ],
    explanation: {
      bug: "Reflected Cross-Site Scripting (XSS).",
      why: "The application takes user input and puts it directly into the HTML without sanitizing it.",
      prevention: "Escape all user-provided data before rendering it in HTML."
    }
  },
  {
    id: 8,
    slug: "path-traversal",
    title: "Path Traversal Lite",
    level: "Medium",
    objective: "The page viewer loads files from a folder. Can you go \"up\" a level?",
    flag: "FLAG{DOT_DOT_SLASH_WIN}",
    skill: "Path Traversal",
    hints: [
      "The URL looks like `?file=welcome.txt`.",
      "Try using `../` to go up one directory.",
      "Try `../secret/flag.txt`."
    ],
    explanation: {
      bug: "Path Traversal (Directory Traversal).",
      why: "The application allows users to control the file path used in server-side operations.",
      prevention: "Use a whitelist of allowed files or sanitize path separators."
    }
  },
  {
    id: 9,
    slug: "cookie-role",
    title: "Cookie Role Tampering",
    level: "Easy",
    objective: "Your role is stored in a cookie. Can you become an admin?",
    flag: "FLAG{COOKIES_ARE_NOT_VAULTS}",
    skill: "Cookie Manipulation",
    hints: [
      "Open DevTools -> Application -> Cookies.",
      "Look for the 'role' cookie.",
      "Change 'user' to 'admin' and refresh (or use the ?role=admin parameter in this sim)."
    ],
    explanation: {
      bug: "Insecure Cookie Management.",
      why: "Cookies are client-side and can be easily modified by the user.",
      prevention: "Use signed session cookies or store roles server-side."
    }
  },
  {
    id: 10,
    slug: "base64-cookie",
    title: "Base64 Cookie Decode",
    level: "Easy",
    objective: "The cookie is encoded. Can you decode it, change it, and re-encode it?",
    flag: "FLAG{DECODE_THEN_EDIT_WIN}",
    skill: "Base64 Encoding",
    hints: [
      "The value looks like Base64. Try decoding it.",
      "Change 'user' to 'admin' in the decoded string.",
      "Encode the new string back to Base64 and use it as the token parameter."
    ],
    explanation: {
      bug: "Security by Obscurity (Encoding).",
      why: "Encoding is not encryption. It's easily reversible.",
      prevention: "Use strong encryption for any sensitive data stored on the client."
    }
  },
  {
    id: 11,
    slug: "js-leak",
    title: "JavaScript Secret Leak",
    level: "Easy",
    objective: "The password check happens in the browser. Can you find the secret?",
    flag: "FLAG{JS_LEAKS_SECRETS_2026}",
    skill: "Client-Side Code Analysis",
    hints: [
      "Right-click -> View Page Source.",
      "Look for the script tag at the bottom.",
      "Find the SECRET_KEY variable."
    ],
    explanation: {
      bug: "Hardcoded Secrets in Client-Side Code.",
      why: "Anything sent to the browser is public knowledge.",
      prevention: "Never store secrets or perform sensitive validation in client-side JavaScript."
    }
  },
  {
    id: 12,
    slug: "disabled-button",
    title: "Disabled Button Bypass",
    level: "Easy",
    objective: "The button is disabled. Can you force it to click?",
    flag: "FLAG{FRONTEND_IS_NOT_SECURITY}",
    skill: "Bypassing UI Controls",
    hints: [
      "Inspect the button element.",
      "Remove the 'disabled' attribute from the HTML tag.",
      "Click the now-enabled button."
    ],
    explanation: {
      bug: "Client-Side Only UI Restrictions.",
      why: "UI states like 'disabled' are for UX, not security.",
      prevention: "Always verify permissions on the server before executing an action."
    }
  },
  {
    id: 13,
    slug: "validation-bypass",
    title: "Validation Bypass",
    level: "Easy",
    objective: "The form has a silly length requirement. Can you bypass it?",
    flag: "FLAG{VALIDATION_BYPASSED_WIN}",
    skill: "Client-Side Validation Bypass",
    hints: [
      "The check happens in the validateAndSubmit() function.",
      "You can call the success logic directly from the console.",
      "Or just edit the JS function in the browser."
    ],
    explanation: {
      bug: "Lack of Server-Side Validation.",
      why: "Client-side checks can be easily bypassed or ignored.",
      prevention: "Always perform critical validation on the server."
    }
  },
  {
    id: 14,
    slug: "hidden-input",
    title: "Hidden Input Manipulation",
    level: "Easy",
    objective: "There's a hidden field that says you're not an admin. Change it!",
    flag: "FLAG{HIDDEN_IS_NOT_SAFE_WIN}",
    skill: "Hidden Field Tampering",
    hints: [
      "Inspect the form elements.",
      "Look for <input type=\"hidden\">.",
      "Change the value from 'false' to 'true' before submitting."
    ],
    explanation: {
      bug: "Trusting Hidden Form Inputs.",
      why: "Hidden inputs are just as editable as regular ones.",
      prevention: "Never use hidden fields for sensitive state or permissions."
    }
  },
  {
    id: 15,
    slug: "price-manipulation",
    title: "Price Manipulation",
    level: "Easy",
    objective: "The price is in the URL. Can you get it for free?",
    flag: "FLAG{NEVER_TRUST_USER_INPUT_WIN}",
    skill: "Business Logic Flaw",
    hints: [
      "Look at the URL parameters: ?price=1000000.",
      "Change the price to 0.",
      "Click 'BUY NOW'."
    ],
    explanation: {
      bug: "Client-Side Price Definition.",
      why: "Trusting the client to define the price of an item is a major logic flaw.",
      prevention: "Always look up prices in a secure server-side database."
    }
  },
  {
    id: 16,
    slug: "file-guessing",
    title: "Predictable File Names",
    level: "Easy",
    objective: "Can you guess the name of the database backup?",
    flag: "FLAG{BACKUP_FILES_MATTER_WIN}",
    skill: "Resource Enumeration",
    hints: [
      "Try common backup extensions like .sql, .zip, or .bak.",
      "Try filenames like 'db', 'backup', or 'config'.",
      "Try ?file=db.sql."
    ],
    explanation: {
      bug: "Sensitive Files in Web Root.",
      why: "Predictable filenames allow attackers to find sensitive data.",
      prevention: "Use random filenames or store sensitive files outside the web root."
    }
  },
  {
    id: 17,
    slug: "stored-xss",
    title: "Stored XSS Lab",
    level: "Medium",
    objective: "Can you leave a comment that executes code for everyone?",
    flag: "FLAG{STORED_XSS_MASTER_WIN}",
    skill: "Stored XSS",
    hints: [
      "Try a basic payload: <script>alert(1)</script>.",
      "The comment list uses innerHTML, which is dangerous.",
      "In this sim, triggering the alert shows the flag."
    ],
    explanation: {
      bug: "Stored Cross-Site Scripting (XSS).",
      why: "User input is saved and rendered without sanitization.",
      prevention: "Always sanitize user input and use safe APIs like textContent."
    }
  },
  {
    id: 18,
    slug: "url-tampering",
    title: "URL Parameter Tampering",
    level: "Easy",
    objective: "The URL defines who you are. Can you be the admin?",
    flag: "FLAG{CHANGE_THE_PARAMETER_WIN}",
    skill: "Parameter Tampering",
    hints: [
      "Look at the URL: ?user=guest.",
      "Change 'guest' to 'admin'.",
      "This is a common way to test for authorization flaws."
    ],
    explanation: {
      bug: "Insecure Authorization.",
      why: "The server trusts the URL parameter to define the user's identity.",
      prevention: "Use secure, server-side sessions."
    }
  },
  {
    id: 19,
    slug: "command-injection",
    title: "Command Injection Intro",
    level: "Medium",
    objective: "The ping tool is vulnerable. Can you run a second command?",
    flag: "FLAG{COMMAND_INJECTION_MASTER}",
    skill: "Command Injection",
    hints: [
      "Try using a semicolon (;) to chain commands.",
      "Try: 8.8.8.8; ls",
      "Command injection happens when user input is passed to a shell."
    ],
    explanation: {
      bug: "Command Injection.",
      why: "User input is directly concatenated into a system command.",
      prevention: "Avoid shell execution or use strict input whitelisting."
    }
  },
  {
    id: 20,
    slug: "final-vault",
    title: "The Ultimate Vault",
    level: "Medium",
    objective: "Combine your skills to unlock the final vault.",
    flag: "FLAG{WEB_BEGINNER_MASTER_COMPLETE}",
    skill: "Chaining Vulnerabilities",
    hints: [
      "Step 1: Check the source for the master key.",
      "Step 2: Use the URL parameter ?level=9999 to bypass the level check.",
      "Step 3: Enter the key and unlock the vault."
    ],
    explanation: {
      bug: "Multiple Vulnerabilities.",
      why: "Real attacks often involve chaining several small bugs.",
      prevention: "Implement Defense in Depth."
    }
  },
  {
    id: 21,
    slug: "id-1",
    title: "Challenge 21",
    level: "Easy",
    objective: "?id=1",
    flag: "FLAG{CHALLENGE_21_COMPLETE}",
    skill: "Web Security",
    hints: [
      "how access another user?"
    ],
    explanation: {
      bug: "?id=1",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 22,
    slug: "api-returns-user-data",
    title: "Challenge 22",
    level: "Easy",
    objective: "API returns user data",
    flag: "FLAG{CHALLENGE_22_COMPLETE}",
    skill: "Web Security",
    hints: [
      "how change request?"
    ],
    explanation: {
      bug: "API returns user data",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 23,
    slug: "input-reflected-in-page",
    title: "Challenge 23",
    level: "Easy",
    objective: "Input reflected in page",
    flag: "FLAG{CHALLENGE_23_COMPLETE}",
    skill: "Web Security",
    hints: [
      "test what payload?"
    ],
    explanation: {
      bug: "Input reflected in page",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 24,
    slug: "comment-field-stores-input",
    title: "Challenge 24",
    level: "Easy",
    objective: "Comment field stores input",
    flag: "FLAG{CHALLENGE_24_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what vuln?"
    ],
    explanation: {
      bug: "Comment field stores input",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 25,
    slug: "file-viewer-uses-file",
    title: "Challenge 25",
    level: "Easy",
    objective: "File viewer uses ?file=",
    flag: "FLAG{CHALLENGE_25_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try what pattern?"
    ],
    explanation: {
      bug: "File viewer uses ?file=",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 26,
    slug: "server-uses-ping",
    title: "Challenge 26",
    level: "Easy",
    objective: "Server uses ping",
    flag: "FLAG{CHALLENGE_26_COMPLETE}",
    skill: "Web Security",
    hints: [
      "how inject command?"
    ],
    explanation: {
      bug: "Server uses ping",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 27,
    slug: "cookie-contains-json",
    title: "Challenge 27",
    level: "Easy",
    objective: "Cookie contains JSON",
    flag: "FLAG{CHALLENGE_27_COMPLETE}",
    skill: "Web Security",
    hints: [
      "modify what field?"
    ],
    explanation: {
      bug: "Cookie contains JSON",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 28,
    slug: "password-check-in-js",
    title: "Challenge 28",
    level: "Easy",
    objective: "Password check in JS",
    flag: "FLAG{CHALLENGE_28_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what do you do?"
    ],
    explanation: {
      bug: "Password check in JS",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 29,
    slug: "page-loads-config-js",
    title: "Challenge 29",
    level: "Easy",
    objective: "Page loads /config.js",
    flag: "FLAG{CHALLENGE_29_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what to look for?"
    ],
    explanation: {
      bug: "Page loads /config.js",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 30,
    slug: "hidden-backup-files",
    title: "Challenge 30",
    level: "Easy",
    objective: "Hidden backup files",
    flag: "FLAG{CHALLENGE_30_COMPLETE}",
    skill: "Web Security",
    hints: [
      "guess which names?"
    ],
    explanation: {
      bug: "Hidden backup files",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 31,
    slug: "js-checks-length-10",
    title: "Challenge 31",
    level: "Easy",
    objective: "JS checks length===10",
    flag: "FLAG{CHALLENGE_31_COMPLETE}",
    skill: "Web Security",
    hints: [
      "bypass how?"
    ],
    explanation: {
      bug: "JS checks length===10",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 32,
    slug: "input-filtered-script",
    title: "Challenge 32",
    level: "Easy",
    objective: "Input filtered <script>",
    flag: "FLAG{CHALLENGE_32_COMPLETE}",
    skill: "Web Security",
    hints: [
      "bypass idea?"
    ],
    explanation: {
      bug: "Input filtered <script>",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 33,
    slug: "api-key-in-source",
    title: "Challenge 33",
    level: "Easy",
    objective: "API key in source",
    flag: "FLAG{CHALLENGE_33_COMPLETE}",
    skill: "Web Security",
    hints: [
      "how use it?"
    ],
    explanation: {
      bug: "API key in source",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 34,
    slug: "url-admin-0",
    title: "Challenge 34",
    level: "Easy",
    objective: "URL: ?admin=0",
    flag: "FLAG{CHALLENGE_34_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what change?"
    ],
    explanation: {
      bug: "URL: ?admin=0",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 35,
    slug: "form-uses-post",
    title: "Challenge 35",
    level: "Easy",
    objective: "Form uses POST",
    flag: "FLAG{CHALLENGE_35_COMPLETE}",
    skill: "Web Security",
    hints: [
      "can you tamper?"
    ],
    explanation: {
      bug: "Form uses POST",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 36,
    slug: "page-redirects",
    title: "Challenge 36",
    level: "Easy",
    objective: "Page redirects",
    flag: "FLAG{CHALLENGE_36_COMPLETE}",
    skill: "Web Security",
    hints: [
      "how stop it?"
    ],
    explanation: {
      bug: "Page redirects",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 37,
    slug: "token-in-localstorage",
    title: "Challenge 37",
    level: "Easy",
    objective: "Token in localStorage",
    flag: "FLAG{CHALLENGE_37_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what inspect?"
    ],
    explanation: {
      bug: "Token in localStorage",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 38,
    slug: "parameter-not-used",
    title: "Challenge 38",
    level: "Easy",
    objective: "Parameter not used",
    flag: "FLAG{CHALLENGE_38_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try adding new one"
    ],
    explanation: {
      bug: "Parameter not used",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 39,
    slug: "js-uses-eval",
    title: "Challenge 39",
    level: "Easy",
    objective: "JS uses eval()",
    flag: "FLAG{CHALLENGE_39_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what risk?"
    ],
    explanation: {
      bug: "JS uses eval()",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 40,
    slug: "image-path-reveals-uploads",
    title: "Challenge 40",
    level: "Easy",
    objective: "Image path reveals /uploads",
    flag: "FLAG{CHALLENGE_40_COMPLETE}",
    skill: "Web Security",
    hints: [
      "next step?"
    ],
    explanation: {
      bug: "Image path reveals /uploads",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 41,
    slug: "login-uses-sql",
    title: "Challenge 41",
    level: "Medium",
    objective: "Login uses SQL",
    flag: "FLAG{CHALLENGE_41_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try what payload?"
    ],
    explanation: {
      bug: "Login uses SQL",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 42,
    slug: "input-echoed",
    title: "Challenge 42",
    level: "Medium",
    objective: "Input echoed",
    flag: "FLAG{CHALLENGE_42_COMPLETE}",
    skill: "Web Security",
    hints: [
      "XSS test?"
    ],
    explanation: {
      bug: "Input echoed",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 43,
    slug: "stored-message",
    title: "Challenge 43",
    level: "Medium",
    objective: "Stored message",
    flag: "FLAG{CHALLENGE_43_COMPLETE}",
    skill: "Web Security",
    hints: [
      "persistent XSS?"
    ],
    explanation: {
      bug: "Stored message",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 44,
    slug: "file-upload",
    title: "Challenge 44",
    level: "Medium",
    objective: "File upload",
    flag: "FLAG{CHALLENGE_44_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try what extension?"
    ],
    explanation: {
      bug: "File upload",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 45,
    slug: "url-encoded-string",
    title: "Challenge 45",
    level: "Medium",
    objective: "URL encoded string",
    flag: "FLAG{CHALLENGE_45_COMPLETE}",
    skill: "Web Security",
    hints: [
      "decode it"
    ],
    explanation: {
      bug: "URL encoded string",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 46,
    slug: "hidden-api-endpoint",
    title: "Challenge 46",
    level: "Medium",
    objective: "Hidden API endpoint",
    flag: "FLAG{CHALLENGE_46_COMPLETE}",
    skill: "Web Security",
    hints: [
      "find how?"
    ],
    explanation: {
      bug: "Hidden API endpoint",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 47,
    slug: "response-contains-id",
    title: "Challenge 47",
    level: "Medium",
    objective: "Response contains ID",
    flag: "FLAG{CHALLENGE_47_COMPLETE}",
    skill: "Web Security",
    hints: [
      "reuse it?"
    ],
    explanation: {
      bug: "Response contains ID",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 48,
    slug: "json-response-editable",
    title: "Challenge 48",
    level: "Medium",
    objective: "JSON response editable",
    flag: "FLAG{CHALLENGE_48_COMPLETE}",
    skill: "Web Security",
    hints: [
      "modify?"
    ],
    explanation: {
      bug: "JSON response editable",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 49,
    slug: "role-in-cookie",
    title: "Challenge 49",
    level: "Medium",
    objective: "Role in cookie",
    flag: "FLAG{CHALLENGE_49_COMPLETE}",
    skill: "Web Security",
    hints: [
      "change to admin?"
    ],
    explanation: {
      bug: "Role in cookie",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 50,
    slug: "csrf-token-missing",
    title: "Challenge 50",
    level: "Medium",
    objective: "CSRF token missing",
    flag: "FLAG{CHALLENGE_50_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what attack?"
    ],
    explanation: {
      bug: "CSRF token missing",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 51,
    slug: "password-reset",
    title: "Challenge 51",
    level: "Medium",
    objective: "Password reset",
    flag: "FLAG{CHALLENGE_51_COMPLETE}",
    skill: "Web Security",
    hints: [
      "abuse how?"
    ],
    explanation: {
      bug: "Password reset",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 52,
    slug: "search-input",
    title: "Challenge 52",
    level: "Medium",
    objective: "Search input",
    flag: "FLAG{CHALLENGE_52_COMPLETE}",
    skill: "Web Security",
    hints: [
      "inject what?"
    ],
    explanation: {
      bug: "Search input",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 53,
    slug: "parameter-ignored",
    title: "Challenge 53",
    level: "Medium",
    objective: "Parameter ignored",
    flag: "FLAG{CHALLENGE_53_COMPLETE}",
    skill: "Web Security",
    hints: [
      "brute values?"
    ],
    explanation: {
      bug: "Parameter ignored",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 54,
    slug: "file-path",
    title: "Challenge 54",
    level: "Medium",
    objective: "File path",
    flag: "FLAG{CHALLENGE_54_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try traversal?"
    ],
    explanation: {
      bug: "File path",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 55,
    slug: "server-error-leaks-path",
    title: "Challenge 55",
    level: "Medium",
    objective: "Server error leaks path",
    flag: "FLAG{CHALLENGE_55_COMPLETE}",
    skill: "Web Security",
    hints: [
      "use it?"
    ],
    explanation: {
      bug: "Server error leaks path",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 56,
    slug: "debug-mode",
    title: "Challenge 56",
    level: "Medium",
    objective: "Debug mode",
    flag: "FLAG{CHALLENGE_56_COMPLETE}",
    skill: "Web Security",
    hints: [
      "enable how?"
    ],
    explanation: {
      bug: "Debug mode",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 57,
    slug: "api-accepts-get",
    title: "Challenge 57",
    level: "Medium",
    objective: "API accepts GET",
    flag: "FLAG{CHALLENGE_57_COMPLETE}",
    skill: "Web Security",
    hints: [
      "change to POST?"
    ],
    explanation: {
      bug: "API accepts GET",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 58,
    slug: "js-minified",
    title: "Challenge 58",
    level: "Medium",
    objective: "JS minified",
    flag: "FLAG{CHALLENGE_58_COMPLETE}",
    skill: "Web Security",
    hints: [
      "beautify and read"
    ],
    explanation: {
      bug: "JS minified",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 59,
    slug: "hidden-iframe",
    title: "Challenge 59",
    level: "Medium",
    objective: "Hidden iframe",
    flag: "FLAG{CHALLENGE_59_COMPLETE}",
    skill: "Web Security",
    hints: [
      "inspect source"
    ],
    explanation: {
      bug: "Hidden iframe",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 60,
    slug: "redirect-param",
    title: "Challenge 60",
    level: "Medium",
    objective: "Redirect param",
    flag: "FLAG{CHALLENGE_60_COMPLETE}",
    skill: "Web Security",
    hints: [
      "open redirect?"
    ],
    explanation: {
      bug: "Redirect param",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 61,
    slug: "jwt-token",
    title: "Challenge 61",
    level: "Medium",
    objective: "JWT token",
    flag: "FLAG{CHALLENGE_61_COMPLETE}",
    skill: "Web Security",
    hints: [
      "decode what part?"
    ],
    explanation: {
      bug: "JWT token",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 62,
    slug: "jwt-unsigned",
    title: "Challenge 62",
    level: "Medium",
    objective: "JWT unsigned",
    flag: "FLAG{CHALLENGE_62_COMPLETE}",
    skill: "Web Security",
    hints: [
      "exploit how?"
    ],
    explanation: {
      bug: "JWT unsigned",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 63,
    slug: "cookie-signed",
    title: "Challenge 63",
    level: "Medium",
    objective: "Cookie signed?",
    flag: "FLAG{CHALLENGE_63_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try tampering"
    ],
    explanation: {
      bug: "Cookie signed?",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 64,
    slug: "rate-limit",
    title: "Challenge 64",
    level: "Medium",
    objective: "Rate limit",
    flag: "FLAG{CHALLENGE_64_COMPLETE}",
    skill: "Web Security",
    hints: [
      "bypass how?"
    ],
    explanation: {
      bug: "Rate limit",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 65,
    slug: "login-brute-force",
    title: "Challenge 65",
    level: "Medium",
    objective: "Login brute force",
    flag: "FLAG{CHALLENGE_65_COMPLETE}",
    skill: "Web Security",
    hints: [
      "automate?"
    ],
    explanation: {
      bug: "Login brute force",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 66,
    slug: "idor-with-api-user-2",
    title: "Challenge 66",
    level: "Medium",
    objective: "IDOR with /api/user/2",
    flag: "FLAG{CHALLENGE_66_COMPLETE}",
    skill: "Web Security",
    hints: [
      "escalate"
    ],
    explanation: {
      bug: "IDOR with /api/user/2",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 67,
    slug: "file-upload-filter",
    title: "Challenge 67",
    level: "Medium",
    objective: "File upload filter",
    flag: "FLAG{CHALLENGE_67_COMPLETE}",
    skill: "Web Security",
    hints: [
      "bypass?"
    ],
    explanation: {
      bug: "File upload filter",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 68,
    slug: "xss-filter",
    title: "Challenge 68",
    level: "Medium",
    objective: "XSS filter",
    flag: "FLAG{CHALLENGE_68_COMPLETE}",
    skill: "Web Security",
    hints: [
      "encode payload"
    ],
    explanation: {
      bug: "XSS filter",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 69,
    slug: "path-traversal-blocked",
    title: "Challenge 69",
    level: "Medium",
    objective: "Path traversal blocked",
    flag: "FLAG{CHALLENGE_69_COMPLETE}",
    skill: "Web Security",
    hints: [
      "double encode"
    ],
    explanation: {
      bug: "Path traversal blocked",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 70,
    slug: "command-injection-filtered",
    title: "Challenge 70",
    level: "Medium",
    objective: "Command injection filtered",
    flag: "FLAG{CHALLENGE_70_COMPLETE}",
    skill: "Web Security",
    hints: [
      "bypass?"
    ],
    explanation: {
      bug: "Command injection filtered",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 71,
    slug: "sqli-filtered",
    title: "Challenge 71",
    level: "Medium",
    objective: "SQLi filtered '",
    flag: "FLAG{CHALLENGE_71_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try alternative"
    ],
    explanation: {
      bug: "SQLi filtered '",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 72,
    slug: "parameter-pollution",
    title: "Challenge 72",
    level: "Medium",
    objective: "Parameter pollution",
    flag: "FLAG{CHALLENGE_72_COMPLETE}",
    skill: "Web Security",
    hints: [
      "use how?"
    ],
    explanation: {
      bug: "Parameter pollution",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 73,
    slug: "cors-misconfig",
    title: "Challenge 73",
    level: "Medium",
    objective: "CORS misconfig",
    flag: "FLAG{CHALLENGE_73_COMPLETE}",
    skill: "Web Security",
    hints: [
      "exploit?"
    ],
    explanation: {
      bug: "CORS misconfig",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 74,
    slug: "ssrf-input",
    title: "Challenge 74",
    level: "Medium",
    objective: "SSRF input",
    flag: "FLAG{CHALLENGE_74_COMPLETE}",
    skill: "Web Security",
    hints: [
      "what URL?"
    ],
    explanation: {
      bug: "SSRF input",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 75,
    slug: "subdomain-found",
    title: "Challenge 75",
    level: "Medium",
    objective: "Subdomain found",
    flag: "FLAG{CHALLENGE_75_COMPLETE}",
    skill: "Web Security",
    hints: [
      "test separately"
    ],
    explanation: {
      bug: "Subdomain found",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 76,
    slug: "backup-subdomain",
    title: "Challenge 76",
    level: "Medium",
    objective: "Backup subdomain",
    flag: "FLAG{CHALLENGE_76_COMPLETE}",
    skill: "Web Security",
    hints: [
      "access?"
    ],
    explanation: {
      bug: "Backup subdomain",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 77,
    slug: "api-versioning",
    title: "Challenge 77",
    level: "Medium",
    objective: "API versioning",
    flag: "FLAG{CHALLENGE_77_COMPLETE}",
    skill: "Web Security",
    hints: [
      "try v1/v2"
    ],
    explanation: {
      bug: "API versioning",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 78,
    slug: "hidden-admin-panel",
    title: "Challenge 78",
    level: "Medium",
    objective: "Hidden admin panel",
    flag: "FLAG{CHALLENGE_78_COMPLETE}",
    skill: "Web Security",
    hints: [
      "fuzz paths"
    ],
    explanation: {
      bug: "Hidden admin panel",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 79,
    slug: "debug-logs",
    title: "Challenge 79",
    level: "Medium",
    objective: "Debug logs",
    flag: "FLAG{CHALLENGE_79_COMPLETE}",
    skill: "Web Security",
    hints: [
      "extract secrets"
    ],
    explanation: {
      bug: "Debug logs",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  },
  {
    id: 80,
    slug: "multi-step-exploit",
    title: "Challenge 80",
    level: "Medium",
    objective: "Multi-step exploit",
    flag: "FLAG{CHALLENGE_80_COMPLETE}",
    skill: "Web Security",
    hints: [
      "chain 3 bugs"
    ],
    explanation: {
      bug: "Multi-step exploit",
      why: "This is a common vulnerability.",
      prevention: "Follow secure coding practices."
    }
  }
];

export class GameStateService {
  solvedChallenges = signal<number[]>([]);
  currentChallengeId = signal<number>(1);
  
  // Byte AI Companion State
  byteMessage = signal('80 puzzles… this is where beginners become dangerous 😏');
  byteMood = signal<'idle' | 'happy' | 'thinking' | 'excited'>('idle');
  
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
  }
}
