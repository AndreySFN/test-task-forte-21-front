import { ReactNode } from 'react'

export interface IModalElement {
  key?: string
  subtitle: string
  value: string | ReactNode
}

export class ModalElement implements IModalElement {
  constructor(
    public readonly subtitle: string,
    public readonly value: string,
    public readonly key?: string,
  ) {}
}
