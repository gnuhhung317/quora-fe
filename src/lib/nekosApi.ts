
// Function to fetch a random avatar
export async function fetchRandomImage() {
    try {
        const response = await fetch("https://pic.re/image", {
            method: "GET",
        });

        // If it's a direct image link, no JSON parsing is needed
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        return imageUrl;
    } catch (error) {
        console.error("Error fetching random image:", error);
        return "/default-avatar.png"; // Fallback to a default avatar on error

    }
}

