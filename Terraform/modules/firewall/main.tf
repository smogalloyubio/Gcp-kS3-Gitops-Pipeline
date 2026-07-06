resource "google_compute_firewall" "allow_ssh" {
  name    = "k3s-allow-ssh-${var.environment}"
  network = var.main_vpc
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["k3s-master", "k3s-worker"]
}

resource "google_compute_firewall" "allow_internal_cluster" {
  name    = "k3s-allow-internal-traffic-${var.environment}"
  network = var.main_vpc
  allow { protocol = "icmp" }
  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }
  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }
  source_ranges = ["10.0.1.0/24", "10.0.2.0/24"]
}

resource "google_compute_firewall" "allow_k3s_api" {
  name    = "k3s-allow-api-server-${var.environment}"
  network = var.main_vpc
  allow {
    protocol = "tcp"
    ports    = ["6443"]
  }
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["k3s-master"]
}

resource "google_compute_firewall" "allow_web_traffic" {
  name    = "k3s-allow-web-traffic-${var.environment}"
  network = var.main_vpc
  allow {
    protocol = "tcp"
    ports    = ["80", "443", "8080", "30000-32767"]
  }
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["k3s-master", "k3s-worker"]
}