document.addEventListener("DOMContentLoaded", () => {
    const fingerprintButton = document.getElementById("scanFingerprint");
    const bloodGroupResult = document.getElementById("bloodGroupResult").querySelector("span");
    const findDonorsButton = document.getElementById("findDonors");
    const donorList = document.getElementById("donorList");
    const findBloodBanksButton = document.getElementById("findBloodBanks");
    const mapDiv = document.getElementById("map");
    const confirmDonationButton = document.getElementById("confirmDonation");
    const donationStatus = document.getElementById("donationStatus");

    let detectedBloodGroup = null;
    let donors = [
        { name: "John Doe", bloodGroup: "A+", contact: "+911234567890" },
        { name: "Jane Smith", bloodGroup: "O-", contact: "+919876543210" }
    ];

    // 🔹 Simulated Fingerprint Scanner
    fingerprintButton.addEventListener("click", async () => {
        alert("🔍 Scanning fingerprint...");
        setTimeout(() => {
            detectedBloodGroup = "A+";  // Placeholder (Replace with real fingerprint scanner API)
            bloodGroupResult.textContent = detectedBloodGroup;
            alert(`✅ Blood Group Detected: ${detectedBloodGroup}`);
        }, 2000);
    });

    // 🔹 Find Matching Donors
    findDonorsButton.addEventListener("click", () => {
        let inputBloodGroup = document.getElementById("bloodGroupInput").value.toUpperCase();
        donorList.innerHTML = "";

        let matchingDonors = donors.filter(d => d.bloodGroup === inputBloodGroup);
        if (matchingDonors.length > 0) {
            matchingDonors.forEach(donor => {
                let li = document.createElement("li");
                li.textContent = `✅ ${donor.name} - 📞 ${donor.contact}`;
                donorList.appendChild(li);
                
                // Send SMS Alert (Twilio)
                fetch("/send_sms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: donor.contact })
                }).then(res => res.json())
                .then(data => console.log(data.message))
                .catch(err => console.error("Error sending SMS:", err));
            });
            alert("📲 SMS alerts sent to matching donors!");
        } else {
            donorList.innerHTML = "<li>❌ No matching donors found</li>";
        }
    });

    // 🔹 Show Nearby Blood Banks (Google Maps API)
    findBloodBanksButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                let map = new google.maps.Map(mapDiv, { zoom: 14, center: userLocation });

                new google.maps.Marker({ position: userLocation, map: map, title: "You Are Here" });

                let request = { location: userLocation, radius: "5000", type: ["hospital"] };
                let service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        results.forEach(place => {
                            new google.maps.Marker({
                                position: place.geometry.location,
                                map: map,
                                title: place.name
                            });
                        });
                    }
                });
            });
        } else {
            alert("❌ Geolocation is not supported by your browser.");
        }
    });

    // 🔹 Confirm Family Member Donation
    confirmDonationButton.addEventListener("click", () => {
        let familyMember = document.getElementById("familyMemberName").value;
        if (familyMember) {
            donationStatus.textContent = `✅ ${familyMember} has donated blood!`;
            donationStatus.style.color = "green";
        } else {
            donationStatus.textContent = "❌ Please enter a family member's name.";
            donationStatus.style.color = "red";
        }
    });
});
