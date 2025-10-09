export default function Temperature() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gradient-to-br dark:from-black dark:to-blue-600 p-4">
      <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl max-w-2xl w-full">
        <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">
          Temperature Comparison
        </h1>
        
        <div className="flex gap-8 justify-center items-start relative">
          {/* Celsius Labels */}
          <div className="flex flex-col items-center relative">
            <div className="font-bold text-lg mb-4 text-gray-800">°C</div>
            <div className="h-[540px] w-16 flex flex-col justify-between">
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">40</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">30</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">20</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">10</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">0</div>
            </div>
          </div>
          
          {/* Single Thermometer */}
          <div className="flex flex-col items-center relative mt-5">
            <div className="w-20 h-[580px] relative border-4 border-gray-800 rounded-[40px] overflow-hidden">
              {/* Continuous color gradient from hot (top) to cold (bottom) */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-600 via-orange-500 via-yellow-400 via-green-400 via-blue-400 to-cyan-300"></div>
              
              {/* Temperature zone indicators */}
              <div className="absolute bottom-0 w-full h-[145px] border-b-2 border-white/50 flex items-center justify-center">
                <div className="text-xs font-bold text-white drop-shadow-lg">COLD</div>
              </div>
              <div className="absolute bottom-[145px] w-full h-[180px] border-b-2 border-white/50 flex items-center justify-center">
                <div className="text-xs font-bold text-white drop-shadow-lg">COOL</div>
              </div>
              <div className="absolute bottom-[325px] w-full h-[101.5px] border-b-2 border-white/50 flex items-center justify-center">
                <div className="text-xs font-bold text-white drop-shadow-lg">WARM</div>
              </div>
              <div className="absolute bottom-[426.5px] w-full h-[153.5px] flex items-center justify-center">
                <div className="text-xs font-bold text-white drop-shadow-lg">EXTREME</div>
              </div>
            </div>
          </div>
          
          {/* Fahrenheit Labels */}
          <div className="flex flex-col items-center relative">
            <div className="font-bold text-lg mb-4 text-gray-800">°F</div>
            <div className="h-[540px] w-16 flex flex-col justify-between">
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">104</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">86</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">68</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">50</div>
              <div className="text-sm text-center font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">32</div>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
}
