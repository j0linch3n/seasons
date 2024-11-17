$(document).ready(function() {
    const dateSlider = document.getElementById("dateSlider");
    const output = document.getElementById("date");
    const logo = document.querySelector('.logo');
    const aboutBox = document.querySelector('.aboutBox');
    const aboutCard = document.querySelector('.aboutCard'); 
    const aboutClose = document.querySelector('.aboutClose'); 
    
    const backgroundImages = [
        { src: "assets/pics/g1.png", min: 0, max: 0.05 },
        { src: "assets/pics/g2.png", min: 0.05, max: 0.1 },
        { src: "assets/pics/g3.png", min: 0.1, max: 0.15 },
        { src: "assets/pics/y2.png", min: 0.15, max: 0.2 },
        { src: "assets/pics/yo1.png", min: 0.2, max: 0.25 },
        { src: "assets/pics/o1.png", min: 0.25, max: 0.30 }, 
        { src: "assets/pics/o2.png", min: 0.30, max: 0.35 }, 
        { src: "assets/pics/o3.png", min: 0.35, max: 0.40 }, 
        { src: "assets/pics/or1.png", min: 0.40, max: 0.45 },
        { src: "assets/pics/or2.png", min: 0.45, max: 0.50 },
        { src: "assets/pics/r1.png", min: 0.50, max: 0.55 },
        { src: "assets/pics/r2.png", min: 0.55, max: 0.60 },
        { src: "assets/pics/r3.png", min: 0.60, max: 0.65 },
        { src: "assets/pics/r4.png", min: 0.65, max: 0.70 },
        { src: "assets/pics/b1.png", min: 0.70, max: 0.75 },
        { src: "assets/pics/b2.png", min: 0.75, max: 0.80 },
        { src: "assets/pics/b3.png", min: 0.80, max: 0.84 },
        { src: "assets/pics/b4.png", min: 0.84, max: 0.88 },
        { src: "assets/pics/w1.png", min: 0.88, max: 0.93 },
        { src: "assets/pics/w2.png", min: 0.93, max: 0.97 },
        { src: "assets/pics/w3.png", min: 0.97, max: 1.0 }
    ];

    aboutBox.addEventListener('click', function() {
        if (aboutCard.style.display === "none" || aboutCard.style.display === "") {
            aboutCard.style.display = "block";  // Show the aboutCard
            aboutClose.textContent = "Close";  // Change text to "Close"
        } else {
            aboutCard.style.display = "none";  // Hide the aboutCard
            aboutClose.textContent = "About";  // Change text back to "About"
        }
    });

    // Utility functions for date and color calculation
    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 1);
        start.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return Math.floor((date - start) / (1000 * 60 * 60 * 24)) + 1;
    }

    function getDateFromDay(year, dayOfYear) {
        const start = new Date(year, 0, 1);
        start.setDate(dayOfYear);
        return start;
    }

    function formatDate(date) {
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Initialize slider and date display
    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    const minDay = 248;
    const maxDay = 346;

    dateSlider.value = (dayOfYear >= minDay && dayOfYear <= maxDay) ? dayOfYear : minDay;
    output.innerHTML = formatDate(getDateFromDay(today.getFullYear(), dateSlider.value));

    dateSlider.oninput = function() {
        const selectedDate = getDateFromDay(today.getFullYear(), parseInt(this.value));
        output.innerHTML = formatDate(selectedDate);
        updateSquaresVisibility();  // Adjust visibility based on slider
    };

    // Define colors and ranges (in percentages)
    const colorRanges = [
        { color: "#265000", min: 0, max: 0.05 },
        { color: "#457519", min: 0.05, max: 0.10 },
        // { color: "#8B9216", min: 0.10, max: 0.15 },
        { color: "#98B301", min: 0.10, max: 0.15 },
        { color: "#F0C01C", min: 0.15, max: 0.17 },
        { color: "#FFC72C", min: 0.17, max: 0.20 },
        { color: "#EDA421", min: 0.20, max: 0.25 },
        { color: "#E98604", min: 0.25, max: 0.30 },
        { color: "#FE7F17", min: 0.30, max: 0.35 },
        { color: "#E66B07", min: 0.35, max: 0.4 },
        { color: "#DF3908", min: 0.4, max: 0.45 },
        { color: "#D82827", min: 0.45, max: 0.5 },
        { color: "#C91E0A", min: 0.50, max: 0.70 },
        { color: "#923113", min: 0.70, max: 0.80 },
        { color: "#6C2907", min: 0.80, max: 0.9 },
        { color: "#FFFFFF", min: 0.9, max: 1 }
    ];

    const squareContainer = document.getElementById('square-container');

    // Function to fill squares on screen and control visibility
    function fillScreenWithSquares() {
        squareContainer.innerHTML = ''; // Clear existing squares
        const rows = Math.ceil((window.innerHeight - 60) / 30); // Subtract 60px for slider
        const columns = Math.ceil(window.innerWidth / 30);

        // Create squares in the grid
        for (let i = 0; i < rows * columns; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            squareContainer.appendChild(square);
        }

        updateSquaresVisibility();  // Call this once after the squares are generated
    }

    // Function to update square colors and randomize visibility
    function updateSquaresVisibility() {
        const squares = document.querySelectorAll('#square-container .square');
        const totalSquares = squares.length;

        // Calculate the slider position as a percentage (0 to 1)
        const sliderValue = parseInt(dateSlider.value);
        const sliderRange = dateSlider.max - dateSlider.min;

        // Visibility starts at 10% when the slider is at 0, and then increases as the slider moves
        let visibilityPercent = (sliderValue - dateSlider.min) / sliderRange;  // 0 to 1
        if (visibilityPercent < 0) {
            visibilityPercent = 0; // Ensure it's not below 0
        }
        visibilityPercent = Math.max(0.1, visibilityPercent);  // Ensure the minimum visibility is 10%

        // Cap the visibility at 0.25 before the slider reaches the white range
        const cappedVisibilityPercent = visibilityPercent >= 0.9 ? 0.35 : Math.min(visibilityPercent, 0.25);  // Cap at 25% before the white range

        const visibleSquaresCount = Math.floor(cappedVisibilityPercent * totalSquares);

        // Log color range details based on the slider position
        console.log(`Slider value: ${sliderValue}`);
        const currentRange = colorRanges.find(range => visibilityPercent >= range.min && visibilityPercent <= range.max);
        console.log(`Current Color: ${currentRange.color} (Range: ${currentRange.min} - ${currentRange.max})`);

        if (aboutBox && logo && currentRange) {
            console.log(`Updating aboutBox and logo colors to: ${currentRange.color}`);
            aboutBox.style.backgroundColor = currentRange.color;  // Set background color for aboutBox
            logo.style.backgroundColor = currentRange.color;  // Set text color for logo
        }

        // Generate a random set of indices for the visible squares
        const randomIndices = new Set();
        while (randomIndices.size < visibleSquaresCount) {
            const randomIndex = Math.floor(Math.random() * totalSquares);
            randomIndices.add(randomIndex); // Ensure no duplicates
        }

        // Randomly choose 3% of visible squares for random color assignment
        const visibleSquares = Array.from(squares).filter((_, index) => randomIndices.has(index)); // Only take the random visible squares

        const randomColorCount = Math.floor(visibleSquaresCount * 0.1); // 3% of visible squares to have random colors

        // Randomly shuffle the visible squares array and pick the first 3% for random colors
        const shuffledSquares = visibleSquares.sort(() => Math.random() - 0.5); // Shuffle the visible squares array
        const randomColorSquares = shuffledSquares.slice(0, randomColorCount); // Get the first 3%

        // Calculate the color transition count based on the slider value
        let colorTransitionCount = Math.floor(visibleSquaresCount * 0.2); // Default 20%

        // If the slider value is between 0.85 and 0.9, interpolate the colorTransitionCount
        if (visibilityPercent >= 0.85 && visibilityPercent < 0.9) {
            const transitionPercentage = (visibilityPercent - 0.85) / 0.05; // Scale between 0 and 1
            colorTransitionCount = Math.floor(visibleSquaresCount * (0.2 + 0.7 * transitionPercentage)); // From 20% to 90%
        } else if (visibilityPercent >= 0.9) {
            colorTransitionCount = Math.floor(visibleSquaresCount * 0.9); // Cap at 90% for full white range
        }

        // Randomly shuffle the visible squares array and pick the first colorTransitionCount for color transitions
        const transitionColorSquares = shuffledSquares.slice(0, colorTransitionCount);

        // Color the squares
        visibleSquares.forEach((square) => {
            if (randomColorSquares.includes(square)) {
                // Assign a random color from colorRanges
                const randomRange = colorRanges[Math.floor(Math.random() * colorRanges.length)];
                square.style.backgroundColor = randomRange.color;
            } else if (transitionColorSquares.includes(square)) {
                // Assign the next color in the colorRanges
                const currentRangeIndex = colorRanges.findIndex(range => range.color === currentRange.color);
                const nextRange = colorRanges[currentRangeIndex + 1] || currentRange;
                square.style.backgroundColor = nextRange.color;
            } else {
                // Use the color from the slider position
                square.style.backgroundColor = currentRange.color;
            }
        });

        // Make the rest of the squares transparent if they're outside the visible range
        squares.forEach((square, index) => {
            if (!randomIndices.has(index)) {
                square.style.backgroundColor = 'transparent';
            }
        });
    }
    
    // Function to update the background image
    function updateBackgroundImage() {
        const sliderValue = parseInt(dateSlider.value);
        const sliderRange = dateSlider.max - dateSlider.min;
        const sliderPercent = (sliderValue - dateSlider.min) / sliderRange; // 0 to 1

        const matchingImage = backgroundImages.find(
            image => sliderPercent >= image.min && sliderPercent <= image.max
        );

        if (matchingImage) {
            const backgroundImageElement = document.getElementById('backgroundImage');
            backgroundImageElement.style.backgroundImage = `url(${matchingImage.src})`;
        }
    }

    // Call this function whenever the slider changes
    dateSlider.oninput = function() {
        const selectedDate = getDateFromDay(today.getFullYear(), parseInt(this.value));
        output.innerHTML = formatDate(selectedDate);
        updateSquaresVisibility();  // Adjust visibility based on slider
        updateBackgroundImage();   // Update the background image
    };

    // Initialize with the correct background image
    updateBackgroundImage();
    

    // Listen for window resize events
    window.addEventListener('resize', fillScreenWithSquares);

    // Initial call to set up squares
    fillScreenWithSquares();

    // Select the toggle button and background image element
    const toggleButton = document.getElementById('toggleBackground');
    const backgroundImageElement = document.getElementById('backgroundImage');
    // Initial state for visibility
    let isBackgroundVisible = true;

    // Add event listener for the toggle button
    toggleButton.addEventListener('click', () => {
        if (isBackgroundVisible) {
            // Hide the background image
            backgroundImageElement.style.display = 'none';
            toggleButton.textContent = 'Show';
        } else {
            // Show the background image
            backgroundImageElement.style.display = 'block';
            toggleButton.textContent = 'Hide';
        }
        // Toggle the state
        isBackgroundVisible = !isBackgroundVisible;
});
    
});