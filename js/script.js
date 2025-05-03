document.addEventListener("DOMContentLoaded", function () {
    // Data: Array of Cloth Items
    const posts = [
        { id: 1, title: "Casual Dress", image: "./image/casual.jpeg", category: "casual", description: "A comfortable casual dress made with breathable fabric." },
        { id: 2, title: "Traditional Attire", image: "./image/trad.jpeg", category: "traditional", description: "Elegant traditional attire reflecting cultural heritage." },
        { id: 3, title: "Formal Wear", image: "./image/formal1.jpeg", category: "formal", description: "A classy formal outfit designed for special occasions." },
        { id: 4, title: "Casual Dress", image: "./image/casual2.jpeg", category: "casual", description: "Stylish casual wear perfect for outings." },
        { id: 5, title: "Luxury Gown", image: "./image/elegant.jpeg", category: "formal", description: "A beautifully designed luxury gown for grand events." }
    ];

    const galleryContainer = document.querySelector(".gallery-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Function to Generate Posts Based on Category Filter
    function generatePosts(filter = "all") {
        if (!galleryContainer) {
            console.error("Gallery container not found!");
            return;
        }
        
        galleryContainer.innerHTML = ""; // Clear previous posts

        posts.forEach(post => {
            if (filter === "all" || post.category === filter) {
                const postElement = document.createElement("div");
                postElement.classList.add("gallery-item", "col-md-4");
                postElement.setAttribute("data-category", post.category);

                postElement.innerHTML = `
                    <a href="description.html?id=${post.id}&title=${encodeURIComponent(post.title)}&image=${encodeURIComponent(post.image)}&description=${encodeURIComponent(post.description)}">
                        <img src="${post.image}" alt="${post.title}">
                        <h3>${post.title}</h3>
                    </a>
                `;

                galleryContainer.appendChild(postElement);
            }
        });
    }

    // Default: Show All Posts on Page Load
    generatePosts();

    // Filter Functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");
            generatePosts(filter);
        });
    });

    // Handle Description Page
    const titleElement = document.getElementById("cloth-title");
    const imageElement = document.getElementById("cloth-image");
    const descriptionElement = document.getElementById("cloth-description");

    if (titleElement && imageElement && descriptionElement) {
        const urlParams = new URLSearchParams(window.location.search);
        
        const clothTitle = decodeURIComponent(urlParams.get("title"));
        const clothImage = decodeURIComponent(urlParams.get("image"));
        const clothDescription = decodeURIComponent(urlParams.get("description"));

        console.log("Title:", clothTitle);
        console.log("Image:", clothImage);
        console.log("Description:", clothDescription);

        if (clothTitle && clothImage && clothDescription) {
            titleElement.innerText = clothTitle;
            imageElement.src = clothImage;
            imageElement.alt = clothTitle;
            descriptionElement.innerText = clothDescription;
        } else {
            console.error("Missing data! Ensure query parameters exist.");
        }
    }
});