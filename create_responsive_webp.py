#!/usr/bin/env python3
"""
Responsive WebP Image Generator
Creates multiple sizes of images optimized for different screen sizes
"""

import os
from pathlib import Path
from PIL import Image
import sys

# Image size configurations
SIZES = {
    'mobile': {'width': 640, 'quality': 80, 'suffix': '-mobile'},
    'tablet': {'width': 1024, 'quality': 82, 'suffix': '-tablet'},
    'desktop': {'width': 1920, 'quality': 85, 'suffix': '-desktop'},
    'original': {'width': None, 'quality': 85, 'suffix': ''},  # Keep original size
}

# Supported image formats
SUPPORTED_FORMATS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp'}

# Folders to exclude
EXCLUDE_FOLDERS = {'node_modules', '.git', '.next', 'out', '__pycache__', 'venv'}

def should_skip_directory(path):
    """Check if directory should be skipped"""
    parts = Path(path).parts
    return any(excluded in parts for excluded in EXCLUDE_FOLDERS)

def resize_image(img, target_width):
    """
    Resize image maintaining aspect ratio
    
    Args:
        img: PIL Image object
        target_width: Target width in pixels
    
    Returns:
        Resized PIL Image object
    """
    if target_width is None:
        return img
    
    # Calculate new height maintaining aspect ratio
    width_percent = target_width / float(img.size[0])
    target_height = int(float(img.size[1]) * width_percent)
    
    # Only resize if image is larger than target
    if img.size[0] > target_width:
        return img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    return img

def convert_to_rgb(img):
    """Convert image to RGB format"""
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        if img.mode in ('RGBA', 'LA'):
            background.paste(img, mask=img.split()[-1])
        else:
            background.paste(img)
        return background
    elif img.mode != 'RGB':
        return img.convert('RGB')
    return img

def generate_responsive_images(image_path, delete_original=False):
    """
    Generate multiple responsive sizes for an image
    
    Args:
        image_path: Path to source image
        delete_original: Whether to delete original file
    
    Returns:
        Dictionary of generated files
    """
    try:
        # Open image
        img = Image.open(image_path)
        original_size = os.path.getsize(image_path)
        
        print(f"\n📸 Processing: {image_path.name}")
        print(f"   Original size: {img.size[0]}x{img.size[1]} ({original_size/1024:.1f}KB)")
        
        # Convert to RGB if needed
        img = convert_to_rgb(img)
        
        generated_files = {}
        total_webp_size = 0
        
        # Generate each size
        for size_name, config in SIZES.items():
            # Create WebP filename
            base_name = image_path.stem
            webp_name = f"{base_name}{config['suffix']}.webp"
            webp_path = image_path.parent / webp_name
            
            # Skip if already exists
            if webp_path.exists():
                print(f"   ⏭️  {size_name.capitalize()}: Already exists")
                continue
            
            # Resize image
            resized_img = resize_image(img, config['width'])
            
            # Save as WebP
            resized_img.save(
                webp_path,
                'WEBP',
                quality=config['quality'],
                method=6
            )
            
            webp_size = os.path.getsize(webp_path)
            total_webp_size += webp_size
            
            generated_files[size_name] = webp_path
            
            print(f"   ✅ {size_name.capitalize()}: {resized_img.size[0]}x{resized_img.size[1]} "
                  f"({webp_size/1024:.1f}KB, Q{config['quality']})")
        
        if generated_files:
            reduction = ((original_size - total_webp_size) / original_size) * 100
            print(f"   💾 Total size: {total_webp_size/1024:.1f}KB "
                  f"(saved {reduction:.1f}% compared to original)")
            
            # Delete original if requested
            if delete_original:
                os.remove(image_path)
                print(f"   🗑️  Deleted original")
        
        return generated_files
        
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return {}

