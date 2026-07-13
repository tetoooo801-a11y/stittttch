import json
import base64
import re
import os

transcript_path = r"C:\Users\esraa\.gemini\antigravity-ide\brain\89bcf345-26d2-4ccc-93e1-f2344df35d55\.system_generated\logs\transcript.jsonl"
output_path = r"c:\Users\esraa\Downloads\stittttch-repo-clone\stitch-main\public\gallery-card.jpg"

with open(transcript_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in reversed(lines):
    if "data:image/jpeg;base64," in line:
        match = re.search(r'data:image/jpeg;base64,([a-zA-Z0-9+/=]+)', line)
        if match:
            b64_data = match.group(1)
            img_data = base64.b64decode(b64_data)
            with open(output_path, 'wb') as img_f:
                img_f.write(img_data)
            print("Successfully extracted and saved image to", output_path)
            break
