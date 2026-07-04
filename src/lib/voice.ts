const voiceFiles = import.meta.glob('../assets/voice/*.{wav,mp3,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const voiceMap = new Map<string, string>()
for (const [path, url] of Object.entries(voiceFiles)) {
  const id = path.split('/').pop()?.replace(/\.(wav|mp3|ogg)$/, '')
  if (id) voiceMap.set(id, url)
}

export function getVoiceUrl(id: string): string | null {
  return voiceMap.get(id) ?? null
}

export function hasGeneratedVoice(id: string): boolean {
  return voiceMap.has(id)
}