def generate_srcset_snippet(base_name, sizes_generated):
    """Generate HTML srcset snippet for responsive images"""
    srcset_parts = []
    
    size_widths = {
        'mobile': '640w',
        'tablet': '1024w',
        'desktop': '1920w',
    }
    
    for size_name in ['mobile', 'tablet', 'desktop']:
        if size_name in sizes_generated:
            suffix = SIZES[size_name]['suffix']
            srcset_parts.append(f"/images/{base_name}{suffix}.webp {size_widths[size_name]}")
    
    if srcset_parts:
        srcset = ',\n            '.join(srcset_parts)
        return f"""
<picture>
  <source
    srcSet="{{
            {srcset}
         }}"
    sizes="(max-width: 640px) 640px,
           (max-width: 1024px) 1024px,
           1920px"
    type="image/webp"
  />
  <img src="/images/{base_name}.webp" alt="" />
</picture>
"""
    return ""

def process_all_images(root_dir, delete_original=False):
    """Process all images in directory"""
    root_path = Path(root_dir)
    
    if not root_path.exists():
        print(f"❌ Error: Directory '{root_dir}' does not exist")
        return
    
    print(f"\n🔍 Scanning for images in: {root_path.absolute()}")
    print(f"   Generating sizes: {', '.join(SIZES.keys())}")
    print(f"   Delete originals: {delete_original}")
    print(f"   Excluding folders: {', '.join(EXCLUDE_FOLDERS)}")
    
    images_processed = 0
    total_variants = 0
    srcset_snippets = {}
    
    # Walk through directories
    for dirpath, dirnames, filenames in os.walk(root_path):
        if should_skip_directory(dirpath):
            dirnames[:] = []
            continue
        
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_FOLDERS]
        
        for filename in filenames:
            file_path = Path(dirpath) / filename
            
            # Check if it's a supported image format and not already a variant
            if (file_path.suffix.lower() in SUPPORTED_FORMATS and
                not any(size_config['suffix'] in file_path.stem 
                       for size_config in SIZES.values() if size_config['suffix'])):
                
                generated = generate_responsive_images(file_path, delete_original)
                
                if generated:
                    images_processed += 1
                    total_variants += len(generated)
                    
                    # Generate srcset snippet
                    snippet = generate_srcset_snippet(file_path.stem, generated)
                    if snippet:
                        srcset_snippets[file_path.stem] = snippet
    
    # Print summary
    print("\n" + "="*70)
    print("📊 GENERATION SUMMARY")
    print("="*70)
    print(f"✅ Images processed: {images_processed}")
    print(f"📦 Total variants created: {total_variants}")
    print(f"📏 Sizes per image: {len([s for s in SIZES.values() if s['width'] or s['width'] is None])}")
    
    # Print srcset examples
    if srcset_snippets:
        print("\n" + "="*70)
        print("💡 USAGE EXAMPLES (copy to your React/Next.js components)")
        print("="*70)
        
        # Show first 3 examples
        for i, (name, snippet) in enumerate(list(srcset_snippets.items())[:3]):
            print(f"\n📝 Example {i+1}: {name}")
            print(snippet)
        
        if len(srcset_snippets) > 3:
            print(f"\n... and {len(srcset_snippets) - 3} more images")
    
    print("\n" + "="*70)
    print("\n💡 TIP: Use <picture> tags with srcSet for best performance!")
    print("   Browsers will automatically choose the right size.")
    print("="*70 + "\n")

def main():
    """Main function"""
    print("\n" + "="*70)
    print("🖼️  RESPONSIVE WEBP IMAGE GENERATOR")
    print("="*70)
    
    # Check if PIL/Pillow is installed
    try:
        from PIL import Image
    except ImportError:
        print("\n❌ Error: Pillow library not found!")
        print("   Install it with: pip install Pillow")
        sys.exit(1)
    
    current_dir = Path.cwd()
    
    # Configuration
    delete_original = False  # Set to True to delete originals
    
    print(f"\n⚙️  CONFIGURATION:")
    print(f"   Sizes to generate:")
    for size_name, config in SIZES.items():
        width_str = f"{config['width']}px" if config['width'] else "original"
        print(f"      • {size_name.capitalize()}: {width_str} @ Q{config['quality']}")
    print(f"\n   Delete originals: {delete_original}")
    print(f"   (Edit the script to change these settings)")
    
    # Ask for confirmation
    response = input("\n🚀 Start generation? (y/n): ").lower().strip()
    
    if response != 'y':
        print("❌ Generation cancelled")
        return
    
    # Process images
    process_all_images(current_dir, delete_original)
    
    print("✨ Done!")

if __name__ == "__main__":
    main()
