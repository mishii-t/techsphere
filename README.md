# Contact Form Backend Setup

This backend handles contact form submissions from the TechSphere website and sends emails to tuaha256@gmail.com.

## Prerequisites

- Node.js installed on your system
- A Gmail account (tuaha256@gmail.com)

## Setup Instructions

1. **Install Dependencies:**
   ```
   npm install
   ```

2. **Set up Gmail App Password:**
   - Go to your Gmail account settings.
   - Enable 2-Factor Authentication if not already enabled.
   - Generate an App Password: Go to Security > App passwords > Generate a new app password.
   - Copy the 16-character password.

3. **Create Environment Variable:**
   - Create a `.env` file in the root directory.
   - Add the following line:
     ```
     GMAIL_APP_PASSWORD=your_16_character_app_password_here
     ```

4. **Run the Server:**
   ```
   npm start
   ```
   The server will run on http://localhost:3000.

## Usage

- The contact form on contact.html will now send POST requests to `/send-email` endpoint.
- Emails will be sent from tuaha256@gmail.com to tuaha256@gmail.com with the form data.

## Deployment

For production deployment, consider using services like Heroku, Vercel, or AWS. Make sure to set the `GMAIL_APP_PASSWORD` environment variable in your deployment platform.

## Security Note

Never commit the `.env` file or share your app password. Keep it secure.
