from testrail import *
import os
from time import sleep

client = APIClient('https://testrail.devfactory.com/')
client.user = os.environ['AD_USER']
client.password = os.environ['AD_PASSWORD']

with open('file-with-test-cases-to-update.csv', 'r') as f:
    lines = f.readlines()
    i = 1
    for line in lines:
        id = line.split(',')[0]
        from_status = line.split(',')[1]
        to_status = line.split(',')[2].replace("\n","")
        print("[{0} of {1}] updating {2} to {4}".format(i, len(lines) + 1, id, from_status, to_status))
        result = client.send_post("update_case/{0}".format(id), { 'custom_tc_status': to_status, 'comment': 'Updating status based on linked JIRA issue status' })
        #sleep(0.01)
        i = i + 1
