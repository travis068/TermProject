import json
import boto3
import os

# AWS Credentials
AWS_REGION =  os.environ['AWSREGION']

# DynamoDB database name
DYNAMO_DB_NAME = os.environ['DYNAMODBNAME']

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)


def lambda_handler(event, context):
    user_data = json.loads(event.get('body'))

    partition_key = user_data.get('email')
    sort_key = user_data.get('entry_date')
    print(partition_key)
    print(sort_key)

    try:
        table = dynamodb.Table(DYNAMO_DB_NAME)

        user_data.pop('email', None)
        user_data.pop('entry_date', None)

        response = table.put_item(
            Item={
                'email': partition_key,
                'entry_date': sort_key,
                **user_data
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Item added to DynamoDB successfully')
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
