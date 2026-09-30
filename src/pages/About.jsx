import React from "react";
import { Flame, Target, Users, Award } from "lucide-react";

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ff0000]/10 text-[#ff0000] text-xs font-black uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5 fill-[#ff0000]" /> Our boAt Odyssey
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-black dark:text-white uppercase tracking-tight">
          Bringing Nirvana To Every Indian Audiophile.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
          Founded by Aman Gupta and Sameer Mehta, boAt has disrupted India's consumer electronics space to emerge as the 5th largest wearable brand globally and #1 in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-red-500/10 text-[#ff0000] rounded-2xl flex items-center justify-center font-black">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black uppercase dark:text-white">boAt Signature Sound</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Acoustics tuned specifically for punchy bass and treble profiles that match Indian music tastes and gaming environments.
          </p>
        </div>

        <div className="bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-red-500/10 text-[#ff0000] rounded-2xl flex items-center justify-center font-black">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black uppercase dark:text-white">30M+ boAtheads</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            From cricket stadiums to college campuses, our tribe represents the unapologetic hustle and swagger of young India.
          </p>
        </div>

        <div className="bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 bg-red-500/10 text-[#ff0000] rounded-2xl flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black uppercase dark:text-white">Proudly Made in India</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Pioneering domestic manufacturing through boAt Labs and manufacturing hubs across the nation.
          </p>
        </div>
      </div>
    </div>
  );
};
