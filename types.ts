
export type MaintenanceType = 'MECANICA' | 'ELETRICA' | 'LUBRIFICACAO' | 'SOLDA' | 'OUTROS';

export interface Employee {
  id: string;
  name: string;
  matricula: string;
  function: string;
}

export interface User {
  id: string;
  name: string;
  matricula: string;
  tel: string;
  function: string;
  login: string;
  password: string;
}

export interface RegisteredART {
  id: string;
  number: string;
  name: string;
  fileUrl?: string; // Simulated path
  risks: string[]; // Mock risks associated with this ART
}

export interface HeaderData {
  om: string;
  tag: string;
  date: string;
  time: string;
  type: MaintenanceType;
  description: string;
}

export interface SignatureRecord {
    id: string;
    name: string;
    matricula: string; // Added
    function: string;  // Added
    role: string; // 'EXECUTANTE' | 'RESPONSAVEL' | 'TECNICO'
    signatureData: string;
    date: string;
}

export interface DocumentRecord {
  id: string;
  type: 'ART_EMERGENCIAL' | 'ART_ATIVIDADE' | 'CHECKLIST' | 'RELATORIO';
  header: HeaderData;
  createdAt: string;
  status: 'ATIVO' | 'LIXEIRA' | 'RASCUNHO';
  content: any; // Flexible payload depending on type
  signatures: SignatureRecord[];
}

// Updated to match the user's specific table model
export interface ScheduleItem {
  id: string;
  frotaOm: string;          // FROTA/OM
  description: string;      // DESCRIÇÃO DA ATIVIDADE
  resources: string;        // RECURSOS
  dateMin: string;          // DATA MIN
  dateMax: string;          // DATA MAX
  priority: string;         // PRIORIDADE
  peopleCount: number;      // N DE PESSOAS
  hours: number;            // H
  dateStart: string;        // DATA INICIO
  dateEnd: string;          // DATA FIM
  workCenter: string;       // CENTRO DE TRABALHO
  timeStart: string;        // HORA INICIO
  timeEnd: string;          // HORA FIM
  status: string;           // Internal status
}

export interface ActiveMaintenance {
  id: string;
  header: HeaderData;
  startTime: string; // ISO string
  artId: string; // Link to the specific ART document
  artType: 'ART_EMERGENCIAL' | 'ART_ATIVIDADE';
  origin: 'PREVENTIVA' | 'CORRETIVA'; // Determines Card Color (Yellow vs Red)
}

export interface MaintenanceLog {
  id: string;
  om: string;
  tag: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string; // Formatted string HH:MM:SS
  responsible: string; // Name of the first person who signed the ART
  status: string; // 'FINALIZADO' | 'PARCIAL'
}
