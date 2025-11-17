# Electron Reminder App (提醒功能器)

A cross-platform desktop reminder application built with Electron, supporting both Windows and Ubuntu.

## Features

- Clean and modern user interface
- Text area for entering reminder notes
- Submit button with visual feedback
- Keyboard shortcuts (Enter to submit, Ctrl+Enter for new line)
- Cross-platform compatibility (Windows & Ubuntu)
- Secure implementation with context isolation

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
├── index.html       # User interface with text area and button
├── preload.js       # Preload script for security
├── package.json     # Project configuration and dependencies
└── README.md        # Project documentation
```

## File Descriptions

- **main.js**: The main Electron process that manages the application lifecycle and creates browser windows
- **index.html**: Contains the UI with a text area for entering reminders and a submit button
- **preload.js**: Security layer that runs before the renderer process loads, implementing context isolation
- **package.json**: Defines project metadata, scripts, and dependencies

## Usage

1. Launch the application using `npm start`
2. Enter your reminder text in the text area
3. Click the "Submit Reminder" button or press Enter
4. The reminder will be displayed in the output area
5. The text area will be cleared automatically

## Security Features

This application implements Electron security best practices:

- Context Isolation enabled
- Node Integration disabled
- Content Security Policy (CSP) configured
- Preload script for safe API exposure

## Platform Support

- Windows (7, 8, 10, 11)
- Ubuntu (18.04 and later)
- Other Linux distributions should work but are not officially tested

## Development

The application is built with:

- Electron ^28.0.0
- Vanilla JavaScript (no frameworks)
- Modern CSS with gradient backgrounds

## License

MIT
