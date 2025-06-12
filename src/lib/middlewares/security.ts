import type { MiddlewareHandler } from "hono";

export const securityMiddleware: MiddlewareHandler = async (c, next) => {
	c.header("X-Frame-Options", "DENY");
	c.header("X-Content-Type-Options", "nosniff");
	c.header("X-XSS-Protection", "1; mode=block");
	c.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
	c.header("Referrer-Policy", "no-referrer-when-downgrade");
	c.header("X-DNS-Prefetch-Control", "off");
	await next();
};
