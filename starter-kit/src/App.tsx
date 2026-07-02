import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Newspaper, CheckCircle, Clock, Briefcase } from 'lucide-react';

function App() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  {/*現在値の仮置き。東京に設定中*/}
  const [latitude, setLatitude] = useState("35.41");
  const [longitude, setLongitude] = useState("139.45");

  {/*天気予報の取得*/}
  type Weather = "Sunny" | "Cloudy" | "Rainy";

  const [weather, setWeather] = useState<Weather | null>(null);
  const [precipitationProbability, setPrecipitationProbability] = useState<number | null>(null);
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);

  // 天気予報の振り分け
  const classifyWeather = (code: number): "Sunny" | "Cloudy" | "Rainy" => {
    const sunny = [0, 1];
    const cloudy = [2, 3, 45, 48];
    const rainy = [
      51, 53, 55, //霧雨
      61, 63, 65, //雨
      80, 81, 82, //にわか雨
      95          //雷雨
    ];
    if (sunny.includes(code)) return "Sunny";
    if (cloudy.includes(code)) return "Cloudy";
    if (rainy.includes(code)) return "Rainy";

    return "Cloudy"; //その他は暫定で曇り表示
  };

  useEffect(() => {
    // if (latitude === "???" || longitude === "???") return;

    const fetchWeather = async () => {
      // 現在の気温、一日の天気、最大降水確率、最大uv指数を得る
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,precipitation_probability_max,uv_index_max&current=temperature_2m&timezone=Asia%2FTokyo&forecast_days=1`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const code = data.daily.weather_code[0];
        setWeather(classifyWeather(code));

        setPrecipitationProbability(data.daily.precipitation_probability_max[0]);

        setUvIndex(data.daily.uv_index_max[0]);

        setCurrentTemperature(data.current.temperature_2m);

      } catch (err) {
        console.error("天気取得エラー", err);
      }
    };
    
    fetchWeather();
  }, [latitude, longitude]);


  {/*天気による持ち物の提案*/}

  // const precipitationProbability = 70;
  // const uvIndex = 8;

  const recommendedItems: {
    name: string;
    image: string;
    checked: boolean;
  }[]=[];

  if (precipitationProbability >= 50 && precipitationProbability < 80){
    recommendedItems.push({
      name: "折り畳み傘",
      image: "/images/foldingUmbrella.png",
      checked: false,
    });
  }

  if (precipitationProbability >= 80){
    recommendedItems.push({
      name: "傘",
      image: "/images/umbrella.png",
      checked: false,
    });
  }

  if(uvIndex >= 3 && uvIndex <6){
    recommendedItems.push({
      name: "帽子",
      image: "/images/cap.png",
      checked: false,
    });
  }

   if(uvIndex >= 6 && uvIndex < 8){
    recommendedItems.push({
      name: "日傘",
      image: "/images/parasol.png",
      checked: false,
    });
  }

   if(uvIndex >= 8){
    recommendedItems.push({
      name: "日焼け止め",
      image: "/images/sunscreen.png",
      checked: false,
    });
  }

  console.log(recommendedItems);
  // setItems(recommendedItems);

  {/* 持ち物がチェックされたか */}
  const [items, setItems] = useState(recommendedItems);


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
  // const weather = "Rainy"
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

        <h1 className="text-3xl font-bold text-slate-800">{new Date().getHours() < 12 ? "Good Morning" 
    : new Date().getHours() < 17 ? "Good Afternoon" 
    : new Date().getHours() < 21 ? "Good Evening" 
    : "Good Night"}!</h1>

    <p className="text-slate-600 mt-1">
  {new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  })}
</p>

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
            <div className="text-4xl font-bold mb-1"><span>{currentTemperature}</span>°C</div>
            <p className="text-slate-500"><span>{weather}</span> Day</p>
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

                    <img 
                      src= {item.image}
                      alt= {item.name}
                      className="w-12 h-12 object-contain"/>

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
                  {item.name}
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
