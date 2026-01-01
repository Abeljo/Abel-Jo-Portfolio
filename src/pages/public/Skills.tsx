import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/skills';
import type { Skill } from '../../types';
import { Code, Palette } from 'lucide-react';

type Role = 'graphics' | 'software';

const Skills: React.FC = () => {
    const [skills] = useState<Skill[]>(skillsData);
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role>('software');

    useEffect(() => {
        let filtered = skills.filter(s => s.category === selectedRole);

        // Sort: featured skills first, then others
        filtered = filtered.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });

        setFilteredSkills(filtered);
    }, [skills, selectedRole]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Technical Skills</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    My technical expertise and the tools I use to build digital products.
                </p>
            </motion.div>

            {/* Category Toggle Switch */}
            <div className="flex justify-center mb-12">
                <div className="bg-card border border-border rounded-2xl p-1.5 md:p-2 inline-flex gap-2">
                    <motion.button
                        onClick={() => setSelectedRole('software')}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${selectedRole === 'software'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Code size={18} className="md:w-5 md:h-5" />
                        <span>Software Development</span>
                    </motion.button>
                    <motion.button
                        onClick={() => setSelectedRole('graphics')}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${selectedRole === 'graphics'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Palette size={18} className="md:w-5 md:h-5" />
                        <span>Graphics Design</span>
                    </motion.button>
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 auto-rows-[80px] grid-flow-dense">
                {filteredSkills.map((skill, index) => {
                    // Tetris-like shapes: different spans for different cards
                    // Optimized to fill gaps better
                    const shapes = [
                        { col: 'col-span-1', row: 'row-span-1' }, // Small square
                        { col: 'col-span-2', row: 'row-span-1' }, // Horizontal bar
                        { col: 'col-span-1', row: 'row-span-2' }, // Vertical bar
                        { col: 'col-span-2', row: 'row-span-2' }, // Large square
                        { col: 'col-span-1', row: 'row-span-1' }, // Small square
                        { col: 'col-span-2', row: 'row-span-1' }, // Horizontal bar
                        { col: 'col-span-1', row: 'row-span-1' }, // Small square
                        { col: 'col-span-1', row: 'row-span-2' }, // Vertical bar
                        { col: 'col-span-2', row: 'row-span-1' }, // Horizontal bar
                        { col: 'col-span-1', row: 'row-span-1' }, // Small square
                        { col: 'col-span-2', row: 'row-span-2' }, // Large square
                        { col: 'col-span-1', row: 'row-span-1' }, // Small square
                        { col: 'col-span-2', row: 'row-span-1' }, // Horizontal bar
                        { col: 'col-span-1', row: 'row-span-1' }, // Small square
                    ];

                    const shape = shapes[index % shapes.length];
                    // Featured skills get larger shapes
                    const finalShape = skill.featured
                        ? { col: 'col-span-2', row: 'row-span-2' }
                        : shape;

                    return (
                        <motion.div
                            key={skill.ID}
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                            className={`${finalShape.col} ${finalShape.row} bg-card rounded-xl p-3 transition-all duration-300 relative overflow-hidden group ${skill.featured
                                    ? 'border-2 border-yellow-400 hover:border-yellow-300 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/30 ring-2 ring-yellow-400/20'
                                    : 'border-2 border-emerald-500 hover:border-emerald-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30'
                                }`}
                        >
                            {/* Shining effect overlay */}
                            {skill.featured ? (
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer bg-[length:200%_100%] pointer-events-none" />
                            ) : (
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer bg-[length:200%_100%] pointer-events-none" />
                            )}

                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <div className="flex flex-col items-center text-center gap-1">
                                    {skill.icon && (
                                        <div className="text-xl md:text-2xl">{skill.icon}</div>
                                    )}
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-xs md:text-sm font-bold leading-tight">{skill.name}</h3>
                                        {skill.featured && (
                                            <span className="text-[10px] text-yellow-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Skills;

