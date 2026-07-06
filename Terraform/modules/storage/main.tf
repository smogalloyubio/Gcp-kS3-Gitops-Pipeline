resource "google_storage_bucket" "db_backup_bucket" {
  name                        = "k3s-db-backups-${var.environment}-${var.project_id}"
  location                    = var.region
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true

  versioning { enabled = false }

  lifecycle_rule {
    condition { age = 30 }
    action { type = "Delete" }
  }
}