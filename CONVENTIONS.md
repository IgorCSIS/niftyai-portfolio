# Repository conventions

## Stack

Astro 4 (static) + Tailwind 3 + TypeScript 5, deployed to GitHub Pages. No UI framework,
no client framework. Client JavaScript is hand-written and lives in `src/scripts/`.

## Editing the site

All page copy lives in `src/data/site.ts`. Components in `src/components/` are renderers
over that file; change copy there, not in markup. Design tokens are in
`tailwind.config.mjs`, and reusable surface/button/type styles are in
`src/styles/global.css`.

Prices appear in exactly one place (`src/data/site.ts`) and are read by both the visible
copy and the JSON-LD in `src/layouts/Layout.astro`, so the two cannot drift apart.

## Copy rules

Plain, confident, concrete. No em dashes anywhere in user-facing copy. No invented
testimonials, client names, logos, or revenue figures. Results stated qualitatively until
real numbers exist.

## Python conventions

There is no Python in this repository today. Any Python added later follows Appendix A,
*Python's Best Practices* (CYBERSECURITY & AI WITH PYTHON ZBOOK, A. Nuzen), strictly:

1. **PEP 8 naming.** `lower_case_with_underscores` for variables and class variables,
   `ALL_CAPS_WITH_UNDERSCORES` for constants shared by all instances, a single leading
   underscore (`_name`) for internals. Never shadow a built-in (`list`, `str`, `id`).
2. **Multi-line docstrings on every module, class, and function**, documenting
   `Parameters:`, `Raises:`, and `Returns:`. `pdoc` is the preferred doc generator.
3. **Gradual typing throughout.** Annotate parameters and return types
   (`def f(x: int) -> str:`), variables (`count: int = 0`), and data structures
   (`list[int]`, `dict[str, int]`, `tuple[float, float]`). Constants use
   `typing.Final`.
4. **Encapsulation via properties.** Private attributes (`self._make`) exposed through
   `@property` getters and `@<attr>.setter` setters, not direct attribute access.
5. **Every class defines `__str__`**, returning a readable representation of the instance.
6. **Every runnable script guards its entry point** with `if __name__ == '__main__':`
   calling `main()`, so the module can be imported without executing anything.
