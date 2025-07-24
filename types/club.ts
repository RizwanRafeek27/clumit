export interface Club {
  id: number
  name: string
  description: string
  fullDescription: string
  tags: string[]
  logo: string
  contact: string
  members: number
  established: string
  status: string
  applyLink: string
  category: "technical" | "non-technical"
  recruiting: boolean
  socialMedia: {
    website?: string
    instagram?: string
    linkedin?: string
  }
}

export interface PendingClub {
  id: number
  name: string
  email: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  category: "technical" | "non-technical"
}

export interface User {
  name: string
  type: "superadmin" | "club"
  email: string
  clubData?: Club
}
