import logging
import boto3, os
from botocore.exceptions import ClientError

s3_resource = boto3.resource('s3')
s3_client = boto3.client('s3')


class S3(object):
    bucket_name = ''

    def __init__(self, bucket_name):
        print('start')
        self.bucket_name = bucket_name

    def run(self):
        """Create a S3 Bucket
        :return: True if created or already exists, else False
        """
        try:
            if s3_resource.Bucket(self.bucket_name) in s3_resource.buckets.all():
                return True
            else:
                session = boto3.session.Session()
                current_region = session.region_name
                bucket_response = s3_resource.meta.client.create_bucket(
                    Bucket=self.bucket_name,
                    CreateBucketConfiguration={
                        'LocationConstraint': current_region})
                return True
        except Exception as e:
            logging.error(e)
            raise Exception(e)

    def upload_file(self, file_name, object_name=None):
        """Upload a file to an S3 bucket
        :param file_name: File to upload
        :param object_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
        """

        # If S3 object_name was not specified, use file_name
        if object_name is None:
            object_name = os.path.basename(file_name)

        # Upload the file
        try:
            response = s3_client.upload_file(file_name, self.bucket_name, object_name)
        except ClientError as e:
            logging.error(e)
            raise Exception(e)
        return True
