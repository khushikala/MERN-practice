// Router configuration for User Story 2
export const routes = [
  { path: '/', name: 'Home', component: 'Home' },
  { path: '/packages', name: 'Packages', component: 'PackageList' },
  { path: '/contact', name: 'Contact', component: 'Contact' },
  { path: '/booking', name: 'Booking', component: 'BookingForm' },
  { path: '/dashboard', name: 'Dashboard', component: 'BookingDashboard' },
];

// Route transition configurations
export const transitionConfig = {
  enter: 'animate__animated animate__fadeIn',
  exit: 'animate__animated animate__fadeOut',
};
