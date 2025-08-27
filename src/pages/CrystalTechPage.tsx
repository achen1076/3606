import React, { useState, useEffect } from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import { Link } from "react-router-dom";
import techTreeData from "../data/crystal_tech_data.json";
import premadeTechTrees from "../data/premade_tech_trees.json";

// Define types for tech nodes
interface Prerequisite {
  id: string;
  requiredLevel: number;
  appliesToLevel?: number; // Optional: if specified, this prerequisite only applies when upgrading to this level
}

// OR group: at least one prerequisite in the group must be met
interface PrerequisiteOrGroup {
  orGroup: Prerequisite[];
  appliesToLevel?: number; // Optional: if specified, this OR group only applies when upgrading to this level
}

// Union type for prerequisites - can be individual prereq or OR group
type PrerequisiteItem = Prerequisite | PrerequisiteOrGroup;

interface TechNode {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  val1: string;
  val2: string[];
  crystalCost?: number[]; // Optional crystal cost array for each level
  prerequisites: PrerequisiteItem[];
  position: { x: number; y: number };
  lineTo?: string | string[] | null; // Optional connection lines to other nodes
}

interface UpgradeOrderItem {
  techId: string;
  level: number;
  name: string;
  crystalCost: number;
}

// Premade Tech Tree Types
interface PremadeTechUpgrade {
  techId: string;
  targetLevel: number;
}

interface PremadeTechTree {
  id: string;
  name: string;
  description: string;
  author: string;
  totalCrystalCost: number;
  upgrades: PremadeTechUpgrade[];
}

// Tech Node Component
interface TechNodeProps {
  node: TechNode;
  onClick: (node: TechNode) => void;
  isAvailable: boolean;
  canUpgrade: (node: TechNode) => boolean;
  onUpgrade: (node: TechNode) => void;
  onDowngrade: (node: TechNode) => void;
}

const TechNodeComponent: React.FC<TechNodeProps> = ({
  node,
  onClick,
  isAvailable,
  canUpgrade,
  onUpgrade,
  onDowngrade,
}) => {
  const progressPercentage = (node.level / node.maxLevel) * 100;
  const isUnlockable = node.maxLevel === 1;
  const canUpgradeNode = canUpgrade(node);
  const isMaxed = node.level >= node.maxLevel;

  // Color logic: Blue for upgradeable, Purple for maxed, Red for blocked by prerequisites
  const bgColor = canUpgradeNode
    ? "bg-blue-100" // Blue for upgradeable
    : isMaxed
    ? "bg-purple-100" // Purple for maxed
    : "bg-red-100"; // Red for blocked by prerequisites
  const borderColor = canUpgradeNode
    ? "border-blue-500" // Blue border for upgradeable
    : isMaxed
    ? "border-purple-500" // Purple border for maxed
    : "border-red-500"; // Red border for blocked by prerequisites
  const progressColor = canUpgradeNode
    ? "bg-blue-600"
    : isMaxed
    ? "bg-purple-600"
    : "bg-red-600";

  return (
    <div
      className={`absolute p-3 rounded-lg shadow-md cursor-pointer transition-all duration-300 w-[140px] h-[120px] ${bgColor} ${borderColor} border-2 hover:shadow-lg flex flex-col justify-between group`}
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
      onClick={() => onClick(node)}
    >
      {/* Mobile: Always visible, Desktop: Hover-activated + and - buttons */}
      <div className="absolute top-1 right-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-1">
        <button
          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
            canUpgradeNode
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (canUpgradeNode) onUpgrade(node);
          }}
          disabled={!canUpgradeNode}
        >
          +
        </button>
        <button
          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
            node.level > 0
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (node.level > 0) onDowngrade(node);
          }}
          disabled={node.level <= 0}
        >
          -
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 justify-center">
        <div
          className="font-semibold text-xs text-center mb-2 leading-tight overflow-hidden"
          style={{ maxHeight: "2.5rem" }}
        >
          {node.name}
        </div>
      </div>
      <div className="w-full">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div
            className={`${progressColor} h-2 rounded-full`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-center">
          {isUnlockable
            ? `${node.level > 0 ? "Unlocked" : "Locked"}`
            : `Level ${node.level}/${node.maxLevel}`}
        </div>
      </div>
    </div>
  );
};

