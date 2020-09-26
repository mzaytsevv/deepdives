from testrail import *
import os

 
client = APIClient('https://testrail.devfactory.com/')
client.user = os.environ['AD_USER']
client.password = os.environ['AD_PASSWORD']

project_id = 321

cases = []
E2Es = []
cases_to_update = []

with open('MANAGERS_24737_E2E', 'r') as f:
    E2Es = f.readlines()

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
    status = case.get("custom_tc_status")
    refs = case.get("refs")
    for e2e in E2Es:
        if(e2e.replace('\n','') == refs):
            with open('MANAGERS_24737_TC', 'a') as f:
                f.write("{0},{1},{2}\n".format(id, status, "9"))