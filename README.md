
# 🚀 End-to-End DevSecOps Platform: Terraform Infrastructure, Secure CI/CD Pipeline and GitOps Deployment


![Terraform](https://img.shields.io/badge/Terraform-Infrastructure_as_Code-844FBA?logo=terraform)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes)
![K3s](https://img.shields.io/badge/K3s-Lightweight_Kubernetes-FFC61C)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-orange?logo=argo)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker)
![Docker Hub](https://img.shields.io/badge/Docker_Hub-Container_Registry-2496ED?logo=docker)
![SonarQube](https://img.shields.io/badge/SonarQube-Code_Quality-F3702A?logo=sonarqube)
![Trivy](https://img.shields.io/badge/Trivy-Security_Scanning-blue)
![GitLeaks](https://img.shields.io/badge/GitLeaks-Secret_Scanning-red)
![SBOM](https://img.shields.io/badge/SBOM-Software_Supply_Chain_Security-green)


# Overview

The **End-to-End DevSecOps Platform** is a complete automation solution that demonstrates how modern engineering teams build, secure, and deploy cloud-native applications using DevOps and GitOps best practices.

This project implements a complete software delivery lifecycle by combining:

* Infrastructure as Code (IaC)
* Continuous Integration
* Continuous Security Testing
* Containerization
* Kubernetes Deployment
* GitOps Production Delivery


The platform uses **Terraform** to provision the required infrastructure, creates a Kubernetes cluster using **K3s**, automates application delivery through **GitHub Actions**, and manages production deployments using **Argo CD**.

The infrastructure layer provisions three virtual machines that are used to create the Kubernetes environment. After provisioning, K3s is installed to create a lightweight Kubernetes cluster capable of running containerized applications.

The CI/CD pipeline is implemented using GitHub Actions and follows a complete DevSecOps workflow.

The pipeline performs multiple validation and security stages including:

* GitLeaks for secret detection.
* Checkov for Infrastructure as Code security scanning.
* Linting for code quality validation.
* Trivy for container vulnerability scanning.
* SonarQube for static code analysis.
* SBOM generation for software supply chain visibility.


After all security and quality checks pass, the pipeline:

* Builds the Docker image.
* Tags the image version.
* Pushes the image to Docker Hub.
* Updates Kubernetes deployment manifests.
* Deploys applications into development and staging environments.


Production deployment follows GitOps principles using Argo CD.

Instead of directly deploying to production from the CI pipeline, the pipeline updates the Kubernetes YAML configuration stored in Git. Argo CD continuously monitors the production repository and automatically synchronizes the desired state with the Kubernetes cluster.


This project represents a real-world enterprise DevSecOps workflow where infrastructure provisioning, application delivery, security validation, and production deployment are fully automated.


---

# Business Value

Modern DevOps teams face several challenges when building and delivering applications:

| Challenge | Impact |
|-----------|--------|
| Manual infrastructure provisioning | Slow environment creation |
| Manual application deployments | Human errors and inconsistent releases |
| Security testing performed after deployment | Increased security risks |
| Lack of automated container delivery | Slow release cycles |
| Direct production deployments | Lack of governance |
| Configuration drift between environments | Deployment failures |
| No GitOps workflow | Difficult rollback and poor visibility |
| Manual Kubernetes management | Increased operational workload |


This platform solves these challenges by providing:

* Automated infrastructure provisioning using Terraform.
* Automated Kubernetes cluster creation using K3s.
* Secure CI/CD pipelines using GitHub Actions.
* Integrated security and quality validation.
* Automated Docker image creation and publishing.
* Multi-environment deployment workflow.
* GitOps-based production delivery using Argo CD.
* Version-controlled infrastructure and application changes.


---

# Problem & Solution

| Problem | Solution |
|---------|----------|
| Manual server provisioning | Terraform automatically creates infrastructure |
| Manual Kubernetes installation | K3s cluster creation is automated |
| Developers manually build images | GitHub Actions builds and publishes images |
| Security checks performed manually | DevSecOps tools integrated into CI pipeline |
| Vulnerable container images | Trivy scans images before deployment |
| Poor code quality visibility | SonarQube provides static analysis |
| Exposed secrets in repositories | GitLeaks detects sensitive information |
| Manual Kubernetes deployments | Automated deployment workflows |
| Production deployment risks | Argo CD manages production using GitOps |
| Configuration differences | Kubernetes manifests stored in Git |


---

# Architecture Overview

The platform consists of four major components:


## 1. Infrastructure Layer

Terraform is used to provision the infrastructure required for the Kubernetes environment.


The infrastructure consists of:

* Three virtual machines.
* Network configuration.
* Kubernetes cluster nodes.
* K3s installation environment.


Terraform provides:

* Repeatable infrastructure creation.
* Version-controlled infrastructure changes.
* Automated environment provisioning.
---

## 2. CI/CD Pipeline Layer

GitHub Actions provides the automated software delivery pipeline.


The pipeline performs:


* Source code checkout.
* Application testing.
* GitLeaks secret scanning.
* Checkov security scanning.
* Code linting.
* SonarQube analysis.
* Trivy vulnerability scanning.
* SBOM generation.
* Docker image build.
* Docker image push to Docker Hub.
The pipeline ensures that only validated and secure application changes move forward.
---

## 3. Deployment Layer

The deployment workflow manages application delivery across multiple environments.

Development and staging deployments are automated through GitHub Actions.


Production deployment uses GitOps with Argo CD.


---

## 4. GitOps Production Layer

Production deployments are managed using Argo CD.


Argo CD:

* Connects to the production Git repository.
* Monitors Kubernetes manifests.
* Detects configuration changes.
* Synchronizes application state.
* Deploys applications automatically.
* Provides deployment history and rollback capability.
---

# System Architecture

The complete platform architecture combines infrastructure automation, CI/CD security validation, container delivery, and GitOps-based production deployment.
# 🛠️ Technology Stack

The project uses modern DevOps, cloud-native, and security technologies to implement a complete enterprise software delivery platform.

| Technology | Purpose |
|------------|---------|
| Terraform | Infrastructure as Code for provisioning virtual machines and infrastructure |
| K3s | Lightweight Kubernetes distribution used to create the cluster |
| Kubernetes | Container orchestration platform |
| GitHub Actions | CI/CD automation platform |
| Docker | Container image creation and packaging |
| Docker Hub | Container image registry |
| Argo CD | GitOps continuous delivery and production deployment |
| GitLeaks | Secret detection and prevention |
| Checkov | Infrastructure as Code security scanning |
| SonarQube | Static code analysis and quality management |
| Trivy | Container vulnerability scanning |
| SBOM | Software supply chain visibility |
| Git | Source control and deployment tracking |
---

# 📂 Project Structure

The repository follows a DevOps-friendly structure separating infrastructure provisioning, application deployment, security configuration, and automation workflows.


```
End-to-End-DevSecOps-Platform

│
├── .github/
│   │
│   └── workflows/
│       │
│       ├── ci-pipeline.yaml
│       └── cd-pipeline.yaml
│
├── terraform/
│   │
│   ├── main.tf
│   ├── providers.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── modules/
│
├── kubernetes/
│   │
│   ├── dev/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   │
│   ├── stage/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   │
│   └── prod/
│       ├── deployment.yaml
│       └── service.yaml
│
├── docker/
│   │
│   └── Dockerfile
│
├── security/
│   │
│   ├── gitleaks/
│   ├── checkov/
│   ├── trivy/
│   └── sonar/
│
├── scripts/
│
└── README.md

```
---

# ⚙️ Infrastructure Provisioning With Terraform

Terraform is used to automate the creation of the infrastructure required for the Kubernetes platform.
Instead of manually creating servers, Terraform provides a repeatable Infrastructure as Code approach.
---
# Terraform Deployment Process


## Initialize Terraform


Navigate to the Terraform directory:


```bash
cd terraform
```


Initialize Terraform:


```bash
terraform init
```


Terraform downloads the required providers and prepares the environment.
---

## Review Infrastructure Changes
Before creating resources:

```bash
terraform plan
```
Terraform displays:

* Resources to be created.
* Infrastructure changes.
* Configuration updates.
---
## Provision Infrastructure
Deploy the infrastructure:
```bash
terraform apply
```
After successful execution:

---

# ☸️ K3s Kubernetes Cluster


After Terraform provisions the virtual machines, K3s is installed to create the Kubernetes cluster.

---

K3s provides:
* Lightweight Kubernetes installation.
* Production-ready orchestration.
* Low resource consumption.
* Simple cluster management.


---

# Verify Kubernetes Cluster
Check cluster nodes:


```bash
kubectl get nodes
```


Example:


```
NAME          STATUS     ROLE

master        Ready      control-plane

worker01      Ready      worker

worker02      Ready      worker

```


Check cluster information:


```bash
kubectl cluster-info
```


---

# 🔑 Kubernetes Cluster Access


The kubeconfig file is used to connect external tools to the Kubernetes cluster.


The kubeconfig is required by:

* kubectl.
* Argo CD CLI.
* Deployment automation tools.


Example:


```bash
cat /etc/rancher/k3s/k3s.yaml
```


The configuration is securely stored and used during deployment automation.


---

# 🐳 Containerization


The application is containerized using Docker.


Docker provides a consistent runtime environment between development, staging, and production.

Build Docker image:


```bash
docker build -t application-name .
```


Push image:


```bash
docker push application-name
```
---

# 🔄 GitHub Actions CI/CD Pipeline


The CI/CD pipeline automates the complete software delivery lifecycle.


The workflow is triggered when developers push code changes to GitHub.
The pipeline stages include:
---

# CI/CD Pipeline Stages


## 1. Source Code Checkout
The pipeline retrieves the latest application source code.
Example:


```yaml
- uses: actions/checkout@v4
```


---

## 2. Application Testing
Automated tests validate application functionality before deployment.
The pipeline stops if tests fail.
---

## 3. GitLeaks Secret Scanning
GitLeaks scans repositories for exposed secrets.
It detects:


* API keys.
* Passwords.
* Tokens.
* Private credentials.


Example:


```bash
gitleaks detect
```


---

## 4. Checkov Security Scanning


Checkov scans Infrastructure as Code configurations.


It validates:


* Terraform files.
* Kubernetes manifests.
* Security best practices.


Example:


```bash
checkov -d .
```
---

## 5. Code Linting
Linting ensures the code follows development standards.
It helps detect:

* Syntax issues.
* Formatting problems.
* Code quality issues.


---

## 6. SonarQube Analysis
SonarQube performs static code analysis.
It identifies:
* Bugs.
* Vulnerabilities.
* Code smells.
* Maintainability issues.


---

## 7. Trivy Security Scan
Trivy scans Docker images and dependencies.
It detects:
* OS vulnerabilities.
* Package vulnerabilities.
* Container security risks.


Example:

```bash
trivy image application-image
```
---

## 8. SBOM Generation
The pipeline generates a Software Bill of Materials.
SBOM provides visibility into:
* Application dependencies.
* Software components.
* Package versions.


This improves software supply chain security.
---
## 9. Docker Build and Push

After all validation stages pass:
The pipeline:
* Builds the Docker image.
* Creates the image tag.
* Pushes the image to Docker Hub.

docker push application:v1
```

---
