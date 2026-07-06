output "vpc_name" {
  value = google_compute_network.main_vpc.name
}

output "public_subnet_id" {
  value = google_compute_subnetwork.public_subnet.id
}

output "private_subnet_id" {
  value = google_compute_subnetwork.private_subnet.id
}

output "public_subnet_name" {
  value = google_compute_subnetwork.public_subnet.name
}

output "private_subnet_name" {
  value = google_compute_subnetwork.private_subnet.name
}

output "summary" {
  value = {
    vpc_name       = google_compute_network.main_vpc.name
    public_subnet  = google_compute_subnetwork.public_subnet.name
    private_subnet = google_compute_subnetwork.private_subnet.name
  }
}