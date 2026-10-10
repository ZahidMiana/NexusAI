"use client";

import { motion } from "framer-motion";
import { WORKFLOW_EDGES, WORKFLOW_NODES, edgeKey } from "@/data/workflow";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { WorkflowNode } from "@/types";

export type GraphOrientation = "horizontal" | "vertical";

const NODE_WIDTH = 15;
const NODE_HEIGHT = 7;

interface Point {
  x: number;
  y: number;
}

/** Node data is authored horizontally; the vertical layout transposes it. */
function project(node: WorkflowNode, orientation: GraphOrientation): Point {
  return orientation === "horizontal" ? { x: node.x, y: node.y } : { x: node.y, y: node.x };
}

function edgeEndpoints(from: Point, to: Point, orientation: GraphOrientation): [Point, Point] {
  return orientation === "horizontal"
    ? [{ x: from.x + NODE_WIDTH / 2, y: from.y }, { x: to.x - NODE_WIDTH / 2, y: to.y }]
    : [{ x: from.x, y: from.y + NODE_HEIGHT / 2 }, { x: to.x, y: to.y - NODE_HEIGHT / 2 }];
}

const nodeById = new Map(WORKFLOW_NODES.map((node) => [node.id, node]));

export interface WorkflowGraphProps {
  orientation: GraphOrientation;
  litNodes: ReadonlySet<string>;
  litEdges: ReadonlySet<string>;
  packetNodeId?: string;
  disabled: boolean;
  onSelectAgent: (agentId: string) => void;
  className?: string;
}

/** Pure SVG rendering of the agent workflow in either orientation. */
export function WorkflowGraph({ orientation, litNodes, litEdges, packetNodeId, disabled, onSelectAgent, className }: WorkflowGraphProps) {
  const viewBox = orientation === "horizontal" ? "0 0 100 60" : "0 0 60 100";
  const packetNode = packetNodeId ? nodeById.get(packetNodeId) : undefined;
  const packet = packetNode ? project(packetNode, orientation) : undefined;

  return (
    <svg viewBox={viewBox} className={cn("h-auto w-full", className)} role="group" aria-label="Agentic workflow graph">
      {WORKFLOW_EDGES.map((edge) => {
        const from = nodeById.get(edge.from);
        const to = nodeById.get(edge.to);
        if (!from || !to) return null;
        const [start, end] = edgeEndpoints(project(from, orientation), project(to, orientation), orientation);
        const lit = litEdges.has(edgeKey(edge));
        return (
          <line
            key={edgeKey(edge)}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={lit ? accentTokens("pink").hex : "#3f3f46"}
            strokeWidth={lit ? 0.7 : 0.4}
            strokeDasharray={lit ? "0" : "1.2 1.2"}
            style={lit ? { filter: "drop-shadow(0 0 1.5px #FF007F)" } : undefined}
            className="transition-all duration-300"
          />
        );
      })}

      {WORKFLOW_NODES.map((node) => (
        <WorkflowNodeShape
          key={node.id}
          node={node}
          position={project(node, orientation)}
          lit={litNodes.has(node.id)}
          current={packetNodeId === node.id}
          disabled={disabled}
          onSelect={() => onSelectAgent(node.id)}
        />
      ))}

      {packet && (
        <motion.circle
          r={1.4}
          fill="#FF007F"
          initial={false}
          animate={{ cx: packet.x, cy: packet.y - NODE_HEIGHT / 2 - 1.8 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          style={{ filter: "drop-shadow(0 0 2px #FF007F)" }}
        />
      )}
    </svg>
  );
}

interface WorkflowNodeShapeProps {
  node: WorkflowNode;
  position: Point;
  lit: boolean;
  current: boolean;
  disabled: boolean;
  onSelect: () => void;
}

function WorkflowNodeShape({ node, position, lit, current, disabled, onSelect }: WorkflowNodeShapeProps) {
  const tokens = accentTokens(node.accent);
  const interactive = node.routable && !disabled;

  return (
    <g
      role={node.routable ? "button" : undefined}
      tabIndex={node.routable ? 0 : undefined}
      aria-label={node.routable ? `Route task to ${node.label} agent` : undefined}
      aria-disabled={node.routable ? disabled : undefined}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={(event) => {
        if (interactive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect();
        }
      }}
      className={cn("outline-none", interactive && "cursor-pointer")}
    >
      <rect
        x={position.x - NODE_WIDTH / 2}
        y={position.y - NODE_HEIGHT / 2}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={1.2}
        fill={lit ? `rgba(${tokens.rgb}, 0.18)` : "#0d0d11"}
        stroke={lit || node.routable ? tokens.hex : "#52525b"}
        strokeWidth={current ? 0.7 : 0.35}
        strokeDasharray={node.routable && !lit ? "1 0.8" : "0"}
        style={lit ? { filter: `drop-shadow(0 0 2px ${tokens.hex})` } : undefined}
        className="transition-all duration-300"
      />
      <text
        x={position.x}
        y={position.y + 0.9}
        textAnchor="middle"
        fontSize={2.4}
        fill={lit ? tokens.hex : "#d4d4d8"}
        className="pointer-events-none select-none font-tech tracking-wider"
      >
        {node.label}
      </text>
    </g>
  );
}
