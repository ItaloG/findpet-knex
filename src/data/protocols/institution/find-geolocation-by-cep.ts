interface Position {
  lat: string
  lng: string
}

export interface FindGeolocation<T = unknown> {
  find: (arg: T) => Promise<Position>
}
