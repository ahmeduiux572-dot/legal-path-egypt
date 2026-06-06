import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function SectionHeading({
  title,
  subtitle,
  light = false,
  align = "center"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: align === "center" ? "text-center" : "text-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `text-2xl font-extrabold md:text-3xl ${light ? "text-gold" : "text-gradient-gold"}`, children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${light ? "text-cream/70" : "text-muted-foreground"} ${align === "center" ? "" : "mx-0"}`, children: subtitle })
  ] });
}
export {
  SectionHeading as S
};
