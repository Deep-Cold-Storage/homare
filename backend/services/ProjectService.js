const projects = require('../models/projects');

class ProjectService {
  async getUserProjects(userId) {
    return projects.find({ _userId: userId });
  }

  async create(userId, name, description) {
    let project = new projects({ name: name, description: description, _ownerId: userId });
    project.save();

    return project;
  }
}

module.exports = new ProjectService();
