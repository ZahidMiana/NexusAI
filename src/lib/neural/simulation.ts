import { accentRgba } from "@/lib/accent";
import { pick, randomBetween } from "@/lib/math";
import type { Accent, NeuralNode, NeuralSignal, PointerState } from "@/types";

export interface NetworkState {
  nodes: NeuralNode[];
  signals: NeuralSignal[];
}

export interface NetworkConfig {
  linkDistance: number;
  pointerRadius: number;
  idleSignalRate: number;
  activeSignalRate: number;
  maxSignals: number;
}

export const DEFAULT_NETWORK_CONFIG: NetworkConfig = {
  linkDistance: 120,
  pointerRadius: 150,
  idleSignalRate: 0.04,
  activeSignalRate: 0.35,
  maxSignals: 60,
};

const HUES: readonly Accent[] = ["cyan", "cyan", "cyan", "pink", "lime"];

export function createNetwork(width: number, height: number): NetworkState {
  const count = Math.round(Math.min(64, Math.max(24, (width * height) / 7000)));
  const nodes: NeuralNode[] = Array.from({ length: count }, () => ({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.25, 0.25),
    radius: randomBetween(1.4, 3.2),
    energy: 0,
    hue: pick(HUES),
  }));
  return { nodes, signals: [] };
}

function distance(a: NeuralNode, b: NeuralNode): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function spawnSignal(state: NetworkState, config: NetworkConfig, origin?: number): void {
  if (state.signals.length >= config.maxSignals || state.nodes.length < 2) return;
  const from = origin ?? Math.floor(Math.random() * state.nodes.length);
  const source = state.nodes[from];
  const neighbours: number[] = [];
  state.nodes.forEach((node, index) => {
    if (index !== from && distance(source, node) < config.linkDistance) neighbours.push(index);
  });
  if (neighbours.length === 0) return;
  state.signals.push({
    from,
    to: pick(neighbours),
    progress: 0,
    speed: randomBetween(0.012, 0.03),
    hue: source.hue,
  });
}

/** Injects a burst of energy at a point: nearby nodes ignite and fire signals. */
export function stimulate(state: NetworkState, x: number, y: number, config: NetworkConfig = DEFAULT_NETWORK_CONFIG): void {
  const nearby = state.nodes
    .map((node, index) => ({ index, dist: Math.hypot(node.x - x, node.y - y) }))
    .filter(({ dist }) => dist < config.pointerRadius)
    .sort((a, b) => a.dist - b.dist);

  nearby.forEach(({ index, dist }) => {
    state.nodes[index].energy = Math.max(state.nodes[index].energy, 1 - dist / config.pointerRadius);
  });
  nearby.slice(0, 8).forEach(({ index }) => spawnSignal(state, config, index));
}

/** Advances physics, pointer interaction and signal propagation by one tick. */
export function stepNetwork(
  state: NetworkState,
  width: number,
  height: number,
  pointer: PointerState,
  config: NetworkConfig = DEFAULT_NETWORK_CONFIG,
): void {
  let nearestIndex = -1;
  let nearestDistance = Number.POSITIVE_INFINITY;

  state.nodes.forEach((node, index) => {
    if (pointer.active) {
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      const dist = Math.hypot(dx, dy);
      if (dist < config.pointerRadius && dist > 0.001) {
        const pull = (1 - dist / config.pointerRadius) * 0.035;
        node.vx += (dx / dist) * pull;
        node.vy += (dy / dist) * pull;
        node.energy = Math.min(1, node.energy + 0.08);
      }
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = index;
      }
    }

    node.vx *= 0.985;
    node.vy *= 0.985;
    const speed = Math.hypot(node.vx, node.vy);
    if (speed < 0.08) {
      node.vx += randomBetween(-0.03, 0.03);
      node.vy += randomBetween(-0.03, 0.03);
    }
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
    node.x = Math.min(width, Math.max(0, node.x));
    node.y = Math.min(height, Math.max(0, node.y));
    node.energy *= 0.965;
  });

  const rate = pointer.active ? config.activeSignalRate : config.idleSignalRate;
  if (Math.random() < rate) {
    spawnSignal(state, config, pointer.active && nearestIndex >= 0 && Math.random() < 0.6 ? nearestIndex : undefined);
  }

  state.signals = state.signals.filter((signal) => {
    signal.progress += signal.speed * (pointer.active ? 1.6 : 1);
    if (signal.progress >= 1) {
      const target = state.nodes[signal.to];
      if (target) {
        target.energy = Math.min(1, target.energy + 0.6);
        if (Math.random() < (pointer.active ? 0.55 : 0.3)) spawnSignal(state, config, signal.to);
      }
      return false;
    }
    return true;
  });
}

/** Draws the current network frame onto a 2D canvas context. */
export function renderNetwork(
  context: CanvasRenderingContext2D,
  state: NetworkState,
  width: number,
  height: number,
  pointer: PointerState,
  config: NetworkConfig = DEFAULT_NETWORK_CONFIG,
): void {
  context.clearRect(0, 0, width, height);
  const { nodes } = state;

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const dist = distance(a, b);
      if (dist > config.linkDistance) continue;
      const strength = 1 - dist / config.linkDistance;
      const excitation = Math.max(a.energy, b.energy);
      context.strokeStyle = accentRgba(excitation > 0.25 ? a.hue : "cyan", 0.08 + strength * 0.25 + excitation * 0.45);
      context.lineWidth = 0.6 + excitation * 1.4;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
  }

  if (pointer.active) {
    nodes.forEach((node) => {
      const dist = Math.hypot(pointer.x - node.x, pointer.y - node.y);
      if (dist > config.pointerRadius) return;
      context.strokeStyle = accentRgba("pink", (1 - dist / config.pointerRadius) * 0.55);
      context.lineWidth = 0.8;
      context.beginPath();
      context.moveTo(pointer.x, pointer.y);
      context.lineTo(node.x, node.y);
      context.stroke();
    });
  }

  state.signals.forEach((signal) => {
    const a = nodes[signal.from];
    const b = nodes[signal.to];
    if (!a || !b) return;
    const x = a.x + (b.x - a.x) * signal.progress;
    const y = a.y + (b.y - a.y) * signal.progress;
    context.shadowColor = accentRgba(signal.hue, 1);
    context.shadowBlur = 12;
    context.fillStyle = accentRgba(signal.hue, 0.95);
    context.beginPath();
    context.arc(x, y, 2.2, 0, Math.PI * 2);
    context.fill();
  });

  nodes.forEach((node) => {
    const glow = 0.45 + node.energy * 0.55;
    context.shadowColor = accentRgba(node.hue, glow);
    context.shadowBlur = 6 + node.energy * 18;
    context.fillStyle = accentRgba(node.hue, glow);
    context.beginPath();
    context.arc(node.x, node.y, node.radius + node.energy * 2.4, 0, Math.PI * 2);
    context.fill();
  });

  context.shadowBlur = 0;

  if (pointer.active) {
    context.strokeStyle = accentRgba("pink", 0.8);
    context.lineWidth = 1;
    context.beginPath();
    context.arc(pointer.x, pointer.y, 10, 0, Math.PI * 2);
    context.stroke();
  }
}
