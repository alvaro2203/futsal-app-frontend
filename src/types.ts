export interface Player {
  id: number;
  name: string;
  number: number;
}

export interface Action {
  id: number;
  playerId?: number;
  type:
    | 'cambio'
    | 'gol'
    | 'asistencia'
    | 'amarilla'
    | 'roja'
    | 'entra'
    | 'sale';
  timestamp: number;
}

export interface Match {
  id: number;
  opponent: string;
  date: string;
  isOngoing: boolean;
  score: {
    home: number;
    away: number;
  };
  actions: Action[];
}
