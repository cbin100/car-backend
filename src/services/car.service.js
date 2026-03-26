// src/services/car.service.js
const db = require('../config/firestore');

exports.getCars = async (filters) => {
  let query = db.collection('cars');

  // Firestore filters
  if (filters.make) {
    query = query.where('make', '==', filters.make.toLowerCase());
  }

  if (filters.fuel) {
    query = query.where('fuel', '==', filters.fuel.toLowerCase());
  }

  if (filters.minYear) {
    query = query.where('year', '>=', Number(filters.minYear));
  }

  const snapshot = await query.get();

  let results = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // SEARCH (used used in frontend, so we can do it here for better performance)
  if (filters.search) {
    const search = filters.search.toLowerCase();

    results = results.filter(car =>
      `${car.make || ''} ${car.model || ''}`
        .toLowerCase()
        .includes(search)
    );
  }

  // SORTING (safer)
  if (filters.sortBy) {
    const field = filters.sortBy;
    const order = filters.order === 'desc' ? -1 : 1;

    results.sort((a, b) => {
      if (a[field] == null) return 1;
      if (b[field] == null) return -1;

      if (typeof a[field] === 'number') {
        return (a[field] - b[field]) * order;
      }

      return String(a[field]).localeCompare(String(b[field])) * order;
    });
  }

  // PAGINATION
  const limit = Number(filters.limit) || 50;
  const page = Number(filters.page) || 1;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = results.slice(start, end);

  return {
    total: results.length,
    page,
    limit,
    data: paginatedData,
  };
};