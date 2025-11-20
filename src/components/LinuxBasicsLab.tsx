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
import { Terminal, Play, CheckCircle, XCircle, BookOpen, Target, Trophy, Zap, FileText, Shield, Users, HardDrive } from 'lucide-react'

interface CommandChallenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  task: string
  expectedCommand: string
  expectedOutput: string
  hints: string[]
  explanation: string
  scenario: string
}

const commandChallenges: CommandChallenge[] = [
  {
    id: 'pwd-ls',
    title: 'Navigation Basics',
    description: 'Learn to navigate the file system and list directory contents',
    difficulty: 'Beginner',
    category: 'Navigation',
    task: 'Navigate to the /home directory and list its contents.',
    expectedCommand: 'cd /home && ls -la',
    expectedOutput: 'total 12\ndrwxr-xr-x  3 root root 4096 Jan 15 10:30 .\ndrwxr-xr-x 18 root root 4096 Jan 15 10:30 ..\ndrwxr-xr-x  2 user user 4096 Jan 15 10:31 user',
    hints: [
      'Use cd to change directory',
      'Use ls -la to list all files with details',
      'Combine commands with &&'
    ],
    explanation: 'pwd shows current directory, cd changes directory, ls lists files. The -la flags show hidden files and detailed information.',
    scenario: 'You\'re investigating a compromised server and need to check the home directory for suspicious files.'
  },
  {
    id: 'file-permissions',
    title: 'File Permissions',
    description: 'Understand and modify file permissions',
    difficulty: 'Beginner',
    category: 'Permissions',
    task: 'Check permissions of /etc/passwd and make it readable by owner only.',
    expectedCommand: 'ls -l /etc/passwd && chmod 600 /etc/passwd && ls -l /etc/passwd',
    expectedOutput: '-rw-r--r-- 1 root root 1234 Jan 15 10:30 /etc/passwd\n-rw------- 1 root root 1234 Jan 15 10:30 /etc/passwd',
    hints: [
      'ls -l shows permissions',
      'chmod 600 sets read/write for owner only',
      'Numbers represent permission levels (4=read, 2=write, 1=execute)'
    ],
    explanation: 'File permissions control access. chmod changes permissions. 600 means owner can read/write, others have no access.',
    scenario: 'A sensitive configuration file has incorrect permissions that could allow unauthorized access.'
  },
  {
    id: 'process-management',
    title: 'Process Management',
    description: 'Monitor and manage running processes',
    difficulty: 'Intermediate',
    category: 'Processes',
    task: 'Find and terminate a suspicious process named "malware" running as user "attacker".',
    expectedCommand: 'ps aux | grep malware && killall malware && ps aux | grep malware',
    expectedOutput: 'attacker   1234  0.0  0.1  12345  6789 ?        S    10:30   0:00 malware\n[no output - process terminated]',
    hints: [
      'ps aux shows all processes',
      'grep filters output',
      'killall terminates processes by name'
    ],
    explanation: 'Process management is crucial for system security. ps monitors processes, kill terminates them.',
    scenario: 'You\'ve detected malware running on a system and need to stop it immediately.'
  },
  {
    id: 'log-analysis',
    title: 'Log Analysis',
    description: 'Analyze system logs for security events',
    difficulty: 'Intermediate',
    category: 'Logs',
    task: 'Check authentication logs for failed login attempts in the last hour.',
    expectedCommand: 'grep "Failed password" /var/log/auth.log | tail -10',
    expectedOutput: 'Jan 15 10:25 sshd[1234]: Failed password for invalid user admin from 192.168.1.100 port 22 ssh2\nJan 15 10:26 sshd[1235]: Failed password for root from 192.168.1.100 port 22 ssh2',
    hints: [
      'grep searches for patterns in files',
      'tail -n shows last n lines',
      '/var/log/auth.log contains authentication logs'
    ],
    explanation: 'Log analysis helps detect security incidents. Failed login attempts may indicate brute force attacks.',
    scenario: 'Multiple failed login attempts suggest someone is trying to break into the system.'
  },
  {
    id: 'network-connections',
    title: 'Network Connections',
    description: 'Monitor network connections and open ports',
    difficulty: 'Intermediate',
    category: 'Networking',
    task: 'Check for suspicious network connections and listening ports.',
    expectedCommand: 'netstat -tlnp | grep LISTEN && ss -tlnp | grep LISTEN',
    expectedOutput: 'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1234/sshd\ntcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      1235/mysqld',
    hints: [
      'netstat -tlnp shows listening TCP ports',
      'ss is a modern replacement for netstat',
      'LISTEN indicates open ports'
    ],
    explanation: 'Monitoring network connections helps detect unauthorized services or backdoors.',
    scenario: 'You suspect a backdoor is running on the system, listening for connections.'
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Manage system users and groups',
    difficulty: 'Intermediate',
    category: 'Users',
    task: 'Create a new user "security" with restricted access and add them to the "audit" group.',
    expectedCommand: 'sudo useradd -m -s /bin/bash security && sudo usermod -aG audit security && id security',
    expectedOutput: 'uid=1001(security) gid=1001(security) groups=1001(security),1002(audit)',
    hints: [
      'useradd creates users',
      '-m creates home directory',
      'usermod modifies user properties',
      '-aG appends to groups'
    ],
    explanation: 'Proper user management is essential for access control. Users should have minimal required privileges.',
    scenario: 'Setting up a security auditor account with appropriate permissions.'
  },
  {
    id: 'firewall-config',
    title: 'Firewall Configuration',
    description: 'Configure iptables firewall rules',
    difficulty: 'Advanced',
    category: 'Firewall',
    task: 'Block all incoming traffic except SSH (port 22) and allow all outgoing traffic.',
    expectedCommand: 'sudo iptables -F && sudo iptables -P INPUT DROP && sudo iptables -P FORWARD DROP && sudo iptables -P OUTPUT ACCEPT && sudo iptables -A INPUT -i lo -j ACCEPT && sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT && sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
    expectedOutput: 'iptables rules configured successfully',
    hints: [
      'iptables -F flushes existing rules',
      'Default policies: INPUT DROP, OUTPUT ACCEPT',
      'Allow loopback and established connections',
      'Accept SSH on port 22'
    ],
    explanation: 'Firewalls control network traffic. Default deny with explicit allow is a security best practice.',
    scenario: 'Hardening a server by configuring restrictive firewall rules.'
  },
  {
    id: 'file-integrity',
    title: 'File Integrity Monitoring',
    description: 'Monitor file changes using integrity checking',
    difficulty: 'Advanced',
    category: 'Monitoring',
    task: 'Create and verify file checksums to detect unauthorized changes.',
    expectedCommand: 'echo "Important config" > /etc/important.conf && sha256sum /etc/important.conf > /etc/important.conf.sha256 && echo "Modified content" > /etc/important.conf && sha256sum -c /etc/important.conf.sha256',
    expectedOutput: '/etc/important.conf: FAILED\nsha256sum: WARNING: 1 computed checksum did NOT match',
    hints: [
      'sha256sum creates checksums',
      'Store checksums separately',
      'sha256sum -c verifies integrity'
    ],
    explanation: 'File integrity monitoring detects unauthorized changes to critical system files.',
    scenario: 'Ensuring configuration files haven\'t been tampered with by malware.'
  },
  {
    id: 'package-management',
    title: 'Package Management',
    description: 'Install, update, and remove software packages securely',
    difficulty: 'Intermediate',
    category: 'System Administration',
    task: 'Update package lists and install security updates for the system.',
    expectedCommand: 'sudo apt update && sudo apt list --upgradable | head -5 && sudo apt install --only-upgrade openssl',
    expectedOutput: 'Get:1 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 openssl amd64 1.1.1f-1ubuntu2.8 [620 kB]\nFetched 620 kB in 2s (310 kB/s)\nPreparing to unpack .../openssl_1.1.1f-1ubuntu2.8_amd64.deb ...\nUnpacking openssl (1.1.1f-1ubuntu2.8) over (1.1.1f-1ubuntu2.7) ...\nSetting up openssl (1.1.1f-1ubuntu2.8) ...',
    hints: [
      'apt update refreshes package lists',
      'apt list --upgradable shows available updates',
      'apt install --only-upgrade updates specific packages'
    ],
    explanation: 'Regular package updates are crucial for security. Outdated software contains known vulnerabilities.',
    scenario: 'Applying critical security patches to protect against known exploits.'
  },
  {
    id: 'service-management',
    title: 'Service Management',
    description: 'Control system services and daemons',
    difficulty: 'Intermediate',
    category: 'System Administration',
    task: 'Check the status of SSH service and restart it if necessary.',
    expectedCommand: 'sudo systemctl status ssh && sudo systemctl restart ssh && sudo systemctl status ssh',
    expectedOutput: '● ssh.service - OpenBSD Secure Shell server\n     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)\n     Active: active (running) since Mon 2023-01-15 10:30:00 UTC; 1h 25min ago\n    Process: 1234 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)\n    Process: 1235 ExecStart=/usr/sbin/sshd -D $SSHD_OPTS (code=exited, status=0/SUCCESS)',
    hints: [
      'systemctl status shows service state',
      'systemctl restart restarts services',
      'systemctl enable/disable controls startup'
    ],
    explanation: 'Service management ensures critical services remain running and can be controlled during investigations.',
    scenario: 'Restarting SSH service after configuration changes during a security audit.'
  },
  {
    id: 'disk-analysis',
    title: 'Disk Usage Analysis',
    description: 'Analyze disk space usage and identify large files',
    difficulty: 'Beginner',
    category: 'Forensics',
    task: 'Check disk usage and find the largest files in the /var directory.',
    expectedCommand: 'df -h && du -sh /var/* | sort -hr | head -5',
    expectedOutput: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G   15G  4.5G  77% /\n4.2G\t/var/log\n2.1G\t/var/cache\n1.8G\t/var/lib\n890M\t/var/spool',
    hints: [
      'df -h shows disk space in human readable format',
      'du -sh shows directory sizes',
      'sort -hr sorts by size descending'
    ],
    explanation: 'Disk analysis helps identify space issues and potential data exfiltration attempts.',
    scenario: 'Investigating unusual disk usage that might indicate data theft or log manipulation.'
  },
  {
    id: 'file-search',
    title: 'Advanced File Search',
    description: 'Locate files using find and locate commands',
    difficulty: 'Intermediate',
    category: 'Forensics',
    task: 'Find all .log files modified in the last 24 hours and larger than 1MB.',
    expectedCommand: 'find /var/log -name "*.log" -mtime -1 -size +1M -ls',
    expectedOutput: '1234567 1024 -rw-r----- 1 syslog adm 1048576 Jan 15 14:30 /var/log/auth.log\n1234568 2048 -rw-r----- 1 syslog adm 2097152 Jan 15 15:45 /var/log/syslog',
    hints: [
      'find searches for files with criteria',
      '-name specifies filename patterns',
      '-mtime -1 finds files modified within 1 day',
      '-size +1M finds files larger than 1MB'
    ],
    explanation: 'Advanced file searching is essential for digital forensics and log analysis.',
    scenario: 'Searching for recently modified log files during an incident investigation.'
  },
  {
    id: 'text-processing',
    title: 'Text Processing with sed and awk',
    description: 'Process and manipulate text files using sed and awk',
    difficulty: 'Advanced',
    category: 'Automation',
    task: 'Extract IP addresses from a log file and count occurrences.',
    expectedCommand: 'grep -oE "\\b([0-9]{1,3}\\.){3}[0-9]{1,3}\\b" /var/log/auth.log | sort | uniq -c | sort -nr | head -5',
    expectedOutput: '  25 192.168.1.100\n  12 10.0.0.50\n   8 172.16.1.25\n   5 203.0.113.1\n   3 198.51.100.10',
    hints: [
      'grep -oE extracts patterns with regex',
      'sort | uniq -c counts occurrences',
      'sort -nr sorts by count descending'
    ],
    explanation: 'Text processing tools are powerful for log analysis and data extraction in security investigations.',
    scenario: 'Analyzing authentication logs to identify IP addresses with suspicious login attempts.'
  },
  {
    id: 'cron-jobs',
    title: 'Scheduled Tasks (Cron)',
    description: 'Manage cron jobs for automated security tasks',
    difficulty: 'Intermediate',
    category: 'Automation',
    task: 'Create a cron job to run a security scan every day at 2 AM.',
    expectedCommand: 'crontab -l && echo "0 2 * * * /usr/local/bin/security-scan.sh" | crontab - && crontab -l',
    expectedOutput: '# Existing cron jobs...\n0 2 * * * /usr/local/bin/security-scan.sh',
    hints: [
      'crontab -l lists current cron jobs',
      'echo with pipe adds new cron job',
      'Cron format: minute hour day month weekday command'
    ],
    explanation: 'Automated tasks ensure regular security checks and maintenance.',
    scenario: 'Setting up automated vulnerability scans to maintain system security posture.'
  },
  {
    id: 'ssh-keys',
    title: 'SSH Key Management',
    description: 'Manage SSH keys for secure authentication',
    difficulty: 'Intermediate',
    category: 'Authentication',
    task: 'Generate SSH key pair and add public key to authorized_keys.',
    expectedCommand: 'ssh-keygen -t rsa -b 4096 -f ~/.ssh/security_key -N "" && cat ~/.ssh/security_key.pub >> ~/.ssh/authorized_keys && ls -la ~/.ssh/',
    expectedOutput: 'Generating public/private rsa key pair.\nYour identification has been saved in /home/user/.ssh/security_key\nYour public key has been saved in /home/user/.ssh/security_key.pub\ndrw------- 2 user user 4096 Jan 15 16:00 .\n-rw------- 1 user user 3326 Jan 15 16:00 security_key\n-rw-r--r-- 1 user user  742 Jan 15 16:00 security_key.pub\n-rw-r--r-- 1 user user  742 Jan 15 16:00 authorized_keys',
    hints: [
      'ssh-keygen creates key pairs',
      '-t rsa specifies algorithm',
      '-b 4096 sets key size',
      '-N "" sets empty passphrase'
    ],
    explanation: 'SSH key authentication is more secure than passwords and enables automated access.',
    scenario: 'Setting up secure SSH access for automated security monitoring tools.'
  },
  {
    id: 'backup-compression',
    title: 'Backup and Compression',
    description: 'Create compressed backups of important files',
    difficulty: 'Beginner',
    category: 'Backup',
    task: 'Create a compressed backup of the /etc directory.',
    expectedCommand: 'sudo tar -czf /tmp/etc-backup-$(date +%Y%m%d).tar.gz /etc && ls -lh /tmp/etc-backup-*.tar.gz',
    expectedOutput: '-rw-r--r-- 1 root root 2.5M Jan 15 16:30 /tmp/etc-backup-20230115.tar.gz',
    hints: [
      'tar -c creates archives',
      '-z compresses with gzip',
      '-f specifies filename',
      'date +%Y%m%d adds timestamp'
    ],
    explanation: 'Regular backups are essential for disaster recovery and forensic analysis.',
    scenario: 'Creating backups before making system changes during a security hardening process.'
  },
  {
    id: 'system-info',
    title: 'System Information Gathering',
    description: 'Gather comprehensive system information for security assessment',
    difficulty: 'Beginner',
    category: 'Reconnaissance',
    task: 'Display system information including kernel version, distribution, and hardware details.',
    expectedCommand: 'uname -a && lsb_release -a && free -h && df -h',
    expectedOutput: 'Linux server01 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux\nDistributor ID: Ubuntu\nDescription: Ubuntu 20.04.3 LTS\nRelease: 20.04\nCodename: focal\n              total        used        free      shared  buff/cache   available\nMem:           3.8G        1.2G        1.9G        100M        700M        2.3G\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G   15G  4.5G  77% /',
    hints: [
      'uname -a shows kernel information',
      'lsb_release -a shows distribution info',
      'free -h shows memory usage',
      'df -h shows disk usage'
    ],
    explanation: 'System information gathering is the first step in security assessments and incident response.',
    scenario: 'Collecting system details during initial reconnaissance of a potentially compromised server.'
  },
  {
    id: 'memory-monitoring',
    title: 'Memory and Process Monitoring',
    description: 'Monitor system memory and CPU usage',
    difficulty: 'Intermediate',
    category: 'Monitoring',
    task: 'Check memory usage and identify processes consuming the most CPU.',
    expectedCommand: 'free -h && ps aux --sort=-%cpu | head -10',
    expectedOutput: '              total        used        free      shared  buff/cache   available\nMem:           3.8G        1.2G        1.9G        100M        700M        2.3G\nUSER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nwww-data  1234  15.2  8.5 256789 345678 ?     S    10:00   2:30 apache2\nmysql     1235  12.8 15.2 456789 567890 ?     S    10:00   1:45 mysqld\nroot      1236   8.9  2.1  45678  23456 pts/0 S+   16:45   0:00 htop',
    hints: [
      'free -h shows memory statistics',
      'ps aux shows all processes',
      '--sort=-%cpu sorts by CPU usage descending',
      'head -10 shows top 10 processes'
    ],
    explanation: 'Memory and CPU monitoring helps detect performance issues and potential security threats.',
    scenario: 'Investigating high resource usage that might indicate malware or a denial of service attack.'
  },
  {
    id: 'malware-scanning',
    title: 'Malware Detection and Scanning',
    description: 'Use antivirus tools to scan for malware and suspicious files',
    difficulty: 'Intermediate',
    category: 'Security Tools',
    task: 'Install and run ClamAV antivirus to scan the system for malware.',
    expectedCommand: 'sudo apt install clamav -y && sudo freshclam && sudo clamscan -r /home --bell -i',
    expectedOutput: 'Reading viruses.db...\nLibClamAV Warning: You are using an outdated version of the virus database\n----------- SCAN SUMMARY -----------\nKnown viruses: 8512345\nEngine version: 0.103.2\nScanned directories: 1\nScanned files: 45\nInfected files: 0\nData scanned: 12.34 MB\nData read: 12.34 MB (ratio 1.00:1)\nTime: 15.678 sec (0 m 15 s)\nStart Date: 2023:01:15 17:00:00\nEnd Date:   2023:01:15 17:00:15',
    hints: [
      'apt install clamav installs the antivirus',
      'freshclam updates virus definitions',
      'clamscan -r scans recursively',
      '-i shows only infected files'
    ],
    explanation: 'Antivirus scanning is crucial for detecting known malware signatures and suspicious files.',
    scenario: 'Performing a comprehensive malware scan after detecting unusual system behavior.'
  },
  {
    id: 'network-scanning',
    title: 'Network Port Scanning',
    description: 'Use nmap to discover open ports and services on a target system',
    difficulty: 'Advanced',
    category: 'Reconnaissance',
    task: 'Perform a comprehensive port scan on localhost to identify running services.',
    expectedCommand: 'sudo apt install nmap -y && sudo nmap -sV -O localhost',
    expectedOutput: 'Starting Nmap 7.80 ( https://nmap.org ) at 2023-01-15 17:05 UTC\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.00010s latency).\nNot shown: 997 closed ports\nPORT     STATE SERVICE     VERSION\n22/tcp   open  ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)\n80/tcp   open  http        Apache httpd 2.4.41 ((Ubuntu))\n3306/tcp open  mysql       MySQL 8.0.28-0ubuntu0.20.04.3\nNo exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).\nTCP/IP fingerprint:\nOS:SCAN(V=7.80%E=4%D=1/15%OT=22%CT=1%CU=40329%PV=Y%DS=1%DC=D%G=Y%M=000000%TM=63C3E\nNetwork Distance: 0 hops\nOS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/',
    hints: [
      'nmap is the premier network scanning tool',
      '-sV detects service versions',
      '-O attempts OS detection',
      'localhost scans the local machine'
    ],
    explanation: 'Port scanning helps identify running services and potential attack vectors during reconnaissance.',
    scenario: 'Conducting reconnaissance on a potentially compromised system to identify exposed services.'
  }
]

