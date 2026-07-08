# 1. Network Module (VPC, Subnets, Router, NAT)
module "network" {
  source      = "./modules/network"
  region      = var.region
  environment = var.environment
}

# 2. Firewall Module
module "firewall" {
  source      = "./modules/firewall"
  main_vpc    = module.network.vpc_name
  environment = var.environment
}


module "storage" {
  source      = "./modules/storage"
  project_id  = var.project_id
  region      = var.region
  environment = var.environment
}


module "compute" {
  source              = "./modules/compute"
  zone                = var.zone
  environment         = var.environment
  public_subnet_id    = module.network.public_subnet_id
  private_subnet_id   = module.network.private_subnet_id
  public_subnet_name  = module.network.public_subnet_name
  private_subnet_name = module.network.private_subnet_name
}