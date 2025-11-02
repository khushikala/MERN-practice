// Customer Status Enum
enum CustomerStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Blocked = "BLOCKED",
}

// Customer Type Enum
enum CustomerType {
  Regular = "REGULAR",
  VIP = "VIP",
  Corporate = "CORPORATE",
}

// Customer Interface
interface ICustomer {
  id: string;
  name: string;
  email: string;
  type: CustomerType;
  status: CustomerStatus;
  registrationDate: Date;
}

// Registration Request Interface
interface IRegistrationRequest {
  name: string;
  email: string;
  type: CustomerType;
}

// Validation Decorator
function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const request: IRegistrationRequest = args[0];

    if (!request.email || !request.email.includes("@")) {
      throw new Error("Invalid email address");
    }

    if (!request.name || request.name.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// Logging Decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}


  // Register new customer
  @validate
  @log
  public async registerCustomer(
    request: IRegistrationRequest
  ): Promise<ICustomer> {
    try {
      const customer: Omit<ICustomer, "id"> = {
        ...request,
        status: CustomerStatus.Active,
        registrationDate: new Date(),
      };

      return await this.repository.createCustomer(customer);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  // Get customer by ID (DB-backed)
  public async getCustomer(id: string): Promise<ICustomer | undefined> {
    try {
      return await this.repository.getCustomerById(id);
    } catch (error) {
      return undefined;
    }
  }

  // Update customer status (DB-backed)
  @log
  public async updateCustomerStatus(
    id: string,
    status: CustomerStatus
  ): Promise<boolean> {
    try {
      await this.repository.updateCustomerStatus(id, status);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get all customers (DB-backed)
  public async getAllCustomers(): Promise<ICustomer[]> {
    return await this.repository.getAllCustomers();
  }

  // Get customers by type (DB-backed)
  public async getCustomersByType(type: CustomerType): Promise<ICustomer[]> {
    return await this.repository.getCustomersByType(type);
  }

  // Get active customers count (DB-backed)
  public async getActiveCustomersCount(): Promise<number> {
    const customers = await this.getAllCustomers();
    return customers.filter((c) => c.status === CustomerStatus.Active).length;
  }

  // Private helper method to generate ID (not used when using DB UUID)
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Export the module
export {
  CustomerRegistrationModule,
  CustomerStatus,
  CustomerType,
  ICustomer,
  IRegistrationRequest,
};
