# Volcano plotting (plumber)

this repo uses R plumber API to generate a volcano plot based off `example.csv`
currently, there is no implementation to upload custom dataset (todo)

**NOTE: while *padj* and *log₂ fold change* values reflect real experimental results, ensemblIDs have been randomly reassigned to unrelated entries to preserve integrity of unpublished data.**

apart from the original R script, initial commit for plumber API was primarily generated using ai

## quick start and docker build

you'll need docker installed

PowerShell (from project root):

```powershell
# build the image
docker build -t volcano-plot .

# run
docker run --rm -p 8000:8000 volcano-plot
```

Open the UI at http://localhost:5500/index.html if you serve the static files, or open `index.html` (i recommend this) served from the project directory using a static server. The API will be at http://localhost:8000.
