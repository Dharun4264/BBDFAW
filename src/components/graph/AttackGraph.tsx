import React, { useState, useMemo } from 'react';
import { ForensicFinding } from '../../utils/parsers';

interface Node {
  id: string;
  label: string;
  type: 'host' | 'artifact' | 'target' | 'mitre';
  x: number;
  y: number;
  score: number;
  findingRef?: ForensicFinding;
}

interface Link {
  source: string;
  target: string;
  label?: string;
}

interface AttackGraphProps {
  findings: ForensicFinding[];
  onSelectFinding?: (finding: ForensicFinding) => void;
}

export const AttackGraph: React.FC<AttackGraphProps> = ({ findings, onSelectFinding }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const { nodes, links } = useMemo(() => {
    const nodeMap = new Map<string, Node>();
    const linkList: Link[] = [];

    if (!findings || findings.length === 0) {
      return { nodes: [], links: [] };
    }

    findings.forEach((f) => {
      // 1. Host Node
      const hostId = `host-${f.machineId || 'WORKSTATION-01'}`;
      if (!nodeMap.has(hostId)) {
        nodeMap.set(hostId, {
          id: hostId,
          label: f.machineId || 'WORKSTATION-01',
          type: 'host',
          x: 120,
          y: 180 + (nodeMap.size % 4) * 80,
          score: 30,
        });
      }

      // 2. Source File Node
      const fileId = `file-${f.sourceFile}`;
      if (!nodeMap.has(fileId)) {
        nodeMap.set(fileId, {
          id: fileId,
          label: f.sourceFile,
          type: 'artifact',
          x: 320,
          y: 100 + nodeMap.size * 55,
          score: f.threatScore,
          findingRef: f,
        });
        linkList.push({ source: hostId, target: fileId, label: 'contains' });
      }

      // 3. Target Executable Node
      const targetVal = f.value.length > 30 ? f.value.slice(0, 27) + '...' : f.value;
      const targetId = `target-${f.id}`;
      if (!nodeMap.has(targetId)) {
        nodeMap.set(targetId, {
          id: targetId,
          label: `${f.extractedField}: ${targetVal}`,
          type: 'target',
          x: 580,
          y: 80 + nodeMap.size * 48,
          score: f.threatScore,
          findingRef: f,
        });
        linkList.push({ source: fileId, target: targetId, label: 'extracted' });
      }

      // 4. MITRE Tactic Node
      if (f.mitreTactic && f.mitreTactic !== 'None') {
        const mitreCode = f.mitreTactic.split(' ')[0];
        const mitreId = `mitre-${mitreCode}`;
        if (!nodeMap.has(mitreId)) {
          nodeMap.set(mitreId, {
            id: mitreId,
            label: f.mitreTactic,
            type: 'mitre',
            x: 820,
            y: 120 + nodeMap.size * 60,
            score: f.threatScore,
          });
        }
        linkList.push({ source: targetId, target: mitreId, label: 'maps to' });
      }
    });

    const nodeList = Array.from(nodeMap.values());
    return { nodes: nodeList, links: linkList };
  }, [findings]);

  const filteredNodes = useMemo(() => {
    if (filterType === 'all') return nodes;
    return nodes.filter((n) => n.type === filterType);
  }, [nodes, filterType]);

  const filteredLinks = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    return links.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target));
  }, [links, filteredNodes]);

  const getNodeColor = (node: Node) => {
    if (node.type === 'host') return { bg: '#3b82f6', border: '#60a5fa', text: '#93c5fd' };
    if (node.type === 'artifact') return { bg: '#06b6d4', border: '#22d3ee', text: '#67e8f9' };
    if (node.type === 'target') {
      return node.score > 80
        ? { bg: '#ef4444', border: '#f87171', text: '#fca5a5' }
        : { bg: '#f59e0b', border: '#fbbf24', text: '#fde68a' };
    }
    return { bg: '#8b5cf6', border: '#a78bfa', text: '#c4b5fd' };
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            INTERACTIVE FORENSIC ATTACK NETWORK GRAPH
          </h2>
          <p className="text-xs text-slate-400">Visual attack vector relationship mapping (Host → Artifact → Extracted Value → MITRE Tactic)</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 p-1">
          {['all', 'host', 'artifact', 'target', 'mitre'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`rounded px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
                filterType === t ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas & Tooltip */}
      <div className="relative min-h-[420px] w-full overflow-hidden rounded-lg border border-slate-800/80 bg-slate-950/90">
        <svg className="h-[440px] w-full">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Links */}
          {filteredLinks.map((link, idx) => {
            const sourceNode = nodes.find((n) => n.id === link.source);
            const targetNode = nodes.find((n) => n.id === link.target);
            if (!sourceNode || !targetNode) return null;

            const isHighlighted =
              selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target);

            return (
              <g key={idx}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? '#22d3ee' : 'url(#lineGrad)'}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray={isHighlighted ? '6,3' : 'none'}
                  className={isHighlighted ? 'animate-pulse' : ''}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {filteredNodes.map((node) => {
            const colors = getNodeColor(node);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => {
                  setSelectedNode(node);
                  if (node.findingRef && onSelectFinding) onSelectFinding(node.findingRef);
                }}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                {/* Outer Glow Ring */}
                <circle
                  r={isSelected ? 26 : 20}
                  fill={colors.bg}
                  fillOpacity={isSelected ? 0.35 : 0.15}
                  stroke={colors.border}
                  strokeWidth={isSelected ? 3 : 1.5}
                  filter={isSelected ? 'url(#glow)' : undefined}
                />

                {/* Inner Icon Dot */}
                <circle r={isSelected ? 8 : 6} fill={colors.border} />

                {/* Node Label */}
                <text
                  x={26}
                  y={4}
                  fill={colors.text}
                  fontSize={11}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="font-mono select-none drop-shadow-md"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Box */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-cyan-500/40 bg-slate-900/95 p-3 text-xs shadow-xl backdrop-blur-md">
            <div>
              <span className="font-bold uppercase tracking-wider text-cyan-400">[{selectedNode.type}]</span>{' '}
              <span className="text-slate-200 font-semibold">{selectedNode.label}</span>
              {selectedNode.score > 0 && (
                <span className="ml-3 rounded bg-red-950 px-2 py-0.5 font-mono font-bold text-red-400 border border-red-800/60">
                  THREAT SCORE: {selectedNode.score}%
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-cyan-300 font-bold"
            >
              [CLOSE]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
