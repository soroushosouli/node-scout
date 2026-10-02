import os from "node:os"
import fs from "node:fs"

const MACOS = {
    18: "macOS 10.14 Mojave",
    19: "macOS 10.15 Catalina",
    20: "macOS 11 Big Sur",
    21: "macOS 12 Monterey",
    22: "macOS 13 Ventura",
    23: "macOS 14 Sonoma",
    24: "macOS 15 Sequoia",
    25: "macOS 26 Tahoe",
}

const UNIX = {
    freebsd: "FreeBSD",
    openbsd: "OpenBSD",
    sunos:   "SunOS",
    aix:     "AIX",
}

export function getPlatform() {
    const platform = os.platform()
    const release  = os.release()

    // Windows
    if (platform === "win32") {
        const [major, minor, build] = release.split(".").map(Number)
        if (major === 6) return { 1: "Windows 7", 2: "Windows 8", 3: "Windows 8.1" }[minor] ?? `Windows (NT ${release})`
        if (major === 10) return build >= 22000 ? "Windows 11" : "Windows 10"
        return `Windows (NT ${release})`
    }

    // macOS
    if (platform === "darwin") {
        const major = Number(release.split(".")[0])
        return MACOS[major] ?? `macOS (Darwin ${major})`
    }

    // Linux
    if (platform === "linux") {
        try {
            const match = fs.readFile("/etc/os-release", "utf8").match(/^PRETTY_NAME="?(.+?)"?$/m)
            return match?.[1] ?? `Linux ${release}`
        } catch {
            return `Linux ${release}`
        }
    }

    // Other Unix
    if (platform in UNIX) return `${UNIX[platform]} ${release}`

    return `${platform} ${release}`
}