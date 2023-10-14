import { Database } from 'bun:sqlite';

type BirthdayEvent = {
  id?: number;
  title: string;
  description: string;
  date: string;
};

export class EventsDatabase {
  private db: Database;

  constructor() {
      this.db = new Database('events.db');
      // Initialize the database
      this.init()
          .then(() => console.log('Database initialized'))
          .catch(console.error);
  }
    // Initialize the database
  async init() {
      return this.db.run('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT)');
  }
  async getEvents() {
    return this.db.query('SELECT * FROM events').all();
  }

  // Add a event
  async addEvent(event: BirthdayEvent) {
      // q: Get id type safely 
      return this.db.query(`INSERT INTO events (title, description, date) VALUES (?, ?, ?) RETURNING id`).get(event.title, event.description, event.date);
  }

  // Update a event
  async updateEvent(id: number, event: BirthdayEvent) {
      return this.db.run(`UPDATE events SET title = '${event.title}', description = '${event.description}', date = '${event.date}' WHERE id = ${id}`)
  }

  // Delete a event
  async deleteEvent(id: number) {
      return this.db.run(`DELETE FROM events WHERE id = ${id}`)
  }
}
