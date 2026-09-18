import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #eb510e, #213d83, #eb510e)", // pre-configured with brand colors
      gradientAnimationDuration = 4, // slowed down for a smoother premium feel
      hoverEffect = true,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const textVariants: Variants = {
      initial: {
        backgroundPosition: "0 0",
      },
      animate: {
        backgroundPosition: "200% 0", // adjusted to 200% for smooth brand loop
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          ease: "linear", // linear flow makes gradient scroll smoothly
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex justify-center items-center py-2", className)}
        {...props}
      >
        <motion.span
          className={cn("text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-normal font-sans font-bold tracking-tight", textClassName)}
          style={{
            background: gradientColors,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: isHovered ? "0 0 15px rgba(235,81,14,0.15)" : "none",
            display: "inline-block",
          }}
          variants={textVariants}
          initial="initial"
          animate="animate"
          onHoverStart={() => hoverEffect && setIsHovered(true)}
          onHoverEnd={() => hoverEffect && setIsHovered(false)}
        >
          {text}
        </motion.span>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
