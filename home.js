document.addEventListener('DOMContentLoaded', () => {

    const descriptionBox = document.getElementById('display-description');
    if (data.aboutMe_part2) {
        descriptionBox.innerText = data.aboutMe_part2;
    }

    const rolesBox = document.getElementById('display-roles');
    if (data.experiences) {
        
        const rolesArray = data.experiences.slice(0, 4).map(item => item.role);
        
        rolesBox.innerText = rolesArray.join(' • ') + ' • PHD';
    }

});