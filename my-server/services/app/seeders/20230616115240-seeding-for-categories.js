'use strict';
const fs = require("fs")
const data = JSON.parse(fs.readFileSync("./data/category.json", "utf-8")).map(el => {
  delete el.id
  el.createdAt = new Date()
  el.updatedAt = new Date()
  return el
})

console.log(data, 'isi dari data nih<<<<<<<<<<');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null)
  }
};
