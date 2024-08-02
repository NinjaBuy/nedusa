import { NotificationService } from "ninja-interfaces"

class TestNotiService extends NotificationService {
  static identifier = "test-not"

  constructor() {
    super()
  }

  async sendNotification() {
    return Promise.resolve()
  }

  async resendNotification() {
    return Promise.resolve()
  }
}

export default TestNotiService
