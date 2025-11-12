from scholarly import scholarly

search_query = scholarly.search_pubs(
    "Flagship dataset of type 2 diabetes from the AI-READI project"
)
results = [next(search_query)]

dataset_list = [
    {"title": result["bib"]["title"], "cited": result["num_citations"]}
    for result in results
]
