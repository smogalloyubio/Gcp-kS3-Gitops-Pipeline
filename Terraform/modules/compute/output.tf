output "master_details" {
  value = {
    name       = google_compute_instance.master.name
    private_ip = google_compute_instance.master.network_interface[0].network_ip
    public_ip  = google_compute_instance.master.network_interface[0].access_config[0].nat_ip
    subnet     = var.public_subnet_name
  }
}

output "worker_details" {
  value = [
    for instance in google_compute_instance.workers : {
      name       = instance.name
      private_ip = instance.network_interface[0].network_ip
      subnet     = var.private_subnet_name
      status     = "Isolated Private Node (Cloud NAT Outbound Routing)"
    }
  ]
}