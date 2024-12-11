import fs from "fs";

export async function load_secrets(filename) {
    const data = await fs.promises.readFile(filename, "utf-8");
    return JSON.parse(data);
}
