export interface Root {
    tafel: Tafel
  }
  
  export interface Tafel {
    misc: Misc
    content: Content[]
  }
  
  export interface Misc {
    header: string
    gelbeLeiste: GelbeLeiste
    unterschrift: string
    links: Link[]
  }
  
  export interface GelbeLeiste {
    col1: string
    col2: string
    col3: string
  }
  
  export interface Link {
    link: Link2
  }
  
  export interface Link2 {
    to: string
    title: string
  }
  
  export interface Content {
    eintrag: Eintrag
  }
  
  export interface Eintrag {
    col1: Col1
    col2: string
    col3: Link2
  }
  
  export interface Col1 {
    zeit: string
    zugnummer: string
  }