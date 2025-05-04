# Palm Destiny Analysis

## Project Overview

This is a palm analysis website based on modern computer vision technology and traditional Eastern wisdom. Users can upload an image of their palm, and the system will use MediaPipe Hands for hand detection, combined with traditional palmistry knowledge, to provide users with personalized destiny analysis.

## Latest Updates

### Interface and Functionality Comprehensive Upgrade (2024-01)

- **Dark Mode Fully Optimized**
  - Added dedicated dark mode color variables for improved color consistency
  - Optimized text contrast, solving the problem of purple text being difficult to read on a gray background
  - Added high-contrast pink and light blue for links to enhance visibility
  - Enhanced the visibility of palm lines and marker points, adding appropriate glow effects
  - Optimized container and card backgrounds and borders for an improved overall visual experience

- **Report Generation Enhanced**
  - Improved the save report function to support saving the complete content of the "Analysis Process," "Core Palm Lines," and "Destiny Overview" modules simultaneously
  - Optimized report styling using a dark theme design to improve content readability and professional feel
  - Added gradient backgrounds and high-contrast text to destiny overview cards, solving the problem of light gray text being difficult to read on a white background
  - Enhanced the visual effects of table and parameter modules to ensure content is clearly visible on dark backgrounds
  - Added text shadow and border effects to highlight the importance of palm analysis content

- **Mobile Experience Optimization**
  - Added a "Start Analysis" button fixed at the bottom of the screen for easy user access
  - Fixed content overflow issues and optimized mobile layout
  - Adjusted process steps to vertical layout for better readability on small-screen devices
  - Optimized container overflow control and scrollbars for a smoother browsing experience

- **Palm Key Point Display Optimization**
  - Adjusted the wrist base point (point 0) and all joint points' positions for accurate positioning
  - Repositioned fingers and palm lines for better matching with actual palms
  - Enhanced the visibility of key points and connecting lines in dark mode

### Interface Optimization and Bug Fixes (2023-12)

- **Palm Analysis Report Interface Further Optimized**
  - Improved the proportion relationship between palm image and "Key Findings" module
  - Uniformly adjusted the maximum height of palm images to 550px for an enhanced visual experience
  - Optimized responsive layout to maintain good display effects on various devices

- **Resolved Palm Marker Point Precise Alignment Issue**
  - Fixed the critical defect of palm marker points not matching the palm image
  - Adjusted image display method, consistently using the object-fit: cover property
  - Set the correct preserveAspectRatio property for SVG layer to ensure perfect alignment with the image
  - Implemented an adaptive coordinate conversion system to handle different image ratios

- **Image Processing Stability Improved**
  - Enhanced image loading state detection to ensure markers are created only after the image is fully rendered
  - Added delay and retry mechanisms to solve container size initialization issues
  - Established multi-level fault-tolerant processing, gracefully degrading to static markers without affecting user experience

- **Code Robustness Comprehensively Enhanced**
  - Thoroughly refactored the coordinate conversion algorithm to adapt to different image ratios and display methods
  - Optimized the consistency of SVG and Canvas drawing processes to ensure marker consistency
  - Added edge case parameter validation and exception handling to improve system stability
  - Improved the logging system to provide clear debugging information

## User Guide

### Quick Start

1. Open the website homepage and click the "Start My Palm Analysis" button to enter the analysis page
2. Upload a palm photo (or take a picture using your camera)
   - **Recommended: Clear front view of your palm, without shadows, in natural light**
   - Ensure your palm is fully extended with palm lines clearly visible
3. Fill in personal information (age range, gender, area of interest)
4. Click the "Start Analysis" button
5. View detailed palm analysis results, including three main modules:
   - **Analysis Process**: Shows detailed steps and parameters of palm detection and analysis
   - **Core Palm Lines**: In-depth analysis of the life line, head line, and heart line
   - **Destiny Overview**: Destiny predictions and interpretations in seven key areas

### Usage Tips

- **Photography Angle**: The palm should be flat, with the camera perpendicular to the center of the palm
- **Lighting Conditions**: Use natural light or even indoor light, avoid strong shadows
- **Palm State**: The palm should be fully extended, fingers naturally straight without excessive force
- **Image Clarity**: Ensure the image has sufficient resolution with palm lines clearly visible

### Saving and Sharing Results

- After analysis is complete, click "Save My Analysis Report" to generate an image report of the complete analysis results
- The report includes all analysis module content, suitable for saving or sharing with friends
- Click "Share My Analysis Results" to copy the current page link for easy sharing with others

## Common Issues and Solutions

### Unable to Complete Palm Analysis

If you receive an "Unable to complete palm analysis" prompt, try the following solutions:

1. **Image Quality Issues**:
   - Upload a clearer, higher-resolution image
   - Adjust the lighting to avoid being too dark or too bright
   - Ensure the palm occupies the main part of the image

