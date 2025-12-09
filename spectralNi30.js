// specTralNi30 - Geospatial Data Science Platform
// JavaScript for interactivity and form handling

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target[0].value;
    const email = formData.get('email') || event.target[1].value;
    const message = formData.get('message') || event.target[2].value;
    
    // Display success message
    alert(`Thank you ${name}! Your message has been sent successfully. We will get back to you at ${email} soon.`);
    
    // Reset form
    event.target.reset();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to service cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideDown 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
});

// Observe all service cards
document.querySelectorAll('.service-card, .project-card, .about-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('specTralNi30 Geospatial Data Science Platform loaded successfully');
    
    // Add scroll event listener for navbar effects
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});

// Function to calculate NDVI (Normalized Difference Vegetation Index)
function calculateNDVI(redBand, nearInfraredBand) {
    if (redBand === 0 && nearInfraredBand === 0) return 0;
    return (nearInfraredBand - redBand) / (nearInfraredBand + redBand);
}

// Function to get land cover classification
function classifyLandCover(ndvi) {
    if (ndvi < -0.1) return 'Water';
    if (ndvi < 0.2) return 'Urban/Barren';
    if (ndvi < 0.4) return 'Cropland';
    if (ndvi < 0.6) return 'Grassland';
    return 'Dense Forest';
}

// Geospatial analysis utilities
const GeoSpatialTools = {
    // Calculate distance between two coordinates (Haversine formula)
    calculateDistance: function(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },
    
    // Validate coordinates
    validateCoordinates: function(lat, lon) {
        return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    },
    
    // Get spatial statistics
    getSpatialStats: function(dataArray) {
        if (dataArray.length === 0) return null;
        const mean = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const min = Math.min(...dataArray);
        const max = Math.max(...dataArray);
        return { mean, min, max };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateNDVI,
        classifyLandCover,
        GeoSpatialTools,
        handleSubmit
    };
}
