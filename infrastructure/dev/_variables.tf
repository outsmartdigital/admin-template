variable "region" {
  type = string
  default = "us-east-1"
}

variable "stage" {
  type = string
  default = "dev"
}

variable "serverless_deployment_bucketname" {
  type = string
  default = "template-web-react-server-dev"
}

variable "ssg_website_bucketname" {
  type = string
  default = "template-web-react-ssg-dev"
}

variable "static_assets_bucketname" {
  type = string
  default = "template-web-react-static-assets-dev"
}

variable "api_gateway_name" {
  type = string
  default = "Template Web React Web Server Api Dev"
}





