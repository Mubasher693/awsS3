import boto3
import uuid

s3_resource = boto3.resource('s3')
s3_client = boto3.client('s3')


class S3(object):
    bucket_name = ''
    bucket_prefix = ''

    def __init__(self, bucket_name, bucket_prefix):
        print('start')
        self.bucket_name = bucket_name
        self.bucket_prefix = bucket_prefix

    def run(self):
        buckets = s3_resource.buckets.all()
        # Print out bucket names
        s3.create_bucket(self.bucket_name, self.bucket_prefix)

    # Used to create bucket
    def create_bucket(self, arg_bucket_name, arg_bucket_prefix):
        session = boto3.session.Session()
        current_region = session.region_name
        bucket_name = s3.create_bucket_name(arg_bucket_name, arg_bucket_prefix)
        bucket_response = s3_resource.meta.client.create_bucket(
            Bucket=bucket_name,
            CreateBucketConfiguration={
                'LocationConstraint': current_region})
        print(bucket_name, current_region)
        return bucket_name, bucket_response

    # Helper methods
    def create_bucket_name(self, arg_bucket_name, arg_bucket_prefix):
        # The generated bucket name must be between 3 and 63 chars long
        return ''.join([arg_bucket_name, arg_bucket_prefix])

    # Helper methods
    def create_temp_file(self, size, file_name, file_content):
        random_file_name = ''.join([str(uuid.uuid4().hex[:6]), file_name])
        with open(random_file_name, 'w') as f:
            f.write(str(file_content) * size)
        return random_file_name


if __name__ == '__main__':
    s3 = S3('test', '-123abcxyzadse232')
    s3.run()
