output "network_summary" {
  value = module.network.summary
}

output "master_node_details" {
  value = module.compute.master_details
}

output "worker_nodes_details" {
  value = module.compute.worker_details
}

output "backup_bucket_details" {
  value = module.storage.bucket_details
}