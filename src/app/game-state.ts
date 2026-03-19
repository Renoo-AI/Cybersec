import { signal, computed } from '@angular/core';

export interface Challenge {
  id: number;
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
    title: "View Source Hunt",
    level: "Super Beginner",
    objective: "The flag is hidden somewhere in the page structure. Can you find it?",
    flag: "THM{view_the_source}",
    skill: "Inspecting Page Source",
    hints: [
      "Right-click anywhere on the page and select \"Inspect\" or \"View Page Source\".",
      "Look for a div with a suspicious ID or just search for \"THM{\" in the elements tab.",
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
    title: "Hidden Comment Finder",
    level: "Super Beginner",
    objective: "Developers use comments to leave notes. Sometimes they forget to remove them.",
    flag: "THM{comments_are_useful}",
    skill: "Reading HTML Comments",
    hints: [
      "Open DevTools (F12 or Right-click -> Inspect).",
      "Look for green text in the Elements tab starting with <!--.",
      "It is usually near the main content area."
    ],
    explanation: {
      bug: "Sensitive Information in Comments.",
      why: "Comments are visible to anyone who views the source. They can reveal logic, passwords, or hidden paths.",
      prevention: "Strip comments during the build process or manually remove sensitive notes."
    }
  },
  {
    id: 3,
    title: "Broken Image Clue",
    level: "Super Beginner",
    objective: "An image failed to load. Maybe its source path tells a story?",
    flag: "THM{follow_the_path}",
    skill: "Analyzing File Paths",
    hints: [
      "Inspect the broken image icon.",
      "Look at the \"src\" attribute. Where is it trying to point?",
      "Try navigating to the directory mentioned in the path (e.g., /secret-vault)."
    ],
    explanation: {
      bug: "Information Leakage via File Paths.",
      why: "Broken links or specific naming conventions can reveal the existence of hidden directories.",
      prevention: "Use generic naming conventions and ensure 404 pages don't leak directory structures."
    }
  },
  {
    id: 4,
    title: "Robots.txt Discovery",
    level: "Super Beginner",
    objective: "Search engines use a special file to know what NOT to index. Hackers love it.",
    flag: "THM{robots_know_secrets}",
    skill: "Checking Common Files",
    hints: [
      "Try adding \"/robots.txt\" to the end of the URL in your mind, or look for a \"Virtual Robots\" button.",
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
    title: "Hidden Page Guessing",
    level: "Super Beginner",
    objective: "Some pages aren't linked anywhere. Can you guess where the admin hides?",
    flag: "THM{hidden_pages_exist}",
    skill: "Directory Enumeration",
    hints: [
      "Think of common names for administrative areas.",
      "Try paths like /admin, /login, /config, or /dashboard.",
      "In this game, look for a \"Go to Path\" input box."
    ],
    explanation: {
      bug: "Unprotected Hidden Pages.",
      why: "If a page exists but isn't linked, it can still be found by guessing or \"fuzzing\".",
      prevention: "Always enforce strict authentication on all sensitive endpoints, regardless of whether they are linked."
    }
  },
  {
    id: 6,
    title: "Simple Login Bypass",
    level: "Easy",
    objective: "The login form is poorly coded. Can you trick it into letting you in without a password?",
    flag: "THM{first_sqli}",
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
    id: 7,
    title: "URL Parameter Tampering",
    level: "Easy",
    objective: "The URL says you are a \"guest\". What if you were someone else?",
    flag: "THM{change_the_parameter}",
    skill: "Parameter Tampering",
    hints: [
      "Look at the URL parameters (the part after the ?).",
      "Change \"user=guest\" to something more powerful.",
      "Try \"admin\"."
    ],
    explanation: {
      bug: "Insecure Parameter Handling.",
      why: "The server trusts the client to define its own identity via URL parameters.",
      prevention: "Use secure, server-side sessions to track user roles."
    }
  },
  {
    id: 8,
    title: "Price Manipulation",
    level: "Easy",
    objective: "This item is too expensive. Can you \"negotiate\" the price in the URL?",
    flag: "THM{never_trust_user_input}",
    skill: "Business Logic Vulnerability",
    hints: [
      "Check the URL for a \"price\" parameter.",
      "What happens if you change it to 1 or 0?",
      "Edit the URL and press Enter."
    ],
    explanation: {
      bug: "Client-Side Trust.",
      why: "The application trusts the price sent from the browser instead of looking it up in a database.",
      prevention: "Never trust sensitive data (like prices) provided by the client."
    }
  },
  {
    id: 9,
    title: "Cookie Role Escalation",
    level: "Easy",
    objective: "Your browser is holding a cookie that says you are a \"user\". Change it!",
    flag: "THM{cookies_can_lie}",
    skill: "Cookie Tampering",
    hints: [
      "Open DevTools -> Application tab -> Cookies.",
      "Find the cookie named \"role\".",
      "Double-click the value and change it to \"admin\", then refresh the challenge."
    ],
    explanation: {
      bug: "Insecure Cookie Storage.",
      why: "Cookies are stored on the user's machine and can be edited easily.",
      prevention: "Use signed or encrypted cookies, or store roles only on the server."
    }
  },
  {
    id: 10,
    title: "Base64 Cookie Decode",
    level: "Easy",
    objective: "The cookie value looks like gibberish. It's actually just encoded.",
    flag: "THM{decode_then_edit}",
    skill: "Base64 Encoding/Decoding",
    hints: [
      "The value \"cm9sZT11c2Vy\" is Base64. Try decoding it online or in the console using atob().",
      "It decodes to \"role=user\". Change it to \"role=admin\" and encode it back using btoa().",
      "The new value should be \"cm9sZT1hZG1pbg==\"."
    ],
    explanation: {
      bug: "Encoding is NOT Encryption.",
      why: "Base64 is a way to represent data, not hide it. It is trivial to reverse.",
      prevention: "Use strong encryption for sensitive data stored on the client."
    }
  },
  {
    id: 11,
    title: "JavaScript Password Leak",
    level: "Easy",
    objective: "The login button calls a function. Maybe the password is right there?",
    flag: "THM{js_leaks_secrets}",
    skill: "Analyzing Client-Side Logic",
    hints: [
      "Inspect the \"Login\" button to see what function it calls.",
      "Look at the \"Sources\" tab in DevTools for a .js file.",
      "Search for \"if (password === ...)\" in the code."
    ],
    explanation: {
      bug: "Hardcoded Credentials in JS.",
      why: "Anything in JavaScript is sent to the user's browser and can be read.",
      prevention: "Always verify passwords on the server side."
    }
  },
  {
    id: 12,
    title: "Disabled Button Trick",
    level: "Easy",
    objective: "The \"Get Flag\" button is grayed out. Can you force it to work?",
    flag: "THM{frontend_is_not_security}",
    skill: "Bypassing UI Restrictions",
    hints: [
      "Right-click the disabled button and select \"Inspect\".",
      "Look for the \"disabled\" attribute in the HTML tag.",
      "Double-click the word \"disabled\" and delete it, then click the button."
    ],
    explanation: {
      bug: "Client-Side Only Restriction.",
      why: "Disabling a button in HTML only stops the UI, not the underlying action.",
      prevention: "Verify permissions on the server before performing the action."
    }
  },
  {
    id: 13,
    title: "Client-Side Validation Bypass",
    level: "Easy",
    objective: "The form says your username must be exactly 1337 characters. That's annoying.",
    flag: "THM{validation_bypassed}",
    skill: "Bypassing Client-Side Checks",
    hints: [
      "The check is happening in JavaScript before the form is sent.",
      "You can find the validation function and change its logic in the console.",
      "Or just edit the HTML to remove the \"maxlength\" or \"pattern\" attributes."
    ],
    explanation: {
      bug: "Lack of Server-Side Validation.",
      why: "Client-side validation is for user experience, not security.",
      prevention: "Always re-validate all input on the server."
    }
  },
  {
    id: 14,
    title: "Hidden Input Field",
    level: "Easy",
    objective: "There is a secret field in this form that you can't see, but the server can.",
    flag: "THM{hidden_is_not_safe}",
    skill: "Manipulating Hidden Inputs",
    hints: [
      "Inspect the form elements.",
      "Look for `<input type=\"hidden\" ...>`.",
      "Change the value of \"isAdmin\" from \"false\" to \"true\" and submit."
    ],
    explanation: {
      bug: "Trusting Hidden Form Fields.",
      why: "Hidden fields are just as editable as visible ones.",
      prevention: "Store state like \"isAdmin\" in a secure session on the server."
    }
  },
  {
    id: 15,
    title: "IDOR Beginner Lab",
    level: "Easy",
    objective: "You are viewing your profile (ID 1). Can you see ID 2?",
    flag: "THM{idor_found}",
    skill: "Insecure Direct Object Reference",
    hints: [
      "Look at the URL: /profile?id=1.",
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
    id: 16,
    title: "File Name Guessing",
    level: "Easy",
    objective: "The developer left a backup of the database somewhere. Can you find it?",
    flag: "THM{backup_files_matter}",
    skill: "Predictable Resource Location",
    hints: [
      "Common backup names include backup.zip, config.old, or db.sql.",
      "Try guessing common filenames in the \"Go to Path\" box.",
      "Try \"db.txt\"."
    ],
    explanation: {
      bug: "Sensitive Files Exposed.",
      why: "Leaving backups or configuration files in the web root is a major risk.",
      prevention: "Store backups outside the web root and disable directory listing."
    }
  },
  {
    id: 17,
    title: "Search Box XSS Intro",
    level: "Medium",
    objective: "The search box repeats whatever you type. Can you make it run code?",
    flag: "THM{xss_is_real}",
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
    id: 18,
    title: "Profile Message Stored XSS",
    level: "Medium",
    objective: "Your bio is saved and shown to everyone. Can you \"infect\" the page?",
    flag: "THM{stored_xss_master}",
    skill: "Stored XSS",
    hints: [
      "This is like the search box, but the payload is saved in the database.",
      "Enter `<script>alert(1)</script>` as your bio.",
      "Refresh the page to see if it triggers."
    ],
    explanation: {
      bug: "Stored Cross-Site Scripting (XSS).",
      why: "Malicious scripts are saved on the server and executed in every visitor's browser.",
      prevention: "Use a Content Security Policy (CSP) and sanitize all stored input."
    }
  },
  {
    id: 19,
    title: "Path Traversal Lite",
    level: "Medium",
    objective: "The page viewer loads files from a folder. Can you go \"up\" a level?",
    flag: "THM{dot_dot_slash}",
    skill: "Path Traversal",
    hints: [
      "The URL looks like `?file=welcome.html`.",
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
    id: 20,
    title: "Final Multi-Step Challenge",
    level: "Medium",
    objective: "Combine everything you've learned to break into the ultimate vault.",
    flag: "THM{web_beginner_complete}",
    skill: "Chaining Vulnerabilities",
    hints: [
      "Step 1: Find the hidden admin page (/admin-vault).",
      "Step 2: Inspect the source code for a hidden password hint.",
      "Step 3: Change your cookie \"access_level\" to \"9999\"."
    ],
    explanation: {
      bug: "Vulnerability Chaining.",
      why: "Often, one small bug isn't enough, but combining them leads to a full compromise.",
      prevention: "Defense in Depth: Secure every layer of the application."
    }
  }
];

export class GameStateService {
  solvedChallenges = signal<number[]>([]);
  currentChallengeId = signal<number>(1);
  
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
