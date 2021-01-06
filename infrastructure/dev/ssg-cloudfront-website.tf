locals {
//  domain = "storage.dev.outsmartdigital.com"
}

resource "aws_cloudfront_distribution" "cf_ssg_website" {
  enabled = true
  default_root_object = "index.html"
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "origin-${aws_s3_bucket.ssg_deployment_bucket.bucket}"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  origin {
    domain_name = aws_s3_bucket.ssg_deployment_bucket.website_endpoint
    origin_id = "origin-${aws_s3_bucket.ssg_deployment_bucket.bucket}"
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

//resource "aws_route53_record" "r53-cloudfront-storage-alias" {
//  name = local.domain
//  type = "A"
//  zone_id = var.hosted_zone_id
//
//  alias {
//    name                   = aws_cloudfront_distribution.cf-storage-distribution.domain_name
//    zone_id                = aws_cloudfront_distribution.cf-storage-distribution.hosted_zone_id
//    evaluate_target_health = true
//  }
//}
