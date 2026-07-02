import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class MockModel {
  constructor(modelName, defaultData = []) {
    this.modelName = modelName;
    this.filePath = path.join(DATA_DIR, `${modelName.toLowerCase()}s.json`);
    this.defaultData = defaultData;
    this._initFile();
  }

  _initFile() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(this.defaultData, null, 2));
    }
  }

  _read() {
    this._initFile();
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error reading ${this.filePath}:`, e);
      return [];
    }
  }

  _write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`Error writing ${this.filePath}:`, e);
    }
  }

  find(query = {}) {
    let items = this._read();
    
    // Simple filter matching
    if (Object.keys(query).length > 0) {
      items = items.filter(item => {
        for (const key in query) {
          if (item[key] !== query[key]) return false;
        }
        return true;
      });
    }

    let sortCriteria = null;

    const queryObj = {
      sort(criteria) {
        sortCriteria = criteria;
        return this;
      },
      // Support await by making it thenable
      then(onFulfilled, onRejected) {
        let result = [...items];
        if (sortCriteria) {
          const key = Object.keys(sortCriteria)[0];
          const dir = sortCriteria[key]; // 1 or -1
          result.sort((a, b) => {
            if (a[key] < b[key]) return -1 * dir;
            if (a[key] > b[key]) return 1 * dir;
            return 0;
          });
        }
        return Promise.resolve(result).then(onFulfilled, onRejected);
      }
    };

    return queryObj;
  }

  async findOne(query = {}) {
    const items = this._read();
    return items.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }

  async findById(id) {
    const items = this._read();
    return items.find(item => item._id === id);
  }

  async findByIdAndUpdate(id, update) {
    const items = this._read();
    const index = items.findIndex(item => item._id === id);
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...update, updatedAt: new Date().toISOString() };
    this._write(items);
    return items[index];
  }

  async findByIdAndDelete(id) {
    const items = this._read();
    const filtered = items.filter(item => item._id !== id);
    this._write(filtered);
    return { message: 'Deleted successfully' };
  }

  async deleteMany(query = {}) {
    if (Object.keys(query).length === 0) {
      this._write([]);
    } else {
      let items = this._read();
      items = items.filter(item => {
        for (const key in query) {
          if (item[key] === query[key]) return false;
        }
        return true;
      });
      this._write(items);
    }
    return { deletedCount: 0 };
  }

  async insertMany(docs) {
    const items = this._read();
    const formattedDocs = docs.map(doc => ({
      _id: doc._id || Math.random().toString(36).substring(2, 11),
      ...doc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    items.push(...formattedDocs);
    this._write(items);
    return formattedDocs;
  }

  async create(doc) {
    const items = this._read();
    const newDoc = {
      _id: Math.random().toString(36).substring(2, 11),
      ...doc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newDoc);
    this._write(items);
    return newDoc;
  }
}

export default MockModel;
