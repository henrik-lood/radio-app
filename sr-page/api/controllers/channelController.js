const fetch = require('node-fetch');

const getAllChannels = async (req, res) => {
  let channels = await fetch(`http://api.sr.se/api/v2/channels?format=json&pagination=false`);
  channels = await channels.json();
  res.json(channels);
};

const getAllCategories = async (req, res) => {
  let categories = await fetch(`http://api.sr.se/api/v2/programcategories?format=json&pagination=false`);
  categories = await categories.json();
  res.json(categories);
};

const getPrograms = async (req, res) => {
  let programs = await fetch(`http://api.sr.se/api/v2/programs/index?channelid=${req.params.id}&format=json&pagination=false`);
  programs = await programs.json();

  let schedule = await fetch(`http://api.sr.se/v2/scheduledepisodes?channelid=${req.params.id}&format=json&pagination=false`)
  schedule = await schedule.json();

  let compiled = {programs, schedule}

  res.json(compiled);
};

const getAllPrograms = async (req, res) => {
  let programs = await fetch(`http://api.sr.se/api/v2/programs?format=json&pagination=false`);
  programs = await programs.json();
  res.json(programs);
};

const getSelectedCategories = async (req, res) => {
  let categories = await fetch(`http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.id}&pagination=false&format=json`);
  categories = await categories.json();
  res.json(categories);
}

module.exports = {
  getAllChannels,
  getAllCategories,
  getPrograms,
  getAllPrograms,
  getSelectedCategories,
};