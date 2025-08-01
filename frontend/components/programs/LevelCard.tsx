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
                className={`cursor-pointer rounded-xl border-2 transition-all duration-300 p-6 space-y-4 ${isSelected
                        ? "border-gymshock-primary-500 bg-gymshock-primary-500/10 backdrop-blur-md"
                        : "border-gymshock-dark-500 bg-gymshock-dark-500/10 backdrop-blur-md hover:border-gymshock-dark-500 hover:bg-gymshock-dark-500/20"
                    }`}
                onClick={() => onSelect(levelKey)}
            >
                <div className="p-6 space-y-4">
                    <div className={`bg-gradient-to-r ${level.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mx-auto text-2xl md:text-3xl`}>
                        {level.icon}
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg font-bold text-white">{level.label}</h3>
                        <p className="text-sm text-gymshock-dark-400 mt-2">{level.description}</p>
                    </div>

                    {/* Botón para abrir Drawer */}
                    <div className="flex justify-center">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // evitar que active onSelect
                                setDrawerOpen(true);
                            }}
                            className="flex items-center gap-1 "
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
                                <li key={index} className="flex items-start gap-2 text-sm text-gymshock-dark-300">
                                    <CheckCircle2 className="h-5 w-5 text-gymshock-primary-500 mt-1 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="secondary" className="bg-transparent border-2 border-gymshock-primary-600 text-gymshock-primary-600 hover:bg-gymshock-primary-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gymshock-primary-300 font-medium px-6 py-4 rounded-xl shadow-lg shadow-gymshock-primary-600/20 w-full transition duration-300 ease-in-out hover:scale-105">
                                Cerrar
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
