const root = (req, res) => {
  res.json({ message: "API funcionando" });
};

const marco = (req, res) => {
  res.json({ message: "polo" });
};

const ping = (req, res) => {
  res.json({ message: "pong", time: new Date().toISOString() });
};

module.exports = {
  root,
  marco,
  ping,
};
