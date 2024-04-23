terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.34.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}


resource "aws_security_group" "todo_list_security_group" {
  name        = "todo_list_security_group"
  description = "Security group for todo list instance"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "todo_list_security_group"
  }
}

resource "aws_instance" "todo_list_instance" {
  ami                    = "ami-007020fd9c84e18c7"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.todo_list_security_group.id]
  key_name               = "next_task_key"

  root_block_device {
    volume_size = 30
  }

  tags = {
    Name = "todo_list_instance"
  }
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.todo_list_instance.id
  allocation_id = "eipalloc-0c7cff3c9e197823a"
}
