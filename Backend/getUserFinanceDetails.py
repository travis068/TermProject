import json
import boto3
import os

# AWS Credentials
AWS_REGION =  os.environ['AWSREGION']

# DynamoDB database name
DYNAMO_DB_NAME = os.environ['DYNAMODBNAME']

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)


def lambda_handler(event, context):
    try:
        data = json.loads(event.get('body'))
        partition_key_value = data.get('email')
        print(partition_key_value)

        table = dynamodb.Table(DYNAMO_DB_NAME)

        # Perform the DynamoDB get operation
        response = table.query(
            KeyConditionExpression='email = :val',
            ExpressionAttributeValues={
                ':val': partition_key_value
            }
        )

        # Check if the item was found
        if 'Items' in response and response['Items']:
            item = response['Items']
            return {
                'statusCode': 200,
                'body': json.dumps(item)
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Item not found')
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
