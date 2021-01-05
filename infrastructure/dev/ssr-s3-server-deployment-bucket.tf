resource "aws_s3_bucket" "api_deployment_bucket" {
  bucket = var.serverless_deployment_bucketname
}
