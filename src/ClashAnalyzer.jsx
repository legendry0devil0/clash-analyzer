// FULL, CLEAN, UPDATED CLASH ANALYZER CODE
// ---------------------------------------------------------
// This file contains EVERYTHING you need to copy-paste into:
//   src/ClashAnalyzer.jsx
// ---------------------------------------------------------
// Features included:
// ✔ Full card list
// ✔ Live elixir tracker
// ✔ Card search
// ✔ Filter by elixir cost
// ✔ RoyaleAPI image CDN (no images needed locally)
// ✔ History log
// ✔ Clean UI
// ---------------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';

//---------------------------------------------------------------
// Utility functions
//---------------------------------------------------------------
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const formatElixir = (n) => (Math.round(n * 10) / 10).toFixed(1);
const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

//---------------------------------------------------------------
// Full card list (major CR cards)
//---------------------------------------------------------------
const ALL_CARDS = [
  { name: 'Knight', cost: 3 },
  { name: 'Archers', cost: 3 },
  { name: 'Goblins', cost: 2 },
  { name: 'Spear Goblins', cost: 2 },
  { name: 'Valkyrie', cost: 4 },
  { name: 'Musketeer', cost: 4 },
  { name: 'Wizard', cost: 5 },
  { name: 'Mini P.E.K.K.A', cost: 4 },
  { name: 'P.E.K.K.A', cost: 7 },
  { name: 'Giant', cost: 5 },
  { name: 'Royal Giant', cost: 6 },
  { name: 'Golem', cost: 8 },
  { name: 'Hog Rider', cost: 4 },
  { name: 'Goblin Barrel', cost: 3 },
  { name: 'Skeletons', cost: 1 },
  { name: 'Skeleton Army', cost: 3 },
  { name: 'Minions', cost: 3 },
  { name: 'Minion Horde', cost: 5 },
  { name: 'Bats', cost: 2 },
  { name: 'Ice Spirit', cost: 1 },
  { name: 'Fire Spirits', cost: 2 },
  { name: 'Battle Ram', cost: 4 },
  { name: 'Ram Rider', cost: 5 },
  { name: 'Bandit', cost: 3 },
  { name: 'Night Witch', cost: 4 },
  { name: 'Electro Wizard', cost: 4 },
  { name: 'Lumberjack', cost: 4 },
  { name: 'Mega Minion', cost: 3 },
  { name: 'Baby Dragon', cost: 4 },
  { name: 'Inferno Dragon', cost: 4 },
  { name: 'Balloon', cost: 5 },
  { name: 'Zappies', cost: 4 },
  { name: 'Royal Hogs', cost: 5 },
  { name: 'Elite Barbarians', cost: 6 },
  { name: 'Barbarians', cost: 5 },
  { name: 'Firecracker', cost: 3 },
  { name: 'Magic Archer', cost: 4 },
  { name: 'Fisherman', cost: 3 },
  { name: 'Electro Spirit', cost: 1 },
  { name: 'Skeleton Barrel', cost: 3 },
  { name: 'Royal Recruits', cost: 7 },
  { name: 'Bomb Tower', cost: 4 },
  { name: 'Cannon', cost: 3 },
  { name: 'Tesla', cost: 4 },
  { name: 'Mortar', cost: 4 },
  { name: 'Goblin Cage', cost: 4 },
  { name: 'Inferno Tower', cost: 5 },
  { name: 'Fireball', cost: 4 },
  { name: 'Arrows', cost: 3 },
  { name: 'Zap', cost: 2 },
  { name: 'The Log', cost: 2 },
  { name: 'Poison', cost: 4 },
  { name: 'Rocket', cost: 6 },
  { name: 'Lightning', cost: 6 },
  { name: 'Rage', cost: 2 },
  { name: 'Freeze', cost: 4 },
  { name: 'Earthquake', cost: 3 },
  { name: 'Tornado', cost: 3 },
  { name: 'Clone', cost: 3 },
  { name: 'Mirror', cost: 1 },
  { name: 'Graveyard', cost: 5 },
];

//---------------------------------------------------------------
// Main Component
//---------------------------------------------------------------
export default function ClashAnalyzer() {
  const [enemyElixir, setEnemyElixir] = useState(5.0);
  const [maxElixir, setMaxElixir] = useState(10);
  const [filterElixir, setFilterElixir] = useState(null);
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);

  const regenRef = useRef(null);
  const regenRateSec = 2.8;

  useEffect(() => {
    if (regenRef.current) clearInterval(regenRef.current);
    regenRef.current = setInterval(() => {
      setEnemyElixir((prev) => clamp(prev + 1.0 / regenRateSec, 0, maxElixir));
    }, 1000);
    return () => clearInterval(regenRef.current);
  }, [maxElixir]);

  function handleCardTap(card) {
    setEnemyElixir((e) => clamp(e - card.cost, 0, maxElixir));
    setHistory((h) => [card, ...h].slice(0, 30));
  }

  const filteredCards = ALL_CARDS.filter((c) => {
    if (filterElixir !== null && c.cost !== filterElixir) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Clash Analyzer</h1>

      {/* Elixir Box */}
      <div className="p-3 border rounded-lg mb-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Enemy Elixir:</span>
          <span className="text-3xl font-bold">{formatElixir(enemyElixir)}</span>

          <button className="ml-auto p-2 border rounded" onClick={() => setEnemyElixir(5)}>Reset</button>
        </div>

        <input
          placeholder="Search cards..."
          className="mt-4 p-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-3 flex gap-2 overflow-x-auto">
          {[1,2,3,4,5,6,7,8].map((n) => (
            <button
              key={n}
              className={`p-2 border rounded ${filterElixir === n ? 'bg-gray-300' : ''}`}
              onClick={() => setFilterElixir((f) => (f === n ? null : n))}
            >
              {n}
            </button>
          ))}
          <button className="p-2 border rounded" onClick={() => setFilterElixir(null)}>All</button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="p-3 border rounded-lg mb-4">
        <div className="font-semibold mb-2">Tap a card when enemy plays it</div>

        <div className="grid grid-cols-4 gap-3">
          {filteredCards.map((card, i) => (
            <button
              key={i}
              onClick={() => handleCardTap(card)}
              className="p-2 border rounded flex flex-col items-center"
            >
              <img
                className="w-20 h-20 object-contain mb-1"
                src={`https://royaleapi.github.io/cr-api-assets/cards/${slugify(card.name)}.png`}
                onError={(e) => (e.target.style.opacity = 0.3)}
              />
              <div className="text-sm font-semibold text-center">{card.name}</div>
              <div className="text-xs">{card.cost} elixir</div>
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="p-3 border rounded-lg mb-6">
        <div className="font-semibold mb-2">Recent Plays</div>
        <div className="flex gap-2 overflow-x-auto">
          {history.map((card, i) => (
            <div key={i} className="p-2 border rounded w-24 text-center">
              <img
                className="w-16 h-16 object-contain mx-auto"
                src={`https://royaleapi.github.io/cr-api-assets/cards/${slugify(card.name)}.png`}
                onError={(e) => (e.target.style.opacity = 0.3)}
              />
              <div className="text-xs">{card.name}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
