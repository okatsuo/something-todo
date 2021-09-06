export interface IHashComparer {
  compare: (value: string, hashed_value: string) => Promise<boolean>
}
