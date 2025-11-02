var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Customer Status Enum
var CustomerStatus;
(function (CustomerStatus) {
    CustomerStatus["Active"] = "ACTIVE";
    CustomerStatus["Inactive"] = "INACTIVE";
    CustomerStatus["Blocked"] = "BLOCKED";
})(CustomerStatus || (CustomerStatus = {}));
// Customer Type Enum
var CustomerType;
(function (CustomerType) {
    CustomerType["Regular"] = "REGULAR";
    CustomerType["VIP"] = "VIP";
    CustomerType["Corporate"] = "CORPORATE";
})(CustomerType || (CustomerType = {}));
// Validation Decorator
function validate(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const request = args[0];
        if (!request.email || !request.email.includes('@')) {
            throw new Error('Invalid email address');
        }
        if (!request.name || request.name.length < 2) {
            throw new Error('Name must be at least 2 characters long');
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// Logging Decorator
function log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Calling ${propertyKey} with args:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Method ${propertyKey} returned:`, result);
        return result;
    };
    return descriptor;
}
// Customer Registration Module
class CustomerRegistrationModule {
    constructor() {
        this.customers = new Map();
    }
    // Register new customer
    registerCustomer(request) {
        const customer = Object.assign(Object.assign({ id: this.generateId() }, request), { status: CustomerStatus.Active, registrationDate: new Date() });
        this.customers.set(customer.id, customer);
        return customer;
    }
    // Get customer by ID
    getCustomer(id) {
        return this.customers.get(id);
    }
    // Update customer status
    updateCustomerStatus(id, status) {
        const customer = this.customers.get(id);
        if (customer) {
            customer.status = status;
            this.customers.set(id, customer);
            return true;
        }
        return false;
    }
    // Get all customers
    *getAllCustomers() {
        for (const customer of this.customers.values()) {
            yield customer;
        }
    }
    // Get customers by type
    getCustomersByType(type) {
        return Array.from(this.customers.values())
            .filter(customer => customer.type === type);
    }
    // Get active customers count
    getActiveCustomersCount() {
        return Array.from(this.customers.values())
            .filter(customer => customer.status === CustomerStatus.Active)
            .length;
    }
    // Private helper method to generate ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}
__decorate([
    validate,
    log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], CustomerRegistrationModule.prototype, "registerCustomer", null);
__decorate([
    log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Boolean)
], CustomerRegistrationModule.prototype, "updateCustomerStatus", null);
// Export the module
export { CustomerRegistrationModule, CustomerStatus, CustomerType };
