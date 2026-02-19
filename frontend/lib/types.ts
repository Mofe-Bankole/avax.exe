import { StaticImageData } from "next/image";

export type LeaderboardRowProps = {
    rank: number;
    name: string;
    mmr: string;
    wr: string;
    highlight?: boolean;
    imageUrl : StaticImageData;
};
  

export type StatPillProps = {
    label: string;
    value: string;
    caption: string;
  };

export type FeatureCardProps = {
    title: string;
    accent: string;
    description: string;
    children?: React.ReactNode;
};
  