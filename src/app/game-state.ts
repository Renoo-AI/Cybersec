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
  }
];

export class GameStateService {
  solvedChallenges = signal<number[]>([]);
  currentChallengeId = signal<number>(1);
  
  // Byte AI Companion State
  byteMessage = signal('Welcome, teammate! I\'m Byte. Ready to hack some systems?');
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
