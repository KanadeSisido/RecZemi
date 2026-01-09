
import json

META_FILE = 'meta_Grocery_and_Gourmet_Food.jsonl'

row = "item_id, title, average_rating, rating_number, image_url, \n"

with open(META_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        meta = json.loads(line)
        if 'categories' in meta and 'Beverages' in meta['categories']:

            row += f"{meta['asin']}, {meta['title']}, {meta['average_rating']}, {meta['rating_number']}, {meta['images'][0]['large']}\n"
        break  # 最初のBeverages商品のみ処理

with open('beverages.item', 'w', encoding='utf-8') as f:
    f.write(row)