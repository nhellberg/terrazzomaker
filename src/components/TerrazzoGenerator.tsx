import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Download,
  Palette,
  Settings,
  Layers,
  Plus,
  Trash2,
  Paintbrush,
} from "lucide-react";

// Curated color palettes with recommended background colors
const COLOR_PALETTES = {
  "classic-terrazzo": {
    name: "Classic Terrazzo",
    backgroundColor: "#F6F7F9", // Light cool gray
    colors: [
      "#1A3A35",
      "#2C4B44",
      "#5D6D7E",
      "#85929E",
      "#AEB6BF",
      "#BDC3C7",
      "#D5DBDB",
      "#F8F9FA",
      "#D4A574",
      "#95A5A6",
    ],
  },
  carrot: {
    name: "Carrot",
    backgroundColor: "#F8F6F4", // Warm light gray matching the image
    colors: [
      "#1A2B1D", // Deep forest green
      "#0F1B0F", // Charcoal black
      "#2F3F2F", // Dark moss green
      "#B8621E", // Burnt orange
      "#D4753A", // Terracotta
      "#C86B3C", // Rust orange
      "#A0522D", // Saddle brown
      "#D4A574", // Light tan
      "#E8D5B7", // Cream beige
      "#C7B299", // Warm beige
    ],
  },
  midnight: {
    name: "Midnight",
    backgroundColor: "#F4F4F6", // Cool light gray
    colors: [
      "#0F0F23", // Deep midnight blue
      "#1A1A2E", // Dark navy
      "#16213E", // Prussian blue
      "#3D405B", // Blue gray
      "#81829A", // Lavender gray
      "#A8A8B8", // Light blue gray
      "#2C2C54", // Deep purple
      "#40407A", // Royal purple
    ],
  },
  "sage-clay": {
    name: "Sage & Clay",
    backgroundColor: "#FAF9F7", // Warm off-white
    colors: [
      "#7D8471", // Sage green
      "#A8B5A1", // Light sage
      "#B8860B", // Dark goldenrod
      "#CD853F", // Peru
      "#D2691E", // Chocolate
      "#BC8F8F", // Rosy brown
      "#F5DEB3", // Wheat
      "#DEB887", // Burlywood
      "#D3D3D3", // Light gray
    ],
  },
  "coral-reef": {
    name: "Coral Reef",
    backgroundColor: "#FCFCFD", // Very light blue-white
    colors: [
      "#FF6B6B", // Coral red
      "#4ECDC4", // Turquoise
      "#45B7D1", // Sky blue
      "#96CEB4", // Mint green
      "#FFEAA7", // Warm yellow
      "#DDA0DD", // Plum
      "#F8B500", // Orange
      "#FF7675", // Light coral
      "#74B9FF", // Bright blue
    ],
  },
  "autumn-leaves": {
    name: "Autumn Leaves",
    backgroundColor: "#FDF6F0", // Warm cream
    colors: [
      "#8B4513", // Saddle brown
      "#CD853F", // Peru
      "#D2691E", // Chocolate
      "#B22222", // Fire brick
      "#DC143C", // Crimson
      "#FF6347", // Tomato
      "#FF8C00", // Dark orange
      "#DAA520", // Goldenrod
      "#F4A460", // Sandy brown
      "#DEB887", // Burlywood
    ],
  },
  nordic: {
    name: "Nordic",
    backgroundColor: "#FBFBFC", // Pure cool white
    colors: [
      "#2C3E50", // Dark blue gray
      "#34495E", // Wet asphalt
      "#7F8C8D", // Asbestos
      "#95A5A6", // Concrete
      "#BDC3C7", // Silver
      "#ECF0F1", // Clouds
      "#3498DB", // Peter river
      "#5DADE2", // Light blue
    ],
  },
  "warm-stone": {
    name: "Warm Stone",
    backgroundColor: "#FAF8F5", // Warm off-white
    colors: [
      "#8D6E63", // Brown gray
      "#A1887F", // Pale brown
      "#BCAAA4", // Mushroom
      "#D7CCC8", // Pale beige
      "#EFEBE9", // Very light brown
      "#6D4C41", // Brown
      "#5D4037", // Dark brown
      "#795548", // Light brown
      "#8A6E53", // Medium brown
    ],
  },
  "earthy-browns": {
    name: "Earthy Browns",
    backgroundColor: "#FBF8F3", // Warm cream
    colors: [
      "#8B4513",
      "#A0522D",
      "#CD853F",
      "#DEB887",
      "#F4A460",
      "#D2B48C",
    ],
  },
  "ocean-blues": {
    name: "Ocean Blues",
    backgroundColor: "#F8FAFC", // Cool white with blue undertone
    colors: [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
    ],
  },
  "desert-sands": {
    name: "Desert Sands",
    backgroundColor: "#FFFCF7", // Warm sandy white
    colors: [
      "#F4E4BC",
      "#E8D5B7",
      "#D4A574",
      "#C19A6B",
      "#B8860B",
      "#DAA520",
    ],
  },
  "monochrome-grays": {
    name: "Monochrome Grays",
    backgroundColor: "#FAFAFA", // Pure light gray
    colors: [
      "#2C2C2C",
      "#4A4A4A",
      "#6B6B6B",
      "#8C8C8C",
      "#ADADAD",
      "#CECECE",
    ],
  },
  sunset: {
    name: "Sunset",
    backgroundColor: "#FFF9F5", // Warm peachy white
    colors: [
      "#FF6B35",
      "#F7931E",
      "#FFD23F",
      "#EE4B2B",
      "#C73E1D",
      "#FFA07A",
    ],
  },
  "forest-greens": {
    name: "Forest Greens",
    backgroundColor: "#F7FAF8", // Light sage white
    colors: [
      "#1B4332",
      "#2D5016",
      "#52B788",
      "#74C69D",
      "#95D5B2",
      "#B7E4C7",
    ],
  },
};

interface TerrazzoSettings {
  chipSize: number;
  density: number;
  backgroundColor: string;
  palette: string;
  customColors: string[]; // Array of custom colors when palette is "custom"
  material: string;
  backgroundNoise: number;
  chipNoise: number;
  shapeStyle: number; // 0 = angular, 100 = rounded
  sizeVariation: number; // 0 = uniform size, 100 = dramatic size differences
  downloadWidth: number;
  downloadHeight: number;
}

interface PlacedChip {
  x: number;
  y: number;
  size: number;
  color: string;
  path?: Path2D;
  pathData?: string; // For SVG
}

