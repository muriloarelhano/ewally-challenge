import Redis from 'redis'
import { TicketRepository } from './repositories/TicketRepository'

export default {
  repository: {
    ticket: new TicketRepository(),
  },
  cache: Redis,
}
