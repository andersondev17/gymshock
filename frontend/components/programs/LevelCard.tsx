"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { PROGRAM_LEVELS } from "@/constants/programs";
import { CheckCircle2, Info } from "lucide-react";
import { useState } from "react";

interface LevelCardProps {
    levelKey: keyof typeof PROGRAM_LEVELS;
    level: typeof PROGRAM_LEVELS[keyof typeof PROGRAM_LEVELS];
    isSelected: boolean;
    onSelect: (level: keyof typeof PROGRAM_LEVELS) => void;
}

export default function LevelCard({ levelKey, level, isSelected, onSelect }: LevelCardProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <div
                className={` cursor-pointer rounded-lg border-2 transition-all duration-300 hover:shadow-md relative
                    ${isSelected
                        ? "border-red-500 bg-red-50 ring-2 ring-red-200"
                        : "border-gray-200 hover:border-gray-300"
                    }
        `}
                onClick={() => onSelect(levelKey)}
            >
                <div className="p-6 space-y-4">
                    <div className={`bg-gradient-to-r ${level.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mx-auto text-2xl md:text-3xl`}>
                        {level.icon}
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{level.label}</h3>
                        <p className="text-xs md:text-sm text-gray-600 mt-2">{level.description}</p>
                    </div>

                    {/* Botón para abrir Drawer */}
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // evitar que active onSelect
                                setDrawerOpen(true);
                            }}
                            className="flex items-center gap-1"
                            aria-label={`Más información sobre ${level.label}`}
                        >
                            <Info className="w-4 h-4" /> Info
                        </Button>
                    </div>
                </div>
            </div>

            {/* Drawer para mostrar features */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className="md:text-center md:flex md:flex-col md:items-center">
                    <DrawerHeader>
                        <DrawerTitle>{level.label} - Características</DrawerTitle>
                        <DrawerDescription>
                            Detalles y beneficios del nivel {level.label}.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-6 space-y-4 ">
                        <ul className="space-y-2">
                            {level.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full">
                                Cerrar
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
