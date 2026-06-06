import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as Star } from "../_libs/lucide-react.mjs";
function StarRating({ value, size = 16 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", "aria-label": `التقييم ${value} من 5`, children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      style: { width: size, height: size },
      className: i <= Math.round(value) ? "fill-gold text-gold" : "fill-muted text-muted"
    },
    i
  )) });
}
export {
  StarRating as S
};
