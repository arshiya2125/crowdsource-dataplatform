#!/bin/bash
echo """
runtime: nodejs
env: flex

manual_scaling:
  instances: 1
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10
env_variables:
  DB_HOST: \"/cloudsql/$DB_HOST\"
  DB_USER: \"$DB_USER\"
  DB_NAME: \"$TEST_DB_NAME\"
  DB_PASS: \"$DB_PASS\"
  BUCKET_NAME: \"$BUCKET_NAME/test/\"
  ENCRYPTION_KEY: \"$ENCRYPTION_KEY\"

beta_settings:
  cloud_sql_instances: \"$DB_HOST\"
"""