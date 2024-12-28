terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 5.10.0"
      }
    }
}

provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_instance" "jenkins20_ec2" {
  ami = "ami-06d753822bd94c64e"
  instance_type = "t2.micro"

  tags = {
    Name = "Jenkins20"
  }
}