2. **Browser Compatibility**:
   - Use the latest version of Chrome, Firefox, or Edge browser
   - Ensure JavaScript is enabled
   - Clear browser cache and refresh the page

3. **Network Issues**:
   - Check if your network connection is stable
   - In some cases, the MediaPipe model needs to be downloaded, please ensure network connectivity

4. **Device Performance**:
   - Run on a device with better performance
   - Close other resource-intensive applications

### Report Saving Issues

If you encounter problems when saving the report:

- Ensure the browser allows file downloads
- The html2canvas library may need to load when used for the first time, please be patient
- If the report content is incomplete, try refreshing the page and regenerating

### Marker Point Display Issues

If you find that hand key point markers don't match or are separated from the palm image:

- Try refreshing the page and uploading the image again
- Adjusting the browser window size may trigger re-rendering
- Make sure you're using the recommended image capture method

## Core Features

### 1. Hand Detection and Analysis
- Use MediaPipe Hands for high-precision hand detection
- Automatically identify palm area and 21 key palm points
- Support real-time preview and static image analysis
- Multi-threaded parallel processing for improved analysis efficiency

### 2. Palm Line Feature Extraction
- Life line detection and analysis (health and vitality)
- Head line detection and analysis (thinking style and intelligence)
- Heart line detection and analysis (emotional state and interpersonal relationships)
- Comprehensive analysis of palm line depth, length, and shape

### 3. Personalized Analysis System
- Customized analysis based on user's age range
- Analysis results considering gender differences
- Focused interpretation for user's area of interest
- Multi-dimensional fortune analysis:
  - Career and life path
  - Wealth and prosperity
  - Health and vitality
  - Love and relationships
  - Social connections
  - Wisdom and learning ability
  - Future potential

### 4. User Interface
- Responsive design, adapting to various device sizes
- Support for light mode and dark mode, automatically adapting to system settings
- Eastern mystical style interface combined with modern UI elements
- Smooth animation effects and transitions
- Intuitive operation guidance and real-time feedback

### 5. Report Generation System
- Generate high-quality palm analysis reports
- Include all analysis module content
- Professional and attractive layout and design
- Support saving as image format
- Suitable for printing and digital sharing

## Technical Implementation

### Frontend Technology Stack
- HTML5: Semantic tags to build page structure
- CSS3: Flexbox and Grid layout for responsive design, variable system for theme switching
- JavaScript: Native JS implementation of core functions, modular code organization
- MediaPipe Hands: Google-developed hand detection and analysis library
- Web Workers: Multi-threaded image processing (planned to introduce)
- html2canvas: Report generation and image export

### Core Algorithms
1. **Hand Key Point Detection**
   - Use MediaPipe Hands to identify 21 hand key points
   - Coordinate mapping and calibration
   - Adapt to different hand types and photography angles

2. **Palm Line Feature Extraction**
   - Palm line path calculation based on key points
   - Palm line quality assessment (depth, length, shape)
   - Feature point mapping with traditional palmistry knowledge

3. **Analysis System**
   - Multi-dimensional feature interpretation algorithm
   - Personalized information integration
   - Weighted analysis result generation

## Project Structure

```
Palm Destiny Analysis/
├── index.html            # Website homepage
├── css/                  # Style files
│   ├── style.css         # Main style file
│   ├── animations.css    # Animation effects
│   └── responsive.css    # Responsive layout
├── js/                   # JavaScript files
│   ├── main.js           # Main logic file
│   ├── palm-detection.js # Palm detection core code
│   ├── analysis.js       # Palm analysis algorithm
│   ├── result-generator.js # Result generation logic
│   ├── ui-controller.js  # User interface control
│   └── result-modules/   # Result modules
├── assets/               # Static resources
│   ├── images/           # Image resources
│   └── icons/            # Icon resources
└── lib/                  # Third-party libraries
    └── mediapipe/        # MediaPipe related files
```

## Future Development Plans

### 1. Enhance Palm Line Recognition Accuracy
- Introduce real palm line detection algorithms, not just relying on key point positioning
- Use computer vision technology to extract actual palm line textures
- Establish a palm feature database to improve analysis accuracy

### 2. Interaction Experience Optimization
- Add visualization of the palm detection process
- Provide more detailed explanation of analysis results
- Add historical analysis result comparison function

### 3. Personalized Feature Expansion
- Add more analysis dimensions and areas of interest
- Provide time-based destiny change trend analysis
- Continuously optimize analysis algorithms based on user feedback

### 4. Multi-Platform Support
- Develop mobile application version
- Optimize display effects on tablet devices
- Explore AR/VR technology applications in palm analysis

## Contributions and Feedback

We welcome various forms of contributions and feedback, including but not limited to:
- Feature suggestions and improvement ideas
- Interface design optimization
- Code quality improvement
- Palmistry knowledge supplements

If you have any questions or suggestions, please contact us through:
- Submit comments through the feedback form at the bottom of the website
- Send an email to: [contact@palmanalysis.com](mailto:contact@palmanalysis.com) 