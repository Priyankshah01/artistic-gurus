import Image from 'next/image';
import Link from 'next/link';
import projects from '../data/featuredProjects';

const ProjectShowcase = () => {
  if (!projects || projects.length === 0) {
    return (
      <section className="text-white py-16 px-4 sm:px-16">
        <h2 className="text-4xl sm:text-6xl font-medium mb-6 text-center">
          Turning Vision into Voltage
        </h2>
        <p className="text-red-400">No projects found</p>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-black to-purple-900 text-white py-20 px-6 sm:px-16 font-inter translate-y-10 animate-fade-in">
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium mb-6 mt-1 text-center text-white/80">
        Turning Vision into<br />
        <span className='bg-gradient-to-t from-purple to-purple-500 bg-clip-text text-transparent'>
          Voltage
        </span>      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col no-underline text-current transition-transform duration-300 hover:scale-[1.01] justify-between"
          >
            <div className="relative w-full h-[60vh] rounded-lg overflow-hidden shadow-2xl">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title || 'Project image'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-102"
                />
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className='w-full justify-between'>
                <div className="text-sm text-gray-400 flex justify-between mb-3">
                  <span>{project.category || 'Project'}</span>
                  <span>{project.year || ''}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium mt-2 flex items-center w-full">
                  {project.title || 'Untitled Project'}
                </h3>
                <p className='text-sm sm:text-base font-small mt-2 flex items-center w-full text-white/80'>
                  {project.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;