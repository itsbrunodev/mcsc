import { IProject } from "../../../../types";

export async function GET(request: Request) {
  const response = await fetch("https://api.papermc.io/v2/projects/paper");
  const body = (await response.json()) as IProject | undefined;
  return new Response(JSON.stringify(body ? body.versions.reverse() : []));
}
