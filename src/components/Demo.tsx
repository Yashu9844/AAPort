export default function Demo() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Next.js + Bun + Tailwind CSS Demo
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-purple-400 to-blue-500 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-4">🚀 Tech Stack</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Next.js 15 with App Router
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Bun as package manager
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Tailwind CSS v4
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              TypeScript support
            </li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📦 Features</h2>
          <div className="space-y-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-green-800 font-medium">Fast Development</span>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-blue-800 font-medium">Modern Tooling</span>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-purple-800 font-medium">Optimized Bundle</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          Get Started Building! 🎉
        </button>
      </div>
    </div>
  );
}