resource "aws_api_gateway_rest_api" "graphql_api" {
  name = var.api_gateway_name
}

//resource "aws_api_gateway_domain_name" "api_domain_name" {
//  certificate_arn = var.certificate_arn
//  domain_name     = var.api_domain_name
//}
//
//resource "aws_api_gateway_base_path_mapping" "graphqlapi_base_mapping" {
//  api_id = aws_api_gateway_rest_api.graphql_api.id
//  domain_name = var.api_domain_name
//  stage_name = var.stage
//}

# Example DNS record using Route53.
# Route53 is not specifically required; any DNS host can be used.
//resource "aws_route53_record" "route53_domain_record" {
//  name    = aws_api_gateway_domain_name.api_domain_name.domain_name
//  type    = "A"
//  zone_id = var.hosted_zone_id
//
//  alias {
//    evaluate_target_health = true
//    name                   = aws_api_gateway_domain_name.api_domain_name.cloudfront_domain_name
//    zone_id                = aws_api_gateway_domain_name.api_domain_name.cloudfront_zone_id
//  }
//}
