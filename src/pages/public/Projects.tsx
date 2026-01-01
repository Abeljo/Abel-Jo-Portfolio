import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/projects';
import type { Project } from '../../types';
import { Github, ExternalLink, Palette, Code, ChevronLeft, ChevronRight } from 'lucide-react';

type Role = 'graphics' | 'software';

// Separate component for project card to use hooks properly
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const projectImages = project.images && project.images.length > 0
        ? project.images
        : [project.image_url];
    const hasMultipleImages = projectImages.length > 1;

    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && hasMultipleImages) {
            nextImage();
        }
        if (isRightSwipe && hasMultipleImages) {
            prevImage();
        }
    };

    // Check if this is Addis Teqeray (featured project)
    const isFeatured = project.title === 'Addis Teqeray';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group bg-card rounded-3xl overflow-hidden transition-all duration-500 ${isFeatured
                ? 'border-2 border-yellow-400 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-400/20 ring-2 ring-yellow-400/20'
                : 'border border-border hover:shadow-2xl hover:shadow-emerald-500/10'
                }`}
        >
            {/* Image Container with Swipe */}
            <div
                className="relative aspect-video overflow-hidden bg-muted"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <AnimatePresence mode="wait">
                    <div key={currentImageIndex} className="relative w-full h-full">
                        {/* Blurred Background */}
                        <motion.img
                            src={projectImages[currentImageIndex]}
                            alt=""
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 select-none"
                            draggable={false}
                            aria-hidden="true"
                        />
                        {/* Full Image on Top */}
                        <motion.img
                            src={projectImages[currentImageIndex]}
                            alt={`${project.title} - Image ${currentImageIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 w-full h-full object-contain select-none"
                            draggable={false}
                        />
                    </div>
                </AnimatePresence>

                {/* Navigation Arrows - Only show if multiple images */}
                {hasMultipleImages && (
                    <>
                        <motion.button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronRight size={20} />
                        </motion.button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            {projectImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                        ? 'w-8 bg-emerald-500'
                                        : 'w-2 bg-white/50 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                    <div className="flex gap-3">
                        {project.github_link && (
                            <motion.a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github size={20} />
                            </motion.a>
                        )}
                        {project.demo_link && (
                            <motion.a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={20} />
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-emerald-500 transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags &&
                        project.tags.split(',').map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full font-medium shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300"
                            >
                                {tag.trim()}
                            </span>
                        ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects: React.FC = () => {
    const [projects] = useState<Project[]>(projectsData);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role>('software');

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4;

    useEffect(() => {
        // Filter by category field only
        const filtered = projects.filter(p => p.category === selectedRole);
        setFilteredProjects(filtered);
        setCurrentPage(1); // Reset page when category changes
    }, [projects, selectedRole]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Selected Work</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    A collection of projects that showcase my passion for design and engineering.
                </p>
            </motion.div>

            {/* Role Toggle Switch */}
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

            {/* Projects Grid - E-commerce Style Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${selectedRole}-${currentPage}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    {paginatedProjects.map((project, index) => (
                        <ProjectCard key={project.ID} project={project} index={index} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <motion.button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${currentPage === 1
                            ? 'text-muted-foreground opacity-50 cursor-not-allowed'
                            : 'bg-secondary hover:bg-emerald-500 hover:text-white'
                            }`}
                        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                    >
                        Previous
                    </motion.button>
                    <span className="text-muted-foreground font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <motion.button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${currentPage === totalPages
                            ? 'text-muted-foreground opacity-50 cursor-not-allowed'
                            : 'bg-secondary hover:bg-emerald-500 hover:text-white'
                            }`}
                        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                    >
                        Next
                    </motion.button>
                </div>
            )}

            {/* Empty State / Graphics Intro Card */}
            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    {selectedRole === 'graphics' ? (
                        <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-2xl shadow-emerald-500/10">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                                <Palette size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Graphics Design Portfolio</h3>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                I am graphics designer for the past <span className="text-emerald-500 font-bold">4 years</span> at <span className="font-medium text-foreground">Soccer Ethiopia</span>.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                            <p className="text-muted-foreground">
                                Try selecting a different category or role
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Projects;
