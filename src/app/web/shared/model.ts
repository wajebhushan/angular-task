export interface GridColumn {
    column_key: string;
    column_name: string;
    type: string;
    align: string;
  }
  
  export interface TeamTag {
    value: string;
    text_color: string;
    background_color: string;
  }
  
  export interface GridRow {
    id: string;
    name: { first_name: string; last_name: string; handle: string };
    status: string;
    email: string;
    role: string;
    license_used: number;
    teams: TeamTag[];
    selected?: boolean;
  }
  