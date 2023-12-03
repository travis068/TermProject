import hashlib
import json
import boto3
from boto3.dynamodb.conditions import Key
import os

# AWS Credentials
AWS_REGION =  os.environ['AWSREGION']

# DynamoDB database name
DYNAMO_DB_NAME = os.environ['DYNAMODBNAME']

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)


def lambda_handler(event, context):
    login_data = json.loads(event.get('body'))

    email = login_data.get('email')
    password = login_data.get('password')

    if not email or not password:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing required attributes')
        }

    table = dynamodb.Table(DYNAMO_DB_NAME)

    response = table.query(
        KeyConditionExpression=Key('email').eq(email)
    )

    if 'Items' in response and response['Items']:
        user = response['Items'][0]
        if user['password'] == hashlib.sha256(password.encode('utf-8')).hexdigest():
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'email': user['email'],
                    'last_name': user['lastName'],
                    'first_name': user['firstName']
                })
            }
        else:
            return {
                'statusCode': 401,
                'body': json.dumps('Incorrect password')
            }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps('User not found')
        }