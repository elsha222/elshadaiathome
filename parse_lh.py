import json

log_path = r'C:\Users\Ram\.gemini\antigravity-ide\brain\ca343620-bf39-4e87-943f-759d7fa60ebe\.system_generated\logs\transcript_full.jsonl'

last_user_input = ''
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'USER_INPUT' and 'lighthouseVersion' in data.get('content', ''):
                last_user_input = data['content']
        except Exception:
            pass

if not last_user_input:
    print('Lighthouse JSON not found.')
else:
    try:
        # Find the start of the JSON
        start_idx = last_user_input.find('{')
        end_idx = last_user_input.rfind('}') + 1
        json_str = last_user_input[start_idx:end_idx]
        lh_data = json.loads(json_str)
        
        audits = lh_data.get('audits', {})
        failed_audits = []
        for audit_id, audit in audits.items():
            score = audit.get('score')
            if score is not None and score < 0.9:
                failed_audits.append({
                    'id': audit_id,
                    'title': audit.get('title'),
                    'score': score,
                    'displayValue': audit.get('displayValue', ''),
                    'details': audit.get('details', {})
                })
        
        failed_audits.sort(key=lambda x: x['score'])
        for a in failed_audits:
            print(f"{a['score']}: {a['title']} - {a['displayValue']}")
            if a['id'] in ['lcp-lazy-loaded', 'uses-responsive-images', 'modern-image-formats', 'uses-optimized-images', 'cumulative-layout-shift']:
                 print(f"   Details: {json.dumps(a['details'])[:200]}")
            
        print('\nCategories:')
        categories = lh_data.get('categories', {})
        for cat_id, cat in categories.items():
            print(f"{cat_id}: {cat.get('score')}")
            
    except Exception as e:
        print(f'Error parsing JSON: {e}')
