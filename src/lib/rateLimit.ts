/**
 * Sliding-window rate limiter kept in memory. Good enough for a single
 * server instance; swap for Redis/Upstash when running multiple instances.
 */
export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  /** Records a hit and returns whether the key is still within its limit. */
  consume(key: string, now: number = Date.now()): boolean {
    const recent = (this.hits.get(key) ?? []).filter((timestamp) => now - timestamp < this.windowMs);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 5_000) this.prune(now);
    return true;
  }

  private prune(now: number): void {
    for (const [key, timestamps] of this.hits) {
      if (timestamps.every((timestamp) => now - timestamp >= this.windowMs)) this.hits.delete(key);
    }
  }
}
