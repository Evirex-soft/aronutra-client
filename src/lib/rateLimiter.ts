const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
    ip: string,
    limit = 30,
    windowMs = 60 * 1000
) {
    const now = Date.now();

    const current = requests.get(ip);

    if (!current || now > current.resetTime) {
        requests.set(ip, {
            count: 1,
            resetTime: now + windowMs,
        });

        return true;
    }

    if (current.count >= limit) {
        return false;
    }

    current.count++;
    return true;
}