import { ClientDto } from 'test-task-forte-21-api-adapter'
import {
  IModalElement,
  ModalElement,
} from '../../../organisms/clientDetails/types/ModalElement.ts' // замените на корректный путь

export const clientDtoToModalElements = (
  client?: ClientDto | null,
): IModalElement[] => {
  if (!client) return []
  const modalElements = [
    new ModalElement('Name', client.name),
    new ModalElement('Company', client.company),
  ]
  if (client?.details) {
    const { details } = client
    details.about &&
      modalElements.push(new ModalElement('about', details.about))
    details.phoneNumber &&
      modalElements.push(new ModalElement('Phone number', details.phoneNumber))
    details.contact &&
      modalElements.push(new ModalElement('Contacts', details.contact))
  }
  return modalElements
}
