import framework from 'framework'
import config from 'config'
import select from 'dom-select'
import classes from 'dom-classes'
import { on, off } from 'dom-event'
import biggie from '@utils/biggie'



class App {

  constructor(opt = {}) {

    this.init()
  }

  init() {

    framework.init()
  }


}

module.exports = App
