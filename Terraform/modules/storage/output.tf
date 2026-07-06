output "bucket_details" {
  value = {
    bucket_name = google_storage_bucket.db_backup_bucket.name
    gcs_uri     = "gs://${google_storage_bucket.db_backup_bucket.name}"
  }
}