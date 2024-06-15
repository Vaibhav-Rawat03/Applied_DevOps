# Applied DevOps Project : **Next Task**

We have creating a **to-do list** app using **Next.js** and **TypeScript**

For frontend docker image click [here](https://hub.docker.com/repository/docker/deepanshurawat6/to-do-list-frontend/general)

## Setup for IaC

### Infrastructure Provisioning

Before following the setups, first configure the `aws-cli`, and install `terraform` in your from [here]()

Now, follow the steps below to replicate the infrastructure:

1. Go to the `iac/terraform/server` directory:

    ```bash
    cd iac/terraform/server
    ```

2. Initialize the backend for terraform(use latest version):

    ```bash
    terraform init
    ```

3. To check for the resources being created:

    ```bash
    terraform plan
    ```

4. Finally, apply the changes and the infrastructure mentioned in the `main.tf` file:
    
    ```bash
    terraform apply
    ```

### Configuration Management

Before following the setups, first install `ansible` in your local system, from [here]()

Now, follow the steps below to manage the latest configurations:

1. Go to the `iac/ansible` directory:

    ```bash
    cd iac/anisble
    ```

2. Manage the configuration by this simple command:

    ```bash
    ansible-playbook -i hosts.ini to-do.yaml
    ```

#### We can SSH into the instance, to check for the configurations:

```bash
ssh -i "my-ssh-key.pem" ubuntu@ec2-3-109-19-12.ap-south-1.compute.amazonaws.com
```
