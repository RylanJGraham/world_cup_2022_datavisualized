import React from 'react';
import Image from 'next/image';

type ResponsiveImageWithOverlayProps = {
  src: string; // Path to the background image
  alt: string; // Alt text for the background image
  overlayText: string; // Main text to overlay on the image
  caption?: string; // Optional caption text below the main text
  svgIconPath?: string; // Optional path to the SVG icon
  priority?: boolean; // Optional: Whether the image should be prioritized for loading
};

const ResponsiveImageWithOverlay: React.FC<ResponsiveImageWithOverlayProps> = ({
  src,
  alt,
  overlayText,
  caption,
  svgIconPath,
  priority = false,
}) => {
  return (
    <div style={styles.container}>
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover" // Ensures the image covers the entire container
        priority={priority}
      />

      {/* Bottom-Right Flex Container */}
      <div style={styles.overlay}>
        <div style={styles.textContainer}>
          <p style={styles.mainText}>{overlayText}</p>
          {caption && <p style={styles.caption}>{caption}</p>}
        </div>
        {svgIconPath && (
          <div style={styles.iconContainer}>
            <Image
              src={svgIconPath}
              alt="Icon"
              width={256} // Width of the SVG icon
              height={256} // Height of the SVG icon
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    position: 'relative' as 'relative',
    width: '100%', // Full width
    height: '100vh', // Full viewport height
    overflow: 'hidden', // Prevent scrollbars from appearing
  },
  overlay: {
    position: 'absolute' as 'absolute',
    bottom: '1rem', // 1rem from the bottom of the container
    right: '1rem', // 1rem from the right of the container
    display: 'flex',
    alignItems: 'center', // Vertically align text and SVG
    gap: '0.5rem', // Space between text and SVG
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent background
    padding: '0.5rem 1rem', // Padding inside the container
    borderRadius: '8px', // Rounded corners for the overlay box
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Stack main text and caption vertically
    alignItems: 'flex-start', // Align text to the left within the container
  },
  mainText: {
    color: 'white',
    fontSize: '3.2rem',
    fontWeight: 'bold',
    margin: 0, // Remove default margin
  },
  caption: {
    color: 'white',
    fontSize: '0.9rem',
    margin: 0, // Remove default margin
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center', // Center the SVG vertically
  },
};

export default ResponsiveImageWithOverlay;
