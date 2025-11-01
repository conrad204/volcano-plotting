# run_api.R
library(plumber)
pr <- plumb("plumber.R")

port <- as.integer(Sys.getenv("PORT", "8000"))
host <- Sys.getenv("HOST", "0.0.0.0")  # CRITICAL for Docker
pr$run(host = host, port = port)