export function TerrazzoGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const [settings, setSettings] = useState<TerrazzoSettings>({
    chipSize: 20,
    density: 70,
    backgroundColor: "#F6F7F9",
    palette: "classic-terrazzo",
    customColors: ["#1A3A35", "#5D6D7E", "#85929E", "#D5DBDB"], // Default custom colors
    material: "marble",
    backgroundNoise: 0,
    chipNoise: 30,
    shapeStyle: 50, // Default to balanced between angular and rounded
    sizeVariation: 70, // Default to good variation between big and small chips
    downloadWidth: 1200,
    downloadHeight: 1200,
  });

  const [customSize, setCustomSize] = useState(false);

  // Debounced dimensions for preventing lag during input
  const [inputDimensions, setInputDimensions] = useState({
    width: settings.downloadWidth,
    height: settings.downloadHeight,
  });

  // Debounced slider values for preventing lag during interaction
  const [sliderValues, setSliderValues] = useState({
    chipSize: settings.chipSize,
    density: settings.density,
    backgroundNoise: settings.backgroundNoise,
    chipNoise: settings.chipNoise,
    shapeStyle: settings.shapeStyle,
    sizeVariation: settings.sizeVariation,
  });

  // Debounced palette selection for preventing lag
  const [debouncedPalette, setDebouncedPalette] = useState(
    settings.palette,
  );

  // Debounce the dimension updates to prevent constant re-rendering
  const debouncedDimensions = useMemo(() => {
    const timeoutId = setTimeout(() => {
      updateSetting("downloadWidth", inputDimensions.width);
      updateSetting("downloadHeight", inputDimensions.height);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [inputDimensions.width, inputDimensions.height]);

  // Debounce the slider updates to prevent constant re-rendering
  const debouncedSliders = useMemo(() => {
    const timeoutId = setTimeout(() => {
      updateSetting("chipSize", sliderValues.chipSize);
      updateSetting("density", sliderValues.density);
      updateSetting(
        "backgroundNoise",
        sliderValues.backgroundNoise,
      );
      updateSetting("chipNoise", sliderValues.chipNoise);
      updateSetting("shapeStyle", sliderValues.shapeStyle);
      updateSetting(
        "sizeVariation",
        sliderValues.sizeVariation,
      );
    }, 300); // 300ms delay for sliders (faster than inputs)

    return () => clearTimeout(timeoutId);
  }, [
    sliderValues.chipSize,
    sliderValues.density,
    sliderValues.backgroundNoise,
    sliderValues.chipNoise,
    sliderValues.shapeStyle,
    sliderValues.sizeVariation,
  ]);

  // Debounce the palette updates to prevent constant re-rendering
  const debouncedPaletteUpdate = useMemo(() => {
    const timeoutId = setTimeout(() => {
      updateSetting("palette", debouncedPalette);
      
      // Auto-update background color when palette changes (except for custom)
      if (debouncedPalette !== "custom" && debouncedPalette in COLOR_PALETTES) {
        const paletteData = COLOR_PALETTES[debouncedPalette as keyof typeof COLOR_PALETTES];
        updateSetting("backgroundColor", paletteData.backgroundColor);
      }
    }, 400); // 400ms delay for palette changes

    return () => clearTimeout(timeoutId);
  }, [debouncedPalette]);

  // Cleanup the timeouts on unmount
  useEffect(() => {
    return debouncedDimensions;
  }, [debouncedDimensions]);

  useEffect(() => {
    return debouncedSliders;
  }, [debouncedSliders]);

  useEffect(() => {
    return debouncedPaletteUpdate;
  }, [debouncedPaletteUpdate]);

  // Check if two chips would collide (with minimum spacing)
  const checkCollision = useCallback(
    (
      x1: number,
      y1: number,
      size1: number,
      x2: number,
      y2: number,
      size2: number,
      minSpacing: number = 3,
    ) => {
      const distance = Math.sqrt(
        (x2 - x1) ** 2 + (y2 - y1) ** 2,
      );
      const minDistance = size1 + size2 + minSpacing;
      return distance < minDistance;
    },
    [],
  );

  // Find a valid position for a chip that doesn't collide with existing chips
  const findValidPosition = useCallback(
    (
      placedChips: PlacedChip[],
      width: number,
      height: number,
      size: number,
      maxAttempts: number = 50,
    ) => {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        // Check if this position is too close to edges
        if (
          x - size < 0 ||
          x + size > width ||
          y - size < 0 ||
          y + size > height
        ) {
          continue;
        }

        // Check collision with all placed chips
        let hasCollision = false;
        for (const chip of placedChips) {
          if (
            checkCollision(
              x,
              y,
              size,
              chip.x,
              chip.y,
              chip.size,
            )
          ) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision) {
          return { x, y };
        }
      }

      return null; // No valid position found
    },
    [checkCollision],
  );

  // Generate Voronoi cell for glass material
  const generateVoronoiCell = useCallback(
    (centerX: number, centerY: number, size: number) => {
      const path = new Path2D();
      
      // Generate random points around the center for Voronoi cell
      const numPoints = 6 + Math.floor(Math.random() * 4); // 6-9 points for good cell structure
      const points = [];
      
      // Create points in a rough circle around the center
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const angleVariation = (Math.random() - 0.5) * 0.8; // Random angle variation
        const finalAngle = angle + angleVariation;
        
        // Distance variation to create irregular cells
        const distanceVariation = 0.6 + Math.random() * 0.8; // 0.6 to 1.4 of size
        const distance = size * distanceVariation;
        
        const x = centerX + Math.cos(finalAngle) * distance;
        const y = centerY + Math.sin(finalAngle) * distance;
        points.push({ x, y });
      }
      
      // Create the Voronoi cell path
      if (points.length > 0) {
        path.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          path.lineTo(points[i].x, points[i].y);
        }
        path.closePath();
      }
      
      return path;
    },
    [],
  );

  // Generate chip shape based on shapeStyle setting (0=angular, 100=rounded)
  const generateChipPath = useCallback(
    (centerX: number, centerY: number, size: number) => {
      // Use Voronoi cells for glass material
      if (settings.material === "glass") {
        return generateVoronoiCell(centerX, centerY, size);
      }
      
      const path = new Path2D();

      // Calculate shape style influence (0 to 1)
      const roundness = settings.shapeStyle / 100;

      // For mixed shapes (60-75% range), randomly choose between angular and rounded
      const shouldMixShapes =
        roundness >= 0.6 && roundness <= 0.75;
      const mixProbability = (roundness - 0.6) / 0.15; // 0 at 60%, 1 at 75%
      const forceRounded =
        shouldMixShapes && Math.random() < mixProbability;
      const forceAngular =
        shouldMixShapes &&
        !forceRounded &&
        Math.random() < 1 - mixProbability;

      if (roundness < 0.2 && !forceRounded) {
        // Less sharp angular - create faceted but not extreme shapes
        const points = 5 + Math.floor(Math.random() * 3); // 5-7 points for smoother angular
        const angles = [];

        for (let i = 0; i < points; i++) {
          const baseAngle = (i / points) * Math.PI * 2;
          // Reduced angle variation for less sharp edges
          const angleVariation = (Math.random() - 0.5) * 0.6; // Reduced from 1.2 to 0.6
          angles.push(baseAngle + angleVariation);
        }
        angles.sort();

        // Create faceted but not extreme points
        for (let i = 0; i < points; i++) {
          const angle = angles[i];
          const radiusVariation = 0.5 + Math.random() * 0.7; // Less dramatic variation
          const radius = size * radiusVariation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            path.moveTo(x, y);
          } else {
            path.lineTo(x, y); // Straight lines for angular
          }
        }
        path.closePath();
        return path;
      } else if (forceAngular && !forceRounded) {
        // Gentle angular for mixed shapes - less sharp than extreme angular
        const points = 4 + Math.floor(Math.random() * 3); // 4-6 points
        const angles = [];

        for (let i = 0; i < points; i++) {
          const baseAngle = (i / points) * Math.PI * 2;
          // Very gentle angle variation for mixed angular shapes
          const angleVariation = (Math.random() - 0.5) * 0.4;
          angles.push(baseAngle + angleVariation);
        }
        angles.sort();

        // Create gentle angular points
        for (let i = 0; i < points; i++) {
          const angle = angles[i];
          const radiusVariation = 0.6 + Math.random() * 0.6; // Moderate variation
          const radius = size * radiusVariation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            path.moveTo(x, y);
          } else {
            path.lineTo(x, y);
          }
        }
        path.closePath();
        return path;
      } else if (roundness > 0.8 || forceRounded) {
        // Very rounded - create smooth pebble/river stone shapes with even less sharpness
        const ellipseVariation = 0.7 + Math.random() * 0.6; // Reduced variation for smoother shapes
        const rotation = Math.random() * Math.PI * 2; // Random rotation

        // Create a very smooth ellipse with minimal variation
        const radiusX = size * (0.85 + Math.random() * 0.3); // More consistent sizing
        const radiusY =
          size *
          ellipseVariation *
          (0.85 + Math.random() * 0.3);

        // Use even fewer points for maximum smoothness - just 6 control points
        const segments = 6;
        const points = [];

        // Generate ellipse points with even less random variation
        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;

          // Calculate ellipse radius at this angle
          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
          const radius =
            (radiusX * radiusY) /
            Math.sqrt(
              Math.pow(radiusY * cosAngle, 2) +
                Math.pow(radiusX * sinAngle, 2),
            );

          // Even more subtle random variation for ultra-smooth stones
          const variation = 1 + (Math.random() - 0.5) * 0.08; // Only 8% max variation
          const finalRadius = radius * variation;

          // Apply rotation
          const rotatedAngle = angle + rotation;
          const x =
            centerX + Math.cos(rotatedAngle) * finalRadius;
          const y =
            centerY + Math.sin(rotatedAngle) * finalRadius;

          points.push({ x, y, angle: rotatedAngle });
        }

        // Draw ultra-smooth curves through the points
        path.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < segments; i++) {
          const current = points[i];
          const next = points[(i + 1) % segments];

          // Calculate very smooth curve control points
          const tangentLength = 0.55; // Increased for even smoother curves
          const currentTangentAngle =
            current.angle + Math.PI / 2;
          const nextTangentAngle = next.angle - Math.PI / 2;

          const cp1X =
            current.x +
            Math.cos(currentTangentAngle) *
              tangentLength *
              size *
              0.35;
          const cp1Y =
            current.y +
            Math.sin(currentTangentAngle) *
              tangentLength *
              size *
              0.35;
          const cp2X =
            next.x +
            Math.cos(nextTangentAngle) *
              tangentLength *
              size *
              0.35;
          const cp2Y =
            next.y +
            Math.sin(nextTangentAngle) *
              tangentLength *
              size *
              0.35;

          path.bezierCurveTo(
            cp1X,
            cp1Y,
            cp2X,
            cp2Y,
            next.x,
            next.y,
          );
        }

        path.closePath();
        return path;
      } else {
        // Intermediate shapes - blend between angular and rounded
        const points = 6 + Math.floor(Math.random() * 3); // 6-8 points for smoother intermediate
        const angles = [];

        for (let i = 0; i < points; i++) {
          const baseAngle = (i / points) * Math.PI * 2;
          // Much gentler angle variation for intermediate shapes
          const angleVariation =
            (Math.random() - 0.5) * (1 - roundness) * 0.5; // Reduced from 1.0 to 0.5
          angles.push(baseAngle + angleVariation);
        }
        angles.sort();

        const pathPoints = [];
        for (let i = 0; i < points; i++) {
          const angle = angles[i];
          const radiusVariation = 0.6 + Math.random() * 0.6; // More consistent sizing
          const radius = size * radiusVariation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          pathPoints.push({ x, y });
        }

        // Draw with varying curve intensity based on roundness
        for (let i = 0; i < pathPoints.length; i++) {
          const currentPoint = pathPoints[i];
          const nextPoint =
            pathPoints[(i + 1) % pathPoints.length];

          if (i === 0) {
            path.moveTo(currentPoint.x, currentPoint.y);
          }

          if (roundness > 0.3) {
            // Start curves earlier for smoother transition
            // Use curves with intensity based on roundness
            const curveFactor = roundness * size * 0.3; // Slightly reduced for gentler curves
            const cpX =
              (currentPoint.x + nextPoint.x) / 2 +
              (Math.random() - 0.5) * curveFactor;
            const cpY =
              (currentPoint.y + nextPoint.y) / 2 +
              (Math.random() - 0.5) * curveFactor;

            path.quadraticCurveTo(
              cpX,
              cpY,
              nextPoint.x,
              nextPoint.y,
            );
          } else {
            // Use straight lines
            path.lineTo(nextPoint.x, nextPoint.y);
          }
        }
        path.closePath();
        return path;
      }
    },
    [settings.shapeStyle, settings.material, generateVoronoiCell],
  );

  // Generate Voronoi cell SVG path for glass material
  const generateVoronoiSVGPath = useCallback(
    (centerX: number, centerY: number, size: number) => {
      let pathData = "";
      
      // Generate random points around the center for Voronoi cell
      const numPoints = 6 + Math.floor(Math.random() * 4); // 6-9 points
      const points = [];
      
      // Create points in a rough circle around the center
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const angleVariation = (Math.random() - 0.5) * 0.8; // Random angle variation
        const finalAngle = angle + angleVariation;
        
        // Distance variation to create irregular cells
        const distanceVariation = 0.6 + Math.random() * 0.8; // 0.6 to 1.4 of size
        const distance = size * distanceVariation;
        
        const x = centerX + Math.cos(finalAngle) * distance;
        const y = centerY + Math.sin(finalAngle) * distance;
        points.push({ x, y });
      }
      
      // Create the SVG path
      if (points.length > 0) {
        pathData += `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          pathData += ` L ${points[i].x} ${points[i].y}`;
        }
        pathData += " Z";
      }
      
      return pathData;
    },
    [],
  );

  // Generate SVG path data based on shapeStyle setting
  const generateSVGPathData = useCallback(
    (centerX: number, centerY: number, size: number) => {
      // Use Voronoi cells for glass material
      if (settings.material === "glass") {
        return generateVoronoiSVGPath(centerX, centerY, size);
      }
      
      let pathData = "";
      const roundness = settings.shapeStyle / 100;

      // For mixed shapes (60-75% range), randomly choose between angular and rounded
      const shouldMixShapes =
        roundness >= 0.6 && roundness <= 0.75;
      const mixProbability = (roundness - 0.6) / 0.15; // 0 at 60%, 1 at 75%
      const forceRounded =
        shouldMixShapes && Math.random() < mixProbability;
      const forceAngular =
        shouldMixShapes &&
        !forceRounded &&
        Math.random() < 1 - mixProbability;

      if (roundness < 0.2 && !forceRounded) {
        // Less sharp angular SVG paths
        const points = 5 + Math.floor(Math.random() * 3); // 5-7 points
        const angles = [];

        for (let i = 0; i < points; i++) {
          const baseAngle = (i / points) * Math.PI * 2;
          const angleVariation = (Math.random() - 0.5) * 0.6; // Reduced variation
          angles.push(baseAngle + angleVariation);
        }
        angles.sort();

        for (let i = 0; i < points; i++) {
          const angle = angles[i];
          const radiusVariation = 0.5 + Math.random() * 0.7; // Less dramatic variation
          const radius = size * radiusVariation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            pathData += `M ${x} ${y}`;
          } else {
            pathData += ` L ${x} ${y}`;
          }
        }
        pathData += " Z";
        return pathData;
      } else if (forceAngular && !forceRounded) {
        // Gentle angular for mixed shapes SVG
        const points = 4 + Math.floor(Math.random() * 3); // 4-6 points
        const angles = [];

        for (let i = 0; i < points; i++) {
          const baseAngle = (i / points) * Math.PI * 2;
          const angleVariation = (Math.random() - 0.5) * 0.4; // Very gentle variation
          angles.push(baseAngle + angleVariation);
        }
        angles.sort();

        for (let i = 0; i < points; i++) {
          const angle = angles[i];
          const radiusVariation = 0.6 + Math.random() * 0.6; // Moderate variation
          const radius = size * radiusVariation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            pathData += `M ${x} ${y}`;
          } else {
            pathData += ` L ${x} ${y}`;
          }
        }
        pathData += " Z";
        return pathData;
      } else if (roundness > 0.8 || forceRounded) {
        // Very rounded SVG paths - ultra-smooth pebble/river stone shapes
        const ellipseVariation = 0.7 + Math.random() * 0.6; // Reduced variation
        const rotation = Math.random() * Math.PI * 2;

        const radiusX = size * (0.85 + Math.random() * 0.3); // More consistent sizing
        const radiusY =
          size *
          ellipseVariation *
          (0.85 + Math.random() * 0.3);

        // Use fewer segments for ultra-smooth SVG paths
        const segments = 6;
        const points = [];

        // Generate ellipse points with minimal variation
        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;

          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
          const radius =
            (radiusX * radiusY) /
            Math.sqrt(
              Math.pow(radiusY * cosAngle, 2) +
                Math.pow(radiusX * sinAngle, 2),
            );

          const variation = 1 + (Math.random() - 0.5) * 0.08; // Even less variation
          const finalRadius = radius * variation;

          const rotatedAngle = angle + rotation;
          const x =
            centerX + Math.cos(rotatedAngle) * finalRadius;
          const y =
            centerY + Math.sin(rotatedAngle) * finalRadius;

          points.push({ x, y, angle: rotatedAngle });
        }

        // Build SVG path with ultra-smooth curves
        pathData += `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < segments; i++) {
          const current = points[i];
          const next = points[(i + 1) % segments];

          const tangentLength = 0.55; // Increased for smoother curves
          const currentTangentAngle =
            current.angle + Math.PI / 2;
          const nextTangentAngle = next.angle - Math.PI / 2;

          const cp1X =
            current.x +
            Math.cos(currentTangentAngle) *
              tangentLength *
              size *
              0.35;
          const cp1Y =
            current.y +
            Math.sin(currentTangentAngle) *
              tangentLength *
              size *
              0.35;
          const cp2X =
            next.x +
            Math.cos(nextTangentAngle) *
              tangentLength *
              size *
              0.35;
          const cp2Y =
            next.y +
            Math.sin(nextTangentAngle) *
              tangentLength *
              size *
              0.35;

          pathData += ` C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${next.x} ${next.y}`;
        }

        pathData += " Z";
        return pathData;
      } else {
        // Intermediate SVG paths
        const points = 6 + Math.floor(Math.random() * 3); // 6-8 points for smoother intermediate
        const angles = [];

        for (let i = 0; i < points; i++) {
          const baseAngle = (i / points) * Math.PI * 2;
          const angleVariation =
            (Math.random() - 0.5) * (1 - roundness) * 0.5; // Gentler variation
          angles.push(baseAngle + angleVariation);
        }
        angles.sort();

        const pathPoints = [];
        for (let i = 0; i < points; i++) {
          const angle = angles[i];
          const radiusVariation = 0.6 + Math.random() * 0.6; // More consistent sizing
          const radius = size * radiusVariation;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          pathPoints.push({ x, y });
        }

        for (let i = 0; i < pathPoints.length; i++) {
          const currentPoint = pathPoints[i];
          const nextPoint =
            pathPoints[(i + 1) % pathPoints.length];

          if (i === 0) {
            pathData += `M ${currentPoint.x} ${currentPoint.y}`;
          }

          if (roundness > 0.3) {
            // Start curves earlier
            const curveFactor = roundness * size * 0.3; // Gentler curves
            const cpX =
              (currentPoint.x + nextPoint.x) / 2 +
              (Math.random() - 0.5) * curveFactor;
            const cpY =
              (currentPoint.y + nextPoint.y) / 2 +
              (Math.random() - 0.5) * curveFactor;

            pathData += ` Q ${cpX} ${cpY} ${nextPoint.x} ${nextPoint.y}`;
          } else {
            pathData += ` L ${nextPoint.x} ${nextPoint.y}`;
          }
        }
        pathData += " Z";
        return pathData;
      }
    },
    [settings.shapeStyle, settings.material, generateVoronoiSVGPath],
  );

  // Helper function to lighten/darken colors
  const adjustColor = useCallback(
    (color: string, amount: number) => {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * amount);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 0x00ff) + amt;
      const B = (num & 0x0000ff) + amt;
      return (
        "#" +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)
      );
    },
    [],
  );

  // Noise functions for domain warping marble effect
  const fade = useCallback(
    (t: number) => t * t * t * (t * (t * 6 - 15) + 10),
    [],
  );

  const lerp = useCallback(
    (t: number, a: number, b: number) => a + t * (b - a),
    [],
  );

  const grad = useCallback(
    (hash: number, x: number, y: number) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
      return (
        ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
      );
    },
    [],
  );

  // Simple hash function for consistent pseudo-random values
  const hash = useCallback((x: number, y: number) => {
    let h =
      Math.floor(x) * 374761393 + Math.floor(y) * 668265263;
    h = (h ^ (h >>> 13)) * 1274126177;
    return h ^ (h >>> 16);
  }, []);

  // Simplified Perlin noise implementation
  const noise = useCallback(
    (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;

      x -= Math.floor(x);
      y -= Math.floor(y);

      const u = fade(x);
      const v = fade(y);

      const A = hash(X, Y);
      const B = hash(X + 1, Y);
      const C = hash(X, Y + 1);
      const D = hash(X + 1, Y + 1);

      return lerp(
        v,
        lerp(u, grad(A, x, y), grad(B, x - 1, y)),
        lerp(u, grad(C, x, y - 1), grad(D, x - 1, y - 1)),
      );
    },
    [fade, lerp, grad, hash],
  );

  // Fractal Brownian Motion (fBm) for turbulence
  const fbm = useCallback(
    (
      x: number,
      y: number,
      octaves: number = 4,
      persistence: number = 0.5,
    ) => {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;

      for (let i = 0; i < octaves; i++) {
        value +=
          noise(x * frequency, y * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }

      return value / maxValue;
    },
    [noise],
  );

  // Domain warping function
  const domainWarp = useCallback(
    (x: number, y: number, warpScale: number = 0.1) => {
      const warpX =
        fbm(x * warpScale, y * warpScale, 3, 0.6) * 8;
      const warpY =
        fbm(
          (x + 100) * warpScale,
          (y + 100) * warpScale,
          3,
          0.6,
        ) * 8;
      return { x: x + warpX, y: y + warpY };
    },
    [fbm],
  );

  // Generate marble pattern using domain warping
  const generateMarblePattern = useCallback(
    (x: number, y: number, scale: number = 0.02) => {
      // Apply domain warping
      const warped = domainWarp(x, y, scale * 0.5);

      // Generate primary noise at warped coordinates
      const primaryNoise = fbm(
        warped.x * scale,
        warped.y * scale,
        5,
        0.6,
      );

      // Add secondary warping for more complex patterns
      const secondWarp = domainWarp(
        warped.x * 0.5,
        warped.y * 0.5,
        scale * 0.3,
      );
      const secondaryNoise = fbm(
        secondWarp.x * scale * 2,
        secondWarp.y * scale * 2,
        3,
        0.4,
      );

      // Combine noises
      const finalNoise = primaryNoise + secondaryNoise * 0.3;

      return finalNoise;
    },
    [domainWarp, fbm],
  );

  // Add noise texture to context within a specific path
  const addNoiseToPath = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      path: Path2D,
      centerX: number,
      centerY: number,
      size: number,
      intensity: number,
    ) => {
      if (intensity === 0) return;

      // Create a temporary canvas to generate noise
      const tempCanvas = document.createElement("canvas");
      const tempSize = Math.ceil(size * 2.5);
      tempCanvas.width = tempSize;
      tempCanvas.height = tempSize;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Fill with white first
      tempCtx.fillStyle = "white";
      tempCtx.fillRect(0, 0, tempSize, tempSize);

      // Get image data and add noise
      const imageData = tempCtx.getImageData(
        0,
        0,
        tempSize,
        tempSize,
      );
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * intensity;
        data[i] = Math.max(0, Math.min(255, data[i] + noise)); // R
        data[i + 1] = Math.max(
          0,
          Math.min(255, data[i + 1] + noise),
        ); // G
        data[i + 2] = Math.max(
          0,
          Math.min(255, data[i + 2] + noise),
        ); // B
      }

      tempCtx.putImageData(imageData, 0, 0);

      // Apply the noise to the main canvas, clipped to the path
      ctx.save();
      ctx.clip(path);
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(
        tempCanvas,
        centerX - tempSize / 2,
        centerY - tempSize / 2,
      );
      ctx.restore();
    },
    [],
  );

  // Apply distinct material effects
  const applyMaterialEffect = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      chip: PlacedChip,
      chipPath: Path2D,
    ) => {
      const { x, y, size, color } = chip;

      switch (settings.material) {
        case "flat":
          // Simple flat color
          ctx.fillStyle = color;
          ctx.fill(chipPath);
          break;

        case "marble":
          // Domain-warped marble using layered noise and distortion
          ctx.fillStyle = color;
          ctx.fill(chipPath);

          ctx.save();
          ctx.clip(chipPath);

          const baseColor = color;
          const marbleType = Math.random();

          // Create temporary canvas for marble pattern generation
          const tempCanvas = document.createElement("canvas");
          const tempSize = Math.ceil(size * 3);
          tempCanvas.width = tempSize;
          tempCanvas.height = tempSize;
          const tempCtx = tempCanvas.getContext("2d");
          if (!tempCtx) {
            ctx.restore();
            break;
          }

          // Generate image data for marble pattern
          const imageData = tempCtx.createImageData(
            tempSize,
            tempSize,
          );
          const data = imageData.data;

          // Random offset for pattern variation per chip
          const offsetX = Math.random() * 1000;
          const offsetY = Math.random() * 1000;
          const scale = 0.008 + Math.random() * 0.004; // Vary the scale per chip

          for (let py = 0; py < tempSize; py++) {
            for (let px = 0; px < tempSize; px++) {
              const idx = (py * tempSize + px) * 4;

              // Convert pixel coordinates to world coordinates
              const worldX = px - tempSize / 2 + x + offsetX;
              const worldY = py - tempSize / 2 + y + offsetY;

              // Generate marble pattern using domain warping
              const marbleValue = generateMarblePattern(
                worldX,
                worldY,
                scale,
              );

              // Different marble types with distinct characteristics
              let r,
                g,
                b,
                a = 255;

              if (marbleType < 0.3) {
                // Carrara-style white marble with gray veining
                const baseWhite =
                  240 + Math.floor(marbleValue * 15);
                const veinThreshold = 0.4;

                if (marbleValue > veinThreshold) {
                  // Vein areas - dark gray
                  const veinIntensity = Math.pow(
                    (marbleValue - veinThreshold) /
                      (1 - veinThreshold),
                    2,
                  );
                  const gray = Math.floor(
                    baseWhite - veinIntensity * 120,
                  );
                  r = g = b = Math.max(50, gray);
                } else {
                  // Base marble - white to light gray
                  const lightness = Math.floor(
                    baseWhite - Math.abs(marbleValue) * 20,
                  );
                  r = g = b = Math.min(255, lightness);
                }
              } else if (marbleType < 0.6) {
                // Colored marble with natural veining
                const baseR = parseInt(
                  baseColor.slice(1, 3),
                  16,
                );
                const baseG = parseInt(
                  baseColor.slice(3, 5),
                  16,
                );
                const baseB = parseInt(
                  baseColor.slice(5, 7),
                  16,
                );

                const veinThreshold = 0.3;
                const lightVariation = marbleValue * 0.4;

                if (Math.abs(marbleValue) > veinThreshold) {
                  // Vein areas - darker version of base color
                  const darkening =
                    Math.pow(Math.abs(marbleValue), 1.5) * 0.6;
                  r = Math.floor(baseR * (1 - darkening));
                  g = Math.floor(baseG * (1 - darkening));
                  b = Math.floor(baseB * (1 - darkening));
                } else {
                  // Base areas - lighter variations
                  const lightening = 1 + lightVariation * 0.3;
                  r = Math.min(
                    255,
                    Math.floor(baseR * lightening),
                  );
                  g = Math.min(
                    255,
                    Math.floor(baseG * lightening),
                  );
                  b = Math.min(
                    255,
                    Math.floor(baseB * lightening),
                  );
                }
              } else {
                // Calacatta-style with dramatic veining
                const baseR = parseInt(
                  baseColor.slice(1, 3),
                  16,
                );
                const baseG = parseInt(
                  baseColor.slice(3, 5),
                  16,
                );
                const baseB = parseInt(
                  baseColor.slice(5, 7),
                  16,
                );

                // Sharp vein definition using step function
                const veinThreshold = 0.6;
                const softThreshold = 0.4;

                if (marbleValue > veinThreshold) {
                  // Sharp vein areas
                  const veinStrength =
                    (marbleValue - veinThreshold) /
                    (1 - veinThreshold);
                  const darkening = 0.4 + veinStrength * 0.4;
                  r = Math.floor(baseR * (1 - darkening));
                  g = Math.floor(baseG * (1 - darkening));
                  b = Math.floor(baseB * (1 - darkening));
                } else if (marbleValue > softThreshold) {
                  // Transition areas
                  const transition =
                    (marbleValue - softThreshold) /
                    (veinThreshold - softThreshold);
                  const darkening = transition * 0.3;
                  r = Math.floor(baseR * (1 - darkening));
                  g = Math.floor(baseG * (1 - darkening));
                  b = Math.floor(baseB * (1 - darkening));
                } else {
                  // Base marble areas - lighter
                  const lightening =
                    1 + (0.4 - Math.abs(marbleValue)) * 0.2;
                  r = Math.min(
                    255,
                    Math.floor(baseR * lightening),
                  );
                  g = Math.min(
                    255,
                    Math.floor(baseG * lightening),
                  );
                  b = Math.min(
                    255,
                    Math.floor(baseB * lightening),
                  );
                }
              }

              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = a;
            }
          }

          // Apply the generated pattern to temp canvas
          tempCtx.putImageData(imageData, 0, 0);

          // Draw the marble pattern onto main canvas
          ctx.drawImage(
            tempCanvas,
            x - tempSize / 2,
            y - tempSize / 2,
          );

          // Add subtle crystalline shimmer for realism
          const shimmerCount =
            5 + Math.floor(Math.random() * 10);
          for (let i = 0; i < shimmerCount; i++) {
            const shimmerX =
              x + (Math.random() - 0.5) * size * 1.2;
            const shimmerY =
              y + (Math.random() - 0.5) * size * 1.2;
            const shimmerSize = Math.random() * 1.5 + 0.5;

            ctx.fillStyle =
              Math.random() > 0.5
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(255, 255, 255, 0.1)";

            ctx.beginPath();
            ctx.arc(
              shimmerX,
              shimmerY,
              shimmerSize,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }

          // Add polish shine effect
          const shineGradient = ctx.createLinearGradient(
            x - size * 0.6,
            y - size * 0.6,
            x + size * 0.4,
            y + size * 0.4,
          );
          shineGradient.addColorStop(
            0,
            "rgba(255, 255, 255, 0.12)",
          );
          shineGradient.addColorStop(
            0.4,
            "rgba(255, 255, 255, 0.06)",
          );
          shineGradient.addColorStop(
            1,
            "rgba(255, 255, 255, 0)",
          );

          ctx.fillStyle = shineGradient;
          ctx.fillRect(x - size, y - size, size * 2, size * 2);

          ctx.restore();
          break;

        case "granite":
          // Granite with speckled texture and rough appearance (keeping as is)
          ctx.fillStyle = color;
          ctx.fill(chipPath);

          ctx.save();
          ctx.clip(chipPath);

          // Add large granite speckles
          for (let i = 0; i < size * 0.8; i++) {
            const speckleX =
              x + (Math.random() - 0.5) * size * 1.8;
            const speckleY =
              y + (Math.random() - 0.5) * size * 1.8;
            const speckleSize = Math.random() * 3 + 1;

            if (Math.random() > 0.5) {
              ctx.fillStyle = adjustColor(color, 40) + "80";
            } else {
              ctx.fillStyle = adjustColor(color, -25) + "60";
            }

            ctx.beginPath();
            ctx.arc(
              speckleX,
              speckleY,
              speckleSize,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }

          // Add smaller speckles for texture
          for (let i = 0; i < size * 1.5; i++) {
            const speckleX =
              x + (Math.random() - 0.5) * size * 1.8;
            const speckleY =
              y + (Math.random() - 0.5) * size * 1.8;
            const speckleSize = Math.random() * 1.5 + 0.5;

            ctx.fillStyle =
              Math.random() > 0.6 ? "#ffffff40" : "#00000025";
            ctx.beginPath();
            ctx.arc(
              speckleX,
              speckleY,
              speckleSize,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.restore();
          break;

        case "glass":
          // Advanced glass with Voronoi shapes, internal texture, and realistic optical effects
          
          // Step 1: Base glass color with varied transparency
          const baseOpacity = 0.75 + Math.random() * 0.20; // 75-95% opacity
          ctx.fillStyle =
            color +
            Math.floor(baseOpacity * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill(chipPath);

          ctx.save();
          ctx.clip(chipPath);

          // Step 2: Create internal texture using high-frequency noise for bubbles/impurities
          const glassCanvas = document.createElement("canvas");
          const glassSize = Math.ceil(size * 2.5);
          glassCanvas.width = glassSize;
          glassCanvas.height = glassSize;
          const glassCtx = glassCanvas.getContext("2d");
          if (!glassCtx) {
            ctx.restore();
            break;
          }

          // Generate internal glass texture with noise
          const glassImageData = glassCtx.createImageData(glassSize, glassSize);
          const glassData = glassImageData.data;
          
          // Random offset for texture variation per chip
          const glassOffsetX = Math.random() * 1000;
          const glassOffsetY = Math.random() * 1000;
          const glassScale = 0.15 + Math.random() * 0.1; // High frequency for fine details

          for (let py = 0; py < glassSize; py++) {
            for (let px = 0; px < glassSize; px++) {
              const idx = (py * glassSize + px) * 4;
              
              // Convert pixel coordinates to world coordinates
              const worldX = px - glassSize / 2 + x + glassOffsetX;
              const worldY = py - glassSize / 2 + y + glassOffsetY;

              // Generate multiple layers of noise for glass texture
              const bubbleNoise = fbm(worldX * glassScale, worldY * glassScale, 4, 0.6);
              const stressNoise = fbm(worldX * glassScale * 2, worldY * glassScale * 2, 3, 0.4);
              const fineNoise = fbm(worldX * glassScale * 4, worldY * glassScale * 4, 2, 0.3);
              
              // Combine noises to create glass internal structure
              const combinedNoise = bubbleNoise * 0.5 + stressNoise * 0.3 + fineNoise * 0.2;
              
              // Create bubble-like impurities (small bright spots)
              const bubbleThreshold = 0.7;
              const isBubble = bubbleNoise > bubbleThreshold;
              
              // Create stress lines (darker linear features)
              const stressThreshold = 0.6;
              const isStress = Math.abs(stressNoise) > stressThreshold;
              
              // Base color from chip
              const baseR = parseInt(color.slice(1, 3), 16);
              const baseG = parseInt(color.slice(3, 5), 16);
              const baseB = parseInt(color.slice(5, 7), 16);
              
              let r = baseR, g = baseG, b = baseB, a = 255;
              
              if (isBubble) {
                // Bubbles - brighter, more transparent
                const bubbleIntensity = (bubbleNoise - bubbleThreshold) / (1 - bubbleThreshold);
                const lightening = 1 + bubbleIntensity * 0.4;
                r = Math.min(255, Math.floor(baseR * lightening));
                g = Math.min(255, Math.floor(baseG * lightening));
                b = Math.min(255, Math.floor(baseB * lightening));
                a = Math.floor(180 + bubbleIntensity * 50); // More transparent
              } else if (isStress) {
                // Stress patterns - darker, denser
                const stressIntensity = (Math.abs(stressNoise) - stressThreshold) / (1 - stressThreshold);
                const darkening = 1 - stressIntensity * 0.3;
                r = Math.floor(baseR * darkening);
                g = Math.floor(baseG * darkening);
                b = Math.floor(baseB * darkening);
                a = Math.floor(200 + stressIntensity * 40); // Slightly more opaque
              } else {
                // Base glass with subtle variation
                const variation = combinedNoise * 0.1;
                const lightening = 1 + variation;
                r = Math.max(0, Math.min(255, Math.floor(baseR * lightening)));
                g = Math.max(0, Math.min(255, Math.floor(baseG * lightening)));
                b = Math.max(0, Math.min(255, Math.floor(baseB * lightening)));
                a = Math.floor(190 + Math.abs(variation) * 30);
              }
              
              glassData[idx] = r;
              glassData[idx + 1] = g;
              glassData[idx + 2] = b;
              glassData[idx + 3] = a;
            }
          }

          // Apply the internal texture
          glassCtx.putImageData(glassImageData, 0, 0);
          ctx.globalCompositeOperation = "source-atop";
          ctx.drawImage(glassCanvas, x - glassSize / 2, y - glassSize / 2);
          ctx.globalCompositeOperation = "source-over";

          // Step 3: Add depth simulation with inner shadow/border
          const borderGradient = ctx.createRadialGradient(x, y, size * 0.3, x, y, size * 1.2);
          borderGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
          borderGradient.addColorStop(0.7, "rgba(0, 0, 0, 0)");
          borderGradient.addColorStop(0.9, "rgba(0, 0, 0, 0.15)");
          borderGradient.addColorStop(1, "rgba(0, 0, 0, 0.25)");
          
          ctx.fillStyle = borderGradient;
          ctx.fillRect(x - size * 1.2, y - size * 1.2, size * 2.4, size * 2.4);

          // Step 4: Simulated refraction with distorted reflections
          const refractionCount = 2 + Math.floor(Math.random() * 3); // 2-4 refraction areas
          for (let r = 0; r < refractionCount; r++) {
            const refractX = x + (Math.random() - 0.5) * size * 1.6;
            const refractY = y + (Math.random() - 0.5) * size * 1.6;
            const refractSize = size * (0.2 + Math.random() * 0.4);
            
            // Create curved refraction zones
            const refractGradient = ctx.createRadialGradient(
              refractX, refractY, 0,
              refractX, refractY, refractSize
            );
            
            const refractIntensity = 0.1 + Math.random() * 0.15;
            refractGradient.addColorStop(0, `rgba(255, 255, 255, ${refractIntensity})`);
            refractGradient.addColorStop(0.4, `rgba(255, 255, 255, ${refractIntensity * 0.7})`);
            refractGradient.addColorStop(0.8, `rgba(255, 255, 255, ${refractIntensity * 0.3})`);
            refractGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            
            ctx.fillStyle = refractGradient;
            ctx.fillRect(x - size * 1.2, y - size * 1.2, size * 2.4, size * 2.4);
          }

          // Step 5: Sharp crystalline highlights (like light hitting glass edges)
          const edgeHighlights = 3 + Math.floor(Math.random() * 4); // 3-6 edge highlights
          for (let h = 0; h < edgeHighlights; h++) {
            const highlightAngle = Math.random() * Math.PI * 2;
            const highlightDistance = size * (0.6 + Math.random() * 0.6);
            const highlightX = x + Math.cos(highlightAngle) * highlightDistance;
            const highlightY = y + Math.sin(highlightAngle) * highlightDistance;
            
            // Create sharp, linear highlights
            const highlightLength = size * (0.3 + Math.random() * 0.5);
            const highlightWidth = 1 + Math.random() * 2;
            const perpAngle = highlightAngle + Math.PI / 2;
            
            const highlightGradient = ctx.createLinearGradient(
              highlightX + Math.cos(perpAngle) * highlightWidth,
              highlightY + Math.sin(perpAngle) * highlightWidth,
              highlightX - Math.cos(perpAngle) * highlightWidth,
              highlightY - Math.sin(perpAngle) * highlightWidth
            );
            
            const highlightIntensity = 0.6 + Math.random() * 0.4;
            highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            highlightGradient.addColorStop(0.5, `rgba(255, 255, 255, ${highlightIntensity})`);
            highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            
            ctx.save();
            ctx.translate(highlightX, highlightY);
            ctx.rotate(highlightAngle);
            ctx.fillStyle = highlightGradient;
            ctx.fillRect(-highlightLength / 2, -highlightWidth, highlightLength, highlightWidth * 2);
            ctx.restore();
          }

          // Step 6: Overall glass surface reflection
          const surfaceAngle = Math.random() * Math.PI * 2;
          const surfaceGradient = ctx.createLinearGradient(
            x + Math.cos(surfaceAngle) * size * 0.8,
            y + Math.sin(surfaceAngle) * size * 0.8,
            x - Math.cos(surfaceAngle) * size * 0.8,
            y - Math.sin(surfaceAngle) * size * 0.8
          );
          
          const surfaceOpacity = 0.08 + Math.random() * 0.12;
          surfaceGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
          surfaceGradient.addColorStop(0.3, `rgba(255, 255, 255, ${surfaceOpacity})`);
          surfaceGradient.addColorStop(0.7, `rgba(255, 255, 255, ${surfaceOpacity * 0.5})`);
          surfaceGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          
          ctx.fillStyle = surfaceGradient;
          ctx.fillRect(x - size * 1.2, y - size * 1.2, size * 2.4, size * 2.4);

          ctx.restore();
          break;
      }
    },
    [settings.material, adjustColor],
  );

  // Generate chips with improved density calculation
  const generateChips = useCallback(
    (width: number, height: number) => {
      // Use custom colors if palette is "custom", otherwise use predefined palette
      const palette = settings.palette === "custom" 
        ? { name: "Custom", colors: settings.customColors, backgroundColor: settings.backgroundColor }
        : COLOR_PALETTES[settings.palette as keyof typeof COLOR_PALETTES];

      // Much improved density calculation with higher baseline
      const area = width * height;
      const averageChipSize = settings.chipSize;
      const baseChipArea = Math.PI * averageChipSize ** 2;

      // Better density calculation: starts denser, scales more dramatically
      const minDensityFactor = 0.3; // Minimum 30% coverage even at lowest setting
      const maxDensityFactor = 2.0; // Maximum coverage at highest setting
      const normalizedDensity = settings.density / 100; // 0 to 1

      // Use a square root curve for more natural feeling density changes
      const densityFactor =
        minDensityFactor +
        (maxDensityFactor - minDensityFactor) *
          Math.sqrt(normalizedDensity);

      // Calculate target chip count
      const targetChipCount = Math.floor(
        (area * densityFactor) / (baseChipArea * 3.5),
      );

      const placedChips: PlacedChip[] = [];

      // Try to place chips up to target count
      let attempts = 0;
      const maxTotalAttempts = targetChipCount * 15;

      while (
        placedChips.length < targetChipCount &&
        attempts < maxTotalAttempts
      ) {
        attempts++;

        // Calculate size variation based on sizeVariation setting (0-100)
        const normalizedVariation =
          settings.sizeVariation / 100; // 0 to 1

        let size;
        if (normalizedVariation <= 0.1) {
          // Very uniform sizes (0-10%)
          const minVariation = 0.85;
          const maxVariation = 1.15;
          size =
            settings.chipSize *
            (minVariation +
              Math.random() * (maxVariation - minVariation));
        } else if (normalizedVariation <= 0.3) {
          // Slight variation (10-30%)
          const minVariation = 0.7;
          const maxVariation = 1.3;
          size =
            settings.chipSize *
            (minVariation +
              Math.random() * (maxVariation - minVariation));
        } else if (normalizedVariation <= 0.7) {
          // Moderate variation (30-70%) - standard terrazzo
          const minVariation = 0.5;
          const maxVariation = 1.8;
          size =
            settings.chipSize *
            (minVariation +
              Math.random() * (maxVariation - minVariation));
        } else {
          // Dramatic variation (70-100%) - big difference between sizes
          // Create distinct size categories with weighted probability
          const sizeCategory = Math.random();

          if (sizeCategory < 0.15) {
            // Extra large chips (15% chance)
            size =
              settings.chipSize * (2.5 + Math.random() * 2.0); // 2.5x to 4.5x base size
          } else if (sizeCategory < 0.35) {
            // Large chips (20% chance)
            size =
              settings.chipSize * (1.8 + Math.random() * 0.7); // 1.8x to 2.5x base size
          } else if (sizeCategory < 0.65) {
            // Medium chips (30% chance)
            size =
              settings.chipSize * (0.8 + Math.random() * 0.8); // 0.8x to 1.6x base size
          } else {
            // Small chips (35% chance)
            size =
              settings.chipSize * (0.2 + Math.random() * 0.5); // 0.2x to 0.7x base size
          }
        }

        const color =
          palette.colors[
            Math.floor(Math.random() * palette.colors.length)
          ];

        const position = findValidPosition(
          placedChips,
          width,
          height,
          size,
        );

        if (position) {
          const chip: PlacedChip = {
            x: position.x,
            y: position.y,
            size,
            color,
          };

          placedChips.push(chip);
        }
      }

      return placedChips;
    },
    [settings, findValidPosition],
  );

  // Generate terrazzo pattern
  const generatePattern = useCallback(
    (
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Clear and fill background
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Add enhanced organic background noise
      if (settings.backgroundNoise > 0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Generate a more varied and organic noise pattern
        for (let i = 0; i < data.length; i += 4) {
          const pixelX = (i / 4) % width;
          const pixelY = Math.floor(i / 4 / width);

          // Use multiple noise frequencies for more complex texture
          const scale1 = 0.005; // Large scale variation
          const scale2 = 0.02; // Medium scale variation
          const scale3 = 0.08; // Fine detail variation

          // Generate multi-octave noise using our existing noise functions
          const noise1 =
            fbm(pixelX * scale1, pixelY * scale1, 3, 0.5) *
            settings.backgroundNoise *
            0.6;
          const noise2 =
            fbm(pixelX * scale2, pixelY * scale2, 4, 0.4) *
            settings.backgroundNoise *
            0.3;
          const noise3 =
            fbm(pixelX * scale3, pixelY * scale3, 2, 0.6) *
            settings.backgroundNoise *
            0.15;

          // Add some randomness for texture variation
          const randomNoise =
            (Math.random() - 0.5) *
            settings.backgroundNoise *
            0.08;

          // Create domain warping for more organic appearance
          const warpedCoords = domainWarp(
            pixelX,
            pixelY,
            0.003,
          );
          const warpNoise =
            fbm(
              warpedCoords.x * 0.01,
              warpedCoords.y * 0.01,
              3,
              0.5,
            ) *
            settings.backgroundNoise *
            0.2;

          // Combine all noise sources
          const baseNoise =
            noise1 + noise2 + noise3 + randomNoise + warpNoise;

          // Apply slightly different noise to each color channel for more natural variation
          const rNoise =
            baseNoise +
            (Math.random() - 0.5) *
              settings.backgroundNoise *
              0.05;
          const gNoise =
            baseNoise +
            (Math.random() - 0.5) *
              settings.backgroundNoise *
              0.05;
          const bNoise =
            baseNoise +
            (Math.random() - 0.5) *
              settings.backgroundNoise *
              0.05;

          // Apply noise with proper clamping
          data[i] = Math.max(
            0,
            Math.min(255, data[i] + rNoise),
          );
          data[i + 1] = Math.max(
            0,
            Math.min(255, data[i + 1] + gNoise),
          );
          data[i + 2] = Math.max(
            0,
            Math.min(255, data[i + 2] + bNoise),
          );
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // Generate chips with collision detection
      const chips = generateChips(width, height);

      // Render each chip
      chips.forEach((chip) => {
        // Create chip path
        const chipPath = generateChipPath(
          chip.x,
          chip.y,
          chip.size,
        );

        // Apply material effect
        applyMaterialEffect(ctx, chip, chipPath);

        // Add chip noise texture - properly clipped to chip shape only
        if (settings.chipNoise > 0) {
          addNoiseToPath(
            ctx,
            chipPath,
            chip.x,
            chip.y,
            chip.size,
            settings.chipNoise,
          );
        }
      });
    },
    [
      settings,
      generateChipPath,
      generateChips,
      addNoiseToPath,
      applyMaterialEffect,
    ],
  );

  // Update preview canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    generatePattern(canvas, 800, 800);
  }, [generatePattern]);

  // Download functions
  const downloadPattern = useCallback(
    (format: "png" | "jpg" | "svg") => {
      if (format === "svg") {
        // Generate SVG
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute(
          "width",
          settings.downloadWidth.toString(),
        );
        svg.setAttribute(
          "height",
          settings.downloadHeight.toString(),
        );

        // Background
        const bg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        bg.setAttribute("width", "100%");
        bg.setAttribute("height", "100%");
        bg.setAttribute("fill", settings.backgroundColor);
        svg.appendChild(bg);

        // Generate chips for SVG with collision detection
        const chips = generateChips(
          settings.downloadWidth,
          settings.downloadHeight,
        );

        chips.forEach((chip) => {
          const pathData = generateSVGPathData(
            chip.x,
            chip.y,
            chip.size,
          );
          const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path.setAttribute("d", pathData);
          path.setAttribute("fill", chip.color);

          // Add material effects for SVG
          if (settings.material === "glass") {
            const opacity = 0.7 + Math.random() * 0.2;
            path.setAttribute(
              "fill-opacity",
              opacity.toString(),
            );
          }

          svg.appendChild(path);
        });

        // Download SVG
        const svgData = new XMLSerializer().serializeToString(
          svg,
        );
        const blob = new Blob([svgData], {
          type: "image/svg+xml",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `terrazzo-pattern.svg`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Generate high-res canvas for PNG/JPG
        const downloadCanvas = downloadCanvasRef.current;
        if (!downloadCanvas) return;

        generatePattern(
          downloadCanvas,
          settings.downloadWidth,
          settings.downloadHeight,
        );

        const mimeType =
          format === "png" ? "image/png" : "image/jpeg";
        downloadCanvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `terrazzo-pattern.${format}`;
              a.click();
              URL.revokeObjectURL(url);
            }
          },
          mimeType,
          0.9,
        );
      }
    },
    [
      settings,
      generatePattern,
      generateChips,
      generateSVGPathData,
    ],
  );

  const updateSetting = <K extends keyof TerrazzoSettings>(
    key: K,
    value: TerrazzoSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));

    // Update debounced palette when palette setting changes from other sources
    if (key === "palette") {
      setDebouncedPalette(value as string);
    }
  };

  const setPresetSize = (width: number, height: number) => {
    updateSetting("downloadWidth", width);
    updateSetting("downloadHeight", height);
    setInputDimensions({ width, height }); // Update input values too
    setCustomSize(false);
  };

  const handleDimensionChange = (
    dimension: "width" | "height",
    value: string,
  ) => {
    const numValue =
      parseInt(value) || (dimension === "width" ? 1200 : 1200);
    setInputDimensions((prev) => ({
      ...prev,
      [dimension]: numValue,
    }));
  };

  const handleSliderChange = (
    key: keyof typeof sliderValues,
    value: number,
  ) => {
    setSliderValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Custom color management functions
  const addCustomColor = () => {
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    updateSetting("customColors", [...settings.customColors, newColor]);
  };

  const removeCustomColor = (index: number) => {
    const newColors = settings.customColors.filter((_, i) => i !== index);
    updateSetting("customColors", newColors);
  };

  const updateCustomColor = (index: number, color: string) => {
    const newColors = [...settings.customColors];
    newColors[index] = color;
    updateSetting("customColors", newColors);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-0 border-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Preview */}
        <div className="lg:col-span-3">
          <Card className="border-0 p-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <canvas
                ref={canvasRef}
                className="rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Pattern Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Pattern Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="chip-size">Chip Size</Label>
                <Slider
                  id="chip-size"
                  min={5}
                  max={50}
                  step={1}
                  value={[sliderValues.chipSize]}
                  onValueChange={(value) =>
                    handleSliderChange("chipSize", value[0])
                  }
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {sliderValues.chipSize}px
                </div>
              </div>

              <div>
                <Label htmlFor="density">Density</Label>
                <Slider
                  id="density"
                  min={10}
                  max={95}
                  step={5}
                  value={[sliderValues.density]}
                  onValueChange={(value) =>
                    handleSliderChange("density", value[0])
                  }
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {sliderValues.density}%
                </div>
              </div>

              <div>
                <Label htmlFor="size-variation">
                  Size Variation
                </Label>
                <Slider
                  id="size-variation"
                  min={0}
                  max={100}
                  step={10}
                  value={[sliderValues.sizeVariation]}
                  onValueChange={(value) =>
                    handleSliderChange(
                      "sizeVariation",
                      value[0],
                    )
                  }
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1 flex justify-between">
                  <span>Uniform</span>
                  <span>Big Difference</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={debouncedPalette}
                onValueChange={(value) =>
                  setDebouncedPalette(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COLOR_PALETTES).map(
                    ([key, palette]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {palette.colors
                              .slice(0, 4)
                              .map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full border border-gray-300"
                                  style={{
                                    backgroundColor: color,
                                  }}
                                />
                              ))}
                          </div>
                          {palette.name}
                        </div>
                      </SelectItem>
                    ),
                  )}
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2 p-1 rounded-md bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50">
                      <div className="flex items-center gap-1">
                        <Paintbrush className="w-3.5 h-3.5 text-purple-600" />
                        <div className="flex gap-1">
                          {settings.customColors
                            .slice(0, 4)
                            .map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200"
                                style={{
                                  backgroundColor: color,
                                }}
                              />
                            ))}
                        </div>
                      </div>
                      <span className="font-semibold text-purple-700">Custom Colors</span>
                      <div className="ml-auto">
                        <div className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {settings.customColors.length}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Custom Color Management */}
              {debouncedPalette === "custom" && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Custom Colors</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addCustomColor}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {settings.customColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => updateCustomColor(index, e.target.value)}
                          className="w-12 h-8 p-1 border rounded"
                        />
                        <Input
                          value={color}
                          onChange={(e) => updateCustomColor(index, e.target.value)}
                          className="flex-1 h-8"
                          placeholder="#000000"
                        />
                        {settings.customColors.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCustomColor(index)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {settings.customColors.length} color{settings.customColors.length !== 1 ? 's' : ''} in palette
                  </div>
                </div>
              )}

              {/* Background Color */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="bg-color">Background Color</Label>
                  {debouncedPalette !== "custom" && (
                    <div className="text-xs text-muted-foreground">Theme matched</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={settings.backgroundColor}
                    onChange={(e) =>
                      updateSetting(
                        "backgroundColor",
                        e.target.value,
                      )
                    }
                    className="w-16 h-10 p-1 border"
                  />
                  <Input
                    value={settings.backgroundColor}
                    onChange={(e) =>
                      updateSetting(
                        "backgroundColor",
                        e.target.value,
                      )
                    }
                    className="flex-1"
                    placeholder="#FFFFFF"
                  />
                </div>
                {debouncedPalette !== "custom" && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Automatically matched to {COLOR_PALETTES[debouncedPalette as keyof typeof COLOR_PALETTES]?.name} theme
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Material & Texture */}
          <Card>
            <CardHeader>
              <CardTitle>Material & Texture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="material">Material</Label>
                <Select
                  value={settings.material}
                  onValueChange={(value) =>
                    updateSetting("material", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="marble">
                      Marble
                    </SelectItem>
                    <SelectItem value="granite">
                      Granite
                    </SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bg-noise">
                  Background Texture
                </Label>
                <Slider
                  id="bg-noise"
                  min={0}
                  max={50}
                  step={5}
                  value={[sliderValues.backgroundNoise]}
                  onValueChange={(value) =>
                    handleSliderChange(
                      "backgroundNoise",
                      value[0],
                    )
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="chip-noise">Chip Texture</Label>
                <Slider
                  id="chip-noise"
                  min={0}
                  max={100}
                  step={10}
                  value={[sliderValues.chipNoise]}
                  onValueChange={(value) =>
                    handleSliderChange("chipNoise", value[0])
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="shape-style">Shape Style</Label>
                <Slider
                  id="shape-style"
                  min={0}
                  max={100}
                  step={10}
                  value={[sliderValues.shapeStyle]}
                  onValueChange={(value) =>
                    handleSliderChange("shapeStyle", value[0])
                  }
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1 flex justify-between">
                  <span>Angular</span>
                  <span>Rounded</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Size Presets</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPresetSize(1024, 1024)}
                  >
                    1024×1024
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPresetSize(2048, 2048)}
                  >
                    2048×2048
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPresetSize(1920, 1080)}
                  >
                    1920×1080
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCustomSize(true)}
                  >
                    Custom
                  </Button>
                </div>
              </div>

              {customSize && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={inputDimensions.width}
                      onChange={(e) =>
                        handleDimensionChange(
                          "width",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      value={inputDimensions.height}
                      onChange={(e) =>
                        handleDimensionChange(
                          "height",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                Current: {settings.downloadWidth} ×{" "}
                {settings.downloadHeight}px
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => downloadPattern("png")}
                  size="sm"
                  className="transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95"
                >
                  PNG
                </Button>
                <Button
                  onClick={() => downloadPattern("jpg")}
                  size="sm"
                  className="transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95"
                >
                  JPG
                </Button>
                <Button
                  onClick={() => downloadPattern("svg")}
                  size="sm"
                  className="transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95"
                >
                  SVG
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden canvas for high-res downloads */}
      <canvas
        ref={downloadCanvasRef}
        style={{ display: "none" }}
      />
    </div>
  );
}