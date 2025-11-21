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
    },
    {
      id: 'prog-16',
      question: 'Which method removes the last element from a list?',
      options: ['remove()', 'pop()', 'delete()', 'clear()'],
      correctAnswer: 1,
      explanation: 'pop() removes and returns the last element.',
      category: 'Data Structures'
    },
    {
      id: 'prog-17',
      question: 'What is a tuple in Python?',
      options: ['Mutable sequence', 'Immutable sequence', 'Dictionary', 'Set'],
      correctAnswer: 1,
      explanation: 'Tuples are immutable sequences.',
      category: 'Data Structures'
    },
    {
      id: 'prog-18',
      question: 'Which data structure uses key-value pairs?',
      options: ['List', 'Tuple', 'Dictionary', 'Set'],
      correctAnswer: 2,
      explanation: 'Dictionaries store key-value pairs.',
      category: 'Data Structures'
    },
    {
      id: 'prog-19',
      question: 'What does the range() function return?',
      options: ['A list', 'An iterator', 'A tuple', 'A set'],
      correctAnswer: 1,
      explanation: 'range() returns an iterator in Python 3.',
      category: 'Control Flow'
    },
    {
      id: 'prog-20',
      question: 'Which keyword is used for exception handling?',
      options: ['try', 'catch', 'except', 'error'],
      correctAnswer: 2,
      explanation: 'except handles exceptions in Python.',
      category: 'Error Handling'
    },
    {
      id: 'prog-21',
      question: 'What is the purpose of the else clause in a loop?',
      options: ['Execute if loop fails', 'Execute after loop completes', 'Execute on error', 'Execute before loop'],
      correctAnswer: 1,
      explanation: 'else executes when loop completes normally.',
      category: 'Control Flow'
    },
    {
      id: 'prog-22',
      question: 'Which operator is used for floor division?',
      options: ['/', '//', '%', '**'],
      correctAnswer: 1,
      explanation: '// performs floor division.',
      category: 'Operators'
    },
    {
      id: 'prog-23',
      question: 'What is a module in Python?',
      options: ['A function', 'A file containing code', 'A variable', 'A class'],
      correctAnswer: 1,
      explanation: 'Modules are files containing Python code.',
      category: 'Modules'
    },
    {
      id: 'prog-24',
      question: 'Which keyword imports modules?',
      options: ['include', 'import', 'require', 'load'],
      correctAnswer: 1,
      explanation: 'import loads modules.',
      category: 'Modules'
    },
    {
      id: 'prog-25',
      question: 'What is inheritance in OOP?',
      options: ['Creating objects', 'Reusing code from parent class', 'Defining methods', 'Storing data'],
      correctAnswer: 1,
      explanation: 'Inheritance allows code reuse from parent classes.',
      category: 'OOP'
    },
    {
      id: 'prog-26',
      question: 'Which method is called when an object is created?',
      options: ['__init__', '__new__', '__create__', '__start__'],
      correctAnswer: 0,
      explanation: '__init__ is the constructor method.',
      category: 'OOP'
    },
    {
      id: 'prog-27',
      question: 'What is encapsulation?',
      options: ['Hiding data', 'Sharing data', 'Copying data', 'Deleting data'],
      correctAnswer: 0,
      explanation: 'Encapsulation hides internal data.',
      category: 'OOP'
    },
    {
      id: 'prog-28',
      question: 'Which is NOT a Python built-in type?',
      options: ['int', 'str', 'char', 'bool'],
      correctAnswer: 2,
      explanation: 'Python does not have char type.',
      category: 'Data Types'
    },
    {
      id: 'prog-29',
      question: 'What does the pass statement do?',
      options: ['Stops execution', 'Does nothing', 'Continues loop', 'Returns value'],
      correctAnswer: 1,
      explanation: 'pass is a null operation.',
      category: 'Control Flow'
    },
    {
      id: 'prog-30',
      question: 'Which function converts string to integer?',
      options: ['str()', 'int()', 'float()', 'bool()'],
      correctAnswer: 1,
      explanation: 'int() converts to integer.',
      category: 'Type Conversion'
    },
    {
      id: 'prog-31',
      question: 'What is a lambda function?',
      options: ['Named function', 'Anonymous function', 'Class method', 'Module function'],
      correctAnswer: 1,
      explanation: 'Lambda creates anonymous functions.',
      category: 'Functions'
    },
    {
      id: 'prog-32',
      question: 'Which method reads from a file?',
      options: ['write()', 'read()', 'open()', 'close()'],
      correctAnswer: 1,
      explanation: 'read() reads file content.',
      category: 'File I/O'
    },
    {
      id: 'prog-33',
      question: 'What is the purpose of __name__ == "__main__"?',
      options: ['Check if module is imported', 'Define main function', 'Set module name', 'Import module'],
      correctAnswer: 0,
      explanation: 'Checks if script is run directly.',
      category: 'Modules'
    },
    {
      id: 'prog-34',
      question: 'Which data type is unordered and unique?',
      options: ['List', 'Tuple', 'Set', 'Dictionary'],
      correctAnswer: 2,
      explanation: 'Sets are unordered and unique.',
      category: 'Data Structures'
    },
    {
      id: 'prog-35',
      question: 'What does the zip() function do?',
      options: ['Compresses data', 'Combines iterables', 'Splits data', 'Sorts data'],
      correctAnswer: 1,
      explanation: 'zip() combines multiple iterables.',
      category: 'Built-in Functions'
    },
    {
      id: 'prog-36',
      question: 'Which operator checks identity?',
      options: ['==', 'is', '!=', 'not'],
      correctAnswer: 1,
      explanation: 'is checks object identity.',
      category: 'Operators'
    },
    {
      id: 'prog-37',
      question: 'What is a generator?',
      options: ['Function that returns list', 'Function that yields values', 'Class that stores data', 'Module that imports code'],
      correctAnswer: 1,
      explanation: 'Generators yield values lazily.',
      category: 'Advanced'
    },
    {
      id: 'prog-38',
      question: 'Which decorator is used for class methods?',
      options: ['@staticmethod', '@classmethod', '@property', '@method'],
      correctAnswer: 1,
      explanation: '@classmethod defines class methods.',
      category: 'Decorators'
    },
    {
      id: 'prog-39',
      question: 'What is the purpose of super()?',
      options: ['Call parent method', 'Create object', 'Delete object', 'Copy object'],
      correctAnswer: 0,
      explanation: 'super() calls parent class methods.',
      category: 'OOP'
    },
    {
      id: 'prog-40',
      question: 'Which is a mutable data type?',
      options: ['str', 'tuple', 'list', 'int'],
      correctAnswer: 2,
      explanation: 'Lists are mutable.',
      category: 'Data Types'
    },
    {
      id: 'prog-41',
      question: 'What does the enumerate() function return?',
      options: ['Index only', 'Value only', 'Index and value pairs', 'Length only'],
      correctAnswer: 2,
      explanation: 'enumerate() returns index-value pairs.',
      category: 'Built-in Functions'
    },
    {
      id: 'prog-42',
      question: 'Which statement handles multiple exceptions?',
      options: ['except Exception:', 'except (TypeError, ValueError):', 'except:', 'except Exception as e:'],
      correctAnswer: 1,
      explanation: 'Tuple syntax handles multiple exceptions.',
      category: 'Error Handling'
    },
    {
      id: 'prog-43',
      question: 'What is a docstring?',
      options: ['Comment', 'Documentation string', 'Variable name', 'Function name'],
      correctAnswer: 1,
      explanation: 'Docstrings document functions and classes.',
      category: 'Documentation'
    },
    {
      id: 'prog-44',
      question: 'Which method converts list to string?',
      options: ['str()', 'join()', 'split()', 'convert()'],
      correctAnswer: 1,
      explanation: 'join() converts list to string.',
      category: 'Strings'
    },
    {
      id: 'prog-45',
      question: 'What is the purpose of the with statement?',
      options: ['Define context', 'Manage resources', 'Create loop', 'Handle errors'],
      correctAnswer: 1,
      explanation: 'with manages resource cleanup.',
      category: 'Context Managers'
    },
    {
      id: 'prog-46',
      question: 'Which is a sequence type?',
      options: ['dict', 'set', 'list', 'int'],
      correctAnswer: 2,
      explanation: 'Lists are sequence types.',
      category: 'Data Types'
    },
    {
      id: 'prog-47',
      question: 'What does the reversed() function do?',
      options: ['Sorts in reverse', 'Returns reverse iterator', 'Deletes elements', 'Adds elements'],
      correctAnswer: 1,
      explanation: 'reversed() returns reverse iterator.',
      category: 'Built-in Functions'
    },
    {
      id: 'prog-48',
      question: 'Which is used for list comprehensions?',
      options: ['()', '[]', '{}', '<>'],
      correctAnswer: 1,
      explanation: '[] creates list comprehensions.',
      category: 'Comprehensions'
    },
    {
      id: 'prog-49',
      question: 'What is the purpose of __str__?',
      options: ['Create object', 'String representation', 'Compare objects', 'Delete object'],
      correctAnswer: 1,
      explanation: '__str__ defines string representation.',
      category: 'OOP'
    },
    {
      id: 'prog-50',
      question: 'Which function checks if object is instance of class?',
      options: ['type()', 'isinstance()', 'class()', 'instance()'],
      correctAnswer: 1,
      explanation: 'isinstance() checks object type.',
      category: 'Built-in Functions'
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
    },
    {
      id: 'linux-16',
      question: 'Which command shows disk usage?',
      options: ['df', 'du', 'free', 'top'],
      correctAnswer: 0,
      explanation: 'df shows disk space usage.',
      category: 'File System'
    },
    {
      id: 'linux-17',
      question: 'What does the grep command do?',
      options: ['Find files', 'Search text', 'Copy files', 'Move files'],
      correctAnswer: 1,
      explanation: 'grep searches for patterns in files.',
      category: 'Text Processing'
    },
    {
      id: 'linux-18',
      question: 'Which command shows file permissions?',
      options: ['ls -l', 'chmod', 'chown', 'chgrp'],
      correctAnswer: 0,
      explanation: 'ls -l displays detailed file information including permissions.',
      category: 'Permissions'
    },
    {
      id: 'linux-19',
      question: 'What is the purpose of sudo?',
      options: ['Switch user', 'Super user do', 'System update', 'Software install'],
      correctAnswer: 1,
      explanation: 'sudo executes commands as superuser.',
      category: 'Privileges'
    },
    {
      id: 'linux-20',
      question: 'Which command shows network connections?',
      options: ['netstat', 'ifconfig', 'ping', 'traceroute'],
      correctAnswer: 0,
      explanation: 'netstat shows network connections and statistics.',
      category: 'Networking'
    },
    {
      id: 'linux-21',
      question: 'What does the tar command do?',
      options: ['Compress files', 'Archive files', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'tar creates and extracts archives.',
      category: 'Archiving'
    },
    {
      id: 'linux-22',
      question: 'Which command shows system logs?',
      options: ['dmesg', 'journalctl', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both dmesg and journalctl show system logs.',
      category: 'System'
    },
    {
      id: 'linux-23',
      question: 'What is the purpose of cron?',
      options: ['Schedule tasks', 'Monitor processes', 'Manage users', 'Configure network'],
      correctAnswer: 0,
      explanation: 'cron schedules automated tasks.',
      category: 'Scheduling'
    },
    {
      id: 'linux-24',
      question: 'Which command shows memory usage?',
      options: ['free', 'top', 'ps', 'df'],
      correctAnswer: 0,
      explanation: 'free displays memory usage information.',
      category: 'System'
    },
    {
      id: 'linux-25',
      question: 'What does the wget command do?',
      options: ['Download files', 'Upload files', 'Transfer files', 'Sync files'],
      correctAnswer: 0,
      explanation: 'wget downloads files from the internet.',
      category: 'Networking'
    },
    {
      id: 'linux-26',
      question: 'Which command shows running processes?',
      options: ['ps', 'top', 'htop', 'All of the above'],
      correctAnswer: 3,
      explanation: 'ps, top, and htop all show process information.',
      category: 'Processes'
    },
    {
      id: 'linux-27',
      question: 'What is the purpose of SSH?',
      options: ['Secure shell access', 'File transfer', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'SSH provides secure remote access and file transfer.',
      category: 'Security'
    },
    {
      id: 'linux-28',
      question: 'Which command changes file ownership?',
      options: ['chmod', 'chown', 'chgrp', 'passwd'],
      correctAnswer: 1,
      explanation: 'chown changes file owner and group.',
      category: 'Permissions'
    },
    {
      id: 'linux-29',
      question: 'What does the find command do?',
      options: ['Search files', 'Find text', 'Locate commands', 'Search network'],
      correctAnswer: 0,
      explanation: 'find searches for files in directory trees.',
      category: 'File System'
    },
    {
      id: 'linux-30',
      question: 'Which command shows system information?',
      options: ['uname', 'hostname', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'uname and hostname show system information.',
      category: 'System'
    },
    {
      id: 'linux-31',
      question: 'What is the purpose of iptables?',
      options: ['Firewall rules', 'Network routing', 'DNS resolution', 'IP assignment'],
      correctAnswer: 0,
      explanation: 'iptables manages firewall rules.',
      category: 'Security'
    },
    {
      id: 'linux-32',
      question: 'Which command shows file type?',
      options: ['file', 'type', 'which', 'whereis'],
      correctAnswer: 0,
      explanation: 'file determines file type.',
      category: 'File System'
    },
    {
      id: 'linux-33',
      question: 'What does the rsync command do?',
      options: ['Sync files', 'Copy files', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'rsync synchronizes and copies files efficiently.',
      category: 'File Operations'
    },
    {
      id: 'linux-34',
      question: 'Which command shows command history?',
      options: ['history', 'log', 'journal', 'audit'],
      correctAnswer: 0,
      explanation: 'history shows previously executed commands.',
      category: 'Shell'
    },
    {
      id: 'linux-35',
      question: 'What is the purpose of systemctl?',
      options: ['Service management', 'Process management', 'User management', 'File management'],
      correctAnswer: 0,
      explanation: 'systemctl manages system services.',
      category: 'System'
    },
    {
      id: 'linux-36',
      question: 'Which command shows disk partitions?',
      options: ['fdisk', 'parted', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'fdisk and parted manage disk partitions.',
      category: 'Storage'
    },
    {
      id: 'linux-37',
      question: 'What does the mount command do?',
      options: ['Mount file systems', 'Unmount file systems', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'mount attaches and detaches file systems.',
      category: 'File System'
    },
    {
      id: 'linux-38',
      question: 'Which command shows network interfaces?',
      options: ['ip addr', 'ifconfig', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'ip addr and ifconfig show network interfaces.',
      category: 'Networking'
    },
    {
      id: 'linux-39',
      question: 'What is the purpose of apt?',
      options: ['Package management', 'Process management', 'User management', 'Service management'],
      correctAnswer: 0,
      explanation: 'apt manages software packages.',
      category: 'Package Management'
    },
    {
      id: 'linux-40',
      question: 'Which command shows CPU information?',
      options: ['lscpu', 'cat /proc/cpuinfo', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'lscpu and /proc/cpuinfo show CPU details.',
      category: 'System'
    },
    {
      id: 'linux-41',
      question: 'What does the sed command do?',
      options: ['Edit text streams', 'Search text', 'Replace text', 'All of the above'],
      correctAnswer: 3,
      explanation: 'sed performs text transformations.',
      category: 'Text Processing'
    },
    {
      id: 'linux-42',
      question: 'Which command shows kernel version?',
      options: ['uname -r', 'cat /proc/version', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'uname -r and /proc/version show kernel version.',
      category: 'System'
    },
    {
      id: 'linux-43',
      question: 'What is the purpose of lsof?',
      options: ['List open files', 'List processes', 'List users', 'List services'],
      correctAnswer: 0,
      explanation: 'lsof lists open files and sockets.',
      category: 'System'
    },
    {
      id: 'linux-44',
      question: 'Which command shows system load?',
      options: ['uptime', 'w', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'uptime and w show system load average.',
      category: 'System'
    },
    {
      id: 'linux-45',
      question: 'What does the awk command do?',
      options: ['Text processing', 'Pattern matching', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'awk processes and analyzes text.',
      category: 'Text Processing'
    },
    {
      id: 'linux-46',
      question: 'Which command shows file system usage?',
      options: ['du', 'df', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'du shows directory usage, df shows file system usage.',
      category: 'File System'
    },
    {
      id: 'linux-47',
      question: 'What is the purpose of strace?',
      options: ['Trace system calls', 'Trace network calls', 'Trace file operations', 'Trace process operations'],
      correctAnswer: 0,
      explanation: 'strace traces system calls and signals.',
      category: 'Debugging'
    },
    {
      id: 'linux-48',
      question: 'Which command shows environment variables?',
      options: ['env', 'printenv', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'env and printenv display environment variables.',
      category: 'Shell'
    },
    {
      id: 'linux-49',
      question: 'What does the nc command do?',
      options: ['Network connections', 'File transfer', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'nc (netcat) handles network connections and data transfer.',
      category: 'Networking'
    },
    {
      id: 'linux-50',
      question: 'Which command shows system uptime?',
      options: ['uptime', 'w', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'uptime and w show system uptime.',
      category: 'System'
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
    },
    {
      id: 'net-16',
      question: 'Which protocol is used for DNS?',
      options: ['TCP', 'UDP', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'DNS uses both TCP and UDP.',
      category: 'Protocols'
    },
    {
      id: 'net-17',
      question: 'What is a VLAN?',
      options: ['Virtual Local Area Network', 'Very Large Area Network', 'Virtual Link Access Node', 'Variable Length Address Network'],
      correctAnswer: 0,
      explanation: 'VLAN segments network logically.',
      category: 'Networking'
    },
    {
      id: 'net-18',
      question: 'Which port does FTP use?',
      options: ['20/21', '22', '23', '25'],
      correctAnswer: 0,
      explanation: 'FTP uses ports 20 and 21.',
      category: 'Ports'
    },
    {
      id: 'net-19',
      question: 'What is DHCP?',
      options: ['Dynamic Host Configuration Protocol', 'Domain Host Control Protocol', 'Dynamic Host Control Protocol', 'Domain Host Configuration Protocol'],
      correctAnswer: 0,
      explanation: 'DHCP assigns IP addresses dynamically.',
      category: 'Protocols'
    },
    {
      id: 'net-20',
      question: 'Which tool traces network path?',
      options: ['ping', 'traceroute', 'nslookup', 'dig'],
      correctAnswer: 1,
      explanation: 'traceroute shows network path.',
      category: 'Tools'
    },
    {
      id: 'net-21',
      question: 'What is a MAC address?',
      options: ['Media Access Control', 'Machine Access Code', 'Media Access Code', 'Machine Access Control'],
      correctAnswer: 0,
      explanation: 'MAC address identifies network interface.',
      category: 'Networking'
    },
    {
      id: 'net-22',
      question: 'Which protocol provides routing?',
      options: ['IP', 'TCP', 'UDP', 'Ethernet'],
      correctAnswer: 0,
      explanation: 'IP handles routing and addressing.',
      category: 'Protocols'
    },
    {
      id: 'net-23',
      question: 'What is a subnet mask?',
      options: ['Network divider', 'IP address mask', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Subnet mask divides network and host portions.',
      category: 'IP Addressing'
    },
    {
      id: 'net-24',
      question: 'Which command shows ARP table?',
      options: ['arp -a', 'arp', 'show arp', 'netstat -r'],
      correctAnswer: 0,
      explanation: 'arp -a displays ARP table.',
      category: 'Tools'
    },
    {
      id: 'net-25',
      question: 'What is TCP three-way handshake?',
      options: ['Connection establishment', 'Data transfer', 'Connection termination', 'Error recovery'],
      correctAnswer: 0,
      explanation: 'Three-way handshake establishes TCP connection.',
      category: 'TCP'
    },
    {
      id: 'net-26',
      question: 'Which is a Layer 2 protocol?',
      options: ['IP', 'TCP', 'Ethernet', 'HTTP'],
      correctAnswer: 2,
      explanation: 'Ethernet operates at Data Link layer.',
      category: 'OSI Model'
    },
    {
      id: 'net-27',
      question: 'What is MTU?',
      options: ['Maximum Transmission Unit', 'Minimum Transfer Unit', 'Maximum Transfer Unit', 'Minimum Transmission Unit'],
      correctAnswer: 0,
      explanation: 'MTU is maximum frame size.',
      category: 'Networking'
    },
    {
      id: 'net-28',
      question: 'Which protocol is connection-oriented?',
      options: ['UDP', 'TCP', 'IP', 'ICMP'],
      correctAnswer: 1,
      explanation: 'TCP is connection-oriented.',
      category: 'Protocols'
    },
    {
      id: 'net-29',
      question: 'What is a default gateway?',
      options: ['Local router', 'DNS server', 'DHCP server', 'Web server'],
      correctAnswer: 0,
      explanation: 'Default gateway routes traffic to other networks.',
      category: 'Routing'
    },
    {
      id: 'net-30',
      question: 'Which tool scans ports?',
      options: ['nmap', 'ping', 'traceroute', 'dig'],
      correctAnswer: 0,
      explanation: 'nmap scans network ports.',
      category: 'Tools'
    },
    {
      id: 'net-31',
      question: 'What is IPv6?',
      options: ['128-bit addressing', '32-bit addressing', '64-bit addressing', '16-bit addressing'],
      correctAnswer: 0,
      explanation: 'IPv6 uses 128-bit addresses.',
      category: 'IP Addressing'
    },
    {
      id: 'net-32',
      question: 'Which protocol secures web traffic?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correctAnswer: 1,
      explanation: 'HTTPS provides encrypted web communication.',
      category: 'Security'
    },
    {
      id: 'net-33',
      question: 'What is a proxy server?',
      options: ['Intermediary server', 'DNS server', 'Mail server', 'File server'],
      correctAnswer: 0,
      explanation: 'Proxy acts as intermediary for requests.',
      category: 'Networking'
    },
    {
      id: 'net-34',
      question: 'Which is a routing protocol?',
      options: ['OSPF', 'TCP', 'UDP', 'HTTP'],
      correctAnswer: 0,
      explanation: 'OSPF is a link-state routing protocol.',
      category: 'Routing'
    },
    {
      id: 'net-35',
      question: 'What is QoS?',
      options: ['Quality of Service', 'Quantity of Service', 'Quality of System', 'Quantity of System'],
      correctAnswer: 0,
      explanation: 'QoS manages network traffic priority.',
      category: 'Networking'
    },
    {
      id: 'net-36',
      question: 'Which protocol is used for email retrieval?',
      options: ['SMTP', 'POP3', 'IMAP', 'Both B and C'],
      correctAnswer: 3,
      explanation: 'POP3 and IMAP retrieve emails.',
      category: 'Protocols'
    },
    {
      id: 'net-37',
      question: 'What is a broadcast address?',
      options: ['All hosts address', 'Network address', 'Gateway address', 'Host address'],
      correctAnswer: 0,
      explanation: 'Broadcast address reaches all hosts.',
      category: 'IP Addressing'
    },
    {
      id: 'net-38',
      question: 'Which tool captures packets?',
      options: ['Wireshark', 'ping', 'traceroute', 'nslookup'],
      correctAnswer: 0,
      explanation: 'Wireshark analyzes network traffic.',
      category: 'Tools'
    },
    {
      id: 'net-39',
      question: 'What is ICMP?',
      options: ['Internet Control Message Protocol', 'Internet Connection Message Protocol', 'Internet Control Management Protocol', 'Internet Connection Management Protocol'],
      correctAnswer: 0,
      explanation: 'ICMP handles error messages.',
      category: 'Protocols'
    },
    {
      id: 'net-40',
      question: 'Which is a Layer 3 device?',
      options: ['Switch', 'Router', 'Hub', 'Bridge'],
      correctAnswer: 1,
      explanation: 'Router operates at Network layer.',
      category: 'Networking'
    },
    {
      id: 'net-41',
      question: 'What is CIDR?',
      options: ['Classless Inter-Domain Routing', 'Classful Inter-Domain Routing', 'Classless Intra-Domain Routing', 'Classful Intra-Domain Routing'],
      correctAnswer: 0,
      explanation: 'CIDR allows variable subnet masks.',
      category: 'IP Addressing'
    },
    {
      id: 'net-42',
      question: 'Which protocol provides VPN?',
      options: ['IPsec', 'TCP', 'UDP', 'HTTP'],
      correctAnswer: 0,
      explanation: 'IPsec creates secure tunnels.',
      category: 'Security'
    },
    {
      id: 'net-43',
      question: 'What is a loopback address?',
      options: ['127.0.0.1', '192.168.1.1', '10.0.0.1', '172.16.0.1'],
      correctAnswer: 0,
      explanation: '127.0.0.1 is the loopback address.',
      category: 'IP Addressing'
    },
    {
      id: 'net-44',
      question: 'Which is a Layer 4 protocol?',
      options: ['IP', 'TCP', 'Ethernet', 'ARP'],
      correctAnswer: 1,
      explanation: 'TCP operates at Transport layer.',
      category: 'OSI Model'
    },
    {
      id: 'net-45',
      question: 'What is bandwidth?',
      options: ['Data transfer rate', 'Storage capacity', 'Memory size', 'CPU speed'],
      correctAnswer: 0,
      explanation: 'Bandwidth measures data transmission speed.',
      category: 'Networking'
    },
    {
      id: 'net-46',
      question: 'Which protocol is used for VoIP?',
      options: ['SIP', 'HTTP', 'FTP', 'SMTP'],
      correctAnswer: 0,
      explanation: 'SIP is used for Voice over IP.',
      category: 'Protocols'
    },
    {
      id: 'net-47',
      question: 'What is latency?',
      options: ['Delay in transmission', 'Data loss', 'Connection speed', 'Packet size'],
      correctAnswer: 0,
      explanation: 'Latency is transmission delay.',
      category: 'Networking'
    },
    {
      id: 'net-48',
      question: 'Which is a wireless standard?',
      options: ['802.11', 'Ethernet', 'Token Ring', 'ARCNET'],
      correctAnswer: 0,
      explanation: '802.11 is Wi-Fi standard.',
      category: 'Wireless'
    },
    {
      id: 'net-49',
      question: 'What is a DMZ?',
      options: ['Demilitarized Zone', 'Data Management Zone', 'Domain Management Zone', 'Device Management Zone'],
      correctAnswer: 0,
      explanation: 'DMZ is network security zone.',
      category: 'Security'
    },
    {
      id: 'net-50',
      question: 'Which protocol provides SSL/TLS?',
      options: ['HTTPS', 'HTTP', 'FTP', 'SMTP'],
      correctAnswer: 0,
      explanation: 'HTTPS uses SSL/TLS encryption.',
      category: 'Security'
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
    },
    {
      id: 'web-16',
      question: 'Which prevents directory traversal?',
      options: ['Input validation', 'Path sanitization', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both input validation and path sanitization prevent directory traversal.',
      category: 'File System'
    },
    {
      id: 'web-17',
      question: 'What is a security misconfiguration?',
      options: ['Wrong settings', 'Code vulnerability', 'Network issue', 'Hardware failure'],
      correctAnswer: 0,
      explanation: 'Security misconfiguration involves improper security settings.',
      category: 'Configuration'
    },
    {
      id: 'web-18',
      question: 'Which is a broken access control?',
      options: ['IDOR', 'XSS', 'SQL injection', 'CSRF'],
      correctAnswer: 0,
      explanation: 'IDOR is Insecure Direct Object Reference.',
      category: 'Access Control'
    },
    {
      id: 'web-19',
      question: 'What is a race condition?',
      options: ['Timing vulnerability', 'Logic error', 'Input validation', 'Authentication bypass'],
      correctAnswer: 0,
      explanation: 'Race conditions occur when timing affects security.',
      category: 'Concurrency'
    },
    {
      id: 'web-20',
      question: 'Which prevents command injection?',
      options: ['Input sanitization', 'Parameterization', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both sanitization and parameterization prevent command injection.',
      category: 'Injection'
    },
    {
      id: 'web-21',
      question: 'What is a zero-day vulnerability?',
      options: ['Unknown vulnerability', 'Old vulnerability', 'Patched vulnerability', 'Test vulnerability'],
      correctAnswer: 0,
      explanation: 'Zero-day vulnerabilities are unknown to vendors.',
      category: 'Vulnerabilities'
    },
    {
      id: 'web-22',
      question: 'Which is a client-side attack?',
      options: ['SQL injection', 'XSS', 'Command injection', 'Directory traversal'],
      correctAnswer: 1,
      explanation: 'XSS executes in the client browser.',
      category: 'Client-Side'
    },
    {
      id: 'web-23',
      question: 'What is a WAF?',
      options: ['Web Application Firewall', 'Wireless Access Firewall', 'Wide Area Firewall', 'Web Access Firewall'],
      correctAnswer: 0,
      explanation: 'WAF protects web applications from attacks.',
      category: 'Security'
    },
    {
      id: 'web-24',
      question: 'Which prevents session fixation?',
      options: ['Session regeneration', 'Session validation', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both regeneration and validation prevent session fixation.',
      category: 'Session Management'
    },
    {
      id: 'web-25',
      question: 'What is a deserialization attack?',
      options: ['Object manipulation', 'Data corruption', 'Memory leak', 'Buffer overflow'],
      correctAnswer: 0,
      explanation: 'Deserialization attacks manipulate serialized objects.',
      category: 'Serialization'
    },
    {
      id: 'web-26',
      question: 'Which is a server-side attack?',
      options: ['DOM XSS', 'Stored XSS', 'Reflected XSS', 'All of the above'],
      correctAnswer: 1,
      explanation: 'Stored XSS is server-side.',
      category: 'Server-Side'
    },
    {
      id: 'web-27',
      question: 'What is a honeypot?',
      options: ['Decoy system', 'Real system', 'Backup system', 'Test system'],
      correctAnswer: 0,
      explanation: 'Honeypots attract and study attackers.',
      category: 'Security'
    },
    {
      id: 'web-28',
      question: 'Which prevents XXE?',
      options: ['XML validation', 'Entity disabling', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both validation and entity disabling prevent XXE.',
      category: 'XML'
    },
    {
      id: 'web-29',
      question: 'What is a logic flaw?',
      options: ['Code error', 'Design weakness', 'Implementation bug', 'All of the above'],
      correctAnswer: 3,
      explanation: 'Logic flaws are design or implementation weaknesses.',
      category: 'Logic'
    },
    {
      id: 'web-30',
      question: 'Which is a cryptographic failure?',
      options: ['Weak encryption', 'No encryption', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both weak and missing encryption are failures.',
      category: 'Cryptography'
    },
    {
      id: 'web-31',
      question: 'What is a SSRF attack?',
      options: ['Server-Side Request Forgery', 'Server-Side Response Forgery', 'Client-Side Request Forgery', 'Client-Side Response Forgery'],
      correctAnswer: 0,
      explanation: 'SSRF forces server to make unintended requests.',
      category: 'SSRF'
    },
    {
      id: 'web-32',
      question: 'Which prevents mass assignment?',
      options: ['Input whitelisting', 'Field validation', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both whitelisting and validation prevent mass assignment.',
      category: 'Mass Assignment'
    },
    {
      id: 'web-33',
      question: 'What is a buffer overflow?',
      options: ['Memory corruption', 'Data overflow', 'Stack overflow', 'All of the above'],
      correctAnswer: 3,
      explanation: 'Buffer overflow corrupts memory boundaries.',
      category: 'Memory'
    },
    {
      id: 'web-34',
      question: 'Which is an authentication bypass?',
      options: ['Weak passwords', 'Session hijacking', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both weak auth and session issues bypass authentication.',
      category: 'Authentication'
    },
    {
      id: 'web-35',
      question: 'What is a privilege escalation?',
      options: ['Gaining higher privileges', 'Losing privileges', 'Maintaining privileges', 'No privileges'],
      correctAnswer: 0,
      explanation: 'Privilege escalation gains unauthorized access.',
      category: 'Authorization'
    },
    {
      id: 'web-36',
      question: 'Which prevents type juggling?',
      options: ['Strict typing', 'Type checking', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both strict typing and checking prevent type juggling.',
      category: 'Type Safety'
    },
    {
      id: 'web-37',
      question: 'What is a side-channel attack?',
      options: ['Timing attack', 'Power analysis', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Side-channel attacks use physical characteristics.',
      category: 'Side-Channel'
    },
    {
      id: 'web-38',
      question: 'Which is a broken function level authorization?',
      options: ['IDOR', 'Function access', 'Both', 'Neither'],
      correctAnswer: 1,
      explanation: 'Broken function authorization allows unauthorized function access.',
      category: 'Authorization'
    },
    {
      id: 'web-39',
      question: 'What is a memory leak?',
      options: ['Resource not freed', 'Memory corruption', 'Buffer overflow', 'Stack overflow'],
      correctAnswer: 0,
      explanation: 'Memory leaks occur when resources are not released.',
      category: 'Memory'
    },
    {
      id: 'web-40',
      question: 'Which prevents insecure deserialization?',
      options: ['Input validation', 'Type checking', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both validation and type checking prevent insecure deserialization.',
      category: 'Serialization'
    },
    {
      id: 'web-41',
      question: 'What is a supply chain attack?',
      options: ['Third-party compromise', 'Direct attack', 'Internal attack', 'Network attack'],
      correctAnswer: 0,
      explanation: 'Supply chain attacks compromise dependencies.',
      category: 'Supply Chain'
    },
    {
      id: 'web-42',
      question: 'Which is a software composition analysis?',
      options: ['SCA', 'SAST', 'DAST', 'IAST'],
      correctAnswer: 0,
      explanation: 'SCA analyzes third-party components.',
      category: 'Security Testing'
    },
    {
      id: 'web-43',
      question: 'What is a dependency confusion?',
      options: ['Package name conflict', 'Version conflict', 'License conflict', 'Path conflict'],
      correctAnswer: 0,
      explanation: 'Dependency confusion exploits package name conflicts.',
      category: 'Dependencies'
    },
    {
      id: 'web-44',
      question: 'Which prevents prototype pollution?',
      options: ['Input sanitization', 'Object freezing', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both sanitization and freezing prevent prototype pollution.',
      category: 'JavaScript'
    },
    {
      id: 'web-45',
      question: 'What is a subdomain takeover?',
      options: ['DNS hijacking', 'Domain hijacking', 'IP hijacking', 'Port hijacking'],
      correctAnswer: 0,
      explanation: 'Subdomain takeover hijacks abandoned DNS records.',
      category: 'DNS'
    },
    {
      id: 'web-46',
      question: 'Which is a server-side template injection?',
      options: ['SSTI', 'XSS', 'CSRF', 'SSRF'],
      correctAnswer: 0,
      explanation: 'SSTI injects code into server-side templates.',
      category: 'Injection'
    },
    {
      id: 'web-47',
      question: 'What is a graphQL injection?',
      options: ['Query manipulation', 'Schema injection', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'GraphQL injection manipulates queries and schemas.',
      category: 'GraphQL'
    },
    {
      id: 'web-48',
      question: 'Which prevents NoSQL injection?',
      options: ['Input validation', 'Parameterized queries', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Both validation and parameterization prevent NoSQL injection.',
      category: 'NoSQL'
    },
    {
      id: 'web-49',
      question: 'What is a microservice security?',
      options: ['Service isolation', 'API security', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Microservice security involves isolation and API protection.',
      category: 'Microservices'
    },
    {
      id: 'web-50',
      question: 'Which is a container security?',
      options: ['Image scanning', 'Runtime protection', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Container security includes scanning and runtime protection.',
      category: 'Containers'
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
