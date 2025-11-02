// Mock event data - simulating API response
const mockEvents = [
  {
    id: 1,
    title: "Tech Summit 2025",
    category: "Technology",
    date: "2025-12-01",
    description: "Annual technology conference featuring industry leaders",
    capacity: 500,
    registeredAttendees: 250,
  },
  {
    id: 2,
    title: "Design Workshop",
    category: "Design",
    date: "2025-11-15",
    description: "Hands-on workshop for UX/UI designers",
    capacity: 50,
    registeredAttendees: 35,
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    category: "Business",
    date: "2025-11-30",
    description: "Pitch your startup to potential investors",
    capacity: 100,
    registeredAttendees: 75,
  },
  {
    id: 4,
    title: "AI Conference",
    category: "Technology",
    date: "2025-12-15",
    description: "Exploring the latest in artificial intelligence",
    capacity: 300,
    registeredAttendees: 200,
  },
];

// ES6 Class for Event Management
class EventDashboard {
  constructor() {
    // Using let/const for variable declarations
    this.events = [];
    this.filteredEvents = [];

    // DOM Elements using arrow function
    const initializeDOMElements = () => {
      this.categoryFilter = document.getElementById("categoryFilter");
      this.dateFilter = document.getElementById("dateFilter");
      this.eventContainer = document.getElementById("eventContainer");
      this.loadingIndicator = document.getElementById("loadingIndicator");
    };

    initializeDOMElements();
    this.initializeEventListeners();
  }

  // Event Listeners using arrow functions
  initializeEventListeners = () => {
    this.categoryFilter?.addEventListener("change", () => this.filterEvents());
    this.dateFilter?.addEventListener("change", () => this.filterEvents());
  };

  // Simulated API call using async/await
  async fetchEvents() {
    try {
      // Show loading state
      this.toggleLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate fetch response
      const response = await new Promise((resolve) => {
        resolve({
          ok: true,
          json: () => Promise.resolve(mockEvents),
        });
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      this.events = data;
      this.filteredEvents = [...this.events];
      this.renderEvents();
    } catch (error) {
      console.error("Error fetching events:", error);
      this.showError("Failed to load events. Please try again later.");
    } finally {
      this.toggleLoading(false);
    }
  }

  // Filter events using destructuring and array methods
  filterEvents() {
    const selectedCategory = this.categoryFilter?.value;
    const selectedDate = this.dateFilter?.value;

    this.filteredEvents = this.events.filter((event) => {
      const { category, date } = event; // Destructuring
      const categoryMatch = !selectedCategory || category === selectedCategory;
      const dateMatch = !selectedDate || date === selectedDate;
      return categoryMatch && dateMatch;
    });

    this.renderEvents();
  }

  // Render events using template literals and DOM manipulation
  renderEvents() {
    if (!this.eventContainer) return;

    this.eventContainer.innerHTML = this.filteredEvents
      .map((event) => {
        const {
          title,
          category,
          date,
          description,
          capacity,
          registeredAttendees,
        } = event;
        const availability =
          ((capacity - registeredAttendees) / capacity) * 100;

        return `
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${category}</h6>
                            <p class="card-text">${description}</p>
                            <div class="progress mb-3">
                                <div class="progress-bar" role="progressbar" 
                                     style="width: ${availability}%"
                                     aria-valuenow="${availability}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                    ${Math.round(availability)}% Available
                                </div>
                            </div>
                            <p class="card-text">
                                <small class="text-muted">Date: ${this.formatDate(
                                  date
                                )}</small>
                            </p>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  // Utility function using template literals
  formatDate(dateStr) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  }

  // Error handling utility
  showError(message) {
    const errorHtml = `
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        `;
    this.eventContainer.innerHTML = errorHtml;
  }

  // Loading state toggle
  toggleLoading(show) {
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = show ? "block" : "none";
    }
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const dashboard = new EventDashboard();
  dashboard.fetchEvents();
});
