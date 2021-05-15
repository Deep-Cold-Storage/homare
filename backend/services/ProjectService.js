const projects = require('../models/projects');

class ProjectService {
  async getUserProjects(userId) {
    let projects = { owned: projects.find({ _userId: userId }), shared: projects.find({ 'members._userId': userId }) };

    return projects;
  }

  async create(userId, name, description) {
    let project = new projects({ name: name, description: description, _userId: userId });
    project.save();

    return project;
  }
}

module.exports = new ProjectService();
