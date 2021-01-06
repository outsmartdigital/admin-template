terraform {
  backend "s3" {
    bucket = "terraform-outsmart"
    region = "us-east-1"
    key    = "template-web-react/dev"
  }
}

provider "aws" {
  region = "us-east-1"
}
