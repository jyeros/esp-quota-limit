# ESP Test Quota at OpenApi document

## Prerequisites to test it

1. Create a Google Cloud Platform Project and specify get ProjectId.
Specify ProjectId at host property in echoApi/spec.yaml and docker-compose.yml in services.esp.command as --service value.
The projectId in this example was example-project-317294.appspot.com.

1. [Create a service account](https://cloud.google.com/endpoints/docs/openapi/running-esp-localdev#create_service_account) for ESP and save service account json file to `credentials/service-account.json`.

1. Grant permissions to a client with api key and access-token, create an `.env` file based on `.env.tpl` and provide credentials.

## Issue
The [quotas](https://cloud.google.com/endpoints/docs/openapi/quotas-configure) is per minute, so if we get status code `429 Too Many Request` and we wait a minute we should be fine but after we wait a minute the next request has status code `429`, it happens even if we wait more than twice like `150` seconds. This repo reproduce the error. If see github action workflow run, there is one waiting `61` seconds with the issue and other waiting `150` with the same issue, also it happens to ESP and ESPv2.

### Logs waiting 61 seconds
[Github actions logs](https://github.com/jyeros/esp-quota-limit/actions/runs/728241876), for esp v1 we can see the issue [here](https://github.com/jyeros/esp-quota-limit/runs/2293512829?check_suite_focus=true#step:7:821) and for esp v2 we can see the issue [here](https://github.com/jyeros/esp-quota-limit/runs/2293512829?check_suite_focus=true#step:8:796)

### Logs waiting 150 seconds
[Github actions logs](https://github.com/jyeros/esp-quota-limit/actions/runs/728241876), for esp v1 we can see the issue [here](https://github.com/jyeros/esp-quota-limit/runs/2293547100?check_suite_focus=true#step:7:1543) and for esp v2 we can see the issue [here](https://github.com/jyeros/esp-quota-limit/runs/2293547100?check_suite_focus=true#step:8:611)
