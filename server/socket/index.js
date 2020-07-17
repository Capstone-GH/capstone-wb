module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    const roomName = getRoomName(socket)
    socket.join(roomName)

    socket.on('joinRoom', id => {
      socket.join(id)
    })

    socket.on('new-line-from-client', (line, roomName) => {
      socket.to(roomName).emit('new-line-from-server', line)
    })

    socket.on('new-code-from-client', (codeEditorData, roomName) => {
      socket.to(roomName).emit('new-code-from-server', codeEditorData)
    })

    socket.on('message-from-client', (message, roomName) => {
      socket
        .to(roomName)
        .emit('message-from-server', {...message, author: 'them'})
    })

    socket.on('new-rect-from-client', (rect, roomName) => {
      socket.to(roomName).emit('new-rect-from-server', rect)
    })

    socket.on('new-circ-from-client', (circ, roomName) => {
      socket.to(roomName).emit('new-circ-from-server', circ)
    })

    socket.on('new-arrow-from-client', (arrow, roomName) => {
      socket.to(roomName).emit('new-arrow-from-server', arrow)
      console.log('new_arrow')
    })

    socket.on('new-updateShape-from-client', (shapesArr, roomName) => {
      socket.to(roomName).emit('new-updateShape-from-server', shapesArr)
      console.log('new_shapesArr')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

function getRoomName(socket) {
  const urlArr = socket.request.headers.referer.split('/')
  const roomName = urlArr.pop()
  return roomName
}
