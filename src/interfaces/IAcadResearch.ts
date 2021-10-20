export interface IAcademicResearch {
  course: string;
  department: string;
  description: string;
  email: string;
  isActive: boolean;
  courses: string;
  members: IMembersAcademic[];
  photo: any;
  providerId: string;
  searchArea: string;
  teacher: string;
  title: string;
  uid: string;
}

export interface IMembersAcademic {
  id: string;
  name: string;
  course: string;
  avatar: string;
  email: string;
}
