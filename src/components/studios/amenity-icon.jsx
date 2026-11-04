import {
  AirVent,
  Camera,
  Car,
  DoorOpen,
  Headphones,
  Image,
  KeyboardMusic,
  Layers,
  Lightbulb,
  MicVocal,
  Palette,
  Plug,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Speaker,
  VolumeX,
  Warehouse,
  Waves,
  Wifi,
} from "lucide-react";

const amenityIcons = [
  { words: ["wi-fi", "wifi"], icon: Wifi },
  { words: ["microphone"], icon: MicVocal },
  { words: ["mixer", "console", "audio interface"], icon: SlidersHorizontal },
  { words: ["headphone"], icon: Headphones },
  { words: ["monitor", "amplifier", "pa system"], icon: Speaker },
  { words: ["midi", "keyboard"], icon: KeyboardMusic },
  { words: ["soundproof", "acoustic"], icon: VolumeX },
  { words: ["air conditioning"], icon: AirVent },
  { words: ["lighting", "natural light", "strobe"], icon: Lightbulb },
  { words: ["backdrop", "green screen", "cyclorama"], icon: Image },
  { words: ["camera", "tripod"], icon: Camera },
  { words: ["changing", "makeup", "dressing"], icon: Shirt },
  { words: ["parking", "loading"], icon: Car },
  { words: ["recording booth", "vocal booth"], icon: DoorOpen },
  { words: ["art", "easel"], icon: Palette },
  { words: ["table", "reflector"], icon: Layers },
  { words: ["storage"], icon: Warehouse },
  { words: ["sink"], icon: Waves },
  { words: ["power", "outlet"], icon: Plug },
];

const AmenityIcon = ({ amenity, className }) => {
  const normalizedAmenity = amenity.toLowerCase();
  const match = amenityIcons.find(({ words }) =>
    words.some((word) => normalizedAmenity.includes(word))
  );
  const Icon = match?.icon || Sparkles;

  return <Icon className={className} />;
};

export default AmenityIcon;
