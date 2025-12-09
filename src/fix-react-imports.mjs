import fs from "fs";
import path from "path";

const root = "./src";

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.lstatSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
      let text = fs.readFileSync(full, "utf8");

      // Remove "import React ..."
      text = text.replace(/^import React[^\n]*\n/gm, "");

      fs.writeFileSync(full, text, "utf8");
      console.log("Fixed:", full);
    }
  }
}

walk(root);
