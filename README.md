# Electron Reminder App (提醒功能器)

A cross-platform desktop reminder application built with Electron, supporting both Windows and Ubuntu.

## Features

- Clean and modern user interface
- Text area for entering reminder notes
- Submit button with visual feedback
- **SQLite database integration** for persistent reminder storage
- Automatic timestamp recording (Unix Epoch format)
- Keyboard shortcuts (Enter to submit, Ctrl+Enter for new line)
- Cross-platform compatibility (Windows & Ubuntu)
- Secure implementation with context isolation and IPC communication

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd electron01Reminder
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the application in development mode:

```bash
npm start
```

Or use the alternative command:

```bash
npm run dev
```

## Project Structure

```
electron01Reminder/
├── main.js          # Main process (creates application window)
├── database.js      # SQLite database operations
├── index.html       # User interface with text area and button
├── preload.js       # Preload script for security
├── package.json     # Project configuration and dependencies
└── README.md        # Project documentation
```

## File Descriptions

- **main.js**: The main Electron process that manages the application lifecycle, creates browser windows, and handles IPC communication with the renderer process
- **database.js**: SQLite database module that handles all database operations including initialization, insertions, queries, and deletions
- **index.html**: Contains the UI with a text area for entering reminders and a submit button, includes client-side JavaScript for database interaction
- **preload.js**: Security layer that runs before the renderer process loads, implementing context isolation and exposing safe database APIs via contextBridge
- **package.json**: Defines project metadata, scripts, and dependencies (including sqlite3)

## Usage

1. Launch the application using `npm start`
2. Enter your reminder text in the text area
3. Click the "Submit Reminder" button or press Enter
4. The reminder will be saved to the SQLite database with:
   - The text you entered in the `information` field
   - Current timestamp in Unix Epoch format in the `time` field
   - An auto-generated `id`
5. A success message will display showing the reminder ID and timestamp
6. The text area will be cleared automatically

## Database

### SQLite Database Structure

The application uses SQLite for persistent storage. The database contains a `remind` table with the following schema:

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key with auto-increment and index |
| `information` | TEXT | The reminder text content (NOT NULL) |
| `time` | INTEGER | Unix timestamp in seconds (NOT NULL) |

### Database Location

The SQLite database file (`reminders.db`) is stored in the application's user data directory:

- **Windows**: `C:\Users\<username>\AppData\Roaming\electron-reminder\reminders.db`
- **Ubuntu/Linux**: `~/.config/electron-reminder/reminders.db`

### Database Operations

The application provides the following database operations through a secure IPC bridge:

- `saveReminder(information)`: Saves a new reminder with the current timestamp
- `getAllReminders()`: Retrieves all reminders ordered by time (newest first)
- `getReminder(id)`: Retrieves a specific reminder by ID
- `deleteReminder(id)`: Deletes a reminder by ID

All database operations are handled securely through Electron's IPC (Inter-Process Communication) mechanism, ensuring the renderer process cannot directly access Node.js or the filesystem.

## Security Features

This application implements Electron security best practices:

- Context Isolation enabled
- Node Integration disabled
- Content Security Policy (CSP) configured
- Preload script for safe API exposure through contextBridge
- IPC handlers for secure database communication

## Platform Support

- Windows (7, 8, 10, 11)
- Ubuntu (18.04 and later)
- Other Linux distributions should work but are not officially tested

## Development

The application is built with:

- **Electron** ^28.0.0 - Cross-platform desktop application framework
- **sqlite3** - Asynchronous SQLite3 library for Node.js with excellent compatibility
- **Vanilla JavaScript** - No frameworks, pure JavaScript for simplicity
- **Modern CSS** - Gradient backgrounds and responsive design

### Dependencies

- `electron`: Main framework for building cross-platform desktop apps
- `sqlite3`: SQLite database driver with native bindings (works on Windows and Ubuntu)

### Implementation Notes

- **Database Module**: Uses async/await pattern with Promises for all database operations
- **IPC Communication**: Secure communication between main and renderer processes via contextBridge
- **Content Security Policy**: Configured to allow inline styles and scripts while maintaining security

## Troubleshooting

### UI Not Displaying or JavaScript Not Working

**Issue**: The application window shows blank or styles/scripts don't work.

**Cause**: Content Security Policy (CSP) blocking inline styles and scripts.

**Solution**: The CSP has been configured to allow inline content:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'">
```

### Native Module Compilation Errors

**Issue**: Error during `npm install` about C++20 or unrecognized compiler options.

**Cause**: System's g++ compiler doesn't support C++20 (required by better-sqlite3).

**Solution**: This project uses `sqlite3` instead of `better-sqlite3` for better compiler compatibility. If you encounter compilation errors:

1. Ensure you have build tools installed:
   - **Ubuntu**: `sudo apt-get install build-essential`
   - **Windows**: Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/)

2. Clear and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Database Path

If you need to locate or backup your database:

- **Ubuntu/Linux**: `~/.config/electron-reminder/reminders.db`
- **Windows**: `%APPDATA%\electron-reminder\reminders.db`

You can query the database using any SQLite browser or command-line tool.

## License

MIT
