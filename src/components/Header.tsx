import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-stone-50 to-gray-100 py-16">
      {/* Terrazzo-inspired background pattern */}
      <div className="absolute inset-0 opacity-60">
        {/* Large organic shapes */}
        <div className="absolute top-8 left-12 w-16 h-12 bg-slate-600/20 rounded-full transform rotate-12"></div>
        <div className="absolute top-20 right-24 w-8 h-8 bg-stone-700/15 transform rotate-45" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
        <div className="absolute top-6 right-1/3 w-12 h-8 bg-gray-500/25 transform -rotate-12" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute top-32 left-1/4 w-6 h-10 bg-slate-800/20 transform rotate-45" style={{ borderRadius: '50% 20% 80% 40% / 30% 60% 40% 70%' }}></div>
        
        {/* Medium shapes */}
        <div className="absolute top-16 left-1/2 w-10 h-6 bg-stone-600/18 transform -rotate-30" style={{ borderRadius: '40% 60% 70% 30% / 50% 80% 20% 50%' }}></div>
        <div className="absolute top-12 right-1/2 w-7 h-7 bg-gray-600/22 rounded-full"></div>
        <div className="absolute top-28 left-1/6 w-5 h-8 bg-slate-700/15 transform rotate-60" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 82% 90%, 18% 90%, 0% 25%)' }}></div>
        <div className="absolute top-36 right-1/6 w-9 h-5 bg-stone-500/20 transform -rotate-15" style={{ borderRadius: '30% 70% 70% 30% / 40% 50% 50% 60%' }}></div>
        
        {/* Small accent pieces */}
        <div className="absolute top-10 left-1/3 w-4 h-4 bg-gray-700/25 transform rotate-12" style={{ borderRadius: '60% 40% 40% 60%' }}></div>
        <div className="absolute top-24 right-1/4 w-3 h-5 bg-slate-600/20 rounded-full transform -rotate-45"></div>
        <div className="absolute top-14 left-2/3 w-5 h-3 bg-stone-700/18 transform rotate-30" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
        <div className="absolute top-30 left-1/5 w-3 h-3 bg-gray-600/22 rounded-full"></div>
        
        {/* Bottom area shapes */}
        <div className="absolute bottom-8 left-20 w-14 h-10 bg-slate-500/15 transform rotate-20" style={{ borderRadius: '70% 30% 60% 40% / 50% 70% 30% 50%' }}></div>
        <div className="absolute bottom-12 right-16 w-8 h-6 bg-stone-600/20 transform -rotate-25" style={{ clipPath: 'polygon(40% 0%, 85% 15%, 100% 70%, 60% 100%, 15% 85%, 0% 30%)' }}></div>
        <div className="absolute bottom-6 left-1/2 w-6 h-9 bg-gray-700/18 transform rotate-35" style={{ borderRadius: '50% 50% 80% 20% / 60% 40% 60% 40%' }}></div>
        <div className="absolute bottom-16 right-1/3 w-4 h-4 bg-slate-800/25 rounded-full"></div>
        
        {/* Very small speckles for texture */}
        <div className="absolute top-18 left-16 w-2 h-2 bg-stone-700/30 rounded-full"></div>
        <div className="absolute top-26 right-20 w-1.5 h-1.5 bg-gray-600/35 rounded-full"></div>
        <div className="absolute top-22 left-3/4 w-2 h-1.5 bg-slate-700/25 transform rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-2 bg-stone-600/30 rounded-full"></div>
        <div className="absolute bottom-14 right-1/4 w-2 h-2 bg-gray-700/20 transform rotate-30" style={{ borderRadius: '50% 70%' }}></div>
        <div className="absolute top-8 left-3/5 w-1 h-1 bg-slate-800/40 rounded-full"></div>
        <div className="absolute top-34 right-1/5 w-1.5 h-1 bg-stone-700/35 transform rotate-60"></div>
        <div className="absolute bottom-10 left-2/3 w-1 h-1.5 bg-gray-600/30 rounded-full"></div>
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(71, 85, 105, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(120, 113, 108, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(75, 85, 99, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 90% 20%, rgba(87, 83, 78, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 60% 40%, rgba(71, 85, 105, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 60px 60px, 35px 35px, 50px 50px, 45px 45px'
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
           
            {/* Small decorative elements around the icon */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-stone-600/40 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gray-700/50 transform rotate-45"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Terrazzo Pattern Maker
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-2">
          Create beautiful, customizable terrazzo patterns for your design projects.
        </p>
        
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Adjust colors, textures, and density to craft the perfect speckled background — completely free to use.
        </p>

        {/* Decorative bottom accent */}
        <div className="mt-8 flex justify-center items-center gap-2 opacity-60">
          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-stone-700 transform rotate-45"></div>
          <div className="w-2.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-1 h-2 bg-slate-700 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-stone-600 transform rotate-45"></div>
        </div>
      </div>
    </header>
  );
}