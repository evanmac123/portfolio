export default (req, id) => {

  const path = id.split('/')
  const model = {}

 else if ( path.length = 2) {

    model['template'] = req.params.id ? 'work' : id
    model['data'] = req.params.id ? window._data.work[req.params.id] : window._data
  }


  return model
}
