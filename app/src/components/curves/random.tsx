"use client";

import { useState, useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { randomCurvePoint, generateRandomParams } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 6,
  trailWidth: 4.5,
  breatheDuration: 5,
};

interface RandomProps extends Partial<CurveAnimatedProps> {
  seed?: number;
}

export function Random({ seed, ...props }: RandomProps) {
  const [currentSeed, setSeed] = useState(seed ?? Math.floor(Math.random() * 999999));

  const d = useMemo(() => {
    const params = generateRandomParams(currentSeed);
    const fn = normalize(randomCurvePoint(params), 480);
    return buildPath(fn, 480, true);
  }, [currentSeed]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}

/** Hook to use in gallery — returns d and a randomize function */
export function useRandomCurve(initialSeed = 42) {
  const [seed, setSeed] = useState(initialSeed);
  const d = useMemo(() => {
    const params = generateRandomParams(seed);
    const fn = normalize(randomCurvePoint(params), 480);
    return buildPath(fn, 480, true);
  }, [seed]);
  const randomize = () => setSeed(Math.floor(Math.random() * 999999));
  return { d, seed, randomize };
}
