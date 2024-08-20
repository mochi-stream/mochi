import { useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { CharacterFragment } from "@/graphql/types";

import { ArrowDown, ArrowUp } from "lucide-react";
import CustomImage from "@/components/ui/custom-image";

interface CharacterListProps {
  quantity?: number;
  list: CharacterFragment;
}

export function CharacterList({ list, quantity }: CharacterListProps) {
  quantity = quantity || list.edges?.length || 5;

  const [isExpanded, setIsExpanded] = useState(false);
  const displayedList = isExpanded
    ? list.edges
    : list.edges?.slice(0, quantity);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-4 select-none relative">
        {list.edges && list.edges.length > quantity && !isExpanded && (
          <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#201717] via-transparent to-transparent pointer-events-none z-[81]"></div>
        )}
        {displayedList &&
          displayedList.map((character, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer group"
            >
              <CustomImage
                index={index}
                src={character?.node?.image?.large || "/default.png"}
                alt={character?.node?.name?.userPreferred || "No Title"}
                width={640}
                height={600}
                className="w-full h-full rounded-lg transition-opacity object-cover opacity-80 group-hover:opacity-100"
              />

              <div className="absolute bottom-0 w-full p-4 z-50 font-aeonik">
                <h2 className="font-medium text-md lg:w-[80%] leading-5 text-primary/80">
                  {(character?.node?.name?.userPreferred || "No Title").length >
                  40
                    ? (
                        character?.node?.name?.userPreferred || "No Title"
                      ).slice(0, 37) + "..."
                    : character?.node?.name?.userPreferred || "No Title"}
                </h2>
                <p className="text-[12px] mt-1 text-primary/70">
                  {character?.role
                    ? character?.role.charAt(0) +
                      character?.role.slice(1).toLowerCase()
                    : "Unknown"}
                </p>
              </div>
              {/* Render the anime gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-10% from-black via-[transparent] to-transparent opacity-70 rounded-lg pointer-events-none"></div>
            </div>
          ))}
      </div>
      {list.edges && list.edges.length > quantity && (
        <div className="flex justify-center mt-4 w-full">
          <Button
            onClick={toggleExpanded}
            variant={"secondary"}
            className="flex items-center"
          >
            <span>{isExpanded ? "Show Less" : "Show More"}</span>
            {isExpanded ? (
              <ArrowUp className="ml-1 h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>
      )}
    </>
  );
}
