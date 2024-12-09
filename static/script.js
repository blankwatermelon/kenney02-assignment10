document.addEventListener("DOMContentLoaded", () => {
    const queryForm = document.getElementById("query-form");
    const resultsDiv = document.getElementById("results");

    queryForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(queryForm);

        try {
            const response = await fetch("/search", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to process the request.");
            }

            const results = await response.json();
            resultsDiv.innerHTML = ""; // Clear existing results

            results.forEach(result => {
                const resultElement = document.createElement("div");
                resultElement.className = "result";

                const imgElement = document.createElement("img");
                imgElement.src = `/static/images/${result.file_name}`;
                imgElement.alt = `Result Image`;

                const similarityElement = document.createElement("p");
                similarityElement.textContent = `Similarity Score: ${result.similarity}`;

                resultElement.appendChild(imgElement);
                resultElement.appendChild(similarityElement);
                resultsDiv.appendChild(resultElement);
            });
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing your query.");
        }
    });
});
