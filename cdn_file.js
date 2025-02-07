
    (function() {
        console.log("Custom Bubble.io Widget Loaded");
    
        // Get URL parameters to dynamically create fields
        const params = new URLSearchParams(window.location.search);
        const fields = params.get("fields") ? params.get("fields").split(",") : ["email", "company", "phone"];
    
        // Create a form dynamically
        let form = document.createElement("form");
        form.id = "custom-form";
        form.style = "padding: 10px; background: #222; color: #fff; border-radius: 5px; width: 300px;";
    
        fields.forEach(field => {
            let label = field.charAt(0).toUpperCase() + field.slice(1);
            let inputType = field === "email" ? "email" : field === "phone" ? "tel" : "text";
            
            form.innerHTML += `
                <label>${label}:</label>
                <input type="${inputType}" id="${field}" placeholder="Enter your ${field}" required><br><br>
            `;
        });
    
        form.innerHTML += `
            <button type="submit" style="background: blue; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s ease;">Submit</button>
        `;
    
        document.body.appendChild(form);
    
        // Handle form submission
        document.getElementById("custom-form").addEventListener("submit", async function(event) {
            event.preventDefault();
    
            // Get form values
            let customerName = document.getElementById("company") ? document.getElementById("company").value : "Unknown";
            let phoneNumber = document.getElementById("phone") ? document.getElementById("phone").value : "";
    
            if (!phoneNumber) {
                alert("Please enter a valid phone number.");
                return;
            }
    
            // API call to Vapi
            const requestBody = {
                assistantId: "assistantid",
                phoneNumberId: "phonenumberid",
                customer: {
                    number: phoneNumber,
                    name: customerName
                }
            };
    
            try {
                const response = await fetch("https://api.vapi.ai/call", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer apikey",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                });
    
                if (response.ok) {
                    alert("Call request sent successfully!");
                } else {
                    alert("Error sending call request.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    
    })();
