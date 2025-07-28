// const Visitor = require('../Model/VisitorScheme')
// const requestIp = require("request-ip");
// const { getLocationFromIP } = require("../Utils/iplocation");
// const {getDeviceInfo} = require('../Utils/deviceinfo')


// exports.track = async (req, res) => {
//   const ip =
//     req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//     req.connection?.remoteAddress ||
//     req.socket?.remoteAddress ||
//     requestIp.getClientIp(req) ||
//     "Unknown";

//   try {
//     const location = await getLocationFromIP(ip);
//     const deviceInfo = getDeviceInfo(req);

//     await Visitor.create({ ip, location, deviceInfo });

//     res.status(200).json({ message: "Visitor tracked", ip, location, deviceInfo });
//   } catch (err) {
//     console.error("Error tracking visitor:", err);
//     res.status(500).json({ error: "Failed to track visitor" });
//   }
// };



// const moment = require("moment");
// const Counter = require("../Model/CounterSchema");
// const Visitor = require("../Model/VisitorScheme");
// const { getLocationFromIP } = require("../Utils/iplocation");
// const { getDeviceInfo } = require("../Utils/deviceinfo");
// const crypto = require("crypto");

// exports.trackVisitor = async (req, res) => {
//   const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//              req.connection?.remoteAddress ||
//              req.socket?.remoteAddress ||
//              "Unknown";

//   const today = moment().format("YYYY-MM-DD");

//   try {
//     const location = await getLocationFromIP(ip);
//     const deviceInfo = getDeviceInfo(req);

//     // ✅ Create unique device hash
//     const deviceHash = crypto
//       .createHash("sha256")
//       .update(`${deviceInfo.os}-${deviceInfo.device}-${deviceInfo.browser}`)
//       .digest("hex");

//     // ✅ Save visitor for reference
//     await Visitor.create({ ip, location, deviceInfo });

//     // ✅ Get or create today's counter
//     let counter = await Counter.findOne({ date: today });

//     if (!counter) {
//       // New day, reset todayCount, preserve totalCount
//       const latest = await Counter.findOne().sort({ createdAt: -1 });
//       const totalCount = latest ? latest.totalCount : 0;

//       counter = await Counter.create({
//         date: today,
//         todayCount: 1,
//         totalCount: totalCount + 1,
//         uniqueVisitors: [{ ip, deviceHash }],
//       });
//     } else {
//       // Check if the visitor (IP + deviceHash) is already recorded today
//       const alreadyVisited = counter.uniqueVisitors.some(
//         (v) => v.ip === ip && v.deviceHash === deviceHash
//       );

//       if (!alreadyVisited) {
//         counter.todayCount += 1;
//         counter.totalCount += 1;
//         counter.uniqueVisitors.push({ ip, deviceHash });
//         await counter.save();
//       }
//     }

//     res.status(200).json({ message: "Visitor Tracked", ip, location, deviceInfo });
//   } catch (err) {
//     console.error("❌ Error tracking visitor:", err);
//     res.status(500).json({ error: "Failed to track visitor" });
//   }
// };



const moment = require("moment");
const Counter = require("../Model/CounterSchema");
const Visitor = require("../Model/VisitorScheme");
const { getLocationFromIP } = require("../Utils/iplocation");
const { getDeviceInfo } = require("../Utils/deviceinfo");
const crypto = require("crypto");

exports.trackVisitor = async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
             req.connection?.remoteAddress ||
             req.socket?.remoteAddress ||
             "Unknown";

  const today = moment().format("YYYY-MM-DD");

  try {
    const location = await getLocationFromIP(ip);
    const deviceInfo = getDeviceInfo(req);
    const deviceHash = crypto
      .createHash("sha256")
      .update(`${deviceInfo.os}-${deviceInfo.device}-${deviceInfo.browser}`)
      .digest("hex");

    let counter = await Counter.findOne({ date: today });

    const isUnique = !counter?.uniqueVisitors?.some(
      (v) => v.ip === ip && v.deviceHash === deviceHash
    );

    if (isUnique) {
      // Save new visitor
      await Visitor.create({ ip, location, deviceInfo });

      if (!counter) {
        const lastCounter = await Counter.findOne().sort({ createdAt: -1 });
        const totalCount = lastCounter ? lastCounter.totalCount : 0;

        counter = await Counter.create({
          date: today,
          todayCount: 1,
          totalCount: totalCount + 1,
          uniqueVisitors: [{ ip, deviceHash }],
        });
      } else {
        counter.todayCount += 1;
        counter.totalCount += 1;
        counter.uniqueVisitors.push({ ip, deviceHash });
        await counter.save();
      }
    }

    res.status(200).json({
      message: isUnique ? "Visitor tracked" : "Already counted today",
      ip,
      location,
      deviceInfo,
    });
  } catch (err) {
    console.error("❌ Visitor tracking failed:", err);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};
