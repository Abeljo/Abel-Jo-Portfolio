import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../../data/achievements';
import type { Achievement } from '../../types';
import { Award, Calendar } from 'lucide-react';

const Achievements: React.FC = () => {
    const achievements = achievementsData;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Achievements</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Recognition and milestones from my professional journey.
                </p>
            </motion.div>

            <div className={`grid grid-cols-1 ${achievements.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'} gap-8`}>
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={achievement.ID}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border-2 border-emerald-500 rounded-3xl p-8 flex gap-6 hover:border-emerald-400 transition-colors group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 relative overflow-hidden"
                    >
                        {/* Shining border effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer bg-[length:200%_100%]" />
                        
                        <div className="relative z-10 flex-shrink-0">
                            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <Award size={32} />
                            </div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Calendar size={16} className="mr-2" />
                                {new Date(achievement.date).toLocaleDateString()}
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
