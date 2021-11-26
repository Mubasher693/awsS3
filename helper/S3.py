import uuid


# Helper methods
def create_bucket_name(bucket_prefix, bucket_name):
    # The generated bucket name must be between 3 and 63 chars long
    return ''.join([bucket_prefix, bucket_name])


# Helper methods
def create_temp_file(size, file_name, file_content):
    random_file_name = ''.join([str(uuid.uuid4().hex[:6]), file_name])
    with open(random_file_name, 'w') as f:
        f.write(str(file_content) * size)
        return random_file_name