export default function LinuxBasicsLab() {
  const [activeTab, setActiveTab] = useState('challenges')
  const [selectedChallenge, setSelectedChallenge] = useState<CommandChallenge>(commandChallenges[0])
  const [userCommand, setUserCommand] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setUserCommand('')
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge])

  const runCommand = async () => {
    setIsRunning(true)
    setOutput('')

    try {
      // Simulate command execution
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simple validation for demo purposes
      let simulatedOutput = ''

      if (selectedChallenge.id === 'pwd-ls') {
        if (userCommand.includes('cd /home') && userCommand.includes('ls -la')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'file-permissions') {
        if (userCommand.includes('chmod 600') && userCommand.includes('/etc/passwd')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'process-management') {
        if (userCommand.includes('killall malware')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'log-analysis') {
        if (userCommand.includes('grep "Failed password"') && userCommand.includes('tail')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'network-connections') {
        if (userCommand.includes('netstat') || userCommand.includes('ss')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'user-management') {
        if (userCommand.includes('useradd') && userCommand.includes('usermod')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'firewall-config') {
        if (userCommand.includes('iptables') && userCommand.includes('DROP') && userCommand.includes('--dport 22')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'file-integrity') {
        if (userCommand.includes('sha256sum') && userCommand.includes('-c')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'package-management') {
        if (userCommand.includes('apt update') && userCommand.includes('apt install')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'service-management') {
        if (userCommand.includes('systemctl status') && userCommand.includes('systemctl restart')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'disk-analysis') {
        if (userCommand.includes('df -h') && userCommand.includes('du -sh')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'file-search') {
        if (userCommand.includes('find') && userCommand.includes('-name') && userCommand.includes('-mtime')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'text-processing') {
        if (userCommand.includes('grep -oE') && userCommand.includes('uniq -c')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'cron-jobs') {
        if (userCommand.includes('crontab -l') && userCommand.includes('crontab -')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'ssh-keys') {
        if (userCommand.includes('ssh-keygen') && userCommand.includes('cat') && userCommand.includes('authorized_keys')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'backup-compression') {
        if (userCommand.includes('tar -czf') && userCommand.includes('date')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'system-info') {
        if (userCommand.includes('uname -a') && userCommand.includes('lsb_release -a') && userCommand.includes('free -h') && userCommand.includes('df -h')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'memory-monitoring') {
        if (userCommand.includes('free -h') && userCommand.includes('ps aux --sort=-%cpu')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'malware-scanning') {
        if (userCommand.includes('apt install clamav') && userCommand.includes('clamscan')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'network-scanning') {
        if (userCommand.includes('apt install nmap') && userCommand.includes('nmap -sV')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      }

      if (simulatedOutput) {
        setOutput(simulatedOutput)
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      } else {
        setOutput('Command executed but output not captured. Check your command syntax.')
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
            <div className="p-2 sm:p-3 bg-green-500 rounded-lg self-start">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Linux Basics Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Master essential Linux commands for cybersecurity investigations</p>
            </div>
          </div>
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Learn Linux command-line skills through realistic security scenarios. Each challenge simulates common cybersecurity tasks and investigations.
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
                    Select a Linux command challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {commandChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChallenge.id === challenge.id
                          ? 'bg-green-50 border-green-200'
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

              {/* Challenge Details and Terminal */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Terminal className="w-5 h-5" />
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
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <h4 className="font-semibold mb-2 text-red-800">Security Scenario:</h4>
                    <p className="text-sm text-red-700">{selectedChallenge.scenario}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Task:</h4>
                    <p className="text-sm text-slate-700">{selectedChallenge.task}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Command Input:</h4>
                    <Textarea
                      value={userCommand}
                      onChange={(e) => setUserCommand(e.target.value)}
                      placeholder="Enter your Linux command here..."
                      className="font-mono text-sm h-20"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={runCommand}
                      disabled={isRunning || !userCommand.trim()}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isRunning ? 'Executing...' : 'Run Command'}</span>
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
                      <h4 className="font-semibold mb-2">Expected Command:</h4>
                      <Code className="block text-sm">{selectedChallenge.expectedCommand}</Code>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Terminal Output:</h4>
                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-32">
                      <div className="text-slate-400 mb-2">$ {userCommand}</div>
                      {output || 'Execute a command to see output here...'}
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
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {completedChallenges.size}/{commandChallenges.length}
                    </div>
                    <p className="text-sm text-slate-600">Challenges Completed</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(completedChallenges.size / commandChallenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Skills Learned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">File System Navigation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">File Permissions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Process Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Log Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Network Monitoring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HardDrive className="w-5 h-5" />
                    <span>Essential Commands</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><code className="bg-slate-100 px-1 rounded">ls, cd, pwd, find</code> - Navigation & Search</p>
                    <p><code className="bg-slate-100 px-1 rounded">chmod, chown, ssh-keygen</code> - Permissions & Auth</p>
                    <p><code className="bg-slate-100 px-1 rounded">ps, kill, systemctl, cron</code> - Processes & Services</p>
                    <p><code className="bg-slate-100 px-1 rounded">grep, sed, awk, tail</code> - Text Processing</p>
                    <p><code className="bg-slate-100 px-1 rounded">netstat, ss, iptables, df</code> - Networking & Storage</p>
                    <p><code className="bg-slate-100 px-1 rounded">tar, sha256sum, apt, uname</code> - System Tools</p>
                    <p><code className="bg-slate-100 px-1 rounded">clamav, nmap, freshclam</code> - Security Scanning</p>
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
