import type { OutputOptions } from "../types.js";
import { getCategory, getAllCategories } from "../data/schema.js";
import { renderCategorySummary, renderCategoryDetail } from "../formatters/terminal.js";
import { categoriesToJson, categoryToJson } from "../formatters/json.js";

export function handleSchema(categoryCode: string | undefined, opts: OutputOptions): void {
  if (categoryCode) {
    const cat = getCategory(categoryCode);
    if (!cat) {
      console.error(
        `Unknown category: "${categoryCode}". Valid codes: ${getAllCategories().map((c) => c.code).join(", ")}`,
      );
      process.exit(1);
    }
    if (opts.json) {
      console.log(categoryToJson(cat));
    } else {
      console.log(renderCategoryDetail(cat));
    }
  } else {
    const cats = getAllCategories();
    if (opts.json) {
      console.log(categoriesToJson(cats));
    } else {
      console.log(renderCategorySummary(cats));
    }
  }
}
