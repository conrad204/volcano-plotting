#!/usr/bin/env Rscript
library(plumber)
# Host 0.0.0.0 so it’s reachable from outside the container
pr("plumber.R")$run(host = "0.0.0.0", port = 8000)