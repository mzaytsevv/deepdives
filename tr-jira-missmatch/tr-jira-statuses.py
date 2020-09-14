from testrail import *
import os
import json
from jira import JIRA
import re

 
client = APIClient('https://testrail.devfactory.com/')
client.user = os.environ['AD_USER']
client.password = os.environ['AD_PASSWORD']





def status_by_id(id):
    if(id == 1):
      return "New"
    if(id == 2):
      return "Pending Approval"
    if(id == 3):
      return "Approved for Automation"
    if(id == 4):
      return "Pending Automation"
    if(id == 5):
      return "Automated"
    if(id == 6):
      return "Rejected"
    if(id == 7):
      return "Automation in progress"
    if(id == 8):
      return "Cancelled"
    if(id == 9):
      return "Approved for Testing"
    if(id == 10):
      return "Definition in progress"
    if(id == 11):
      return "Pending review"
    if(id == 12):
      return "In review"
    if(id == 13):
      return "Automated_JRF"
    if(id == 14):
      return "Covered by API automation"
    if(id == 15):
      return "Approved for API Automation"
    if(id == 16):
      return "Automated API"
    if(id == 17):
      return "Blocked"
    return "Unknown"

def get_chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def inBlackList(key):
    if(key == 'CRMPAD-1146' or 
    ('-0' in key) or
    (key == 'GFIME-4889') or
    (key == 'GFIME-5037') or
    (key == 'GFIME-3542') or
    (key == 'GFIME-4646') or 
    (key == 'EXOS-4117') or
    (key == 'RESPTK-240611' or 
    (key == 'SNSGCID-54404') or
    (key == 'AWORK-34333') or
    (key == 'AWORK-40186') or
    (key == 'AWORK-38709') or
    (key == 'AWORK-39635')
    )):
        print("{0} is in black list, skipping".format(key))
        return True
    return False    

#574 - fails because key doesn't exist
#523 - fails because key doesn't exist
#530 - fails because key doesn't exist
#596 - fails because key doesn't exist 
#365 - fails because key doesn't exist 
#343 - fails because key doesn't exist 
#535 - fails because key doesn't exist 
#393 - fails because key doesn't exist 
#520 - fails because key doesn't exist 
#332 - fails because key doesn't exist 
#342 - fails because key doesn't exist 

project_ids = []


for project_id in project_ids:

    print("processing project: {0}".format(project_id))

    cases = []
    automated_cases = []
    jira_issues = []

    suites = client.send_get('get_suites/{0}'.format(project_id))
    print("\nloaded {0} suites".format(len(suites)))

    for suite in suites:
        print(" loading test cases from suite '{0}': ".format(suite['name']), end="")
        loaded_cases = client.send_get('get_cases/{0}&suite_id={1}'.format(project_id,suite['id']));
        for loaded_case in loaded_cases:
            cases.append(loaded_case)
        print("OK")

    for case in cases:
        id = case.get("id")
        status = status_by_id(case.get("custom_tc_status"))
        refs = case.get("refs")
        if(status == "Automated"):
            automated_cases.append({"id":case.get("id"), "status": status, "refs" : case.get("refs")})
            #print("{0} : {1} : {2}".format(id, status, refs))

    print("\nloading statuses for {0} JIRA refs".format(len(automated_cases)))
    options = {"server": "https://jira.devfactory.com/"}
    jira = JIRA(options, basic_auth=(os.environ['AD_USER'],os.environ['AD_PASSWORD']))    
    chunk_size = 50
    chunks = get_chunks(automated_cases, chunk_size)
    i = 0
    for chunk in list(chunks):
        i = i+1
        print(" chunk {0} of {1} loaded".format(i, round(len(automated_cases)/chunk_size)+1))
        keys = []
        filtered_keys = []    
        for item in chunk:
            if(item.get('refs') != None):
                keys.append(item.get('refs'))
        jira_key_pattern = re.compile('^((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)$')
        for key in keys:
            if(jira_key_pattern.match(key)):
                matched_key = jira_key_pattern.findall(key)[0][0]
                if(inBlackList(matched_key) == False):
                    filtered_keys.append(matched_key)
        if(len(filtered_keys) == 0):
            break
        for issue in jira.search_issues('key in ({0})'.format(", ".join(filtered_keys)), maxResults=1000):
            jira_issues.append({"key" : issue.key, "status" : issue.fields.status.name}.copy())

    for case in automated_cases:
        for jira_issue in jira_issues:
            if(case.get("refs") == jira_issue.get("key")):
                if(jira_issue.get("status") != "Done"):
                    line = "{0}:{1} -> {2}:{3}".format(case.get("id"), case.get("status"), jira_issue.get("key"), jira_issue.get("status"))
                    print(line)
                    with open('tc_e2e_missmatch', 'a') as f:
                        f.write(line + "\n")
                    break

