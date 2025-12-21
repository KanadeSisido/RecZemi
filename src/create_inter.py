import json
import pandas as pd

# 設定
META_FILE = 'meta_Grocery_and_Gourmet_Food.jsonl'
REVIEW_FILE = 'Grocery_and_Gourmet_Food.jsonl'
OUTPUT_FILE = 'beverages.inter'

print("Filtering metadata...")
beverage_asins = set()
with open(META_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        meta = json.loads(line)
        if 'categories' in meta and 'Beverages' in meta['categories']:
            beverage_asins.add(meta['parent_asin'])

print(f"Found {len(beverage_asins)} beverage items.")

print("Processing reviews...")
interactions = []
with open(REVIEW_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        rev = json.loads(line)
        if rev.get('parent_asin') in beverage_asins:
            interactions.append({
                'user_id:token': rev['user_id'],
                'item_id:token': rev['parent_asin'],
                'rating:float': float(rev['rating']),
                'timestamp:float': float(rev['timestamp'])
            })

df = pd.DataFrame(interactions)

user_counts = df['user_id:token'].value_counts()
valid_users = user_counts[user_counts >= 3].index
df = df[df['user_id:token'].isin(valid_users)]
df = df.sort_values(by=['user_id:token', 'timestamp:float'])

df.to_csv(OUTPUT_FILE, sep='\t', index=False)

print(f"Done. Saved {len(df)} interactions to {OUTPUT_FILE}")