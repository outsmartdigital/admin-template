resource "aws_s3_bucket" "ssg_deployment_bucket" {
  bucket = var.ssg_website_bucketname
  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Id": "Policy1463609830166",
    "Statement": [
        {
            "Sid": "Stmt1463609824217",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.ssg_website_bucketname}/*"
        }
    ]
}
  POLICY
}
