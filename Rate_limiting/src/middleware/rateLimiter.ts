import { Request, Response, NextFunction } from "express";

interface RateLimitRecord {
  requests: number;
  firstRequestTime: number;
}

const requestLimit = 5; // max 5 requests
const timeWindow = 60 * 1000; // per 1 minute

const ipRequests = new Map<string, RateLimitRecord>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    console.log('see the ip address',req.ip)
  const ip = req.ip; // gets user IP address

  if (!ip) {
    return res.status(400).json({ 
        error: "Client IP address not found."
     });
  }

  const currentTime = Date.now();
  const record = ipRequests.get(ip);

  if (!record) {
    // First request from this IP
    ipRequests.set(ip, { requests: 1, firstRequestTime: currentTime });
    return next();
  }

  if (currentTime - record.firstRequestTime < timeWindow) {
    // still within the window
    if (record.requests < requestLimit) {
      record.requests += 1;
      ipRequests.set(ip, record);
      return next();
    } else {
      return res.status(429).json({ error: "Too many requests, please try again later." });
    }
  } else {
    // window expired → reset
    ipRequests.set(ip, { requests: 1, firstRequestTime: currentTime });
    return next();
  }
}
