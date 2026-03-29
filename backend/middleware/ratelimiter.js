import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit");

        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later" });
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Rate limiter error" });
    }
};

export default rateLimiter;
