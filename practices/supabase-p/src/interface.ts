interface Data {
  provider: string;
  url: string | null;
}
interface Error {
  message: string | null;
}

interface AuthResponse {
  data: Data;
  error: Error;
}

interface Instrument {
  id: string;
  name: string;
}
export type { Data, Error, AuthResponse, Instrument };