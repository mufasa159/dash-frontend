import { getTopTracks } from "../../components/CardSpotify/lib/spotify";

interface TopTracks {
  album: {
    album_type: string,
    artists: [
      {
        external_urls: {
          spotify: URL
        },
        href: URL,
        id: string,
        name: string,
        type: string,
        uri: string
      }
    ],
    external_urls: {
      spotify: URL
    },
    href: URL,
    id: string,
    images: [
      {
        height: number,
        url: URL,
        width: number,
      },
      {
        height: number,
        url: URL,
        width: number,
      },
      {
        height: number,
        url: URL,
        width: number,        
      }
    ],
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string
  },
  artists: [
    {
      external_urls: {
        spotify: URL
      },
      href: URL,
      id: string,
      name: string,
      type: string,
      uri: string,
    }
  ],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: {
    isrc: string
  },
  external_urls: {
    spotify: URL
  },
  href: URL,
  id: string,
  is_local: boolean,
  is_playable: boolean,
  name: string,
  popularity: number,
  preview_url: URL,
  track_number: number,
  type: string,
  uri: string,
}

export default async (_, res:any) => {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items.slice(0, 4).map((track: TopTracks) => ({
    artist: track.artists.map((artist) => artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    imageUrl: track.album.images[2].url,
    previewUrl: track.preview_url
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
  res.setHeader('Connection', 'Upgrade')
  
  return res.status(200).json({ tracks })
}