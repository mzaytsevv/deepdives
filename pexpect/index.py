import pexpect
from pexpect import pxssh
import getpass


s = pxssh.pxssh(options={
                    "StrictHostKeyChecking": "no",
                    "UserKnownHostsFile": "/dev/null"}, encoding = "utf-8")
s.login ("10.170.18.112", "admin", "exinda", auto_prompt_reset=False, spawn_local_ssh = True)
s.original_prompt = "[\w\-]+ >"
s.sendline('show whoami')
s.sendline('en')
s.sendline('config t')
s.sendline('no monitor dual-bridge-bypass')
s.prompt()
with open("out", "w") as f:
    f.write(s.before)
print(s.before)  
