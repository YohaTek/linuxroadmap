import os
import glob

def remove_grid(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div class="grid">' not in content:
        return
        
    lines = content.split('\n')
    out_lines = []
    
    in_grid = False
    grid_base_indent = 0
    
    for line in lines:
        if '<div class="grid">' in line:
            in_grid = True
            grid_base_indent = len(line) - len(line.lstrip())
            continue # Skip the grid opening tag
            
        if in_grid and line.strip() == '</div>' and (len(line) - len(line.lstrip())) == grid_base_indent:
            in_grid = False
            continue # Skip the grid closing tag
            
        if in_grid and line.startswith('  '):
            # Unindent the items inside the grid by 2 spaces to maintain neat HTML
            out_lines.append(line[2:])
        else:
            out_lines.append(line)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(out_lines))

for filepath in glob.glob('pages/*.html'):
    if filepath.endswith('11-networking.html'):
        continue
    remove_grid(filepath)

print("Grid wrappers removed successfully.")
