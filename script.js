window.addEventListener("load", function() {
    // Set the maximum points to determine the width percentage
    const maxPoints = 1195; // Adjust this if necessary

    document.querySelectorAll(".entry").forEach(entry => {
        const fill = entry.querySelector(".fill");
        const pointsText = entry.querySelector(".points");
        const userName = entry.querySelector(".name").textContent.trim();
        
        // Retrieve saved points from localStorage
        const savedPoints = localStorage.getItem(`score_${userName}`);
        const targetPoints = savedPoints ? parseInt(savedPoints) : parseInt(fill.getAttribute("data-points"));
        
        // Set the initial points and animate progress bar
        fill.setAttribute("data-points", targetPoints);
        animatePointsAndBar(pointsText, fill, targetPoints, maxPoints);

        // Event listener for editing points
        pointsText.addEventListener("blur", () => {
            const newPoints = parseInt(pointsText.textContent.replace(' points', ''));
            if (!isNaN(newPoints)) {
                fill.setAttribute("data-points", newPoints);
                localStorage.setItem(`score_${userName}`, newPoints); // Save to localStorage
                animatePointsAndBar(pointsText, fill, newPoints, maxPoints);
            } else {
                pointsText.textContent = `${targetPoints} points`; // Reset if invalid input
            }
        });
    });

    function animatePointsAndBar(pointsText, fill, targetPoints, maxPoints) {
        let currentPoints = 0;
        let currentWidth = 0;
        const targetWidth = (targetPoints / maxPoints) * 100;

        const interval = setInterval(() => {
            if (currentPoints < targetPoints) {
                currentPoints += Math.ceil(targetPoints / 100);
                pointsText.textContent = `${currentPoints} points`;
            }

            if (currentWidth < targetWidth) {
                currentWidth += targetWidth / 100;
                fill.style.width = `${currentWidth}%`;
            }

            if (currentPoints >= targetPoints && currentWidth >= targetWidth) {
                clearInterval(interval);
                pointsText.textContent = `${targetPoints} points`;
                fill.style.width = `${targetWidth}%`;
            }
        }, 20);
    }
});
