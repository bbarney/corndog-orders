# Corndog Orders

A modern web application for managing corndog orders, built with Angular. This application simulates a food truck ordering system with both manual and automated order generation.

My wife owns a corndog food truck and this was a quick attempt to add online ordering. One of the challenges with a food truck at a busy event is people don't want to stand in line for a significant time, they want to spend time with friends and family. The remote ordering service simulates an external ordering app, where the customer doesn't have to stand in line, but orders through an app, then will receive an app notification when their order is ready for pick up.



## Features

- **Order Management**
  - Manual order creation with customer details
  - Automated random order generation every 30 seconds
  - Order history tracking
  - Total amount calculation

- **Menu Management**
  - Display of available corndog items
  - Item details including name, description, and price
  - Support for multiple item types (Epic, Mini)

- **User Interface**
  - Clean, modern design
  - Responsive layout
  - Real-time order updates
  - Order summary display

- **Automated Features**
  - Random order generation using Simpsons character names
  - Automatic total calculation
  - Phone number and ID generation
  - Menu item randomization

## Technical Stack

- **Frontend Framework**: Angular
- **State Management**: RxJS Observables
- **Styling**: CSS with modern layout techniques
- **Testing**: Jasmine/Karma for unit tests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bbarney/corndog-orders.git
   cd corndog-orders
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Testing

Run the unit tests:
```bash
ng test
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── order-form/
│   │   ├── order-summary/
│   │   └── orders-list/
│   ├── models/
│   │   ├── menu-item.model.ts
│   │   └── order.model.ts
│   └── services/
│       ├── menu.service.ts
│       ├── order.service.ts
│       └── remote-order.service.ts
├── assets/
│   └── images/
└── styles/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

## Acknowledgments

- Simpsons character names used for random order generation
- Food truck image for header decoration
