resource "null_resource" "lambda_dependencies" {
  provisioner "local-exec" {
    command = "cd ../${path.module}/backend/rentit && npm install"
  }

  triggers = {
    index = sha256(file("../${path.module}/backend/rentit/index.js"))
    package = sha256(file("../${path.module}/backend/rentit/package.json"))
    lock = sha256(file("../${path.module}/backend/rentit/package-lock.json"))
    node = sha256(join("",fileset("../${path.module}", "backend/rentit/**/*.js")))
  }
}

data "null_data_source" "wait_for_lambda_exporter" {
  inputs = {
    lambda_dependency_id = "${null_resource.lambda_dependencies.id}"
    source_dir           = "../${path.module}/backend/rentit/"
  }
}

data "archive_file" "lambda_package" {
  output_path = "${path.module}/lambda-bundle.zip"
  source_dir  = "${data.null_data_source.wait_for_lambda_exporter.outputs["source_dir"]}"
  type        = "zip"
}

resource "aws_lambda_function" "rentit_lambda" {
  filename = "${path.module}/lambda-bundle.zip"
  function_name = "RentIt"
  role = aws_iam_role.lambda_role.arn
  handler = "index.handler"
  runtime = "nodejs20.x"
  source_code_hash = data.archive_file.lambda_package.output_base64sha256
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
    {
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }
  ]
})
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role = aws_iam_role.lambda_role.name
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rentit_lambda.function_name
  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.my_api.execution_arn}/*/*/*"
}