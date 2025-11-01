# Volcano plotting (plumber)

this repo uses R plumber API to generate a volcano plot based off `example.csv`
currently, there is no implementation to upload custom dataset (todo)

**NOTE: while *padj* and *log₂ fold change* values reflect real experimental results, ensemblIDs have been randomly reassigned to unrelated entries to preserve integrity of unpublished data.**

apart from the original R script, initial commit for plumber API was primarily generated using ai

## quick start and docker build

you'll need docker installed

PowerShell (from project root):

```powershell
docker pull cfeng204/volcano-api:latest
docker run -p 8000:8000 cfeng204/volcano-api:latest
```

then open the index.html file