'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Code2, Play, CheckCircle, XCircle, BookOpen, Target, Trophy, Zap, Terminal, FileText } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  task: string
  starterCode: string
  solution: string
  testCases: { input: string; expected: string }[]
  hints: string[]
  explanation: string
}

const challenges: Challenge[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Write your first Python program that prints "Hello, Cybersecurity!"',
    difficulty: 'Beginner',
    category: 'Basics',
    task: 'Create a Python script that outputs "Hello, Cybersecurity!" to the console.',
    starterCode: '# Write your first Python program here\n\n',
    solution: 'print("Hello, Cybersecurity!")',
    testCases: [
      { input: '', expected: 'Hello, Cybersecurity!' }
    ],
    hints: [
      'Use the print() function to output text',
      'Remember to use double quotes around your text'
    ],
    explanation: 'The print() function is the most basic way to output information in Python. It takes a string as an argument and displays it to the console.'
  },
  {
    id: 'variables',
    title: 'Variables and Data Types',
    description: 'Learn about variables and basic data types in Python',
    difficulty: 'Beginner',
    category: 'Basics',
    task: 'Create variables for a security tool name, version number, and whether it\'s open source. Then print them.',
    starterCode: '# Create variables for a security tool\n# tool_name = ?\n# version = ?\n# is_open_source = ?\n\n# Print the variables\n',
    solution: 'tool_name = "Wireshark"\nversion = 4.0\nis_open_source = True\n\nprint(f"Tool: {tool_name}")\nprint(f"Version: {version}")\nprint(f"Open Source: {is_open_source}")',
    testCases: [
      { input: '', expected: 'Tool: Wireshark\nVersion: 4.0\nOpen Source: True' }
    ],
    hints: [
      'Use descriptive variable names',
      'Strings use quotes, numbers don\'t, booleans are True/False',
      'Use f-strings for formatted output'
    ],
    explanation: 'Variables store data values. Python has several data types: strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).'
  },
  {
    id: 'password-checker',
    title: 'Simple Password Checker',
    description: 'Create a basic password strength checker',
    difficulty: 'Beginner',
    category: 'Security',
    task: 'Write a function that checks if a password is at least 8 characters long and contains both letters and numbers.',
    starterCode: 'def check_password(password):\n    # Check if password meets criteria\n    # Return True if strong, False if weak\n    pass\n\n# Test the function\nprint(check_password("password123"))  # Should be True\nprint(check_password("pass"))         # Should be False',
    solution: 'def check_password(password):\n    # Check length\n    if len(password) < 8:\n        return False\n    \n    # Check for letters and numbers\n    has_letter = any(c.isalpha() for c in password)\n    has_digit = any(c.isdigit() for c in password)\n    \n    return has_letter and has_digit\n\nprint(check_password("password123"))\nprint(check_password("pass"))',
    testCases: [
      { input: 'password123', expected: 'True' },
      { input: 'pass', expected: 'False' },
      { input: '12345678', expected: 'False' },
      { input: 'abcdefgh', expected: 'False' }
    ],
    hints: [
      'Use len() to check password length',
      'Use any() with a generator expression to check character types',
      'isalpha() checks for letters, isdigit() checks for numbers'
    ],
    explanation: 'Password strength checking is a fundamental security practice. This function demonstrates basic validation rules that are commonly used in authentication systems.'
  },
  {
    id: 'file-analyzer',
    title: 'Log File Analyzer',
    description: 'Analyze security log files for suspicious activity',
    difficulty: 'Intermediate',
    category: 'Automation',
    task: 'Write a script that reads a log file and counts failed login attempts per IP address.',
    starterCode: '# Sample log data (normally this would come from a file)\nlogs = [\n    "192.168.1.1 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.1 - Login failed",\n    "192.168.1.3 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.2 - Login failed"\n]\n\n# Count failed logins per IP\nfailed_logins = {}\n\n# Your code here\n\nprint("Failed login attempts per IP:")\nfor ip, count in failed_logins.items():\n    print(f"{ip}: {count}")',
    solution: '# Sample log data (normally this would come from a file)\nlogs = [\n    "192.168.1.1 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.1 - Login failed",\n    "192.168.1.3 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.2 - Login failed"\n]\n\n# Count failed logins per IP\nfailed_logins = {}\n\nfor log in logs:\n    if "Login failed" in log:\n        ip = log.split(" - ")[0]\n        failed_logins[ip] = failed_logins.get(ip, 0) + 1\n\nprint("Failed login attempts per IP:")\nfor ip, count in failed_logins.items():\n    print(f"{ip}: {count}")',
    testCases: [
      { input: '', expected: 'Failed login attempts per IP:\n192.168.1.1: 1\n192.168.1.2: 3' }
    ],
    hints: [
      'Split each log entry to extract the IP address',
      'Use a dictionary to count occurrences',
      'Check for "Login failed" in each log entry'
    ],
    explanation: 'Log analysis is crucial for security monitoring. This script demonstrates how to parse log files and identify patterns that might indicate security threats like brute force attacks.'
  },
  {
    id: 'encryption-basic',
    title: 'Basic Caesar Cipher',
    description: 'Implement a simple encryption algorithm',
    difficulty: 'Intermediate',
    category: 'Cryptography',
    task: 'Create functions to encrypt and decrypt text using a Caesar cipher with a shift of 3.',
    starterCode: 'def caesar_encrypt(text, shift=3):\n    # Encrypt the text using Caesar cipher\n    pass\n\ndef caesar_decrypt(text, shift=3):\n    # Decrypt the text using Caesar cipher\n    pass\n\n# Test the functions\nmessage = "HELLO SECURITY"\nprint("Original:", message)\nprint("Encrypted:", caesar_encrypt(message))\nprint("Decrypted:", caesar_decrypt(caesar_encrypt(message)))',
    solution: 'def caesar_encrypt(text, shift=3):\n    result = ""\n    for char in text:\n        if char.isalpha():\n            # Shift alphabetic characters\n            base = ord(\'A\') if char.isupper() else ord(\'a\')\n            result += chr((ord(char) - base + shift) % 26 + base)\n        else:\n            result += char\n    return result\n\ndef caesar_decrypt(text, shift=3):\n    return caesar_encrypt(text, -shift)\n\n# Test the functions\nmessage = "HELLO SECURITY"\nprint("Original:", message)\nprint("Encrypted:", caesar_encrypt(message))\nprint("Decrypted:", caesar_decrypt(caesar_encrypt(message)))',
    testCases: [
      { input: 'HELLO', expected: 'KHOOR' },
      { input: 'ABC', expected: 'DEF' },
      { input: 'XYZ', expected: 'ABC' }
    ],
    hints: [
      'Use ord() and chr() to work with ASCII values',
      'Handle uppercase and lowercase letters separately',
      'Use modulo 26 for alphabet wrapping',
      'Decryption is just encryption with negative shift'
    ],
    explanation: 'The Caesar cipher is one of the oldest encryption techniques. It demonstrates basic cryptographic concepts like substitution and key-based encryption.'
  },
  {
    id: 'network-scanner',
    title: 'Simple Port Scanner',
    description: 'Create a basic network port scanner',
    difficulty: 'Advanced',
    category: 'Networking',
    task: 'Write a script that checks if common ports are open on a target host (simulated).',
    starterCode: '# Simulate a port scanner (in real scenarios, use proper libraries)\nimport time\n\n# Common ports to check\ncommon_ports = {\n    80: "HTTP",\n    443: "HTTPS",\n    22: "SSH",\n    21: "FTP",\n    25: "SMTP"\n}\n\n# Simulated open ports (in reality, this would be checked)\nopen_ports = [80, 443, 22]\n\ndef scan_port(port):\n    # Simulate port scanning delay\n    time.sleep(0.1)\n    return port in open_ports\n\n# Scan ports and report results\nprint("Port Scan Results:")\nfor port, service in common_ports.items():\n    if scan_port(port):\n        print(f"Port {port} ({service}): OPEN")\n    else:\n        print(f"Port {port} ({service}): CLOSED")',
    solution: '# Simulate a port scanner (in real scenarios, use proper libraries)\nimport time\n\n# Common ports to check\ncommon_ports = {\n    80: "HTTP",\n    443: "HTTPS",\n    22: "SSH",\n    21: "FTP",\n    25: "SMTP"\n}\n\n# Simulated open ports (in reality, this would be checked)\nopen_ports = [80, 443, 22]\n\ndef scan_port(port):\n    # Simulate port scanning delay\n    time.sleep(0.1)\n    return port in open_ports\n\n# Scan ports and report results\nprint("Port Scan Results:")\nfor port, service in common_ports.items():\n    if scan_port(port):\n        print(f"Port {port} ({service}): OPEN")\n    else:\n        print(f"Port {port} ({service}): CLOSED")',
    testCases: [
      { input: '', expected: 'Port Scan Results:\nPort 80 (HTTP): OPEN\nPort 443 (HTTPS): OPEN\nPort 22 (SSH): OPEN\nPort 21 (FTP): CLOSED\nPort 25 (SMTP): CLOSED' }
    ],
    hints: [
      'Use socket library for real port scanning (not shown here for safety)',
      'Handle connection timeouts and errors',
      'Common ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), etc.'
    ],
    explanation: 'Port scanning is a reconnaissance technique used to discover open services on a network. This demonstrates basic network enumeration concepts.'
  },
  {
    id: 'email-validator',
    title: 'Email Address Validator',
    description: 'Create a basic email validation function for security purposes',
    difficulty: 'Beginner',
    category: 'Security',
    task: 'Write a function that checks if an email address has a basic valid format (contains @ and a domain).',
    starterCode: 'def validate_email(email):\n    # Check if email has basic valid format\n    # Should contain @ and have a domain part\n    pass\n\n# Test the function\nprint(validate_email("user@example.com"))  # Should be True\nprint(validate_email("invalid-email"))     # Should be False\nprint(validate_email("user@"))             # Should be False',
    solution: 'def validate_email(email):\n    # Basic email validation\n    if "@" not in email:\n        return False\n    \n    parts = email.split("@")\n    if len(parts) != 2:\n        return False\n    \n    local, domain = parts\n    \n    # Check for empty parts and basic domain format\n    if not local or not domain:\n        return False\n    \n    if "." not in domain:\n        return False\n    \n    return True\n\nprint(validate_email("user@example.com"))\nprint(validate_email("invalid-email"))\nprint(validate_email("user@"))',
    testCases: [
      { input: 'user@example.com', expected: 'True' },
      { input: 'invalid-email', expected: 'False' },
      { input: 'user@', expected: 'False' },
      { input: '@example.com', expected: 'False' }
    ],
    hints: [
      'Use the split() method with "@" as separator',
      'Check that there are exactly 2 parts after splitting',
      'Ensure both local and domain parts are not empty',
      'Domain should contain a dot for basic validation'
    ],
    explanation: 'Email validation is important for user registration and preventing spam. This demonstrates basic string manipulation and conditional logic for security validation.'
  },
  {
    id: 'simple-hash',
    title: 'Simple Hash Calculator',
    description: 'Implement a basic hash function for data integrity checking',
    difficulty: 'Intermediate',
    category: 'Cryptography',
    task: 'Create a simple hash function that converts a string to a numeric hash value.',
    starterCode: 'def simple_hash(text):\n    # Create a simple hash from the text\n    # Sum ASCII values and take modulo\n    pass\n\n# Test the function\nprint(simple_hash("hello"))     # Should output a number\nprint(simple_hash("security"))  # Different number\nprint(simple_hash("hello"))     # Same as first output',
    solution: 'def simple_hash(text):\n    # Simple hash: sum of ASCII values modulo 1000\n    hash_value = 0\n    for char in text:\n        hash_value += ord(char)\n    return hash_value % 1000\n\nprint(simple_hash("hello"))\nprint(simple_hash("security"))\nprint(simple_hash("hello"))',
    testCases: [
      { input: 'hello', expected: '532' },
      { input: 'security', expected: '849' }
    ],
    hints: [
      'Use ord() to get ASCII value of each character',
      'Sum the ASCII values',
      'Use modulo operator to keep hash within a range',
      'Same input should always produce same output'
    ],
    explanation: 'Hash functions are fundamental to cryptography and data integrity. This simple example demonstrates the concept of deterministic hashing.'
  },
  {
    id: 'config-parser',
    title: 'Configuration File Parser',
    description: 'Parse a simple configuration file for security settings',
    difficulty: 'Intermediate',
    category: 'Automation',
    task: 'Write a script that reads and parses a simple key-value configuration file.',
    starterCode: '# Sample config data (normally this would come from a file)\nconfig_text = """\n# Security Configuration\nmax_login_attempts=3\nsession_timeout=3600\nenable_logging=true\nadmin_email=admin@example.com\n"""\n\n# Parse the configuration\ndef parse_config(config_str):\n    config = {}\n    # Parse each line and extract key-value pairs\n    # Skip comments (lines starting with #)\n    pass\n\n# Test the parser\nsettings = parse_config(config_text)\nprint("Configuration loaded:")\nfor key, value in settings.items():\n    print(f"{key}: {value}")',
    solution: '# Sample config data (normally this would come from a file)\nconfig_text = """\n# Security Configuration\nmax_login_attempts=3\nsession_timeout=3600\nenable_logging=true\nadmin_email=admin@example.com\n"""\n\n# Parse the configuration\ndef parse_config(config_str):\n    config = {}\n    lines = config_str.strip().split("\\n")\n    \n    for line in lines:\n        line = line.strip()\n        # Skip empty lines and comments\n        if not line or line.startswith("#"):\n            continue\n        \n        # Parse key=value\n        if "=" in line:\n            key, value = line.split("=", 1)\n            config[key.strip()] = value.strip()\n    \n    return config\n\n# Test the parser\nsettings = parse_config(config_text)\nprint("Configuration loaded:")\nfor key, value in settings.items():\n    print(f"{key}: {value}")',
    testCases: [
      { input: '', expected: 'Configuration loaded:\nmax_login_attempts: 3\nsession_timeout: 3600\nenable_logging: true\nadmin_email: admin@example.com' }
    ],
    hints: [
      'Split the text into lines using split("\\n")',
      'Skip lines that start with # or are empty',
      'Use split("=", 1) to separate key and value',
      'Strip whitespace from keys and values'
    ],
    explanation: 'Configuration files are common in security tools. Parsing them teaches file handling and string manipulation skills essential for automation scripts.'
  },
  {
    id: 'access-control',
    title: 'Simple Access Control',
    description: 'Implement basic role-based access control logic',
    difficulty: 'Intermediate',
    category: 'Security',
    task: 'Create a function that checks if a user has permission to access a resource based on their role.',
    starterCode: '# Define user roles and permissions\nroles = {\n    "admin": ["read", "write", "delete", "admin"],\n    "user": ["read", "write"],\n    "guest": ["read"]\n}\n\n# Sample users\nusers = {\n    "alice": "admin",\n    "bob": "user",\n    "charlie": "guest"\n}\n\ndef check_permission(username, action):\n    # Check if user has permission for the action\n    pass\n\n# Test the function\nprint(check_permission("alice", "delete"))    # Should be True\nprint(check_permission("bob", "delete"))      # Should be False\nprint(check_permission("charlie", "write"))   # Should be False',
    solution: '# Define user roles and permissions\nroles = {\n    "admin": ["read", "write", "delete", "admin"],\n    "user": ["read", "write"],\n    "guest": ["read"]\n}\n\n# Sample users\nusers = {\n    "alice": "admin",\n    "bob": "user",\n    "charlie": "guest"\n}\n\ndef check_permission(username, action):\n    # Check if user exists\n    if username not in users:\n        return False\n    \n    # Get user role\n    user_role = users[username]\n    \n    # Check if role has the required permission\n    if user_role in roles and action in roles[user_role]:\n        return True\n    \n    return False\n\nprint(check_permission("alice", "delete"))\nprint(check_permission("bob", "delete"))\nprint(check_permission("charlie", "write"))',
    testCases: [
      { input: 'alice,delete', expected: 'True' },
      { input: 'bob,delete', expected: 'False' },
      { input: 'charlie,write', expected: 'False' },
      { input: 'alice,read', expected: 'True' }
    ],
    hints: [
      'Use dictionaries to store roles and permissions',
      'Check if user exists in users dictionary',
      'Get user role, then check if action is in role permissions',
      'Return False for unknown users or insufficient permissions'
    ],
    explanation: 'Access control is fundamental to security systems. This demonstrates role-based access control (RBAC) using dictionaries and conditional logic.'
  },
  {
    id: 'url-parser',
    title: 'URL Parser for Security Analysis',
    description: 'Parse URLs to extract components for security analysis',
    difficulty: 'Intermediate',
    category: 'Web Security',
    task: 'Write a function that parses a URL and extracts the protocol, domain, and path components.',
    starterCode: 'def parse_url(url):\n    # Parse URL into components\n    # Extract protocol, domain, and path\n    pass\n\n# Test the function\nurls = [\n    "https://example.com/path/to/resource",\n    "http://test.com/page",\n    "ftp://files.example.org/download.zip"\n]\n\nfor url in urls:\n    components = parse_url(url)\n    print(f"URL: {url}")\n    print(f"Protocol: {components.get(\'protocol\', \'unknown\')}")\n    print(f"Domain: {components.get(\'domain\', \'unknown\')}")\n    print(f"Path: {components.get(\'path\', \'/\')}")\n    print("---")',
    solution: 'def parse_url(url):\n    # Simple URL parser\n    components = {}\n    \n    # Find protocol\n    if "://" in url:\n        protocol, rest = url.split("://", 1)\n        components["protocol"] = protocol\n    else:\n        rest = url\n        components["protocol"] = "http"  # default\n    \n    # Find domain and path\n    if "/" in rest:\n        domain, path = rest.split("/", 1)\n        components["domain"] = domain\n        components["path"] = "/" + path\n    else:\n        components["domain"] = rest\n        components["path"] = "/"\n    \n    return components\n\n# Test the function\nurls = [\n    "https://example.com/path/to/resource",\n    "http://test.com/page",\n    "ftp://files.example.org/download.zip"\n]\n\nfor url in urls:\n    components = parse_url(url)\n    print(f"URL: {url}")\n    print(f"Protocol: {components.get(\'protocol\', \'unknown\')}")\n    print(f"Domain: {components.get(\'domain\', \'unknown\')}")\n    print(f"Path: {components.get(\'path\', \'/\')}")\n    print("---")',
    testCases: [
      { input: 'https://example.com/path', expected: 'Protocol: https\nDomain: example.com\nPath: /path' },
      { input: 'http://test.com', expected: 'Protocol: http\nDomain: test.com\nPath: /' }
    ],
    hints: [
      'Split on "://" to separate protocol from rest',
      'Split on "/" to separate domain from path',
      'Handle URLs without explicit protocol',
      'Use dictionary to store components'
    ],
    explanation: 'URL parsing is essential for web security analysis. Understanding URL components helps identify potential security issues like malicious redirects or parameter injection.'
  },
  {
    id: 'brute-force-sim',
    title: 'Brute Force Attack Simulator (Safe)',
    description: 'Simulate a basic brute force attack on a simple password system',
    difficulty: 'Advanced',
    category: 'Security',
    task: 'Create a safe simulation of brute force password cracking using a wordlist.',
    starterCode: '# Safe brute force simulation\n# In reality, this is illegal without permission!\n\ndef authenticate(password):\n    # Simulate checking against a stored hash\n    # Real password hash would be "secret123"\n    return password == "secret123"\n\n# Simple wordlist\nwordlist = ["password", "123456", "admin", "secret", "secret123", "letmein"]\n\ndef brute_force(wordlist):\n    # Try each password in the wordlist\n    attempts = 0\n    for word in wordlist:\n        attempts += 1\n        print(f"Trying: {word}")\n        if authenticate(word):\n            return word, attempts\n    return None, attempts\n\n# Run the simulation\nresult, attempts = brute_force(wordlist)\nif result:\n    print(f"Password found: {result} after {attempts} attempts")\nelse:\n    print(f"Password not found after {attempts} attempts")',
    solution: '# Safe brute force simulation\n# In reality, this is illegal without permission!\n\ndef authenticate(password):\n    # Simulate checking against a stored hash\n    # Real password hash would be "secret123"\n    return password == "secret123"\n\n# Simple wordlist\nwordlist = ["password", "123456", "admin", "secret", "secret123", "letmein"]\n\ndef brute_force(wordlist):\n    # Try each password in the wordlist\n    attempts = 0\n    for word in wordlist:\n        attempts += 1\n        print(f"Trying: {word}")\n        if authenticate(word):\n            return word, attempts\n    return None, attempts\n\n# Run the simulation\nresult, attempts = brute_force(wordlist)\nif result:\n    print(f"Password found: {result} after {attempts} attempts")\nelse:\n    print(f"Password not found after {attempts} attempts")',
    testCases: [
      { input: '', expected: 'Trying: password\nTrying: 123456\nTrying: admin\nTrying: secret\nTrying: secret123\nPassword found: secret123 after 5 attempts' }
    ],
    hints: [
      'Use a loop to try each word in the wordlist',
      'Count attempts for security awareness',
      'Return both the found password and attempt count',
      'This is for educational purposes only!'
    ],
    explanation: 'Understanding brute force attacks helps in creating secure authentication systems. This simulation demonstrates why strong passwords and rate limiting are important security measures.'
  },
  {
    id: 'ip-validator',
    title: 'IP Address Validator',
    description: 'Create a function to validate IPv4 addresses',
    difficulty: 'Beginner',
    category: 'Networking',
    task: 'Write a function that checks if a string is a valid IPv4 address format.',
    starterCode: 'def validate_ip(ip):\n    # Check if the string is a valid IPv4 address\n    # Should have 4 octets, each 0-255\n    pass\n\n# Test the function\nprint(validate_ip("192.168.1.1"))    # Should be True\nprint(validate_ip("256.1.1.1"))      # Should be False\nprint(validate_ip("192.168.1"))      # Should be False',
    solution: 'def validate_ip(ip):\n    # Split into octets\n    octets = ip.split(".")\n    \n    # Must have exactly 4 octets\n    if len(octets) != 4:\n        return False\n    \n    # Each octet must be a number between 0 and 255\n    for octet in octets:\n        if not octet.isdigit():\n            return False\n        num = int(octet)\n        if num < 0 or num > 255:\n            return False\n    \n    return True\n\nprint(validate_ip("192.168.1.1"))\nprint(validate_ip("256.1.1.1"))\nprint(validate_ip("192.168.1"))',
    testCases: [
      { input: '192.168.1.1', expected: 'True' },
      { input: '256.1.1.1', expected: 'False' },
      { input: '192.168.1', expected: 'False' },
      { input: '0.0.0.0', expected: 'True' }
    ],
    hints: [
      'Split the IP address by "." to get octets',
      'Check that there are exactly 4 octets',
      'Use isdigit() to check if each octet is numeric',
      'Convert to int and check range 0-255'
    ],
    explanation: 'IP address validation is crucial for network security. This function demonstrates parsing and validating network addresses.'
  },
  {
    id: 'base64-encoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Implement basic Base64 encoding and decoding',
    difficulty: 'Intermediate',
    category: 'Cryptography',
    task: 'Create functions to encode and decode text using Base64.',
    starterCode: 'import base64\n\ndef encode_base64(text):\n    # Encode text to Base64\n    pass\n\ndef decode_base64(encoded):\n    # Decode Base64 to text\n    pass\n\n# Test the functions\nmessage = "Hello Security"\nprint("Original:", message)\nprint("Encoded:", encode_base64(message))\nprint("Decoded:", decode_base64(encode_base64(message)))',
    solution: 'import base64\n\ndef encode_base64(text):\n    # Encode text to Base64\n    text_bytes = text.encode(\'utf-8\')\n    encoded_bytes = base64.b64encode(text_bytes)\n    return encoded_bytes.decode(\'utf-8\')\n\ndef decode_base64(encoded):\n    # Decode Base64 to text\n    encoded_bytes = encoded.encode(\'utf-8\')\n    decoded_bytes = base64.b64decode(encoded_bytes)\n    return decoded_bytes.decode(\'utf-8\')\n\n# Test the functions\nmessage = "Hello Security"\nprint("Original:", message)\nprint("Encoded:", encode_base64(message))\nprint("Decoded:", decode_base64(encode_base64(message)))',
    testCases: [
      { input: 'Hello', expected: 'Encoded: SGVsbG8=\nDecoded: Hello' }
    ],
    hints: [
      'Use base64 module from Python standard library',
      'Encode: convert string to bytes, then b64encode, then back to string',
      'Decode: convert string to bytes, then b64decode, then back to string',
      'Handle UTF-8 encoding properly'
    ],
    explanation: 'Base64 encoding is commonly used in web security for encoding binary data in text format, such as in authentication tokens.'
  },
  {
    id: 'log-filter',
    title: 'Log File Filter',
    description: 'Filter security log entries by severity or type',
    difficulty: 'Intermediate',
    category: 'Automation',
    task: 'Write a script that filters log entries based on keywords or severity levels.',
    starterCode: '# Sample log entries\nlogs = [\n    "INFO: User login successful",\n    "WARNING: Failed login attempt",\n    "ERROR: Database connection failed",\n    "INFO: File uploaded",\n    "CRITICAL: Unauthorized access detected"\n]\n\ndef filter_logs(logs, keyword):\n    # Filter logs containing the keyword\n    pass\n\n# Test the function\nprint("All CRITICAL logs:")\nfiltered = filter_logs(logs, "CRITICAL")\nfor log in filtered:\n    print(log)',
    solution: '# Sample log entries\nlogs = [\n    "INFO: User login successful",\n    "WARNING: Failed login attempt",\n    "ERROR: Database connection failed",\n    "INFO: File uploaded",\n    "CRITICAL: Unauthorized access detected"\n]\n\ndef filter_logs(logs, keyword):\n    # Filter logs containing the keyword\n    filtered = []\n    for log in logs:\n        if keyword.lower() in log.lower():\n            filtered.append(log)\n    return filtered\n\n# Test the function\nprint("All CRITICAL logs:")\nfiltered = filter_logs(logs, "CRITICAL")\nfor log in filtered:\n    print(log)',
    testCases: [
      { input: '', expected: 'All CRITICAL logs:\nCRITICAL: Unauthorized access detected' }
    ],
    hints: [
      'Use a loop to check each log entry',
      'Use string methods like lower() for case-insensitive search',
      'Return a list of matching logs',
      'Consider using list comprehensions for efficiency'
    ],
    explanation: 'Log filtering is essential for security monitoring. This demonstrates how to process and analyze security logs programmatically.'
  },
  {
    id: 'password-strength',
    title: 'Advanced Password Strength Checker',
    description: 'Create an advanced password strength evaluation function',
    difficulty: 'Intermediate',
    category: 'Security',
    task: 'Write a function that evaluates password strength based on multiple criteria and returns a score.',
    starterCode: 'def check_password_strength(password):\n    # Evaluate password strength\n    # Check length, character types, common patterns\n    score = 0\n    \n    # Length check\n    if len(password) >= 8:\n        score += 1\n    if len(password) >= 12:\n        score += 1\n    \n    # Character variety\n    if any(c.islower() for c in password):\n        score += 1\n    if any(c.isupper() for c in password):\n        score += 1\n    if any(c.isdigit() for c in password):\n        score += 1\n    if any(not c.isalnum() for c in password):\n        score += 1\n    \n    # Common passwords check\n    common_passwords = ["password", "123456", "admin"]\n    if password.lower() not in common_passwords:\n        score += 1\n    \n    return score\n\n# Test the function\nprint("Password strength for \'password123\':", check_password_strength("password123"))\nprint("Password strength for \'Str0ng!P@ss\':", check_password_strength("Str0ng!P@ss"))',
    solution: 'def check_password_strength(password):\n    # Evaluate password strength\n    # Check length, character types, common patterns\n    score = 0\n    \n    # Length check\n    if len(password) >= 8:\n        score += 1\n    if len(password) >= 12:\n        score += 1\n    \n    # Character variety\n    if any(c.islower() for c in password):\n        score += 1\n    if any(c.isupper() for c in password):\n        score += 1\n    if any(c.isdigit() for c in password):\n        score += 1\n    if any(not c.isalnum() for c in password):\n        score += 1\n    \n    # Common passwords check\n    common_passwords = ["password", "123456", "admin"]\n    if password.lower() not in common_passwords:\n        score += 1\n    \n    return score\n\n# Test the function\nprint("Password strength for \'password123\':", check_password_strength("password123"))\nprint("Password strength for \'Str0ng!P@ss\':", check_password_strength("Str0ng!P@ss"))',
    testCases: [
      { input: 'password123', expected: '5' },
      { input: 'Str0ng!P@ss', expected: '7' }
    ],
    hints: [
      'Use multiple criteria for scoring',
      'Check length, character types, and common passwords',
      'Use any() with generator expressions',
      'Return a numerical score'
    ],
    explanation: 'Password strength checking is vital for authentication security. This advanced checker evaluates multiple security criteria.'
  },
  {
    id: 'firewall-parser',
    title: 'Firewall Rule Parser',
    description: 'Parse and validate simple firewall rules',
    difficulty: 'Advanced',
    category: 'Networking',
    task: 'Create a function that parses firewall rules in a simple format and checks if traffic should be allowed.',
    starterCode: '# Simple firewall rule format: "ALLOW|DENY protocol port source_ip"\nrules = [\n    "ALLOW tcp 80 192.168.1.0/24",\n    "DENY tcp 22 0.0.0.0/0",\n    "ALLOW tcp 443 10.0.0.0/8"\n]\n\ndef parse_rule(rule):\n    # Parse a single rule into components\n    pass\n\ndef check_traffic(protocol, port, source_ip, rules):\n    # Check if traffic matches any rule\n    pass\n\n# Test the functions\nprint("TCP 80 from 192.168.1.1:", check_traffic("tcp", 80, "192.168.1.1", rules))\nprint("TCP 22 from 192.168.1.1:", check_traffic("tcp", 22, "192.168.1.1", rules))',
    solution: '# Simple firewall rule format: "ALLOW|DENY protocol port source_ip"\nrules = [\n    "ALLOW tcp 80 192.168.1.0/24",\n    "DENY tcp 22 0.0.0.0/0",\n    "ALLOW tcp 443 10.0.0.0/8"\n]\n\ndef parse_rule(rule):\n    # Parse a single rule into components\n    parts = rule.split()\n    if len(parts) != 4:\n        return None\n    action, protocol, port, source = parts\n    return {\n        "action": action,\n        "protocol": protocol,\n        "port": int(port),\n        "source": source\n    }\n\ndef check_traffic(protocol, port, source_ip, rules):\n    # Check if traffic matches any rule\n    for rule in rules:\n        parsed = parse_rule(rule)\n        if not parsed:\n            continue\n        \n        # Simple IP matching (just check if source starts with network)\n        network = parsed["source"].split("/")[0]\n        if (parsed["protocol"] == protocol and \n            parsed["port"] == port and \n            source_ip.startswith(network)):\n            return parsed["action"] == "ALLOW"\n    \n    return False  # Default deny\n\n# Test the functions\nprint("TCP 80 from 192.168.1.1:", check_traffic("tcp", 80, "192.168.1.1", rules))\nprint("TCP 22 from 192.168.1.1:", check_traffic("tcp", 22, "192.168.1.1", rules))',
    testCases: [
      { input: '', expected: 'TCP 80 from 192.168.1.1: True\nTCP 22 from 192.168.1.1: False' }
    ],
    hints: [
      'Split rules into components',
      'Use dictionaries to store parsed rules',
      'Implement simple IP matching logic',
      'Default to deny if no rule matches'
    ],
    explanation: 'Firewall rule parsing is fundamental to network security. This demonstrates how firewalls evaluate traffic against security policies.'
  },
  {
    id: 'sql-builder',
    title: 'Safe SQL Query Builder',
    description: 'Build parameterized SQL queries to prevent injection',
    difficulty: 'Intermediate',
    category: 'Database Security',
    task: 'Create a function that builds safe SQL SELECT queries with parameters.',
    starterCode: 'def build_safe_query(table, columns, conditions):\n    # Build a safe SQL query with parameters\n    # Use placeholders to prevent SQL injection\n    pass\n\n# Test the function\nquery, params = build_safe_query(\n    "users", \n    ["username", "email"], \n    {"status": "active", "role": "admin"}\n)\nprint("Query:", query)\nprint("Parameters:", params)',
    solution: 'def build_safe_query(table, columns, conditions):\n    # Build a safe SQL query with parameters\n    # Use placeholders to prevent SQL injection\n    \n    # Build SELECT clause\n    select_clause = "SELECT " + ", ".join(columns)\n    \n    # Build FROM clause\n    from_clause = f"FROM {table}"\n    \n    # Build WHERE clause with placeholders\n    if conditions:\n        where_parts = []\n        params = []\n        for key, value in conditions.items():\n            where_parts.append(f"{key} = ?")\n            params.append(value)\n        where_clause = "WHERE " + " AND ".join(where_parts)\n    else:\n        where_clause = ""\n        params = []\n    \n    # Combine clauses\n    query = f"{select_clause} {from_clause} {where_clause}".strip()\n    \n    return query, tuple(params)\n\n# Test the function\nquery, params = build_safe_query(\n    "users", \n    ["username", "email"], \n    {"status": "active", "role": "admin"}\n)\nprint("Query:", query)\nprint("Parameters:", params)',
    testCases: [
      { input: '', expected: 'Query: SELECT username, email FROM users WHERE status = ? AND role = ?\nParameters: (\'active\', \'admin\')' }
    ],
    hints: [
      'Use parameterized queries with ? placeholders',
      'Build query parts separately',
      'Return both query string and parameter tuple',
      'Join conditions with AND'
    ],
    explanation: 'SQL injection prevention is critical for database security. Parameterized queries ensure user input cannot alter query structure.'
  },
  {
    id: 'file-integrity',
    title: 'File Integrity Checker',
    description: 'Check file integrity using hash comparison',
    difficulty: 'Intermediate',
    category: 'Security',
    task: 'Create a function that calculates file hashes and compares them for integrity verification.',
    starterCode: 'import hashlib\n\ndef calculate_hash(file_content):\n    # Calculate SHA256 hash of file content\n    pass\n\ndef verify_integrity(file_content, expected_hash):\n    # Verify if file matches expected hash\n    pass\n\n# Test the functions\ncontent = "This is a test file content"\nexpected = calculate_hash(content)\nprint("Calculated hash:", expected)\nprint("Verification result:", verify_integrity(content, expected))\nprint("Verification with wrong hash:", verify_integrity(content, "wrong_hash"))',
    solution: 'import hashlib\n\ndef calculate_hash(file_content):\n    # Calculate SHA256 hash of file content\n    hash_obj = hashlib.sha256(file_content.encode(\'utf-8\'))\n    return hash_obj.hexdigest()\n\ndef verify_integrity(file_content, expected_hash):\n    # Verify if file matches expected hash\n    calculated = calculate_hash(file_content)\n    return calculated == expected_hash\n\n# Test the functions\ncontent = "This is a test file content"\nexpected = calculate_hash(content)\nprint("Calculated hash:", expected)\nprint("Verification result:", verify_integrity(content, expected))\nprint("Verification with wrong hash:", verify_integrity(content, "wrong_hash"))',
    testCases: [
      { input: 'This is a test file content', expected: 'Verification result: True\nVerification with wrong hash: False' }
    ],
    hints: [
      'Use hashlib.sha256() for hashing',
      'Encode string to bytes before hashing',
      'Use hexdigest() to get string representation',
      'Compare calculated hash with expected hash'
    ],
    explanation: 'File integrity checking prevents tampering and ensures data authenticity. Hash functions detect even small changes in files.'
  },
  {
    id: 'packet-analyzer',
    title: 'Simple Packet Analyzer',
    description: 'Parse and analyze simple network packet data',
    difficulty: 'Advanced',
    category: 'Networking',
    task: 'Create a function that parses simple packet data and extracts key information.',
    starterCode: '# Simple packet format: "timestamp protocol source_ip:port -> dest_ip:port length"\npackets = [\n    "2023-01-01 10:00:00 TCP 192.168.1.1:12345 -> 10.0.0.1:80 1024",\n    "2023-01-01 10:00:01 UDP 192.168.1.2:53 -> 8.8.8.8:53 64",\n    "2023-01-01 10:00:02 TCP 192.168.1.1:12346 -> 10.0.0.1:443 512"\n]\n\ndef parse_packet(packet):\n    # Parse packet into components\n    pass\n\ndef analyze_traffic(packets):\n    # Analyze packets and return summary\n    pass\n\n# Test the functions\nsummary = analyze_traffic(packets)\nprint("Traffic Summary:")\nfor key, value in summary.items():\n    print(f"{key}: {value}")',
    solution: '# Simple packet format: "timestamp protocol source_ip:port -> dest_ip:port length"\npackets = [\n    "2023-01-01 10:00:00 TCP 192.168.1.1:12345 -> 10.0.0.1:80 1024",\n    "2023-01-01 10:00:01 UDP 192.168.1.2:53 -> 8.8.8.8:53 64",\n    "2023-01-01 10:00:02 TCP 192.168.1.1:12346 -> 10.0.0.1:443 512"\n]\n\ndef parse_packet(packet):\n    # Parse packet into components\n    parts = packet.split()\n    if len(parts) != 6:\n        return None\n    \n    timestamp = parts[0] + " " + parts[1]\n    protocol = parts[2]\n    \n    # Parse source\n    source_part = parts[3].split(":")\n    source_ip = source_part[0]\n    source_port = int(source_part[1])\n    \n    # Parse destination\n    dest_part = parts[5].split(":")\n    dest_ip = dest_part[0]\n    dest_port = int(dest_part[1])\n    \n    length = int(parts[6])\n    \n    return {\n        "timestamp": timestamp,\n        "protocol": protocol,\n        "source_ip": source_ip,\n        "source_port": source_port,\n        "dest_ip": dest_ip,\n        "dest_port": dest_port,\n        "length": length\n    }\n\ndef analyze_traffic(packets):\n    # Analyze packets and return summary\n    summary = {"total_packets": 0, "total_bytes": 0, "protocols": {}}\n    \n    for packet in packets:\n        parsed = parse_packet(packet)\n        if parsed:\n            summary["total_packets"] += 1\n            summary["total_bytes"] += parsed["length"]\n            \n            proto = parsed["protocol"]\n            summary["protocols"][proto] = summary["protocols"].get(proto, 0) + 1\n    \n    return summary\n\n# Test the functions\nsummary = analyze_traffic(packets)\nprint("Traffic Summary:")\nfor key, value in summary.items():\n    print(f"{key}: {value}")',
    testCases: [
      { input: '', expected: 'Traffic Summary:\ntotal_packets: 3\ntotal_bytes: 1600\nprotocols: {\'TCP\': 2, \'UDP\': 1}' }
    ],
    hints: [
      'Split packet string into parts',
      'Parse IP:port combinations',
      'Use dictionaries to store packet data',
      'Aggregate statistics across packets'
    ],
    explanation: 'Packet analysis is essential for network security monitoring. This demonstrates parsing and analyzing network traffic data.'
  },
  {
    id: 'malware-scanner',
    title: 'Simple Malware Signature Scanner',
    description: 'Scan files for known malware signatures',
    difficulty: 'Advanced',
    category: 'Security',
    task: 'Create a simple malware scanner that checks files against known malicious patterns.',
    starterCode: '# Known malware signatures (simplified)\nsignatures = {\n    "trojan": "malicious_trojan_code",\n    "virus": "virus_signature_pattern",\n    "ransomware": "encrypt_files_ransom"\n}\n\ndef scan_file(file_content, signatures):\n    # Scan file content for malware signatures\n    pass\n\n# Test files\nfiles = {\n    "safe.txt": "This is a normal file",\n    "infected.exe": "Some code malicious_trojan_code more code",\n    "clean.doc": "Document content"\n}\n\n# Scan all files\nfor filename, content in files.items():\n    result = scan_file(content, signatures)\n    status = "CLEAN" if not result else f"INFECTED: {result}"\n    print(f"{filename}: {status}")',
    solution: '# Known malware signatures (simplified)\nsignatures = {\n    "trojan": "malicious_trojan_code",\n    "virus": "virus_signature_pattern",\n    "ransomware": "encrypt_files_ransom"\n}\n\ndef scan_file(file_content, signatures):\n    # Scan file content for malware signatures\n    for malware_type, signature in signatures.items():\n        if signature in file_content:\n            return malware_type\n    return None\n\n# Test files\nfiles = {\n    "safe.txt": "This is a normal file",\n    "infected.exe": "Some code malicious_trojan_code more code",\n    "clean.doc": "Document content"\n}\n\n# Scan all files\nfor filename, content in files.items():\n    result = scan_file(content, signatures)\n    status = "CLEAN" if not result else f"INFECTED: {result}"\n    print(f"{filename}: {status}")',
    testCases: [
      { input: '', expected: 'safe.txt: CLEAN\ninfected.exe: INFECTED: trojan\nclean.doc: CLEAN' }
    ],
    hints: [
      'Use string containment checks for signatures',
      'Return the type of malware found',
      'Scan multiple signatures',
      'Return None for clean files'
    ],
    explanation: 'Malware detection is crucial for cybersecurity. Signature-based scanning compares files against known malicious patterns.'
  },
  {
    id: 'password-generator',
    title: 'Secure Password Generator',
    description: 'Generate strong, random passwords',
    difficulty: 'Beginner',
    category: 'Security',
    task: 'Create a function that generates secure random passwords with specified criteria.',
    starterCode: 'import random\nimport string\n\ndef generate_password(length=12):\n    # Generate a secure random password\n    # Include uppercase, lowercase, digits, and symbols\n    pass\n\n# Test the function\nprint("Generated password:", generate_password())\nprint("Length 8 password:", generate_password(8))',
    solution: 'import random\nimport string\n\ndef generate_password(length=12):\n    # Generate a secure random password\n    # Include uppercase, lowercase, digits, and symbols\n    \n    # Define character sets\n    lowercase = string.ascii_lowercase\n    uppercase = string.ascii_uppercase\n    digits = string.digits\n    symbols = string.punctuation\n    \n    # Ensure at least one of each type\n    password = [\n        random.choice(lowercase),\n        random.choice(uppercase),\n        random.choice(digits),\n        random.choice(symbols)\n    ]\n    \n    # Fill the rest randomly\n    all_chars = lowercase + uppercase + digits + symbols\n    for _ in range(length - 4):\n        password.append(random.choice(all_chars))\n    \n    # Shuffle the password\n    random.shuffle(password)\n    \n    return "".join(password)\n\n# Test the function\nprint("Generated password:", generate_password())\nprint("Length 8 password:", generate_password(8))',
    testCases: [
      { input: '', expected: 'Generated password: (random 12-char password)\nLength 8 password: (random 8-char password)' }
    ],
    hints: [
      'Use random.choice() for character selection',
      'Include all character types for strength',
      'Shuffle the final password',
      'Use string module constants'
    ],
    explanation: 'Strong password generation is essential for security. Random passwords with multiple character types are harder to crack.'
  }
]

