"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import {
  SiUnrealengine,
  SiPython,
  SiTensorflow,
  SiRos,
  SiOpencv,
  SiNvidia,
  SiJupyter,
  SiPytorch,
  SiArduino,
  SiCplusplus,
} from "react-icons/si";

const technologies = [
  {
    icon: SiUnrealengine,
    name: "Unreal",
    href: "https://www.unrealengine.com/",
  },
  {
    icon: SiPython,
    name: "Python",
    href: "https://www.python.org/",
  },
  {
    icon: SiTensorflow,
    name: "TensorFlow",
    href: "https://www.tensorflow.org/",
  },
  {
    icon: SiPytorch,
    name: "PyTorch",
    href: "https://pytorch.org/",
  },
  {
    icon: SiRos,
    name: "ROS",
    href: "https://www.ros.org/",
  },
  {
    icon: SiOpencv,
    name: "OpenCV",
    href: "https://opencv.org/",
  },
  {
    icon: SiNvidia,
    name: "CUDA",
    href: "https://developer.nvidia.com/cuda-toolkit",
  },
  {
    icon: SiJupyter,
    name: "Jupyter",
    href: "https://jupyter.org/",
  },
  {
    icon: SiArduino,
    name: "Arduino",
    href: "https://www.arduino.cc/",
  },
  {
    icon: SiCplusplus,
    name: "C++",
    href: "https://isocpp.org/",
  },
];

export function TechSlider() {
  return (
    <div className="relative mb-8 w-full overflow-hidden py-10 lg:py-24">
      <InfiniteSlider duration={120} durationOnHover={240}>
        {technologies.map(
          ({ icon: Icon, name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center px-8",
                "text-muted-foreground/60 hover:text-foreground",
                "transition-colors duration-200",
              )}
            >
              <Icon className="h-8 w-8" />
              <span className="z-1000 absolute scale-0 rounded-md bg-background/80 px-3 py-1 text-xs shadow-sm backdrop-blur-sm transition-transform group-hover:scale-100">
                {name}
              </span>
            </a>
          ),
        )}
      </InfiniteSlider>
    </div>
  );
}
