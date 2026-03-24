// Question bank: at least 5 questions per section
window.QuizBank = {
  1: [
    { question: 'Which command lists files?', options: ['ls', 'cd', 'pwd', 'cat'], correctIndex: 0 },
    { question: 'Which command changes directory?', options: ['mv', 'cd', 'locate', 'whereis'], correctIndex: 1 },
    { question: 'Which shows current directory?', options: ['path', 'pwd', 'cwd', 'where'], correctIndex: 1 },
    { question: 'Append output to file?', options: ['>', '>>', '2>', '<'], correctIndex: 1 },
    { question: 'Open a file with nano?', options: ['nano file', 'open file', 'vi file', 'ed file'], correctIndex: 0 },
  ],
  2: [
    { question: 'Change file owner?', options: ['chmod', 'chown', 'setfacl', 'umask'], correctIndex: 1 },
    { question: 'Grant execute to user?', options: ['chmod u+x', 'chmod +xg', 'chown +x', 'setfacl +x'], correctIndex: 0 },
    { question: 'Create symlink?', options: ['ln file link', 'ln -s file link', 'link file', 'cp -s'], correctIndex: 1 },
    { question: 'Archive dir to .tar.gz?', options: ['zip -r', 'tar -czf', 'gz -c', 'rar a'], correctIndex: 1 },
    { question: 'Run as admin once?', options: ['root', 'sudo', 'su -', 'admin'], correctIndex: 1 },
  ],
  3: [
    { question: 'Follow a file for new lines?', options: ['tail -f', 'head -f', 'watch', 'less -f'], correctIndex: 0 },
    { question: 'Count lines?', options: ['nl', 'wc -l', 'awk -l', 'sed -n'], correctIndex: 1 },
    { question: 'Filter lines by regex?', options: ['awk', 'grep', 'cut', 'tr'], correctIndex: 1 },
    { question: 'Uppercase transform?', options: ['tr', 'awk', 'sed -u', 'fmt'], correctIndex: 0 },
    { question: 'Extract column 1 CSV?', options: ['cut -d, -f1', 'awk -d, 1', 'sed -f1', 'paste -f1'], correctIndex: 0 },
  ],
  4: [
    { question: 'Show memory usage?', options: ['free -h', 'df -h', 'du -sh', 'vmstat -d'], correctIndex: 0 },
    { question: 'System load avg file?', options: ['/proc/loadavg', '/proc/meminfo', '/proc/cpuinfo', '/proc/uptime'], correctIndex: 0 },
    { question: 'Disk usage per mount?', options: ['df -h', 'du -h /', 'lsblk', 'mount'], correctIndex: 0 },
    { question: 'View auth history?', options: ['last', 'history', 'journalctl -k', 'ps aux'], correctIndex: 0 },
    { question: 'Service logs?', options: ['journalctl -u svc', 'cat /var/log/service', 'dmesg -u', 'tail /etc/systemd'], correctIndex: 0 },
  ],
  5: [
    { question: 'List all processes?', options: ['ps aux', 'jobs', 'pgrep', 'pstree'], correctIndex: 0 },
    { question: 'Kill politely?', options: ['KILL', 'TERM', 'STOP', 'CONT'], correctIndex: 1 },
    { question: 'Background operator?', options: ['|', '&', ';', '&&'], correctIndex: 1 },
    { question: 'Change priority of running pid?', options: ['nice', 'renice', 'ionice', 'prio'], correctIndex: 1 },
    { question: 'List open files of pid?', options: ['lsof -p', 'ps -o files', 'stat -p', 'open -p'], correctIndex: 0 },
  ],
  6: [
    { question: 'Secure password file?', options: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/login.defs'], correctIndex: 1 },
    { question: 'Add user to group?', options: ['usermod -aG', 'useradd -G+', 'groupadd -a', 'adduser -g'], correctIndex: 0 },
    { question: 'List groups?', options: ['groups', 'whoami', 'id -u', 'getent passwd'], correctIndex: 0 },
    { question: 'Set ACL read for bob?', options: ['setfacl -m u:bob:r', 'chmod +r bob', 'chown bob:r', 'setacl bob:r'], correctIndex: 0 },
    { question: 'Switch to user alice login shell?', options: ['su alice', 'su - alice', 'sudo alice', 'sudo -u alice'], correctIndex: 1 },
  ],
  7: [
    { question: 'Check service status?', options: ['systemctl status', 'service ls', 'journalctl status', 'sv status'], correctIndex: 0 },
    { question: 'Enable at boot?', options: ['systemctl enable', 'systemctl on', 'systemctl persist', 'service enable'], correctIndex: 0 },
    { question: 'Reload unit files?', options: ['systemctl daemon-reload', 'systemctl reload', 'systemctl restart', 'journalctl -R'], correctIndex: 0 },
    { question: 'View service logs live?', options: ['journalctl -u name -f', 'tail -f /etc/systemd', 'syslogctl -f', 'dmesg -f'], correctIndex: 0 },
    { question: 'List services?', options: ['systemctl list-units --type=service', 'service list', 'sv ls', 'initctl list'], correctIndex: 0 },
  ],
  8: [
    { question: 'Update apt metadata?', options: ['apt upgrade', 'apt update', 'apt refresh', 'apt sync'], correctIndex: 1 },
    { question: 'Install with dnf?', options: ['dnf add', 'dnf install', 'dnf get', 'dnf fetch'], correctIndex: 1 },
    { question: 'Remove with apt?', options: ['apt delete', 'apt uninstall', 'apt remove', 'apt purge'], correctIndex: 2 },
    { question: 'Arch package tool?', options: ['dnf', 'apt', 'pacman', 'zypper'], correctIndex: 2 },
    { question: 'Universal packages?', options: ['snap', 'deb', 'rpm', 'tar'], correctIndex: 0 },
  ],
  9: [
    { question: 'List block devices?', options: ['lsblk', 'blkid -l', 'fdisk', 'mount -l'], correctIndex: 0 },
    { question: 'Create ext4 FS?', options: ['mkfs.ext4', 'mkfs.ext3', 'mkfs.btrfs', 'mke2fs4'], correctIndex: 0 },
    { question: 'Persistent mounts file?', options: ['/etc/mounts', '/etc/fstab', '/etc/filesystems', '/etc/blkid.conf'], correctIndex: 1 },
    { question: 'Enable swapfile?', options: ['mkswap + swapon', 'mkfs.swap + mount', 'swapinit', 'sysctl swap on'], correctIndex: 0 },
    { question: 'Create PV for LVM?', options: ['pvcreate', 'vgcreate', 'lvcreate', 'mkpv'], correctIndex: 0 },
  ],
  10: [
    { question: 'Show current boot logs?', options: ['journalctl -b', 'journalctl -xe', 'dmesg -b', 'syslog -b'], correctIndex: 0 },
    { question: 'Set default target?', options: ['systemctl default', 'systemctl set-default', 'systemctl get-default', 'init 5'], correctIndex: 1 },
    { question: 'GRUB config file path?', options: ['/etc/grub', '/boot/grub/grub.cfg', '/etc/default/grub.cfg', '/boot/grub.conf'], correctIndex: 1 },
    { question: 'Errors priority filter?', options: ['-p err', '-p error', '-p critical', '-p warning'], correctIndex: 0 },
    { question: 'Kernel messages command?', options: ['dmesg', 'journalctl -k', 'both can', 'syslog -k'], correctIndex: 2 },
  ],
  11: [
    { question: 'List routes?', options: ['ip r', 'ip a', 'ss -l', 'route -a'], correctIndex: 0 },
    { question: 'Open port 22 with ufw?', options: ['ufw open 22', 'ufw allow 22/tcp', 'ufw add 22', 'iptables -A 22'], correctIndex: 1 },
    { question: 'List listening sockets?', options: ['ss -tulpn', 'ip a -l', 'lsof -n', 'netstat -rn'], correctIndex: 0 },
    { question: 'DNS servers file?', options: ['/etc/hosts', '/etc/resolv.conf', '/etc/nsswitch.conf', '/etc/dns.conf'], correctIndex: 1 },
    { question: 'Copy file to host?', options: ['ssh', 'scp', 'ftp', 'wget'], correctIndex: 1 },
  ],
  12: [
    { question: 'Strict error/undef handling?', options: ['set -euo pipefail', 'set -eux', 'set -uo', 'set -ef'], correctIndex: 0 },
    { question: 'Print arg1?', options: ['$0', '$1', '$@', '$*'], correctIndex: 1 },
    { question: 'Enable debug trace?', options: ['bash -x', 'bash -d', 'bash -t', 'bash -v-only'], correctIndex: 0 },
    { question: 'Define function?', options: ['function f{}', 'f(){ }', 'def f():', 'fn f {}'], correctIndex: 1 },
    { question: 'Loop over files?', options: ['for f in *', 'for * in f', 'loop * in f', 'each file'], correctIndex: 0 },
  ],
  13: [
    { question: 'Run alpine interactively?', options: ['docker run -it alpine sh', 'docker exec -it alpine', 'docker start alpine -it', 'docker open alpine'], correctIndex: 0 },
    { question: 'List containers?', options: ['docker containers', 'docker ps -a', 'docker list', 'docker ls'], correctIndex: 1 },
    { question: 'Build image tag demo?', options: ['docker make demo', 'docker build -t demo .', 'docker image demo', 'docker compile demo'], correctIndex: 1 },
    { question: 'Compose up?', options: ['docker compose up -d', 'docker-compose start', 'compose up -d', 'dc up -d'], correctIndex: 0 },
    { question: 'Logs of container id?', options: ['docker log id', 'docker logs <id>', 'docker out <id>', 'docker cat <id>'], correctIndex: 1 },
  ],
  14: [
    { question: 'Infra as code tool?', options: ['Terraform', 'Docker', 'curl', 'ssh'], correctIndex: 0 },
    { question: 'K8s CLI?', options: ['kube', 'kubectl', 'kctl', 'k8sctl'], correctIndex: 1 },
    { question: 'Monitoring stack?', options: ['Prometheus+Grafana', 'Jenkins+Maven', 'ELK', 'Zabbix only'], correctIndex: 0 },
    { question: 'Version control?', options: ['CVS', 'Subversion', 'Git', 'Mercurial'], correctIndex: 2 },
    { question: 'Container runtime?', options: ['systemd', 'containerd', 'Xorg', 'Wayland'], correctIndex: 1 },
  ],
};

// Command index: maps Linux commands/keywords → module ID
// Used by the search box to find the right module for a command.
window.CommandIndex = {
  // 1 – Navigation Basics
  'ls':1,'cd':1,'pwd':1,'mkdir':1,'tree':1,'rmdir':1,
  'absolute path':1,'relative path':1,'filesystem':1,

  // 2 – Super User & File Operations
  'sudo':2,'su':2,'chmod':2,'chown':2,'chgrp':2,
  'cp':2,'mv':2,'rm':2,'touch':2,'ln':2,'tar':2,'gzip':2,'zip':2,
  'find':2,'locate':2,'file':2,'stat':2,'umask':2,
  'permissions':2,'symlink':2,'archive':2,

  // 3 – Text Processing & Streams
  'cat':3,'less':3,'more':3,'head':3,'tail':3,
  'grep':3,'awk':3,'sed':3,'cut':3,'sort':3,'uniq':3,
  'wc':3,'tr':3,'tee':3,'xargs':3,'diff':3,'nl':3,
  'pipe':3,'redirect':3,'stdin':3,'stdout':3,'stderr':3,

  // 4 – System Monitoring
  'top':4,'htop':4,'free':4,'df':4,'du':4,'uptime':4,'vmstat':4,
  'iostat':4,'sar':4,'watch':4,'last':4,'who':4,'w':4,
  'monitoring':4,'memory':4,'cpu':4,'load average':4,

  // 5 – Process Management
  'ps':5,'kill':5,'killall':5,'pkill':5,'pgrep':5,
  'jobs':5,'fg':5,'bg':5,'nice':5,'renice':5,
  'nohup':5,'lsof':5,'pstree':5,'strace':5,
  'process':5,'signal':5,'sigterm':5,'sigkill':5,

  // 6 – Users & Groups
  'useradd':6,'userdel':6,'usermod':6,'passwd':6,
  'groupadd':6,'groupdel':6,'groups':6,'id':6,'whoami':6,
  'adduser':6,'deluser':6,'getent':6,'setfacl':6,'getfacl':6,
  'shadow':6,'/etc/passwd':6,'acl':6,

  // 7 – Services
  'systemctl':7,'journalctl':7,'service':7,'systemd':7,
  'enable':7,'disable':7,'start':7,'stop':7,'restart':7,
  'unit file':7,'timer':7,

  // 8 – Package Management
  'apt':8,'apt-get':8,'dpkg':8,'dnf':8,'yum':8,
  'pacman':8,'zypper':8,'snap':8,'flatpak':8,'pip':8,
  'install':8,'upgrade':8,'package':8,'repository':8,

  // 9 – Disks & Filesystems
  'fdisk':9,'parted':9,'lsblk':9,'blkid':9,'mount':9,'umount':9,
  'mkfs':9,'fsck':9,'fstab':9,'lvm':9,'pvcreate':9,'vgcreate':9,'lvcreate':9,
  'swap':9,'mkswap':9,'swapon':9,'partition':9,'ext4':9,'btrfs':9,'xfs':9,

  // 10 – Boot & Logs
  'grub':10,'dmesg':10,'systemd-analyze':10,
  'initramfs':10,'update-grub':10,
  'boot':10,'log':10,'kernel':10,'runlevel':10,'init':10,

  // 11 – Networking
  'ip':11,'ifconfig':11,'ping':11,'traceroute':11,'netstat':11,
  'ss':11,'nmap':11,'curl':11,'wget':11,'ssh':11,'scp':11,'rsync':11,
  'ufw':11,'iptables':11,'nft':11,'dig':11,'nslookup':11,'host':11,'nc':11,
  'dns':11,'firewall':11,'route':11,'tcp':11,'udp':11,

  // 12 – Shell Scripting
  'bash':12,'sh':12,'zsh':12,'shebang':12,'cron':12,'crontab':12,
  'variable':12,'function':12,'loop':12,'if':12,'case':12,
  'array':12,'regex':12,'heredoc':12,'trap':12,'exit code':12,
  'script':12,'automation':12,'pipefail':12,

  // 13 – Containerization
  'docker':13,'docker-compose':13,'compose':13,'dockerfile':13,
  'podman':13,'kubectl':13,'kubernetes':13,'k8s':13,'helm':13,
  'container':13,'image':13,'registry':13,'volume':13,

  // 14 – Continue Learning
  'terraform':14,'ansible':14,'ci/cd':14,'devops':14,
  'prometheus':14,'grafana':14,'sre':14,'infrastructure':14,
};

