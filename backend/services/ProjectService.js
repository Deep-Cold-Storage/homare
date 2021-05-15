const projects = require('../models/projects');
const users = require('../models/users');

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

  async getMembers(projectId) {
    const project = projects.find({ _Id: projectId });

    return project.members;
  }

  async createMember(projectId, email) {
    let user = await users.findOne({ email: email });
    const project = projects.find({ _Id: projectId });

    if (!user) {
      user = new users({ email: email });

      user.save();
    }

    project.members.push(user._Id);

    return project.members;
  }

  async removeMember(projectId, memberId) {
    const project = projects.find({ _Id: projectId });

    project.members = project.members.filter((x) => String(x) !== String(memberId));

    return project.members;
  }
}

module.exports = new ProjectService();
