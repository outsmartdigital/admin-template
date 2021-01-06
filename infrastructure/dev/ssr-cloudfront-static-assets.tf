locals {
//  domain = "storage.dev.outsmartdigital.com"
}

resource "aws_cloudfront_distribution" "cf_static_assets_distribution" {
  enabled = true
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.static_assets_bucket.id
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
    domain_name = aws_s3_bucket.static_assets_bucket.bucket_regional_domain_name
    origin_id = aws_s3_bucket.static_assets_bucket.id
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
