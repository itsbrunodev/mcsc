import jsZIP from "jszip";
import { IProjectBuilds } from "../../../../types";

export async function POST(request: Request) {
  const zip = new jsZIP();

  const body: {
    version: string;
    players: number;
    minRam: number;
    maxRam: number;
  } = await request.json();

  const properties = `#Minecraft server properties
enable-jmx-monitoring=false
rcon.port=25575
level-seed=
gamemode=survival
enable-command-block=false
enable-query=false
generator-settings={}
enforce-secure-profile=true
level-name=world
motd=A Minecraft Server
query.port=25565
pvp=true
generate-structures=true
max-chained-neighbor-updates=1000000
difficulty=easy
network-compression-threshold=256
max-tick-time=60000
require-resource-pack=false
use-native-transport=true
max-players=${body.players}
online-mode=true
enable-status=true
allow-flight=false
initial-disabled-packs=
broadcast-rcon-to-ops=true
view-distance=10
server-ip=
resource-pack-prompt=
allow-nether=true
server-port=25565
enable-rcon=false
sync-chunk-writes=true
op-permission-level=4
prevent-proxy-connections=false
hide-online-players=false
resource-pack=
entity-broadcast-range-percentage=100
simulation-distance=10
rcon.password=
player-idle-timeout=0
debug=false
force-gamemode=false
rate-limit=0
hardcore=false
white-list=false
broadcast-console-to-ops=true
spawn-npcs=true
spawn-animals=true
function-permission-level=2
initial-enabled-packs=vanilla
level-type=minecraft\:normal
text-filtering-config=
spawn-monsters=true
enforce-whitelist=false
spawn-protection=16
resource-pack-sha1=
max-world-size=29999984
`;

  /* get the latest build number from the server version */
  const url = `https://api.papermc.io/v2/projects/paper/versions/${body.version}`;
  const latestBuildFetch = await fetch(url);
  const latestBuildFetchBody = (await latestBuildFetch.json()) as
    | IProjectBuilds
    | undefined;
  if (!latestBuildFetchBody) return;
  const latestBuild = latestBuildFetchBody.builds.reduce((a, b) => {
    return b > a ? b : a;
  });

  /* download the server jar */
  const serverJar = await fetch(
    `https://api.papermc.io/v2/projects/paper/versions/${body.version}/builds/${latestBuild}/downloads/paper-${body.version}-${latestBuild}.jar`
  ).then((x) => x.arrayBuffer());
  zip.file("server.jar", Buffer.from(serverJar));

  zip.file("eula.txt", Buffer.from("eula=true", "utf-8"));
  zip.file("server.properties", Buffer.from(properties, "utf-8"));

  /* for windows users */
  zip.file(
    "start.bat",
    Buffer.from(
      `@echo off
set FLAGS=-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Daikars.new.flags=true -Dusing.aikars.flags=https://mcflags.emc.gs

echo Starting server...
java -Xmx${body.maxRam}M -Xms${body.minRam}M %FLAGS% -jar server.jar --nogui`,
      "utf-8"
    )
  );

  /* for other users */
  zip.file(
    "start.sh",
    Buffer.from(
      `#!/bin/bash

FLAGS="-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Daikars.new.flags=true -Dusing.aikars.flags=https://mcflags.emc.gs"

echo "Starting server..."
java -Xmx${body.maxRam} -Xms${body.minRam} \${FLAGS} -jar server.jar --nogui`,
      "utf-8"
    )
  );

  const buffer = await zip.generateAsync({ type: "nodebuffer" });

  const response = new Response(buffer);

  response.headers.set("Content-Type", "application/zip");
  response.headers.set(
    "Content-Disposition",
    "attachment; filename=server.zip"
  );

  return response;
}
