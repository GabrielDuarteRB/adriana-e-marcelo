function toggleOffcanvas() {
    const offcanvas = document.getElementById('offcanvasNavbar');
    const navbarNav = document.getElementById('navbarNav');
    const iconMenu = document.getElementById('navbar-toggler-custom');

    offcanvas.classList.toggle('show');
    iconMenu.classList.toggle('show');
    navbarNav.classList.toggle('active');
}