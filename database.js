const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

let db = null;

// Initialize the database
function initDatabase() {
  return new Promise((resolve, reject) => {
    // Store database in user data directory
    const dbPath = path.join(app.getPath('userData'), 'reminders.db');
    console.log('Database path:', dbPath);

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }

      // Create the remind table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS remind (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          information TEXT NOT NULL,
          time INTEGER NOT NULL
        )
      `;

      db.run(createTableSQL, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          reject(err);
          return;
        }

        // Create index on id (though PRIMARY KEY already creates an index)
        const createIndexSQL = `
          CREATE INDEX IF NOT EXISTS idx_remind_id ON remind(id)
        `;

        db.run(createIndexSQL, (err) => {
          if (err) {
            console.error('Error creating index:', err);
            reject(err);
            return;
          }

          console.log('Database initialized successfully');
          resolve();
        });
      });
    });
  });
}

// Insert a new reminder
function insertReminder(information) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const time = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const insertSQL = 'INSERT INTO remind (information, time) VALUES (?, ?)';

    db.run(insertSQL, [information, time], function(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        id: this.lastID,
        information: information,
        time: time
      });
    });
  });
}

// Get all reminders
function getAllReminders() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const selectSQL = 'SELECT * FROM remind ORDER BY time DESC';

    db.all(selectSQL, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });
}

// Get a single reminder by id
function getReminderById(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const selectSQL = 'SELECT * FROM remind WHERE id = ?';

    db.get(selectSQL, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row);
    });
  });
}

// Delete a reminder
function deleteReminder(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const deleteSQL = 'DELETE FROM remind WHERE id = ?';

    db.run(deleteSQL, [id], function(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(this.changes > 0);
    });
  });
}

// Close the database
function closeDatabase() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err);
          reject(err);
          return;
        }
        console.log('Database closed');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  initDatabase,
  insertReminder,
  getAllReminders,
  getReminderById,
  deleteReminder,
  closeDatabase
};
