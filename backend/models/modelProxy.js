import MockModel from './mockModel.js';

export function getModelProxy(mongooseModel, modelName) {
  const mockInstance = new MockModel(modelName);

  return new Proxy(mongooseModel, {
    get(target, prop) {
      // If mock mode is enabled, check if property exists on mockInstance
      if (global.useMockDB) {
        if (prop === 'create') {
          return async (doc) => mockInstance.create(doc);
        }
        if (prop === 'insertMany') {
          return async (docs) => mockInstance.insertMany(docs);
        }
        if (prop === 'deleteMany') {
          return async (query) => mockInstance.deleteMany(query);
        }
        if (prop === 'find') {
          return (query) => mockInstance.find(query);
        }
        if (prop === 'findOne') {
          return (query) => mockInstance.findOne(query);
        }
        if (prop === 'findById') {
          return (id) => mockInstance.findById(id);
        }
        if (prop === 'findByIdAndUpdate') {
          return (id, update) => mockInstance.findByIdAndUpdate(id, update);
        }
        if (prop === 'findByIdAndDelete') {
          return (id) => mockInstance.findByIdAndDelete(id);
        }
      }
      
      // Fallback to Mongoose
      const val = target[prop];
      if (typeof val === 'function') {
        return val.bind(target);
      }
      return val;
    },
    
    construct(target, args) {
      const data = args[0] || {};
      
      if (global.useMockDB) {
        return {
          ...data,
          save: async function() {
            const created = await mockInstance.create(data);
            Object.assign(this, created);
            return this;
          }
        };
      }
      
      return new target(...args);
    }
  });
}
