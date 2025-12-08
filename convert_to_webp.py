#!/usr/bin/env python3
"""
Image to WebP Converter
Converts all images (jpg, jpeg, png, gif) to WebP format in the project
"""

import os
from pathlib import Path
from PIL import Image
import sys

# Supported image formats
SUPPORTED_FORMATS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp'}

# Folders to exclude from conversion
EXCLUDE_FOLDERS = {'node_modules', '.git', '.next', 'out', '__pycache__', 'venv'}

def should_skip_directory(path):
    """Check if directory should be skipped"""
    parts = Path(path).parts
    return any(excluded in parts for excluded in EXCLUDE_FOLDERS)

def convert_image_to_webp(image_path, quality=85, delete_original=False):
    """
    Convert an image to WebP format
    
    Args:
        image_path: Path to the source image
        quality: WebP quality (0-100, default 85)
        delete_original: Whether to delete the original file
    
    Returns:
        Path to the new WebP file or None if conversion failed
    """
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if needed (WebP doesn't support transparency in lossy mode)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create a white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Create WebP filename
        webp_path = image_path.with_suffix('.webp')
        
        # Skip if WebP already exists
        if webp_path.exists():
            print(f"⏭️  Skipped (already exists): {webp_path.name}")
            return None
        
        # Save as WebP
        img.save(webp_path, 'WEBP', quality=quality, method=6)
        
        # Get file sizes
        original_size = os.path.getsize(image_path)
        webp_size = os.path.getsize(webp_path)
        reduction = ((original_size - webp_size) / original_size) * 100
        
        print(f"✅ Converted: {image_path.name} → {webp_path.name}")
        print(f"   Size: {original_size/1024:.1f}KB → {webp_size/1024:.1f}KB (reduced by {reduction:.1f}%)")
        
        # Delete original if requested
        if delete_original:
            os.remove(image_path)
            print(f"   🗑️  Deleted original: {image_path.name}")
        
        return webp_path
        
    except Exception as e:
        print(f"❌ Error converting {image_path.name}: {str(e)}")
        return None

def find_and_convert_images(root_dir, quality=85, delete_original=False):
    """
    Find all images in directory and convert them to WebP
    
    Args:
        root_dir: Root directory to search
        quality: WebP quality (0-100)
        delete_original: Whether to delete original files
    """
    root_path = Path(root_dir)
    
    if not root_path.exists():
        print(f"❌ Error: Directory '{root_dir}' does not exist")
        return
    
    print(f"\n🔍 Scanning for images in: {root_path.absolute()}")
    print(f"   Quality: {quality}")
    print(f"   Delete originals: {delete_original}")
    print(f"   Excluding folders: {', '.join(EXCLUDE_FOLDERS)}\n")
    
    converted_count = 0
    skipped_count = 0
    error_count = 0
    total_original_size = 0
    total_webp_size = 0
    
    # Walk through all directories
    for dirpath, dirnames, filenames in os.walk(root_path):
        # Skip excluded directories
        if should_skip_directory(dirpath):
            dirnames[:] = []  # Don't recurse into subdirectories
            continue
        
        # Filter out excluded subdirectories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_FOLDERS]
        
        # Process each file
        for filename in filenames:
            file_path = Path(dirpath) / filename
            
            # Check if it's a supported image format
            if file_path.suffix.lower() in SUPPORTED_FORMATS:
                # Get original size
                original_size = os.path.getsize(file_path)
                total_original_size += original_size
                
                # Convert to WebP
                webp_path = convert_image_to_webp(file_path, quality, delete_original)
                
                if webp_path:
                    converted_count += 1
                    webp_size = os.path.getsize(webp_path)
                    total_webp_size += webp_size
                elif webp_path is None and file_path.with_suffix('.webp').exists():
                    skipped_count += 1
                else:
                    error_count += 1
    
    # Print summary
    print("\n" + "="*60)
    print("📊 CONVERSION SUMMARY")
    print("="*60)
    print(f"✅ Successfully converted: {converted_count} images")
    print(f"⏭️  Skipped (already exist): {skipped_count} images")
    print(f"❌ Errors: {error_count} images")
    
    if converted_count > 0:
        total_reduction = ((total_original_size - total_webp_size) / total_original_size) * 100
        print(f"\n💾 Total space saved: {(total_original_size - total_webp_size)/1024/1024:.2f} MB")
        print(f"   Original size: {total_original_size/1024/1024:.2f} MB")
        print(f"   WebP size: {total_webp_size/1024/1024:.2f} MB")
        print(f"   Reduction: {total_reduction:.1f}%")
    
    print("="*60 + "\n")

def main():
    """Main function"""
    print("\n" + "="*60)
    print("🖼️  IMAGE TO WEBP CONVERTER")
    print("="*60)
    
    # Check if PIL/Pillow is installed
    try:
        from PIL import Image
    except ImportError:
        print("\n❌ Error: Pillow library not found!")
        print("   Install it with: pip install Pillow")
        sys.exit(1)
    
    # Get current directory
    current_dir = Path.cwd()
    
    # Configuration
    quality = 85  # WebP quality (0-100)
    delete_original = False  # Set to True to delete original files
    
    print(f"\n⚙️  SETTINGS:")
    print(f"   Quality: {quality}")
    print(f"   Delete originals: {delete_original}")
    print(f"   (Edit the script to change these settings)\n")
    
    # Ask for confirmation
    response = input("🚀 Start conversion? (y/n): ").lower().strip()
    
    if response != 'y':
        print("❌ Conversion cancelled")
        return
    
    # Convert images
    find_and_convert_images(current_dir, quality, delete_original)
    
    print("✨ Done!")

if __name__ == "__main__":
    main()
