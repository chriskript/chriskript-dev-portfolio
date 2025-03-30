document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the visibility of project descriptions
    function toggleDescription(element) {
        // Select all project list items
        const allItems = document.querySelectorAll('.projects ul li');

        // Close all other items except the clicked one
        allItems.forEach(item => {
            if (item !== element) {
                item.classList.remove('active');
                const icon = item.querySelector('.toggle-icon');
                icon.classList.remove('fa-caret-up');
                icon.classList.add('fa-caret-down');
            }
        });

        // Toggle the active state of the clicked item
        element.classList.toggle('active');
        const icon = element.querySelector('.toggle-icon');
        if (element.classList.contains('active')) {
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-up');
        } else {
            icon.classList.remove('fa-caret-up');
            icon.classList.add('fa-caret-down');
        }
    }

    // Function to toggle the visibility of experience descriptions
    function toggleExperience(element) {
        // Select all experience list items
        const allItems = document.querySelectorAll('.experience-box ul li');

        // Close all other items except the clicked one
        allItems.forEach(item => {
            if (item !== element) {
                item.classList.remove('active');
                const icon = item.querySelector('.toggle-icon');
                icon.classList.remove('fa-caret-up');
                icon.classList.add('fa-caret-down');
                const description = item.querySelector('.description');
                if (description) description.style.display = 'none';
            }
        });

        // Toggle the active state of the clicked item
        element.classList.toggle('active');
        const icon = element.querySelector('.toggle-icon');
        const description = element.querySelector('.description');
        if (element.classList.contains('active')) {
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-up');
            if (description) description.style.display = 'block';
        } else {
            icon.classList.remove('fa-caret-up');
            icon.classList.add('fa-caret-down');
            if (description) description.style.display = 'none';
        }
    }

    // Attach event listeners to project list items
    document.querySelectorAll('.projects ul li').forEach(item => {
        item.addEventListener('click', () => toggleDescription(item));
    });

    // Attach event listeners to experience list items
    document.querySelectorAll('.experience-box ul li').forEach(item => {
        item.addEventListener('click', () => toggleExperience(item));
    });
});