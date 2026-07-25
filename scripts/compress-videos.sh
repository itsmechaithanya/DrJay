#!/bin/bash
set -e

echo "Starting video compression..."

# Compress Work2 (Home Page)
echo "1/3: Compressing Work2.mp4..."
ffmpeg -y -i src/assets/Work2.mp4 -vcodec libvpx-vp9 -crf 32 -b:v 0 -an src/assets/Work2.webm
ffmpeg -y -i src/assets/Work2.mp4 -vcodec libx264 -crf 28 -preset fast -pix_fmt yuv420p -an src/assets/Work2_optimized.mp4

# Compress vid (About Page Main)
echo "2/3: Compressing vid.MP4..."
ffmpeg -y -i src/assets/vid.MP4 -vcodec libvpx-vp9 -crf 34 -b:v 0 -an src/assets/vid.webm
ffmpeg -y -i src/assets/vid.MP4 -vcodec libx264 -crf 28 -preset fast -pix_fmt yuv420p -an src/assets/vid_optimized.mp4

# Compress vid2 (About Page Sidebar)
echo "3/3: Compressing vid2.mp4..."
ffmpeg -y -i src/assets/vid2.mp4 -vcodec libvpx-vp9 -crf 34 -b:v 0 -an src/assets/vid2.webm
ffmpeg -y -i src/assets/vid2.mp4 -vcodec libx264 -crf 28 -preset fast -pix_fmt yuv420p -an src/assets/vid2_optimized.mp4

echo "Compression complete!"