// Connection Line Component
interface ConnectionLineProps {
  fromNode: TechNode;
  toNode: TechNode;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  fromNode,
  toNode,
}) => {
  const fromX = fromNode.position.x;
  const fromY = fromNode.position.y;
  const toX = toNode.position.x;
  const toY = toNode.position.y;

  // Scale Y coordinates to fit within the container (max Y is 265, container is 1200px)
  const scaleFactor = 1200 / 3200; // Scale to fit within the visual container
  const scaledFromY = fromY * scaleFactor;
  const scaledToY = toY * scaleFactor;

  return (
    <line
      x1={`${fromX}%`}
      y1={`${scaledFromY}%`}
      x2={`${toX}%`}
      y2={`${scaledToY}%`}
      stroke="white"
      strokeWidth="2"
      opacity="0.8"
    />
  );
};

// Helper function to get connection lines for a node
const getConnectionLines = (
  node: TechNode,
  techTree: TechNode[]
): ConnectionLineProps[] => {
  if (!node.lineTo) return [];

  const targetIds = Array.isArray(node.lineTo) ? node.lineTo : [node.lineTo];
  const connections: ConnectionLineProps[] = [];

  targetIds.forEach((targetId) => {
    const targetNode = techTree.find((n) => n.id === targetId);
    if (targetNode) {
      connections.push({ fromNode: node, toNode: targetNode });
    }
  });

  return connections;
};

// Helper function to get all connection lines for the tech tree
const getAllConnectionLines = (techTree: TechNode[]): ConnectionLineProps[] => {
  const allConnections: ConnectionLineProps[] = [];

  techTree.forEach((node) => {
    const nodeConnections = getConnectionLines(node, techTree);
    allConnections.push(...nodeConnections);
  });

  return allConnections;
};