export default function ProgrammingBasicsLab() {
  const [activeTab, setActiveTab] = useState('challenges')
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0])
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setUserCode(selectedChallenge.starterCode)
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge])

  // Load completed challenges from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('programmingBasicsCompletedChallenges')
    if (saved) {
      try {
        setCompletedChallenges(new Set(JSON.parse(saved)))
      } catch (error) {
        console.error('Error loading completed challenges:', error)
      }
    }
  }, [])

  // Save completed challenges to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('programmingBasicsCompletedChallenges', JSON.stringify([...completedChallenges]))
  }, [completedChallenges])

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')

    try {
      // Simulate code execution (in a real implementation, this would run Python code)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simple validation for demo purposes
      let simulatedOutput = ''

      if (selectedChallenge.id === 'hello-world') {
        if (userCode.includes('print("Hello, Cybersecurity!")')) {
          simulatedOutput = 'Hello, Cybersecurity!'
        }
      } else if (selectedChallenge.id === 'variables') {
        if (userCode.includes('tool_name = "Wireshark"') && userCode.includes('print(f"Tool:')) {
          simulatedOutput = 'Tool: Wireshark\nVersion: 4.0\nOpen Source: True'
        }
      } else if (selectedChallenge.id === 'password-checker') {
        if (userCode.includes('def check_password') && userCode.includes('len(password)')) {
          simulatedOutput = 'True\nFalse'
        }
      } else if (selectedChallenge.id === 'file-analyzer') {
        if (userCode.includes('for log in logs') && userCode.includes('Login failed')) {
          simulatedOutput = 'Failed login attempts per IP:\n192.168.1.1: 1\n192.168.1.2: 3'
        }
      } else if (selectedChallenge.id === 'encryption-basic') {
        if (userCode.includes('def caesar_encrypt') && userCode.includes('ord(')) {
          simulatedOutput = 'Original: HELLO SECURITY\nEncrypted: KHOOR VHFZULWB\nDecrypted: HELLO SECURITY'
        }
      } else if (selectedChallenge.id === 'network-scanner') {
        if (userCode.includes('for port, service in common_ports.items()')) {
          simulatedOutput = 'Port Scan Results:\nPort 80 (HTTP): OPEN\nPort 443 (HTTPS): OPEN\nPort 22 (SSH): OPEN\nPort 21 (FTP): CLOSED\nPort 25 (SMTP): CLOSED'
        }
      } else if (selectedChallenge.id === 'email-validator') {
        if (userCode.includes('def validate_email') && userCode.includes('split("@")')) {
          simulatedOutput = 'True\nFalse\nFalse'
        }
      } else if (selectedChallenge.id === 'simple-hash') {
        if (userCode.includes('def simple_hash') && userCode.includes('ord(')) {
          simulatedOutput = '532\n849\n532'
        }
      } else if (selectedChallenge.id === 'config-parser') {
        if (userCode.includes('def parse_config') && userCode.includes('split("="')) {
          simulatedOutput = 'Configuration loaded:\nmax_login_attempts: 3\nsession_timeout: 3600\nenable_logging: true\nadmin_email: admin@example.com'
        }
      } else if (selectedChallenge.id === 'access-control') {
        if (userCode.includes('def check_permission') && userCode.includes('users[username]')) {
          simulatedOutput = 'True\nFalse\nFalse'
        }
      } else if (selectedChallenge.id === 'url-parser') {
        if (userCode.includes('def parse_url') && userCode.includes('split("://")')) {
          simulatedOutput = 'URL: https://example.com/path/to/resource\nProtocol: https\nDomain: example.com\nPath: /path/to/resource\n---\nURL: http://test.com/page\nProtocol: http\nDomain: test.com\nPath: /page\n---\nURL: ftp://files.example.org/download.zip\nProtocol: ftp\nDomain: files.example.org\nPath: /download.zip\n---'
        }
      } else if (selectedChallenge.id === 'brute-force-sim') {
        if (userCode.includes('def brute_force') && userCode.includes('for word in wordlist')) {
          simulatedOutput = 'Trying: password\nTrying: 123456\nTrying: admin\nTrying: secret\nTrying: secret123\nPassword found: secret123 after 5 attempts'
        }
      } else if (selectedChallenge.id === 'password-generator') {
        if (userCode.includes('def generate_password') && userCode.includes('random.choice')) {
          simulatedOutput = 'Generated password: Xy9$Kp2Lm8Qr\nLength 8 password: Ab3!Fg9H'
        }
      }

      if (simulatedOutput) {
        setOutput(simulatedOutput)
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      } else {
        setOutput('Code executed but no output captured. Check your implementation.')
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-blue-500 rounded-lg self-start">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Programming Basics Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Learn Python programming through cybersecurity-focused challenges</p>
            </div>
          </div>
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Master Python fundamentals with hands-on security challenges. Each exercise builds practical skills for cybersecurity automation and analysis.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="challenges" className="text-xs sm:text-sm">Challenges</TabsTrigger>
            <TabsTrigger value="progress" className="text-xs sm:text-sm">Progress</TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Challenge List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Challenges</span>
                  </CardTitle>
                  <CardDescription>
                    Select a programming challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChallenge.id === challenge.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-slate-50'
                      } ${completedChallenges.has(challenge.id) ? 'border-green-200' : 'border-slate-200'} border`}
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        {completedChallenges.has(challenge.id) && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs`}>
                        {challenge.difficulty}
                      </Badge>
                      <p className="text-xs text-slate-600 mt-1">{challenge.category}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Challenge Details and Code Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>{selectedChallenge.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                          {selectedChallenge.difficulty}
                        </Badge>
                        <span className="text-sm text-slate-600">{selectedChallenge.category}</span>
                      </div>
                    </div>
                    {completedChallenges.has(selectedChallenge.id) && (
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <CardDescription>{selectedChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Task:</h4>
                    <p className="text-sm text-slate-700">{selectedChallenge.task}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Code Editor:</h4>
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your Python code here..."
                      className="font-mono text-sm h-64"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={runCode}
                      disabled={isRunning}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowHints(!showHints)}
                    >
                      💡 Hints
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      👁️ Solution
                    </Button>
                  </div>

                  {showHints && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Hints:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedChallenge.hints.map((hint, index) => (
                          <li key={index} className="text-sm">{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {showSolution && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Solution:</h4>
                      <Code className="block text-sm">{selectedChallenge.solution}</Code>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Output:</h4>
                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-24">
                      {output || 'Run your code to see output here...'}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-sm text-slate-700">{selectedChallenge.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Progress Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {completedChallenges.size}/{challenges.length}
                    </div>
                    <p className="text-sm text-slate-600">Challenges Completed</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Skills Learned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Python Fundamentals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Data Structures & Algorithms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Cryptography Basics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Network Security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Web Security Concepts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Security Automation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Access Control & Authorization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Learn file I/O operations</p>
                    <p>• Explore Python libraries (requests, scapy)</p>
                    <p>• Practice with real security tools</p>
                    <p>• Build automation scripts</p>
                    <p>• Study advanced Python concepts</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
