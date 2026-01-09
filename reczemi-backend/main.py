from os import name
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# --- GETリクエスト ---
@app.get("/")
def read_root():
    return {"Hello": "reczemi"}

@app.get("/drinks/search/")
def search_drinks(q: Optional[str] = None):
    if q:
        return {"message": f"Searching for drinks with name: {q}"}
    return {"message": "No drink name provided"}

@app.post("/drinks/drip")
def drip_coffee(drink: dict):
    return {"message": f"Dripping coffee with parameters: {drink}"}
