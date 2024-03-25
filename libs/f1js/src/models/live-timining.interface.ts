export const ENDPOINTS: Endpoints = {
  SESSION_DATA: {
    endpoint: 'SessionData.json',
  },
  SESSION_INFO: {
    endpoint: 'SessionInfo.json',
  },
  CAR_DATA: {
    endpoint: 'CarData.z.jsonStream',
    isStream: true,
    isCompressed: true,
  },
  POSITION: {
    endpoint: 'Position.z.jsonStream',
    isStream: true,
    isCompressed: true,
  },
};

export interface Endpoint {
  endpoint: string;
  isStream?: boolean;
  isCompressed?: boolean;
}

export interface Endpoints {
  [key: string]: Endpoint;
}

export interface Meeting {
  year: number;
  name: string;
  weekendDate: string;
  session: string;
  sessionDate: string;
}

export interface IF1CarData {
  Entries: [
    {
      Utc: string;
      Cars: {
        [car: string]: {
          Channels: {
            [channel: string]: number;
          };
        };
      };
    },
  ];
}

export interface IF1Position {
  Position: [
    {
      Timestamp: string;
      Entries: {
        [car: string]: {
          Status: string;
          X: number;
          Y: number;
          Z: number;
        };
      };
    },
  ];
}
