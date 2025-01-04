import sequelize from '../config/db.js'

const resolvers = {
  Query: {
    employees: async () => {
      const result = await sequelize.query('SELECT * FROM employees;', {
        type: sequelize.QueryTypes.SELECT, 
      });
      return result;
    },

    employee: async (parent, { id }) => {
      const result = await sequelize.query(
        'SELECT * FROM employees WHERE id = :id LIMIT 1;', {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
      });
      return result[0];  
    },
  },

  Mutation: {
    createEmployee: async (parent, { id, name, designation, salary, leaves }) => {
      await sequelize.query(
        `INSERT INTO employees (id, name, designation, salary, leaves) 
        VALUES (:id, :name, :designation, :salary, :leaves);`, {
          replacements: { id, name, designation, salary, leaves },
          type: sequelize.QueryTypes.INSERT,
        });
    
      const result = await sequelize.query(
        'SELECT * FROM employees WHERE id = :id LIMIT 1;', {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        });
      
      return result[0];  
    },
    

    updateEmployee: async (parent, { id, name, designation, salary, leaves }) => {
      await sequelize.query(
        `UPDATE employees SET 
          name = :name, 
          designation = :designation, 
          salary = :salary, 
          leaves = :leaves 
        WHERE id = :id;`, {
          replacements: { id, name, designation, salary, leaves },
          type: sequelize.QueryTypes.UPDATE,
        });
    
      const result = await sequelize.query(
        'SELECT * FROM employees WHERE id = :id LIMIT 1;', {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        });
    
      return result[0]; 
    },
    

    deleteEmployee: async (_, { id }) => {
     const employee = await sequelize.query(
        'SELECT * FROM employees WHERE id = :id LIMIT 1;', {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        });
    
      if (!employee || employee.length === 0) {
        throw new Error('Employee not found');  
      }
    
      await sequelize.query(
        'DELETE FROM employees WHERE id = :id;', {
          replacements: { id },
          type: sequelize.QueryTypes.DELETE,
        });
    
      return employee[0]; 
    },
    
  },
};

export default resolvers;
