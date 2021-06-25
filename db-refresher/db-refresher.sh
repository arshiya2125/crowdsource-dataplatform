#!/bin/bash
echo "Db refresh Initiating...";
cd /usr/src/app/tb_files

DB_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}"
CONNECTION_URI=$(urlencode -m "$DB_URL")

psql $CONNECTION_URI -f /usr/src/app/db_refresh.sql
echo "Db refresh Complete!"
psql $CONNECTION_URI -f /usr/src/app/db_queries.sql
echo "Jsons update Complete!"
ls -lrt

keyctl session

ls -al /usr/src/app/utils/

/usr/src/app/utils/azcopy login --tenant-id ${AZURE_TENANT_ID} --service-principal --application-id ${AZURE_APP_ID}

/usr/src/app/utils/azcopy copy "./*" "${AZURE_ACC_URL}/${BUCKET_NAME}/aggregated-json/" --recursive --include-pattern "*json"
