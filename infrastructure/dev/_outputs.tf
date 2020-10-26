output "webserver_deploy_bucketname" {
  value = var.serverless_deployment_bucketname
}

output "static_assets_bucket_name" {
  value = var.static_assets_bucketname
}

output "ssg_deploy_bucketname" {
  value = var.ssg_website_bucketname
}

output "webserver_api_restapi_id" {
  value = aws_api_gateway_rest_api.graphql_api.id
}

output "webserver_api_rootresource_id" {
  value = aws_api_gateway_rest_api.graphql_api.root_resource_id
}

output "cloudfront_ssr_static_assets_domain_name" {
  value = aws_cloudfront_distribution.cf_static_assets_distribution.domain_name
}

output "cloudfront_ssg_domain_name" {
  value = aws_cloudfront_distribution.cf_ssg_website.domain_name
}

output "ssg_website_url" {
  value = aws_s3_bucket.ssg_deployment_bucket.website_endpoint
}
