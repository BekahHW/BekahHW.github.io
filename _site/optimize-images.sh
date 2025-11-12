#!/bin/bash

# Image optimization script
# Requires: imagemagick (brew install imagemagick on macOS)

echo "🖼️  Starting image optimization..."

# Create backup directory
mkdir -p assets/images/backup

# Find all images and optimize them
find assets/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) ! -path "*/backup/*" | while read -r file; do
    filename=$(basename "$file")
    dir=$(dirname "$file")
    
    # Skip if already optimized (has .optimized in name)
    if [[ $filename == *".optimized"* ]]; then
        continue
    fi
    
    # Backup original
    cp "$file" "assets/images/backup/$filename"
    
    # Get image dimensions
    dimensions=$(identify -format "%wx%h" "$file" 2>/dev/null)
    width=$(echo $dimensions | cut -d'x' -f1)
    height=$(echo $dimensions | cut -d'x' -f2)
    
    # Optimize based on size
    if [ "$width" -gt 2000 ] || [ "$height" -gt 2000 ]; then
        echo "Resizing large image: $file"
        convert "$file" -resize "2000x2000>" -quality 85 -strip "$file"
    else
        echo "Optimizing: $file"
        convert "$file" -quality 85 -strip "$file"
    fi
done

echo "✅ Image optimization complete!"
echo "📁 Original images backed up to assets/images/backup/"
echo ""
echo "To convert to WebP (requires webp tools):"
echo "for file in assets/images/**/*.{jpg,jpeg,png}; do cwebp -q 85 \"\$file\" -o \"\${file%.*}.webp\"; done"