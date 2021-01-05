resource "aws_s3_bucket" "static_assets_bucket" {
  bucket = var.static_assets_bucketname
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
            "Resource": "arn:aws:s3:::${var.static_assets_bucketname}/*"
        }
    ]
}
  POLICY
}
