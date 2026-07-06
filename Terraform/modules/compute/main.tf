resource "google_compute_instance" "master" {
  name         = "k3s-master-${var.environment}"
  machine_type = "e2-medium"
  zone         = var.zone
  tags         = ["k3s-master"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size  = 30
    }
  }

  network_interface {
    subnetwork = var.public_subnet_id
    access_config { /* Ephemeral Public IP for Master Node */ }
  }

  metadata = {
   ssh-keys = "ubuntu:${file("${path.module}/keys/id_rsa.pub")}"
  }
}

resource "google_compute_instance" "workers" {
  count        = 2
  name         = "k3s-worker-${count.index + 1}-${var.environment}"
  machine_type = "e2-medium"
  zone         = var.zone
  tags         = ["k3s-worker"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size  = 40
    }
  }

  network_interface {
    subnetwork = var.private_subnet_id
    # No access_config = No Public IP address
  }

  metadata = {
   ssh-keys = "ubuntu:${file("${path.module}/keys/id_rsa.pub")}"
  }
}