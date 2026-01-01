import React from 'react';
import { motion } from 'framer-motion';

const TetrisLoader: React.FC = () => {
    // Define block colors
    const colors = [
        'bg-cyan-400',   // I
        'bg-yellow-400', // O
        'bg-purple-500', // T
        'bg-green-500',  // S
        'bg-red-500',    // Z
        'bg-blue-500',   // J
        'bg-orange-500'  // L
    ];

    // Simple block shapes for visual flair
    const blocks = [
        { color: colors[0], delay: 0, x: -60 },
        { color: colors[2], delay: 0.2, x: -20 },
        { color: colors[5], delay: 0.4, x: 20 },
        { color: colors[6], delay: 0.6, x: 60 },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-64 h-64 flex items-end justify-center pb-10">
                {blocks.map((block, index) => (
                    <motion.div
                        key={index}
                        className={`absolute w-8 h-8 ${block.color} border-2 border-black/20 rounded-sm`}
                        initial={{ y: -300, opacity: 0, rotate: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            y: { type: "spring", bounce: 0.2, duration: 0.8, delay: block.delay, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" },
                            opacity: { duration: 0.5, delay: block.delay, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" },
                            rotate: { duration: 0.8, delay: block.delay, repeat: Infinity, repeatDelay: 2, repeatType: "reverse", ease: "easeInOut" }
                        }}
                        style={{ x: block.x }}
                    />
                ))}
                <motion.div
                    className="absolute bottom-0 text-xl font-display font-bold text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    LOADING...
                </motion.div>
            </div>
        </div>
    );
};

export default TetrisLoader;
