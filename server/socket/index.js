module.exports = io => {
  //const rooms = {}
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    const roomName = getRoomName(socket)
    console.log('Joining(from page load): ', roomName)
    socket.join(roomName)

    socket.on('joinRoom', id => {
      console.log('Joining (from event): ', id)
      socket.join(id)
    })

    socket.on('new-line-from-client', (points, roomName) => {
      socket.to(roomName).emit('new-line-from-server', points)
      console.log('new_line')
    })

    socket.on('message-from-client', (message, roomName) => {
      socket
        .to(roomName)
        .emit('message-from-server', {...message, author: 'them'})
      console.log('message-from-client')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    //   socket.on('drawing', (...payload) => {
    //     const roomName = getRoomName(socket)
    //     rooms[roomName].push(payload)
    //     socket.to(roomName).emit('someOneDrew', payload)
    //   })
  })
}

function getRoomName(socket) {
  const urlArr = socket.request.headers.referer.split('/')
  const roomName = urlArr.pop()
  return roomName
}
