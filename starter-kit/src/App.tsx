import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Newspaper, CheckCircle, Clock, Briefcase } from 'lucide-react';

function App() {
  const [time, setTime] = React.useState(new Date());
/*位置情報取得 */
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  {/* 持ち物がチェックされたか */ }
  const [items, setItems] = useState([{ checked: false }, { checked: false }, { checked: false }]);

  {/* 持ち物がクリックされたときの関数 */ }
  const toggleCheck = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };
  {/*天気のアイコンを表示*/ }
  /*const weather = "Sunny";
  const weather = "Cloudy"*/
  const weather = "Rainy"
  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <div className='flex justify-center mb-4'>
          {weather === "Sunny" && (
            <Sun
              size={120}
              className='text-yellow-400'
            />
          )}
          {weather === "Cloudy" && (
            <Cloud
              size={120}
              className="text-gray-400"
            />
          )}

          {weather === "Rainy" && (
            <CloudRain
              size={120}
              className="text-blue-500"
            />
          )}
        </div>

        <h1 className="text-3xl font-bold text-slate-800">Good Morning!</h1>
        <p className="text-slate-500 flex items-center gap-2">
          <Clock size={18} />
          {time.toLocaleTimeString()}
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Sun className="text-amber-500" /> Weather
            </h2>
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold mb-1">24°C</div>
            <p className="text-slate-500">Sunny Day</p>
          </div>
        </section>

        {/* 持ち物リスト */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Briefcase className="text-lime-500" /> Packing List
            </h2>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <li key={i} className="flex flex-col items-center">
                {/* 丸いアイコン */}
                <button
                  onClick={() => toggleCheck(i)}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden shadow transition-all duration-200 
                    ${item.checked
                      ? "bg-green-100 ring-4 ring-green-500"
                      : "bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shadow">
                    <img src={"/images/umbrella.png"} alt={""} className="w-12 h-12 object-contain" />
                  </div>
                  {item.checked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                      <span className="text-2xl font-bold text-green-700">
                        ✓
                      </span>
                    </div>
                  )}
                </button>
                {/* アイテム名 */}
                <p className="mt-2 text-sm text-slate-700 text-center">
                  傘
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* News Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Newspaper className="text-blue-500" /> Top Stories
            </h2>
          </div>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0">
                Loading some interesting news...
              </li>
            ))}
          </ul>
        </section>

        {/* Tasks Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <CheckCircle className="text-emerald-500" /> Today's Focus
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" />
              <span>Drink 1 glass of water</span>
            </label>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; 2026 Morning Dashboard Workshop - Built with React
      </footer>
    </div>
  );
}

export default App;
