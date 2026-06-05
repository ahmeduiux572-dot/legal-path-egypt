import type { ReactNode } from "react";

export function SwipeRow<T>({
  items,
  render,
  cols = 3,
  getKey,
}: {
  items: T[];
  render: (item: T) => ReactNode;
  cols?: 3 | 4;
  getKey: (item: T, index: number) => string;
}) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div
      className={`hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0 ${grid}`}
    >
      {items.map((item, i) => (
        <div key={getKey(item, i)} className="w-[80%] shrink-0 snap-center md:w-auto md:shrink">
          {render(item)}
        </div>
      ))}
    </div>
  );
}