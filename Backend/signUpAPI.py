import hashlib
import json
import boto3
import os

# AWS Credentials
AWS_REGION =  os.environ['AWSREGION']

# DynamoDB database name
DYNAMO_DB_NAME = os.environ['DYNAMODBNAME']

topic_arn = os.environ['topic_arn']

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
sns = boto3.client("sns", region_name=AWS_REGION)


def lambda_handler(event, context):
    userCredentials = json.loads(event.get('body'))

    email = userCredentials.get('email')
    password = userCredentials.get('password')
    last_name = userCredentials.get('last_name')
    first_name = userCredentials.get('first_name')

    if not email or not password or not last_name or not first_name:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing required attributes'),
            'headers': {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : True
            }
        }

        table = dynamodb.Table(DYNAMO_DB_NAME)

        table.put_item(
            Item={
                'email': email,
                'password': hashlib.sha256(password.encode('utf-8')).hexdigest(),
                'lastName': last_name,
                'firstName': first_name
            }
        )

        message = "A new user has been added!"

        sns.publish(TopicArn=topic_arn, Message=message)

        return {
            'statusCode': 200,
            'body': json.dumps('User data added to DynamoDB'),
            'headers': {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            }
        }
