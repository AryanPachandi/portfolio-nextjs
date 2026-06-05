import { FaJsSquare, FaNodeJs, FaGitAlt, FaReact, FaDocker, FaNpm, FaJava, FaAws, FaGithub, FaCloud, FaAngular } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiKubernetes,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiMoonrepo,
  SiTurborepo,
  SiLinux,
  SiTailwindcss
} from "react-icons/si";

export default function Skills() {
  const techStack = [
    { Icon: FaJsSquare, name: "JavaScript", color: "text-yellow-500" },
    { Icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
    { Icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { Icon: FaGitAlt, name: "Git", color: "text-orange-500" },
    { Icon: FaReact, name: "React", color: "text-blue-400" },
    { Icon: FaAngular, name: "Angular", color: "text-red-500" },
    { Icon: FaDocker, name: "Docker", color: "text-blue-500" },
    { Icon: FaNpm, name: "NPM", color: "text-red-600" },
    { Icon: FaJava, name: "Java", color: "text-red-500" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-400" },
    { Icon: FaAws, name: "AWS", color: "text-orange-400" },
    { Icon: FaCloud, name: "Cloud", color: "text-blue-400" },
    { Icon: FaGithub, name: "GitHub", color: "text-black" },
    { Icon: SiKubernetes, name: "Kubernetes", color: "text-blue-500" },
    { Icon: SiNextdotjs, name: "Next.js", color: "text-black" },
    { Icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
    { Icon: SiMysql, name: "MySQL", color: "text-blue-600" },
    { Icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-500" },
    { Icon: SiMoonrepo, name: "Monorepo", color: "text-purple-400" },
    { Icon: SiTurborepo, name: "Turborepo", color: "text-red-500" },
    { Icon: SiLinux, name: "Linux", color: "text-yellow-400" }
  ];

  return (
    <div className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 font-serif-display">
            Technologies I Work With
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </div>

        {/* Introductory Text */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg text-black-300 leading-relaxed max-w-3xl mx-auto font-serif-display">
            I specialize in creating modern, scalable web applications using a variety of technologies. Here's a snapshot of the tools I use:
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {techStack.map(({ Icon, name, color }, index) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${color} mb-3 transition-transform group-hover:scale-110`} />
              <span className="text-black font-medium text-sm sm:text-base text-center">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}