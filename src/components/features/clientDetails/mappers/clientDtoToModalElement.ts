import { ClientDto } from 'test-task-forte-21-api-adapter'
import {
  IModalElement,
  ModalElement,
} from '../../../organisms/customModel/types/ModalElement.ts' // замените на корректный путь

export const clientDtoToModalElements = (
  client?: ClientDto | null,
): IModalElement[] => {
  if (!client) return []
  const modalElements = [
    new ModalElement('Name', client.name, `${client._id}-name`), // TODO: Вынести хардкод
    new ModalElement('Company', client.company, `${client._id}-company`),
  ]
  if (client?.details) {
    const { details } = client
    if (details.about) {
      modalElements.push(
        new ModalElement('about', details.about, `${client._id}-about`),
      )
    }
    if (details.phoneNumber) {
      modalElements.push(
        new ModalElement(
          'Phone number',
          details.phoneNumber,
          `${client._id}-phone`,
        ),
      )
    }
    if (details.contact) {
      modalElements.push(
        new ModalElement('Contacts', details.contact, `${client._id}-contact`),
      )
    }
  }
  return modalElements
}
