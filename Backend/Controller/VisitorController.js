const Visitor = require('../Model/VisitorScheme')
const requestIp = require("request-ip");
const { getLocationFromIP } = require("../Utils/iplocation");
const {getDeviceInfo} = require('../Utils/deviceinfo')


exports.track = async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    requestIp.getClientIp(req) ||
    "Unknown";

  try {
    const location = await getLocationFromIP(ip);
    const deviceInfo = getDeviceInfo(req);

    await Visitor.create({ ip, location, deviceInfo });

    res.status(200).json({ message: "Visitor tracked", ip, location, deviceInfo });
  } catch (err) {
    console.error("Error tracking visitor:", err);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};