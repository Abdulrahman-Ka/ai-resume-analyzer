import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";
import { cn } from "~/lib/utils";

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategoryData {
  score: number;
  tips: Tip[];
}

interface Feedback {
  toneAndStyle: CategoryData;
  content: CategoryData;
  structure: CategoryData;
  skills: CategoryData;
}

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const bgColor =
    score > 69 ? "bg-green-100" : score > 39 ? "bg-yellow-100" : "bg-red-100";
  const textColor =
    score > 69
      ? "text-green-800"
      : score > 39
        ? "text-yellow-800"
        : "text-red-800";
  const icon = score > 69 ? "✓" : score > 39 ? "!" : "✗";

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        bgColor,
        textColor
      )}
    >
      <span className="mr-1">{icon}</span>
      {score}/100
    </div>
  );
};

const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({
  title,
  categoryScore,
}) => (
  <div className="flex justify-between items-center w-full">
    <h3 className="text-lg font-medium">{title}</h3>
    <ScoreBadge score={categoryScore} />
  </div>
);

const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {tips.map((tip, index) => (
        <div key={index} className="flex items-start">
          <span
            className={cn(
              "mr-2 mt-1",
              tip.type === "good" ? "text-green-500" : "text-yellow-500"
            )}
          >
            {tip.type === "good" ? "✓" : "!"}
          </span>
          <p>{tip.tip}</p>
        </div>
      ))}
    </div>
    <div className="space-y-2">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={cn(
            "p-3 rounded-lg",
            tip.type === "good"
              ? "bg-green-50 text-green-700"
              : "bg-yellow-50 text-yellow-700"
          )}
        >
          <p>{tip.explanation}</p>
        </div>
      ))}
    </div>
  </div>
);

const Details: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  return (
    <Accordion className="w-full">
      <AccordionItem id="toneAndStyle">
        <AccordionHeader itemId="toneAndStyle">
          <CategoryHeader
            title="Tone & Style"
            categoryScore={feedback.toneAndStyle.score}
          />
        </AccordionHeader>
        <AccordionContent itemId="toneAndStyle">
          <CategoryContent tips={feedback.toneAndStyle.tips} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem id="content">
        <AccordionHeader itemId="content">
          <CategoryHeader
            title="Content"
            categoryScore={feedback.content.score}
          />
        </AccordionHeader>
        <AccordionContent itemId="content">
          <CategoryContent tips={feedback.content.tips} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem id="structure">
        <AccordionHeader itemId="structure">
          <CategoryHeader
            title="Structure"
            categoryScore={feedback.structure.score}
          />
        </AccordionHeader>
        <AccordionContent itemId="structure">
          <CategoryContent tips={feedback.structure.tips} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem id="skills">
        <AccordionHeader itemId="skills">
          <CategoryHeader
            title="Skills"
            categoryScore={feedback.skills.score}
          />
        </AccordionHeader>
        <AccordionContent itemId="skills">
          <CategoryContent tips={feedback.skills.tips} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Details;
