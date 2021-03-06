const projects = require('../models/projects');
const users = require('../models/users');

class ProjectService {
  async getUserProject(userId, projectId) {
    let project = await projects.findOne({ _userId: userId, _id: projectId });

    return project;
  }

  async getUserProjects(userId) {
    let project = { owned: await projects.find({ _userId: userId }), shared: await projects.find({ 'members._userId': userId }) };

    return project;
  }

  async create(userId, name, description) {
    let project = new projects({ name: name, description: description, _userId: userId });

    project.save();

    return project;
  }

  async update(projectId, name, description) {
    let project = await projects.findOne({ _id: projectId });
    project.name = name;
    project.description = description;

    project.save();

    return project;
  }

  async delete(projectId) {
    await projects.deleteOne({ _id: projectId });

    return;
  }

  async getMembers(projectId) {
    const project = await projects.findOne({ _id: projectId }).populate('members.user', '-_id -__v -auth');

    return project.members;
  }

  async createMember(projectId, email) {
    let user = await users.findOne({ email: email });
    const project = await projects.findOne({ _id: projectId });

    if (!user) {
      user = new users({ email: email });
      user.save();
    }

    project.members.push({ _userId: user._id });

    project.save();

    return project.members;
  }

  async removeMember(projectId, memberId) {
    const project = await projects.findOne({ _id: projectId });

    project.members = project.members.filter((x) => String(x._id) !== String(memberId));

    project.save();

    return project.members;
  }

  async getPalettes(projectId) {
    const project = await projects.findOne({ _id: projectId });

    return project.palettes;
  }

  async createPalette(projectId, name) {
    const project = await projects.findOne({ _id: projectId });

    project.palettes.push({ name: name });

    project.save();

    return project.palettes;
  }

  async updatePalette(projectId, paletteId, name, colors) {
    const project = await projects.updateOne({ _id: projectId, 'palettes._id': paletteId }, { $set: { 'palettes.$.name': name, 'palettes.$.colors': colors } });

    return project.palettes;
  }

  async deletePalette(projectId, paletteId) {
    const project = await projects.findOne({ _id: projectId });

    project.palettes = project.palettes.filter((x) => String(x._id) !== String(paletteId));

    project.save();

    return project.palettes;
  }
}

module.exports = new ProjectService();
