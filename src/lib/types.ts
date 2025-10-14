export interface Profile {
  name: string;
  imageUrl: string;
  nativePlace?: string;
  business?: string;
  officeAddress?: string;
  residenceAddress?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  familyMembers: FamilyMember[];
}

export interface FamilyMember {
  name: string;
  relation: string;
}