export default function CrystalTechPage() {
  const [techTree, setTechTree] = useState<TechNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgradeOrder, setUpgradeOrder] = useState<UpgradeOrderItem[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<string>("");

  // Load tech tree data from imported JSON
  useEffect(() => {
    setTechTree(techTreeData);
    setLoading(false);
  }, []);

  // Helper function to check if a prerequisite item is satisfied
  const isPrerequisiteItemSatisfied = (
    prereqItem: PrerequisiteItem
  ): boolean => {
    if ("orGroup" in prereqItem) {
      // OR group: at least one prerequisite in the group must be satisfied
      return prereqItem.orGroup.some((prereq) => {
        const prerequisiteNode = techTree.find((n) => n.id === prereq.id);
        return prerequisiteNode
          ? prerequisiteNode.level >= prereq.requiredLevel
          : false;
      });
    } else {
      // Individual prerequisite
      const prerequisiteNode = techTree.find((n) => n.id === prereqItem.id);
      return prerequisiteNode
        ? prerequisiteNode.level >= prereqItem.requiredLevel
        : false;
    }
  };

  // Check if a node is available for upgrade (general availability)
  const isNodeAvailable = (node: TechNode): boolean => {
    if (node.prerequisites.length === 0) return true;

    // Check prerequisites that don't have appliesToLevel (general prerequisites)
    const generalPrereqs = node.prerequisites.filter((prereqItem) => {
      if ("orGroup" in prereqItem) {
        return !prereqItem.appliesToLevel;
      } else {
        return !prereqItem.appliesToLevel;
      }
    });

    return generalPrereqs.every((prereqItem) =>
      isPrerequisiteItemSatisfied(prereqItem)
    );
  };

  // Check if a node can be upgraded to the next level
  const canUpgrade = (node: TechNode): boolean => {
    if (node.level >= node.maxLevel) return false;

    const nextLevel = node.level + 1;

    // Check all prerequisites that apply to this specific level
    const levelSpecificPrereqs = node.prerequisites.filter((prereqItem) => {
      if ("orGroup" in prereqItem) {
        return prereqItem.appliesToLevel
          ? prereqItem.appliesToLevel === nextLevel
          : true;
      } else {
        return prereqItem.appliesToLevel
          ? prereqItem.appliesToLevel === nextLevel
          : true;
      }
    });

    return levelSpecificPrereqs.every((prereqItem) =>
      isPrerequisiteItemSatisfied(prereqItem)
    );
  };

  // Get individual prerequisites for a specific level (flattens OR groups)
  const getPrerequisitesForLevel = (
    node: TechNode,
    level: number
  ): Prerequisite[] => {
    const levelPrereqs: Prerequisite[] = [];

    node.prerequisites.forEach((prereqItem) => {
      const appliesToThisLevel =
        "orGroup" in prereqItem
          ? prereqItem.appliesToLevel
            ? prereqItem.appliesToLevel === level
            : true
          : prereqItem.appliesToLevel
          ? prereqItem.appliesToLevel === level
          : true;

      if (appliesToThisLevel) {
        if ("orGroup" in prereqItem) {
          // Add all prerequisites from OR group (they'll be displayed as alternatives)
          levelPrereqs.push(...prereqItem.orGroup);
        } else {
          // Add individual prerequisite
          levelPrereqs.push(prereqItem);
        }
      }
    });

    return levelPrereqs;
  };

  // Get prerequisite items for a specific level (preserves OR group structure)
  const getPrerequisiteItemsForLevel = (
    node: TechNode,
    level: number
  ): PrerequisiteItem[] => {
    return node.prerequisites.filter((prereqItem) => {
      if ("orGroup" in prereqItem) {
        return prereqItem.appliesToLevel
          ? prereqItem.appliesToLevel === level
          : true;
      } else {
        return prereqItem.appliesToLevel
          ? prereqItem.appliesToLevel === level
          : true;
      }
    });
  };

  // Handle node click
  const handleNodeClick = (node: TechNode) => {
    setSelectedNode(node);
  };

  // Handle upgrade
  const handleUpgrade = (node: TechNode) => {
    if (!node || node.level >= node.maxLevel) return;

    const newLevel = node.level + 1;
    const crystalCost = node.crystalCost
      ? node.crystalCost[node.level] || 0
      : 0;

    // Add to upgrade order
    const upgradeItem: UpgradeOrderItem = {
      techId: node.id,
      level: newLevel,
      name: `${node.name} Level ${newLevel}`,
      crystalCost: crystalCost,
    };
    setUpgradeOrder((prev) => [...prev, upgradeItem]);

    setTechTree((prevTree) =>
      prevTree.map((n) => (n.id === node.id ? { ...n, level: n.level + 1 } : n))
    );

    // Update selected node
    setSelectedNode((prev) =>
      prev && prev.id === node.id ? { ...prev, level: prev.level + 1 } : prev
    );
  };

  // Handle downgrade
  const handleDowngrade = (node: TechNode) => {
    if (!node || node.level <= 0) return;

    // Remove from upgrade order (remove the last occurrence of this tech at this level)
    setUpgradeOrder((prev) => {
      const newOrder = [...prev];
      // Find last index manually for compatibility
      let indexToRemove = -1;
      for (let i = newOrder.length - 1; i >= 0; i--) {
        if (
          newOrder[i].techId === node.id &&
          newOrder[i].level === node.level
        ) {
          indexToRemove = i;
          break;
        }
      }
      if (indexToRemove !== -1) {
        newOrder.splice(indexToRemove, 1);
      }
      return newOrder;
    });

    setTechTree((prevTree) =>
      prevTree.map((n) => (n.id === node.id ? { ...n, level: n.level - 1 } : n))
    );

    // Update selected node
    setSelectedNode((prev) =>
      prev && prev.id === node.id ? { ...prev, level: prev.level - 1 } : prev
    );
  };

  // Check if a node can be downgraded
  const canDowngrade = (node: TechNode): boolean => {
    if (node.level <= 0) return false;

    const newLevel = node.level - 1;

    // Check if any other nodes would be affected by this downgrade
    for (const otherNode of techTree) {
      if (otherNode.level === 0) continue; // Skip nodes that aren't upgraded

      // Check each level of the other node to see if it would be affected
      for (let level = 1; level <= otherNode.level; level++) {
        const levelPrereqs = getPrerequisitesForLevel(otherNode, level);

        // Check if any prerequisite for this level would be violated
        const wouldBeViolated = levelPrereqs.some(
          (prereq) => prereq.id === node.id && prereq.requiredLevel > newLevel
        );

        if (wouldBeViolated) {
          return false; // Can't downgrade because it would violate a prerequisite
        }
      }
    }

    return true; // Safe to downgrade
  };

  // Calculate the maximum level a tech can achieve based on current prerequisites
  const getMaxAchievableLevel = (node: TechNode): number => {
    let maxLevel = 0;

    // Check each level from 1 to maxLevel to see what's achievable
    for (let level = 1; level <= node.maxLevel; level++) {
      const levelPrereqs = getPrerequisitesForLevel(node, level);
      const canAchieveLevel = levelPrereqs.every((prereq) => {
        const prereqNode = techTree.find((n) => n.id === prereq.id);
        return prereqNode && prereqNode.level >= prereq.requiredLevel;
      });

      if (canAchieveLevel) {
        maxLevel = level;
      } else {
        break; // Can't achieve this level, so can't achieve higher levels either
      }
    }

    return maxLevel;
  };

  // Calculate the minimum level a tech can be downgraded to without breaking dependencies
  const getMinSafeLevel = (node: TechNode): number => {
    let minLevel = 0;

    // Check what's the lowest level we can go without breaking other techs
    for (let testLevel = 0; testLevel < node.level; testLevel++) {
      let canDowngradeToThisLevel = true;

      // Check if any other nodes would be affected by this downgrade
      for (const otherNode of techTree) {
        if (otherNode.level === 0) continue;

        // Check each level of the other node
        for (let level = 1; level <= otherNode.level; level++) {
          const levelPrereqs = getPrerequisitesForLevel(otherNode, level);

          // Check if any prerequisite for this level would be violated
          const wouldBeViolated = levelPrereqs.some(
            (prereq) =>
              prereq.id === node.id && prereq.requiredLevel > testLevel
          );

          if (wouldBeViolated) {
            canDowngradeToThisLevel = false;
            break;
          }
        }

        if (!canDowngradeToThisLevel) break;
      }

      if (canDowngradeToThisLevel) {
        minLevel = testLevel;
      } else {
        break;
      }
    }

    return minLevel;
  };

  // Render prerequisites list
  const renderPrerequisites = (prerequisites: Prerequisite[]) => {
    return prerequisites.map((prereq, index) => {
      const prereqNode = techTree.find((node) => node.id === prereq.id);
      const isMet = prereqNode && prereqNode.level >= prereq.requiredLevel;

      return (
        <div
          key={index}
          className={`flex items-center mb-1 ${
            isMet ? "text-green-500" : "text-red-500"
          }`}
        >
          <div className="mr-2">
            {isMet ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            {prereqNode?.name} (Level {prereq.requiredLevel}+)
          </div>
        </div>
      );
    });
  };

  // Function to load and apply a premade tech tree
  const loadPremadeTechTree = (buildId: string) => {
    const build = premadeTechTrees.find((tree) => tree.id === buildId);
    if (!build) return;

    // Reset current tech tree to level 0
    const resetTree = techTree.map((node) => ({ ...node, level: 0 }));
    setTechTree(resetTree);
    setUpgradeOrder([]);

    // Apply upgrades from the premade build with prerequisite checking
    let newTree = [...resetTree];
    const newUpgradeOrder: UpgradeOrderItem[] = [];
    let appliedCount = 0;
    let skippedCount = 0;

    // Helper function to check if we can upgrade a node to a specific level
    const canUpgradeToLevel = (
      nodeId: string,
      targetLevel: number,
      currentTree: TechNode[]
    ): number => {
      const node = currentTree.find((n) => n.id === nodeId);
      if (!node) return 0;

      let maxAchievableLevel = node.level;

      // Try to upgrade level by level, checking prerequisites for each
      for (
        let level = node.level + 1;
        level <= Math.min(targetLevel, node.maxLevel);
        level++
      ) {
        // Get prerequisites for this specific level
        const levelPrereqs = getPrerequisiteItemsForLevel(node, level);

        // Check if all prerequisites are satisfied
        const canUpgrade = levelPrereqs.every((prereqItem) => {
          if ("orGroup" in prereqItem) {
            // For orGroups, at least one prerequisite must be satisfied
            return prereqItem.orGroup.some((prereq) => {
              const prereqNode = currentTree.find((n) => n.id === prereq.id);
              return prereqNode && prereqNode.level >= prereq.requiredLevel;
            });
          } else {
            // For individual prerequisites
            const prereqNode = currentTree.find((n) => n.id === prereqItem.id);
            return prereqNode && prereqNode.level >= prereqItem.requiredLevel;
          }
        });

        if (canUpgrade) {
          maxAchievableLevel = level;
        } else {
          break; // Can't upgrade further due to missing prerequisites
        }
      }

      return maxAchievableLevel;
    };

    build.upgrades.forEach((upgrade) => {
      const nodeIndex = newTree.findIndex((node) => node.id === upgrade.techId);
      if (nodeIndex === -1) {
        skippedCount++;
        return;
      }

      const node = newTree[nodeIndex];
      const maxAchievableLevel = canUpgradeToLevel(
        upgrade.techId,
        upgrade.targetLevel,
        newTree
      );

      if (maxAchievableLevel > node.level) {
        // Add upgrades to order for each achievable level
        for (let level = node.level + 1; level <= maxAchievableLevel; level++) {
          const crystalCost = node.crystalCost
            ? node.crystalCost[level - 1] || 0
            : 0;
          newUpgradeOrder.push({
            techId: node.id,
            level: level,
            name: `${node.name} Level ${level}`,
            crystalCost: crystalCost,
          });
        }

        // Update node level
        newTree[nodeIndex] = { ...node, level: maxAchievableLevel };
        appliedCount++;

        if (maxAchievableLevel < upgrade.targetLevel) {
          console.log(
            `${node.name}: Could only upgrade to level ${maxAchievableLevel} instead of ${upgrade.targetLevel} due to missing prerequisites`
          );
        }
      } else {
        console.log(
          `${node.name}: Skipped - prerequisites not met for any upgrades`
        );
        skippedCount++;
      }
    });

    console.log(
      `Build applied: ${appliedCount} upgrades successful, ${skippedCount} skipped due to prerequisites`
    );

    setTechTree(newTree);
    setUpgradeOrder(newUpgradeOrder);
    setSelectedBuild(buildId);
  };

  // Function to reset tech tree
  const resetTechTree = () => {
    const resetTree = techTree.map((node) => ({ ...node, level: 0 }));
    setTechTree(resetTree);
    setUpgradeOrder([]);
    setSelectedBuild("");
    setSelectedNode(null);
  };

  if (loading) {
    return (
      <PageLayout>
        <PageTitle
          title="Crystal"
          highlightedText="Tech"
          subtitle="Research and develop crystal-based technology"
        />
        <SectionCard title="Tech Tree">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">
              Loading tech tree data...
            </div>
          </div>
        </SectionCard>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="Crystal"
        highlightedText="Tech"
        subtitle="Research and develop crystal-based technology"
      />

      <div className="mb-4">
        <Link
          to="/tools"
          className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors duration-200 border border-gray-700 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Tools
        </Link>
      </div>

      {/* Premade Tech Tree Builds Section */}
      <div className="mb-6">
        <SectionCard title="Premade Tech Builds">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a premade build:
              </label>
              <select
                value={selectedBuild}
                onChange={(e) => setSelectedBuild(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Choose a build --</option>
                {premadeTechTrees.map((build) => (
                  <option key={build.id} value={build.id}>
                    {build.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedBuild && (
              <div className="mb-4">
                {(() => {
                  const build = premadeTechTrees.find(
                    (b) => b.id === selectedBuild
                  );
                  return build ? (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {build.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {build.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Upgrades:</span>{" "}
                        {build.upgrades.length} techs
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() =>
                  selectedBuild && loadPremadeTechTree(selectedBuild)
                }
                disabled={!selectedBuild}
                className={`px-4 py-2 rounded-md font-medium ${
                  selectedBuild
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Load Build
              </button>
              <button
                onClick={resetTechTree}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tech Tree Visualization */}
        <div className="lg:col-span-2">
          <SectionCard title="Crystal Tech Tree">
            <div className="relative w-full h-[1200px] overflow-auto">
              {/* Connection Lines SVG Overlay */}
              <svg
                className="absolute top-0 left-0 w-full pointer-events-none"
                style={{ zIndex: 1, height: "3200px", width: "100%" }}
              >
                {getAllConnectionLines(techTree).map((connection, index) => (
                  <ConnectionLine
                    key={`${connection.fromNode.id}-${connection.toNode.id}-${index}`}
                    fromNode={connection.fromNode}
                    toNode={connection.toNode}
                  />
                ))}
              </svg>

              {/* Tech Nodes */}
              {techTree.map((node) => (
                <TechNodeComponent
                  key={node.id}
                  node={node}
                  onClick={handleNodeClick}
                  isAvailable={isNodeAvailable(node)}
                  canUpgrade={canUpgrade}
                  onUpgrade={handleUpgrade}
                  onDowngrade={handleDowngrade}
                />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Tech Details Panel */}
        <div>
          <SectionCard title="Tech Details">
            {selectedNode ? (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{selectedNode.name}</h3>
                <p className="text-gray-700 mb-3">
                  {selectedNode.val1}:{" "}
                  {selectedNode.val2[selectedNode.level] ||
                    selectedNode.val2[0]}
                </p>
                <div className="mb-3">
                  <div className="font-semibold mb-1">
                    {selectedNode.maxLevel === 1
                      ? `Status: ${
                          selectedNode.level > 0 ? "Unlocked" : "Locked"
                        }`
                      : `Level: ${selectedNode.level}/${selectedNode.maxLevel}`}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${
                        selectedNode.maxLevel === 1
                          ? "bg-purple-600"
                          : "bg-blue-600"
                      } h-2 rounded-full`}
                      style={{
                        width: `${
                          (selectedNode.level / selectedNode.maxLevel) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Crystal Cost Display */}
                {selectedNode.level < selectedNode.maxLevel &&
                  selectedNode.crystalCost &&
                  selectedNode.crystalCost[selectedNode.level] && (
                    <div className="mb-3">
                      <div className="font-semibold mb-1">
                        Next Upgrade Cost:
                      </div>
                      <div className="text-lg text-blue-600 font-bold">
                        {selectedNode.crystalCost[
                          selectedNode.level
                        ].toLocaleString()}{" "}
                        Crystals
                      </div>
                    </div>
                  )}

                <div className="flex flex-col gap-2">
                  <div className="flex justify-center gap-4 items-center">
                    <button
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                        canDowngrade(selectedNode)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => handleDowngrade(selectedNode)}
                      disabled={!canDowngrade(selectedNode)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold min-w-[80px] text-center">
                      {selectedNode.maxLevel === 1
                        ? `${selectedNode.level > 0 ? "Unlocked" : "Locked"}`
                        : `${selectedNode.level}/${selectedNode.maxLevel}`}
                    </span>
                    <button
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                        canUpgrade(selectedNode)
                          ? selectedNode.maxLevel === 1
                            ? "bg-purple-500 hover:bg-purple-600 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => handleUpgrade(selectedNode)}
                      disabled={!canUpgrade(selectedNode)}
                    >
                      +
                    </button>
                  </div>

                  {/* Quick Action Button */}
                  <button
                    className="w-full px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-semibold"
                    onClick={() => {
                      const maxAchievableLevel =
                        getMaxAchievableLevel(selectedNode);
                      const updatedTree = techTree.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, level: maxAchievableLevel }
                          : node
                      );
                      setTechTree(updatedTree);
                      setSelectedNode({
                        ...selectedNode,
                        level: maxAchievableLevel,
                      });

                      // Add all achievable levels to upgrade order
                      const newUpgrades: UpgradeOrderItem[] = [];
                      for (
                        let level = selectedNode.level;
                        level < maxAchievableLevel;
                        level++
                      ) {
                        const cost = selectedNode.crystalCost?.[level] || 0;
                        newUpgrades.push({
                          techId: selectedNode.id,
                          name: selectedNode.name,
                          level: level + 1,
                          crystalCost: cost,
                        });
                      }
                      setUpgradeOrder((prev) => [...prev, ...newUpgrades]);
                    }}
                    disabled={
                      selectedNode.level >= getMaxAchievableLevel(selectedNode)
                    }
                  >
                    Max Level
                  </button>

                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md w-full"
                    onClick={() => setSelectedNode(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-500">
                  Select a tech node to view details
                </p>
              </div>
            )}
          </SectionCard>

          {/* Prerequisites Panel */}
          {selectedNode && selectedNode.prerequisites.length > 0 && (
            <div className="mt-6">
              <SectionCard title="Prerequisites">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  {/* Current Level Prerequisites */}
                  {selectedNode.level > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-600 mb-2">
                        Current Level ({selectedNode.level}):
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        {getPrerequisitesForLevel(
                          selectedNode,
                          selectedNode.level
                        ).map((prereq, index) => {
                          const prereqNode = techTree.find(
                            (n) => n.id === prereq.id
                          );
                          return (
                            <li
                              key={`current-${prereq.id}-${
                                prereq.appliesToLevel || "general"
                              }-${index}`}
                              className="text-green-600 text-sm"
                            >
                              <span className="font-medium">
                                {prereqNode ? prereqNode.name : prereq.id}
                              </span>
                              <span className="text-gray-600 ml-1">
                                (Level {prereq.requiredLevel}+)
                              </span>
                              {prereq.appliesToLevel && (
                                <span className="text-xs text-blue-600 ml-2">
                                  [Required for Level {prereq.appliesToLevel}]
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Next Level Prerequisites */}
                  {selectedNode.level < selectedNode.maxLevel && (
                    <div>
                      <div className="text-sm font-medium text-blue-600 mb-2">
                        Next Level ({selectedNode.level + 1}):
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        {getPrerequisitesForLevel(
                          selectedNode,
                          selectedNode.level + 1
                        ).map((prereq, index) => {
                          const prereqNode = techTree.find(
                            (n) => n.id === prereq.id
                          );
                          const isMet =
                            prereqNode &&
                            prereqNode.level >= prereq.requiredLevel;
                          return (
                            <li
                              key={`next-${prereq.id}-${
                                prereq.appliesToLevel || "general"
                              }-${index}`}
                              className={`text-sm ${
                                isMet ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              <span className="font-medium">
                                {prereqNode ? prereqNode.name : prereq.id}
                              </span>
                              <span className="text-gray-600 ml-1">
                                (Level {prereq.requiredLevel}+)
                              </span>
                              {prereq.appliesToLevel && (
                                <span className="text-xs text-blue-600 ml-2">
                                  [Required for Level {prereq.appliesToLevel}]
                                </span>
                              )}
                              {!isMet && (
                                <span className="text-xs text-red-500 ml-2">
                                  ✗ Not Met
                                </span>
                              )}
                              {isMet && (
                                <span className="text-xs text-green-500 ml-2">
                                  ✓ Met
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={resetTechTree}
              className="w-full py-2 px-4 bg-red-700 hover:bg-red-800 text-white rounded-md font-semibold"
            >
              Reset All Tech
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Order Panel - Below Tech Tree */}
      <div className="mt-6">
        <SectionCard title="Upgrade Order">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {upgradeOrder.length > 0 ? (
              <div>
                <div className="mb-3">
                  <div className="font-semibold text-lg mb-2">
                    Total Cost:{" "}
                    {upgradeOrder
                      .reduce((sum, item) => sum + item.crystalCost, 0)
                      .toLocaleString()}{" "}
                    crystals
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {upgradeOrder.length} upgrade
                    {upgradeOrder.length !== 1 ? "s" : ""} planned
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <ol className="list-decimal list-inside space-y-2">
                    {upgradeOrder.map((item, index) => (
                      <li
                        key={`${item.techId}-${item.level}-${index}`}
                        className="text-sm"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">
                          ({item.crystalCost.toLocaleString()} crystals)
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-lg mb-2">No upgrades planned</div>
                <div className="text-sm">
                  Click + on tech nodes to add upgrades to your order
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </PageLayout>
  );
}
