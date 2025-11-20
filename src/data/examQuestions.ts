export interface ExamQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

export const examQuestions: Record<string, ExamQuestion[]> = {
  programming: [
    {
      id: 'prog-1',
      question: 'What is the correct way to print "Hello, World!" in Python?',
      options: ['print("Hello, World!")', 'console.log("Hello, World!")', 'echo "Hello, World!"', 'printf("Hello, World!")'],
      correctAnswer: 0,
      explanation: 'In Python, the print() function is used to output text to the console.',
      category: 'Basics'
    },
    {
      id: 'prog-2',
      question: 'Which data type is used to store a sequence of characters in Python?',
      options: ['int', 'float', 'string', 'boolean'],
      correctAnswer: 2,
      explanation: 'Strings are used to store text data in Python.',
      category: 'Basics'
    },
    {
      id: 'prog-3',
      question: 'What does the len() function return?',
      options: ['The last element', 'The length of a sequence', 'The sum of elements', 'The type of variable'],
      correctAnswer: 1,
      explanation: 'len() returns the number of items in a sequence.',
      category: 'Basics'
    },
    {
      id: 'prog-4',
      question: 'Which operator is used for equality comparison in Python?',
      options: ['=', '==', '===', '!='],
      correctAnswer: 1,
      explanation: '== is the equality operator in Python.',
      category: 'Basics'
    },
    {
      id: 'prog-5',
      question: 'What is a variable in programming?',
      options: ['A fixed value', 'A container for storing data', 'A type of loop', 'A function'],
      correctAnswer: 1,
      explanation: 'Variables are containers that hold data values.',
      category: 'Basics'
    },
    {
      id: 'prog-6',
      question: 'Which of the following is NOT a valid Python data type?',
      options: ['int', 'str', 'char', 'bool'],
      correctAnswer: 2,
      explanation: 'Python does not have a char type; strings are used for characters.',
      category: 'Basics'
    },
    {
      id: 'prog-7',
      question: 'What does the if statement do?',
      options: ['Repeats code', 'Makes decisions', 'Defines functions', 'Imports modules'],
      correctAnswer: 1,
      explanation: 'if statements allow conditional execution of code.',
      category: 'Control Flow'
    },
    {
      id: 'prog-8',
      question: 'Which loop is used when you know the number of iterations?',
      options: ['while', 'for', 'if', 'switch'],
      correctAnswer: 1,
      explanation: 'for loops are typically used when the number of iterations is known.',
      category: 'Control Flow'
    },
    {
      id: 'prog-9',
      question: 'What is a function in Python?',
      options: ['A variable', 'A block of reusable code', 'A data type', 'An operator'],
      correctAnswer: 1,
      explanation: 'Functions are blocks of code that can be called repeatedly.',
      category: 'Functions'
    },
    {
      id: 'prog-10',
      question: 'Which keyword is used to define a function?',
      options: ['func', 'def', 'function', 'define'],
      correctAnswer: 1,
      explanation: 'def is used to define functions in Python.',
      category: 'Functions'
    },
    {
      id: 'prog-11',
      question: 'What is the purpose of the return statement?',
      options: ['To print output', 'To exit a function and return a value', 'To define a variable', 'To import modules'],
      correctAnswer: 1,
      explanation: 'return sends a value back from a function.',
      category: 'Functions'
    },
    {
      id: 'prog-12',
      question: 'Which data structure is ordered and mutable?',
      options: ['tuple', 'list', 'set', 'dictionary'],
      correctAnswer: 1,
      explanation: 'Lists are ordered and mutable sequences.',
      category: 'Data Structures'
    },
    {
      id: 'prog-13',
      question: 'What does mutable mean?',
      options: ['Cannot be changed', 'Can be changed after creation', 'Only stores numbers', 'Only stores strings'],
      correctAnswer: 1,
      explanation: 'Mutable objects can be modified after creation.',
      category: 'Data Structures'
    },
    {
      id: 'prog-14',
      question: 'Which method adds an item to the end of a list?',
      options: ['insert()', 'append()', 'extend()', 'add()'],
      correctAnswer: 1,
      explanation: 'append() adds an item to the end of a list.',
      category: 'Data Structures'
    },
    {
      id: 'prog-15',
      question: 'What is the index of the first element in a Python list?',
      options: ['1', '0', '-1', 'n'],
      correctAnswer: 1,
      explanation: 'Python uses 0-based indexing.',
      category: 'Data Structures'
    }
  ],
  linux: [
    {
      id: 'linux-1',
      question: 'What command is used to list files in a directory?',
      options: ['ls', 'dir', 'list', 'show'],
      correctAnswer: 0,
      explanation: 'ls lists the contents of a directory.',
      category: 'File System'
    },
    {
      id: 'linux-2',
      question: 'Which command changes the current directory?',
      options: ['cd', 'pwd', 'ls', 'mkdir'],
      correctAnswer: 0,
      explanation: 'cd changes the current working directory.',
      category: 'File System'
    },
    {
      id: 'linux-3',
      question: 'What does the pwd command do?',
      options: ['Print working directory', 'Change directory', 'List files', 'Create directory'],
      correctAnswer: 0,
      explanation: 'pwd prints the current working directory.',
      category: 'File System'
    },
    {
      id: 'linux-4',
      question: 'Which command creates a new directory?',
      options: ['touch', 'mkdir', 'cp', 'mv'],
      correctAnswer: 1,
      explanation: 'mkdir creates new directories.',
      category: 'File System'
    },
    {
      id: 'linux-5',
      question: 'What command copies files?',
      options: ['mv', 'cp', 'rm', 'ln'],
      correctAnswer: 1,
      explanation: 'cp copies files and directories.',
      category: 'File System'
    },
    {
      id: 'linux-6',
      question: 'Which command moves or renames files?',
      options: ['cp', 'mv', 'rm', 'ln'],
      correctAnswer: 1,
      explanation: 'mv moves or renames files.',
      category: 'File System'
    },
    {
      id: 'linux-7',
      question: 'What does the rm command do?',
      options: ['Remove files', 'Rename files', 'Copy files', 'List files'],
      correctAnswer: 0,
      explanation: 'rm removes files and directories.',
      category: 'File System'
    },
    {
      id: 'linux-8',
      question: 'Which command shows the contents of a file?',
      options: ['cat', 'less', 'head', 'tail'],
      correctAnswer: 0,
      explanation: 'cat displays file contents.',
      category: 'File Operations'
    },
    {
      id: 'linux-9',
      question: 'What command shows the first 10 lines of a file?',
      options: ['tail', 'cat', 'head', 'grep'],
      correctAnswer: 2,
      explanation: 'head shows the beginning of a file.',
      category: 'File Operations'
    },
    {
      id: 'linux-10',
      question: 'Which command searches for text in files?',
      options: ['find', 'grep', 'locate', 'which'],
      correctAnswer: 1,
      explanation: 'grep searches for patterns in files.',
      category: 'File Operations'
    },
    {
      id: 'linux-11',
      question: 'What does the chmod command do?',
      options: ['Change owner', 'Change permissions', 'Change group', 'Change name'],
      correctAnswer: 1,
      explanation: 'chmod changes file permissions.',
      category: 'Permissions'
    },
    {
      id: 'linux-12',
      question: 'Which command changes file ownership?',
      options: ['chmod', 'chown', 'chgrp', 'passwd'],
      correctAnswer: 1,
      explanation: 'chown changes file owner and group.',
      category: 'Permissions'
    },
    {
      id: 'linux-13',
      question: 'What does the ps command show?',
      options: ['Processes', 'Users', 'Files', 'Directories'],
      correctAnswer: 0,
      explanation: 'ps displays information about processes.',
      category: 'Processes'
    },
    {
      id: 'linux-14',
      question: 'Which command kills a process?',
      options: ['stop', 'end', 'kill', 'terminate'],
      correctAnswer: 2,
      explanation: 'kill sends signals to processes.',
      category: 'Processes'
    },
    {
      id: 'linux-15',
      question: 'What does the top command do?',
      options: ['Show system uptime', 'Display process information', 'Show disk usage', 'Show memory usage'],
      correctAnswer: 1,
      explanation: 'top shows real-time process information.',
      category: 'Processes'
    }
  ],
  networking: [
    {
      id: 'net-1',
      question: 'What does TCP stand for?',
      options: ['Transmission Control Protocol', 'Transfer Control Protocol', 'Transport Communication Protocol', 'Terminal Control Protocol'],
      correctAnswer: 0,
      explanation: 'TCP stands for Transmission Control Protocol.',
      category: 'Protocols'
    },
    {
      id: 'net-2',
      question: 'Which protocol is used for sending emails?',
      options: ['HTTP', 'FTP', 'SMTP', 'DNS'],
      correctAnswer: 2,
      explanation: 'SMTP is used for sending emails.',
      category: 'Protocols'
    },
    {
      id: 'net-3',
      question: 'What is the purpose of DNS?',
      options: ['Encrypt data', 'Resolve domain names to IP addresses', 'Route packets', 'Secure connections'],
      correctAnswer: 1,
      explanation: 'DNS translates domain names to IP addresses.',
      category: 'Protocols'
    },
    {
      id: 'net-4',
      question: 'Which layer of the OSI model handles physical transmission?',
      options: ['Application', 'Network', 'Data Link', 'Physical'],
      correctAnswer: 3,
      explanation: 'The Physical layer handles physical transmission.',
      category: 'OSI Model'
    },
    {
      id: 'net-5',
      question: 'What is the standard port for HTTP?',
      options: ['21', '22', '80', '443'],
      correctAnswer: 2,
      explanation: 'HTTP uses port 80 by default.',
      category: 'Ports'
    },
    {
      id: 'net-6',
      question: 'Which protocol provides secure web browsing?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correctAnswer: 1,
      explanation: 'HTTPS provides encrypted web communication.',
      category: 'Security'
    },
    {
      id: 'net-7',
      question: 'What is a subnet mask used for?',
      options: ['Encryption', 'Dividing networks', 'Routing', 'Authentication'],
      correctAnswer: 1,
      explanation: 'Subnet masks divide IP networks into subnetworks.',
      category: 'IP Addressing'
    },
    {
      id: 'net-8',
      question: 'Which command shows network interfaces?',
      options: ['ifconfig', 'ipconfig', 'netstat', 'ping'],
      correctAnswer: 0,
      explanation: 'ifconfig displays network interface information.',
      category: 'Tools'
    },
    {
      id: 'net-9',
      question: 'What does the ping command test?',
      options: ['DNS resolution', 'Connectivity', 'Port availability', 'Bandwidth'],
      correctAnswer: 1,
      explanation: 'ping tests network connectivity.',
      category: 'Tools'
    },
    {
      id: 'net-10',
      question: 'Which protocol is connectionless?',
      options: ['TCP', 'UDP', 'HTTP', 'FTP'],
      correctAnswer: 1,
      explanation: 'UDP is a connectionless protocol.',
      category: 'Protocols'
    },
    {
      id: 'net-11',
      question: 'What is ARP used for?',
      options: ['IP to MAC address resolution', 'Domain name resolution', 'Routing', 'Encryption'],
      correctAnswer: 0,
      explanation: 'ARP resolves IP addresses to MAC addresses.',
      category: 'Protocols'
    },
    {
      id: 'net-12',
      question: 'Which tool captures network packets?',
      options: ['ping', 'traceroute', 'Wireshark', 'nmap'],
      correctAnswer: 2,
      explanation: 'Wireshark is a packet analyzer.',
      category: 'Tools'
    },
    {
      id: 'net-13',
      question: 'What is a firewall used for?',
      options: ['Speed up network', 'Filter network traffic', 'Resolve DNS', 'Assign IP addresses'],
      correctAnswer: 1,
      explanation: 'Firewalls filter incoming and outgoing traffic.',
      category: 'Security'
    },
    {
      id: 'net-14',
      question: 'Which command shows routing table?',
      options: ['route', 'netstat -r', 'ifconfig', 'arp -a'],
      correctAnswer: 1,
      explanation: 'netstat -r displays the routing table.',
      category: 'Tools'
    },
    {
      id: 'net-15',
      question: 'What is NAT?',
      options: ['Network Address Translation', 'Network Access Token', 'Network Authentication Type', 'Network Application Transport'],
      correctAnswer: 0,
      explanation: 'NAT translates IP addresses between networks.',
      category: 'Networking'
    }
  ],
  cryptography: [
    {
      id: 'crypto-1',
      question: 'What is encryption?',
      options: ['Converting data to code', 'Storing data', 'Deleting data', 'Copying data'],
      correctAnswer: 0,
      explanation: 'Encryption converts plaintext to ciphertext.',
      category: 'Basics'
    },
    {
      id: 'crypto-2',
      question: 'Which algorithm is symmetric?',
      options: ['RSA', 'AES', 'ECC', 'DSA'],
      correctAnswer: 1,
      explanation: 'AES is a symmetric encryption algorithm.',
      category: 'Algorithms'
    },
    {
      id: 'crypto-3',
      question: 'What does RSA stand for?',
      options: ['Really Simple Algorithm', 'Rivest-Shamir-Adleman', 'Random Secure Algorithm', 'Robust Security Algorithm'],
      correctAnswer: 1,
      explanation: 'RSA is named after its inventors.',
      category: 'Algorithms'
    },
    {
      id: 'crypto-4',
      question: 'What is a hash function?',
      options: ['Encryption algorithm', 'One-way function', 'Key exchange', 'Digital signature'],
      correctAnswer: 1,
      explanation: 'Hash functions produce fixed-size output from input.',
      category: 'Hashing'
    },
    {
      id: 'crypto-5',
      question: 'Which is NOT a hash function?',
      options: ['SHA-256', 'MD5', 'AES', 'SHA-1'],
      correctAnswer: 2,
      explanation: 'AES is an encryption algorithm, not a hash.',
      category: 'Hashing'
    },
    {
      id: 'crypto-6',
      question: 'What is a digital signature used for?',
      options: ['Encryption', 'Authentication and integrity', 'Compression', 'Storage'],
      correctAnswer: 1,
      explanation: 'Digital signatures verify authenticity and integrity.',
      category: 'Digital Signatures'
    },
    {
      id: 'crypto-7',
      question: 'What is a man-in-the-middle attack?',
      options: ['Physical theft', 'Intercepting communication', 'Brute force', 'Social engineering'],
      correctAnswer: 1,
      explanation: 'MITM involves intercepting communication between parties.',
      category: 'Attacks'
    },
    {
      id: 'crypto-8',
      question: 'Which provides forward secrecy?',
      options: ['RSA', 'Diffie-Hellman', 'AES', 'MD5'],
      correctAnswer: 1,
      explanation: 'Diffie-Hellman provides perfect forward secrecy.',
      category: 'Key Exchange'
    },
    {
      id: 'crypto-9',
      question: 'What is a certificate authority?',
      options: ['Encryption tool', 'Trusted third party', 'Hash function', 'Key generator'],
      correctAnswer: 1,
      explanation: 'CA issues and verifies digital certificates.',
      category: 'PKI'
    },
    {
      id: 'crypto-10',
      question: 'Which is a block cipher?',
      options: ['RC4', 'AES', 'ChaCha20', 'RSA'],
      correctAnswer: 1,
      explanation: 'AES is a block cipher.',
      category: 'Ciphers'
    },
    {
      id: 'crypto-11',
      question: 'What is salting in password hashing?',
      options: ['Adding random data', 'Using multiple hashes', 'Encrypting twice', 'Compressing data'],
      correctAnswer: 0,
      explanation: 'Salt adds random data to prevent rainbow table attacks.',
      category: 'Password Security'
    },
    {
      id: 'crypto-12',
      question: 'Which attack uses precomputed hashes?',
      options: ['Brute force', 'Rainbow table', 'Dictionary', 'Social engineering'],
      correctAnswer: 1,
      explanation: 'Rainbow tables use precomputed hash chains.',
      category: 'Attacks'
    },
    {
      id: 'crypto-13',
      question: 'What is a nonce?',
      options: ['Encryption key', 'Random number used once', 'Hash function', 'Certificate'],
      correctAnswer: 1,
      explanation: 'Nonce is a number used only once.',
      category: 'Cryptography'
    },
    {
      id: 'crypto-14',
      question: 'Which provides confidentiality?',
      options: ['Hashing', 'Encryption', 'Digital signatures', 'Certificates'],
      correctAnswer: 1,
      explanation: 'Encryption provides confidentiality.',
      category: 'Security Properties'
    },
    {
      id: 'crypto-15',
      question: 'What is key derivation?',
      options: ['Generating keys from passwords', 'Exchanging keys', 'Storing keys', 'Destroying keys'],
      correctAnswer: 0,
      explanation: 'Key derivation functions generate keys from passwords.',
      category: 'Key Management'
    }
  ],
  websecurity: [
    {
      id: 'web-1',
      question: 'What is XSS?',
      options: ['Cross-Site Scripting', 'Cross-Site Request', 'Cross-Site Security', 'Cross-Site Storage'],
      correctAnswer: 0,
      explanation: 'XSS is Cross-Site Scripting.',
      category: 'XSS'
    },
    {
      id: 'web-2',
      question: 'Which prevents SQL injection?',
      options: ['Encryption', 'Prepared statements', 'Hashing', 'Compression'],
      correctAnswer: 1,
      explanation: 'Prepared statements prevent SQL injection.',
      category: 'SQL Injection'
    },
    {
      id: 'web-3',
      question: 'What is CSRF?',
      options: ['Cross-Site Request Forgery', 'Cross-Site Script Forgery', 'Cross-Site Security Forgery', 'Cross-Site Request Security'],
      correctAnswer: 0,
      explanation: 'CSRF is Cross-Site Request Forgery.',
      category: 'CSRF'
    },
    {
      id: 'web-4',
      question: 'Which header prevents clickjacking?',
      options: ['X-Frame-Options', 'Content-Security-Policy', 'X-Content-Type-Options', 'Strict-Transport-Security'],
      correctAnswer: 0,
      explanation: 'X-Frame-Options prevents clickjacking.',
      category: 'Clickjacking'
    },
    {
      id: 'web-5',
      question: 'What is CORS?',
      options: ['Cross-Origin Resource Sharing', 'Cross-Origin Request Sharing', 'Cross-Origin Resource Security', 'Cross-Origin Request Security'],
      correctAnswer: 0,
      explanation: 'CORS allows cross-origin requests.',
      category: 'CORS'
    },
    {
      id: 'web-6',
      question: 'Which attack involves file uploads?',
      options: ['Directory traversal', 'Remote code execution', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'File uploads can lead to various attacks.',
      category: 'File Upload'
    },
    {
      id: 'web-7',
      question: 'What does JWT stand for?',
      options: ['JavaScript Web Token', 'JSON Web Token', 'Java Web Token', 'JSON Web Transfer'],
      correctAnswer: 1,
      explanation: 'JWT is JSON Web Token.',
      category: 'JWT'
    },
    {
      id: 'web-8',
      question: 'Which prevents XSS?',
      options: ['Input validation', 'Output encoding', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both input validation and output encoding prevent XSS.',
      category: 'XSS'
    },
    {
      id: 'web-9',
      question: 'What is a rate limiting bypass?',
      options: ['IP spoofing', 'Header manipulation', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Rate limiting can be bypassed through various techniques.',
      category: 'API Security'
    },
    {
      id: 'web-10',
      question: 'What is browser fingerprinting?',
      options: ['Tracking users', 'Identifying browsers', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Browser fingerprinting tracks and identifies users.',
      category: 'Browser Security'
    },
    {
      id: 'web-11',
      question: 'What is web cache poisoning?',
      options: ['Poisoning cache with malicious content', 'Clearing cache', 'Compressing cache', 'Encrypting cache'],
      correctAnswer: 0,
      explanation: 'Cache poisoning injects malicious content into cache.',
      category: 'Cache Poisoning'
    },
    {
      id: 'web-12',
      question: 'What is DOM-based XSS?',
      options: ['Server-side XSS', 'Client-side XSS', 'Database XSS', 'Network XSS'],
      correctAnswer: 1,
      explanation: 'DOM-based XSS occurs in the browser.',
      category: 'XSS'
    },
    {
      id: 'web-13',
      question: 'Which prevents CSRF?',
      options: ['CSRF tokens', 'SameSite cookies', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both CSRF tokens and SameSite cookies prevent CSRF.',
      category: 'CSRF'
    },
    {
      id: 'web-14',
      question: 'What is HTML injection?',
      options: ['Injecting HTML code', 'Injecting SQL code', 'Injecting JavaScript', 'Injecting CSS'],
      correctAnswer: 0,
      explanation: 'HTML injection inserts malicious HTML.',
      category: 'Injection'
    },
    {
      id: 'web-15',
      question: 'What is phishing simulation?',
      options: ['Testing user awareness', 'Real phishing', 'Both', 'Neither'],
      correctAnswer: 0,
      explanation: 'Phishing simulation tests security awareness.',
      category: 'Phishing'
    }
  ]
}

export const getExamConfig = (category: string) => {
  const configs: Record<string, { title: string; description: string; timeLimit: number; passingScore: number }> = {
    programming: {
      title: 'Programming Basics',
      description: 'Test your knowledge of Python programming fundamentals and cybersecurity applications.',
      timeLimit: 30,
      passingScore: 70
    },
    linux: {
      title: 'Linux Basics',
      description: 'Demonstrate your understanding of Linux commands and system administration.',
      timeLimit: 25,
      passingScore: 70
    },
    networking: {
      title: 'Networking Basics',
      description: 'Prove your knowledge of network protocols, tools, and security concepts.',
      timeLimit: 35,
      passingScore: 70
    },
    cryptography: {
      title: 'Cryptography',
      description: 'Show your expertise in encryption, hashing, and cryptographic security.',
      timeLimit: 30,
      passingScore: 75
    },
    websecurity: {
      title: 'Web Security',
      description: 'Test your understanding of web vulnerabilities and security measures.',
      timeLimit: 30,
      passingScore: 70
    }
  }
  return configs[category] || configs.programming
}
