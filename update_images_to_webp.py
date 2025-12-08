#!/usr/bin/env python3
"""
Update Image References to WebP
Automatically updates all image references in code to use WebP versions if available
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# File extensions to search in
CODE_EXTENSIONS = {'.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.json', '.md'}

# Image extensions to replace
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp'}

# Folders to exclude
EXCLUDE_FOLDERS = {'node_modules', '.git', '.next', 'out', '__pycache__', 'venv'}

def should_skip_directory(path):
    """Check if directory should be skipped"""
    parts = Path(path).parts
    return any(excluded in parts for excluded in EXCLUDE_FOLDERS)

def find_webp_files(root_dir):
    """Find all WebP files in the project"""
    webp_files = set()
    root_path = Path(root_dir)
    
    for dirpath, dirnames, filenames in os.walk(root_path):
        if should_skip_directory(dirpath):
            dirnames[:] = []
            continue
        
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_FOLDERS]
        
        for filename in filenames:
            if filename.endswith('.webp'):
                file_path = Path(dirpath) / filename
                # Store relative path from root
                rel_path = file_path.relative_to(root_path)
                webp_files.add(str(rel_path).replace('\\', '/'))
    
    return webp_files

def get_webp_equivalent(image_path):
    """Get the WebP equivalent path for an image"""
    for ext in IMAGE_EXTENSIONS:
        if image_path.endswith(ext):
            return image_path[:-len(ext)] + '.webp'
    return None

def update_file_content(file_path, webp_files, dry_run=True):
    """
    Update image references in a file to use WebP
    
    Returns:
        tuple: (was_modified, changes_made)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = []
        
        # Pattern to match image references
        # Matches: src="/path/image.jpg", src='/path/image.jpg', url(/path/image.jpg), etc.
        patterns = [
            (r'src\s*=\s*["\']([^"\']+\.(?:jpg|jpeg|png|gif|bmp))["\']', 'src attribute'),
            (r'href\s*=\s*["\']([^"\']+\.(?:jpg|jpeg|png|gif|bmp))["\']', 'href attribute'),
            (r'url\(["\']?([^)"\']+\.(?:jpg|jpeg|png|gif|bmp))["\']?\)', 'CSS url()'),
            (r'image\s*:\s*["\']([^"\']+\.(?:jpg|jpeg|png|gif|bmp))["\']', 'image property'),
            (r'backgroundImage\s*:\s*["\']url\(([^)]+\.(?:jpg|jpeg|png|gif|bmp))\)["\']', 'backgroundImage'),
        ]
        
        for pattern, pattern_type in patterns:
            matches = list(re.finditer(pattern, content, re.IGNORECASE))
            
            for match in reversed(matches):  # Reverse to maintain positions
                image_path = match.group(1)
                webp_path = get_webp_equivalent(image_path)
                
                if webp_path:
                    # Check if WebP version exists
                    # Try both absolute and relative path checks
                    webp_exists = False
                    
                    # Check various path formats
                    check_paths = [
                        webp_path.lstrip('/'),  # Remove leading slash
                        webp_path,
                        'public' + webp_path if webp_path.startswith('/') else None,
                    ]
                    
                    for check_path in check_paths:
                        if check_path and check_path in webp_files:
                            webp_exists = True
                            break
                    
                    if webp_exists:
                        # Replace the image path
                        old_text = match.group(0)
                        new_text = old_text.replace(image_path, webp_path)
                        
                        start, end = match.span()
                        content = content[:start] + new_text + content[end:]
                        
                        changes.append({
                            'line': content[:start].count('\n') + 1,
                            'old': image_path,
                            'new': webp_path,
                            'type': pattern_type
                        })
        
        # Write changes if not dry run
        if content != original_content:
            if not dry_run:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
            return True, changes
        
        return False, []
        
    except Exception as e:
        print(f"❌ Error processing {file_path}: {str(e)}")
        return False, []

def update_all_files(root_dir, dry_run=True):
    """Update all code files to use WebP images"""
    root_path = Path(root_dir)
    
    print(f"\n🔍 Step 1: Finding WebP files...")
    webp_files = find_webp_files(root_dir)
    print(f"   Found {len(webp_files)} WebP files")
    
    print(f"\n🔍 Step 2: Scanning code files...")
    
    files_modified = 0
    total_changes = 0
    files_by_type = defaultdict(int)
    changes_by_file = {}
    
    for dirpath, dirnames, filenames in os.walk(root_path):
        if should_skip_directory(dirpath):
            dirnames[:] = []
            continue
        
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_FOLDERS]
        
        for filename in filenames:
            file_path = Path(dirpath) / filename
            
            if file_path.suffix.lower() in CODE_EXTENSIONS:
                was_modified, changes = update_file_content(file_path, webp_files, dry_run)
                
                if was_modified:
                    files_modified += 1
                    total_changes += len(changes)
                    rel_path = file_path.relative_to(root_path)
                    changes_by_file[str(rel_path)] = changes
                    files_by_type[file_path.suffix] += 1
    
    # Print results
    print("\n" + "="*70)
    if dry_run:
        print("📋 DRY RUN RESULTS (No files were modified)")
    else:
        print("✅ UPDATE COMPLETE")
    print("="*70)
    
    print(f"\n📊 Summary:")
    print(f"   Files modified: {files_modified}")
    print(f"   Total image references updated: {total_changes}")
    
    if files_by_type:
        print(f"\n   Files by type:")
        for ext, count in sorted(files_by_type.items()):
            print(f"      {ext}: {count} files")
    
    if changes_by_file:
        print(f"\n📝 Detailed Changes:")
        for file_path, changes in sorted(changes_by_file.items()):
            print(f"\n   📄 {file_path}")
            for change in changes:
                print(f"      Line {change['line']}: {change['old']} → {change['new']}")
    
    print("\n" + "="*70 + "\n")
    
    return files_modified, total_changes

def main():
    """Main function"""
    print("\n" + "="*70)
    print("🔄 UPDATE IMAGE REFERENCES TO WEBP")
    print("="*70)
    
    current_dir = Path.cwd()
    
    print(f"\n📂 Working directory: {current_dir}")
    print(f"   Excluding folders: {', '.join(EXCLUDE_FOLDERS)}")
    
    # Dry run first
    print("\n" + "="*70)
    print("🧪 RUNNING DRY RUN (Preview only, no changes will be made)")
    print("="*70)
    
    files_modified, total_changes = update_all_files(current_dir, dry_run=True)
    
    if files_modified == 0:
        print("✨ No changes needed! All images are already using WebP or no WebP versions found.")
        return
    
    # Ask for confirmation
    print(f"\n⚠️  This will modify {files_modified} files and update {total_changes} image references.")
    response = input("\n🚀 Proceed with actual update? (y/n): ").lower().strip()
    
    if response != 'y':
        print("❌ Update cancelled")
        return
    
    # Do actual update
    print("\n" + "="*70)
    print("✍️  UPDATING FILES...")
    print("="*70)
    
    update_all_files(current_dir, dry_run=False)
    
    print("✨ Done! All image references have been updated to use WebP format.")

if __name__ == "__main__":
    main()
