
# WhatsApp Message Scheduler

WhatsApp Message Scheduler is a web application that allows users to schedule messages to be sent via WhatsApp at a later time. This tool is ideal for both personal and business use, enabling timely communication without the need to manually send messages at specific times.

## Features

- **Recurring Messages:** Schedule messages to be sent daily, weekly, or monthly. (Later)
- **Multi-Recipient Scheduling:** Send messages to multiple recipients or groups.
- **Attachment Scheduling:** Schedule messages with images, documents, and videos. (Later)
- **Message Analytics:** Track delivery status,and engagement metrics.
- **Timezone Support:** Adjust send times based on recipient timezones.
- **Voice and Video Message Scheduling:** Schedule voice and video messages. (Later)

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/AbhiiNaithani/WhatsApp-Msz-Scheduler.git
   ```
2. Navigate to the project directory:
   ```sh
   cd WhatsApp_Message_Scheduler
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the backend server:
   ```sh
   npm start
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```
3. Use the interface to schedule WhatsApp messages.

## API Endpoints

### Schedule a Message

- **Endpoint:** `/schedule-message`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "recipient": "+1234567890",
    "message": "Hello, this is a scheduled message!",
    "scheduleTime": "2024-07-07T10:00:00Z"
  }
  ```

### View Scheduled Messages

- **Endpoint:** `/scheduled-messages`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "recipient": "+1234567890",
      "message": "Hello, this is a scheduled message!",
      "scheduleTime": "2024-07-07T10:00:00Z"
    }
  ]
  ```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, reach out to:

- Your Name: [abhinaithani2@gmail.com](mailto:your.email@example.com)
- GitHub: [https://github.com/AbhiiNaithani](https://github.com/yourusername)
```